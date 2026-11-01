'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import PrivateRoute from '@/components/PrivateRoute';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Calendar, MapPin, Tag, Image as ImageIcon, FileText, Send } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export default function CreateEventPage() {
  const router = useRouter();
  const { user } = useAuth();

  // Calculate tomorrow's date string (YYYY-MM-DD) for min date validation
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    title: '',
    eventType: 'Donation',
    thumbnailUrl: '',
    location: '',
    eventDate: minDateStr,
    description: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate future date
    const todayStr = new Date().toISOString().split('T')[0];
    if (formData.eventDate <= todayStr) {
      toast.error('Event date must be in the future.');
      return;
    }

    setSubmitting(true);
    try {
      const token = localStorage.getItem('social_events_token');
      const payload = {
        ...formData,
        creatorEmail: user.email,
        creatorName: user.name,
      };

      const res = await axios.post(`${API_BASE}/events`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.insertedId) {
        toast.success('Event published successfully!');
        router.push('/upcoming-events');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create event');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Host a Community Event
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Organize social initiatives like winter clothing drives, park cleanups, or tree plantations.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400 mb-2">
                Event Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Winter Blanket Distribution for the Needy"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            {/* Event Type & Date (2 columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-emerald-500" /> Event Type *
                </label>
                <select
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                >
                  <option value="Donation">Donation</option>
                  <option value="Cleanup">Cleanup</option>
                  <option value="Plantation">Plantation</option>
                  <option value="Food Drive">Food Drive</option>
                  <option value="Education">Education</option>
                  <option value="Healthcare">Healthcare</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-500" /> Event Date *
                </label>
                <input
                  type="date"
                  name="eventDate"
                  required
                  min={minDateStr}
                  value={formData.eventDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>

            {/* Location & Image URL (2 columns) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-500" /> Location *
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., Mohammadpur, Dhaka"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-emerald-500" /> Thumbnail URL *
                </label>
                <input
                  type="url"
                  name="thumbnailUrl"
                  required
                  value={formData.thumbnailUrl}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400 mb-2 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-emerald-500" /> Event Details & Goals *
              </label>
              <textarea
                name="description"
                rows="4"
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the objective, guidelines for volunteers, and what to bring..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Publishing Event...' : 'Publish Event'}</span>
            </button>
          </form>
        </div>
      </div>
    </PrivateRoute>
  );
}