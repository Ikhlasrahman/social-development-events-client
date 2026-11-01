import Link from 'next/link';
import { Calendar, Heart, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl text-emerald-600 dark:text-emerald-400">
              <Calendar className="w-6 h-6" />
              <span>ImpactServe</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Empowering communities by organizing social development events, food drives, blanket distributions, and cleanups.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/upcoming-events" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link href="/create-event" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  Host an Initiative
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>Mirpur, Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>contact@impactserve.org</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>+880 1700-000000</span>
              </li>
            </ul>
          </div>

          {/* Social Links (including the new X logo requirement) */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Follow Our Impact
            </h3>
            <div className="flex gap-3">
              {/* New X Logo */}
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 hover:bg-emerald-500 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-neutral-800 text-gray-700 dark:text-gray-200 hover:bg-emerald-500 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-neutral-800 text-center text-xs text-gray-500 dark:text-gray-400">
          <p className="flex items-center justify-center gap-1">
            © {new Date().getFullYear()} ImpactServe. Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-current inline" /> for community development.
          </p>
        </div>
      </div>
    </footer>
  );
}