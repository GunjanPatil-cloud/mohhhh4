import React, { useState, useRef, useEffect } from 'react';
import { useCampus } from '../context/CampusContext';
import { ActivePage } from '../types';
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Users, 
  Bell, 
  LayoutDashboard, 
  ShieldCheck, 
  LogOut, 
  User, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  ArrowRight,
  Leaf,
  Award
} from 'lucide-react';

interface NavbarProps {
  onOpenAuth: (mode?: 'login' | 'register') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const { 
    activePage, 
    setActivePage, 
    currentUser, 
    userProfile, 
    isAdmin, 
    logout, 
    quickLoginAsDemo,
    announcements 
  } = useCampus();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);

  const urgentCount = announcements.filter(a => a.isUrgent).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) {
        setRoleSwitcherOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: { label: string; page: ActivePage; icon: React.ElementType; badge?: number }[] = [
    { label: 'Home', page: 'home', icon: GraduationCap },
    { label: 'Dashboard', page: 'dashboard', icon: LayoutDashboard },
    { label: 'Notes', page: 'notes', icon: BookOpen },
    { label: 'Events', page: 'events', icon: Calendar },
    { label: 'Community', page: 'community', icon: Users },
    { label: 'Sustainability', page: 'sustainability', icon: Leaf },
    { label: 'Projects (8)', page: 'projects', icon: Award },
    { label: 'Announcements', page: 'announcements', icon: Bell, badge: urgentCount },
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-700 bg-clip-text text-transparent">
                  CampusConnect
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  HUB
                </span>
              </div>
              <p className="text-[10px] text-slate-500 -mt-1 hidden sm:block font-medium">Your Campus. Your Community.</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50/80 font-semibold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && item.badge > 0 ? (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500 text-white animate-pulse">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}

            {/* Admin Dashboard Tab (Visible if Admin or for easy inspection) */}
            {isAdmin && (
              <button
                onClick={() => handleNavClick('admin')}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                  activePage === 'admin'
                    ? 'text-purple-700 bg-purple-100 shadow-xs'
                    : 'text-purple-600 hover:text-purple-800 hover:bg-purple-50'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>Admin</span>
              </button>
            )}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Role Switcher Pill (Quick Tester) */}
            <div className="relative" ref={roleRef}>
              <button
                onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
                title="Switch test mode role"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Role: <strong className="capitalize text-indigo-700">{userProfile?.role || (isAdmin ? 'admin' : 'student')}</strong></span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleSwitcherOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 text-xs animate-in fade-in zoom-in-95">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    Fast Role Testing
                  </div>
                  <button
                    onClick={() => {
                      quickLoginAsDemo('student');
                      setRoleSwitcherOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-indigo-50 flex items-center justify-between text-slate-700 font-medium"
                  >
                    <span>Student View</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">Aarav (CS)</span>
                  </button>
                  <button
                    onClick={() => {
                      quickLoginAsDemo('admin');
                      setRoleSwitcherOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 hover:bg-purple-50 flex items-center justify-between text-slate-700 font-medium"
                  >
                    <span>Admin View</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">Full Rights</span>
                  </button>
                </div>
              )}
            </div>

            {/* User Profile or Login CTA */}
            {userProfile || currentUser ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-full sm:rounded-xl hover:bg-slate-100 border border-slate-200 transition-all text-left"
                >
                  <img
                    src={userProfile?.photoURL || currentUser?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=user`}
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover border border-indigo-200 shadow-xs"
                  />
                  <div className="hidden sm:block">
                    <p className="text-xs font-semibold text-slate-800 leading-tight truncate max-w-[120px]">
                      {userProfile?.displayName || currentUser?.displayName || 'Student'}
                    </p>
                    <p className="text-[10px] text-slate-500 truncate max-w-[120px]">
                      {userProfile?.role === 'admin' ? 'Campus Admin' : userProfile?.branch || 'Student'}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900">{userProfile?.displayName || 'Student'}</p>
                      <p className="text-xs text-slate-500 truncate">{userProfile?.email || currentUser?.email}</p>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                          {userProfile?.collegeName || 'National Institute of Tech'}
                        </span>
                      </div>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setActivePage('profile');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                      >
                        <User className="w-4 h-4 text-slate-500" />
                        <span>My Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setActivePage('dashboard');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-500" />
                        <span>Dashboard</span>
                      </button>

                      {isAdmin && (
                        <button
                          onClick={() => {
                            setActivePage('admin');
                            setProfileDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-purple-700 hover:bg-purple-50 flex items-center gap-2.5 font-semibold"
                        >
                          <ShieldCheck className="w-4 h-4 text-purple-600" />
                          <span>Admin Control Panel</span>
                        </button>
                      )}
                    </div>

                    <div className="border-t border-slate-100 pt-1 mt-1">
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 font-medium"
                      >
                        <LogOut className="w-4 h-4 text-rose-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => onOpenAuth('register')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-md shadow-indigo-200 transition-all active:scale-95"
                >
                  <span>Join Campus</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Mobile menu hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {isAdmin && (
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold bg-purple-50 text-purple-700"
            >
              <ShieldCheck className="w-5 h-5 text-purple-600" />
              <span>Admin Dashboard</span>
            </button>
          )}

          <div className="pt-2 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => {
                quickLoginAsDemo('student');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-xs font-medium rounded-lg bg-slate-100 text-slate-700 text-center"
            >
              Demo: Student
            </button>
            <button
              onClick={() => {
                quickLoginAsDemo('admin');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 text-xs font-medium rounded-lg bg-purple-100 text-purple-700 text-center"
            >
              Demo: Admin
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
