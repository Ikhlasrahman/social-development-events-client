'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import PrivateRoute from '@/components/PrivateRoute';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Calendar, MapPin, Edit3, Trash2, Plus, X, Check } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export default function ManageEventsPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit Modal State
  const [editingEvent, setEditingEvent] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    eventType: '',
    thumbnailUrl: '',
    location: '',
    eventDate: '',
    description: '',
  });

  const fetchMyEvents = async () => {
    if (!user?.email) return;
    try {
      const token = localStorage.getItem('social_events_token');
      const res = await axios.get(`${API_BASE}/my-events?email=${encodeURIComponent(user.email)}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(res.data || []);
    } catch (err) {
      console.error('Error fetching my events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEvents();
  }, [user]);

  // Open Edit Modal
  const openEditModal = (event) => {
    setEditingEvent(event);
    setEditFormData({
      title: event.title,
      eventType: event.eventType,
      thumbnailUrl: event.thumbnailUrl,
      location: event.location,
      eventDate: event.eventDate,
      description: event.description,
    });
  };

  // Submit Update
  const handleUpdate = async (e) => {
    e.preventDefault();

    // Validate future date
    const todayStr = new Date().toISOString().split('T')[0];
    if (editFormData.eventDate < todayStr) {
      toast.error('Event date must not be in the past');
      return;
    }

    try {
      const token = localStorage.getItem('social_events_token');
      const res = await axios.put(`${API_BASE}/events/${editingEvent._id}`, editFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.modifiedCount > 0 || res.data?.acknowledged) {
        toast.success('Event updated successfully!');
        setEditingEvent(null);
        fetchMyEvents();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update event');
    }
  };

  // Delete Event
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this event? This cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('social_events_token');
      const res = await axios.delete(`${API_BASE}/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.deletedCount > 0) {
        toast.success('Event deleted successfully');
        setEvents(events.filter((ev) => ev._id !== id));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete event');
    }
  };

  return (
    <PrivateRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Manage Your Events
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Update information, manage volunteer initiatives, or delete events you have created.
            </p>
          </div>
          <Link
            href="/create-event"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Event</span>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-100 dark:bg-neutral-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 dark:bg-neutral-900 rounded-2xl border border-dashed border-gray-300 dark:border-neutral-800">
            <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">No Events Created Yet</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">Start your own initiative for cleanups, donations, or food drives.</p>
            <Link
              href="/create-event"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors"
            >
              Create an Event
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 dark:bg-neutral-800/60 text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-neutral-800">
                  <tr>
                    <th className="px-6 py-4">Event</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                  {events.map((event) => (
                    <tr key={event._id} className="hover:bg-gray-50 dark:hover:bg-neutral-800/40 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        <div className="flex items-center gap-3">
                          <img
                            src={event.thumbnailUrl}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover bg-gray-100 dark:bg-neutral-800"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=150&q=80';
                            }}
                          />
                          <span className="truncate max-w-xs">{event.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-medium">
                          {event.eventType}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {event.eventDate}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400 truncate max-w-xs">
                        {event.location}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => openEditModal(event)}
                          className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition-colors"
                          title="Edit Event"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(event._id)}
                          className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
                          title="Delete Event"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edit Event Modal */}
        {editingEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
            <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl max-w-lg w-full p-6 shadow-xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-neutral-800">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Edit Event</h3>
                <button
                  onClick={() => setEditingEvent(null)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-4 pt-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.title}
                    onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400 mb-1">
                      Event Type
                    </label>
                    <select
                      value={editFormData.eventType}
                      onChange={(e) => setEditFormData({ ...editFormData, eventType: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm"
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
                    <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      required
                      value={editFormData.eventDate}
                      onChange={(e) => setEditFormData({ ...editFormData, eventDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    required
                    value={editFormData.location}
                    onChange={(e) => setEditFormData({ ...editFormData, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400 mb-1">
                    Thumbnail Image URL
                  </label>
                  <input
                    type="url"
                    required
                    value={editFormData.thumbnailUrl}
                    onChange={(e) => setEditFormData({ ...editFormData, thumbnailUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-gray-600 dark:text-gray-400 mb-1">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    required
                    value={editFormData.description}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingEvent(null)}
                    className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-neutral-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}