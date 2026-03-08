import { useState } from "react";
import { useNavigate } from "react-router";
import PublicNavbar from "../components/layout/PublicNavbar";
import PublicFooter from "../components/layout/PublicFooter";
import { useLanguage } from "../context/LanguageContext";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Send,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Clock,
  Briefcase,
  Users,
  Building2,
  Headphones,
} from "lucide-react";

const FAQS = [
  {
    q: "How do I get started on Hustlify?",
    a: "Getting started is easy! Click 'Get Started' on the homepage, enter your email, and choose whether you're an Employee, Client, or Enterprise. You'll be set up in under 5 minutes.",
  },
  {
    q: "Is Hustlify free to use?",
    a: "Hustlify is free for employees and freelancers. Clients and enterprises have a free tier with limited job posts, and premium plans starting from 14,900 DZD/month for unlimited access.",
  },
  {
    q: "How does payment work?",
    a: "Payments are made through our secure escrow system. Client funds are held safely and released to the professional only after project completion confirmation. We support CCP, Baridimob, and bank transfers.",
  },
  {
    q: "How are professionals verified?",
    a: "Every professional goes through our ID verification process and domain-specific skill assessment. Verified profiles get a trust badge visible to all clients.",
  },
  {
    q: "Can enterprises post jobs for free?",
    a: "Enterprises get 5 free job posts per month on the Starter plan. For unlimited posts and advanced features like AI matching and analytics, upgrade to Enterprise Pro.",
  },
  {
    q: "How do I report a problem or dispute?",
    a: "You can contact our support team via this contact form, email us at support@hustlify.dz, or open a dispute directly from your dashboard. We aim to resolve all issues within 24–48 hours.",
  },
];

const SUPPORT_OPTIONS = [
  {
    icon: Briefcase,
    title: "For Clients",
    desc: "Help with hiring, payments, and managing projects.",
    color: "#6D28D9",
    bg: "#EEF2FF",
  },
  {
    icon: Users,
    title: "For Employees",
    desc: "Profile setup, job applications, and account support.",
    color: "#10B981",
    bg: "#D1FAE5",
  },
  {
    icon: Building2,
    title: "For Enterprises",
    desc: "Onboarding, plan management, and partnerships.",
    color: "#F59E0B",
    bg: "#FEF3C7",
  },
  {
    icon: Headphones,
    title: "Technical Support",
    desc: "Platform bugs, account access, and technical issues.",
    color: "#4F8EF7",
    bg: "#EBF4FF",
  },
];

export default function ContactPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    type: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#E0E7FF] to-[#EBF4FF]">
      <PublicNavbar />

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 pt-28 pb-16">
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#6D28D9]/10 rounded-full mb-5">
            <MessageSquare size={14} className="text-[#6D28D9]" />
            <span className="text-[#6D28D9]" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
              {t("contact.badge")}
            </span>
          </div>
          <h1 className="text-[#1A1A3E] mb-4" style={{ fontWeight: 800, fontSize: "2.5rem", lineHeight: 1.2 }}>
            {t("contact.heroTitle1")}{" "}
            <span className="bg-gradient-to-r from-[#6D28D9] to-[#2563EB] bg-clip-text text-transparent">
              {t("contact.heroTitle2")}
            </span>
          </h1>
          <p className="text-[#6B7280] mb-8" style={{ fontSize: "1.05rem" }}>
            {t("contact.heroDesc")}
          </p>

          {/* Contact methods */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { icon: Mail, label: "Email", value: "hustlify.algeria@gmail.com", desc: "For general & support inquiries", color: "#6D28D9" },
              { icon: Phone, label: "Phone", value: "+213 23 45 67 89", desc: "Sun–Thu, 9am–5pm (Alger)", color: "#10B981" },
              { icon: MapPin, label: "Office", value: "Innovation Valley, Bab Ezzouar", desc: "Alger, Algeria", color: "#F59E0B" },
            ].map((item) => (
              <div key={item.label} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex gap-4 items-start">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${item.color}15` }}
                >
                  <item.icon size={20} style={{ color: item.color }} />
                </div>
                <div className="text-left flex-1">
                  <p className="text-[#1A1A3E]" style={{ fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.15rem" }}>
                    {item.label}
                  </p>
                  <p className="text-[#1A1A3E] mb-0.5" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    {item.value}
                  </p>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.75rem" }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Types */}
        <div className="mb-16">
          <h2 className="text-center text-[#1A1A3E] mb-8" style={{ fontWeight: 700, fontSize: "1.5rem" }}>
            {t("contact.helpWith")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SUPPORT_OPTIONS.map((opt) => (
              <div
                key={opt.title}
                onClick={() => setFormData({ ...formData, type: opt.title })}
                className={`rounded-2xl p-5 cursor-pointer transition-all border-2 ${
                  formData.type === opt.title
                    ? "border-[#6D28D9] bg-[#EEF2FF]"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: opt.bg }}
                >
                  <opt.icon size={20} style={{ color: opt.color }} />
                </div>
                <h3 className="text-[#1A1A3E] mb-1" style={{ fontSize: "0.9rem", fontWeight: 700 }}>
                  {opt.title}
                </h3>
                <p className="text-[#6B7280]" style={{ fontSize: "0.78rem" }}>
                  {opt.desc}
                </p>
                {formData.type === opt.title && (
                  <div className="mt-3 flex items-center gap-1">
                    <CheckCircle size={14} className="text-[#6D28D9]" />
                    <span className="text-[#6D28D9]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                      Selected
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <div>
            <h2 className="text-[#1A1A3E] mb-5" style={{ fontWeight: 700, fontSize: "1.4rem" }}>
              {t("contact.sendMessage")}
            </h2>
            <div className="mb-5">
              <div className="flex items-center justify-center gap-2 p-3 bg-[#EEF2FF] rounded-xl mb-5">
                <Clock size={14} className="text-[#6D28D9]" />
                <p className="text-[#1A1A3E]" style={{ fontSize: "0.75rem" }}>
                  Typical response time: <span style={{ fontWeight: 600, color: "#6D28D9" }}>under 24 hours</span>
                </p>
              </div>
              <button
                onClick={() => navigate("/auth")}
                className="px-5 py-2.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:opacity-90 transition-opacity"
                style={{ fontSize: "0.82rem", fontWeight: 600 }}
              >
                Or create an account to access support dashboard
              </button>
            </div>

            {sent ? (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.82rem", fontWeight: 500 }}>
                      {t("contact.fullName")} *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder={t("contact.yourName")}
                      className="w-full px-4 py-2.5 bg-blue-50 rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#9CA3AF] outline-none focus:border-[#6D28D9] transition-colors"
                      style={{ fontSize: "0.875rem" }}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.82rem", fontWeight: 500 }}>
                      {t("contact.email")} *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder={t("contact.yourEmail")}
                      className="w-full px-4 py-2.5 bg-blue-50 rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#9CA3AF] outline-none focus:border-[#6D28D9] transition-colors"
                      style={{ fontSize: "0.875rem" }}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.82rem", fontWeight: 500 }}>
                    {t("contact.subject")} *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder={t("contact.subjectPlaceholder")}
                    className="w-full px-4 py-2.5 bg-blue-50 rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#9CA3AF] outline-none focus:border-[#6D28D9] transition-colors"
                    style={{ fontSize: "0.875rem" }}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.82rem", fontWeight: 500 }}>
                    {t("contact.inquiryType")}
                  </label>
                  <select
                    className="w-full px-4 py-2.5 bg-blue-50 rounded-xl border border-slate-200 text-[#1A1A3E] outline-none focus:border-[#6D28D9] appearance-none"
                    style={{ fontSize: "0.875rem" }}
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="">{t("contact.selectType")}</option>
                    {SUPPORT_OPTIONS.map((o) => (
                      <option key={o.title} value={o.title}>
                        {o.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.82rem", fontWeight: 500 }}>
                    {t("contact.message")} *
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder={t("contact.messagePlaceholder")}
                    className="w-full px-4 py-3 bg-blue-50 rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#9CA3AF] outline-none focus:border-[#6D28D9] resize-none transition-colors"
                    style={{ fontSize: "0.875rem" }}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:opacity-90 transition-opacity"
                  style={{ fontSize: "0.875rem", fontWeight: 600 }}
                >
                  <Send size={16} />
                  {t("contact.send")}
                </button>
                <p className="text-center text-[#9CA3AF]" style={{ fontSize: "0.72rem" }}>
                  {t("contact.disclaimer")}
                </p>
              </form>
            ) : (
              <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-[#1A1A3E] mb-2" style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                  {t("contact.messageSent")}
                </h3>
                <p className="text-[#6B7280] mb-5" style={{ fontSize: "0.875rem" }}>
                  {t("contact.messageSentDesc")}
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="px-5 py-2 bg-slate-100 text-[#1A1A3E] rounded-xl hover:bg-slate-200 transition-colors"
                  style={{ fontSize: "0.82rem", fontWeight: 600 }}
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>

          {/* FAQ & Social */}
          <div>
            <h2 className="text-[#1A1A3E] mb-5" style={{ fontWeight: 700, fontSize: "1.4rem" }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 mb-8">
              {FAQS.map((faq, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:shadow-md transition-shadow"
                  >
                    {openFaq === i ? (
                      <ChevronUp size={16} className="text-[#1A1A3E]" />
                    ) : (
                      <ChevronDown size={16} className="text-[#1A1A3E]" />
                    )}
                  </button>
                  <div
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
                    style={{ marginTop: "-2.5rem", paddingTop: "2.5rem" }}
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full text-left px-5 py-4 flex items-start justify-between gap-3"
                    >
                      <p className="text-[#1A1A3E] pr-8" style={{ fontSize: "0.9rem", fontWeight: 700 }}>
                        {faq.q}
                      </p>
                      <ChevronUp size={16} className="text-[#6D28D9] flex-shrink-0" />
                    </button>
                    {openFaq === i && (
                      <div className="px-5 pb-4 border-t border-slate-100">
                        <p className="text-[#6B7280] pt-3" style={{ fontSize: "0.82rem", lineHeight: 1.6 }}>
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Box */}
            <div className="mt-6 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] rounded-2xl p-5 text-white">
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                Still have questions?
              </h3>
              <p style={{ fontSize: "0.82rem", marginBottom: "1rem", opacity: 0.95 }}>
                Join our community or schedule a call with our team
              </p>
              <button className="px-4 py-2 bg-white text-[#6D28D9] rounded-xl hover:bg-white/90 transition-colors" style={{ fontWeight: 600, fontSize: "0.82rem" }}>
                Book a Call
              </button>
            </div>
          </div>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
