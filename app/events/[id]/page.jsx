'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Calendar, MapPin, Tag, User, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export default function EventDetailsPage({ params }) {
  // Unwrap dynamic params in React 19 / Next.js 15+
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  const router = useRouter();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${API_BASE}/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        toast.error('Event details could not be loaded');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchEvent();
  }, [id]);

  const handleJoinEvent = async () => {
    if (!user) {
      toast.error('Please log in first to join this event!');
      router.push('/login');
      return;
    }

    setJoining(true);
    try {
      const token = localStorage.getItem('social_events_token');
      const payload = {
        eventId: event._id,
        title: event.title,
        eventType: event.eventType,
        location: event.location,
        eventDate: event.eventDate,
        thumbnailUrl: event.thumbnailUrl,
        userEmail: user.email,
        userName: user.name,
        joinedAt: new Date().toISOString(),
      };

      const res = await axios.post(`${API_BASE}/events/join`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data?.insertedId) {
        toast.success('Successfully joined the event! Check your Joined Events tab.');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to join event');
    } finally {
      setJoining(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 dark:bg-neutral-800 rounded w-1/4"></div>
        <div className="h-80 bg-gray-200 dark:bg-neutral-800 rounded-2xl"></div>
        <div className="h-6 bg-gray-200 dark:bg-neutral-800 rounded w-3/4"></div>
        <div className="h-24 bg-gray-200 dark:bg-neutral-800 rounded"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold">Event Not Found</h2>
        <Link href="/upcoming-events" className="text-emerald-600 hover:underline mt-4 inline-block">
          Back to Upcoming Events
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <Link
        href="/upcoming-events"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Upcoming Events
      </Link>

      <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-sm">
        {/* Banner Image */}
        <div className="relative h-72 sm:h-96 w-full bg-gray-100 dark:bg-neutral-800">
          <img
            src={event.thumbnailUrl}
            alt={event.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80';
            }}
          />
          <div className="absolute top-4 right-4 bg-emerald-600 text-white font-medium px-4 py-1.5 rounded-full text-xs shadow-md">
            {event.eventType}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 space-y-8">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
              {event.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-1.5">
              <User className="w-4 h-4 text-emerald-500" /> Organized by{' '}
              <span className="font-semibold text-gray-700 dark:text-gray-300">{event.creatorName || event.creatorEmail}</span>
            </p>
          </div>

          {/* Info Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-neutral-800/50 border border-gray-100 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Event Date</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{event.eventDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{event.location}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">About This Initiative</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {event.description}
            </p>
          </div>

          {/* Join Event Button */}
          <div className="pt-6 border-t border-gray-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Ready to make a difference?</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Confirm your attendance to receive event updates.</p>
            </div>

            <button
              onClick={handleJoinEvent}
              disabled={joining}
              className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CheckCircle className="w-5 h-5" />
              <span>{joining ? 'Joining...' : 'Join Event'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}