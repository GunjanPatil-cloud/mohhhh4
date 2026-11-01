import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  User, 
  School, 
  BookOpen, 
  Calendar, 
  Sparkles, 
  Edit3, 
  CheckCircle2, 
  X, 
  Download, 
  Plus, 
  Trash2, 
  Mail, 
  Bookmark,
  ShieldCheck
} from 'lucide-react';

interface ProfilePageProps {
  onOpenAuth: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onOpenAuth }) => {
  const { 
    userProfile, 
    currentUser, 
    updateUserProfile, 
    notes, 
    events, 
    downloadNote, 
    deleteNote, 
    unregisterFromEvent, 
    savedNoteIds, 
    toggleSaveNote,
    isAdmin 
  } = useCampus();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'notes' | 'events' | 'saved'>('notes');

  // Edit form state
  const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
  const [collegeName, setCollegeName] = useState(userProfile?.collegeName || '');
  const [branch, setBranch] = useState(userProfile?.branch || '');
  const [semester, setSemester] = useState(userProfile?.semester || '');
  const [bio, setBio] = useState(userProfile?.bio || '');
  const [newSkillInput, setNewSkillInput] = useState('');
  const [skills, setSkills] = useState<string[]>(userProfile?.skills || []);
  const [photoURL, setPhotoURL] = useState(userProfile?.photoURL || '');

  const openEditModal = () => {
    setDisplayName(userProfile?.displayName || '');
    setCollegeName(userProfile?.collegeName || '');
    setBranch(userProfile?.branch || '');
    setSemester(userProfile?.semester || '');
    setBio(userProfile?.bio || '');
    setSkills(userProfile?.skills || []);
    setPhotoURL(userProfile?.photoURL || '');
    setIsEditModalOpen(true);
  };

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      setSkills([...skills, newSkillInput.trim()]);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUserProfile({
      displayName,
      collegeName,
      branch,
      semester,
      bio,
      skills,
      photoURL: photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${displayName || 'user'}`
    });
    setIsEditModalOpen(false);
  };

  const uid = userProfile?.uid || currentUser?.uid;
  const myUploadedNotes = notes.filter(n => n.uploaderId === uid);
  const myEvents = events.filter(e => e.registeredUserIds.includes(uid || ''));
  const mySavedNotes = notes.filter(n => savedNoteIds.includes(n.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        
        {/* Cover backdrop */}
        <div className="h-36 sm:h-48 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white backdrop-blur-xs flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>{isAdmin ? 'Campus Administrator' : 'Verified Student'}</span>
            </span>
          </div>
        </div>

        {/* Profile Info Row */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between -mt-16 sm:-mt-20 gap-4 mb-6">
            <div className="flex items-end gap-4 sm:gap-6">
              <img
                src={userProfile?.photoURL || currentUser?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=user`}
                alt="Avatar"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-white shadow-xl bg-white shrink-0"
              />
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {userProfile?.displayName || currentUser?.displayName || 'Student Profile'}
                  </h1>
                  {isAdmin && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700">
                      ADMIN
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-indigo-600">
                  {userProfile?.branch || 'Computer Science & Engineering'} • {userProfile?.semester || '4th Semester'}
                </p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <School className="w-3.5 h-3.5 text-slate-400" />
                  <span>{userProfile?.collegeName || 'National Institute of Technology'}</span>
                </p>
              </div>
            </div>

            <button
              onClick={openEditModal}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors shrink-0 shadow-xs"
            >
              <Edit3 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Edit Profile</span>
            </button>
          </div>

          {/* Bio & Skills */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100 text-xs">
            
            <div className="md:col-span-2 space-y-3">
              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                  About / Bio
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {userProfile?.bio || 'Active college student participating in university hackathons and sharing academic course notes.'}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                  Skills & Technical Interests
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {(userProfile?.skills && userProfile.skills.length > 0) ? (
                    userProfile.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-slate-400 italic">No skills listed yet. Click edit to add tags.</span>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Stats Summary */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-around">
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500">Notes Uploaded:</span>
                <span className="font-bold text-slate-900 text-sm">{myUploadedNotes.length}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-t border-slate-200/60">
                <span className="text-slate-500">Events Attending:</span>
                <span className="font-bold text-slate-900 text-sm">{myEvents.length}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-t border-slate-200/60">
                <span className="text-slate-500">Saved Notes:</span>
                <span className="font-bold text-slate-900 text-sm">{mySavedNotes.length}</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Profile Activity Tabs */}
      <div className="space-y-4">
        <div className="flex border-b border-slate-200">
          <button
            onClick={() => setActiveTab('notes')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'notes'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>My Uploaded Notes ({myUploadedNotes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`pb-3 ml-6 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'events'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>My Registered Events ({myEvents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-3 ml-6 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'saved'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Bookmarked Notes ({mySavedNotes.length})</span>
          </button>
        </div>

        {/* Tab 1: Uploaded Notes */}
        {activeTab === 'notes' && (
          <div>
            {myUploadedNotes.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 p-6">
                <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">No notes uploaded by you yet</p>
                <p className="text-xs text-slate-500 mt-0.5">Share lecture notes or past papers with students to earn karma points!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myUploadedNotes.map((note) => (
                  <div key={note.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                        {note.subject}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-2 line-clamp-1">{note.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{note.description}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-400">{note.downloadCount} downloads</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => downloadNote(note)}
                          className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Registered Events */}
        {activeTab === 'events' && (
          <div>
            {myEvents.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 p-6">
                <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">No events registered</p>
                <p className="text-xs text-slate-500 mt-0.5">Explore the college calendar and RSVP for upcoming hackathons or workshops!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {myEvents.map((ev) => (
                  <div key={ev.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between gap-4">
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700">
                        {ev.category}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-1">{ev.title}</h4>
                      <p className="text-xs text-slate-500">{ev.date} @ {ev.venue}</p>
                    </div>
                    <button
                      onClick={() => unregisterFromEvent(ev.id)}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold shrink-0"
                    >
                      Cancel RSVP
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Notes */}
        {activeTab === 'saved' && (
          <div>
            {mySavedNotes.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 p-6">
                <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-bold text-slate-700">No saved notes</p>
                <p className="text-xs text-slate-500 mt-0.5">Click the bookmark icon on any note in the vault to keep it accessible here!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mySavedNotes.map((note) => (
                  <div key={note.id} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700">
                        {note.subject}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-2 line-clamp-1">{note.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{note.description}</p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-400">{note.fileSize}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => downloadNote(note)}
                          className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleSaveNote(note.id)}
                          className="p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100"
                          title="Remove bookmark"
                        >
                          <Bookmark className="w-4 h-4 fill-current" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Edit Student Profile</h3>
                <p className="text-xs text-indigo-100">Update your university info and technical skills</p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  College / University *
                </label>
                <input
                  type="text"
                  required
                  value={collegeName}
                  onChange={(e) => setCollegeName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Branch / Major *
                  </label>
                  <input
                    type="text"
                    required
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Semester *
                  </label>
                  <input
                    type="text"
                    required
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Profile Avatar Image URL
                </label>
                <input
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Bio
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Skills & Interests Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newSkillInput}
                    onChange={(e) => setNewSkillInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill();
                      }
                    }}
                    placeholder="e.g. React, Python, Figma, MATLAB..."
                    className="flex-1 px-3 py-1.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 flex items-center gap-1 font-semibold"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-indigo-400 hover:text-rose-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md shadow-indigo-200"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
