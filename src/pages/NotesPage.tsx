import React, { useState, useMemo } from 'react';
import { useCampus } from '../context/CampusContext';
import { AcademicNote } from '../types';
import { 
  BookOpen, 
  Search, 
  Filter, 
  Upload, 
  Download, 
  Bookmark, 
  Trash2, 
  FileText, 
  Calendar, 
  User, 
  X, 
  CheckCircle2, 
  Sparkles,
  ExternalLink,
  Layers
} from 'lucide-react';

const BRANCH_OPTIONS = [
  'All Branches',
  'Computer Science',
  'Information Technology',
  'Electronics & Communication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Business Administration',
];

const SEMESTER_OPTIONS = [
  'All Semesters',
  '1st Semester',
  '2nd Semester',
  '3rd Semester',
  '4th Semester',
  '5th Semester',
  '6th Semester',
  '7th Semester',
  '8th Semester',
];

interface NotesPageProps {
  isUploadModalOpen: boolean;
  onCloseUploadModal: () => void;
  onOpenUploadModal: () => void;
}

export const NotesPage: React.FC<NotesPageProps> = ({
  isUploadModalOpen,
  onCloseUploadModal,
  onOpenUploadModal
}) => {
  const { 
    notes, 
    uploadNote, 
    deleteNote, 
    downloadNote, 
    savedNoteIds, 
    toggleSaveNote, 
    currentUser, 
    userProfile, 
    isAdmin 
  } = useCampus();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('All Branches');
  const [selectedSemester, setSelectedSemester] = useState('All Semesters');
  const [activeTab, setActiveTab] = useState<'all' | 'saved'>('all');
  const [previewNote, setPreviewNote] = useState<AcademicNote | null>(null);

  // Upload Form State
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [branch, setBranch] = useState('Computer Science');
  const [semester, setSemester] = useState('3rd Semester');
  const [description, setDescription] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [fileData, setFileData] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // File picker handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSize(`${(file.size / (1024 * 1024)).toFixed(1)} MB`);
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileData(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await uploadNote({
        title,
        subject,
        branch,
        semester,
        description: description || `Comprehensive handwritten study notes for ${subject}.`,
        fileName: fileName || `${subject.replace(/\s+/g, '_')}_Notes.pdf`,
        fileSize: fileSize || '3.2 MB',
        fileData: fileData || undefined
      });
      // reset form
      setTitle('');
      setSubject('');
      setDescription('');
      setFileName('');
      setFileSize('');
      setFileData('');
      onCloseUploadModal();
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter notes
  const filteredNotes = useMemo(() => {
    return notes.filter((n) => {
      if (activeTab === 'saved' && !savedNoteIds.includes(n.id)) {
        return false;
      }
      if (selectedBranch !== 'All Branches' && !n.branch.toLowerCase().includes(selectedBranch.toLowerCase())) {
        return false;
      }
      if (selectedSemester !== 'All Semesters' && !n.semester.toLowerCase().includes(selectedSemester.toLowerCase())) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = n.title.toLowerCase().includes(q);
        const matchSubject = n.subject.toLowerCase().includes(q);
        const matchUploader = n.uploaderName.toLowerCase().includes(q);
        const matchDesc = n.description?.toLowerCase().includes(q);
        if (!matchTitle && !matchSubject && !matchUploader && !matchDesc) {
          return false;
        }
      }
      return true;
    });
  }, [notes, searchQuery, selectedBranch, selectedSemester, activeTab, savedNoteIds]);

  const uid = userProfile?.uid || currentUser?.uid;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
              Academic Resource Vault
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {notes.length} Total Verified Notes
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Academic Notes Sharing
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Download syllabus-aligned notes, handwritten lecture formulas, and past year question papers shared by toppers.
          </p>
        </div>

        <button
          onClick={onOpenUploadModal}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-200 transition-all active:scale-95 shrink-0"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Academic Notes</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by subject, topic, note title, or uploader..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Branch Filter */}
          <div className="w-full sm:w-56 shrink-0">
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="w-full py-2 px-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              {BRANCH_OPTIONS.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* Semester Filter */}
          <div className="w-full sm:w-48 shrink-0">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full py-2 px-3 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              {SEMESTER_OPTIONS.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab filters: All vs Saved */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Notes ({notes.length})
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                activeTab === 'saved'
                  ? 'bg-amber-50 text-amber-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Saved / Bookmarked ({savedNoteIds.length})
            </button>
          </div>

          <span className="text-slate-500">
            Showing <strong>{filteredNotes.length}</strong> resources
          </span>
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No notes found matching your filters</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search query, or be the first student to upload notes for this subject!
          </p>
          <button
            onClick={onOpenUploadModal}
            className="mt-4 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-xs hover:bg-indigo-700"
          >
            Upload Study Material
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => {
            const isSaved = savedNoteIds.includes(note.id);
            const isOwner = note.uploaderId === uid || isAdmin;

            return (
              <div
                key={note.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Subject and Semester Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 truncate max-w-[180px]">
                      {note.subject}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 shrink-0">
                      {note.semester}
                    </span>
                  </div>

                  {/* Note Title */}
                  <h3 
                    onClick={() => setPreviewNote(note)}
                    className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer line-clamp-2"
                  >
                    {note.title}
                  </h3>

                  {/* Branch */}
                  <p className="text-xs text-indigo-600 font-medium mt-1">
                    {note.branch}
                  </p>

                  {/* Description */}
                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {note.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100">
                  {/* Uploader info & Date */}
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-bold uppercase">
                        {note.uploaderName[0]}
                      </div>
                      <span className="truncate max-w-[120px] font-medium text-slate-700">
                        {note.uploaderName}
                      </span>
                    </div>
                    <span className="text-[11px]">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => downloadNote(note)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white text-xs font-semibold shadow-xs transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>

                    <button
                      onClick={() => toggleSaveNote(note.id)}
                      className={`p-2 rounded-xl border transition-colors ${
                        isSaved
                          ? 'bg-amber-50 border-amber-200 text-amber-600'
                          : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                      }`}
                      title={isSaved ? 'Remove bookmark' : 'Bookmark note'}
                    >
                      <Bookmark className="w-4 h-4 fill-current" />
                    </button>

                    {isOwner && (
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-rose-600 hover:border-rose-200 hover:bg-rose-50 transition-colors"
                        title="Delete note"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{note.fileName}</span>
                    <span className="font-medium text-slate-500">{note.downloadCount} downloads</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Upload Notes Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
            
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Upload Academic Notes</h3>
                <p className="text-xs text-indigo-100">Share revision material with fellow students</p>
              </div>
              <button
                onClick={onCloseUploadModal}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Note Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Data Structures Unit 1-4 Complete Solved Papers"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Subject & Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Operating Systems (CS-401)"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Semester *
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                  >
                    {SEMESTER_OPTIONS.filter(s => s !== 'All Semesters').map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Department / Branch *
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {BRANCH_OPTIONS.filter(b => b !== 'All Branches').map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Topics Covered / Summary
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Briefly describe what formulas, units, and problems are included in this document..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              {/* PDF File Picker */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Attach PDF Document *
                </label>
                <div className="border-2 border-dashed border-slate-200 hover:border-indigo-400 rounded-2xl p-4 text-center transition-colors bg-slate-50/50">
                  <input
                    type="file"
                    id="note-file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="note-file" className="cursor-pointer">
                    <FileText className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
                    {fileName ? (
                      <p className="font-bold text-slate-800">{fileName} ({fileSize})</p>
                    ) : (
                      <>
                        <p className="font-semibold text-indigo-600">Click to choose PDF or document</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">PDF, DOC up to 25MB</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onCloseUploadModal}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md shadow-indigo-200 disabled:opacity-50"
                >
                  {isSubmitting ? 'Uploading...' : 'Publish to Vault'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Note Preview Modal */}
      {previewNote && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700">
                    {previewNote.subject}
                  </span>
                  <span className="text-xs text-slate-500">{previewNote.semester}</span>
                </div>
                <button 
                  onClick={() => setPreviewNote(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <h2 className="text-lg font-bold text-slate-900">{previewNote.title}</h2>
              <p className="text-xs text-indigo-600 font-semibold mt-0.5">{previewNote.branch}</p>

              <div className="my-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-2">
                <p className="font-semibold text-slate-900">Module Synopsis:</p>
                <p className="leading-relaxed">{previewNote.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-slate-500 mb-6">
                <div>
                  <span className="block text-[11px] text-slate-400">Uploaded By:</span>
                  <span className="font-semibold text-slate-700">{previewNote.uploaderName}</span>
                </div>
                <div>
                  <span className="block text-[11px] text-slate-400">File & Size:</span>
                  <span className="font-semibold text-slate-700">{previewNote.fileName} ({previewNote.fileSize})</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    downloadNote(previewNote);
                    setPreviewNote(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-200 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Document</span>
                </button>
                <button
                  onClick={() => setPreviewNote(null)}
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
