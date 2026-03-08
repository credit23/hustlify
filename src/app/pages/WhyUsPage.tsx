import { motion, useInView, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import { useRef, useState, useEffect } from "react";
import PublicNavbar from "../components/layout/PublicNavbar";
import PublicFooter from "../components/layout/PublicFooter";
import { useLanguage } from "../context/LanguageContext";
import {
  Shield,
  Zap,
  Users,
  TrendingUp,
  CheckCircle,
  Star,
  Globe,
  Lock,
  BadgeCheck,
  Briefcase,
  Building2,
  User,
  ArrowRight,
  Sparkles,
  Heart,
  Clock,
  BarChart3,
  Target,
  Award,
  ChevronRight,
  Quote,
} from "lucide-react";

// ---------- DATA ----------

const ROLE_TABS = [
  {
    id: "employee" as const,
    labelKey: "whyUs.tabEmployee",
    shortLabelKey: "whyUs.tabEmployeeShort",
    icon: User,
    color: "#6C63FF",
    bg: "#F0EEFF",
    gradient: "from-[#6C63FF] to-[#9B8FFF]",
    ctaKey: "whyUs.joinEmployee",
    ctaLink: "/auth",
    benefits: [
      { icon: Briefcase, titleKey: "whyUs.emp.findJobs", descKey: "whyUs.emp.findJobsDesc" },
      { icon: BadgeCheck, titleKey: "whyUs.emp.reputation", descKey: "whyUs.emp.reputationDesc" },
      { icon: TrendingUp, titleKey: "whyUs.emp.grow", descKey: "whyUs.emp.growDesc" },
      { icon: Globe, titleKey: "whyUs.emp.anywhere", descKey: "whyUs.emp.anywhereDesc" },
    ],
  },
  {
    id: "client" as const,
    labelKey: "whyUs.tabClient",
    shortLabelKey: "whyUs.tabClient",
    icon: Briefcase,
    color: "#4F8EF7",
    bg: "#EBF4FF",
    gradient: "from-[#4F8EF7] to-[#7EB3FF]",
    ctaKey: "whyUs.startHiring",
    ctaLink: "/client/onboarding",
    benefits: [
      { icon: Users, titleKey: "whyUs.cli.topTalent", descKey: "whyUs.cli.topTalentDesc" },
      { icon: Zap, titleKey: "whyUs.cli.hireFast", descKey: "whyUs.cli.hireFastDesc" },
      { icon: Shield, titleKey: "whyUs.cli.securePayments", descKey: "whyUs.cli.securePaymentsDesc" },
      { icon: Star, titleKey: "whyUs.cli.quality", descKey: "whyUs.cli.qualityDesc" },
    ],
  },
  {
    id: "enterprise" as const,
    labelKey: "whyUs.tabEnterprise",
    shortLabelKey: "whyUs.tabEnterprise",
    icon: Building2,
    color: "#10B981",
    bg: "#D1FAE5",
    gradient: "from-[#10B981] to-[#34D399]",
    ctaKey: "whyUs.createEnterprise",
    ctaLink: "/enterprise/onboarding",
    benefits: [
      { icon: Building2, titleKey: "whyUs.ent.scale", descKey: "whyUs.ent.scaleDesc" },
      { icon: BadgeCheck, titleKey: "whyUs.ent.verification", descKey: "whyUs.ent.verificationDesc" },
      { icon: BarChart3, titleKey: "whyUs.ent.analytics", descKey: "whyUs.ent.analyticsDesc" },
      { icon: Lock, titleKey: "whyUs.ent.contracts", descKey: "whyUs.ent.contractsDesc" },
    ],
  },
];

const TRUST_FEATURES = [
  { icon: Shield, titleKey: "whyUs.idVerification", descKey: "whyUs.idVerificationDesc", color: "#6C63FF" },
  { icon: BadgeCheck, titleKey: "whyUs.skillAssessment", descKey: "whyUs.skillAssessmentDesc", color: "#10B981" },
  { icon: Lock, titleKey: "whyUs.escrowPayments", descKey: "whyUs.escrowPaymentsDesc", color: "#F59E0B" },
  { icon: Star, titleKey: "whyUs.transparentReviews", descKey: "whyUs.transparentReviewsDesc", color: "#4F8EF7" },
  { icon: Globe, titleKey: "whyUs.algerianFocused", descKey: "whyUs.algerianFocusedDesc", color: "#EF4444" },
  { icon: Users, titleKey: "whyUs.communityTrustScore", descKey: "whyUs.communityTrustScoreDesc", color: "#8B5CF6" },
];

const STATS = [
  { value: 1500, suffix: "+", labelKey: "whyUs.verifiedProfessionals", icon: Users },
  { value: 2000, suffix: "+", labelKey: "whyUs.happyClients", icon: Heart },
  { value: 70, suffix: "+", labelKey: "whyUs.industryDomains", icon: Briefcase },
  { value: 69, suffix: "", labelKey: "whyUs.wilayasCovered", icon: Globe },
  { value: 4.8, suffix: "/5", labelKey: "whyUs.averageRating", icon: Star, decimals: 1 },
  { value: 500, suffix: "+", labelKey: "whyUs.enterprisesTrustUs", icon: Building2 },
];

const TESTIMONIALS = [
  {
    name: "Karim Benali",
    role: "Full-Stack Developer",
    location: "Alger",
    textKey: "whyUs.testimonial1",
    rating: 5,
    img: "https://images.unsplash.com/photo-1589220286904-3dcef62c68ee?w=100&q=80",
    tagKey: "whyUs.tagEmployee",
  },
  {
    name: "Rima Hassani",
    role: "CEO, StartupDZ",
    location: "Oran",
    textKey: "whyUs.testimonial2",
    rating: 5,
    img: "https://images.unsplash.com/photo-1573497620166-aef748c8c792?w=100&q=80",
    tagKey: "whyUs.tagClient",
  },
  {
    name: "Omar Chikhi",
    role: "HR Director, MobilisGroup",
    location: "Constantine",
    textKey: "whyUs.testimonial3",
    rating: 5,
    img: "https://images.unsplash.com/photo-1584940121819-1883a5d3b0bd?w=100&q=80",
    tagKey: "whyUs.tagEnterprise",
  },
];

const COMPARISON_KEYS = [
  "whyUs.comp1", "whyUs.comp2", "whyUs.comp3", "whyUs.comp4",
  "whyUs.comp5", "whyUs.comp6", "whyUs.comp7", "whyUs.comp8",
];
const COMPARISON_HUSTLIFY = [true, true, true, true, true, true, true, true];
const COMPARISON_OTHERS = [false, false, false, false, false, true, false, false];

// ---------- COMPONENTS ----------

function AnimatedCounter({ value, suffix = "", decimals = 0 }: { value: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      current = Math.min(current + increment, value);
      setDisplay(decimals > 0 ? current.toFixed(decimals) : Math.floor(current).toLocaleString());
      if (step >= steps) {
        setDisplay(decimals > 0 ? value.toFixed(decimals) : value.toLocaleString());
        clearInterval(timer);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value, decimals]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

function RoleBenefitsSection() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"employee" | "client" | "enterprise">("employee");
  const activeRole = ROLE_TABS.find((tab) => tab.id === activeTab)!;

  return (
    <section className="px-6 pb-28">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2
            className="text-[#1A1A3E] mb-3"
            style={{ fontSize: "2.2rem", fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}
          >
            {t("whyUs.builtForEveryRole")}{" "}
            <span className="bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] bg-clip-text text-transparent">
              {t("whyUs.everyRole")}
            </span>
          </h2>
          <p className="text-[#6B7280] max-w-lg mx-auto" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
            {t("whyUs.everyRoleDesc")}
          </p>
        </motion.div>

        {/* Tab buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-3 mb-10"
        >
          {ROLE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2.5 px-6 py-3.5 rounded-2xl border-2 transition-all duration-300 ${
                activeTab === tab.id
                  ? "border-transparent text-white shadow-lg"
                  : "border-purple-100 bg-white text-[#6B7280] hover:border-purple-200 hover:shadow-sm"
              }`}
              style={{
                fontSize: "0.88rem",
                fontWeight: activeTab === tab.id ? 700 : 500,
                background: activeTab === tab.id
                  ? `linear-gradient(135deg, ${tab.color}, ${tab.color}CC)`
                  : undefined,
                boxShadow: activeTab === tab.id ? `0 8px 25px ${tab.color}30` : undefined,
              }}
            >
              <tab.icon size={18} />
              <span className="hidden sm:inline">{t(tab.labelKey)}</span>
              <span className="sm:hidden">{t(tab.shortLabelKey)}</span>
            </button>
          ))}
        </motion.div>

        {/* Benefits grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {activeRole.benefits.map((item, i) => (
                <motion.div
                  key={item.titleKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 border border-purple-100/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-default"
                >
                  <div className="flex gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: activeRole.bg }}
                    >
                      <item.icon size={22} style={{ color: activeRole.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#1A1A3E] mb-1.5" style={{ fontWeight: 700, fontSize: "1rem" }}>
                        {t(item.titleKey)}
                      </h3>
                      <p className="text-[#6B7280]" style={{ fontSize: "0.88rem", lineHeight: 1.7 }}>
                        {t(item.descKey)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA for role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex justify-center"
            >
              <button
                onClick={() => navigate(activeRole.ctaLink)}
                className="flex items-center gap-2 px-8 py-3.5 text-white rounded-2xl hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg group"
                style={{
                  background: `linear-gradient(135deg, ${activeRole.color}, ${activeRole.color}CC)`,
                  fontWeight: 600,
                  fontSize: "0.92rem",
                  boxShadow: `0 8px 25px ${activeRole.color}30`,
                }}
              >
                {t(activeRole.ctaKey)}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ---------- MAIN PAGE ----------

export default function WhyUsPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FAFAFF]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <PublicNavbar />

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5F3FF] via-[#FAFAFF] to-[#EBF4FF]" />
        <div className="absolute top-10 right-0 w-[600px] h-[600px] bg-[#6C63FF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#9B8FFF]/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#6C63FF]/8 border border-[#6C63FF]/15 rounded-full mb-6"
          >
            <Sparkles size={14} className="text-[#6C63FF]" />
            <span className="text-[#6C63FF]" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
              {t("whyUs.badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#1A1A3E] mb-5"
            style={{ fontSize: "3rem", fontWeight: 800, lineHeight: 1.1, fontFamily: "'Poppins', sans-serif" }}
          >
            {t("whyUs.heroTitle1")}{" "}
            <span className="bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] bg-clip-text text-transparent relative inline-block">
              {t("whyUs.heroTitle2")}
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute -bottom-3 left-0 w-full"
                height="10"
                viewBox="0 0 200 10"
              >
                <motion.path
                  d="M0 7 Q50 0 100 5 T200 4"
                  stroke="url(#heroGrad)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
                <defs>
                  <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6C63FF" />
                    <stop offset="100%" stopColor="#9B8FFF" />
                  </linearGradient>
                </defs>
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#6B7280] mb-10 max-w-xl mx-auto"
            style={{ fontSize: "1.1rem", lineHeight: 1.75 }}
          >
            {t("whyUs.heroDesc")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate("/auth")}
              className="px-9 py-4 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-2xl hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-xl shadow-purple-200/50"
              style={{ fontWeight: 700, fontSize: "1rem" }}
            >
              {t("whyUs.getStarted")}
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="px-9 py-4 bg-white border-2 border-purple-200 text-[#6C63FF] rounded-2xl hover:bg-purple-50 hover:border-purple-300 hover:-translate-y-0.5 transition-all"
              style={{ fontWeight: 600, fontSize: "1rem" }}
            >
              {t("whyUs.talkToUs")}
            </button>
          </motion.div>

          {/* Floating decorative badges */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0, y: [0, -8, 0] }}
            transition={{ opacity: { delay: 1, duration: 0.6 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
            className="absolute left-0 top-1/3 hidden lg:flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-lg border border-purple-50"
          >
            <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
              <CheckCircle size={14} className="text-green-500" />
            </div>
            <div>
              <p className="text-[#1A1A3E]" style={{ fontSize: "0.7rem", fontWeight: 700 }}>{t("whyUs.verified")}</p>
              <p className="text-[#9CA3AF]" style={{ fontSize: "0.6rem" }}>{t("whyUs.secure")}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
            transition={{ opacity: { delay: 1.2, duration: 0.6 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
            className="absolute right-0 top-1/2 hidden lg:flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-lg border border-purple-50"
          >
            <div className="w-8 h-8 rounded-lg bg-yellow-50 flex items-center justify-center">
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
            </div>
            <div>
              <p className="text-[#1A1A3E]" style={{ fontSize: "0.7rem", fontWeight: 700 }}>4.8/5</p>
              <p className="text-[#9CA3AF]" style={{ fontSize: "0.6rem" }}>Avg Rating</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Animated Stats */}
      <section className="px-6 pb-28">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-white rounded-2xl p-5 text-center border border-purple-100/60 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#6C63FF]/8 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#6C63FF]/15 group-hover:scale-110 transition-all">
                  <stat.icon size={18} className="text-[#6C63FF]" />
                </div>
                <p
                  className="bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] bg-clip-text text-transparent"
                  style={{ fontSize: "1.5rem", fontWeight: 800 }}
                >
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </p>
                <p className="text-[#6B7280] mt-1" style={{ fontSize: "0.72rem", fontWeight: 500 }}>
                  {t(stat.labelKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Role Benefits - Tabbed */}
      <RoleBenefitsSection />

      {/* Trust & Security */}
      <section className="px-6 pb-28 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F5F3FF]/30 to-transparent" />
        <div className="max-w-5xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-100 rounded-full mb-5"
            >
              <Shield size={14} className="text-green-600" />
              <span className="text-green-600" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
                {t("whyUs.trustBadge")}
              </span>
            </motion.div>
            <h2
              className="text-[#1A1A3E] mb-3"
              style={{ fontSize: "2.2rem", fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}
            >
              {t("whyUs.builtOnTrust")}{" "}
              <span className="bg-gradient-to-r from-[#10B981] to-[#34D399] bg-clip-text text-transparent">
                {t("whyUs.trust")}
              </span>
            </h2>
            <p className="text-[#6B7280] max-w-lg mx-auto" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
              {t("whyUs.trustDesc")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TRUST_FEATURES.map((item, i) => (
              <motion.div
                key={item.titleKey}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 border border-purple-100/60 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group cursor-default"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${item.color}12` }}
                >
                  <item.icon size={22} style={{ color: item.color }} />
                </div>
                <h3 className="text-[#1A1A3E] mb-2" style={{ fontWeight: 700, fontSize: "1rem" }}>
                  {t(item.titleKey)}
                </h3>
                <p className="text-[#6B7280]" style={{ fontSize: "0.88rem", lineHeight: 1.7 }}>
                  {t(item.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="px-6 pb-28">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="text-[#1A1A3E] mb-3"
              style={{ fontSize: "2rem", fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}
            >
              Hustlify vs{" "}
              <span className="text-[#9CA3AF]">{t("whyUs.vsOthers")}</span>
            </h2>
            <p className="text-[#6B7280]" style={{ fontSize: "0.95rem" }}>
              {t("whyUs.comparison")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-purple-100/60 shadow-sm overflow-hidden"
          >
            {/* Header */}
            <div className="grid grid-cols-3 gap-0 px-6 py-4 border-b border-purple-50 bg-[#F8F7FF]">
              <div className="text-[#6B7280]" style={{ fontSize: "0.82rem", fontWeight: 600 }}>{t("whyUs.feature")}</div>
              <div className="text-center">
                <span
                  className="bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] bg-clip-text text-transparent"
                  style={{ fontSize: "0.85rem", fontWeight: 800 }}
                >
                  Hustlify
                </span>
              </div>
              <div className="text-center text-[#9CA3AF]" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
                {t("whyUs.vsOthers")}
              </div>
            </div>

            {/* Rows */}
            {COMPARISON_KEYS.map((rowKey, i) => (
              <motion.div
                key={rowKey}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`grid grid-cols-3 gap-0 px-6 py-3.5 ${
                  i < COMPARISON_KEYS.length - 1 ? "border-b border-purple-50/80" : ""
                } hover:bg-[#F8F7FF]/50 transition-colors`}
              >
                <div className="text-[#4A4A68] flex items-center gap-2" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                  {t(rowKey)}
                </div>
                <div className="flex justify-center">
                  {COMPARISON_HUSTLIFY[i] ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.05, type: "spring", stiffness: 300 }}
                      className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center"
                    >
                      <CheckCircle size={16} className="text-green-500" />
                    </motion.div>
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
                      <span className="text-red-300" style={{ fontSize: "1.1rem" }}>×</span>
                    </div>
                  )}
                </div>
                <div className="flex justify-center">
                  {COMPARISON_OTHERS[i] ? (
                    <div className="w-7 h-7 rounded-lg bg-green-50/50 flex items-center justify-center">
                      <CheckCircle size={16} className="text-green-300" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center">
                      <span className="text-gray-300" style={{ fontSize: "1.1rem" }}>×</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 pb-28">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2
              className="text-[#1A1A3E] mb-3"
              style={{ fontSize: "2rem", fontWeight: 700, fontFamily: "'Poppins', sans-serif" }}
            >
              {t("whyUs.communityTitle")}{" "}
              <span className="bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] bg-clip-text text-transparent">
                {t("whyUs.community")}
              </span>{" "}
              {t("whyUs.communitySays")}
            </h2>
            <p className="text-[#6B7280]" style={{ fontSize: "0.95rem" }}>
              {t("whyUs.communityDesc")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="bg-white rounded-3xl p-7 border border-purple-100/60 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all relative group"
              >
                {/* Quote icon */}
                <div className="absolute top-5 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote size={40} className="text-[#6C63FF]" />
                </div>

                {/* Tag */}
                <span
                  className="inline-block px-3 py-1 rounded-lg bg-[#F5F3FF] text-[#6C63FF] mb-4"
                  style={{ fontSize: "0.72rem", fontWeight: 600 }}
                >
                  {t(testimonial.tagKey)}
                </span>

                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div
                      key={star}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + star * 0.08, type: "spring", stiffness: 300 }}
                    >
                      <Star
                        size={15}
                        className={star <= testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}
                      />
                    </motion.div>
                  ))}
                </div>

                <p className="text-[#4A4A68] mb-6" style={{ fontSize: "0.92rem", lineHeight: 1.75 }}>
                  "{t(testimonial.textKey)}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-purple-50">
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="w-11 h-11 rounded-xl object-cover border-2 border-purple-100"
                  />
                  <div>
                    <p className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                      {testimonial.name}
                    </p>
                    <p className="text-[#9CA3AF]" style={{ fontSize: "0.75rem" }}>
                      {testimonial.role} · {testimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#6C63FF] via-[#7B72FF] to-[#9B8FFF] rounded-[2rem] p-14 text-center text-white relative overflow-hidden"
          >
            {/* Decorative */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-36 h-36 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/4" />
            <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white/5 rounded-full" />
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-8 left-12 w-14 h-14 bg-white/8 rounded-2xl"
            />
            <motion.div
              animate={{ y: [0, 8, 0], rotate: [0, -3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-8 right-12 w-10 h-10 bg-white/8 rounded-xl"
            />

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full mb-6 border border-white/20"
              >
                <Award size={14} />
                <span style={{ fontSize: "0.85rem", fontWeight: 500 }}>{t("whyUs.ctaBadge")}</span>
              </motion.div>

              <h2
                className="text-white mb-4"
                style={{ fontWeight: 800, fontSize: "2.2rem", lineHeight: 1.15, fontFamily: "'Poppins', sans-serif" }}
              >
                {t("whyUs.ctaTitle")}
              </h2>
              <p className="text-white/80 mb-10 max-w-md mx-auto" style={{ fontSize: "1.05rem", lineHeight: 1.65 }}>
                {t("whyUs.ctaDesc")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/auth")}
                  className="px-10 py-4 bg-white text-[#6C63FF] rounded-2xl hover:shadow-2xl hover:shadow-purple-900/30 hover:-translate-y-0.5 transition-all"
                  style={{ fontWeight: 700, fontSize: "1rem" }}
                >
                  {t("whyUs.findWork")}
                </button>
                <button
                  onClick={() => navigate("/auth")}
                  className="px-10 py-4 bg-white/15 backdrop-blur border border-white/25 text-white rounded-2xl hover:bg-white/25 hover:-translate-y-0.5 transition-all"
                  style={{ fontWeight: 600, fontSize: "1rem" }}
                >
                  {t("whyUs.hireTalent")}
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