'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { Calendar, MapPin, Tag, ArrowRight } from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${API_BASE}/events`);
        setEvents(res.data || []);
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Upcoming Social Initiatives
        </h1>
        <p className="mt-3 text-base text-gray-600 dark:text-gray-400">
          Discover local volunteer projects, donation campaigns, and neighborhood cleanups happening around you.
        </p>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 space-y-4 animate-pulse">
              <div className="h-48 bg-gray-200 dark:bg-neutral-800 rounded-xl"></div>
              <div className="h-5 bg-gray-200 dark:bg-neutral-800 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded w-1/2"></div>
              <div className="h-10 bg-gray-200 dark:bg-neutral-800 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 dark:bg-neutral-900 rounded-2xl border border-dashed border-gray-300 dark:border-neutral-800">
          <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">No Upcoming Events Found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-6">Be the first to organize a social cause in your area!</p>
          <Link
            href="/create-event"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-colors"
          >
            Create an Event
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="flex flex-col bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full"
            >
              {/* Event Thumbnail */}
              <div className="relative h-48 w-full overflow-hidden bg-gray-100 dark:bg-neutral-800">
                <img
                  src={event.thumbnailUrl}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/90 text-white backdrop-blur-sm">
                  {event.eventType}
                </span>
              </div>

              {/* Event Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 mb-2">
                    {event.title}
                  </h3>
                  <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400 mb-4">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>{event.eventDate}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </p>
                  </div>
                </div>

                {/* View Event Button */}
                <Link
                  href={`/events/${event._id}`}
                  className="w-full py-2.5 px-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/60 dark:text-emerald-300 font-medium text-sm flex items-center justify-center gap-2 transition-colors mt-2"
                >
                  <span>View Event</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}