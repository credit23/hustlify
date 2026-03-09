import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { createPortal } from "react-dom";
import {
  Search, Send, Paperclip, Smile, MoreVertical,
  Check, CheckCheck, Briefcase, MapPin, Star,
  X, ArrowLeft, Maximize2, FileText, Image as ImgIcon,
  Users, ChevronRight, BookmarkCheck,
  MessageSquare, ExternalLink, Download,
  Phone, PlusCircle, ChevronDown,
  Filter, CheckCircle2,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
type MessageStatus = "sent" | "delivered" | "read";
type ConvFilter = "all" | "clients" | "companies" | "active" | "archived";
type JobStatus = "open" | "in-progress" | "offer-received" | "completed";

interface Attachment { type: "image" | "file"; name: string; size?: string; }

interface Message {
  id: string;
  from: "me" | "them";
  text: string;
  time: string;
  status?: MessageStatus;
  attachment?: Attachment;
  isDateDivider?: boolean;
  dividerLabel?: string;
}

interface JobContext {
  title: string; company: string; type: string;
  workMode: "Remote" | "On-site" | "Hybrid";
  salary: string; location: string; description: string;
  status: JobStatus; rating: number; domain: string; domainColor: string;
}

interface Conversation {
  id: string; kind: "client" | "company";
  name: string; initial: string; gradient: string;
  role: string; jobTitle: string;
  lastMessage: string; lastTime: string;
  unread: number; online: boolean; isTyping?: boolean; archived: boolean;
  messages: Message[]; job: JobContext;
}

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const CONVS: Conversation[] = [
  {
    id: "1", kind: "company", name: "VoltaPro", initial: "V",
    gradient: "from-yellow-400 to-orange-500", role: "Gestionnaire RH",
    jobTitle: "Électricien Maître · Alger",
    lastMessage: "Êtes-vous disponible jeudi à 14h pour un entretien ?",
    lastTime: "10:42", unread: 3, online: true, archived: false,
    job: {
      title: "Électricien Maître", company: "VoltaPro", type: "CDI",
      workMode: "On-site", salary: "65 000 – 95 000 DA/mois",
      location: "Alger · Bab El Oued",
      description: "Câblage résidentiel et commercial dans un complexe de 40 appartements. Durée 3 mois, possibilité de prolongation.",
      status: "offer-received", rating: 4.8, domain: "Électricité",
      domainColor: "bg-yellow-50 text-yellow-700 border-yellow-200",
    },
    messages: [
      { id: "d1", from: "them", text: "", time: "", isDateDivider: true, dividerLabel: "Aujourd'hui" },
      { id: "1a", from: "them", text: "Bonjour ! Nous avons consulté votre CV — vos certifications sont impressionnantes.", time: "09:15" },
      { id: "1b", from: "me", text: "Merci ! Je suis très intéressé. Pouvez-vous me donner plus de détails sur le projet ?", time: "09:22", status: "read" },
      { id: "1c", from: "them", text: "Câblage complet dans un complexe de 40 appartements à Bab El Oued. Début le 1er du mois prochain, durée 3 mois.", time: "09:35" },
      { id: "1d", from: "me", text: "Parfait. J'ai 8 ans d'expérience en installation résidentielle. Pouvez-vous m'envoyer le cahier des charges ?", time: "09:44", status: "read" },
      { id: "1e", from: "them", text: "Bien sûr, le voici :", time: "10:02", attachment: { type: "file", name: "Cahier_Charges_VoltaPro.pdf", size: "2.4 Mo" } },
      { id: "1f", from: "me", text: "Tout est clair. Je suis disponible pour un entretien cette semaine.", time: "10:28", status: "read" },
      { id: "1g", from: "them", text: "Êtes-vous disponible jeudi à 14h pour un entretien ?", time: "10:42" },
    ],
  },
  {
    id: "2", kind: "client", name: "Karim Benali", initial: "K",
    gradient: "from-blue-500 to-indigo-600", role: "Propriétaire",
    jobTitle: "Plomberie urgente · Constantine",
    lastMessage: "D'accord, à demain matin 8h alors.", lastTime: "Hier",
    unread: 0, online: false, archived: false,
    job: {
      title: "Réparation Fuite d'Eau", company: "Client Particulier", type: "Freelance",
      workMode: "On-site", salary: "8 000 – 12 000 DA",
      location: "Constantine · Sidi Mabrouk",
      description: "Fuite importante sous l'évier de la cuisine. Appartement au 3ème étage, coupure d'eau effectuée.",
      status: "in-progress", rating: 4.6, domain: "Plomberie",
      domainColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    messages: [
      { id: "d1", from: "them", text: "", time: "", isDateDivider: true, dividerLabel: "Hier" },
      { id: "2a", from: "them", text: "Salam, j'ai une fuite d'eau urgente. Vous pouvez venir aujourd'hui ?", time: "08:00" },
      { id: "2b", from: "me", text: "Bonjour ! Disponible cet après-midi vers 15h. Décrivez le problème.", time: "08:15", status: "read" },
      { id: "2c", from: "them", text: "C'est sous l'évier de la cuisine. J'ai coupé l'arrivée d'eau.", time: "08:18" },
      { id: "2d", from: "them", text: "Photo de la fuite :", time: "08:20", attachment: { type: "image", name: "fuite_cuisine.jpg" } },
      { id: "2e", from: "me", text: "Probablement un joint usé. Moins d'une heure d'intervention.", time: "08:25", status: "read" },
      { id: "2f", from: "them", text: "Combien ça coûte ?", time: "08:30" },
      { id: "2g", from: "me", text: "Entre 8 000 et 12 000 DA selon les pièces. Je confirme sur place.", time: "08:35", status: "read" },
      { id: "2h", from: "them", text: "D'accord, à demain matin 8h alors.", time: "08:40" },
    ],
  },
  {
    id: "3", kind: "company", name: "DataMind DZ", initial: "D",
    gradient: "from-cyan-500 to-blue-600", role: "Tech Lead",
    jobTitle: "Ingénieur ML · Remote",
    lastMessage: "Tuesday or Wednesday for the technical interview?",
    lastTime: "Lun", unread: 1, online: true, isTyping: true, archived: false,
    job: {
      title: "Ingénieur Machine Learning", company: "DataMind DZ", type: "CDI",
      workMode: "Remote", salary: "220 000 – 350 000 DA/mois",
      location: "Télétravail · Toute l'Algérie",
      description: "Modèles ML en production pour des systèmes de recommandation temps réel. Stack: PyTorch, MLflow, Kubernetes.",
      status: "open", rating: 4.9, domain: "Data & IA",
      domainColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    },
    messages: [
      { id: "d1", from: "them", text: "", time: "", isDateDivider: true, dividerLabel: "Lundi" },
      { id: "3a", from: "them", text: "Hello! We reviewed your application — your PyTorch experience is exactly what we need.", time: "09:00" },
      { id: "3b", from: "me", text: "Thank you! Very excited about this opportunity. 4 years of production ML experience.", time: "09:45", status: "read" },
      { id: "3c", from: "them", text: "Tuesday or Wednesday for the technical interview?", time: "14:22" },
    ],
  },
  {
    id: "4", kind: "company", name: "MotoX Garage", initial: "M",
    gradient: "from-red-500 to-rose-600", role: "Gérant",
    jobTitle: "Mécanicien Moto · Tizi Ouzou",
    lastMessage: "Votre période d'essai commence le 15. Confirmez SVP.",
    lastTime: "Dim", unread: 2, online: true, archived: false,
    job: {
      title: "Mécanicien Moto", company: "MotoX Garage", type: "CDI",
      workMode: "On-site", salary: "38 000 – 60 000 DA/mois",
      location: "Tizi Ouzou · Draa Ben Khedda",
      description: "Garage multi-marques — sportives, customs, trails. ~50 motos/mois. Équipe de 4 mécaniciens.",
      status: "offer-received", rating: 4.7, domain: "Mécanique Moto",
      domainColor: "bg-red-50 text-red-700 border-red-200",
    },
    messages: [
      { id: "d1", from: "them", text: "", time: "", isDateDivider: true, dividerLabel: "Dimanche" },
      { id: "4a", from: "them", text: "Salam, votre profil est exactement ce qu'on cherche. 5 ans multi-marques, c'est parfait.", time: "11:00" },
      { id: "4b", from: "me", text: "Merci ! Quel est le volume de travail mensuel ?", time: "11:30", status: "read" },
      { id: "4c", from: "them", text: "~50 motos/mois. Entretien, pannes, préparations — très varié !", time: "12:00" },
      { id: "4d", from: "them", text: "Votre période d'essai commence le 15. Confirmez SVP.", time: "14:00" },
    ],
  },
  {
    id: "5", kind: "client", name: "Meriem Hadj", initial: "M",
    gradient: "from-fuchsia-500 to-purple-600", role: "Directrice Marketing",
    jobTitle: "Logo & Identité Visuelle · Oran",
    lastMessage: "Le logo est parfait ! Merci infiniment ✨", lastTime: "28 juin",
    unread: 0, online: false, archived: true,
    job: {
      title: "Logo & Identité Visuelle", company: "Client Professionnel", type: "Freelance",
      workMode: "Remote", salary: "25 000 DA",
      location: "Oran (Télétravail)",
      description: "Logo et charte graphique pour une boutique de mode féminine. Style élégant, couleurs rose poudré et doré.",
      status: "completed", rating: 5.0, domain: "Design Graphique",
      domainColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
    messages: [
      { id: "d1", from: "them", text: "", time: "", isDateDivider: true, dividerLabel: "25 juin" },
      { id: "5a", from: "them", text: "Bonjour ! J'ai besoin d'un logo. Budget 25 000 DA, livraison 5 jours. Disponible ?", time: "10:00" },
      { id: "5b", from: "me", text: "Oui ! Décrivez-moi votre boutique et vos préférences de style.", time: "10:20", status: "read" },
      { id: "5c", from: "them", text: "Boutique de mode féminine, style élégant moderne. Couleurs : rose poudré et doré.", time: "10:35" },
      { id: "d2", from: "them", text: "", time: "", isDateDivider: true, dividerLabel: "27 juin" },
      { id: "5d", from: "me", text: "Voici 3 propositions :", time: "15:00", status: "read", attachment: { type: "image", name: "logo_propositions_v1.png" } },
      { id: "5e", from: "them", text: "Le logo est parfait ! Merci infiniment ✨", time: "17:30" },
    ],
  },
  {
    id: "6", kind: "company", name: "BuildRight DZ", initial: "B",
    gradient: "from-orange-500 to-amber-600", role: "Chef de Chantier",
    jobTitle: "Manœuvre BTP · Batna",
    lastMessage: "Le chantier reprend lundi, soyez là à 7h.", lastTime: "Mar",
    unread: 0, online: false, archived: false,
    job: {
      title: "Manœuvre BTP", company: "BuildRight DZ", type: "CDI",
      workMode: "On-site", salary: "28 000 – 45 000 DA/mois",
      location: "Batna · Barika",
      description: "Gros œuvre pour un projet de logements collectifs. Chantier actif, équipe de 12.",
      status: "in-progress", rating: 4.1, domain: "BTP",
      domainColor: "bg-orange-50 text-orange-700 border-orange-200",
    },
    messages: [
      { id: "d1", from: "them", text: "", time: "", isDateDivider: true, dividerLabel: "Mardi" },
      { id: "6a", from: "them", text: "Votre candidature est retenue. Disponible lundi prochain ?", time: "08:00" },
      { id: "6b", from: "me", text: "Oui disponible. À quelle heure ?", time: "08:30", status: "read" },
      { id: "6c", from: "them", text: "Le chantier reprend lundi, soyez là à 7h. Apportez vos EPI.", time: "10:15" },
    ],
  },
];

const STATUS_CFG: Record<JobStatus, { label: string; classes: string; dot: string }> = {
  "open":           { label: "Poste ouvert",   classes: "bg-blue-50 text-blue-700 border-blue-200",       dot: "bg-blue-500" },
  "in-progress":    { label: "En cours",        classes: "bg-amber-50 text-amber-700 border-amber-200",    dot: "bg-amber-500" },
  "offer-received": { label: "Offre reçue",     classes: "bg-violet-50 text-violet-700 border-violet-200", dot: "bg-violet-500" },
  "completed":      { label: "Terminé ✓",       classes: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
};

const FILTER_LABELS: Record<ConvFilter, string> = {
  all: "Tous", clients: "Clients", companies: "Entreprises",
  active: "Actifs", archived: "Archivés",
};

// ─────────────────────────────────────────────────────────────────────────────
// SMALL COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────
function CAv({ initial, gradient, size = "md", online }: {
  initial: string; gradient: string; size?: "sm"|"md"|"lg"; online?: boolean;
}) {
  const sz = { sm: "w-8 h-8 text-xs", md: "w-11 h-11 text-sm", lg: "w-12 h-12 text-base" }[size];
  return (
    <div className="relative flex-shrink-0">
      <div className={`${sz} rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md font-bold text-white`}>
        {initial}
      </div>
      {online !== undefined && (
        <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white shadow-sm ${online ? "bg-emerald-400" : "bg-slate-300"}`} />
      )}
    </div>
  );
}

function MsgTick({ status }: { status?: MessageStatus }) {
  if (!status) return null;
  if (status === "sent")      return <Check className="w-3 h-3 text-slate-400" />;
  if (status === "delivered") return <CheckCheck className="w-3 h-3 text-slate-400" />;
  return <CheckCheck className="w-3 h-3 text-violet-500" />;
}

function TypingBubble() {
  return (
    <div className="flex items-end gap-2 mt-4">
      <div className="w-7 h-7 rounded-xl bg-slate-200 flex items-center justify-center flex-shrink-0 animate-pulse" />
      <div className="flex gap-1.5 px-4 py-3.5 bg-white/90 border border-slate-200/80 rounded-2xl rounded-bl-sm shadow-sm">
        {[0, 160, 320].map(d => (
          <span key={d} className="w-2 h-2 rounded-full bg-slate-400"
            style={{ animation: `typingBounce 0.9s ${d}ms infinite ease-in-out` }} />
        ))}
      </div>
    </div>
  );
}

function Attach({ a, mine }: { a: Attachment; mine: boolean }) {
  if (a.type === "image") return (
    <div className="mt-2 w-44 h-28 rounded-xl overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center relative group cursor-pointer border border-white/20">
      <ImgIcon className="w-7 h-7 text-slate-400" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
        <Download className="w-5 h-5 text-white drop-shadow" />
      </div>
      <span className="absolute bottom-1.5 left-2 text-[10px] bg-white/80 text-slate-600 px-1.5 py-0.5 rounded font-medium truncate max-w-[80%]">{a.name}</span>
    </div>
  );
  return (
    <div className={`mt-2 flex items-center gap-2.5 px-3 py-2.5 rounded-xl border cursor-pointer w-52 hover:scale-[1.02] transition-all ${
      mine ? "bg-white/20 border-white/30 hover:bg-white/30 text-white" : "bg-white/80 border-slate-200 hover:bg-slate-50 text-slate-700"
    }`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${mine ? "bg-white/20" : "bg-violet-50"}`}>
        <FileText className={`w-4 h-4 ${mine ? "text-white" : "text-violet-600"}`} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold truncate">{a.name}</p>
        {a.size && <p className="text-[10px] opacity-60 mt-0.5">{a.size}</p>}
      </div>
      <Download className="w-3.5 h-3.5 flex-shrink-0 opacity-60" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
export default function MessagesPage() {
  const [convs, setConvs]           = useState(CONVS);
  const [activeId, setActiveId]     = useState("1");
  const [filter, setFilter]         = useState<ConvFilter>("all");
  const [search, setSearch]         = useState("");
  const [draft, setDraft]           = useState("");
  const [showJob, setShowJob]       = useState(true);
  const [mobileView, setMobileView] = useState<"list"|"chat">("list");
  const [mobileJobOpen, setMobileJobOpen] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const endRef     = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  const active = useMemo(() => convs.find(c => c.id === activeId)!, [convs, activeId]);

  const filtered = useMemo(() => convs.filter(c => {
    if (filter === "clients"   && c.kind !== "client")  return false;
    if (filter === "companies" && c.kind !== "company") return false;
    if (filter === "active"    && (c.archived || c.job.status === "completed")) return false;
    if (filter === "archived"  && !c.archived)          return false;
    if (filter === "all"       && c.archived)           return false;
    const q = search.toLowerCase();
    if (q && !c.name.toLowerCase().includes(q) && !c.jobTitle.toLowerCase().includes(q)) return false;
    return true;
  }), [convs, filter, search]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [activeId, active?.messages.length]);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (el) setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 120);
  }, []);

  const openConv = (id: string) => {
    setConvs(p => p.map(c => c.id === id ? { ...c, unread: 0 } : c));
    setActiveId(id);
    setMobileView("chat");
  };

  const sendMsg = () => {
    const txt = draft.trim();
    if (!txt) return;
    const msg: Message = {
      id: `m${Date.now()}`, from: "me", text: txt,
      time: new Date().toLocaleTimeString("fr-DZ", { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };
    setConvs(p => p.map(c => c.id === activeId
      ? { ...c, messages: [...c.messages, msg], lastMessage: txt, lastTime: "maintenant" } : c));
    setDraft("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const totalUnread = convs.reduce((s, c) => s + c.unread, 0);
  const job = active.job;
  const scfg = STATUS_CFG[job.status];

  // ── SIDEBAR ────────────────────────────────────────────────────────────────
  const Sidebar = (
    <div className="flex flex-col h-full bg-white/70 backdrop-blur-sm">
      <div className="px-4 pt-4 pb-3 border-b border-slate-100 flex-shrink-0 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-sm">
              <MessageSquare className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-sm">Conversations</span>
            {totalUnread > 0 && (
              <span className="h-5 min-w-[20px] px-1.5 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                {totalUnread}
              </span>
            )}
          </div>
          <button className="p-1.5 rounded-xl text-slate-400 hover:text-violet-600 hover:bg-violet-50 transition-all">
            <PlusCircle className="w-4 h-4" />
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Rechercher…"
            className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50/80 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-300/40 focus:border-violet-300 transition-all"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-0.5">
          {(Object.keys(FILTER_LABELS) as ConvFilter[]).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all duration-200 ${
                filter === f
                  ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"
              }`}
            >{FILTER_LABELS[f]}</button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center py-14 px-6 text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center mb-3">
              <MessageSquare className="w-5 h-5 text-violet-400" />
            </div>
            <p className="text-sm font-semibold text-slate-600 mb-1">Aucune conversation</p>
            <p className="text-xs text-slate-400">Essayez un autre filtre</p>
          </div>
        ) : filtered.map(c => {
          const isAct = c.id === activeId;
          return (
            <button key={c.id} onClick={() => openConv(c.id)}
              className={`w-full text-left px-4 py-3.5 border-b border-slate-100/60 transition-all duration-150 relative ${
                isAct ? "bg-gradient-to-r from-violet-50/80 to-blue-50/50" : "hover:bg-slate-50/80"
              }`}
            >
              {isAct && <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-gradient-to-b from-violet-600 to-blue-600" />}
              <div className="flex items-start gap-3">
                <CAv initial={c.initial} gradient={c.gradient} size="md" online={c.online} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className={`text-sm font-semibold truncate ${isAct ? "text-violet-700" : "text-slate-800"}`}>{c.name}</span>
                    <span className="text-[10px] text-slate-400 ml-2 flex-shrink-0">{c.lastTime}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mb-1 truncate">{c.jobTitle}</p>
                  <div className="flex items-center gap-1.5">
                    <p className={`text-xs flex-1 truncate ${c.isTyping ? "text-violet-600 italic font-medium" : "text-slate-500"}`}>
                      {c.isTyping ? "En train d'écrire…" : c.lastMessage}
                    </p>
                    {c.unread > 0 && (
                      <span className="flex-shrink-0 h-4 min-w-[16px] px-1 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
                        {c.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  // ── CHAT ───────────────────────────────────────────────────────────────────
  const Chat = (
    <div className="flex flex-col h-full min-w-0 relative">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3.5 bg-white/85 backdrop-blur-sm border-b border-slate-200/80 flex-shrink-0 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <button onClick={() => setMobileView("list")}
            className="md:hidden p-1.5 rounded-xl text-slate-500 hover:bg-slate-100 transition-all flex-shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <CAv initial={active.initial} gradient={active.gradient} size="md" online={active.online} />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-slate-900 text-sm truncate">{active.name}</h3>
              <span className={`flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${
                active.kind === "company" ? "bg-indigo-50 text-indigo-600 border-indigo-200" : "bg-emerald-50 text-emerald-600 border-emerald-200"
              }`}>
                {active.kind === "company" ? "Entreprise" : "Client"}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
              {active.isTyping
                ? <span className="text-violet-600 italic font-medium">En train d'écrire…</span>
                : active.online
                  ? <><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /><span className="text-emerald-600 font-medium">En ligne</span></>
                  : "Hors ligne"
              }
              <span className="text-slate-300">·</span>{active.role}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button className="hidden sm:flex p-2 rounded-xl text-slate-500 hover:text-violet-600 hover:bg-violet-50 border border-transparent hover:border-violet-200 transition-all">
            <Briefcase className="w-4 h-4" />
          </button>
          <button className="hidden sm:flex p-2 rounded-xl text-slate-500 hover:text-violet-600 hover:bg-violet-50 border border-transparent hover:border-violet-200 transition-all">
            <Phone className="w-4 h-4" />
          </button>
          <button onClick={() => setShowJob(s => !s)}
            className={`hidden lg:flex p-2 rounded-xl border transition-all ${showJob ? "text-violet-600 bg-violet-50 border-violet-200" : "text-slate-500 border-transparent hover:bg-slate-100"}`}>
            <Maximize2 className="w-4 h-4" />
          </button>
          <button onClick={() => setMobileJobOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 border border-transparent transition-all">
            <Maximize2 className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 border border-transparent transition-all">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} onScroll={onScroll}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-0.5"
        style={{ background: "linear-gradient(160deg,#f5f3ff 0%,#eff6ff 60%,#f8faff 100%)" }}>
        {active.messages.map((msg, idx) => {
          if (msg.isDateDivider) return (
            <div key={msg.id} className="flex items-center gap-3 py-4">
              <div className="flex-1 h-px bg-slate-200/80" />
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1 bg-white/90 rounded-full border border-slate-200/80 shadow-sm whitespace-nowrap">
                {msg.dividerLabel}
              </span>
              <div className="flex-1 h-px bg-slate-200/80" />
            </div>
          );

          const isMe = msg.from === "me";
          const prev = active.messages[idx - 1];
          const next = active.messages[idx + 1];
          const prevSame = prev && !prev.isDateDivider && prev.from === msg.from;
          const nextSame = next && !next.isDateDivider && next.from === msg.from;

          return (
            <div key={msg.id}
              className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : ""} ${prevSame ? "mt-0.5" : "mt-4"}`}
              style={{ animation: "msgIn 0.18s ease-out" }}
            >
              {!isMe && (
                <div className="w-7 flex-shrink-0 self-end">
                  {!nextSame
                    ? <div className={`w-7 h-7 rounded-xl bg-gradient-to-br ${active.gradient} flex items-center justify-center shadow-sm`}>
                        <span className="text-white font-bold text-[10px]">{active.initial}</span>
                      </div>
                    : <div className="w-7 h-7" />
                  }
                </div>
              )}

              <div className={`flex flex-col max-w-[68%] sm:max-w-[58%] ${isMe ? "items-end" : "items-start"}`}>
                <div className={`px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
                  isMe
                    ? "bg-gradient-to-br from-violet-600 to-blue-600 text-white rounded-2xl rounded-br-sm"
                    : "bg-white/95 border border-slate-200/80 text-slate-800 rounded-2xl rounded-bl-sm"
                } ${prevSame && isMe ? "rounded-tr-lg" : ""} ${prevSame && !isMe ? "rounded-tl-lg" : ""}`}>
                  {msg.text}
                  {msg.attachment && <Attach a={msg.attachment} mine={isMe} />}
                </div>
                {!nextSame && (
                  <div className={`flex items-center gap-1 mt-1 ${isMe ? "flex-row-reverse" : ""}`}>
                    <span className="text-[10px] text-slate-400">{msg.time}</span>
                    {isMe && <MsgTick status={msg.status} />}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {active.isTyping && <TypingBubble />}
        <div ref={endRef} />
      </div>

      {/* Scroll-to-bottom button */}
      {showScrollBtn && (
        <button onClick={() => endRef.current?.scrollIntoView({ behavior: "smooth" })}
          className="absolute bottom-[120px] right-4 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-violet-700 hover:border-violet-200 transition-all hover:scale-110 z-10">
          <ChevronDown className="w-4 h-4" />
        </button>
      )}

      {/* Quick replies */}
      <div className="px-4 pt-3 pb-1 bg-white/90 border-t border-slate-100 flex-shrink-0">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {["Oui, je confirme ✓", "Disponible cette semaine", "Merci, bien reçu", "Pouvez-vous préciser ?"].map(r => (
            <button key={r} onClick={() => setDraft(r)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-white border border-slate-200 text-slate-600 hover:border-violet-300 hover:text-violet-700 hover:bg-violet-50 transition-all whitespace-nowrap">
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-2 bg-white/90 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-500 hover:border-violet-200 hover:text-violet-600 hover:bg-violet-50 transition-all flex-shrink-0 shadow-sm">
            <Paperclip className="w-4 h-4" />
          </button>
          <div className="flex-1 relative">
            <input ref={inputRef} type="text" value={draft}
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMsg()}
              placeholder="Écrire un message…"
              className="w-full pl-4 pr-10 py-3 rounded-2xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-300/50 focus:border-violet-300 transition-all shadow-sm"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500 transition-colors">
              <Smile className="w-4 h-4" />
            </button>
          </div>
          <button onClick={sendMsg} disabled={!draft.trim()}
            className={`p-2.5 rounded-xl flex-shrink-0 transition-all duration-200 ${
              draft.trim()
                ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-md shadow-purple-200/60 hover:shadow-lg hover:scale-105 active:scale-95"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}>
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  // ── JOB PANEL ──────────────────────────────────────────────────────────────
  const JobPanel = (
    <div className="flex flex-col h-full overflow-y-auto bg-white/70 backdrop-blur-sm">
      <div className="px-5 pt-5 pb-4 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center">
            <Briefcase className="w-3.5 h-3.5 text-violet-600" />
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Contexte du Poste</span>
        </div>
        <button onClick={() => { setShowJob(false); setMobileJobOpen(false); }}
          className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="px-5 py-5 space-y-4 flex-1">
        {/* Company + title */}
        <div className="flex items-start gap-3">
          <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${active.gradient} flex items-center justify-center shadow-md flex-shrink-0`}>
            <span className="text-white font-bold text-sm">{active.initial}</span>
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-slate-900 text-sm leading-tight">{job.title}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{job.company}</p>
            <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="text-xs font-semibold text-slate-600">{job.rating}</span>
              </div>
              <span className="text-slate-200">·</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${job.domainColor}`}>{job.domain}</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border ${scfg.classes}`}>
          <span className={`w-2 h-2 rounded-full ${scfg.dot} flex-shrink-0`} />
          <span className="text-xs font-semibold">{scfg.label}</span>
        </div>

        {/* Details */}
        <div className="space-y-2">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-black text-emerald-700">DA</span>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Salaire</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{job.salary}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Lieu</p>
              <p className="text-xs font-bold text-slate-800 mt-0.5">{job.location}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
              <Briefcase className="w-3.5 h-3.5 text-violet-500 flex-shrink-0" />
              <div><p className="text-[10px] text-slate-400">Type</p><p className="text-xs font-bold text-slate-800">{job.type}</p></div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-white border border-slate-100 shadow-sm">
              <Users className="w-3.5 h-3.5 text-purple-500 flex-shrink-0" />
              <div><p className="text-[10px] text-slate-400">Mode</p><p className="text-xs font-bold text-slate-800">{job.workMode}</p></div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1.5">Description</p>
          <p className="text-xs text-slate-600 leading-relaxed">{job.description}</p>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

        {/* Actions */}
        <div className="space-y-2 pb-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Actions rapides</p>

          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 text-white text-xs font-bold shadow-md shadow-purple-200/50 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
            <span className="flex items-center gap-2"><ExternalLink className="w-3.5 h-3.5" />Voir l'offre complète</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-70" />
          </button>

          {job.status === "open" && (
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-violet-200 text-violet-700 text-xs font-bold hover:bg-violet-50 transition-all">
              <span className="flex items-center gap-2"><FileText className="w-3.5 h-3.5" />Envoyer une proposition</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </button>
          )}
          {job.status === "offer-received" && (<>
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold hover:bg-emerald-100 transition-all">
              <span className="flex items-center gap-2"><BookmarkCheck className="w-3.5 h-3.5" />Accepter le contrat</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold hover:bg-rose-100 transition-all">
              <span className="flex items-center gap-2"><X className="w-3.5 h-3.5" />Décliner l'offre</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </button>
          </>)}
          {job.status === "in-progress" && (
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold hover:bg-amber-100 transition-all">
              <span className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" />Marquer comme terminé</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </button>
          )}
          {job.status === "completed" && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
              <CheckCheck className="w-3.5 h-3.5" />Mission terminée avec succès ✓
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // Mobile job drawer
  const MobileDrawer = mobileJobOpen ? createPortal(
    <div className="fixed inset-0 z-[9990] flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileJobOpen(false)} />
      <div className="relative bg-white rounded-t-3xl max-h-[88vh] flex flex-col shadow-2xl overflow-hidden"
        style={{ animation: "slideUpIn 0.28s ease-out" }}>
        <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-slate-100 flex-shrink-0">
          <span className="text-sm font-bold text-slate-800">Contexte du Poste</span>
          <button onClick={() => setMobileJobOpen(false)} className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1">{JobPanel}</div>
      </div>
    </div>,
    document.body
  ) : null;

  // ── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-blue-50/20">

      {/* Page header */}
      <div className="relative bg-white/70 backdrop-blur-xl border-b border-slate-200/80 shadow-sm overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-violet-200/25 to-blue-200/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200 mb-2">
                Communication
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
                Mes <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">Messages</span>
              </h1>
              <p className="text-slate-500 mt-1.5 text-sm">Communiquez avec vos clients et entreprises sur vos projets</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {totalUnread > 0 && (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-violet-50 to-blue-50 border border-purple-200 shadow-sm">
                  <MessageSquare className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-700">{totalUnread} non lu{totalUnread > 1 ? "s" : ""}</span>
                </div>
              )}
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-violet-50 to-blue-50 border border-purple-200 shadow-sm">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">{convs.length} conversations</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3-pane layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="rounded-3xl border border-slate-200/80 shadow-2xl shadow-purple-100/20 overflow-hidden"
          style={{ height: "calc(100vh - 228px)", minHeight: 520 }}>
          <div className="flex h-full">

            {/* Sidebar */}
            <div className={`flex-shrink-0 border-r border-slate-200/60 w-full md:w-72 lg:w-80
              ${mobileView === "list" ? "flex flex-col" : "hidden md:flex md:flex-col"}`}>
              {Sidebar}
            </div>

            {/* Chat */}
            <div className={`flex-1 min-w-0
              ${mobileView === "chat" ? "flex flex-col" : "hidden md:flex md:flex-col"}`}>
              {Chat}
            </div>

            {/* Job panel */}
            {showJob && (
              <div className="hidden lg:flex flex-col flex-shrink-0 w-72 xl:w-80 border-l border-slate-200/60 overflow-hidden">
                {JobPanel}
              </div>
            )}
          </div>
        </div>
      </div>

      {MobileDrawer}

      <style>{`
        @keyframes msgIn { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideUpIn { from { transform:translateY(100%); } to { transform:translateY(0); } }
        @keyframes typingBounce { 0%,80%,100% { transform:translateY(0); } 40% { transform:translateY(-5px); } }
        .scrollbar-hide::-webkit-scrollbar { display:none; }
        .scrollbar-hide { -ms-overflow-style:none; scrollbar-width:none; }
      `}</style>
    </div>
  );
}
