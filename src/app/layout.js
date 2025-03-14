import "./globals.css";
import { Poppins } from "next/font/google";
import AuthProvider from "../components/AuthProvider";
import Script from 'next/script'; // Importar Script do Next.js
import Header from "../components/Header/Header";
import Footer from "../components/Footer/footer"; // Caminho correto
import ChatWhatsApp from "../app/whats/ChatWhatsApp"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "AnuncIA - Anúncios em um clique",
  icons: {
    icon: "https://media.licdn.com/dms/image/v2/C4D0BAQH0lo-u5Wpe7g/company-logo_200_200/company-logo_200_200/0/1654550785312/mapmarketplaces_logo?e=2147483647&v=beta&t=uc-BPtacGsO7DjuAtE9pxFPcCuhjCPgGn2MhPkfoDFs",
  },
  description: "Generated by MAP DEVS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Pixel do Facebook */}
        <Script strategy="afterInteractive" id="fb-pixel">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1804011207001759');
            fbq('track', 'PageView');
          `}
        </Script>

      </head>
      <body className={poppins.className}>
        <div className="flex flex-col min-h-screen">
          <AuthProvider>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <ChatWhatsApp />
          </AuthProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
