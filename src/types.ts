export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  collegeName: string;
  branch: string;
  semester: string;
  bio?: string;
  skills: string[];
  role: 'student' | 'admin';
  createdAt: string;
}

export interface AcademicNote {
  id: string;
  title: string;
  subject: string;
  branch: string;
  semester: string;
  description: string;
  fileName: string;
  fileData?: string; // Data URL or base64
  fileSize: string;
  uploaderId: string;
  uploaderName: string;
  uploaderEmail: string;
  status: 'approved' | 'pending' | 'rejected';
  downloadCount: number;
  createdAt: string;
}

export interface CollegeEvent {
  id: string;
  title: string;
  description: string;
  category: 'Tech' | 'Cultural' | 'Academic' | 'Sports' | 'Workshop' | 'Career';
  date: string;
  time: string;
  venue: string;
  organizer: string;
  capacity: number;
  registeredCount: number;
  registeredUserIds: string[];
  createdBy: string;
  createdAt: string;
  image?: string;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
  authorPhoto?: string;
  authorBranch?: string;
  title: string;
  content: string;
  category: 'Academic' | 'Projects' | 'Career' | 'Campus Life' | 'Ask Senior' | 'General';
  likes: string[]; // user UIDs
  commentsCount: number;
  createdAt: string;
}

export interface PostComment {
  id: string;
  postId: string;
  authorId: string;
  authorName: string;
  authorPhoto?: string;
  content: string;
  createdAt: string;
}

export interface CollegeAnnouncement {
  id: string;
  title: string;
  content: string;
  category: 'Academic & Exams' | 'Urgent Alerts' | 'Placement & Careers' | 'Campus Events' | 'General';
  isUrgent: boolean;
  targetAudience: string;
  publishedBy: string;
  publishedById?: string;
  createdAt: string;
}

export type ActivePage = 
  | 'home'
  | 'dashboard'
  | 'notes'
  | 'events'
  | 'community'
  | 'announcements'
  | 'profile'
  | 'admin'
  | 'sustainability'
  | 'projects';

