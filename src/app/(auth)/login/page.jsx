'use client';

import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signIn, useSession, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import imglogo from '/public/LogoMAP.png';
import eyeIcon from '/public/icons/olhofechado.png';
import eyeClosed from '/public/icons/olhoaberto.png';
import React from 'react';
import Cookies from 'js-cookie';
import { jwt } from '../../../../middleware';

const handleRedirect = (token) => {
  const url = `https://geradoranuncia.mapmarketplaces.com/?token=${token}`;
  window.location.href = url;
};

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [error, setError] = useState('');
  const [isClient, setIsClient] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (status === 'authenticated') {
      const authToken = session?.user?.authToken;
      if (authToken) {
        Cookies.set('authToken', authToken, { expires: 1 });
        localStorage.setItem('authToken', authToken);  // Save token to localStorage
        handleRedirect(authToken);
      }
    }
  }, [status, session]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return <p>Welcome, {session.user.name}</p>;
  }

  if (!isClient || status === 'loading') {
    return <div>Carregando...</div>;
  }

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Digite um e-mail válido')
        .required('O campo e-mail é obrigatório'),
    password: Yup.string().required('O campo senha é obrigatório'),
  });

  async function handleSubmit(values, { resetForm }) {
    setError('');

    try {
      console.log('Tentando fazer login com:', values);
      console.log("Enviando solicitação de login para o backend com email:", values.email);
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      console.log('Resultado do signIn:', result);

      if (result?.error) {
        setError(result.error.replace('Error: ', ''));
        resetForm();
        setTimeout(() => setError(''), 3000);
      } else {
        const session = await getSession();
        console.log(session);
        console.log('Sessão após login:', session);
        if (session?.user?.authToken) {
          console.log('Token JWT:', session.user.authToken);
          Cookies.set('authToken', session.user.authToken, { expires: 1 });
          localStorage.setItem('authToken', session.user.authToken);  // Save token to localStorage
          handleRedirect(session.user.authToken);
        }
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Erro ao fazer login, tente mais tarde!');
    }
  }

  async function handleSocialLogin(provider) {
    try {
      console.log('Tentando login social com:', provider);
      const result = await signIn(provider, { redirect: false });

      console.log('Resultado do login social:', result);

      if (result?.error) {
        console.error('Erro no login social:', result.error);
        setError(result.error.replace('Error: ', ''));
      } else {
        const session = await getSession();
        console.log(session);
        console.log('Sessão após login social:', session);
        if (session?.user?.authToken) {
          console.log('Token JWT:', session.user.authToken);
          Cookies.set('authToken', session.user.authToken, { expires: 1 });
          localStorage.setItem('authToken', session.user.authToken);  // Save token to localStorage
          handleRedirect(session.user.authToken);
        }
      }
    } catch (error) {
      console.error('Erro ao tentar login social com', provider, ':', error);
    }
  }

  return (
      <main className="min-h-[80svh] flex items-center justify-center bg-black px-4">
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
              <Form className="flex flex-col gap-4 p-3 border-2 border-[#d4ef00] bg-[#2C2C2C] w-full max-w-sm shadow-md rounded-3xl">
                <Link href="/" passHref>
                  <div className="flex justify-center mb-4">
                    <Image src={imglogo} alt="Logo" width={150} height={150} />
                  </div>
                </Link>

                <h2 className="text-[#d4ef00] text-center text-xl font-semibold">
                  Faça o seu Login para continuar:
                </h2>

                <div className="flex justify-center gap-4 mb-4">
                  <button
                      type="button"
                      onClick={() => handleSocialLogin('facebook')}
                      className="flex items-center justify-center bg-black text-white w-1/2 py-2 rounded-full hover:bg-[#d4ef00] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#d4ef00]"
                      aria-label="Login com Facebook"
                  >
                    <FaFacebook className="mr-2 text-xl sm:text-2xl md:text-3xl" />
                    Facebook
                  </button>

                  <button
                      type="button"
                      onClick={() => handleSocialLogin('google')}
                      className="flex items-center justify-center bg-black text-white w-1/2 py-2 rounded-full hover:bg-[#d4ef00] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#d4ef00]"
                      aria-label="Login com Google"
                  >
                    <FcGoogle className="mr-2 text-xl sm:text-2xl md:text-3xl" />
                    Google
                  </button>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="email" className="text-[#d4ef00]">
                    E-mail:
                  </label>
                  <Field
                      id="email"
                      name="email"
                      type="email"
                      className="bg-[#3a3a3a] text-white p-2 rounded-md border border-[#d4ef00]"
                      required
                      autoComplete="email"
                  />
                  <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex flex-col relative">
                  <label htmlFor="password" className="text-[#d4ef00]">
                    Senha:
                  </label>
                  <Field
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      className="bg-[#3a3a3a] text-white p-2 rounded-md border border-[#d4ef00] w-full"
                      required
                      autoComplete="current-password"
                  />
                  <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-10 bg-yellow-400 rounded-full focus:ring-yellow-500"
                      style={{ padding: "1px 10px" }}
                      aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  >
                    <Image
                        src={showPassword ? eyeClosed : eyeIcon}
                        alt={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                        width={20}
                        height={20}
                    />
                  </button>
                  <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                  />
                </div>

                <span className="text-[#B3B3B3] text-sm text-right mt-2">
              <Link href="/api/auth/forgot-password">Esqueceu a senha?</Link>
            </span>

                <center>
                  <button
                      type="submit"
                      className={`p-2 bg-[#DAFD00] rounded-md text-center w-[200px] text-[#2c2c2c] font-medium ${
                          isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                      }`}
                      disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Carregando...' : 'Entrar'}
                  </button>
                </center>

                <span className="text-sm text-center mt-2 text-[#B3B3B3]">
              Novo por aqui?{' '}
                  <span className="text-[#DAFD00] no-underline">
                <Link href="/register">Assine agora.</Link>
              </span>
            </span>

                {error && (
                    <div
                        className="text-red-500 text-sm text-center mt-2"
                        aria-live="assertive"
                    >
                      {error}
                    </div>
                )}
              </Form>
          )}
        </Formik>
      </main>
  );
};

export default LoginPage;