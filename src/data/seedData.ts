import { AcademicNote, CollegeEvent, CommunityPost, CollegeAnnouncement, UserProfile } from '../types';

export const SEED_USERS: UserProfile[] = [
  {
    uid: 'user_aarav',
    email: 'aarav.sharma@campus.edu',
    displayName: 'Aarav Sharma',
    photoURL: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    collegeName: 'National Institute of Technology',
    branch: 'Computer Science & Engineering',
    semester: '6th Semester',
    bio: 'Passionate about distributed systems, React, and competitive coding. Leading the Google Developer Student Club.',
    skills: ['React', 'TypeScript', 'Docker', 'System Design', 'Python'],
    role: 'student',
    createdAt: '2026-09-01T10:00:00Z'
  },
  {
    uid: 'user_priya',
    email: 'priya.patel@campus.edu',
    displayName: 'Priya Patel',
    photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    collegeName: 'National Institute of Technology',
    branch: 'Information Technology',
    semester: '4th Semester',
    bio: 'AI/ML enthusiast & hackathon fanatic. Working on neural network explainability research.',
    skills: ['Python', 'PyTorch', 'FastAPI', 'Data Analysis', 'Figma'],
    role: 'student',
    createdAt: '2026-09-05T14:30:00Z'
  },
  {
    uid: 'user_rohan',
    email: 'rohan.verma@campus.edu',
    displayName: 'Rohan Verma',
    photoURL: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    collegeName: 'National Institute of Technology',
    branch: 'Electronics & Communication',
    semester: '8th Semester',
    bio: 'Hardware geek, IoT developer & robotics team captain. Placement coordinator 2026.',
    skills: ['Embedded C', 'IoT', 'Raspberry Pi', 'MATLAB', 'Robotics'],
    role: 'student',
    createdAt: '2026-08-20T09:15:00Z'
  },
  {
    uid: 'user_ananya',
    email: 'ananya.deshmukh@campus.edu',
    displayName: 'Ananya Deshmukh',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    collegeName: 'National Institute of Technology',
    branch: 'Mechanical Engineering',
    semester: '5th Semester',
    bio: 'CAD/CAM designer, automotive club secretary, and avid debater.',
    skills: ['SolidWorks', 'ANSYS', 'AutoCAD', 'Public Speaking'],
    role: 'student',
    createdAt: '2026-09-12T16:00:00Z'
  }
];

export const SEED_NOTES: AcademicNote[] = [
  {
    id: 'note-1',
    title: 'Data Structures & Algorithms Complete Hand-Written Notes',
    subject: 'Data Structures (CS-302)',
    branch: 'Computer Science',
    semester: '3rd Semester',
    description: 'Comprehensive handwritten lecture notes covering Binary Search Trees, AVL Trees, Red-Black Trees, Graphs (BFS/DFS, Dijkstra), and Dynamic Programming with solved university past paper questions.',
    fileName: 'DSA_Comprehensive_Notes_Unit1_to_Unit5.pdf',
    fileSize: '4.8 MB',
    uploaderId: 'user_aarav',
    uploaderName: 'Aarav Sharma',
    uploaderEmail: 'aarav.sharma@campus.edu',
    status: 'approved',
    downloadCount: 428,
    createdAt: '2026-10-18T10:30:00Z'
  },
  {
    id: 'note-2',
    title: 'Operating Systems – Process Sync & Memory Management',
    subject: 'Operating Systems (CS-401)',
    branch: 'Computer Science & IT',
    semester: '4th Semester',
    description: 'Diagrammatic summaries of Semaphores, Monitors, Deadlocks, Paging, Segmentation, and Virtual Memory replacement algorithms with numerical examples.',
    fileName: 'OS_Process_Sync_Memory_CheatSheet.pdf',
    fileSize: '3.2 MB',
    uploaderId: 'user_priya',
    uploaderName: 'Priya Patel',
    uploaderEmail: 'priya.patel@campus.edu',
    status: 'approved',
    downloadCount: 312,
    createdAt: '2026-10-22T14:15:00Z'
  },
  {
    id: 'note-3',
    title: 'Digital Signal Processing (DSP) Formula Sheet & Lab Code',
    subject: 'Signal Processing (EC-503)',
    branch: 'Electronics & Communication',
    semester: '5th Semester',
    description: 'Quick reference cheat-sheet for DFT, FFT (Radix-2 DIT/DIF), Butterworth and Chebyshev filter design formulas, and MATLAB syntax.',
    fileName: 'DSP_Formulas_and_Lab_Guide.pdf',
    fileSize: '2.1 MB',
    uploaderId: 'user_rohan',
    uploaderName: 'Rohan Verma',
    uploaderEmail: 'rohan.verma@campus.edu',
    status: 'approved',
    downloadCount: 189,
    createdAt: '2026-10-25T09:00:00Z'
  },
  {
    id: 'note-4',
    title: 'Thermodynamics & Heat Transfer Quick Revisions',
    subject: 'Applied Thermodynamics (ME-301)',
    branch: 'Mechanical Engineering',
    semester: '3rd Semester',
    description: 'Rankine, Otto, Diesel and Dual cycles with clear T-s and P-v diagrams, efficiency derivations, and steam table problem walkthroughs.',
    fileName: 'Thermodynamics_Cycles_and_Laws.pdf',
    fileSize: '5.4 MB',
    uploaderId: 'user_ananya',
    uploaderName: 'Ananya Deshmukh',
    uploaderEmail: 'ananya.deshmukh@campus.edu',
    status: 'approved',
    downloadCount: 205,
    createdAt: '2026-10-27T11:45:00Z'
  },
  {
    id: 'note-5',
    title: 'Database Management Systems (DBMS) SQL Queries & Normalization',
    subject: 'Database Systems (CS-403)',
    branch: 'Information Technology',
    semester: '4th Semester',
    description: 'Step-by-step 1NF to BCNF decomposition guide, ACID properties, transaction concurrency control, and 50 essential SQL interview queries.',
    fileName: 'DBMS_Normalization_SQL_Handbook.pdf',
    fileSize: '3.9 MB',
    uploaderId: 'user_aarav',
    uploaderName: 'Aarav Sharma',
    uploaderEmail: 'aarav.sharma@campus.edu',
    status: 'approved',
    downloadCount: 374,
    createdAt: '2026-10-29T16:20:00Z'
  }
];

export const SEED_EVENTS: CollegeEvent[] = [
  {
    id: 'event-1',
    title: 'HackCampus 2026 – 36hr National College Hackathon',
    description: 'Join over 400 student innovators to build cutting-edge solutions in AI, ClimateTech, and FinTech. Free food, mentor hours from Google engineers, and cash prizes worth $10,000!',
    category: 'Tech',
    date: 'Nov 14 - 16, 2026',
    time: '9:00 AM onwards',
    venue: 'Main Auditorium & Innovation Center',
    organizer: 'Computer Science Dept & GDSC',
    capacity: 250,
    registeredCount: 184,
    registeredUserIds: ['user_aarav', 'user_priya', 'user_rohan'],
    createdBy: 'admin_sys',
    createdAt: '2026-10-15T08:00:00Z',
    image: '/images/campus_event_tech.jpg'
  },
  {
    id: 'event-2',
    title: 'Campus Tech Talk: Generative AI in Production',
    description: 'Keynote and live coding session on deploying LLM applications, retrieval-augmented generation (RAG), and agentic workflows with guest speakers from top AI labs.',
    category: 'Workshop',
    date: 'Nov 8, 2026',
    time: '3:00 PM - 5:30 PM',
    venue: 'Seminar Hall B, Engineering Block',
    organizer: 'AI & Data Science Club',
    capacity: 120,
    registeredCount: 96,
    registeredUserIds: ['user_aarav', 'user_priya'],
    createdBy: 'admin_sys',
    createdAt: '2026-10-20T10:00:00Z',
    image: '/images/campus_event_workshop.jpg'
  },
  {
    id: 'event-3',
    title: 'Echoes 2026: Annual Inter-College Cultural Fest',
    description: 'Battle of the bands, street play, classical and contemporary dance competitions, standup comedy night, and food stalls from across the country.',
    category: 'Cultural',
    date: 'Nov 20 - 22, 2026',
    time: '4:00 PM - 10:00 PM',
    venue: 'Open Air Amphitheatre',
    organizer: 'Student Cultural Council',
    capacity: 600,
    registeredCount: 430,
    registeredUserIds: ['user_ananya', 'user_rohan'],
    createdBy: 'admin_sys',
    createdAt: '2026-10-21T12:00:00Z',
    image: '/images/campus_event_cultural.jpg'
  },
  {
    id: 'event-4',
    title: 'Inter-Department Cricket & Football Championship',
    description: 'The annual sports clash of branches! Come cheer for your department teams or participate in track events, 7-a-side football, and T20 cricket matches.',
    category: 'Sports',
    date: 'Nov 27 - 30, 2026',
    time: '8:00 AM - 6:00 PM',
    venue: 'University Sports Complex',
    organizer: 'Department of Physical Education',
    capacity: 300,
    registeredCount: 142,
    registeredUserIds: ['user_ananya'],
    createdBy: 'admin_sys',
    createdAt: '2026-10-23T15:00:00Z',
    image: '/images/campus_event_sports.jpg'
  }
];

export const SEED_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorId: 'user_priya',
    authorName: 'Priya Patel',
    authorEmail: 'priya.patel@campus.edu',
    authorPhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    authorBranch: 'Information Technology',
    title: 'Looking for a UI/UX designer & Backend developer for HackCampus 2026!',
    content: 'Hey everyone! Our team is building an accessible smart campus navigation app for students with disabilities using indoor beacon mapping. We have 2 ML developers and are looking for 1 designer (Figma) and 1 Node/Python backend dev. Drop a comment or message me if interested!',
    category: 'Projects',
    likes: ['user_aarav', 'user_rohan', 'user_ananya'],
    commentsCount: 4,
    createdAt: '2026-10-30T11:20:00Z'
  },
  {
    id: 'post-2',
    authorId: 'user_aarav',
    authorName: 'Aarav Sharma',
    authorEmail: 'aarav.sharma@campus.edu',
    authorPhoto: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    authorBranch: 'Computer Science',
    title: 'How to prepare for Google & Microsoft SDE Summer Internships 2027?',
    content: 'Sharing a quick breakdown from my experience cracking the recent online assessments: 1. Focus on Graph algorithms and Sliding Window on LeetCode. 2. Understand DB indexing and Redis basics. 3. Have at least one end-to-end fullstack project with live users. Happy to answer questions in the thread!',
    category: 'Career',
    likes: ['user_priya', 'user_rohan'],
    commentsCount: 6,
    createdAt: '2026-10-29T14:45:00Z'
  },
  {
    id: 'post-3',
    authorId: 'user_ananya',
    authorName: 'Ananya Deshmukh',
    authorEmail: 'ananya.deshmukh@campus.edu',
    authorPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    authorBranch: 'Mechanical Engineering',
    title: 'Anyone taken Prof. Henderson\'s Finite Element Analysis elective?',
    content: 'Looking for reviews regarding grading policy, lab assignments, and project workload for the upcoming spring elective registration. How is the attendance leeway and textbook reliance?',
    category: 'Academic',
    likes: ['user_rohan'],
    commentsCount: 3,
    createdAt: '2026-10-28T09:30:00Z'
  }
];

export const SEED_ANNOUNCEMENTS: CollegeAnnouncement[] = [
  {
    id: 'ann-1',
    title: 'CRITICAL: End-Semester Exam Schedule & Admit Card Portal Live',
    content: 'The official timetable for Winter 2026 End-Semester Examinations has been published. All students must download their verified hall tickets before November 10th. Students with less than 75% attendance must meet their department heads immediately.',
    category: 'Urgent Alerts',
    isUrgent: true,
    targetAudience: 'All Undergraduate & Postgraduate Students',
    publishedBy: 'Office of the Controller of Examinations',
    createdAt: '2026-10-31T08:00:00Z'
  },
  {
    id: 'ann-2',
    title: 'Campus Placement Drive: Top Tier Tech Companies Visiting Campus',
    content: 'Registration for Phase 1 Placement Drive commences this Monday. Over 35 multinational companies and startups will conduct online coding tests and on-campus interviews. Ensure your resume is verified by the placement cell.',
    category: 'Placement & Careers',
    isUrgent: true,
    targetAudience: 'Final Year & Pre-Final Year Students',
    publishedBy: 'Training & Placement Cell (T&P)',
    createdAt: '2026-10-30T13:00:00Z'
  },
  {
    id: 'ann-3',
    title: 'Central Library Extended 24x7 Reading Hours During Exam Month',
    content: 'To support students during exam preparations, the Central Library Digital Section and Quiet Study Pods will remain open 24 hours a day with high-speed Wi-Fi, coffee vending, and group study conference rooms available on booking.',
    category: 'Academic & Exams',
    isUrgent: false,
    targetAudience: 'All College Students',
    publishedBy: 'Chief University Librarian',
    createdAt: '2026-10-27T10:00:00Z'
  },
  {
    id: 'ann-4',
    title: 'Annual Hostel Maintenance & Wi-Fi Fiber Upgrade Notice',
    content: 'Campus IT infrastructure will be upgrading the dorm Wi-Fi access points to Wi-Fi 6 on Saturday between 2:00 AM and 5:00 AM. Temporary latency might be observed during this window.',
    category: 'General',
    isUrgent: false,
    targetAudience: 'Hostel Residents',
    publishedBy: 'Campus Infrastructure & Estate Office',
    createdAt: '2026-10-25T11:00:00Z'
  }
];
