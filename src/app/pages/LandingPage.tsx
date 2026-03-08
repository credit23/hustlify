import { useNavigate } from "react-router";
import PublicNavbar from "../components/layout/PublicNavbar";
import PublicFooter from "../components/layout/PublicFooter";
import {
  Search,
  MapPin,
  Star,
  Shield,
  Zap,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Briefcase,
  Code,
  Palette,
  BarChart3,
  Bot,
  MessageSquare,
  Lightbulb,
  Target,
  Brain,
  Send,
  Wrench,
  Megaphone,
  GraduationCap,
  UserPlus,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useLanguage } from "../context/LanguageContext";

import djezzyLogo from "figma:asset/efe6e27efbcaf9616318e504f278b1d182e39ee8.png";
import mobilisLogo from "figma:asset/c22ae82f3c1f955b89239326a7f4cbd03bed9333.png";
import yassirLogo from "figma:asset/087358969a4301a5ac196fb81b1680098156ab08.png";
import airAlgerieLogo from "figma:asset/52a8f2e679d1d7ad69d73bd19e20065b75df7d99.png";
import sonatrachLogo from "figma:asset/119f59b3cd6a5c8ae761210dae8ef1a3a87ac75f.png";
import algeriePosteLogo from "figma:asset/02c067c333cf49ef709af3b372e8dbe76df4667b.png";
import algerieTelecomLogo from "figma:asset/4e0ce0719e35c9eca3aa7f14a4d8b0db85605e5d.png";

const STATS = [
  { value: "+70", label: "Domains", icon: Briefcase },
  { value: "+2000", label: "Clients", icon: Users },
  { value: "+1500", label: "Employees", icon: Code },
  { value: "69", label: "Wilayas", icon: MapPin },
];

const TRUSTED_COMPANIES = [
  { name: "Djezzy", logo: djezzyLogo, bg: "#fff" },
  { name: "Mobilis", logo: mobilisLogo, bg: "#fff" },
  { name: "Yassir", logo: yassirLogo, bg: "#6C27D4" },
  { name: "Sonatrach", logo: sonatrachLogo, bg: "#fff" },
  { name: "Air Algérie", logo: airAlgerieLogo, bg: "#fff" },
  {
    name: "Algérie Poste",
    logo: algeriePosteLogo,
    bg: "#EEF2F7",
  },
  {
    name: "Algérie Télécom",
    logo: algerieTelecomLogo,
    bg: "#fff",
  },
];

const FEATURED_EMPLOYEES = [
  {
    id: "1",
    name: "Karim Benali",
    role: "Full-Stack Developer",
    rating: 4.9,
    reviews: 142,
    skills: ["React", "Node.js", "PostgreSQL"],
    location: "Alger",
    img: "https://images.unsplash.com/photo-1565687981296-535f09db714e?w=120&q=80",
  },
  {
    id: "2",
    name: "Sonia Amrani",
    role: "UX/UI Designer",
    rating: 5.0,
    reviews: 98,
    skills: ["Figma", "Branding", "Motion"],
    location: "Oran",
    img: "https://images.unsplash.com/photo-1765648580528-8d659861d81a?w=120&q=80",
  },
  {
    id: "3",
    name: "Yacine Messaoud",
    role: "Digital Marketer",
    rating: 4.8,
    reviews: 67,
    skills: ["SEO", "Social Media", "Ads"],
    location: "Constantine",
    img: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=120&q=80",
  },
  {
    id: "4",
    name: "Nadia Kaci",
    role: "Data Analyst",
    rating: 4.7,
    reviews: 53,
    skills: ["Python", "Power BI", "SQL"],
    location: "Alger",
    img: "https://images.unsplash.com/photo-1738750908048-14200459c3c9?w=120&q=80",
  },
];

const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Create a Profile",
    desc: "Sign in and complete your profile with ease",
    img: "https://images.unsplash.com/photo-1758873268663-5a362616b5a7?w=400&q=80",
  },
  {
    step: 2,
    title: "Search or Post Jobs",
    desc: "Find the right jobs or talents by Wilaya and Domain",
    img: "https://images.unsplash.com/photo-1758520144426-edf40a58f299?w=400&q=80",
  },
  {
    step: 3,
    title: "Connect and Grow",
    desc: "Chat, interview and hire your next opportunity",
    img: "https://images.unsplash.com/photo-1758874573402-d0b928c95dd2?w=400&q=80",
  },
];

// Floating cards data for hero - showcasing ALL types of work
const FLOATING_CARDS = [
  {
    label: "Plumber",
    icon: Wrench,
    color: "#EF4444",
    delay: 0,
  },
  {
    label: "Web Developer",
    icon: Code,
    color: "#6D28D9",
    delay: 0.3,
  },
  {
    label: "Graphic Designer",
    icon: Palette,
    color: "#F59E0B",
    delay: 0.6,
  },
  {
    label: "Accountant",
    icon: BarChart3,
    color: "#10B981",
    delay: 0.9,
  },
  {
    label: "Marketing Expert",
    icon: Megaphone,
    color: "#EC4899",
    delay: 1.2,
  },
  {
    label: "Tutor",
    icon: GraduationCap,
    color: "#8B5CF6",
    delay: 1.5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          className={
            i <= Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-200 fill-gray-200"
          }
        />
      ))}
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="relative w-full h-[420px]">
      {/* Main gradient orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full bg-gradient-to-br from-[#6D28D9]/20 via-[#2563EB]/15 to-[#60A5FA]/10 blur-xl"
        animate={{ scale: [1, 1.08, 1], rotate: [0, 5, -5, 0] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Center icon cluster */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-3xl bg-gradient-to-br from-[#6D28D9] to-[#2563EB] flex items-center justify-center shadow-2xl shadow-blue-300/50"
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Briefcase size={32} className="text-white" />
      </motion.div>

      {/* Floating skill cards */}
      {FLOATING_CARDS.map((card, i) => {
        const positions = [
          { top: "10%", left: "8%", rotate: -5 },
          { top: "8%", right: "12%", rotate: 4 },
          { top: "42%", left: "4%", rotate: -3 },
          { bottom: "15%", left: "8%", rotate: 5 },
          { bottom: "10%", right: "10%", rotate: -4 },
          { top: "50%", right: "5%", rotate: 3 },
        ];
        const pos = positions[i];
        return (
          <motion.div
            key={card.label}
            className="absolute bg-white rounded-2xl px-4 py-3 shadow-lg shadow-blue-100/50 border border-blue-50 flex items-center gap-3 cursor-default"
            style={{ ...pos }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
            transition={{
              opacity: {
                duration: 0.5,
                delay: card.delay + 0.5,
              },
              scale: { duration: 0.5, delay: card.delay + 0.5 },
              y: {
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: card.delay,
              },
            }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${card.color}15` }}
            >
              <card.icon
                size={18}
                style={{ color: card.color }}
              />
            </div>
            <span
              className="text-[#1A1A3E] whitespace-nowrap"
              style={{ fontSize: "0.82rem", fontWeight: 600 }}
            >
              {card.label}
            </span>
          </motion.div>
        );
      })}

      {/* Connected lines / dots decoration */}
      <motion.div
        className="absolute top-[30%] left-[35%] w-2 h-2 rounded-full bg-[#6D28D9]/40"
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-[60%] right-[30%] w-1.5 h-1.5 rounded-full bg-[#2563EB]/50"
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute bottom-[35%] left-[42%] w-2.5 h-2.5 rounded-full bg-[#F59E0B]/30"
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
      />

      {/* Mini stat badge */}
      <motion.div
        className="absolute top-[28%] right-[8%] bg-white rounded-xl px-3 py-2 shadow-md border border-blue-50"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
        transition={{
          opacity: { duration: 0.6, delay: 1.5 },
          x: { duration: 0.6, delay: 1.5 },
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          },
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center">
            <CheckCircle size={14} className="text-green-500" />
          </div>
          <div>
            <p
              className="text-[#1A1A3E]"
              style={{ fontSize: "0.7rem", fontWeight: 700 }}
            >
              +1,500
            </p>
            <p
              className="text-[#9CA3AF]"
              style={{ fontSize: "0.6rem" }}
            >
              Verified Talents
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Hustlify.AI Showcase Section ──────────────────────────────────
const AI_CHAT_MESSAGES = [
  {
    role: "user" as const,
    text: "Find me the best React developer jobs in Alger",
  },
  {
    role: "ai" as const,
    text: "I found 12 React developer positions in Alger! Here are the top 3 matches based on your skills:",
  },
  {
    role: "ai-card" as const,
    text: "Senior React Developer — Yassir · Remote · 180k DZD/mo",
    tags: ["React", "TypeScript"],
  },
  {
    role: "ai-card" as const,
    text: "Full-Stack Engineer — Djezzy · Hybrid · 150k DZD/mo",
    tags: ["React", "Node.js"],
  },
  {
    role: "ai-card" as const,
    text: "Frontend Lead — StartupDZ · Remote · 200k DZD/mo",
    tags: ["React", "Figma"],
  },
];

const AI_FEATURES = [
  {
    icon: Target,
    title: "Smart Job Matching",
    desc: "AI analyzes your skills, experience, and preferences to find perfect opportunities across all 69 wilayas.",
    color: "#6D28D9",
  },
  {
    icon: Users,
    title: "Client Recommendations",
    desc: "Get matched with top-rated clients who are actively hiring in your domain.",
    color: "#F59E0B",
  },
  {
    icon: Brain,
    title: "Career Insights",
    desc: "Receive personalized advice on trending skills, salary benchmarks, and growth paths in Algeria.",
    color: "#10B981",
  },
  {
    icon: Lightbulb,
    title: "Profile Optimization",
    desc: "AI-powered tips to boost your profile visibility and attract more clients.",
    color: "#EC4899",
  },
];

function HustlifyAISection({
  navigate,
}: {
  navigate: (path: string) => void;
}) {
  const [visibleMessages, setVisibleMessages] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    if (visibleMessages >= AI_CHAT_MESSAGES.length) return;
    const timer = setTimeout(
      () => {
        setVisibleMessages((prev) => prev + 1);
      },
      visibleMessages === 0 ? 600 : 800,
    );
    return () => clearTimeout(timer);
  }, [visibleMessages, isInView]);

  return (
    <section className="px-6 pb-28 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-[#6D28D9]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-[#2563EB]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#6D28D9]/10 to-[#2563EB]/10 border border-[#6D28D9]/15 rounded-full mb-5"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles size={15} className="text-[#6D28D9]" />
            </motion.div>
            <span
              className="text-[#6D28D9]"
              style={{ fontSize: "0.82rem", fontWeight: 700 }}
            >
              Powered by AI
            </span>
            <span
              className="px-2 py-0.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-md"
              style={{ fontSize: "0.6rem", fontWeight: 800 }}
            >
              NEW
            </span>
          </motion.div>
          <h2
            className="text-[#1A1A3E] mb-4"
            style={{
              fontSize: "2.4rem",
              fontWeight: 800,
              lineHeight: 1.15,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Meet{" "}
            <span className="bg-gradient-to-r from-[#6D28D9] via-[#4F46E5] to-[#2563EB] bg-clip-text text-transparent">
              Hustlify.AI
            </span>
          </h2>
          <p
            className="text-[#6B7280] max-w-xl mx-auto"
            style={{ fontSize: "1.05rem", lineHeight: 1.8 }}
          >
            Your personal AI career assistant that understands
            Algeria's job market. Get smart recommendations,
            career advice, and profile tips — all in one
            conversation.
          </p>
        </motion.div>

        {/* Main content: Chat mockup + Features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Live chat mockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onViewportEnter={() => setIsInView(true)}
            className="relative"
          >
            {/* Glow behind card */}
            <div className="absolute -inset-4 bg-gradient-to-br from-[#6D28D9]/10 via-[#2563EB]/8 to-[#93C5FD]/5 rounded-[2.5rem] blur-2xl pointer-events-none" />

            <div className="relative bg-white/90 backdrop-blur-xl rounded-[1.8rem] border border-blue-100/70 shadow-2xl shadow-blue-200/25 overflow-hidden">
              {/* Chat header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-blue-50 bg-gradient-to-r from-white to-[#FAFAFF]">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#6D28D9] to-[#2563EB] flex items-center justify-center shadow-lg shadow-blue-200/40">
                    <Bot size={18} className="text-white" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-white" />
                </div>
                <div>
                  <p
                    className="text-[#1A1A3E]"
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 700,
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Hustlify.AI
                  </p>
                  <p
                    className="text-green-500"
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 500,
                    }}
                  >
                    Online — Ready to help
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-[#6D28D9]"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Chat messages */}
              <div
                className="px-5 py-5 space-y-3.5"
                style={{ minHeight: "340px" }}
              >
                {AI_CHAT_MESSAGES.slice(0, visibleMessages).map(
                  (msg, i) => (
                    <motion.div
                      key={i}
                      initial={{
                        opacity: 0,
                        y: 12,
                        scale: 0.95,
                      }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.35,
                        ease: "easeOut",
                      }}
                    >
                      {msg.role === "user" ? (
                        <div className="flex justify-end">
                          <div
                            className="max-w-[80%] px-4 py-2.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-2xl rounded-br-md shadow-md shadow-blue-200/30"
                            style={{
                              fontSize: "0.84rem",
                              lineHeight: 1.6,
                            }}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ) : msg.role === "ai" ? (
                        <div className="flex gap-2.5">
                          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6D28D9] to-[#2563EB] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                            <Sparkles
                              size={12}
                              className="text-white"
                            />
                          </div>
                          <div
                            className="max-w-[85%] px-4 py-2.5 bg-blue-50 border border-blue-100/50 text-[#4A4A68] rounded-2xl rounded-bl-md"
                            style={{
                              fontSize: "0.84rem",
                              lineHeight: 1.65,
                            }}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ) : (
                        <div className="ml-9">
                          <div className="bg-white rounded-xl px-4 py-3 border border-blue-100/60 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer group">
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <p
                                  className="text-[#1A1A3E] truncate"
                                  style={{
                                    fontSize: "0.82rem",
                                    fontWeight: 600,
                                  }}
                                >
                                  {msg.text}
                                </p>
                                {msg.tags && (
                                  <div className="flex gap-1.5 mt-1.5">
                                    {msg.tags.map((tag) => (
                                      <span
                                        key={tag}
                                        className="px-2 py-0.5 bg-blue-50 text-[#6D28D9] rounded-md"
                                        style={{
                                          fontSize: "0.65rem",
                                          fontWeight: 600,
                                        }}
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <ArrowRight
                                size={14}
                                className="text-[#D1D5DB] group-hover:text-[#6D28D9] transition-colors flex-shrink-0"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ),
                )}

                {/* Typing indicator */}
                {visibleMessages > 0 &&
                  visibleMessages < AI_CHAT_MESSAGES.length && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-2.5"
                    >
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6D28D9] to-[#2563EB] flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Sparkles
                          size={12}
                          className="text-white"
                        />
                      </div>
                      <div className="px-4 py-3 bg-blue-50 border border-blue-100/50 rounded-2xl rounded-bl-md">
                        <div className="flex items-center gap-1.5">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-1.5 h-1.5 rounded-full bg-[#6D28D9]"
                              animate={{
                                opacity: [0.3, 1, 0.3],
                                scale: [0.8, 1.1, 0.8],
                              }}
                              transition={{
                                duration: 0.9,
                                repeat: Infinity,
                                delay: i * 0.2,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
              </div>

              {/* Chat input bar */}
              <div className="px-5 py-3.5 border-t border-blue-50 bg-white/80">
                <div className="flex items-center gap-2.5">
                  <div className="flex-1 relative">
                    <input
                      readOnly
                      placeholder="Ask Hustlify AI anything..."
                      className="w-full px-4 py-2.5 bg-blue-50 rounded-xl border border-blue-100/50 text-[#B0AEC5] placeholder-[#B0AEC5] outline-none cursor-default"
                      style={{ fontSize: "0.82rem" }}
                    />
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#2563EB] flex items-center justify-center shadow-md shadow-blue-200/30 cursor-pointer">
                    <Send size={15} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Features + CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-5"
          >
            {/* Feature cards */}
            {AI_FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: 0.2 + i * 0.1,
                }}
                className="bg-white rounded-2xl p-5 border border-blue-100/50 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all group cursor-default"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: `${feature.color}12`,
                    }}
                  >
                    <feature.icon
                      size={20}
                      style={{ color: feature.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <h4
                      className="text-[#1A1A3E] mb-1"
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 700,
                      }}
                    >
                      {feature.title}
                    </h4>
                    <p
                      className="text-[#6B7280]"
                      style={{
                        fontSize: "0.84rem",
                        lineHeight: 1.65,
                      }}
                    >
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="grid grid-cols-3 gap-3"
            >
              {[
                { value: "95%", label: "Match Accuracy" },
                { value: "< 2s", label: "Response Time" },
                { value: "24/7", label: "Available" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-gradient-to-br from-[#6D28D9]/5 to-[#2563EB]/5 rounded-xl p-3.5 text-center border border-blue-100/30"
                >
                  <p
                    className="bg-gradient-to-r from-[#6D28D9] to-[#2563EB] bg-clip-text text-transparent"
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 800,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-[#9CA3AF]"
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* CTA button */}
            <motion.button
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.7 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/dashboard/hustlify-ai")}
              className="w-full py-4 bg-gradient-to-r from-[#6D28D9] via-[#4F46E5] to-[#2563EB] text-white rounded-2xl shadow-xl shadow-blue-200/40 hover:shadow-2xl hover:shadow-blue-300/40 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1,
                }}
              />
              <span className="relative flex items-center gap-2.5">
                <Sparkles
                  size={18}
                  className="group-hover:rotate-12 transition-transform"
                />
                Try Hustlify.AI Now
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState<
    "employee" | "job"
  >("employee");
  const [keyword, setKeyword] = useState("");
  const [wilaya, setWilaya] = useState("");
  const { t } = useLanguage();

  return (
    <div
      className="min-h-screen bg-[#FAFAFF]"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <PublicNavbar />

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-[#FAFAFF] to-[#EBF4FF]" />
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-[#6D28D9]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#2563EB]/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#93C5FD]/3 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#6D28D9]/8 border border-[#6D28D9]/15 rounded-full mb-6"
              >
                <Sparkles
                  size={14}
                  className="text-[#6D28D9]"
                />
                <span
                  className="text-[#6D28D9]"
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                  }}
                >
                  {t("landing.badge")}
                </span>
              </motion.div>

              <h1
                className="text-[#1A1A3E] mb-6"
                style={{
                  fontSize: "3.2rem",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                {t("landing.heroTitle1")}{" "}
                <span className="bg-gradient-to-r from-[#6D28D9] to-[#2563EB] bg-clip-text text-transparent relative inline-block">
                  {t("landing.heroTitle2")}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    height="10"
                    viewBox="0 0 200 10"
                  >
                    <path
                      d="M0 7 Q50 0 100 5 T200 4"
                      stroke="url(#underlineGrad)"
                      strokeWidth="3"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient
                        id="underlineGrad"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#6D28D9" />
                        <stop
                          offset="100%"
                          stopColor="#2563EB"
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </h1>
              <p
                className="text-[#6B7280] mb-10 max-w-md"
                style={{ fontSize: "1.1rem", lineHeight: 1.75 }}
              >
                {t("landing.heroDesc")}
              </p>

              {/* Search Bar */}
              <div className="bg-white/80 backdrop-blur-sm rounded-[1.25rem] p-4 shadow-xl shadow-blue-100/40 border border-blue-100/50 max-w-xl">
                {/* Inputs row */}
                <div className="flex items-center gap-2.5">
                  {/* Keywords input */}
                  <div className="relative flex-1">
                    <Search
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#B0AEC5]"
                    />
                    <input
                      value={keyword}
                      onChange={(e) =>
                        setKeyword(e.target.value)
                      }
                      placeholder={t(
                        "landing.keywordsPlaceholder",
                      )}
                      className="w-full pl-10 pr-3 py-3 bg-white rounded-full border border-blue-200/70 focus:border-[#6D28D9]/60 outline-none text-[#1A1A3E] placeholder-[#B0AEC5] transition-colors"
                      style={{ fontSize: "0.85rem" }}
                    />
                  </div>
                  {/* Wilaya input */}
                  <div className="relative flex-1">
                    <MapPin
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6D28D9]"
                    />
                    <input
                      value={wilaya}
                      onChange={(e) =>
                        setWilaya(e.target.value)
                      }
                      placeholder={t(
                        "landing.wilayaPlaceholder",
                      )}
                      className="w-full pl-10 pr-3 py-3 bg-white rounded-full border border-blue-200/70 focus:border-[#6D28D9]/60 outline-none text-[#1A1A3E] placeholder-[#B0AEC5] transition-colors"
                      style={{ fontSize: "0.85rem" }}
                    />
                  </div>
                  {/* Search button */}
                  <button
                    className="px-7 py-3 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-full hover:shadow-lg hover:shadow-blue-200 hover:opacity-95 transition-all flex-shrink-0"
                    style={{
                      fontSize: "0.88rem",
                      fontWeight: 700,
                    }}
                  >
                    {t("landing.search")}
                  </button>
                </div>

                {/* Employee / Job toggle */}
                <div className="flex justify-center mt-4">
                  <div className="inline-flex items-center bg-white rounded-full border border-blue-200/70 p-1 shadow-sm">
                    {["employee", "job"].map((type) => (
                      <button
                        key={type}
                        onClick={() =>
                          setSearchType(
                            type as "employee" | "job",
                          )
                        }
                        className={`px-6 py-2 rounded-full transition-all duration-300 ${
                          searchType === type
                            ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white shadow-md shadow-blue-200/50"
                            : "text-[#6B7280] hover:text-[#4A4A68]"
                        }`}
                        style={{
                          fontSize: "0.84rem",
                          fontWeight:
                            searchType === type ? 700 : 500,
                        }}
                      >
                        {type === "employee"
                          ? t("landing.employee")
                          : t("landing.job")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick trust indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex items-center gap-6 mt-8"
              >
                {[
                  {
                    label: t("landing.freeToJoin"),
                    icon: CheckCircle,
                  },
                  { label: t("landing.wilayas"), icon: MapPin },
                  {
                    label: t("landing.verifiedProfiles"),
                    icon: Shield,
                  },
                ].map((item) => (
                  <span
                    key={item.label}
                    className="flex items-center gap-1.5 text-[#6B7280]"
                    style={{ fontSize: "0.78rem" }}
                  >
                    <item.icon
                      size={13}
                      className="text-[#6D28D9]"
                    />
                    {item.label}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Animated hero visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hidden lg:block"
            >
              <HeroVisual />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 pb-20 relative">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 text-center border border-blue-100/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group"
            >
              <div className="w-11 h-11 rounded-xl bg-[#6D28D9]/8 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#6D28D9]/15 transition-colors">
                <stat.icon
                  size={20}
                  className="text-[#6D28D9]"
                />
              </div>
              <p
                className="bg-gradient-to-r from-[#6D28D9] to-[#2563EB] bg-clip-text text-transparent"
                style={{ fontSize: "1.8rem", fontWeight: 800 }}
              >
                {stat.value}
              </p>
              <p
                className="text-[#6B7280] mt-1"
                style={{ fontSize: "0.85rem", fontWeight: 500 }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <h2
              className="text-[#1A1A3E] mb-4"
              style={{
                fontSize: "2.2rem",
                fontWeight: 700,
                lineHeight: 1.2,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Our{" "}
              <span className="bg-gradient-to-r from-[#6D28D9] to-[#2563EB] bg-clip-text text-transparent">
                Mission
              </span>
            </h2>
            <p
              className="text-[#6B7280] max-w-2xl mx-auto"
              style={{ fontSize: "1.05rem", lineHeight: 1.85 }}
            >
              Our mission is to simplify hiring and job
              searching in Algeria by connecting employers with
              job seekers, while also empowering independent
              workers to easily find new opportunities and grow
              their businesses.
            </p>
          </motion.div>

          {/* Problem / Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl p-8 border border-red-100/80 shadow-sm relative overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-red-400 to-red-200 rounded-r-full" />
              <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                <Zap size={18} className="text-red-400" />
              </div>
              <h3
                className="text-red-500 mb-4"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                The Problem
              </h3>
              <p
                className="text-[#6B7280]"
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.85,
                }}
              >
                Hiring in Algeria can be{" "}
                <span
                  style={{ fontWeight: 700, color: "#1A1A3E" }}
                >
                  slow, fragmented
                </span>{" "}
                and{" "}
                <span
                  style={{ fontWeight: 700, color: "#1A1A3E" }}
                >
                  inefficient
                </span>
                . Businesses struggle to find qualified
                candidates, while talented professionals miss
                out on real opportunities
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-3xl p-8 border border-[#6D28D9]/15 shadow-sm relative overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-[#6D28D9] to-[#2563EB] rounded-r-full" />
              <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                <Sparkles
                  size={18}
                  className="text-[#6D28D9]"
                />
              </div>
              <h3
                className="text-[#6D28D9] mb-4"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                How Hustlify Changes That
              </h3>
              <p
                className="text-[#6B7280]"
                style={{
                  fontSize: "0.95rem",
                  lineHeight: 1.85,
                }}
              >
                Hustlify brings companies and candidates
                together in one streamlined platform searchable
                by{" "}
                <span
                  style={{ fontWeight: 700, color: "#1A1A3E" }}
                >
                  Domain
                </span>{" "}
                and{" "}
                <span
                  style={{ fontWeight: 700, color: "#1A1A3E" }}
                >
                  Wilaya
                </span>
                . Making hiring faster, simpler and more
                transparent
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="px-6 pb-24 bg-gradient-to-b from-transparent via-[#F5F3FF]/40 to-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2
              className="text-[#1A1A3E] mb-3"
              style={{
                fontSize: "2.2rem",
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              How it{" "}
              <span className="bg-gradient-to-r from-[#6D28D9] to-[#2563EB] bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p
              className="text-[#6B7280]"
              style={{ fontSize: "0.95rem" }}
            >
              Get started in 3 simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {HOW_IT_WORKS.map((item, i) => {
              const icons = [UserPlus, Search, TrendingUp];
              const Icon = icons[i];
              
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="bg-white rounded-3xl p-6 border border-blue-100/60 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#6D28D9] to-[#2563EB] flex items-center justify-center shadow-md shadow-blue-200/50">
                      <span
                        className="text-white"
                        style={{
                          fontWeight: 800,
                          fontSize: "0.9rem",
                        }}
                      >
                        {item.step}.
                      </span>
                    </div>
                    <h3
                      className="text-[#1A1A3E]"
                      style={{
                        fontWeight: 700,
                        fontSize: "1.05rem",
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div className="w-full h-44 rounded-2xl mb-4 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center group-hover:from-blue-100 group-hover:to-indigo-100 transition-all">
                    <Icon size={72} className="text-[#6D28D9] opacity-30 group-hover:opacity-40 transition-opacity" strokeWidth={1.5} />
                  </div>
                  <p
                    className="text-[#6B7280]"
                    style={{
                      fontSize: "0.88rem",
                      lineHeight: 1.65,
                    }}
                  >
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Employees */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <h2
                className="text-[#1A1A3E] mb-1"
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 700,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Top Talent in Algeria
              </h2>
              <p
                className="text-[#6B7280]"
                style={{ fontSize: "0.9rem" }}
              >
                Highly rated professionals ready to work
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="text-[#6D28D9] hover:underline flex items-center gap-1 group"
              style={{ fontSize: "0.9rem", fontWeight: 600 }}
            >
              View all{" "}
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FEATURED_EMPLOYEES.map((emp, i) => (
              <motion.div
                key={emp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => navigate(`/employee/${emp.id}`)}
                className="bg-white rounded-2xl p-5 border border-blue-100/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={emp.img}
                    alt={emp.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-100 group-hover:border-[#6D28D9] transition-colors"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p
                          className="text-[#1A1A3E]"
                          style={{
                            fontWeight: 700,
                            fontSize: "0.95rem",
                          }}
                        >
                          {emp.name}
                        </p>
                        <p
                          className="text-[#6B7280]"
                          style={{ fontSize: "0.82rem" }}
                        >
                          {emp.role}
                        </p>
                      </div>
                      <span
                        className="text-[#9CA3AF] flex items-center gap-1"
                        style={{ fontSize: "0.78rem" }}
                      >
                        <MapPin size={12} />
                        {emp.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <StarRating rating={emp.rating} />
                      <span
                        className="text-[#1A1A3E]"
                        style={{
                          fontSize: "0.78rem",
                          fontWeight: 700,
                        }}
                      >
                        {emp.rating}
                      </span>
                      <span
                        className="text-[#9CA3AF]"
                        style={{ fontSize: "0.72rem" }}
                      >
                        ({emp.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {emp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 bg-blue-50 text-[#6D28D9] rounded-lg"
                          style={{
                            fontSize: "0.72rem",
                            fontWeight: 600,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-blue-50">
                  <span
                    className="flex items-center gap-1.5 text-[#6B7280]"
                    style={{ fontSize: "0.78rem" }}
                  >
                    <CheckCircle
                      size={13}
                      className="text-green-500"
                    />
                    Verified Profile
                  </span>
                  <button
                    className="px-5 py-2 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:shadow-md hover:shadow-blue-200 transition-all"
                    style={{
                      fontWeight: 600,
                      fontSize: "0.78rem",
                    }}
                  >
                    Contact
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-[#1A1A3E] mb-2"
              style={{
                fontSize: "2rem",
                fontWeight: 700,
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Why Choose Hustlify?
            </h2>
            <p
              className="text-[#6B7280]"
              style={{ fontSize: "0.95rem" }}
            >
              The smarter way to hire and get hired in Algeria
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "Verified Talent",
                desc: "Every profile is verified with ID and skill assessments for your peace of mind.",
                color: "#6D28D9",
                gradient: "from-[#6D28D9]/8 to-[#2563EB]/8",
              },
              {
                icon: Zap,
                title: "Fast Matching",
                desc: "Our smart algorithm connects you with the right talent in minutes, not days.",
                color: "#F59E0B",
                gradient: "from-[#F59E0B]/8 to-[#FBBF24]/8",
              },
              {
                icon: TrendingUp,
                title: "Trusted by Leaders",
                desc: "500+ enterprises across Algeria trust Hustlify for their hiring needs.",
                color: "#10B981",
                gradient: "from-[#10B981]/8 to-[#34D399]/8",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`bg-gradient-to-br ${item.gradient} rounded-3xl p-8 border border-white shadow-sm text-center hover:shadow-xl hover:-translate-y-2 transition-all group`}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon
                    size={26}
                    style={{ color: item.color }}
                  />
                </div>
                <h3
                  className="text-[#1A1A3E] mb-3"
                  style={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[#6B7280]"
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: 1.75,
                  }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hustlify.AI Showcase Section */}
      <HustlifyAISection navigate={navigate} />

      {/* Trusted By */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <p
              className="text-[#9CA3AF] mb-1"
              style={{
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
              }}
            >
              TRUSTED BY
            </p>
            <p
              className="text-[#6B7280]"
              style={{ fontSize: "0.9rem" }}
            >
              Leading Algerian companies use Hustlify
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-4">
            {TRUSTED_COMPANIES.map((company, i) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3.5 border border-blue-100/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0"
                  style={{ backgroundColor: company.bg }}
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="w-10 h-10 object-contain"
                  />
                </div>
                <span
                  className="text-[#1A1A3E]"
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                >
                  {company.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#6D28D9] via-[#4F46E5] to-[#2563EB] rounded-[2rem] p-14 text-center text-white relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />
            <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white/5 rounded-full" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full mb-6 border border-white/20">
                <Sparkles size={14} />
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 500,
                  }}
                >
                  Free to Join
                </span>
              </div>
              <h2
                className="text-white mb-4"
                style={{
                  fontWeight: 800,
                  fontSize: "2.2rem",
                  lineHeight: 1.15,
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                Ready to Hustle?
              </h2>
              <p
                className="text-white/80 mb-10 max-w-md mx-auto"
                style={{
                  fontSize: "1.05rem",
                  lineHeight: 1.65,
                }}
              >
                Join 2,000+ clients and 1,500+ professionals on
                Hustlify today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/auth")}
                  className="px-10 py-4 bg-white text-[#6D28D9] rounded-2xl hover:shadow-2xl hover:shadow-blue-900/30 hover:-translate-y-0.5 transition-all"
                  style={{ fontWeight: 700, fontSize: "1rem" }}
                >
                  Hire Talent
                </button>
                <button
                  onClick={() => navigate("/auth")}
                  className="px-10 py-4 bg-white/15 backdrop-blur border border-white/25 text-white rounded-2xl hover:bg-white/25 hover:-translate-y-0.5 transition-all"
                  style={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  Find Work
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}