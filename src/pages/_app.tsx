import type { AppProps } from 'next/app';
import { AuthProvider } from '@/context/AuthContext';
import '../styles/globals.css'; // si usas estilos globales

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}