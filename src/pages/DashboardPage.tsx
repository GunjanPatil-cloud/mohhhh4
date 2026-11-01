import React from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Users, 
  Bell, 
  Upload, 
  Download, 
  Heart, 
  MessageSquare, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  AlertTriangle,
  Bookmark,
  Plus,
  Leaf,
  Award
} from 'lucide-react';

interface DashboardPageProps {
  onOpenUploadNote: () => void;
  onOpenAuth: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onOpenUploadNote, onOpenAuth }) => {
  const { 
    userProfile, 
    currentUser, 
    setActivePage, 
    announcements, 
    events, 
    notes, 
    posts, 
    registerForEvent, 
    unregisterFromEvent, 
    downloadNote, 
    savedNoteIds, 
    toggleSaveNote,
    toggleLikePost,
    quickLoginAsDemo
  } = useCampus();

  const studentName = userProfile?.displayName || currentUser?.displayName || 'Scholar';
  const collegeName = userProfile?.collegeName || 'National Institute of Technology';
  const branchName = userProfile?.branch || 'Computer Science & Engineering';
  const semester = userProfile?.semester || '4th Semester';

  const uid = userProfile?.uid || currentUser?.uid || '';
  const myRegisteredEvents = events.filter(e => e.registeredUserIds.includes(uid));
  const urgentAnnouncements = announcements.filter(a => a.isUrgent);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-600 to-violet-700 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute right-0 bottom-0 translate-x-10 translate-y-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={userProfile?.photoURL || currentUser?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=user`}
              alt="Avatar"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-white/30 shadow-md bg-white/20 shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 text-white backdrop-blur-xs">
                  {collegeName}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/50 text-indigo-100">
                  {branchName} • {semester}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, {studentName}! 👋
              </h1>
              <p className="text-sm text-indigo-100 mt-1 max-w-xl">
                Here is what is happening across your campus today: exams revision notes are trending, and HackCampus registrations close soon.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenUploadNote}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-indigo-700 text-xs sm:text-sm font-bold shadow-md hover:bg-indigo-50 transition-all active:scale-95"
            >
              <Upload className="w-4 h-4 text-indigo-600" />
              <span>Upload Notes</span>
            </button>
            <button
              onClick={() => setActivePage('community')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-500/40 hover:bg-indigo-500/60 text-white text-xs sm:text-sm font-semibold border border-white/20 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask Community</span>
            </button>
          </div>
        </div>
      </div>

      {/* Guest Notice (if not logged in) */}
      {!currentUser && !userProfile && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-sm font-bold text-amber-900">You are browsing in Guest Mode</p>
              <p className="text-xs text-amber-700">Sign in to track your registered events, download notes history, and post questions.</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => quickLoginAsDemo('student')}
              className="px-3.5 py-1.5 rounded-xl bg-white border border-amber-300 text-amber-800 text-xs font-semibold hover:bg-amber-100/50"
            >
              Quick Test Account
            </button>
            <button
              onClick={onOpenAuth}
              className="px-3.5 py-1.5 rounded-xl bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 shadow-xs"
            >
              Sign In / Register
            </button>
          </div>
        </div>
      )}

      {/* Urgent Announcements Banner (if any) */}
      {urgentAnnouncements.length > 0 && (
        <div className="rounded-2xl border-l-4 border-l-rose-500 bg-rose-50/70 border border-rose-200 p-4 sm:p-5 shadow-xs">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-rose-100 text-rose-600 shrink-0 mt-0.5">
                <Bell className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-rose-200 text-rose-800 tracking-wider">
                    Urgent Notice
                  </span>
                  <span className="text-xs text-rose-600 font-medium">
                    {urgentAnnouncements[0].publishedBy}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-rose-950 mt-1">
                  {urgentAnnouncements[0].title}
                </h3>
                <p className="text-xs text-rose-800 mt-1 leading-relaxed max-w-3xl line-clamp-2">
                  {urgentAnnouncements[0].content}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActivePage('announcements')}
              className="shrink-0 text-xs font-bold text-rose-700 hover:text-rose-900 flex items-center gap-1 hover:underline"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        
        <div 
          onClick={() => setActivePage('notes')}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <BookOpen className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
            Study Notes Vault
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            {notes.length} verified lecture notes & PDFs
          </p>
        </div>

        <div 
          onClick={() => setActivePage('events')}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-violet-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-800 group-hover:text-purple-600 transition-colors">
            College Events
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            {events.length} upcoming fests & hackathons
          </p>
        </div>

        <div 
          onClick={() => setActivePage('community')}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">
            Student Forum
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            {posts.length} discussions & teammate queries
          </p>
        </div>

        <div 
          onClick={() => setActivePage('announcements')}
          className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Bell className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
            Notices & Circulars
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            {announcements.length} official department updates
          </p>
        </div>

        <div 
          onClick={() => setActivePage('sustainability')}
          className="p-5 rounded-2xl bg-white border border-[#E5E1D8] hover:border-[#C85A32] hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FBF1EB] text-[#C85A32] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Leaf className="w-5 h-5" />
          </div>
          <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#C85A32] transition-colors">
            Sustainability & LCA
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            3 pillars, carbon calculator & trade-in
          </p>
        </div>

        <div 
          onClick={() => setActivePage('projects')}
          className="p-5 rounded-2xl bg-white border border-[#E5E1D8] hover:border-[#C85A32] hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-[#16191D] text-white flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Award className="w-5 h-5 text-amber-400" />
          </div>
          <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#C85A32] transition-colors">
            Startup Studies (8)
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            LCA audits, supply chain & risk papers
          </p>
        </div>

      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Events and Notes */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Upcoming Events Spotlight */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Upcoming College Events</h2>
                  <p className="text-xs text-slate-500">Live RSVP tickets and participant spots</p>
                </div>
              </div>
              <button
                onClick={() => setActivePage('events')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>View All ({events.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-4">
              {events.slice(0, 3).map((event) => {
                const isRegistered = event.registeredUserIds.includes(uid);
                return (
                  <div
                    key={event.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold flex flex-col items-center justify-center shrink-0">
                        <span className="text-[10px] uppercase font-bold text-indigo-500">
                          {event.date.split(' ')[0]}
                        </span>
                        <span className="text-sm font-extrabold leading-tight">
                          {event.date.split(' ')[1]?.replace(',', '') || '15'}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700">
                            {event.category}
                          </span>
                          <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {event.time}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 line-clamp-1">
                          {event.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {event.venue}
                          </span>
                          <span>•</span>
                          <span className="text-slate-600 font-medium">
                            {event.registeredCount} / {event.capacity} attending
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="sm:self-center shrink-0">
                      {isRegistered ? (
                        <button
                          onClick={() => unregisterFromEvent(event.id)}
                          className="w-full sm:w-auto px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-rose-50 hover:text-rose-700 border border-emerald-200 text-xs font-semibold transition-all group/btn"
                        >
                          <span className="group-hover/btn:hidden flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Registered
                          </span>
                          <span className="hidden group-hover/btn:inline">Cancel RSVP</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => registerForEvent(event.id)}
                          className="w-full sm:w-auto px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
                        >
                          RSVP Free
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recently Uploaded Study Notes */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Recent Academic Notes</h2>
                  <p className="text-xs text-slate-500">Verified lecture materials & revision guides</p>
                </div>
              </div>
              <button
                onClick={() => setActivePage('notes')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>Browse Vault ({notes.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3.5">
              {notes.slice(0, 3).map((note) => {
                const isSaved = savedNoteIds.includes(note.id);
                return (
                  <div
                    key={note.id}
                    className="p-4 rounded-2xl border border-slate-100 hover:border-indigo-100 hover:bg-indigo-50/20 transition-all flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-100 font-bold text-[10px]">
                        PDF
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                            {note.subject}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {note.branch} • {note.semester}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-800 line-clamp-1">
                          {note.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Uploaded by <strong className="font-semibold text-slate-700">{note.uploaderName}</strong> • {note.fileSize}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => toggleSaveNote(note.id)}
                        className={`p-2 rounded-xl border transition-colors ${
                          isSaved
                            ? 'bg-amber-50 border-amber-200 text-amber-600'
                            : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                        }`}
                        title={isSaved ? 'Bookmarked' : 'Save note'}
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                      <button
                        onClick={() => downloadNote(note)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition-colors"
                        title="Download Document"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right 1 Col: Community Discussions & Activity */}
        <div className="space-y-8">
          
          {/* Community Activity Spotlight */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Student Forum</h3>
                  <p className="text-xs text-slate-500">Trending campus discussions</p>
                </div>
              </div>
              <button
                onClick={() => setActivePage('community')}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Open Forum
              </button>
            </div>

            <div className="space-y-4">
              {posts.slice(0, 3).map((post) => {
                const hasLiked = post.likes.includes(uid);
                return (
                  <div key={post.id} className="p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={post.authorPhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.authorId}`}
                        alt={post.authorName}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="text-xs font-bold text-slate-800">{post.authorName}</span>
                      <span className="text-[10px] text-slate-400">• {post.category}</span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-900 line-clamp-1 mb-1">
                      {post.title}
                    </h5>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {post.content}
                    </p>
                    <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                      <button
                        onClick={() => toggleLikePost(post.id)}
                        className={`flex items-center gap-1 transition-colors ${
                          hasLiked ? 'text-rose-600 font-semibold' : 'hover:text-slate-800'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-600' : ''}`} />
                        <span>{post.likes.length}</span>
                      </button>
                      <button
                        onClick={() => setActivePage('community')}
                        className="flex items-center gap-1 hover:text-indigo-600 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{post.commentsCount || 0} replies</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setActivePage('community')}
              className="mt-4 w-full py-2.5 rounded-xl border border-dashed border-indigo-300 text-indigo-700 hover:bg-indigo-50 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Discussion Post</span>
            </button>
          </div>

          {/* Quick Academic Contacts Card */}
          <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-3xl p-6 text-white shadow-md">
            <h4 className="text-sm font-bold flex items-center gap-2 text-indigo-300">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Campus Quick Help</span>
            </h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Have academic questions or need urgent departmental verification? Reach out directly to campus coordinators.
            </p>
            <div className="mt-4 space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/10 flex items-center justify-between">
                <span>Examination Cell:</span>
                <span className="font-mono text-indigo-200">exam.help@campus.edu</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 flex items-center justify-between">
                <span>T&P Placement Desk:</span>
                <span className="font-mono text-indigo-200">placement@campus.edu</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/10 flex items-center justify-between">
                <span>Student Affairs:</span>
                <span className="font-mono text-indigo-200">welfare@campus.edu</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
