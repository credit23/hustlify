import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Search, MapPin, Clock, Briefcase, Star, Bookmark, BookmarkCheck,
  ChevronDown, ChevronLeft, ChevronRight, SlidersHorizontal,
  Sparkles, TrendingUp, Users, Zap, DollarSign, X, RotateCcw,
  CheckCircle2, Code2, Smartphone, Palette, BarChart3, Shield,
  Settings, Wind, Factory, Wrench, Hammer, Layers, Paintbrush,
  HardHat, Car, Bike, Home, Flower2, Calculator, Megaphone,
  ShoppingCart, Headphones, Camera, Film, Globe, FileText, PenTool,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN TAXONOMY
// ─────────────────────────────────────────────────────────────────────────────
interface Domain {
  id: string;
  label: string;
  icon: React.ElementType;
  pill: string;   // full Tailwind classes for the colored pill
}

interface DomainGroup {
  group: string;
  emoji: string;
  color: string;          // active button gradient
  activePill: string;     // active group button classes
  domains: Domain[];
}

const DOMAIN_GROUPS: DomainGroup[] = [
  {
    group: "Technical & Digital", emoji: "💻",
    color: "from-indigo-600 to-violet-600",
    activePill: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-transparent shadow-md",
    domains: [
      { id: "web-dev",        label: "Web Development",    icon: Code2,       pill: "bg-indigo-50 text-indigo-700 border-indigo-200" },
      { id: "mobile-dev",     label: "Mobile Development", icon: Smartphone,  pill: "bg-blue-50 text-blue-700 border-blue-200" },
      { id: "ui-ux",          label: "UI/UX Design",       icon: Palette,     pill: "bg-violet-50 text-violet-700 border-violet-200" },
      { id: "graphic-design", label: "Graphic Design",     icon: PenTool,     pill: "bg-purple-50 text-purple-700 border-purple-200" },
      { id: "data-ai",        label: "Data & AI",          icon: BarChart3,   pill: "bg-cyan-50 text-cyan-700 border-cyan-200" },
      { id: "cybersecurity",  label: "Cybersecurity",      icon: Shield,      pill: "bg-red-50 text-red-700 border-red-200" },
    ],
  },
  {
    group: "Engineering & Trades", emoji: "⚙️",
    color: "from-orange-500 to-amber-600",
    activePill: "bg-gradient-to-r from-orange-500 to-amber-600 text-white border-transparent shadow-md",
    domains: [
      { id: "electrical", label: "Electrical Work",       icon: Zap,      pill: "bg-yellow-50 text-yellow-700 border-yellow-200" },
      { id: "mechanical", label: "Mechanical Repair",     icon: Settings, pill: "bg-orange-50 text-orange-700 border-orange-200" },
      { id: "hvac",       label: "HVAC",                  icon: Wind,     pill: "bg-sky-50 text-sky-700 border-sky-200" },
      { id: "industrial", label: "Industrial Maintenance",icon: Factory,  pill: "bg-slate-100 text-slate-700 border-slate-300" },
    ],
  },
  {
    group: "Construction & Manual", emoji: "🏗️",
    color: "from-amber-600 to-yellow-500",
    activePill: "bg-gradient-to-r from-amber-600 to-yellow-500 text-white border-transparent shadow-md",
    domains: [
      { id: "plumbing",     label: "Plumbing",          icon: Wrench,     pill: "bg-blue-50 text-blue-700 border-blue-200" },
      { id: "carpentry",    label: "Carpentry",         icon: Hammer,     pill: "bg-amber-50 text-amber-700 border-amber-200" },
      { id: "masonry",      label: "Masonry",           icon: Layers,     pill: "bg-stone-50 text-stone-700 border-stone-300" },
      { id: "painting",     label: "Painting",          icon: Paintbrush, pill: "bg-pink-50 text-pink-700 border-pink-200" },
      { id: "construction", label: "Construction Labor",icon: HardHat,    pill: "bg-orange-50 text-orange-700 border-orange-200" },
    ],
  },
  {
    group: "Automotive", emoji: "🚗",
    color: "from-zinc-600 to-slate-700",
    activePill: "bg-gradient-to-r from-zinc-600 to-slate-700 text-white border-transparent shadow-md",
    domains: [
      { id: "car-mechanic",    label: "Car Mechanic",      icon: Car,      pill: "bg-zinc-50 text-zinc-700 border-zinc-200" },
      { id: "auto-electrician",label: "Auto Electrician",  icon: Zap,      pill: "bg-yellow-50 text-yellow-700 border-yellow-200" },
      { id: "motorcycle",      label: "Motorcycle Repair", icon: Bike,     pill: "bg-red-50 text-red-700 border-red-200" },
    ],
  },
  {
    group: "Home Services", emoji: "🏠",
    color: "from-teal-500 to-emerald-600",
    activePill: "bg-gradient-to-r from-teal-500 to-emerald-600 text-white border-transparent shadow-md",
    domains: [
      { id: "cleaning",         label: "Cleaning",              icon: Home,     pill: "bg-teal-50 text-teal-700 border-teal-200" },
      { id: "appliance-repair", label: "Appliance Repair",      icon: Settings, pill: "bg-indigo-50 text-indigo-700 border-indigo-200" },
      { id: "renovation",       label: "Home Renovation",       icon: HardHat,  pill: "bg-amber-50 text-amber-700 border-amber-200" },
      { id: "gardening",        label: "Gardening & Landscaping",icon: Flower2, pill: "bg-green-50 text-green-700 border-green-200" },
    ],
  },
  {
    group: "Business & Services", emoji: "💼",
    color: "from-emerald-600 to-green-600",
    activePill: "bg-gradient-to-r from-emerald-600 to-green-600 text-white border-transparent shadow-md",
    domains: [
      { id: "accounting",       label: "Accounting",       icon: Calculator,  pill: "bg-emerald-50 text-emerald-700 border-emerald-200" },
      { id: "marketing",        label: "Marketing",        icon: Megaphone,   pill: "bg-rose-50 text-rose-700 border-rose-200" },
      { id: "sales",            label: "Sales",            icon: ShoppingCart,pill: "bg-blue-50 text-blue-700 border-blue-200" },
      { id: "customer-support", label: "Customer Support", icon: Headphones,  pill: "bg-violet-50 text-violet-700 border-violet-200" },
    ],
  },
  {
    group: "Creative & Media", emoji: "🎨",
    color: "from-fuchsia-600 to-pink-600",
    activePill: "bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white border-transparent shadow-md",
    domains: [
      { id: "photography",     label: "Photography",        icon: Camera,   pill: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200" },
      { id: "video-editing",   label: "Video Editing",      icon: Film,     pill: "bg-purple-50 text-purple-700 border-purple-200" },
      { id: "content-creation",label: "Content Creation",   icon: Globe,    pill: "bg-pink-50 text-pink-700 border-pink-200" },
      { id: "writing",         label: "Writing & Translation",icon: FileText,pill: "bg-sky-50 text-sky-700 border-sky-200" },
    ],
  },
];

// Flat map for quick lookup
const DOMAIN_MAP: Record<string, Domain & { groupColor: string }> = {};
DOMAIN_GROUPS.forEach(g =>
  g.domains.forEach(d => { DOMAIN_MAP[d.id] = { ...d, groupColor: g.color }; })
);

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
interface Job {
  id: number;
  title: string;
  company: string;
  companyInitial: string;
  companyGradient: string;
  location: string;
  jobType: "Full-time" | "Part-time" | "Contract" | "Freelance";
  workMode: "Remote" | "On-site" | "Hybrid";
  domain: string;
  skills: string[];
  salary: string;
  salaryNum: number;
  experience: "Entry" | "Mid" | "Senior" | "Expert";
  duration: string;
  description: string;
  applicants: number;
  rating: number;
  postedDaysAgo: number;
  featured: boolean;
  saved: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// MOCK DATA  (diverse, multi-industry)
// ─────────────────────────────────────────────────────────────────────────────
const MOCK_JOBS: Job[] = [
  {
    id: 1, title: "Développeur React Senior", company: "Buildify DZ", companyInitial: "B",
    companyGradient: "from-indigo-500 to-purple-600", location: "Télétravail · Toute l'Algérie",
    jobType: "Full-time", workMode: "Remote", domain: "web-dev",
    skills: ["React", "TypeScript", "GraphQL", "Node.js"],
    salary: "180 000 – 260 000 DA/mois", salaryNum: 260, experience: "Senior", duration: "Long-term",
    description: "Dirigez l'architecture frontend d'une plateforme SaaS en pleine croissance. Gérez la bibliothèque de composants et encadrez les développeurs juniors.",
    applicants: 142, rating: 4.9, postedDaysAgo: 1, featured: true, saved: false,
  },
  {
    id: 2, title: "Électricien Maître", company: "VoltaPro", companyInitial: "V",
    companyGradient: "from-yellow-500 to-orange-500", location: "Alger · Bab El Oued",
    jobType: "Full-time", workMode: "On-site", domain: "electrical",
    skills: ["Norme NF C 15-100", "Tableau électrique", "Câblage", "Énergie solaire"],
    salary: "65 000 – 95 000 DA/mois", salaryNum: 95, experience: "Expert", duration: "Permanent",
    description: "Recherche un électricien agréé pour des projets de câblage résidentiel et commercial léger dans la wilaya d'Alger.",
    applicants: 34, rating: 4.8, postedDaysAgo: 0, featured: true, saved: false,
  },
  {
    id: 3, title: "Designer UI/UX", company: "Designly", companyInitial: "D",
    companyGradient: "from-violet-500 to-pink-500", location: "Télétravail · Oran",
    jobType: "Contract", workMode: "Remote", domain: "ui-ux",
    skills: ["Figma", "Prototypage", "Recherche UX", "Design System"],
    salary: "90 000 – 145 000 DA/mois", salaryNum: 145, experience: "Mid", duration: "3–6 mois",
    description: "Concevoir des expériences utilisateur pour une plateforme B2B d'analyse. Recherche, wireframes et fichiers Figma livrés.",
    applicants: 89, rating: 4.7, postedDaysAgo: 2, featured: false, saved: false,
  },
  {
    id: 4, title: "Plombier Qualifié", company: "HomeFlow", companyInitial: "H",
    companyGradient: "from-blue-500 to-cyan-500", location: "Constantine · Sidi Mabrouk",
    jobType: "Full-time", workMode: "On-site", domain: "plumbing",
    skills: ["Tuyauterie", "Réparation fuites", "Chauffe-eau", "Conformité"],
    salary: "50 000 – 80 000 DA/mois", salaryNum: 80, experience: "Mid", duration: "Continu",
    description: "Société de plomberie résidentielle cherchant un plombier qualifié pour des projets de construction neuve et de rénovation à Constantine.",
    applicants: 21, rating: 4.6, postedDaysAgo: 3, featured: false, saved: true,
  },
  {
    id: 5, title: "Ingénieur Machine Learning", company: "DataMind DZ", companyInitial: "D",
    companyGradient: "from-cyan-600 to-blue-700", location: "Télétravail · Toute l'Algérie",
    jobType: "Full-time", workMode: "Remote", domain: "data-ai",
    skills: ["Python", "PyTorch", "MLflow", "Kubernetes"],
    salary: "220 000 – 350 000 DA/mois", salaryNum: 350, experience: "Expert", duration: "Long-term",
    description: "Construire et déployer des modèles ML en production pour des systèmes de recommandation en temps réel servant des millions d'utilisateurs.",
    applicants: 311, rating: 4.9, postedDaysAgo: 0, featured: true, saved: false,
  },
  {
    id: 6, title: "Technicien Diagnostic Auto", company: "SpeedGarage", companyInitial: "S",
    companyGradient: "from-zinc-600 to-slate-700", location: "Oran · Bir El Djir",
    jobType: "Full-time", workMode: "On-site", domain: "car-mechanic",
    skills: ["Diagnostic OBD2", "Réparation moteur", "Freins", "Boîte de vitesses"],
    salary: "40 000 – 65 000 DA/mois", salaryNum: 65, experience: "Mid", duration: "Permanent",
    description: "Garage indépendant cherchant un technicien diagnostic expérimenté. Expérience multi-marques indispensable ; européennes et japonaises appréciées.",
    applicants: 18, rating: 4.5, postedDaysAgo: 4, featured: false, saved: false,
  },
  {
    id: 7, title: "Responsable Marketing Digital", company: "GrowthLab DZ", companyInitial: "G",
    companyGradient: "from-rose-500 to-orange-500", location: "Télétravail · Alger",
    jobType: "Full-time", workMode: "Remote", domain: "marketing",
    skills: ["Google Ads", "Meta Ads", "SEO", "Email Marketing"],
    salary: "85 000 – 130 000 DA/mois", salaryNum: 130, experience: "Senior", duration: "Long-term",
    description: "Gérer l'entonnoir marketing d'une marque e-commerce en pleine croissance. Manager une équipe de 4 personnes sur paid, email et SEO.",
    applicants: 74, rating: 4.6, postedDaysAgo: 5, featured: false, saved: false,
  },
  {
    id: 8, title: "Technicien HVAC / Climatisation", company: "CoolBreeze", companyInitial: "C",
    companyGradient: "from-sky-500 to-blue-600", location: "Annaba · El Bouni",
    jobType: "Full-time", workMode: "On-site", domain: "hvac",
    skills: ["Installation climatiseur", "Réfrigérants", "Dépannage", "Maintenance"],
    salary: "45 000 – 75 000 DA/mois", salaryNum: 75, experience: "Mid", duration: "Permanent",
    description: "Service et installation HVAC résidentiel et commercial. Permis de manipulation des fluides frigorigènes requis. Véhicule de service fourni.",
    applicants: 27, rating: 4.7, postedDaysAgo: 2, featured: false, saved: false,
  },
  {
    id: 9, title: "Peintre en Bâtiment", company: "ColorCraft", companyInitial: "C",
    companyGradient: "from-pink-500 to-rose-500", location: "Sétif · Ain Arnat",
    jobType: "Contract", workMode: "On-site", domain: "painting",
    skills: ["Peinture intérieure", "Préparation surface", "Raccord couleur", "Enduit"],
    salary: "35 000 – 55 000 DA/mois", salaryNum: 55, experience: "Entry", duration: "Par projet",
    description: "Recherche un peintre fiable pour des chantiers résidentiels intérieurs. Soigneux et à l'aise dans des habitations occupées.",
    applicants: 43, rating: 4.4, postedDaysAgo: 6, featured: false, saved: false,
  },
  {
    id: 10, title: "Développeur Android", company: "AppWorks DZ", companyInitial: "A",
    companyGradient: "from-green-500 to-teal-600", location: "Alger · Hydra",
    jobType: "Full-time", workMode: "Hybrid", domain: "mobile-dev",
    skills: ["Kotlin", "Jetpack Compose", "Room DB", "REST APIs"],
    salary: "130 000 – 190 000 DA/mois", salaryNum: 190, experience: "Senior", duration: "Long-term",
    description: "Développer et maintenir une application Android de gestion de flotte pour des sociétés de logistique à travers l'Algérie.",
    applicants: 55, rating: 4.6, postedDaysAgo: 7, featured: false, saved: false,
  },
  {
    id: 11, title: "Comptable / Teneur de Livres", company: "ClearBooks", companyInitial: "C",
    companyGradient: "from-emerald-500 to-green-600", location: "Télétravail · Toute l'Algérie",
    jobType: "Part-time", workMode: "Remote", domain: "accounting",
    skills: ["Sage Comptabilité", "Rapprochement", "Paie", "Fiscalité algérienne"],
    salary: "45 000 – 75 000 DA/mois", salaryNum: 75, experience: "Mid", duration: "Continu",
    description: "Comptable à temps partiel pour un portefeuille de PME. Maîtrise de Sage et de la fiscalité algérienne requise. Environ 20h/semaine.",
    applicants: 62, rating: 4.5, postedDaysAgo: 8, featured: false, saved: true,
  },
  {
    id: 12, title: "Menuisier – Mobilier sur Mesure", company: "WoodCraft Studio", companyInitial: "W",
    companyGradient: "from-amber-500 to-orange-600", location: "Blida · Boufarik",
    jobType: "Contract", workMode: "On-site", domain: "carpentry",
    skills: ["Assemblage", "Bois massif", "Finition", "CNC"],
    salary: "50 000 – 80 000 DA/mois", salaryNum: 80, experience: "Senior", duration: "Par projet",
    description: "Atelier de mobilier sur mesure cherchant un menuisier qualifié pour réaliser des pièces résidentielles haut de gamme.",
    applicants: 15, rating: 4.8, postedDaysAgo: 9, featured: false, saved: false,
  },
  {
    id: 13, title: "Photographe Événementiel", company: "LensArt Studio", companyInitial: "L",
    companyGradient: "from-fuchsia-500 to-purple-600", location: "Alger · Kouba",
    jobType: "Freelance", workMode: "On-site", domain: "photography",
    skills: ["Sony/Canon", "Lightroom", "Prise de vue", "Lumière difficile"],
    salary: "15 000 – 50 000 DA/événement", salaryNum: 85, experience: "Mid", duration: "Par projet",
    description: "Studio photo établi cherchant un second photographe pour des mariages et événements dans la région d'Alger.",
    applicants: 38, rating: 4.9, postedDaysAgo: 1, featured: true, saved: false,
  },
  {
    id: 14, title: "Mécanicien Moto", company: "Moto X Garage", companyInitial: "M",
    companyGradient: "from-red-500 to-rose-600", location: "Tizi Ouzou · Draa Ben Khedda",
    jobType: "Full-time", workMode: "On-site", domain: "motorcycle",
    skills: ["Remise en état moteur", "Suspension", "Freins", "Diagnostic multi-marques"],
    salary: "38 000 – 60 000 DA/mois", salaryNum: 60, experience: "Mid", duration: "Permanent",
    description: "Garage multi-marques cherchant un mécanicien moto expérimenté. Sportives, customs et trails bienvenus.",
    applicants: 12, rating: 4.7, postedDaysAgo: 3, featured: false, saved: false,
  },
  {
    id: 15, title: "Créateur de Contenu – Réseaux Sociaux", company: "Brandwave", companyInitial: "B",
    companyGradient: "from-pink-500 to-fuchsia-600", location: "Télétravail · Toute l'Algérie",
    jobType: "Freelance", workMode: "Remote", domain: "content-creation",
    skills: ["CapCut / Premiere", "Tendances", "Scripting", "Canva"],
    salary: "30 000 – 80 000 DA/mois", salaryNum: 60, experience: "Mid", duration: "3–6 mois",
    description: "Marque mode et lifestyle cherchant un créateur vidéo axé court format pour TikTok et Instagram Reels.",
    applicants: 184, rating: 4.3, postedDaysAgo: 2, featured: false, saved: false,
  },
  {
    id: 16, title: "Analyste Cybersécurité SOC", company: "SecureNet DZ", companyInitial: "S",
    companyGradient: "from-red-600 to-rose-700", location: "Alger · Bab Ezzouar",
    jobType: "Full-time", workMode: "Hybrid", domain: "cybersecurity",
    skills: ["SIEM", "Réponse aux incidents", "Splunk", "Threat Hunting"],
    salary: "120 000 – 180 000 DA/mois", salaryNum: 180, experience: "Mid", duration: "Long-term",
    description: "Rejoignez notre équipe SOC pour surveiller et répondre aux incidents de sécurité dans le secteur financier algérien.",
    applicants: 67, rating: 4.8, postedDaysAgo: 5, featured: false, saved: false,
  },
  {
    id: 17, title: "Chef d'Équipe Jardinage", company: "GreenScape DZ", companyInitial: "G",
    companyGradient: "from-green-600 to-emerald-700", location: "Tipaza · Cherchell",
    jobType: "Full-time", workMode: "On-site", domain: "gardening",
    skills: ["Encadrement équipe", "Irrigation", "Connaissance des plantes", "Engins"],
    salary: "35 000 – 55 000 DA/mois", salaryNum: 55, experience: "Mid", duration: "Saisonnier",
    description: "Diriger une équipe de 3–4 personnes sur des chantiers de jardinage résidentiel et commercial. Connaissance en irrigation légère requise.",
    applicants: 29, rating: 4.4, postedDaysAgo: 4, featured: false, saved: false,
  },
  {
    id: 18, title: "Monteur Vidéo – YouTube", company: "Horizon Media", companyInitial: "H",
    companyGradient: "from-purple-600 to-blue-600", location: "Télétravail · Toute l'Algérie",
    jobType: "Freelance", workMode: "Remote", domain: "video-editing",
    skills: ["Premiere Pro", "After Effects", "Miniatures", "Étalonnage"],
    salary: "8 000 – 20 000 DA/vidéo", salaryNum: 55, experience: "Entry", duration: "Continu",
    description: "Chaîne YouTube tech avec 200K abonnés recherche un monteur fiable pour 2–3 vidéos par semaine. Guide de style fourni.",
    applicants: 210, rating: 4.2, postedDaysAgo: 0, featured: false, saved: false,
  },
  {
    id: 19, title: "Graphiste – Identité de Marque", company: "LogoNest", companyInitial: "L",
    companyGradient: "from-purple-500 to-violet-600", location: "Télétravail · Oran",
    jobType: "Contract", workMode: "Remote", domain: "graphic-design",
    skills: ["Adobe Illustrator", "InDesign", "Charte graphique", "Typographie"],
    salary: "60 000 – 110 000 DA/mois", salaryNum: 110, experience: "Mid", duration: "Par projet",
    description: "Agence de branding cherchant un graphiste pour logos, chartes graphiques et packaging pour des PME clientes algériennes.",
    applicants: 77, rating: 4.6, postedDaysAgo: 10, featured: false, saved: false,
  },
  {
    id: 20, title: "Manœuvre BTP", company: "BuildRight DZ", companyInitial: "B",
    companyGradient: "from-orange-600 to-amber-600", location: "Batna · Barika",
    jobType: "Full-time", workMode: "On-site", domain: "construction",
    skills: ["Sécurité chantier", "Manutention", "Outils électroportatifs", "DOSH"],
    salary: "28 000 – 45 000 DA/mois", salaryNum: 45, experience: "Entry", duration: "Continu",
    description: "Entreprise BTP embauchant des manœuvres pour plusieurs chantiers actifs. Travail en extérieur, port de charges jusqu'à 25 kg.",
    applicants: 91, rating: 4.1, postedDaysAgo: 1, featured: false, saved: false,
  },
  {
    id: 21, title: "Agent Support Client", company: "HelpDesk Pro", companyInitial: "H",
    companyGradient: "from-violet-600 to-indigo-600", location: "Télétravail · Alger",
    jobType: "Full-time", workMode: "Remote", domain: "customer-support",
    skills: ["Intercom", "Zendesk", "Rédaction", "Empathie client"],
    salary: "30 000 – 50 000 DA/mois", salaryNum: 50, experience: "Entry", duration: "Long-term",
    description: "SaaS en forte croissance recrute des agents support pour le chat en direct et les tickets email. Aisance technique et empathie requises.",
    applicants: 156, rating: 4.3, postedDaysAgo: 2, featured: false, saved: false,
  },
  {
    id: 22, title: "Électricien – Installations Solaires", company: "SolarFirst DZ", companyInitial: "S",
    companyGradient: "from-yellow-400 to-amber-500", location: "Adrar · Reggane",
    jobType: "Full-time", workMode: "On-site", domain: "electrical",
    skills: ["Systèmes PV solaires", "Conduit", "Compteur", "Normes DZ solaire"],
    salary: "60 000 – 95 000 DA/mois", salaryNum: 95, experience: "Mid", duration: "Continu",
    description: "Société d'installation solaire résidentielle cherchant des électriciens expérimentés pour des chantiers dans le Grand Sud.",
    applicants: 24, rating: 4.7, postedDaysAgo: 3, featured: false, saved: false,
  },
  {
    id: 23, title: "Rédacteur Technique – Docs API", company: "DevDocs Inc", companyInitial: "D",
    companyGradient: "from-sky-500 to-blue-600", location: "Télétravail · Toute l'Algérie",
    jobType: "Contract", workMode: "Remote", domain: "writing",
    skills: ["Markdown", "OpenAPI / Swagger", "UX développeur", "Git"],
    salary: "70 000 – 110 000 DA/mois", salaryNum: 110, experience: "Mid", duration: "3–6 mois",
    description: "Documenter des APIs REST, SDKs et guides d'intégration pour une plateforme développeur à destination des startups algériennes.",
    applicants: 48, rating: 4.5, postedDaysAgo: 6, featured: false, saved: true,
  },
  {
    id: 24, title: "Spécialiste Rénovation Cuisine", company: "RenoHub DZ", companyInitial: "R",
    companyGradient: "from-amber-600 to-yellow-600", location: "Béjaïa · Akbou",
    jobType: "Contract", workMode: "On-site", domain: "renovation",
    skills: ["Lecture de plans", "Gestion sous-traitants", "Carrelage", "Menuiserie"],
    salary: "60 000 – 100 000 DA/mois", salaryNum: 100, experience: "Senior", duration: "Par projet",
    description: "Entreprise de rénovation cuisine/salle de bain cherchant un spécialiste capable de gérer les sous-traitants et lire les plans.",
    applicants: 19, rating: 4.8, postedDaysAgo: 7, featured: false, saved: false,
  },
  {
    id: 25, title: "Commercial B2B", company: "SalesBridge DZ", companyInitial: "S",
    companyGradient: "from-blue-600 to-indigo-600", location: "Alger · El Harrach",
    jobType: "Full-time", workMode: "Remote", domain: "sales",
    skills: ["CRM", "Prospection", "Négociation", "Pipeline"],
    salary: "70 000 DA + Commission /mois", salaryNum: 70, experience: "Mid", duration: "Long-term",
    description: "Développer de nouveaux comptes pour une société RH tech. Gestion de territoire, appels de découverte, closing de contrats.",
    applicants: 103, rating: 4.4, postedDaysAgo: 2, featured: false, saved: false,
  },
  {
    id: 26, title: "Agent de Nettoyage Résidentiel", company: "SparkleHome", companyInitial: "S",
    companyGradient: "from-teal-500 to-cyan-500", location: "Alger · Birkhadem",
    jobType: "Part-time", workMode: "On-site", domain: "cleaning",
    skills: ["Nettoyage approfondi", "Produits éco", "Gestion du temps", "Relation client"],
    salary: "25 000 – 40 000 DA/mois", salaryNum: 40, experience: "Entry", duration: "Continu",
    description: "Société de nettoyage résidentiel embauchant des agents fiables pour des interventions récurrentes. Horaires flexibles, matériel fourni.",
    applicants: 57, rating: 4.3, postedDaysAgo: 1, featured: false, saved: false,
  },
  {
    id: 27, title: "Technicien Maintenance Industrielle", company: "FactoryPro DZ", companyInitial: "F",
    companyGradient: "from-slate-600 to-gray-700", location: "Skikda · Azzaba",
    jobType: "Full-time", workMode: "On-site", domain: "industrial",
    skills: ["Programmation API/PLC", "Hydraulique", "Maintenance préventive", "GMAO"],
    salary: "55 000 – 85 000 DA/mois", salaryNum: 85, experience: "Senior", duration: "Permanent",
    description: "Fabricant de pièces industrielles cherchant un technicien de maintenance. Maîtrise des automates et pneumatiques indispensable.",
    applicants: 22, rating: 4.6, postedDaysAgo: 5, featured: false, saved: false,
  },
  {
    id: 28, title: "Maçon / Briqueteur", company: "StoneCraft DZ", companyInitial: "S",
    companyGradient: "from-stone-500 to-slate-600", location: "Médéa · Ksar El Boukhari",
    jobType: "Full-time", workMode: "On-site", domain: "masonry",
    skills: ["Pose de briques", "Mortier", "Pierre de parement", "Rejointoiement"],
    salary: "42 000 – 70 000 DA/mois", salaryNum: 70, experience: "Mid", duration: "Continu",
    description: "Entreprise de maçonnerie commerciale et résidentielle cherchant un briqueteur expérimenté pour des projets à travers la wilaya de Médéa.",
    applicants: 16, rating: 4.5, postedDaysAgo: 8, featured: false, saved: false,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FILTER / SORT CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const EXPERIENCE_LEVELS = ["Entry", "Mid", "Senior", "Expert"] as const;
const JOB_TYPES        = ["Full-time", "Part-time", "Contract", "Freelance"] as const;
const WORK_MODES       = ["Remote", "On-site", "Hybrid"] as const;
const DURATIONS        = ["Project-based", "1–3 months", "3–6 months", "Ongoing", "Long-term", "Permanent", "Seasonal"] as const;
const SORT_OPTIONS     = [
  { value: "newest",     label: "Newest",       icon: Clock },
  { value: "salary",     label: "Highest Pay",  icon: DollarSign },
  { value: "match",      label: "Best Match",   icon: Sparkles },
  { value: "applicants", label: "Most Applied", icon: TrendingUp },
] as const;
const POSTED_OPTIONS   = [
  { value: 1,  label: "Last 24 hours" },
  { value: 3,  label: "Last 3 days" },
  { value: 7,  label: "Last week" },
  { value: 14, label: "Last 2 weeks" },
  { value: 30, label: "Any time" },
];

// ─────────────────────────────────────────────────────────────────────────────
// SMALL REUSABLE COMPONENTS  (unchanged design language)
// ─────────────────────────────────────────────────────────────────────────────
function CompanyAvatar({ initial, gradient }: { initial: string; gradient: string }) {
  return (
    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
      <span className="text-white font-bold text-lg leading-none">{initial}</span>
    </div>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      <span className="text-xs font-semibold text-slate-700">{rating.toFixed(1)}</span>
    </div>
  );
}

function SkillTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-lg bg-white/80 text-slate-600 border border-slate-200/80 backdrop-blur-sm">
      {label}
    </span>
  );
}

function FilterCheckbox({ label, checked, onChange }: {
  label: string; checked: boolean; onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group py-0.5">
      <div
        onClick={onChange}
        className={`w-4 h-4 rounded-[5px] border flex items-center justify-center flex-shrink-0 transition-all duration-150 ${
          checked
            ? "bg-gradient-to-br from-violet-600 to-blue-600 border-transparent shadow-sm"
            : "border-slate-300 bg-white group-hover:border-purple-400"
        }`}
      >
        {checked && (
          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8">
            <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span
        onClick={onChange}
        className={`text-sm transition-colors ${checked ? "text-slate-800 font-medium" : "text-slate-600 group-hover:text-slate-800"}`}
      >
        {label}
      </span>
    </label>
  );
}

function SidebarSection({ title, children, defaultOpen = true, activeCount = 0 }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean; activeCount?: number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-100 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <button onClick={() => setOpen(o => !o)} className="flex items-center justify-between w-full mb-3 group">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-600 transition-colors">
            {title}
          </span>
          {activeCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="space-y-1">{children}</div>}
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center bg-white/40 backdrop-blur-sm rounded-3xl border border-slate-200/80">
      <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center mb-5">
        <Search className="w-7 h-7 text-purple-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">No jobs found</h3>
      <p className="text-sm text-slate-500 max-w-xs mb-6 leading-relaxed">
        No jobs match your current filters. Try adjusting your search or clearing some filters to see more results.
      </p>
      <button
        onClick={onReset}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-sm font-semibold shadow-md shadow-purple-200/50 hover:shadow-lg hover:scale-105 transition-all duration-200"
      >
        <RotateCcw className="w-4 h-4" /> Reset All Filters
      </button>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white/60 backdrop-blur-sm border border-slate-200/80 rounded-2xl p-5 animate-pulse">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-slate-200/80 flex-shrink-0" />
        <div className="flex-1">
          <div className="h-4 bg-slate-200/80 rounded-full w-2/5 mb-2" />
          <div className="h-3 bg-slate-100 rounded-full w-3/5" />
        </div>
      </div>
      <div className="flex gap-2 mb-3">{[80, 72, 64, 76].map(w => <div key={w} style={{ width: w }} className="h-6 bg-slate-100 rounded-full" />)}</div>
      <div className="h-3 bg-slate-100 rounded-full w-full mb-2" />
      <div className="h-3 bg-slate-100 rounded-full w-4/5 mb-4" />
      <div className="flex gap-2 mb-4">{[52, 60, 68, 56].map(w => <div key={w} style={{ width: w }} className="h-6 bg-slate-100 rounded-lg" />)}</div>
      <div className="flex justify-between">
        <div className="h-3 bg-slate-100 rounded-full w-1/3" />
        <div className="flex gap-2"><div className="h-7 w-16 bg-slate-100 rounded-xl" /><div className="h-7 w-20 bg-slate-200 rounded-xl" /></div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// PORTAL DROPDOWN — renders directly into document.body, escaping ALL stacking
// contexts so it always appears above every other page element.
// ─────────────────────────────────────────────────────────────────────────────
function PortalDropdown({
  anchorRef,
  open,
  onClose,
  children,
}: {
  anchorRef: React.RefObject<HTMLElement>;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const [pos, setPos] = useState({ top: 0, left: 0 });

  // Reposition whenever opened or on scroll/resize
  const reposition = useCallback(() => {
    if (!anchorRef.current) return;
    const r = anchorRef.current.getBoundingClientRect();
    setPos({ top: r.bottom + window.scrollY + 8, left: r.left + window.scrollX });
  }, [anchorRef]);

  useEffect(() => {
    if (!open) return;
    reposition();
    window.addEventListener("scroll", reposition, true);
    window.addEventListener("resize", reposition);
    return () => {
      window.removeEventListener("scroll", reposition, true);
      window.removeEventListener("resize", reposition);
    };
  }, [open, reposition]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const fn = (e: MouseEvent) => {
      if (anchorRef.current?.contains(e.target as Node)) return;
      onClose();
    };
    // slight delay so the button click that opened it doesn't immediately close it
    const t = setTimeout(() => document.addEventListener("mousedown", fn), 0);
    return () => { clearTimeout(t); document.removeEventListener("mousedown", fn); };
  }, [open, onClose, anchorRef]);

  if (!open) return null;

  return createPortal(
    <div
      style={{ position: "absolute", top: pos.top, left: pos.left, zIndex: 9999 }}
    >
      {children}
    </div>,
    document.body
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN GROUP BUTTON — one button + its portal dropdown
// ─────────────────────────────────────────────────────────────────────────────
function DomainGroupButton({
  grp,
  selected,
  isOpen,
  onToggleOpen,
  onSelect,
}: {
  grp: DomainGroup;
  selected: string[];
  isOpen: boolean;
  onToggleOpen: () => void;
  onSelect: (id: string) => void;
}) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const activeInGroup = grp.domains.filter(d => selected.includes(d.id)).length;

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={onToggleOpen}
        className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
          activeInGroup > 0
            ? grp.activePill
            : "bg-white/70 text-slate-600 border-slate-200 hover:border-purple-200 hover:text-purple-700 hover:bg-purple-50"
        }`}
      >
        <span className="text-base leading-none">{grp.emoji}</span>
        <span className="hidden sm:inline">{grp.group}</span>
        {activeInGroup > 0 && (
          <span className="w-4 h-4 rounded-full bg-white/30 text-[10px] font-bold flex items-center justify-center">
            {activeInGroup}
          </span>
        )}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <PortalDropdown anchorRef={btnRef as React.RefObject<HTMLElement>} open={isOpen} onClose={onToggleOpen}>
        <div className="w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl shadow-slate-400/30 p-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1 mb-2">
            {grp.group}
          </p>
          <div className="space-y-0.5">
            {grp.domains.map(domain => {
              const Icon = domain.icon;
              const active = selected.includes(domain.id);
              return (
                <button
                  key={domain.id}
                  onClick={() => { onSelect(domain.id); onToggleOpen(); }}
                  className={`flex items-center gap-2.5 w-full px-2.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left ${
                    active
                      ? `${domain.pill} border`
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-800 border border-transparent"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${domain.pill} border`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  {domain.label}
                  {active && <CheckCircle2 className="w-4 h-4 ml-auto opacity-70" />}
                </button>
              );
            })}
          </div>
        </div>
      </PortalDropdown>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN PICKER
// ─────────────────────────────────────────────────────────────────────────────
function DomainPicker({ selected, onToggle }: {
  selected: string[];
  onToggle: (id: string | "__clear__") => void;
}) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const handleToggleGroup = useCallback((groupName: string) => {
    setOpenGroup(prev => prev === groupName ? null : groupName);
  }, []);

  return (
    <div>
      {/* Group buttons row */}
      <div className="flex gap-2 flex-wrap">
        {/* All Jobs */}
        <button
          onClick={() => { onToggle("__clear__"); setOpenGroup(null); }}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
            selected.length === 0
              ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white border-transparent shadow-md shadow-purple-200/60"
              : "bg-white/70 text-slate-600 border-slate-200 hover:border-purple-200 hover:text-purple-700 hover:bg-purple-50"
          }`}
        >
          All Jobs
        </button>

        {DOMAIN_GROUPS.map(grp => (
          <DomainGroupButton
            key={grp.group}
            grp={grp}
            selected={selected}
            isOpen={openGroup === grp.group}
            onToggleOpen={() => handleToggleGroup(grp.group)}
            onSelect={(id) => onToggle(id)}
          />
        ))}
      </div>

      {/* Active selection chips */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {selected.map(id => {
            const d = DOMAIN_MAP[id];
            if (!d) return null;
            const Icon = d.icon;
            return (
              <span key={id} className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${d.pill}`}>
                <Icon className="w-3 h-3" />
                {d.label}
                <button onClick={() => onToggle(id)} className="ml-0.5 opacity-60 hover:opacity-100 transition-opacity">
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// JOB CARD
// ─────────────────────────────────────────────────────────────────────────────
function JobCard({ job, onSave }: { job: Job; onSave: (id: number) => void }) {
  const [applied, setApplied] = useState(false);
  const domain = DOMAIN_MAP[job.domain];
  const DomainIcon = domain?.icon ?? Briefcase;

  const postedLabel =
    job.postedDaysAgo === 0 ? "Today"
    : job.postedDaysAgo === 1 ? "Yesterday"
    : `${job.postedDaysAgo}d ago`;

  const typePill: Record<string, string> = {
    "Full-time": "bg-purple-50 text-purple-700 border-purple-200",
    "Contract":  "bg-blue-50 text-blue-700 border-blue-200",
    "Part-time": "bg-amber-50 text-amber-700 border-amber-200",
    "Freelance": "bg-rose-50 text-rose-700 border-rose-200",
  };
  const modePill: Record<string, string> = {
    "Remote":   "bg-emerald-50 text-emerald-700 border-emerald-200",
    "On-site":  "bg-slate-50 text-slate-600 border-slate-200",
    "Hybrid":   "bg-sky-50 text-sky-700 border-sky-200",
  };
  const expPill: Record<string, string> = {
    "Entry":  "bg-green-50 text-green-700 border-green-200",
    "Mid":    "bg-blue-50 text-blue-700 border-blue-200",
    "Senior": "bg-orange-50 text-orange-700 border-orange-200",
    "Expert": "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <div className={`
      group relative bg-white/60 backdrop-blur-sm border rounded-2xl p-5 transition-all duration-300
      hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-100/50 hover:border-purple-200/80 hover:bg-white/80
      ${job.featured
        ? "border-purple-200 shadow-md shadow-purple-100/40 ring-1 ring-purple-200/50"
        : "border-slate-200/80 shadow-sm"}
    `}>
      {/* Featured accent bar */}
      {job.featured && (
        <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-gradient-to-r from-violet-500 via-purple-500 to-blue-500" />
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 min-w-0">
          <CompanyAvatar initial={job.companyInitial} gradient={job.companyGradient} />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <h3 className="font-semibold text-slate-900 text-[15px] leading-tight group-hover:text-purple-700 transition-colors">
                {job.title}
              </h3>
              {job.featured && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-sm uppercase tracking-wide">
                  <Zap className="w-2.5 h-2.5" /> Featured
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-slate-700">{job.company}</span>
              <span className="text-slate-300">·</span>
              <StarRating rating={job.rating} />
              <span className="text-slate-300">·</span>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="w-3 h-3 text-slate-400" />
                {job.location}
              </div>
            </div>
          </div>
        </div>

        {/* Save */}
        <button
          onClick={() => onSave(job.id)}
          className={`flex-shrink-0 p-2 rounded-xl border transition-all duration-200 hover:scale-110 active:scale-95 ${
            job.saved
              ? "bg-purple-50 border-purple-200 text-purple-600"
              : "bg-white/70 border-slate-200 text-slate-400 hover:border-purple-200 hover:text-purple-500 hover:bg-purple-50"
          }`}
        >
          {job.saved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        </button>
      </div>

      {/* Badge row */}
      <div className="flex flex-wrap gap-2 mb-3">
        {domain && (
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${domain.pill}`}>
            <DomainIcon className="w-3 h-3" />
            {domain.label}
          </span>
        )}
        <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${typePill[job.jobType] ?? ""}`}>
          {job.jobType}
        </span>
        <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${modePill[job.workMode]}`}>
          {job.workMode === "Remote" && "🌍 "}{job.workMode}
        </span>
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${expPill[job.experience]}`}>
          <Briefcase className="w-3 h-3" />{job.experience}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-3">{job.description}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {job.skills.map(s => <SkillTag key={s} label={s} />)}
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-3" />

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 text-xs flex-wrap">
          <span className="flex items-center gap-1 font-semibold text-emerald-600 text-sm">
            <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-md leading-none">DA</span>
            {job.salary}
          </span>
          <span className="text-slate-300 hidden sm:block">|</span>
          <span className="flex items-center gap-1 text-slate-500">
            <Clock className="w-3.5 h-3.5 text-slate-400" />{job.duration}
          </span>
          <span className="text-slate-300 hidden sm:block">|</span>
          <span className="flex items-center gap-1 text-slate-500">
            <Users className="w-3.5 h-3.5 text-slate-400" />{job.applicants} applied
          </span>
          <span className="text-slate-400">{postedLabel}</span>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button className="text-xs font-semibold px-3.5 py-1.5 rounded-xl border border-slate-200 bg-white/70 text-slate-600 hover:border-purple-200 hover:text-purple-700 hover:bg-purple-50 transition-all duration-200">
            Details
          </button>
          <button
            onClick={() => setApplied(true)}
            className={`text-xs font-semibold px-4 py-1.5 rounded-xl transition-all duration-200 active:scale-95 ${
              applied
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-md shadow-purple-200/60 hover:shadow-lg hover:scale-105"
            }`}
          >
            {applied
              ? <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" />Applied</span>
              : "Apply Now"
            }
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function BrowseJobsPage() {
  const [jobs, setJobs]           = useState<Job[]>(MOCK_JOBS);
  const [search, setSearch]       = useState("");
  const [selDomains, setSelDomains] = useState<string[]>([]);
  const [sort, setSort]           = useState("newest");
  const [page, setPage]           = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const loading = false;
  const PER_PAGE = 6;

  // Sidebar filter state
  const [fExp,      setFExp]      = useState<string[]>([]);
  const [fTypes,    setFTypes]    = useState<string[]>([]);
  const [fModes,    setFModes]    = useState<string[]>([]);
  const [fDurations,setFDurations]= useState<string[]>([]);
  const [fPosted,   setFPosted]   = useState(30);
  const [fMinPay,   setFMinPay]   = useState(0);
  const [fLocation, setFLocation] = useState("");
  const [fRating,   setFRating]   = useState(0);
  const [skillInput,setSkillInput]= useState("");
  const [fSkills,   setFSkills]   = useState<string[]>([]);

  const toggleArr = <T,>(arr: T[], set: (v: T[]) => void, val: T) => {
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]);
    setPage(1);
  };

  const toggleDomain = (id: string | "__clear__") => {
    if (id === "__clear__") { setSelDomains([]); setPage(1); return; }
    setSelDomains(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
    setPage(1);
  };

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !fSkills.includes(s)) { setFSkills(p => [...p, s]); setPage(1); }
    setSkillInput("");
  };

  const clearAll = () => {
    setSearch(""); setSelDomains([]);
    setFExp([]); setFTypes([]); setFModes([]); setFDurations([]);
    setFPosted(30); setFMinPay(0); setFLocation(""); setFRating(0);
    setFSkills([]); setSkillInput(""); setSort("newest"); setPage(1);
  };

  const activeCount =
    selDomains.length + fExp.length + fTypes.length + fModes.length +
    fDurations.length + fSkills.length +
    (fPosted < 30 ? 1 : 0) + (fMinPay > 0 ? 1 : 0) +
    (fLocation ? 1 : 0) + (fRating > 0 ? 1 : 0);

  const filtered = useMemo(() => {
    return jobs
      .filter(j => {
        const q = search.toLowerCase();
        if (q && ![j.title, j.company, ...j.skills, DOMAIN_MAP[j.domain]?.label ?? ""]
          .some(s => s.toLowerCase().includes(q))) return false;
        if (selDomains.length && !selDomains.includes(j.domain)) return false;
        if (fExp.length      && !fExp.includes(j.experience))    return false;
        if (fTypes.length    && !fTypes.includes(j.jobType))     return false;
        if (fModes.length    && !fModes.includes(j.workMode))    return false;
        if (fDurations.length && !fDurations.includes(j.duration)) return false;
        if (j.postedDaysAgo  > fPosted)                          return false;
        if (j.salaryNum      < fMinPay)                          return false;
        if (fLocation && !j.location.toLowerCase().includes(fLocation.toLowerCase())) return false;
        if (fRating > 0 && j.rating < fRating)                   return false;
        if (fSkills.length && !fSkills.every(sk =>
          j.skills.some(s => s.toLowerCase().includes(sk.toLowerCase()))
        )) return false;
        return true;
      })
      .sort((a, b) => {
        if (sort === "newest")     return a.postedDaysAgo - b.postedDaysAgo;
        if (sort === "salary")     return b.salaryNum - a.salaryNum;
        if (sort === "applicants") return b.applicants - a.applicants;
        if (sort === "match")      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        return 0;
      });
  }, [jobs, search, selDomains, fExp, fTypes, fModes, fDurations, fPosted, fMinPay, fLocation, fRating, fSkills, sort]);

  const totalPages  = Math.ceil(filtered.length / PER_PAGE);
  const paginated   = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const savedCount  = jobs.filter(j => j.saved).length;
  const saveJob     = (id: number) =>
    setJobs(prev => prev.map(j => j.id === id ? { ...j, saved: !j.saved } : j));

  // ── RENDER ──────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20">

      {/* ═══ HERO / SEARCH ═══════════════════════════════════════════════════ */}
      {/* NOTE: overflow-hidden removed so dropdown menus are not clipped */}
      <div className="relative bg-white/70 backdrop-blur-xl border-b border-slate-200/80 shadow-sm">
        {/* Decorative blobs — overflow contained individually */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-violet-200/40 to-blue-200/30 rounded-full blur-3xl pointer-events-none overflow-hidden" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-gradient-to-tr from-purple-100/50 to-indigo-100/30 rounded-full blur-2xl pointer-events-none overflow-hidden" />

        <div className="relative max-w-7xl mx-auto px-6 py-10">

          {/* Title + stat row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
            <div>
              <span className="inline-flex text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 mb-3">
                Worker Portal
              </span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-none">
                Browse{" "}
                <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">Jobs</span>
              </h1>
              <p className="text-slate-500 mt-2 text-[15px]">
                From electricians to engineers — find work across{" "}
                <span className="font-semibold text-slate-700">every industry</span>
              </p>
            </div>
            <div className="flex items-center gap-3 flex-wrap self-start md:self-auto">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-violet-50 to-blue-50 border border-purple-200 shadow-sm">
                <Briefcase className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">
                  {DOMAIN_GROUPS.reduce((s, g) => s + g.domains.length, 0)} industries
                </span>
              </div>
              {savedCount > 0 && (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-violet-50 to-blue-50 border border-purple-200 shadow-sm">
                  <BookmarkCheck className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-700">{savedCount} saved</span>
                </div>
              )}
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mb-5">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by job title, skill, trade, or company…"
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-12 pr-12 py-4 rounded-2xl border border-slate-200/80 bg-white/80 backdrop-blur-sm text-slate-800 placeholder:text-slate-400 text-[15px] shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400/50 focus:border-violet-300 transition-all duration-200"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Domain picker — dropdowns use createPortal so they render above ALL content */}
          <div className="mb-5">
            <DomainPicker selected={selDomains} onToggle={toggleDomain} />
          </div>

          {/* Clear all filters button — only shown when filters are active */}
          {activeCount > 0 && (
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-rose-600 border border-rose-200 bg-rose-50 hover:bg-rose-100 transition-all"
              >
                <RotateCcw className="w-3 h-3" /> Clear all filters ({activeCount})
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ═══ MAIN LAYOUT ═════════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-6 py-7 flex gap-7">

        {/* ── SIDEBAR ──────────────────────────────────────────────────────── */}
        <aside className={`flex-shrink-0 transition-all duration-300 ease-in-out ${sidebarOpen ? "w-64 opacity-100" : "w-0 opacity-0 overflow-hidden"}`}>
          <div className="w-64 bg-white/70 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-5 shadow-sm sticky top-6 max-h-[calc(100vh-5rem)] overflow-y-auto">

            {/* Sidebar header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-purple-600" />
                <span className="font-bold text-slate-800 text-sm">Filters</span>
                {activeCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {activeCount}
                  </span>
                )}
              </div>
              {activeCount > 0 && (
                <button onClick={clearAll} className="text-xs text-purple-600 font-semibold hover:text-purple-800 transition-colors">
                  Reset
                </button>
              )}
            </div>

            {/* Location */}
            <SidebarSection title="Location" activeCount={fLocation ? 1 : 0}>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="City, country, or 'Remote'"
                  value={fLocation}
                  onChange={e => { setFLocation(e.target.value); setPage(1); }}
                  className="w-full pl-8 pr-3 py-2 text-sm rounded-xl border border-slate-200 bg-white/80 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-300/50 focus:border-violet-300 transition-all"
                />
              </div>
            </SidebarSection>

            {/* Required Skills */}
            <SidebarSection title="Required Skills" activeCount={fSkills.length}>
              <div className="flex gap-1.5 mb-2">
                <input
                  type="text"
                  placeholder="e.g. Welding, React…"
                  value={skillInput}
                  onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addSkill()}
                  className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white/80 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-300/50 focus:border-violet-300 transition-all"
                />
                <button
                  onClick={addSkill}
                  className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold transition-all hover:scale-105"
                >
                  +
                </button>
              </div>
              {fSkills.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {fSkills.map(s => (
                    <span key={s} className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-lg bg-violet-50 text-violet-700 border border-violet-200">
                      {s}
                      <button onClick={() => { setFSkills(p => p.filter(x => x !== s)); setPage(1); }} className="opacity-60 hover:opacity-100">
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </SidebarSection>

            {/* Experience */}
            <SidebarSection title="Experience Level" activeCount={fExp.length}>
              {EXPERIENCE_LEVELS.map(l => (
                <FilterCheckbox key={l} label={l} checked={fExp.includes(l)} onChange={() => toggleArr(fExp, setFExp, l)} />
              ))}
            </SidebarSection>

            {/* Job Type */}
            <SidebarSection title="Job Type" activeCount={fTypes.length}>
              {JOB_TYPES.map(t => (
                <FilterCheckbox key={t} label={t} checked={fTypes.includes(t)} onChange={() => toggleArr(fTypes, setFTypes, t)} />
              ))}
            </SidebarSection>

            {/* Work Mode */}
            <SidebarSection title="Work Mode" activeCount={fModes.length}>
              {WORK_MODES.map(m => (
                <FilterCheckbox key={m} label={m} checked={fModes.includes(m)} onChange={() => toggleArr(fModes, setFModes, m)} />
              ))}
            </SidebarSection>

            {/* Salary */}
            <SidebarSection title="Min. Pay / Budget" activeCount={fMinPay > 0 ? 1 : 0}>
              <div className="pt-1">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs text-slate-500">Tout</span>
                  <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200">
                    {fMinPay}k DA+
                  </span>
                  <span className="text-xs text-slate-500">350k DA</span>
                </div>
                <input
                  type="range" min={0} max={350} step={10} value={fMinPay}
                  onChange={e => { setFMinPay(Number(e.target.value)); setPage(1); }}
                  className="w-full h-1.5 rounded-full appearance-none bg-gradient-to-r from-violet-200 to-blue-200 cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r
                    [&::-webkit-slider-thumb]:from-violet-600 [&::-webkit-slider-thumb]:to-blue-600
                    [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>
            </SidebarSection>

            {/* Duration */}
            <SidebarSection title="Project Duration" activeCount={fDurations.length} defaultOpen={false}>
              {DURATIONS.map(d => (
                <FilterCheckbox key={d} label={d} checked={fDurations.includes(d)} onChange={() => toggleArr(fDurations, setFDurations, d)} />
              ))}
            </SidebarSection>

            {/* Company Rating */}
            <SidebarSection title="Company Rating" activeCount={fRating > 0 ? 1 : 0} defaultOpen={false}>
              {[4.5, 4.0, 3.5].map(r => (
                <label key={r} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                  <div
                    onClick={() => { setFRating(fRating === r ? 0 : r); setPage(1); }}
                    className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                      fRating === r
                        ? "border-violet-600 bg-gradient-to-br from-violet-600 to-blue-600"
                        : "border-slate-300 group-hover:border-purple-400"
                    }`}
                  >
                    {fRating === r && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={`w-3 h-3 ${i <= Math.floor(r) ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                    ))}
                    <span className="text-xs text-slate-500 ml-1">{r}+</span>
                  </div>
                </label>
              ))}
            </SidebarSection>

            {/* Posted Within */}
            <SidebarSection title="Posted Within" activeCount={fPosted < 30 ? 1 : 0} defaultOpen={false}>
              {POSTED_OPTIONS.map(opt => (
                <label key={opt.value} className="flex items-center gap-2.5 cursor-pointer group py-0.5">
                  <div
                    onClick={() => { setFPosted(opt.value); setPage(1); }}
                    className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                      fPosted === opt.value
                        ? "border-violet-600 bg-gradient-to-br from-violet-600 to-blue-600"
                        : "border-slate-300 group-hover:border-purple-400"
                    }`}
                  >
                    {fPosted === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span
                    onClick={() => { setFPosted(opt.value); setPage(1); }}
                    className={`text-sm cursor-pointer ${fPosted === opt.value ? "text-slate-800 font-medium" : "text-slate-600"}`}
                  >
                    {opt.label}
                  </span>
                </label>
              ))}
            </SidebarSection>
          </div>
        </aside>

        {/* ── LISTINGS ─────────────────────────────────────────────────────── */}
        <main className="flex-1 min-w-0">

          {/* Toolbar */}
          <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(o => !o)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 bg-white/70 text-slate-600 text-sm font-medium hover:border-purple-200 hover:text-purple-700 hover:bg-purple-50 transition-all backdrop-blur-sm"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                {sidebarOpen ? "Hide" : "Filters"}
              </button>
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-slate-800">{filtered.length}</span> jobs found
                {search && <span className="text-purple-600"> for "{search}"</span>}
                {selDomains.length === 1 && (
                  <span className="text-purple-600"> in {DOMAIN_MAP[selDomains[0]]?.label}</span>
                )}
              </p>
            </div>

            {/* Sort control */}
            <div className="flex items-center gap-1.5 bg-white/70 border border-slate-200 rounded-2xl p-1 backdrop-blur-sm">
              {SORT_OPTIONS.map(opt => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setSort(opt.value)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      sort === opt.value
                        ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-sm"
                        : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/70"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards / states */}
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : paginated.length === 0 ? (
            <EmptyState onReset={clearAll} />
          ) : (
            <>
              <div className="space-y-4">
                {paginated.map((job, i) => (
                  <div key={job.id} style={{ animationDelay: `${i * 50}ms` }} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <JobCard job={job} onSave={saveJob} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200/80">
                  <p className="text-sm text-slate-500">
                    Showing{" "}
                    <span className="font-semibold text-slate-700">
                      {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)}
                    </span>{" "}
                    of <span className="font-semibold text-slate-700">{filtered.length}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="p-2 rounded-xl border border-slate-200 bg-white/70 text-slate-600 hover:border-purple-200 hover:text-purple-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                      .reduce<(number | string)[]>((acc, p, i, arr) => {
                        if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push("…");
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((p, i) =>
                        p === "…" ? (
                          <span key={`e${i}`} className="w-9 h-9 flex items-center justify-center text-slate-400 text-sm">…</span>
                        ) : (
                          <button
                            key={p}
                            onClick={() => setPage(p as number)}
                            className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all duration-200 ${
                              page === p
                                ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-md shadow-purple-200/60"
                                : "bg-white/70 text-slate-600 border border-slate-200 hover:border-purple-200 hover:text-purple-700 backdrop-blur-sm"
                            }`}
                          >
                            {p}
                          </button>
                        )
                      )}

                    <button
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="p-2 rounded-xl border border-slate-200 bg-white/70 text-slate-600 hover:border-purple-200 hover:text-purple-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all backdrop-blur-sm"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}
