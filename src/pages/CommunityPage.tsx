import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { CommunityPost } from '../types';
import { 
  Users, 
  MessageSquare, 
  Heart, 
  Send, 
  Trash2, 
  Search, 
  Plus, 
  X, 
  Sparkles, 
  Mail, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2,
  Tag
} from 'lucide-react';

const POST_CATEGORIES: CommunityPost['category'][] = [
  'Academic',
  'Projects',
  'Career',
  'Campus Life',
  'Ask Senior',
  'General'
];

export const CommunityPage: React.FC = () => {
  const { 
    posts, 
    createPost, 
    toggleLikePost, 
    deletePost, 
    comments, 
    addComment, 
    allStudents, 
    currentUser, 
    userProfile, 
    isAdmin,
    addToast
  } = useCampus();

  const [activeTab, setActiveTab] = useState<'discussions' | 'directory'>('discussions');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  // Search state
  const [postSearch, setPostSearch] = useState('');
  const [directorySearch, setDirectorySearch] = useState('');

  // New Post Form State
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<CommunityPost['category']>('Academic');

  const uid = userProfile?.uid || currentUser?.uid || '';

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    await createPost(title, content, category);
    setTitle('');
    setContent('');
    setIsCreateModalOpen(false);
  };

  const toggleComments = (postId: string) => {
    setExpandedComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleAddComment = async (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    await addComment(postId, text);
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    setExpandedComments(prev => ({ ...prev, [postId]: true }));
  };

  // Filter posts
  const filteredPosts = posts.filter(p => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (postSearch.trim()) {
      const q = postSearch.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        p.authorName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Filter students
  const filteredStudents = allStudents.filter(s => {
    if (!directorySearch.trim()) return true;
    const q = directorySearch.toLowerCase();
    const matchName = s.displayName?.toLowerCase().includes(q);
    const matchBranch = s.branch?.toLowerCase().includes(q);
    const matchCollege = s.collegeName?.toLowerCase().includes(q);
    const matchBio = s.bio?.toLowerCase().includes(q);
    const matchSkills = s.skills?.some(skill => skill.toLowerCase().includes(q));
    return matchName || matchBranch || matchCollege || matchBio || matchSkills;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
              Campus Student Network
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {posts.length} Active Threads • {allStudents.length} Students Registered
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Student Community & Discussions
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            Ask questions, form project teams for hackathons, seek senior career advice, and discover peers from your college.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md shadow-indigo-200 transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Discussion Post</span>
        </button>
      </div>

      {/* Main Tabs: Discussions vs Directory */}
      <div className="flex items-center justify-between border-b border-slate-200">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('discussions')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'discussions'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discussions & Questions</span>
            <span className="px-1.5 py-0.2 rounded-full text-xs bg-slate-100 text-slate-600 font-semibold">
              {posts.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('directory')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
              activeTab === 'directory'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Student Directory</span>
            <span className="px-1.5 py-0.2 rounded-full text-xs bg-slate-100 text-slate-600 font-semibold">
              {allStudents.length}
            </span>
          </button>
        </div>
      </div>

      {/* DISCUSSIONS TAB */}
      {activeTab === 'discussions' && (
        <div className="space-y-6">
          
          {/* Filter Pills and Search */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                All Topics
              </button>
              {POST_CATEGORIES.map(cat => (
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

            <div className="relative w-full md:w-72 shrink-0">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                value={postSearch}
                onChange={(e) => setPostSearch(e.target.value)}
                placeholder="Search discussions..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
              />
            </div>
          </div>

          {/* Posts Feed */}
          <div className="space-y-4">
            {filteredPosts.map((post) => {
              const hasLiked = post.likes.includes(uid);
              const isOwner = post.authorId === uid || isAdmin;
              const postCommentsList = comments[post.id] || [];
              const isExpanded = Boolean(expandedComments[post.id]);

              return (
                <div
                  key={post.id}
                  className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs hover:border-slate-300 transition-all"
                >
                  {/* Author Header */}
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.authorPhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${post.authorId}`}
                        alt={post.authorName}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900">{post.authorName}</h4>
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700">
                            {post.authorBranch || 'Student'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {new Date(post.createdAt).toLocaleDateString()} at {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                        {post.category}
                      </span>
                      {isOwner && (
                        <button
                          onClick={() => deletePost(post.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Delete your post"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Post Content */}
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {post.content}
                  </p>

                  {/* Interaction bar: Likes & Comments */}
                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleLikePost(post.id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-colors ${
                          hasLiked
                            ? 'bg-rose-50 border-rose-200 text-rose-600 font-semibold'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${hasLiked ? 'fill-rose-600 text-rose-600' : ''}`} />
                        <span>{post.likes.length} {post.likes.length === 1 ? 'Upvote' : 'Upvotes'}</span>
                      </button>

                      <button
                        onClick={() => toggleComments(post.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors font-medium"
                      >
                        <MessageSquare className="w-4 h-4 text-slate-500" />
                        <span>{postCommentsList.length} {postCommentsList.length === 1 ? 'Reply' : 'Replies'}</span>
                      </button>
                    </div>

                    <span className="text-[11px] text-slate-400">
                      Community discussion
                    </span>
                  </div>

                  {/* Comments Thread Section */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 bg-slate-50/50 p-4 rounded-2xl">
                      <h5 className="text-xs font-bold text-slate-700 mb-2">Replies & Insights</h5>
                      
                      {postCommentsList.length === 0 ? (
                        <p className="text-xs text-slate-400 italic">No replies yet. Be the first to share an answer!</p>
                      ) : (
                        <div className="space-y-2.5">
                          {postCommentsList.map((comm) => (
                            <div key={comm.id} className="p-3 rounded-xl bg-white border border-slate-100 text-xs">
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold text-slate-800">{comm.authorName}</span>
                                <span className="text-[10px] text-slate-400">
                                  {new Date(comm.createdAt).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="text-slate-600 leading-relaxed">{comm.content}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Reply Input */}
                      <div className="mt-3 flex gap-2">
                        <input
                          type="text"
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleAddComment(post.id);
                          }}
                          placeholder="Write a helpful reply..."
                          className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors flex items-center gap-1 shadow-xs"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STUDENT DIRECTORY TAB */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={directorySearch}
                onChange={(e) => setDirectorySearch(e.target.value)}
                placeholder="Search by student name, major, or skill (e.g. Python, Figma, React)..."
                className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Showing {filteredStudents.length} fellow students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <div
                key={student.uid}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={student.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${student.uid}`}
                      alt={student.displayName}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-100 shadow-xs"
                    />
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{student.displayName}</h3>
                      <p className="text-xs text-indigo-600 font-semibold">{student.branch}</p>
                      <p className="text-[11px] text-slate-400">{student.semester}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {student.bio || 'College student collaborating on CampusConnect.'}
                  </p>

                  {/* Skills tags */}
                  {student.skills && student.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {student.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 truncate max-w-[150px]">
                    {student.collegeName}
                  </span>
                  <a
                    href={`mailto:${student.email}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-semibold transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Contact</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Discussion Post Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Start a Campus Discussion</h3>
                <p className="text-xs text-indigo-100">Ask a question or share ideas with students</p>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Topic / Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CommunityPost['category'])}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  {POST_CATEGORIES.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Discussion Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Seeking recommendations for best cloud computing courses"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Content / Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Provide context, what you are trying to solve, or what kind of collaborators you need..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md shadow-indigo-200"
                >
                  Publish Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
