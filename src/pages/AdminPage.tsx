import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  ShieldCheck, 
  Users, 
  BookOpen, 
  Calendar, 
  Bell, 
  MessageSquare, 
  CheckCircle2, 
  XCircle, 
  Trash2, 
  Plus, 
  AlertTriangle, 
  Sparkles, 
  Download, 
  ExternalLink,
  Lock,
  ArrowRight
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { 
    isAdmin, 
    allStudents, 
    notes, 
    events, 
    posts, 
    announcements, 
    updateNoteStatus, 
    deleteNote, 
    deleteEvent, 
    createEvent,
    deletePost, 
    publishAnnouncement, 
    deleteAnnouncement, 
    quickLoginAsDemo, 
    updateUserProfile,
    userProfile,
    downloadNote
  } = useCampus();

  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'notes' | 'events' | 'announcements' | 'posts'>('overview');

  // Quick announcement modal in admin
  const [annTitle, setAnnTitle] = useState('');
  const [annContent, setAnnContent] = useState('');
  const [annCategory, setAnnCategory] = useState<'Academic & Exams' | 'Urgent Alerts' | 'Placement & Careers' | 'General'>('Academic & Exams');
  const [annUrgent, setAnnUrgent] = useState(false);
  const [annAudience, setAnnAudience] = useState('All Undergraduate Students');

  // Quick event form in admin
  const [evTitle, setEvTitle] = useState('');
  const [evCategory, setEvCategory] = useState<'Tech' | 'Cultural' | 'Academic' | 'Sports' | 'Workshop'>('Tech');
  const [evDate, setEvDate] = useState('');
  const [evTime, setEvTime] = useState('');
  const [evVenue, setEvVenue] = useState('');
  const [evDesc, setEvDesc] = useState('');
  const [evCapacity, setEvCapacity] = useState('250');

  // If user is not admin, show protection gate
  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-6 shadow-md">
          <Lock className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900">
          Admin Portal Restricted
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          This section requires administrative privileges. You are currently viewing CampusConnect with student permissions.
        </p>

        <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left">
          <h4 className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-1">
            Testing & Verification Access
          </h4>
          <p className="text-xs text-slate-600 mb-4">
            Switch to the Admin account to test student moderation, notes approval, and university notice publishing:
          </p>
          <button
            onClick={() => quickLoginAsDemo('admin')}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-200 transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Enable Administrator View (Demo)</span>
          </button>
        </div>
      </div>
    );
  }

  const handlePublishNotice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annContent.trim()) return;

    await publishAnnouncement({
      title: annTitle,
      content: annContent,
      category: annUrgent ? 'Urgent Alerts' : annCategory,
      isUrgent: annUrgent,
      targetAudience: annAudience
    });

    setAnnTitle('');
    setAnnContent('');
    setAnnUrgent(false);
  };

  const handleCreateEventAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!evTitle.trim()) return;

    await createEvent({
      title: evTitle,
      description: evDesc || 'Official university event organized by the administration.',
      category: evCategory,
      date: evDate || 'Dec 02, 2026',
      time: evTime || '3:00 PM',
      venue: evVenue || 'Main Convention Hall',
      organizer: 'Campus Administration',
      capacity: parseInt(evCapacity) || 200,
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80'
    });

    setEvTitle('');
    setEvDesc('');
    setEvDate('');
    setEvTime('');
    setEvVenue('');
  };

  const totalEventRegistrations = events.reduce((sum, e) => sum + (e.registeredCount || 0), 0);
  const totalDownloads = notes.reduce((sum, n) => sum + (n.downloadCount || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-700 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Campus Management & Moderation</span>
            </span>
            <span className="text-xs text-slate-400">Authenticated: {userProfile?.email}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Administrator Dashboard
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Oversee registered students, verify uploaded lecture notes, organize campus fests, and broadcast urgent circulars.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => quickLoginAsDemo('student')}
            className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
          >
            Switch to Student View
          </button>
        </div>
      </div>

      {/* Basic Platform Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Students</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{allStudents.length}</p>
          <p className="text-xs text-slate-500 mt-1">Enrolled across departments</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Notes Vault</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{notes.length}</p>
          <p className="text-xs text-slate-500 mt-1">{totalDownloads} total downloads</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">College Events</span>
            <Calendar className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{events.length}</p>
          <p className="text-xs text-slate-500 mt-1">{totalEventRegistrations} RSVP tickets confirmed</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Community</span>
            <MessageSquare className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl sm:text-3xl font-black text-slate-900">{posts.length}</p>
          <p className="text-xs text-slate-500 mt-1">Active discussions & queries</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 overflow-x-auto">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'overview'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Quick Actions
        </button>

        <button
          onClick={() => setActiveTab('students')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'students'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Manage Students ({allStudents.length})
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'notes'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Moderate Notes ({notes.length})
        </button>

        <button
          onClick={() => setActiveTab('events')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'events'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Manage Events ({events.length})
        </button>

        <button
          onClick={() => setActiveTab('announcements')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'announcements'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Publish Announcements ({announcements.length})
        </button>

        <button
          onClick={() => setActiveTab('posts')}
          className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
            activeTab === 'posts'
              ? 'border-purple-600 text-purple-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Moderate Posts ({posts.length})
        </button>
      </div>

      {/* TAB 1: OVERVIEW & QUICK ACTIONS */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Quick Notice Broadcast */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-1">
              <Bell className="w-4 h-4 text-purple-600" />
              <span>Broadcast Campus Notice</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">Send a notice to all students in real-time</p>

            <form onSubmit={handlePublishNotice} className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-purple-50 border border-purple-100">
                <span className="font-semibold text-purple-900">Urgent Alert Banner</span>
                <input
                  type="checkbox"
                  checked={annUrgent}
                  onChange={(e) => setAnnUrgent(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notice Title</label>
                <input
                  type="text"
                  required
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  placeholder="e.g. Mandatory Department Library Book Return Notice"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Content</label>
                <textarea
                  rows={3}
                  required
                  value={annContent}
                  onChange={(e) => setAnnContent(e.target.value)}
                  placeholder="Instructions for students..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-md shadow-purple-200"
              >
                Broadcast Notice Now
              </button>
            </form>
          </div>

          {/* Quick Event Creator */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-purple-600" />
              <span>Schedule New Campus Event</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4">Add a seminar, hackathon, or cultural competition</p>

            <form onSubmit={handleCreateEventAdmin} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={evTitle}
                  onChange={(e) => setEvTitle(e.target.value)}
                  placeholder="e.g. Annual Alumni Mentorship Summit"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date</label>
                  <input
                    type="text"
                    required
                    value={evDate}
                    onChange={(e) => setEvDate(e.target.value)}
                    placeholder="Nov 30, 2026"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Venue</label>
                  <input
                    type="text"
                    required
                    value={evVenue}
                    onChange={(e) => setEvVenue(e.target.value)}
                    placeholder="Seminar Hall 1"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs shadow-md shadow-purple-200"
              >
                Publish Event to Calendar
              </button>
            </form>
          </div>

        </div>
      )}

      {/* TAB 2: MANAGE STUDENTS */}
      {activeTab === 'students' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Enrolled Student Profiles</h3>
            <span className="text-xs text-slate-500">{allStudents.length} Students Total</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-100">
                <tr>
                  <th className="px-6 py-3">Student Name</th>
                  <th className="px-6 py-3">Department & Semester</th>
                  <th className="px-6 py-3">University</th>
                  <th className="px-6 py-3">Role</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {allStudents.map((st) => (
                  <tr key={st.uid} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={st.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${st.uid}`}
                          alt={st.displayName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-bold text-slate-900">{st.displayName}</p>
                          <p className="text-slate-400 text-[11px]">{st.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-700">{st.branch}</p>
                      <p className="text-slate-400 text-[11px]">{st.semester}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {st.collegeName}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        st.role === 'admin'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {st.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <a
                        href={`mailto:${st.email}`}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px]"
                      >
                        Email
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: MODERATE NOTES */}
      {activeTab === 'notes' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Uploaded Study Notes Moderation</h3>
            <span className="text-xs text-slate-500">{notes.length} Total Documents</span>
          </div>

          <div className="divide-y divide-slate-100">
            {notes.map((note) => (
              <div key={note.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                    PDF
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                        {note.subject}
                      </span>
                      <span className="text-xs text-slate-500">
                        {note.branch} • {note.semester}
                      </span>
                      <span className={`px-2 py-0.2 rounded text-[10px] font-bold uppercase ${
                        note.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {note.status}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900">{note.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Uploaded by <strong>{note.uploaderName}</strong> ({note.uploaderEmail}) • {note.fileSize} • {note.downloadCount} downloads
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => downloadNote(note)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1"
                    title="Download Note File"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>

                  {note.status !== 'approved' && (
                    <button
                      onClick={() => updateNoteStatus(note.id, 'approved')}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve</span>
                    </button>
                  )}

                  <button
                    onClick={() => deleteNote(note.id)}
                    className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 text-xs font-semibold flex items-center gap-1"
                    title="Remove Note"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MANAGE EVENTS */}
      {activeTab === 'events' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Campus Events & Capacity Management</h3>
            <span className="text-xs text-slate-500">{events.length} Events Scheduled</span>
          </div>

          <div className="divide-y divide-slate-100">
            {events.map((ev) => (
              <div key={ev.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700">
                      {ev.category}
                    </span>
                    <span className="text-xs text-slate-500">
                      {ev.date} @ {ev.venue}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{ev.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Organized by {ev.organizer} • <strong>{ev.registeredCount} / {ev.capacity}</strong> attendees registered
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => deleteEvent(ev.id)}
                    className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel Event</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: PUBLISH ANNOUNCEMENTS */}
      {activeTab === 'announcements' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Published University Notices</h3>
            <span className="text-xs text-slate-500">{announcements.length} Notices Live</span>
          </div>

          <div className="divide-y divide-slate-100">
            {announcements.map((ann) => (
              <div key={ann.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {ann.isUrgent && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-600 text-white">
                        URGENT
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {ann.category}
                    </span>
                    <span className="text-xs text-slate-400">
                      Published: {new Date(ann.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{ann.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{ann.content}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => deleteAnnouncement(ann.id)}
                    className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-rose-200 text-xs font-semibold flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: MODERATE COMMUNITY POSTS */}
      {activeTab === 'posts' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Student Discussion Board Moderation</h3>
            <span className="text-xs text-slate-500">{posts.length} Active Posts</span>
          </div>

          <div className="divide-y divide-slate-100">
            {posts.map((post) => (
              <div key={post.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-500">
                      Posted by <strong>{post.authorName}</strong> ({post.authorEmail})
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{post.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2">{post.content}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => deletePost(post.id)}
                    className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Post</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
