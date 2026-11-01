"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from '../app/providers/ThemeProvider';
import { useAuth } from '../app/context/AuthContext';
import {
  Sun,
  Moon,
  Menu,
  X,
  Calendar,
  PlusCircle,
  CalendarDays,
  CheckCircle2,
  LogOut,
  LogIn,
  User,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user, logoutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-b border-gray-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & App Name */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl tracking-tight text-emerald-600 dark:text-emerald-400"
          >
            <Calendar className="w-6 h-6" />
            <span>ImpactServe</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
                isActive("/")
                  ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              Home
            </Link>
            <Link
              href="/upcoming-events"
              className={`text-sm font-medium transition-colors hover:text-emerald-600 dark:hover:text-emerald-400 ${
                isActive("/upcoming-events")
                  ? "text-emerald-600 dark:text-emerald-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              Upcoming Events
            </Link>
          </div>

          {/* Right Controls: Theme Toggle + Auth Status */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* User State */}
            {user ? (
              <div className="flex items-center gap-3">
                {/* Profile Picture with hover display name and click dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    title={user.name || "User Profile"}
                    className="relative flex items-center justify-center rounded-full ring-2 ring-emerald-500/50 hover:ring-emerald-500 transition-all focus:outline-none"
                  >
                    <img
                      src={
                        user.photoURL ||
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
                      }
                      alt={user.name || "Profile"}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-gray-100 dark:border-neutral-700 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-neutral-700">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Signed in as
                        </p>
                        <p className="text-sm font-semibold truncate text-gray-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/profile"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-700/50"
                      >
                        <User className="w-4 h-4 text-emerald-500" />
                        My Profile
                      </Link>
                      <Link
                        href="/create-event"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-700/50"
                      >
                        <PlusCircle className="w-4 h-4 text-emerald-500" />
                        Create Event
                      </Link>

                      <Link
                        href="/manage-events"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-700/50"
                      >
                        <CalendarDays className="w-4 h-4 text-blue-500" />
                        Manage Events
                      </Link>

                      <Link
                        href="/joined-events"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-neutral-700/50"
                      >
                        <CheckCircle2 className="w-4 h-4 text-purple-500" />
                        Joined Events
                      </Link>
                    </div>
                  )}
                </div>

                {/* Direct Logout Button */}
                <button
                  onClick={logoutUser}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-neutral-800 px-4 pt-2 pb-4 space-y-2 bg-white dark:bg-neutral-900">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            Home
          </Link>
          <Link
            href="/upcoming-events"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            Upcoming Events
          </Link>

          {user ? (
            <div className="pt-2 border-t border-gray-100 dark:border-neutral-800 space-y-1">
              <div className="px-3 py-2 flex items-center gap-3">
                <img
                  src={user.photoURL}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="font-semibold text-sm">{user.name}</span>
              </div>
              <Link
                href="/create-event"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300"
              >
                Create Event
              </Link>
              <Link
                href="/manage-events"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300"
              >
                Manage Events
              </Link>
              <Link
                href="/joined-events"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm text-gray-700 dark:text-gray-300"
              >
                Joined Events
              </Link>
              <button
                onClick={() => {
                  logoutUser();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm text-red-600 dark:text-red-400 font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center mt-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
