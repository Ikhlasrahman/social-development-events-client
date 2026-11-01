import Link from 'next/link';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">404 - Page Not Found</h1>
      <p className="mt-2 text-base text-gray-600 dark:text-gray-400 max-w-md">
        The social initiative or page you are looking for does not exist or has been relocated.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Home</span>
      </Link>
    </div>
  );
}