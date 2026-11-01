import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { CollegeEvent } from '../types';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Plus, 
  CheckCircle2, 
  Search, 
  Filter, 
  X, 
  Sparkles, 
  Trash2,
  Share2
} from 'lucide-react';

const CATEGORIES: CollegeEvent['category'][] = [
  'Tech',
  'Cultural',
  'Academic',
  'Sports',
  'Workshop',
  'Career'
];

export const EventsPage: React.FC = () => {
  const { 
    events, 
    registerForEvent, 
    unregisterFromEvent, 
    createEvent, 
    deleteEvent, 
    currentUser, 
    userProfile, 
    isAdmin 
  } = useCampus();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewDetailsEvent, setViewDetailsEvent] = useState<CollegeEvent | null>(null);

  // New Event Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<CollegeEvent['category']>('Tech');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [venue, setVenue] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [capacity, setCapacity] = useState('200');
  const [image, setImage] = useState('');

  const uid = userProfile?.uid || currentUser?.uid || '';

  const filteredEvents = events.filter((ev) => {
    if (selectedCategory !== 'All' && ev.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = ev.title.toLowerCase().includes(q);
      const matchDesc = ev.description.toLowerCase().includes(q);
      const matchVenue = ev.venue.toLowerCase().includes(q);
      const matchOrg = ev.organizer.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchVenue && !matchOrg) {
        return false;
      }
    }
    return true;
  });

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createEvent({
      title,
      description,
      category,
      date: date || 'Nov 25, 2026',
      time: time || '4:00 PM',
      venue: venue || 'Campus Auditorium',
      organizer: organizer || (userProfile?.displayName ? `${userProfile.displayName} (Club Coordinator)` : 'Student Council'),
      capacity: parseInt(capacity) || 150,
      image: image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80'
    });

    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setVenue('');
    setOrganizer('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700">
              Campus Activities & Fests
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {events.length} Upcoming Events
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            College Events & Workshops
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Register for national hackathons, technical seminars, cultural battles, and sports championships with live seat booking.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-200 transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Host / Add College Event</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            All Events ({events.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, venue..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => {
          const isRegistered = event.registeredUserIds.includes(uid);
          const percentFull = Math.min(100, Math.round((event.registeredCount / event.capacity) * 100));
          const isOwner = event.createdBy === uid || isAdmin;

          return (
            <div
              key={event.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image Banner */}
                {event.image && (
                  <div className="h-44 w-full overflow-hidden relative">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/95 text-slate-900 backdrop-blur-xs shadow-xs">
                        {event.category}
                      </span>
                    </div>
                    {isOwner && (
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 text-slate-600 hover:text-rose-600 hover:bg-white shadow-xs transition-colors"
                        title="Delete event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                )}

                <div className="p-6">
                  {/* Date & Time */}
                  <div className="flex items-center gap-3 text-xs text-indigo-600 font-semibold mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 text-slate-500 font-normal">
                      <Clock className="w-3.5 h-3.5" />
                      {event.time}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => setViewDetailsEvent(event)}
                    className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer line-clamp-1"
                  >
                    {event.title}
                  </h3>

                  {/* Venue & Organizer */}
                  <div className="mt-2 text-xs text-slate-500 space-y-1">
                    <p className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{event.venue}</span>
                    </p>
                    <p className="text-slate-600">
                      Organized by <strong className="font-semibold text-slate-700">{event.organizer}</strong>
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Bottom Registration Area */}
              <div className="px-6 pb-6 pt-0">
                {/* Capacity Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
                    <span className="flex items-center gap-1 font-medium">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {event.registeredCount} / {event.capacity} Spots Booked
                    </span>
                    <span className="font-semibold text-slate-700">{percentFull}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        percentFull > 85 ? 'bg-amber-500' : 'bg-indigo-600'
                      }`}
                      style={{ width: `${percentFull}%` }}
                    />
                  </div>
                </div>

                {/* RSVP Button */}
                {isRegistered ? (
                  <button
                    onClick={() => unregisterFromEvent(event.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-rose-50 hover:text-rose-700 border border-emerald-200 text-xs font-semibold transition-all group/btn"
                  >
                    <span className="group-hover/btn:hidden flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Registered (Click to Cancel)</span>
                    </span>
                    <span className="hidden group-hover/btn:inline">Cancel Registration</span>
                  </button>
                ) : (
                  <button
                    onClick={() => registerForEvent(event.id)}
                    disabled={event.registeredCount >= event.capacity}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-100 transition-all active:scale-98 disabled:opacity-50"
                  >
                    <span>{event.registeredCount >= event.capacity ? 'Event Full' : 'Register Free Spot'}</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add College Event Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Host / Create College Event</h3>
                <p className="text-xs text-purple-100">Publish events to the university calendar</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. AI & Robotics National Symposium 2026"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CollegeEvent['category'])}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Max Capacity *
                  </label>
                  <input
                    type="number"
                    required
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="text"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="e.g. Nov 18, 2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Time *
                  </label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 2:00 PM - 6:00 PM"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Venue / Hall *
                  </label>
                  <input
                    type="text"
                    required
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="e.g. Auditorium Hall 2"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Organizing Club / Dept *
                  </label>
                  <input
                    type="text"
                    required
                    value={organizer}
                    onChange={(e) => setOrganizer(e.target.value)}
                    placeholder="e.g. Coding Club & IEEE"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Event Description & Agenda *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline the schedule, speaker details, rules, prizes, or what students should bring..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md shadow-indigo-200"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Event Details Modal */}
      {viewDetailsEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
            {viewDetailsEvent.image && (
              <div className="h-48 w-full overflow-hidden relative">
                <img
                  src={viewDetailsEvent.image}
                  alt={viewDetailsEvent.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setViewDetailsEvent(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-slate-900/60 text-white hover:bg-slate-900"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
            <div className="p-6">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
                {viewDetailsEvent.category}
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-2">{viewDetailsEvent.title}</h2>
              <p className="text-xs text-slate-500 mt-1">Organized by {viewDetailsEvent.organizer}</p>

              <div className="my-4 grid grid-cols-2 gap-3 p-3 rounded-2xl bg-slate-50 text-xs">
                <div>
                  <span className="text-slate-400 block">Date & Time:</span>
                  <span className="font-semibold text-slate-800">{viewDetailsEvent.date} @ {viewDetailsEvent.time}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Venue:</span>
                  <span className="font-semibold text-slate-800">{viewDetailsEvent.venue}</span>
                </div>
              </div>

              <div className="text-xs text-slate-600 leading-relaxed mb-6">
                <h4 className="font-bold text-slate-900 mb-1">About this event:</h4>
                <p>{viewDetailsEvent.description}</p>
              </div>

              <div className="flex items-center gap-3">
                {viewDetailsEvent.registeredUserIds.includes(uid) ? (
                  <button
                    onClick={() => {
                      unregisterFromEvent(viewDetailsEvent.id);
                      setViewDetailsEvent(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-semibold text-xs transition-colors"
                  >
                    Cancel Registration
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      registerForEvent(viewDetailsEvent.id);
                      setViewDetailsEvent(null);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-200 transition-colors"
                  >
                    Register Free Spot
                  </button>
                )}
                <button
                  onClick={() => setViewDetailsEvent(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
