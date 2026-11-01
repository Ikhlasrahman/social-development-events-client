import './globals.css';
import ThemeProvider from './providers/ThemeProvider';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Social Development Events Platform',
  description: 'Community-driven event management platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body 
        suppressHydrationWarning 
        className="min-h-screen bg-white text-gray-900 dark:bg-neutral-950 dark:text-gray-100 antialiased"
      >
        <ThemeProvider>
          <Toaster position="top-right" />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}