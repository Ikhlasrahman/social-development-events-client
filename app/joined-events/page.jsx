'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/app/context/AuthContext';
import PrivateRoute from '@/components/PrivateRoute';
import axios from 'axios';
import { Calendar, MapPin, Tag, CheckCircle2, ArrowRight } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export default function JoinedEventsPage() {
  const { user } = useAuth();
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJoinedEvents = async () => {
      if (!user?.email) return;
      try {
        const token = localStorage.getItem('social_events_token');
        const res = await axios.get(`${API_BASE}/joined-events?email=${encodeURIComponent(user.email)}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJoinedEvents(res.data || []);
      } catch (err) {
        console.error('Error fetching joined events:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJoinedEvents();
  }, [user]);

  return (
    <PrivateRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Volunteer Dashboard</span>
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            My Joined Initiatives
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Keep track of the community service projects and volunteer drives you have signed up for.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-44 rounded-2xl bg-gray-100 dark:bg-neutral-800 animate-pulse" />
            ))}
          </div>
        ) : joinedEvents.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 dark:bg-neutral-900 rounded-2xl border border-dashed border-gray-300 dark:border-neutral-800">
            <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">No Joined Events Yet</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">Explore upcoming events to find volunteer causes you care about.</p>
            <Link
              href="/upcoming-events"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors"
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {joinedEvents.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                      {item.eventType || 'Community Service'}
                    </span>
                    <span className="text-xs text-gray-400">Joined</span>
                  </div>
                  <h3 className="font-bold text-base text-gray-900 dark:text-white line-clamp-1 mb-2">
                    {item.title}
                  </h3>
                  <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-500" />
                      <span>{item.eventDate}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-500" />
                      <span className="truncate">{item.location}</span>
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-neutral-800/50 border-t border-gray-100 dark:border-neutral-800">
                  <Link
                    href={`/events/${item.eventId}`}
                    className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center justify-between"
                  >
                    <span>View Event Information</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </PrivateRoute>
  );
}