import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { CollegeAnnouncement } from '../types';
import { 
  Bell, 
  AlertTriangle, 
  Search, 
  Plus, 
  X, 
  Trash2, 
  Calendar, 
  ShieldAlert, 
  Users, 
  Clock, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const CATEGORIES: CollegeAnnouncement['category'][] = [
  'Urgent Alerts',
  'Academic & Exams',
  'Placement & Careers',
  'Campus Events',
  'General'
];

export const AnnouncementsPage: React.FC = () => {
  const { 
    announcements, 
    publishAnnouncement, 
    deleteAnnouncement, 
    isAdmin, 
    userProfile 
  } = useCampus();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<CollegeAnnouncement['category']>('Academic & Exams');
  const [isUrgent, setIsUrgent] = useState(false);
  const [targetAudience, setTargetAudience] = useState('All Undergraduate Students');

  const filteredAnnouncements = announcements.filter((ann) => {
    if (selectedCategory === 'Urgent Only') {
      if (!ann.isUrgent) return false;
    } else if (selectedCategory !== 'All' && ann.category !== selectedCategory) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = ann.title.toLowerCase().includes(q);
      const matchContent = ann.content.toLowerCase().includes(q);
      const matchPublisher = ann.publishedBy.toLowerCase().includes(q);
      if (!matchTitle && !matchContent && !matchPublisher) {
        return false;
      }
    }
    return true;
  });

  const handlePublishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await publishAnnouncement({
      title,
      content,
      category: isUrgent ? 'Urgent Alerts' : category,
      isUrgent,
      targetAudience
    });

    setTitle('');
    setContent('');
    setIsUrgent(false);
    setIsPublishModalOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">
              Official University Noticeboard
            </span>
            <span className="text-xs text-slate-400 font-medium">
              Verified Bulletins from Administration
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Campus Notices & Announcements
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Live notices regarding examination timetables, company recruitment drives, library schedules, and emergency campus circulars.
          </p>
        </div>

        <button
          onClick={() => setIsPublishModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-200 transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Notice</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            All Bulletins ({announcements.length})
          </button>
          
          <button
            onClick={() => setSelectedCategory('Urgent Only')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === 'Urgent Only'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Urgent Notices ({announcements.filter(a => a.isUrgent).length})</span>
          </button>

          {CATEGORIES.filter(c => c !== 'Urgent Alerts').map(cat => (
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
            placeholder="Search circulars..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((ann) => {
          return (
            <div
              key={ann.id}
              className={`rounded-3xl p-6 transition-all border ${
                ann.isUrgent
                  ? 'bg-gradient-to-r from-rose-50/90 via-rose-50/40 to-white border-rose-300 ring-2 ring-rose-500/10 shadow-sm'
                  : 'bg-white border-slate-200/90 shadow-xs hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex flex-wrap items-center gap-2">
                  {ann.isUrgent ? (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase bg-rose-600 text-white flex items-center gap-1.5 tracking-wider shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                      Urgent Alert
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                      {ann.category}
                    </span>
                  )}
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    For: <strong className="font-semibold text-slate-700">{ann.targetAudience}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {new Date(ann.createdAt).toLocaleDateString()}
                  </span>
                  {isAdmin && (
                    <button
                      onClick={() => deleteAnnouncement(ann.id)}
                      className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Archive notice"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <h3 className={`text-base sm:text-lg font-bold mb-2 ${
                ann.isUrgent ? 'text-rose-950 font-extrabold' : 'text-slate-900'
              }`}>
                {ann.title}
              </h3>

              <p className={`text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                ann.isUrgent ? 'text-rose-900' : 'text-slate-600'
              }`}>
                {ann.content}
              </p>

              <div className="mt-4 pt-3 border-t border-slate-100/80 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className={`w-3.5 h-3.5 ${ann.isUrgent ? 'text-rose-500' : 'text-indigo-500'}`} />
                  Published by <strong className="font-semibold text-slate-700">{ann.publishedBy}</strong>
                </span>
                <span className="text-[11px] text-slate-400">Official Campus Dispatch</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Publish Notice Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 bg-gradient-to-r from-amber-600 to-indigo-600 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Publish University Notice</h3>
                <p className="text-xs text-amber-100">Broadcast official updates to the student body</p>
              </div>
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handlePublishSubmit} className="p-6 space-y-4 text-xs">
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                <div>
                  <label className="font-bold text-amber-900 block">Mark as High-Priority Urgent Notice</label>
                  <p className="text-[11px] text-amber-700">Urgent notices appear with priority beacon across all student dashboards</p>
                </div>
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="w-5 h-5 rounded text-amber-600 focus:ring-amber-500 border-amber-300 cursor-pointer"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Notice Headline *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Schedule for Final Exam Makeups and Hall Allocations"
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
                    onChange={(e) => setCategory(e.target.value as CollegeAnnouncement['category'])}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Target Students *
                  </label>
                  <input
                    type="text"
                    required
                    value={targetAudience}
                    onChange={(e) => setTargetAudience(e.target.value)}
                    placeholder="e.g. All Students or 4th Year CS"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Full Announcement Text *
                </label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Detail the instructions, deadlines, links to portals, and office contacts..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPublishModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md shadow-indigo-200"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
