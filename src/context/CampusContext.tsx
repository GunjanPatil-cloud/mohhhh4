import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  auth, 
  db, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  fbSignOut,
  onAuthStateChanged,
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  onSnapshot, 
  updateDoc, 
  deleteDoc, 
  addDoc,
  handleFirestoreError,
  OperationType,
  FirebaseUser
} from '../firebase';
import { 
  UserProfile, 
  AcademicNote, 
  CollegeEvent, 
  CommunityPost, 
  CollegeAnnouncement, 
  ActivePage,
  PostComment 
} from '../types';
import { 
  SEED_NOTES, 
  SEED_EVENTS, 
  SEED_POSTS, 
  SEED_ANNOUNCEMENTS, 
  SEED_USERS 
} from '../data/seedData';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface CampusContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  isAdmin: boolean;
  isLoadingAuth: boolean;
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  toasts: ToastMessage[];
  addToast: (type: 'success' | 'error' | 'info', title: string, message?: string) => void;
  removeToast: (id: string) => void;

  // Auth actions
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerStudent: (email: string, pass: string, data: Partial<UserProfile>) => Promise<void>;
  logout: () => Promise<void>;
  quickLoginAsDemo: (role: 'student' | 'admin') => void;
  updateUserProfile: (data: Partial<UserProfile>) => Promise<void>;

  // Notes
  notes: AcademicNote[];
  uploadNote: (note: Omit<AcademicNote, 'id' | 'createdAt' | 'downloadCount' | 'uploaderId' | 'uploaderName' | 'uploaderEmail' | 'status'>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  updateNoteStatus: (id: string, status: 'approved' | 'rejected') => Promise<void>;
  downloadNote: (note: AcademicNote) => void;
  savedNoteIds: string[];
  toggleSaveNote: (id: string) => void;

  // Events
  events: CollegeEvent[];
  registerForEvent: (eventId: string) => Promise<void>;
  unregisterFromEvent: (eventId: string) => Promise<void>;
  createEvent: (eventData: Omit<CollegeEvent, 'id' | 'createdAt' | 'registeredCount' | 'registeredUserIds' | 'createdBy'>) => Promise<void>;
  deleteEvent: (eventId: string) => Promise<void>;

  // Community
  posts: CommunityPost[];
  createPost: (title: string, content: string, category: CommunityPost['category']) => Promise<void>;
  toggleLikePost: (postId: string) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  comments: Record<string, PostComment[]>;
  addComment: (postId: string, content: string) => Promise<void>;

  // Announcements
  announcements: CollegeAnnouncement[];
  publishAnnouncement: (data: Omit<CollegeAnnouncement, 'id' | 'createdAt' | 'publishedBy'>) => Promise<void>;
  deleteAnnouncement: (id: string) => Promise<void>;

  // Students Directory
  allStudents: UserProfile[];
}

const CampusContext = createContext<CampusContextType | null>(null);

const ADMIN_BOOTSTRAP_EMAIL = 'gunjanpatilk@gmail.com';

export const CampusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [savedNoteIds, setSavedNoteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cc_saved_notes');
      return saved ? JSON.parse(saved) : ['note-1'];
    } catch {
      return ['note-1'];
    }
  });

  // Data collections state
  const [notes, setNotes] = useState<AcademicNote[]>(SEED_NOTES);
  const [events, setEvents] = useState<CollegeEvent[]>(SEED_EVENTS);
  const [posts, setPosts] = useState<CommunityPost[]>(SEED_POSTS);
  const [announcements, setAnnouncements] = useState<CollegeAnnouncement[]>(SEED_ANNOUNCEMENTS);
  const [allStudents, setAllStudents] = useState<UserProfile[]>(SEED_USERS);
  const [comments, setComments] = useState<Record<string, PostComment[]>>({
    'post-1': [
      {
        id: 'comm-1',
        postId: 'post-1',
        authorId: 'user_aarav',
        authorName: 'Aarav Sharma',
        authorPhoto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        content: 'Hey Priya! I can handle the backend integration with Node & PostgreSQL. Let’s connect on campus after 4 PM.',
        createdAt: '2026-10-30T13:00:00Z'
      },
      {
        id: 'comm-2',
        postId: 'post-1',
        authorId: 'user_ananya',
        authorName: 'Ananya Deshmukh',
        authorPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        content: 'I have experience in Figma & mobile accessibility patterns. Sent you an email!',
        createdAt: '2026-10-30T14:10:00Z'
      }
    ]
  });

  const addToast = (type: 'success' | 'error' | 'info', title: string, message?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Determine admin access
  const isAdmin = Boolean(
    (currentUser?.email && currentUser.email.toLowerCase() === ADMIN_BOOTSTRAP_EMAIL.toLowerCase()) ||
    userProfile?.role === 'admin'
  );

  // Sync saved notes in local storage
  const toggleSaveNote = (id: string) => {
    setSavedNoteIds(prev => {
      const updated = prev.includes(id) ? prev.filter(nId => nId !== id) : [...prev, id];
      localStorage.setItem('cc_saved_notes', JSON.stringify(updated));
      return updated;
    });
  };

  // Seed Firestore initial data if empty so live multi-user sync works
  const syncInitialFirestoreData = async () => {
    try {
      // Notes
      const notesRef = collection(db, 'notes');
      // Set up snapshot listener for notes
      onSnapshot(notesRef, (snapshot) => {
        if (!snapshot.empty) {
          const loaded: AcademicNote[] = [];
          snapshot.forEach(docSnap => {
            loaded.push({ id: docSnap.id, ...docSnap.data() } as AcademicNote);
          });
          setNotes(loaded);
        }
      }, (err) => {
        handleFirestoreError(err, OperationType.LIST, 'notes');
      });

      // Events
      const eventsRef = collection(db, 'events');
      onSnapshot(eventsRef, (snapshot) => {
        if (!snapshot.empty) {
          const loaded: CollegeEvent[] = [];
          snapshot.forEach(docSnap => {
            loaded.push({ id: docSnap.id, ...docSnap.data() } as CollegeEvent);
          });
          setEvents(loaded);
        }
      }, (err) => {
        handleFirestoreError(err, OperationType.LIST, 'events');
      });

      // Posts
      const postsRef = collection(db, 'posts');
      onSnapshot(postsRef, (snapshot) => {
        if (!snapshot.empty) {
          const loaded: CommunityPost[] = [];
          snapshot.forEach(docSnap => {
            loaded.push({ id: docSnap.id, ...docSnap.data() } as CommunityPost);
          });
          setPosts(loaded);
        }
      }, (err) => {
        handleFirestoreError(err, OperationType.LIST, 'posts');
      });

      // Announcements
      const annRef = collection(db, 'announcements');
      onSnapshot(annRef, (snapshot) => {
        if (!snapshot.empty) {
          const loaded: CollegeAnnouncement[] = [];
          snapshot.forEach(docSnap => {
            loaded.push({ id: docSnap.id, ...docSnap.data() } as CollegeAnnouncement);
          });
          setAnnouncements(loaded);
        }
      }, (err) => {
        handleFirestoreError(err, OperationType.LIST, 'announcements');
      });

      // Users
      const usersRef = collection(db, 'users');
      onSnapshot(usersRef, (snapshot) => {
        if (!snapshot.empty) {
          const loaded: UserProfile[] = [];
          snapshot.forEach(docSnap => {
            loaded.push({ uid: docSnap.id, ...docSnap.data() } as UserProfile);
          });
          // Merge with SEED_USERS ensuring unique UIDs
          const existingIds = new Set(loaded.map(u => u.uid));
          const merged = [...loaded, ...SEED_USERS.filter(u => !existingIds.has(u.uid))];
          setAllStudents(merged);
        }
      }, (err) => {
        handleFirestoreError(err, OperationType.LIST, 'users');
      });

    } catch (e) {
      console.warn('Initial listener setup notice:', e);
    }
  };

  // Auth observer
  useEffect(() => {
    syncInitialFirestoreData();

    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      setIsLoadingAuth(true);
      setCurrentUser(fbUser);
      if (fbUser) {
        try {
          const userDocRef = doc(db, 'users', fbUser.uid);
          const snap = await getDoc(userDocRef);
          if (snap.exists()) {
            setUserProfile(snap.data() as UserProfile);
          } else {
            // New user registration profile initialization
            const isBootstrappedAdmin = fbUser.email?.toLowerCase() === ADMIN_BOOTSTRAP_EMAIL.toLowerCase();
            const newProfile: UserProfile = {
              uid: fbUser.uid,
              email: fbUser.email || '',
              displayName: fbUser.displayName || fbUser.email?.split('@')[0] || 'Student',
              photoURL: fbUser.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${fbUser.uid}`,
              collegeName: 'National Institute of Technology',
              branch: 'Computer Science',
              semester: '4th Semester',
              bio: 'Active student at CampusConnect. Exploring technology, design, and campus opportunities.',
              skills: ['React', 'JavaScript', 'Problem Solving'],
              role: isBootstrappedAdmin ? 'admin' : 'student',
              createdAt: new Date().toISOString()
            };
            await setDoc(userDocRef, newProfile);
            setUserProfile(newProfile);
          }
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${fbUser.uid}`);
          // Fallback profile if Firestore is momentarily unreachable
          setUserProfile({
            uid: fbUser.uid,
            email: fbUser.email || 'student@campus.edu',
            displayName: fbUser.displayName || 'Campus Student',
            collegeName: 'National Institute of Technology',
            branch: 'Computer Science',
            semester: '4th Semester',
            skills: ['Python', 'Web Development'],
            role: fbUser.email?.toLowerCase() === ADMIN_BOOTSTRAP_EMAIL.toLowerCase() ? 'admin' : 'student',
            createdAt: new Date().toISOString()
          });
        }
      } else {
        setUserProfile(null);
      }
      setIsLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  // Quick Demo Login helper (convenient for immediate testing of both student and admin roles)
  const quickLoginAsDemo = (role: 'student' | 'admin') => {
    if (role === 'admin') {
      const adminProf: UserProfile = {
        uid: 'admin_demo_id',
        email: ADMIN_BOOTSTRAP_EMAIL,
        displayName: 'Campus Admin (Gunjan Patil)',
        photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        collegeName: 'National Institute of Technology',
        branch: 'Administration & Academic Affairs',
        semester: 'Staff / Admin',
        bio: 'Chief Platform Administrator & Student Welfare Coordinator.',
        skills: ['Academic Coordination', 'Event Oversight', 'Policy'],
        role: 'admin',
        createdAt: new Date().toISOString()
      };
      setUserProfile(adminProf);
      addToast('success', 'Switched to Admin Role', 'You have full access to manage students, approve notes, and publish alerts.');
    } else {
      const studentProf: UserProfile = {
        uid: 'user_aarav',
        email: 'aarav.sharma@campus.edu',
        displayName: 'Aarav Sharma',
        photoURL: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        collegeName: 'National Institute of Technology',
        branch: 'Computer Science & Engineering',
        semester: '6th Semester',
        bio: 'Passionate about distributed systems, React, and competitive coding.',
        skills: ['React', 'TypeScript', 'Docker', 'System Design'],
        role: 'student',
        createdAt: '2026-09-01T10:00:00Z'
      };
      setUserProfile(studentProf);
      addToast('success', 'Logged in as Student', 'Welcome, Aarav! Explore notes, events, and community.');
    }
  };

  // Google Login
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      addToast('success', 'Signed in successfully', 'Welcome to CampusConnect!');
    } catch (err: unknown) {
      console.error('Google Sign In Error:', err);
      const msg = err instanceof Error ? err.message : 'Google sign-in was cancelled or failed.';
      addToast('error', 'Sign In Failed', msg);
    }
  };

  // Email Login
  const loginWithEmail = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
      addToast('success', 'Welcome Back', 'Logged in successfully.');
    } catch (err: unknown) {
      console.error('Email login error:', err);
      const msg = err instanceof Error ? err.message : 'Invalid email or password.';
      addToast('error', 'Login Failed', msg);
      throw err;
    }
  };

  // Student Registration
  const registerStudent = async (email: string, pass: string, data: Partial<UserProfile>) => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, pass);
      const uid = userCred.user.uid;
      const profile: UserProfile = {
        uid,
        email,
        displayName: data.displayName || email.split('@')[0],
        photoURL: data.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${uid}`,
        collegeName: data.collegeName || 'National Institute of Technology',
        branch: data.branch || 'Computer Science',
        semester: data.semester || '1st Semester',
        bio: data.bio || 'New student on CampusConnect!',
        skills: data.skills || ['Learning'],
        role: email.toLowerCase() === ADMIN_BOOTSTRAP_EMAIL.toLowerCase() ? 'admin' : 'student',
        createdAt: new Date().toISOString()
      };
      await setDoc(doc(db, 'users', uid), profile);
      setUserProfile(profile);
      addToast('success', 'Registration Complete', 'Your CampusConnect account is ready!');
    } catch (err: unknown) {
      console.error('Registration error:', err);
      const msg = err instanceof Error ? err.message : 'Registration failed. Please check inputs.';
      addToast('error', 'Registration Error', msg);
      throw err;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await fbSignOut(auth);
      setUserProfile(null);
      addToast('info', 'Logged Out', 'You have been signed out safely.');
    } catch {
      setUserProfile(null);
      setCurrentUser(null);
    }
  };

  // Update Profile
  const updateUserProfile = async (data: Partial<UserProfile>) => {
    if (!userProfile) return;
    const updated: UserProfile = { ...userProfile, ...data };
    try {
      if (currentUser?.uid) {
        await updateDoc(doc(db, 'users', currentUser.uid), data);
      }
    } catch (e) {
      console.warn('Profile local update sync:', e);
    }
    setUserProfile(updated);
    // update allStudents list as well
    setAllStudents(prev => prev.map(s => s.uid === updated.uid ? updated : s));
    addToast('success', 'Profile Updated', 'Your student profile information has been saved.');
  };

  // Upload Note
  const uploadNote = async (noteData: Omit<AcademicNote, 'id' | 'createdAt' | 'downloadCount' | 'uploaderId' | 'uploaderName' | 'uploaderEmail' | 'status'>) => {
    const authorId = userProfile?.uid || currentUser?.uid || 'user_guest';
    const authorName = userProfile?.displayName || 'Campus Scholar';
    const authorEmail = userProfile?.email || 'scholar@campus.edu';

    const newNote: AcademicNote = {
      ...noteData,
      id: `note-${Date.now()}`,
      uploaderId: authorId,
      uploaderName: authorName,
      uploaderEmail: authorEmail,
      status: isAdmin ? 'approved' : 'approved', // Auto-approved for frictionless student use
      downloadCount: 0,
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'notes', newNote.id), newNote);
    } catch {
      // Local fallback
    }
    setNotes(prev => [newNote, ...prev]);
    addToast('success', 'Note Published!', `"${newNote.title}" is now available for all students.`);
  };

  // Delete Note
  const deleteNote = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'notes', id));
    } catch {
      // Local fallback
    }
    setNotes(prev => prev.filter(n => n.id !== id));
    addToast('info', 'Note Removed', 'The study note has been deleted.');
  };

  // Approve / Reject Note
  const updateNoteStatus = async (id: string, status: 'approved' | 'rejected') => {
    try {
      await updateDoc(doc(db, 'notes', id), { status });
    } catch {
      // Local fallback
    }
    setNotes(prev => prev.map(n => n.id === id ? { ...n, status } : n));
    addToast('success', 'Note Status Updated', `Note marked as ${status}.`);
  };

  // Download Note (Generates downloadable file blob and increments counter)
  const downloadNote = (note: AcademicNote) => {
    try {
      // Increment counter in Firestore & local state
      setNotes(prev => prev.map(n => n.id === note.id ? { ...n, downloadCount: n.downloadCount + 1 } : n));
      if (currentUser) {
        updateDoc(doc(db, 'notes', note.id), {
          downloadCount: (note.downloadCount || 0) + 1
        }).catch(() => {});
      }

      // If note has base64 data, use it; otherwise create a styled academic summary document
      let url = '';
      if (note.fileData && note.fileData.startsWith('data:')) {
        url = note.fileData;
      } else {
        const content = `====================================================
CAMPUSCONNECT ACADEMIC RESOURCE VAULT
====================================================
Title: ${note.title}
Subject: ${note.subject}
Branch: ${note.branch} | Semester: ${note.semester}
Uploaded By: ${note.uploaderName} (${note.uploaderEmail})
Date Published: ${new Date(note.createdAt).toLocaleDateString()}
Total Downloads: ${note.downloadCount + 1}
====================================================

MODULE SYNOPSIS & KEY STUDY POINTS:
${note.description}

----------------------------------------------------
EXAM REVISION HIGHLIGHTS:
- Comprehensive topic coverage according to latest university syllabus.
- High-yield formulas, theorems, and schematic diagrams included.
- Reference questions and solved past examination papers.

Verified & shared on CampusConnect - Your Campus. Your Community.
====================================================`;
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        url = URL.createObjectURL(blob);
      }

      const link = document.createElement('a');
      link.href = url;
      link.download = note.fileName.endsWith('.pdf') ? note.fileName : `${note.fileName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      addToast('success', 'Download Started', `Saved "${note.fileName}" to your device.`);
    } catch (e) {
      console.error('Download error:', e);
      addToast('error', 'Download Failed', 'Could not save file to disk.');
    }
  };

  // Events: Register
  const registerForEvent = async (eventId: string) => {
    const uid = userProfile?.uid || currentUser?.uid || 'guest_user';
    const targetEvent = events.find(e => e.id === eventId);
    if (!targetEvent) return;

    if (targetEvent.registeredUserIds.includes(uid)) {
      addToast('info', 'Already Registered', 'You are already confirmed for this event.');
      return;
    }

    const updatedUserIds = [...targetEvent.registeredUserIds, uid];
    const newCount = targetEvent.registeredCount + 1;

    setEvents(prev => prev.map(e => e.id === eventId ? {
      ...e,
      registeredCount: newCount,
      registeredUserIds: updatedUserIds
    } : e));

    try {
      await updateDoc(doc(db, 'events', eventId), {
        registeredCount: newCount,
        registeredUserIds: updatedUserIds
      });
    } catch {
      // Local fallback
    }

    addToast('success', 'Registration Confirmed!', `You are registered for "${targetEvent.title}". Check your dashboard!`);
  };

  // Events: Unregister
  const unregisterFromEvent = async (eventId: string) => {
    const uid = userProfile?.uid || currentUser?.uid || 'guest_user';
    const targetEvent = events.find(e => e.id === eventId);
    if (!targetEvent) return;

    const updatedUserIds = targetEvent.registeredUserIds.filter(id => id !== uid);
    const newCount = Math.max(0, targetEvent.registeredCount - 1);

    setEvents(prev => prev.map(e => e.id === eventId ? {
      ...e,
      registeredCount: newCount,
      registeredUserIds: updatedUserIds
    } : e));

    try {
      await updateDoc(doc(db, 'events', eventId), {
        registeredCount: newCount,
        registeredUserIds: updatedUserIds
      });
    } catch {
      // Local fallback
    }

    addToast('info', 'Registration Cancelled', `You uncurled your ticket for "${targetEvent.title}".`);
  };

  // Create Event
  const createEvent = async (eventData: Omit<CollegeEvent, 'id' | 'createdAt' | 'registeredCount' | 'registeredUserIds' | 'createdBy'>) => {
    const uid = userProfile?.uid || currentUser?.uid || 'admin_user';
    const newEv: CollegeEvent = {
      ...eventData,
      id: `event-${Date.now()}`,
      registeredCount: 0,
      registeredUserIds: [],
      createdBy: uid,
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'events', newEv.id), newEv);
    } catch {
      // Local fallback
    }

    setEvents(prev => [newEv, ...prev]);
    addToast('success', 'Event Created', `"${newEv.title}" is now open for registrations.`);
  };

  // Delete Event
  const deleteEvent = async (eventId: string) => {
    try {
      await deleteDoc(doc(db, 'events', eventId));
    } catch {
      // Local fallback
    }
    setEvents(prev => prev.filter(e => e.id !== eventId));
    addToast('info', 'Event Removed', 'The event has been cancelled and removed.');
  };

  // Community: Create Post
  const createPost = async (title: string, content: string, category: CommunityPost['category']) => {
    const authorId = userProfile?.uid || currentUser?.uid || 'guest_user';
    const authorName = userProfile?.displayName || 'Anonymous Student';
    const authorEmail = userProfile?.email || 'student@campus.edu';
    const authorPhoto = userProfile?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${authorId}`;
    const authorBranch = userProfile?.branch || 'General';

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorId,
      authorName,
      authorEmail,
      authorPhoto,
      authorBranch,
      title,
      content,
      category,
      likes: [],
      commentsCount: 0,
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'posts', newPost.id), newPost);
    } catch {
      // Local fallback
    }

    setPosts(prev => [newPost, ...prev]);
    addToast('success', 'Post Shared', 'Your discussion has been published to the student forum.');
  };

  // Community: Toggle Like
  const toggleLikePost = async (postId: string) => {
    const uid = userProfile?.uid || currentUser?.uid || 'guest_user';
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const hasLiked = post.likes.includes(uid);
    const updatedLikes = hasLiked ? post.likes.filter(id => id !== uid) : [...post.likes, uid];

    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes: updatedLikes } : p));

    try {
      await updateDoc(doc(db, 'posts', postId), { likes: updatedLikes });
    } catch {
      // Local fallback
    }
  };

  // Community: Delete Post
  const deletePost = async (postId: string) => {
    try {
      await deleteDoc(doc(db, 'posts', postId));
    } catch {
      // Local fallback
    }
    setPosts(prev => prev.filter(p => p.id !== postId));
    addToast('info', 'Post Deleted', 'The community post was removed.');
  };

  // Community: Add Comment
  const addComment = async (postId: string, content: string) => {
    const authorId = userProfile?.uid || currentUser?.uid || 'guest_user';
    const authorName = userProfile?.displayName || 'Campus Student';
    const authorPhoto = userProfile?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${authorId}`;

    const newComment: PostComment = {
      id: `comm-${Date.now()}`,
      postId,
      authorId,
      authorName,
      authorPhoto,
      content,
      createdAt: new Date().toISOString()
    };

    // Update local state
    setComments(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment]
    }));

    // Update post comment count
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, commentsCount: (p.commentsCount || 0) + 1 } : p));

    try {
      const commRef = collection(db, 'posts', postId, 'comments');
      await addDoc(commRef, newComment);
      await updateDoc(doc(db, 'posts', postId), {
        commentsCount: (posts.find(p => p.id === postId)?.commentsCount || 0) + 1
      });
    } catch {
      // Local fallback
    }

    addToast('success', 'Comment Added', 'Your reply has been posted.');
  };

  // Announcements: Publish
  const publishAnnouncement = async (data: Omit<CollegeAnnouncement, 'id' | 'createdAt' | 'publishedBy'>) => {
    const publisher = userProfile?.displayName || 'College Administration';
    const newAnn: CollegeAnnouncement = {
      ...data,
      id: `ann-${Date.now()}`,
      publishedBy: publisher,
      publishedById: userProfile?.uid || currentUser?.uid,
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'announcements', newAnn.id), newAnn);
    } catch {
      // Local fallback
    }

    setAnnouncements(prev => [newAnn, ...prev]);
    addToast('success', 'Announcement Published', `"${newAnn.title}" is now broadcast to the campus.`);
  };

  // Announcements: Delete
  const deleteAnnouncement = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'announcements', id));
    } catch {
      // Local fallback
    }
    setAnnouncements(prev => prev.filter(a => a.id !== id));
    addToast('info', 'Announcement Deleted', 'The notice has been archived.');
  };

  return (
    <CampusContext.Provider
      value={{
        currentUser,
        userProfile,
        isAdmin,
        isLoadingAuth,
        activePage,
        setActivePage,
        toasts,
        addToast,
        removeToast,
        loginWithGoogle,
        loginWithEmail,
        registerStudent,
        logout,
        quickLoginAsDemo,
        updateUserProfile,
        notes,
        uploadNote,
        deleteNote,
        updateNoteStatus,
        downloadNote,
        savedNoteIds,
        toggleSaveNote,
        events,
        registerForEvent,
        unregisterFromEvent,
        createEvent,
        deleteEvent,
        posts,
        createPost,
        toggleLikePost,
        deletePost,
        comments,
        addComment,
        announcements,
        publishAnnouncement,
        deleteAnnouncement,
        allStudents,
      }}
    >
      {children}
    </CampusContext.Provider>
  );
};

export const useCampus = () => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
};
