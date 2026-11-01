import './globals.css';
import ThemeProvider from './providers/ThemeProvider';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'ImpactServe - Social Development Events Platform',
  description: 'Community-driven event management platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        suppressHydrationWarning 
        className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-neutral-950 dark:text-gray-100 antialiased"
      >
        <ThemeProvider>
          <AuthProvider>
            <Toaster position="top-right" />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}