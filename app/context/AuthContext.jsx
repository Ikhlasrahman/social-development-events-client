'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user session on mount/reload
  useEffect(() => {
  const initializeAuth = () => {
    const storedUser = localStorage.getItem('social_events_user');
    const storedToken = localStorage.getItem('social_events_token');

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error('Failed to parse stored user:', err);
      }
    }
    setLoading(false);
  };

  const timer = setTimeout(initializeAuth, 0);
  return () => clearTimeout(timer);
}, []);

  // Request & save JWT token
  const requestToken = async (email) => {
    try {
      const res = await axios.post(`${API_BASE}/jwt`, { email });
      if (res.data?.token) {
        localStorage.setItem('social_events_token', res.data.token);
      }
    } catch (err) {
      console.error('JWT fetch error:', err);
    }
  };

  // Register function
  const registerUser = async (name, email, photoURL, password) => {
    setLoading(true);
    try {
      // Create user profile object
      const newUser = {
        name,
        email,
        photoURL: photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      };

      // In production/BetterAuth this persists to DB; here we store locally & issue JWT
      localStorage.setItem('social_events_user', JSON.stringify(newUser));
      await requestToken(email);
      setUser(newUser);
      toast.success('Registration successful! Welcome to the platform.');
      return true;
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      // Check for existing profile in local storage or set default session
      const storedUser = localStorage.getItem('social_events_user');
      let userData = storedUser ? JSON.parse(storedUser) : null;

      if (!userData || userData.email !== email) {
        userData = {
          name: email.split('@')[0],
          email,
          photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
        };
      }

      localStorage.setItem('social_events_user', JSON.stringify(userData));
      await requestToken(email);
      setUser(userData);
      toast.success('Successfully logged in!');
      return true;
    } catch (error) {
      toast.error(error.message || 'Failed to log in');
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Social Login (Google / GitHub simulation)
  const socialLogin = async (provider = 'Google') => {
    setLoading(true);
    try {
      const demoSocialUser = {
        name: `${provider} Volunteer`,
        email: `volunteer.${provider.toLowerCase()}@socialevents.org`,
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      };

      localStorage.setItem('social_events_user', JSON.stringify(demoSocialUser));
      await requestToken(demoSocialUser.email);
      setUser(demoSocialUser);
      toast.success(`Logged in with ${provider}!`);
      return true;
    } catch (error) {
      toast.error(`Social login with ${provider} failed`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logoutUser = () => {
    localStorage.removeItem('social_events_user');
    localStorage.removeItem('social_events_token');
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        registerUser,
        loginUser,
        socialLogin,
        logoutUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);