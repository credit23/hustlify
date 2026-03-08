import { useNavigate } from "react-router";
import PublicNavbar from "../components/layout/PublicNavbar";
import PublicFooter from "../components/layout/PublicFooter";
import { useLanguage } from "../context/LanguageContext";
import { CheckCircle, Star, Zap, Award, ArrowRight, Globe, Building2 } from "lucide-react";

import sonatrachLogo from "figma:asset/119f59b3cd6a5c8ae761210dae8ef1a3a87ac75f.png";
import djezzyLogo from "figma:asset/efe6e27efbcaf9616318e504f278b1d182e39ee8.png";
import yassirLogo from "figma:asset/087358969a4301a5ac196fb81b1680098156ab08.png";
import mobilisLogo from "figma:asset/c22ae82f3c1f955b89239326a7f4cbd03bed9333.png";
import algerieTelecomLogo from "figma:asset/4e0ce0719e35c9eca3aa7f14a4d8b0db85605e5d.png";
import algeriePosteLogo from "figma:asset/02c067c333cf49ef709af3b372e8dbe76df4667b.png";
import airAlgerieLogo from "figma:asset/52a8f2e679d1d7ad69d73bd19e20065b75df7d99.png";

const SPONSORS = [
  { name: "Djezzy", sector: "Telecom", logo: djezzyLogo, tier: "platinum", employees: "5,000+", logoBg: "#fff" },
  { name: "Mobilis", sector: "Telecom", logo: mobilisLogo, tier: "platinum", employees: "3,000+", logoBg: "#fff" },
  { name: "Sonatrach", sector: "Energy & Oil", logo: sonatrachLogo, tier: "gold", employees: "50,000+", logoBg: "#fff" },
  { name: "Yassir", sector: "Super-app / Mobility", logo: yassirLogo, tier: "gold", employees: "1,200+", logoBg: "#6C27D4" },
  { name: "Air Algérie", sector: "Aviation", logo: airAlgerieLogo, tier: "silver", employees: "10,000+", logoBg: "#fff" },
  { name: "Algérie Poste", sector: "Postal & Financial", logo: algeriePosteLogo, tier: "silver", employees: "8,000+", logoBg: "#EEF2F7" },
  { name: "Algérie Télécom", sector: "Telecom", logo: algerieTelecomLogo, tier: "bronze", employees: "7,000+", logoBg: "#fff" },
];

const TIERS = [
  {
    name: "Platinum",
    color: "#6C63FF",
    bg: "#F0EEFF",
    price: "500,000 DZD / year",
    icon: Award,
    features: [
      "Featured banner on homepage",
      "Priority access to top 50 talent",
      "Dedicated account manager",
      "Custom branded job posts",
      "Advanced analytics dashboard",
      "Co-branding on all campaigns",
      "Quarterly talent reports",
      "Unlimited job posts",
    ],
    recommended: true,
  },
  {
    name: "Gold",
    color: "#F59E0B",
    bg: "#FEF3C7",
    price: "200,000 DZD / year",
    icon: Star,
    features: [
      "Logo on partners page",
      "Priority listing in search",
      "Dedicated support team",
      "50 featured job posts / month",
      "Monthly analytics report",
      "Access to talent pool insights",
    ],
    recommended: false,
  },
  {
    name: "Silver",
    color: "#6B7280",
    bg: "#F3F4F6",
    price: "80,000 DZD / year",
    icon: CheckCircle,
    features: [
      "Logo on partners page",
      "Standard listing",
      "Email support",
      "20 job posts / month",
      "Basic analytics",
    ],
    recommended: false,
  },
  {
    name: "Bronze",
    color: "#D97706",
    bg: "#FEF9C3",
    price: "30,000 DZD / year",
    icon: Zap,
    features: [
      "Listed on partners page",
      "Standard support",
      "5 job posts / month",
    ],
    recommended: false,
  },
];

const BENEFITS = [
  {
    icon: Globe,
    title: "National Reach",
    desc: "Your brand reaches professionals and job seekers across all 69 wilayas of Algeria.",
  },
  {
    icon: Star,
    title: "Talent Pipeline",
    desc: "Get priority access to Algeria's top 10% of verified professionals in your sector.",
  },
  {
    icon: Building2,
    title: "Brand Authority",
    desc: "Association with Hustlify positions your company as a leading employer in Algeria.",
  },
];

export default function SponsorsPage() {
  const navigate = useNavigate();
  const byTier = (tier: string) => SPONSORS.filter((s) => s.tier === tier);
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-[#F0EEFF] to-[#EBF4FF]">
      <PublicNavbar />

      {/* Hero */}
      <section className="pt-28 pb-14 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#6C63FF]/10 rounded-full mb-5">
            <Award size={14} className="text-[#6C63FF]" />
            <span className="text-[#6C63FF]" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
              {t("sponsors.badge")}
            </span>
          </div>
          <h1 className="text-[#1A1A3E] mb-4" style={{ fontSize: "2.4rem", fontWeight: 700, lineHeight: 1.2 }}>
            {t("sponsors.heroTitle1")}{" "}
            <span className="bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] bg-clip-text text-transparent">
              {t("sponsors.heroTitle2")}
            </span>
          </h1>
          <p className="text-[#6B7280] mb-8" style={{ fontSize: "1rem", lineHeight: 1.7 }}>
            {t("sponsors.heroDesc")}
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="px-8 py-3 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-purple-200"
            style={{ fontWeight: 600 }}
          >
            {t("sponsors.becomePartner")}
          </button>
        </div>
      </section>

      {/* Platinum Sponsors */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F0EEFF] text-[#6C63FF] rounded-full" style={{ fontSize: "0.78rem", fontWeight: 700 }}>
              <Award size={13} /> Platinum Partners
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {byTier("platinum").map((s) => (
              <div
                key={s.name}
                className="bg-white rounded-2xl border-2 border-[#6C63FF]/30 shadow-lg flex flex-col items-center p-6 gap-3 w-52 hover:shadow-xl transition-shadow"
              >
                <div
                  className="w-full h-24 rounded-xl flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: s.logoBg }}
                >
                  <img src={s.logo} alt={s.name} className="w-full h-full object-contain p-2" />
                </div>
                <div className="text-center">
                  <p className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "0.95rem" }}>{s.name}</p>
                  <p className="text-[#6B7280]" style={{ fontSize: "0.73rem" }}>{s.sector}</p>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.68rem" }}>{s.employees} employees</p>
                </div>
                <span className="px-2.5 py-0.5 bg-[#F0EEFF] text-[#6C63FF] rounded-full" style={{ fontSize: "0.62rem", fontWeight: 700 }}>
                  ✦ PLATINUM
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gold Sponsors */}
      <section className="px-6 pb-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FEF3C7] text-[#F59E0B] rounded-full" style={{ fontSize: "0.78rem", fontWeight: 700 }}>
              <Star size={13} /> Gold Partners
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {byTier("gold").map((s) => (
              <div key={s.name} className="bg-white rounded-2xl border border-[#F59E0B]/40 p-5 shadow-sm flex items-center gap-4 w-52 hover:shadow-md transition-shadow">
                <div
                  className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: s.logoBg }}
                >
                  <img src={s.logo} alt={s.name} className="w-full h-full object-contain p-1" />
                </div>
                <div>
                  <p className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "0.9rem" }}>{s.name}</p>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.68rem" }}>{s.sector}</p>
                  <span className="inline-block mt-1 px-1.5 py-0.5 bg-[#FEF3C7] text-[#F59E0B] rounded-md" style={{ fontSize: "0.6rem", fontWeight: 700 }}>
                    GOLD
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Silver Sponsors */}
      <section className="px-6 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-500 rounded-full" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
              Silver Partners
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {byTier("silver").map((s) => (
              <div key={s.name} className="bg-white rounded-xl border border-purple-100 px-5 py-3 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow">
                <div
                  className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: s.logoBg }}
                >
                  <img src={s.logo} alt={s.name} className="w-full h-full object-contain p-0.5" />
                </div>
                <span className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.85rem" }}>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bronze Sponsors */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FEF9C3] text-[#D97706] rounded-full" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
              Bronze Partners
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {byTier("bronze").map((s) => (
              <div key={s.name} className="bg-white rounded-xl border border-purple-100 px-4 py-2.5 shadow-sm flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: s.logoBg }}
                >
                  <img src={s.logo} alt={s.name} className="w-full h-full object-contain" />
                </div>
                <span className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.82rem" }}>{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Partner */}
      <section className="px-6 pb-16 bg-white/50">
        <div className="max-w-5xl mx-auto py-12">
          <div className="text-center mb-10">
            <h2 className="text-[#1A1A3E] mb-2" style={{ fontWeight: 700 }}>Why Partner with Hustlify?</h2>
            <p className="text-[#6B7280]" style={{ fontSize: "0.9rem" }}>
              Give your brand national presence and talent access
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm text-center">
                <div className="w-12 h-12 rounded-2xl bg-[#F0EEFF] flex items-center justify-center mx-auto mb-4">
                  <b.icon size={22} className="text-[#6C63FF]" />
                </div>
                <h3 className="text-[#1A1A3E] mb-2" style={{ fontWeight: 700, fontSize: "0.95rem" }}>{b.title}</h3>
                <p className="text-[#6B7280]" style={{ fontSize: "0.83rem", lineHeight: 1.6 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-[#1A1A3E] mb-2" style={{ fontWeight: 700 }}>Sponsorship Tiers</h2>
            <p className="text-[#6B7280]" style={{ fontSize: "0.9rem" }}>
              Choose the partnership level that best fits your organization
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`bg-white rounded-2xl border-2 p-5 relative ${tier.recommended ? "shadow-xl" : "border-purple-100"}`}
                style={{ borderColor: tier.recommended ? tier.color : undefined }}
              >
                {tier.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className="px-3 py-1 rounded-full text-white whitespace-nowrap"
                      style={{ backgroundColor: tier.color, fontSize: "0.65rem", fontWeight: 700 }}
                    >
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: tier.bg }}>
                    <tier.icon size={15} style={{ color: tier.color }} />
                  </div>
                  <span style={{ color: tier.color, fontWeight: 700, fontSize: "0.95rem" }}>{tier.name}</span>
                </div>
                <p className="text-[#1A1A3E] mb-3" style={{ fontWeight: 700, fontSize: "1.05rem" }}>{tier.price}</p>
                <div className="space-y-2 mb-4">
                  {tier.features.map((f) => (
                    <div key={f} className="flex items-start gap-1.5">
                      <CheckCircle size={13} className="flex-shrink-0 mt-0.5" style={{ color: tier.color }} />
                      <span className="text-[#6B7280]" style={{ fontSize: "0.75rem" }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => navigate("/contact")}
                  className="w-full py-2.5 rounded-xl transition-all"
                  style={{
                    backgroundColor: tier.recommended ? tier.color : tier.bg,
                    color: tier.recommended ? "#fff" : tier.color,
                    fontWeight: 600,
                    fontSize: "0.82rem",
                  }}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] rounded-3xl p-10 text-center text-white">
            <h2 className="text-white mb-3" style={{ fontWeight: 700, fontSize: "1.6rem" }}>
              Ready to Partner with Hustlify?
            </h2>
            <p className="text-white/80 mb-6" style={{ fontSize: "0.95rem" }}>
              Let's discuss the right sponsorship plan for your organization.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#6C63FF] rounded-2xl hover:bg-white/90 transition-colors"
              style={{ fontWeight: 600 }}
            >
              Contact Partnerships Team <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}