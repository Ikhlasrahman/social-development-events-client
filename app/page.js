'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { 
  HeartHandshake, 
  Sparkles, 
  Users, 
  Calendar, 
  MapPin, 
  ArrowRight, 
  Send, 
  ShieldCheck, 
  TreePine 
} from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export default function HomePage() {
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentEvents = async () => {
      try {
        const res = await axios.get(`${API_BASE}/events/recent`);
        setRecentEvents(res.data || []);
      } catch (err) {
        console.error('Failed to load recent events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentEvents();
  }, []);

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero Banner Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-white dark:from-emerald-950/20 dark:via-neutral-950 dark:to-neutral-950 py-20 lg:py-28 border-b border-gray-100 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Community Action & Volunteer Network</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
              Unite for Real Impact in Your Neighborhood
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Discover and organize local grassroot initiatives—from winter blanket drives in Mohammadpur to lake cleanups in Mirpur. Build a stronger tomorrow together.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/upcoming-events"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm transition-all shadow-sm hover:shadow flex items-center gap-2"
              >
                <span>Explore Events</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/create-event"
                className="px-6 py-3.5 rounded-xl border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 text-gray-800 dark:text-gray-200 font-medium text-sm transition-colors"
              >
                Start an Initiative
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Feature Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            How ImpactServe Powers Community Work
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            A reliable hub designed to connect volunteers directly with humanitarian and environmental projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Grassroots Mobilization</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Anyone can publish local volunteer drives and rally neighborhood support without bureaucratic delays.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Verified Participation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Track attendance, monitor joined campaigns, and maintain complete ownership over your created activities.
            </p>
          </div>

          <div className="p-8 rounded-2xl border border-gray-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <TreePine className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Targeted Causes</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Filter by cleanups, winter relief drives, tree plantations, food kitchens, and educational sessions.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Recent Upcoming Events Section (Dynamic - MongoDB Limit 6) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Recent Upcoming Events
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              The latest scheduled social service initiatives seeking volunteers.
            </p>
          </div>
          <Link
            href="/upcoming-events"
            className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1.5 self-start sm:self-auto"
          >
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-72 rounded-2xl bg-gray-100 dark:bg-neutral-800 animate-pulse" />
            ))}
          </div>
        ) : recentEvents.length === 0 ? (
          <div className="text-center py-12 rounded-2xl border border-dashed border-gray-200 dark:border-neutral-800">
            <p className="text-sm text-gray-500 dark:text-gray-400">No scheduled events yet. Be the first to start one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentEvents.map((event) => (
              <div
                key={event._id}
                className="flex flex-col bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-md transition-all h-full"
              >
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

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 mb-2">
                      {event.title}
                    </h3>
                    <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400 mb-4">
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

                  <Link
                    href={`/events/${event._id}`}
                    className="w-full py-2 px-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:hover:bg-emerald-950/60 dark:text-emerald-300 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>View Event Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 4. Gallery Section (Static Photography Showcase) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Moments of Compassion
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            A glimpse into actual volunteer missions, blanket distributions, and cleanups accomplished by our community.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="h-56 rounded-2xl overflow-hidden bg-gray-100 dark:bg-neutral-800">
            <img
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80"
              alt="Winter clothes distribution"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="h-56 rounded-2xl overflow-hidden bg-gray-100 dark:bg-neutral-800">
            <img
              src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80"
              alt="Community tree plantation"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="h-56 rounded-2xl overflow-hidden bg-gray-100 dark:bg-neutral-800">
            <img
              src="https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=600&q=80"
              alt="Neighborhood park cleanup"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="h-56 rounded-2xl overflow-hidden bg-gray-100 dark:bg-neutral-800">
            <img
              src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80"
              alt="Community meal donation"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="h-56 rounded-2xl overflow-hidden bg-gray-100 dark:bg-neutral-800">
            <img
              src="https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=600&q=80"
              alt="Youth volunteer empowerment"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="h-56 rounded-2xl overflow-hidden bg-gray-100 dark:bg-neutral-800">
            <img
              src="https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&w=600&q=80"
              alt="Youth volunteer empowerment"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>

      {/* 5. Newsletter Section (Subscription Design) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-emerald-600 dark:bg-emerald-900/60 text-white p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-md">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Stay Updated on Social Causes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-emerald-100 max-w-xl mx-auto">
            Subscribe to our weekly dispatch for urgent volunteer needs, relief drives, and community milestones.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Subscribe</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}