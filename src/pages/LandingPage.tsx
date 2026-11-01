import React from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Users, 
  Bell, 
  ArrowRight, 
  Sparkles, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  Compass, 
  Star, 
  Share2, 
  TrendingUp, 
  Heart,
  ChevronRight,
  ChevronLeft,
  Leaf,
  Award,
  Recycle,
  Wrench,
  Package,
  FileText,
  Clock
} from 'lucide-react';
import { CAMPUS_PROJECTS } from '../data/campusProjectsData';
import { CAMPUS_SUSTAINABILITY_PILLARS } from '../data/sustainabilityData';

interface LandingPageProps {
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuth }) => {
  const { setActivePage, currentUser, userProfile, notes, events, posts } = useCampus();
  const [projectSlideIndex, setProjectSlideIndex] = React.useState(0);

  const handleGetStarted = () => {
    if (currentUser || userProfile) {
      setActivePage('dashboard');
    } else {
      onOpenAuth('register');
    }
  };

  const handleExplore = () => {
    setActivePage('notes');
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-indigo-50/50 via-white to-white">
        {/* Subtle decorative circles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none overflow-hidden opacity-60">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-indigo-200/50 rounded-full blur-3xl" />
          <div className="absolute top-20 right-1/4 w-80 h-80 bg-violet-200/40 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-xs mb-6">
              <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-ping" />
              <span>CampusConnect 2.0 is Live</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-600 font-normal">Trusted by 50+ Universities</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Your Campus. <br />
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600 bg-clip-text text-transparent">
                Your Community.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              The centralized digital campus platform where college students collaborate on coursework, download verified study notes, discover upcoming hackathons, and connect with peers.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={handleGetStarted}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-lg shadow-indigo-200 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{currentUser ? 'Go to My Dashboard' : 'Get Started Free'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleExplore}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-all hover:border-slate-300"
              >
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Explore Features</span>
              </button>
            </div>

            {/* Social proof icons */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Verified College Students</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Instant PDF Notes Download</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero Subscription Fees</span>
              </div>
            </div>
          </div>

          {/* Interactive Hero Preview Card */}
          <div className="mt-14 max-w-5xl mx-auto rounded-3xl p-3 sm:p-5 bg-gradient-to-b from-slate-100/80 to-white border border-slate-200/80 shadow-2xl">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              
              {/* Fake Browser Top Bar */}
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-[11px] text-slate-400 font-mono ml-2">campusconnect.hub/dashboard</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Live Campus Feed</span>
                </div>
              </div>

              {/* Sample Content Grid Preview */}
              <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50/50">
                
                {/* Card 1: Notes */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-semibold text-[10px]">
                      ACADEMIC NOTES
                    </span>
                    <span>3rd Sem • CS</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 line-clamp-1">
                    {notes[0]?.title || 'DSA Comprehensive Lecture Notes'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    Trees, Graph BFS/DFS, dynamic programming formulas and solved past paper questions.
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">{notes[0]?.uploaderName || 'Aarav Sharma'}</span>
                    <span className="text-indigo-600 font-semibold flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      {notes[0]?.downloadCount || 428} downloads
                    </span>
                  </div>
                </div>

                {/* Card 2: Event */}
                <div className="p-4 rounded-xl bg-white border border-indigo-100 shadow-xs ring-1 ring-indigo-500/10">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-semibold text-[10px]">
                      UPCOMING HACKATHON
                    </span>
                    <span className="text-purple-600 font-bold">Nov 14</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 line-clamp-1">
                    {events[0]?.title || 'HackCampus 2026 – 36hr Hackathon'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    Over 400 student innovators building AI & FinTech solutions. $10k prizes.
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Auditorium</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[11px]">
                      {events[0]?.registeredCount || 184} Registered
                    </span>
                  </div>
                </div>

                {/* Card 3: Community */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-semibold text-[10px]">
                      STUDENT QUESTION
                    </span>
                    <span>10m ago</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 line-clamp-1">
                    {posts[0]?.title || 'Looking for backend teammate for HackCampus'}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    Building an accessible campus navigation app with beacon mapping.
                  </p>
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">{posts[0]?.authorName || 'Priya Patel'}</span>
                    <span className="text-slate-400 font-medium flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      {posts[0]?.likes?.length || 3}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="border-y border-slate-200 bg-slate-50/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">5,000+</p>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Active Students</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-600">1,400+</p>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Verified Academic Notes</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-violet-600">80+</p>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">College Events Hosted</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">25+</p>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">Campuses Connected</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
              Comprehensive Platform
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything you need to thrive in college
            </p>
            <p className="text-base text-slate-600 mt-3">
              Built by college students for college students. Streamlining academic collaboration, social activities, and administrative announcements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div 
              onClick={() => setActivePage('notes')}
              className="group p-7 rounded-2xl border border-slate-200/80 hover:border-indigo-300 bg-white hover:bg-indigo-50/30 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                Academic Notes Sharing
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Upload and download course notes, handwritten summaries, and past papers in PDF format. Filter by branch, semester, and course code.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-600 group-hover:gap-2 transition-all">
                <span>Browse Notes Vault</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Feature 2 */}
            <div 
              onClick={() => setActivePage('events')}
              className="group p-7 rounded-2xl border border-slate-200/80 hover:border-violet-300 bg-white hover:bg-violet-50/30 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-600 transition-colors">
                Campus Events & Hackathons
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Never miss a college event, tech fest, sports tournament, or seminar. One-click RSVP with real-time attendee tracking and reminder alerts.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-violet-600 group-hover:gap-2 transition-all">
                <span>Discover Events</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Feature 3 */}
            <div 
              onClick={() => setActivePage('community')}
              className="group p-7 rounded-2xl border border-slate-200/80 hover:border-blue-300 bg-white hover:bg-blue-50/30 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                Student Community & Forum
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Ask senior students for career advice, find project teammates, discuss campus elections, and exchange technical insights with peer discussions.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:gap-2 transition-all">
                <span>Join Student Forum</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Feature 4 */}
            <div 
              onClick={() => setActivePage('announcements')}
              className="group p-7 rounded-2xl border border-slate-200/80 hover:border-amber-300 bg-white hover:bg-amber-50/30 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                Verified Urgent Notices
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Stay updated with official exam schedules, placement drive calls, holiday declarations, and emergency alerts directly from department heads.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-amber-600 group-hover:gap-2 transition-all">
                <span>View Bulletins</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Feature 5 */}
            <div 
              onClick={() => setActivePage('community')}
              className="group p-7 rounded-2xl border border-slate-200/80 hover:border-emerald-300 bg-white hover:bg-emerald-50/30 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                Student Directory & Skills
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Search students across departments by skills (Python, Figma, Robotics, CAD) to form dream hackathon teams and study squads.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-600 group-hover:gap-2 transition-all">
                <span>Find Classmates</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Feature 6 */}
            <div 
              onClick={() => setActivePage('admin')}
              className="group p-7 rounded-2xl border border-slate-200/80 hover:border-purple-300 bg-white hover:bg-purple-50/30 transition-all duration-300 cursor-pointer shadow-xs hover:shadow-md"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                Role-Based Administration
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Dedicated administrative controls for faculty and student coordinators to moderate uploads, schedule campus-wide events, and verify users.
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-purple-600 group-hover:gap-2 transition-all">
                <span>Admin Suite</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
              Simple 3-Step Flow
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How CampusConnect Works
            </p>
            <p className="text-base text-slate-600 mt-3">
              Get integrated into your campus ecosystem in less than 60 seconds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs relative">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm mb-6 shadow-md shadow-indigo-200">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Register with College Info</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sign in with your Google account or college email, pick your university, branch, and current semester.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs relative">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm mb-6 shadow-md shadow-indigo-200">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Access Academic Vault & Events</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Instantly search curated lecture notes, download exam cheat-sheets, and reserve free tickets for college events.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-xs relative">
              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm mb-6 shadow-md shadow-indigo-200">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Connect & Collaborate</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Post questions on the student community board, find hackathon teammates, and receive real-time college notifications.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SUSTAINABILITY HIGHLIGHT SECTION */}
      <section className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 mb-3">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>Green Campus & Resource Conservation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Campus Sustainability & Paperless Vault
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Our verified framework for circular campus resource management: digitizing coursework to prevent paper waste, circulating peer academic gear, and measuring verified carbon savings.
            </p>

            {/* Transparency Commitment Callout */}
            <div className="mt-6 p-4 bg-indigo-50/70 rounded-2xl border border-indigo-200 text-xs text-left flex items-start gap-3 shadow-xs">
              <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div className="text-slate-700 leading-relaxed">
                <strong className="text-indigo-700 font-bold">Campus Transparency Commitment:</strong> All environmental benchmarks, photocopy reduction calculations, and paper conservation metrics are designated as <em>empirically tracked</em> through active student vault usage and audited against university administrative reports.
              </div>
            </div>
          </div>

          {/* Three Fundamental Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CAMPUS_SUSTAINABILITY_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="p-7 rounded-3xl bg-white border border-slate-200 flex flex-col justify-between space-y-4 hover:border-indigo-300 hover:shadow-md transition-all shadow-xs"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-indigo-100">
                    {pillar.number === '01' && <BookOpen className="w-6 h-6 text-white" />}
                    {pillar.number === '02' && <Recycle className="w-6 h-6 text-emerald-300" />}
                    {pillar.number === '03' && <Package className="w-6 h-6 text-amber-300" />}
                  </div>

                  <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    {pillar.subtitle}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {pillar.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-1.5 text-xs">
                  {pillar.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-800 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Banner for Sustainability */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-400" />
                <span>Calculate Your Semester Paper & Carbon Savings</span>
              </h4>
              <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                Test our interactive campus impact modeler, review diagnostic paperless audits, or claim a $15 campus voucher for recycling your finished textbooks.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <button
                onClick={() => setActivePage('sustainability')}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-md shadow-emerald-900/30"
              >
                Open Campus Impact Modeler
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* STARTUP PROJECTS SLIDE (8 STUDIES - CampusConnect Research) */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
                Collegiate Research, Operations & Strategy
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                CampusConnect Platform Studies & Research (8 Projects)
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-xl leading-relaxed">
                Empirical whitepapers covering paperless campus LCA lifecycle audits, peer learning dynamics, academic honor code governance, and 5-year collegiate scaling roadmaps.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setProjectSlideIndex((prev) => Math.max(0, prev - 1))}
                  disabled={projectSlideIndex === 0}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Previous projects slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setProjectSlideIndex((prev) => Math.min(CAMPUS_PROJECTS.length - 3, prev + 1))}
                  disabled={projectSlideIndex >= CAMPUS_PROJECTS.length - 3}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Next projects slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => setActivePage('projects')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-100 cursor-pointer flex items-center gap-1.5"
              >
                <span>View All 8 Studies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Projects Carousel Slide Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CAMPUS_PROJECTS.slice(projectSlideIndex, projectSlideIndex + 3).map((study) => (
              <div
                key={study.id}
                className="p-6 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-indigo-300 hover:bg-indigo-50/20 hover:shadow-lg transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white font-mono">
                      STUDY {study.number}
                    </span>
                    <span className="text-slate-400 flex items-center gap-1 text-[11px]">
                      <Clock className="w-3 h-3" />
                      {study.readTime}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block mb-1">
                    {study.category}
                  </span>

                  <h3 
                    onClick={() => setActivePage('projects')}
                    className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer line-clamp-2"
                  >
                    {study.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {study.shortDesc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500 font-medium truncate max-w-[150px]">
                      {study.authorSquad}
                    </span>
                    <button
                      onClick={() => setActivePage('projects')}
                      className="flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                      <span>Read Study</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
              Student Voices
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Loved by college students nationwide
            </p>
            <p className="text-base text-slate-600 mt-3">
              See how CampusConnect transformed exam preparation and college life for fellow undergraduates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "CampusConnect saved my semester! The Data Structures handwritten notes shared by senior toppers helped me score an A grade. Finding our hackathon team here was also seamless."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80"
                  alt="Aarav Sharma"
                  className="w-10 h-10 rounded-full object-cover border border-indigo-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Aarav Sharma</h4>
                  <p className="text-xs text-slate-500">Computer Science, 6th Sem</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="p-7 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "Before CampusConnect, event registrations were scattered across random WhatsApp groups and Google Forms. Now we manage 400+ attendees for Tech Fest with instant confirmation tickets!"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-indigo-100 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                  alt="Priya Patel"
                  className="w-10 h-10 rounded-full object-cover border border-indigo-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Priya Patel</h4>
                  <p className="text-xs text-slate-500">Information Technology, 4th Sem</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "The urgent notices section is a lifesaver. When exam dates or classroom venues change at the last minute, CampusConnect is the first place that sends verified alerts."
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Rohan Verma"
                  className="w-10 h-10 rounded-full object-cover border border-indigo-200"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Rohan Verma</h4>
                  <p className="text-xs text-slate-500">ECE, 8th Sem</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-700 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to upgrade your college journey?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-indigo-100 max-w-xl mx-auto">
            Join thousands of students on CampusConnect. Share notes, discover campus events, and collaborate effortlessly.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleGetStarted}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white text-indigo-700 font-bold text-sm shadow-xl hover:bg-slate-50 transition-all"
            >
              Get Started for Free
            </button>
            <button
              onClick={() => setActivePage('events')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-indigo-500/30 hover:bg-indigo-500/50 text-white font-semibold text-sm border border-indigo-300/30 transition-all"
            >
              Explore Campus Events
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-base font-bold text-white">CampusConnect</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Empowering college students with centralized academic resources, college event discovery, and student community collaboration.
              </p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Academic Vault</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setActivePage('notes')} className="hover:text-white transition-colors">Browse Notes</button></li>
                <li><button onClick={() => setActivePage('notes')} className="hover:text-white transition-colors">Upload Study Material</button></li>
                <li><button onClick={() => setActivePage('notes')} className="hover:text-white transition-colors">Branch Syllabus</button></li>
                <li><button onClick={() => setActivePage('notes')} className="hover:text-white transition-colors">Past Exam Papers</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Campus Life</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setActivePage('events')} className="hover:text-white transition-colors">Hackathons & Fests</button></li>
                <li><button onClick={() => setActivePage('community')} className="hover:text-white transition-colors">Student Forum</button></li>
                <li><button onClick={() => setActivePage('sustainability')} className="hover:text-white transition-colors text-[#F07A4B] font-semibold">Sustainability Framework</button></li>
                <li><button onClick={() => setActivePage('projects')} className="hover:text-white transition-colors text-[#F07A4B] font-semibold">Startup Projects (8 Studies)</button></li>
                <li><button onClick={() => setActivePage('announcements')} className="hover:text-white transition-colors">Official Bulletins</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-3">Quick Navigation</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setActivePage('dashboard')} className="hover:text-white transition-colors">Student Dashboard</button></li>
                <li><button onClick={() => setActivePage('profile')} className="hover:text-white transition-colors">Student Profile</button></li>
                <li><button onClick={() => setActivePage('admin')} className="hover:text-white transition-colors">Admin Portal</button></li>
                <li><span className="text-slate-500">v2.4 Production Build</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} CampusConnect Technologies. All rights reserved.</p>
            <p className="text-slate-500 font-medium">Tagline: Your Campus. Your Community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
