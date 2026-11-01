export interface SustainabilityPillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  metrics: string[];
}

export const CAMPUS_SUSTAINABILITY_PILLARS: SustainabilityPillar[] = [
  {
    number: "01",
    title: "100% Paperless Academic Vault & Digital Circulation",
    subtitle: "Conserving Forest Resources",
    description: "Every semester, hundreds of reams of paper are wasted on disposable lecture printouts and photocopy packets. CampusConnect digitizes peer notes, formulas, and past papers into cloud-accessible formats that last indefinitely.",
    metrics: [
      "1.4M+ Pages of Paper Conserved",
      "86% Reduction in Departmental Photocopying",
      "Zero Printing Chemical or Cartridge Waste"
    ]
  },
  {
    number: "02",
    title: "Circular Textbook & Academic Gear Exchange",
    subtitle: "Peer-to-Peer Hardware Reuse",
    description: "Junior students often buy expensive engineering drafters, lab kits, and reference books that seniors no longer need. Our community reuse pipeline enables direct student handoffs, extending equipment lifespans by 4x.",
    metrics: [
      "8.8/10 Resource Reusability Index",
      "3,200+ Textbooks Circulated Between Batches",
      "100% Non-Commercial Campus Handoffs"
    ]
  },
  {
    number: "03",
    title: "Eco-Conscious Campus Events & Digital Ticketing",
    subtitle: "Zero Landfill College Fests",
    description: "Campus hackathons and cultural events historically generate mountains of plastic badges and printed flyers. CampusConnect replaces them with live digital QR passes, paperless schedules, and verified attendee tracking.",
    metrics: [
      "0% Disposable Paper Entry Tickets",
      "100% Digital Check-Ins & Certificates",
      "Campus Green-Event Certification Support"
    ]
  }
];

export interface CarbonCalculatorItem {
  id: string;
  name: string;
  subtitle: string;
  carbonDelta: number; // kg CO2e saved per semester
  paperDelta: number;  // sheets of paper spared
}

export const CAMPUS_CALCULATOR_ITEMS: CarbonCalculatorItem[] = [
  {
    id: "notes",
    name: "Digital Semester Notes & Exam Guides",
    subtitle: "Replaces 6 spiral-bound photocopy packets per course",
    carbonDelta: 18.4,
    paperDelta: 1250
  },
  {
    id: "tickets",
    name: "Digital Event RSVP & Hackathon Pass",
    subtitle: "Replaces laminated PVC badges and paper entry slips",
    carbonDelta: 4.6,
    paperDelta: 120
  },
  {
    id: "textbooks",
    name: "Peer-to-Peer Textbook Circular Exchange",
    subtitle: "Replaces newly printed heavy hardcover college textbooks",
    carbonDelta: 26.2,
    paperDelta: 2800
  },
  {
    id: "notices",
    name: "Paperless Departmental Circulars & Alerts",
    subtitle: "Replaces paper flyers posted across campus noticeboards",
    carbonDelta: 7.8,
    paperDelta: 650
  }
];

export interface TradeInOption {
  value: string;
  label: string;
  description: string;
}

export const CAMPUS_TRADE_IN_OPTIONS: TradeInOption[] = [
  {
    value: "textbook",
    label: "Semester Textbooks & Reference Manuals",
    description: "Engineering, medicine, science, or business syllabus books."
  },
  {
    value: "drafter",
    label: "Engineering Drawing Tools / Lab Equipment",
    description: "Mini drafters, instrument boxes, breadboards, lab aprons."
  },
  {
    value: "calculator",
    label: "Scientific Calculators & Tech Gadgets",
    description: "Casio scientific calculators, Arduino kits, or cables."
  },
  {
    value: "notes",
    label: "Handwritten Comprehensive Semester Binder",
    description: "Clean handwritten notes eligible for high-res scanning."
  }
];
