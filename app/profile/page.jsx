'use client';

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PrivateRoute from '../../components/PrivateRoute';
import toast from 'react-hot-toast';
import { User, Mail, Image as ImageIcon, Save, Shield } from 'lucide-react';

export default function ProfilePage() {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    photoURL: user?.photoURL || '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Name cannot be empty');
      return;
    }

    const updatedUser = {
      ...user,
      name: formData.name,
      photoURL: formData.photoURL || user.photoURL,
    };

    localStorage.setItem('social_events_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    toast.success('Profile updated successfully!');
  };

  return (
    <PrivateRoute>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <img
                src={formData.photoURL || user?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                alt={user?.name || 'Profile'}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-emerald-500/20 mx-auto"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80';
                }}
              />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-4">{user?.name}</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center justify-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-500" /> Active Volunteer Member
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400 mb-2">
                Registered Email (Read Only)
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  disabled
                  value={user?.email || ''}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-800/40 text-gray-500 dark:text-gray-400 cursor-not-allowed text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400 mb-2">
                Display Name
              </label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400 mb-2">
                Profile Photo URL
              </label>
              <div className="relative">
                <ImageIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="url"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 mt-4"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Updates</span>
            </button>
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
}