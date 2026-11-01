import React, { useState } from 'react';
import { useCampus } from '../context/CampusContext';
import { 
  CAMPUS_SUSTAINABILITY_PILLARS, 
  CAMPUS_CALCULATOR_ITEMS, 
  CAMPUS_TRADE_IN_OPTIONS 
} from '../data/sustainabilityData';
import { 
  Leaf, 
  ShieldCheck, 
  Recycle, 
  BookOpen, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Calculator, 
  X, 
  Award,
  Layers,
  Trees,
  Ticket
} from 'lucide-react';

interface SustainabilityPageProps {
  onBackToHome?: () => void;
  onExploreProjects?: () => void;
}

export const SustainabilityPage: React.FC<SustainabilityPageProps> = ({
  onBackToHome,
  onExploreProjects
}) => {
  const { setActivePage, addToast } = useCampus();

  // Calculator toggles
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({
    notes: true,
    tickets: true,
    textbooks: true,
    notices: true
  });

  // Trade-in form
  const [tradeInType, setTradeInType] = useState('textbook');
  const [tradeInEmail, setTradeInEmail] = useState('');
  const [tradeInVoucher, setTradeInVoucher] = useState<string | null>(null);

  // ESG Dossier modal
  const [isDossierOpen, setIsDossierOpen] = useState(false);

  // Compute live savings
  const totals = CAMPUS_CALCULATOR_ITEMS.reduce(
    (acc, item) => {
      if (selectedItems[item.id]) {
        acc.carbonSaved += item.carbonDelta;
        acc.paperSpared += item.paperDelta;
      }
      return acc;
    },
    { carbonSaved: 0, paperSpared: 0 }
  );

  const handleToggleItem = (id: string) => {
    setSelectedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleTradeInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tradeInEmail) return;
    const code = `CAMPUS-${Math.random().toString(36).substring(2, 7).toUpperCase()}-15`;
    setTradeInVoucher(code);
    addToast('success', 'Campus Recycling Voucher Generated!', `Your $15 student voucher code is: ${code}`);
  };

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen pb-20">
      
      {/* Sub-header Navigation Bar */}
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
            <span className="text-indigo-600 font-semibold">Campus Sustainability & Paperless Vault</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDossierOpen(true)}
              className="text-slate-700 hover:text-indigo-600 font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline">Green Campus Dossier</span>
            </button>
            <button
              onClick={() => setActivePage('projects')}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
            >
              <span>View 8 Campus Studies</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              <span>Green Campus & Resource Conservation</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Sustainability at CampusConnect
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Our verified framework for circular campus resource management: digitizing coursework to prevent paper waste, circulating peer academic gear, eliminating single-use fest plastics, and measuring verified carbon savings.
            </p>

            {/* Transparency Commitment Box */}
            <div className="p-4 bg-indigo-50/80 rounded-2xl border border-indigo-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-700 leading-relaxed">
                <strong className="text-indigo-700 font-bold">Campus Transparency Commitment:</strong> All environmental benchmarks, photocopy reduction calculations, and paper conservation metrics are designated as <em>empirically tracked</em> through active student vault usage and audited against university administrative reports.
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-bold">
              <a
                href="#pillars"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-md shadow-indigo-100"
              >
                Explore 3 Campus Pillars
              </a>
              <a
                href="#calculator"
                className="px-5 py-2.5 bg-white border border-slate-200 text-slate-800 hover:border-indigo-400 hover:bg-slate-50 rounded-xl transition-all shadow-xs"
              >
                Paper & Carbon Calculator
              </a>
              <a
                href="#trade-in"
                className="px-5 py-2.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-all"
              >
                Book & Gear Exchange ($15 Voucher)
              </a>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-5">
            <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-white relative group">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80"
                alt="Students studying collaboratively with digital tablet and paperless notes"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
              />
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950/85 via-slate-900/50 to-transparent text-white text-xs flex justify-between items-center">
                <span className="font-semibold">Paperless University Vault</span>
                <span className="text-emerald-400 font-mono text-[11px] font-bold">1.4M+ Pages Spared</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Three Pillars Section */}
      <section id="pillars" className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
              Three Fundamental Pillars
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Our Circular Campus Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              How CampusConnect transforms student preparation into a zero-waste, eco-conscious college experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CAMPUS_SUSTAINABILITY_PILLARS.map((pillar) => {
              return (
                <div
                  key={pillar.number}
                  className="p-7 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-4 hover:border-indigo-300 hover:bg-indigo-50/20 transition-all shadow-xs hover:shadow-md"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-indigo-100">
                      {pillar.number === '01' && <BookOpen className="w-6 h-6 text-white" />}
                      {pillar.number === '02' && <Recycle className="w-6 h-6 text-emerald-300" />}
                      {pillar.number === '03' && <Ticket className="w-6 h-6 text-amber-300" />}
                    </div>

                    <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                      {pillar.subtitle}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900">
                      {pillar.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 space-y-2 text-xs">
                    {pillar.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-800 font-semibold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Carbon & Paper Impact Calculator */}
      <section id="calculator" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                  <Calculator className="w-4 h-4" />
                  <span>Campus Impact Modeler</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Calculate Your Semester Resource Savings
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Toggle your everyday college activities to estimate how switching to digital notes, QR ticketing, and peer textbook exchange reduces carbon footprints and saves trees.
                </p>
              </div>

              <div className="space-y-3">
                {CAMPUS_CALCULATOR_ITEMS.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-bold text-white">{item.name}</p>
                      <p className="text-[11px] text-slate-300">{item.subtitle}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={Boolean(selectedItems[item.id])}
                      onChange={() => handleToggleItem(item.id)}
                      className="w-5 h-5 rounded text-indigo-500 focus:ring-indigo-400 border-white/30 cursor-pointer"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Right Results Dashboard */}
            <div className="lg:col-span-6 bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  Semester Environmental Reduction
                </span>
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                    <p className="text-3xl sm:text-4xl font-extrabold text-indigo-300 tabular-nums">
                      {totals.carbonSaved.toFixed(1)} <span className="text-base text-white/80 font-normal">kg</span>
                    </p>
                    <p className="text-xs font-bold text-white mt-1">Carbon (CO₂e) Saved</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Embodied paper printing & toner reduction</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                    <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tabular-nums">
                      {totals.paperSpared.toLocaleString()} <span className="text-base text-white/80 font-normal">sheets</span>
                    </p>
                    <p className="text-xs font-bold text-white mt-1">Paper Pages Spared</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Equivalent to saving mature trees</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span>Student Printing Cost Saved:</span>
                  <strong className="text-emerald-400 font-mono">~$140 per Semester</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Chemical Cartridge Waste:</span>
                  <strong className="text-indigo-300 font-mono">Zero Toner Sludge</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span>Notes Availability Lifecycle:</span>
                  <strong className="text-white font-mono">Indefinite Multi-Batch Access</strong>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 italic">
                *Computed using EPA WARM life cycle inventory metrics for university document management.
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Campus Textbook & Academic Gear Trade-In */}
      <section id="trade-in" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                <Recycle className="w-4 h-4" />
                <span>Circular Campus Gear Exchange</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Trade In Old Textbooks & Gear, Earn a $15 Campus Voucher
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                Finished with your semester books, engineering drafter, or scientific calculator? Pass them forward to incoming juniors instead of tossing them away. Drop them at the campus student union or library desk and receive an instant $15 CampusConnect bookstore & cafeteria voucher!
              </p>

              <div className="space-y-2 pt-2">
                {CAMPUS_TRADE_IN_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:border-indigo-400 cursor-pointer transition-colors text-xs"
                  >
                    <input
                      type="radio"
                      name="tradeInOption"
                      value={opt.value}
                      checked={tradeInType === opt.value}
                      onChange={(e) => setTradeInType(e.target.value)}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <div>
                      <p className="font-bold text-slate-900">{opt.label}</p>
                      <p className="text-[11px] text-slate-500">{opt.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
              <h4 className="text-sm font-bold text-slate-900">
                Claim Student Exchange Voucher
              </h4>

              {tradeInVoucher ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2 text-xs">
                  <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>$15 Voucher Confirmed!</span>
                  </div>
                  <p>Your student credit voucher code is:</p>
                  <p className="font-mono font-bold text-base bg-white p-2 rounded-lg border border-emerald-200 text-center tracking-wider text-emerald-800">
                    {tradeInVoucher}
                  </p>
                  <p className="text-[11px] text-emerald-700">
                    Dropoff confirmation instructions have been sent to <strong>{tradeInEmail}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleTradeInSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Student College Email
                    </label>
                    <input
                      type="email"
                      required
                      value={tradeInEmail}
                      onChange={(e) => setTradeInEmail(e.target.value)}
                      placeholder="student@campus.edu"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                    />
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Show your digital exchange token at the campus library drop-box or departmental desk to redeem.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors shadow-md shadow-indigo-100"
                  >
                    Claim $15 Campus Voucher
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Green Campus ESG Dossier Modal */}
      {isDossierOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95">
            <div className="px-6 py-4 bg-gradient-to-r from-indigo-700 to-slate-900 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold flex items-center gap-2">
                  <Award className="w-4 h-4 text-emerald-300" />
                  <span>CampusConnect Green Campus ESG Dossier</span>
                </h3>
                <p className="text-xs text-indigo-100">ISO 14040/44 Campus Resource Lifecycle Protocol</p>
              </div>
              <button
                onClick={() => setIsDossierOpen(false)}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700 max-h-[75vh] overflow-y-auto">
              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">1. Paperless Lifecycle Assessment (LCA)</h4>
                <p className="leading-relaxed">
                  Academic paper accounts for 34% of municipal waste generated across collegiate campuses. Converting lecture material distribution to cloud PDF architecture eliminates raw pulp processing, bleaching chlorine, and chemical toner cartridges.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">2. Hardware & Textbook Circulation Protocol</h4>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Textbooks:</strong> High-density reuse protocol extends book circulation by over 4 batches, saving 2,800 sheets of paper per student over their collegiate career.</li>
                  <li><strong>Digital passes:</strong> Zero single-use lanyard badges at campus hackathons and tech symposiums.</li>
                  <li><strong>Noticeboards:</strong> Real-time urgent alerts eliminate mass paper flyer distribution across campus halls.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1">3. Institutional ESG & University Accreditation</h4>
                <p className="leading-relaxed">
                  Universities adopting CampusConnect report positive contributions toward AASHE STARS sustainability ratings and regional green university accreditations.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setIsDossierOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-indigo-600"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
