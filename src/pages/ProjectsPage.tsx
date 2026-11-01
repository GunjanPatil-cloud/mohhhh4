import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { CAMPUS_PROJECTS, CampusProject } from '../data/campusProjectsData';
import { 
  BookOpen, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Printer, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  TrendingUp, 
  ShieldCheck, 
  BarChart3, 
  Sparkles, 
  Award,
  Layers,
  Clock,
  UserCheck,
  GraduationCap
} from 'lucide-react';

interface ProjectsPageProps {
  initialProjectId?: string;
  onBackToHome?: () => void;
  onGoToSustainability?: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  initialProjectId,
  onBackToHome,
  onGoToSustainability
}) => {
  const { setActivePage } = useCampus();

  const [activeProjectId, setActiveProjectId] = useState<string>(
    initialProjectId || CAMPUS_PROJECTS[0].id
  );
  const [activeTab, setActiveTab] = useState<'summary' | 'sections' | 'comparison' | 'kpis'>('summary');
  const [searchQuery, setSearchQuery] = useState('');

  const currentProject = CAMPUS_PROJECTS.find(p => p.id === activeProjectId) || CAMPUS_PROJECTS[0];
  const currentIndex = CAMPUS_PROJECTS.findIndex(p => p.id === currentProject.id);
  const prevProject = currentIndex > 0 ? CAMPUS_PROJECTS[currentIndex - 1] : null;
  const nextProject = currentIndex < CAMPUS_PROJECTS.length - 1 ? CAMPUS_PROJECTS[currentIndex + 1] : null;

  const handleSelectProject = (id: string) => {
    setActiveProjectId(id);
    setActiveTab('summary');
    const el = document.getElementById('project-detail-view');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredProjects = CAMPUS_PROJECTS.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.number.includes(q)
    );
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen pb-20">
      
      {/* Sub-header Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => (onBackToHome ? onBackToHome() : setActivePage('home'))}
              className="font-bold text-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span className="text-slate-400">/</span>
            <span className="text-indigo-600 font-semibold">CampusConnect Research & Platform Studies</span>
            <span className="text-slate-400">/</span>
            <span className="text-slate-600 font-mono">Study {currentProject.number}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePage('sustainability')}
              className="text-slate-700 hover:text-indigo-600 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Award className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Green Campus Framework</span>
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Brief</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600 mb-1">
              Collegiate Research, Operations & Strategy
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              CampusConnect Startup Studies & Research
            </h1>
            <p className="text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Empirical research on paperless campus LCA lifecycle audits, peer learning dynamics, academic honor code governance, and 5-year collegiate scaling roadmaps.
            </p>
          </div>

          {/* Search filter for projects */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 8 campus studies..."
              className="w-full pl-10 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Horizontal Projects Slide / Selector Bar */}
        <div className="mt-8 border-b border-slate-200 pb-4 overflow-x-auto">
          <div className="flex items-center gap-2.5 min-w-max">
            {filteredProjects.map((proj) => {
              const isSelected = proj.id === activeProjectId;
              return (
                <button
                  key={proj.id}
                  onClick={() => handleSelectProject(proj.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-medium transition-all cursor-pointer flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-100 ring-2 ring-indigo-400'
                      : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isSelected ? 'bg-white text-indigo-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {proj.number}
                  </span>
                  <span>{proj.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active Project Detail Viewer */}
      <section id="project-detail-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Main Paper Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-indigo-50 text-indigo-700 border border-indigo-200 font-mono">
                  STUDY {currentProject.number} OF 08
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                  {currentProject.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {currentProject.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {currentProject.title}
              </h2>

              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Author Squad: <strong className="text-slate-800 font-semibold">{currentProject.authorSquad}</strong></span>
              </p>
            </div>

            {/* Quick Next/Prev buttons */}
            <div className="flex items-center gap-2">
              <button
                disabled={!prevProject}
                onClick={() => prevProject && handleSelectProject(prevProject.id)}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Previous Study"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={!nextProject}
                onClick={() => nextProject && handleSelectProject(nextProject.id)}
                className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                title="Next Study"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Sub-Tabs: Summary, Sections, Comparison, KPIs */}
          <div className="flex border-b border-slate-200 gap-4 text-xs font-bold">
            <button
              onClick={() => setActiveTab('summary')}
              className={`pb-3 flex items-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'summary'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Executive Brief</span>
            </button>

            <button
              onClick={() => setActiveTab('sections')}
              className={`pb-3 flex items-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'sections'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Diagnostic Sections ({currentProject.sections.length})</span>
            </button>

            {currentProject.comparisonTable && currentProject.comparisonTable.length > 0 && (
              <button
                onClick={() => setActiveTab('comparison')}
                className={`pb-3 flex items-center gap-1.5 border-b-2 transition-all ${
                  activeTab === 'comparison'
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Collegiate Benchmarks</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('kpis')}
              className={`pb-3 flex items-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'kpis'
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Impact Metrics & Roadmap</span>
            </button>
          </div>

          {/* TAB CONTENT */}

          {/* TAB 1: EXECUTIVE BRIEF */}
          {activeTab === 'summary' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1.5">
                  Executive Abstract
                </h4>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  {currentProject.executiveSummary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                  Strategic Findings & Collegiate Insights
                </h4>
                <div className="space-y-2.5">
                  {currentProject.keyTakeaways.map((takeaway, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* KPI highlight row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                {currentProject.kpis.map((kpi, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">{kpi.label}</span>
                    <p className="text-2xl font-black text-slate-900 mt-0.5">{kpi.value}</p>
                    <p className="text-[11px] text-indigo-600 font-medium mt-1">{kpi.context}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: DETAILED SECTIONS */}
          {activeTab === 'sections' && (
            <div className="space-y-6">
              {currentProject.sections.map((sec, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {sec.heading}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {sec.content}
                  </p>

                  {sec.bulletPoints && sec.bulletPoints.length > 0 && (
                    <ul className="space-y-1.5 pt-2 border-t border-slate-200">
                      {sec.bulletPoints.map((bp, bIdx) => (
                        <li key={bIdx} className="text-xs text-slate-600 flex items-start gap-2">
                          <span className="text-indigo-600 font-bold">•</span>
                          <span>{bp}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: COMPARISON TABLE */}
          {activeTab === 'comparison' && currentProject.comparisonTable && (
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-white font-semibold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-5 py-3">Evaluation Parameter</th>
                    <th className="px-5 py-3">Traditional College Baseline</th>
                    <th className="px-5 py-3">CampusConnect Standard</th>
                    <th className="px-5 py-3 text-right">Comparative Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {currentProject.comparisonTable.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-slate-900">{row.parameter}</td>
                      <td className="px-5 py-3.5 text-slate-600">{row.industryBaseline}</td>
                      <td className="px-5 py-3.5 font-semibold text-indigo-600">{row.campusConnectStandard}</td>
                      <td className="px-5 py-3.5 text-right">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {row.variance}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 4: KPIS & ROADMAP */}
          {activeTab === 'kpis' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {currentProject.kpis.map((kpi, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">{kpi.label}</span>
                    <p className="text-3xl font-black text-indigo-600 mt-1">{kpi.value}</p>
                    <p className="text-xs text-slate-600 font-medium mt-1">{kpi.context}</p>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
                <h5 className="font-bold text-slate-900">Empirical Research Methodology:</h5>
                <p className="text-slate-600 leading-relaxed">{currentProject.methodologyNote}</p>
              </div>

              <div className="p-5 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-1 text-xs">
                <h5 className="font-bold text-indigo-900">Target Collegiate Milestone:</h5>
                <p className="text-indigo-800 font-medium">{currentProject.futureMilestone}</p>
              </div>
            </div>
          )}

          {/* Bottom Slide Pagination */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              {prevProject ? (
                <button
                  onClick={() => handleSelectProject(prevProject.id)}
                  className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous: {prevProject.title}</span>
                </button>
              ) : <div />}
            </div>

            <div className="text-xs text-slate-400 font-mono">
              Study {currentProject.number} of 08
            </div>

            <div>
              {nextProject ? (
                <button
                  onClick={() => handleSelectProject(nextProject.id)}
                  className="flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-slate-900 transition-colors"
                >
                  <span>Next: {nextProject.title}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : <div />}
            </div>
          </div>

        </div>

      </section>

    </div>
  );
};
