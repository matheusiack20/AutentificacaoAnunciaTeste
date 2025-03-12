import NextAuth, { type NextAuthOptions, User as NextAuthUser} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import axios from 'axios';

const genericAvatar = "/Generic_avatar.png";

interface User extends NextAuthUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  authToken?: string;
  plan?: number | null;
}

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
      authToken?: string;
      plan?: number | null;
    };
  }
}

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credenciais",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Senha", type: "password", required: true },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          throw new Error("Credenciais não fornecidas.");
        }

        try {
          console.log("Enviando solicitação de login para o backend com email:", credentials.email);
          const response = await axios.post(`${process.env.BACKEND_URL}/auth/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          await new Promise(resolve => setTimeout(resolve, 5000));
          const { user } = response.data;
          console.log("Resposta do backend recebida com sucesso:", user);  // Log the entire response data

          console.log(user._id);
          console.log(user.authToken);

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            image: user.image || genericAvatar,
            authToken: user.authToken,
            plan: user.plan,
          };
        } catch (error) {
          console.error("Erro durante a autorização:", error.message);
          throw new Error("Erro durante a autorização. Por favor, tente novamente.");
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const extendedUser = user as User;
        token.role = extendedUser.role || "user";
        token.picture = extendedUser.image || genericAvatar;
        token.email = extendedUser.email;
        token.name = extendedUser.name;
        token.authToken = extendedUser.authToken;
        token.plan = extendedUser.plan;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        role: token.role as string | undefined,
        image: token.picture,
        email: token.email,
        name: token.name,
        authToken: token.authToken as string,
        plan: token.plan as number | null,
      };
      return session;
    }
  },
  pages: {
    signIn: "/login",
    error: "/error",
    signOut: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export const GET = handler;
export const POST = handler;