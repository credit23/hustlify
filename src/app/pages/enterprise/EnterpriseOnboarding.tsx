import { useState } from "react";
import { useNavigate } from "react-router";
import { CheckCircle, Upload, Building2, Users, MapPin, Briefcase, ArrowRight, ArrowLeft } from "lucide-react";
import hustlifyLogo from "../../../assets/ee079ff6b92e2af14de5404d0251f4a3326be5ea.png";

const STEPS = [
  { step: 1, label: "Company Info" },
  { step: 2, label: "Team Setup" },
  { step: 3, label: "Preferences" },
  { step: 4, label: "Review" },
];

export default function EnterpriseOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const next = () => {
    if (currentStep < 4) setCurrentStep((s) => s + 1);
    else navigate("/enterprise/dashboard");
  };
  const prev = () => setCurrentStep((s) => Math.max(1, s - 1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] to-[#DBEAFE] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src={hustlifyLogo} alt="Hustlify" className="h-14 object-contain" />
          </div>
          <h1 className="text-[#1A1A3E] mb-1" style={{ fontWeight: 700, fontSize: "1.5rem" }}>
            Enterprise Onboarding
          </h1>
          <p className="text-[#6B7280]" style={{ fontSize: "0.875rem" }}>
            Set up your company profile to start hiring top talent
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-0 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    currentStep > s.step
                      ? "bg-green-500"
                      : currentStep === s.step
                      ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB]"
                      : "bg-white border-2 border-slate-200"
                  }`}
                >
                  {currentStep > s.step ? (
                    <CheckCircle size={16} className="text-white" />
                  ) : (
                    <span
                      className={currentStep >= s.step ? "text-white" : "text-[#9CA3AF]"}
                      style={{ fontSize: "0.8rem", fontWeight: 700 }}
                    >
                      {s.step}
                    </span>
                  )}
                </div>
                <span
                  className={`mt-1 whitespace-nowrap ${currentStep >= s.step ? "text-[#6D28D9]" : "text-[#9CA3AF]"}`}
                  style={{ fontSize: "0.7rem", fontWeight: 500 }}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-0.5 w-16 mx-2 mb-5 transition-all ${currentStep > s.step ? "bg-green-400" : "bg-slate-200"}`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 mb-6">
          {/* Step 1: Company Info */}
          {currentStep === 1 && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Building2 size={18} className="text-[#6D28D9]" />
                </div>
                <div>
                  <h2 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.1rem" }}>Company Information</h2>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.78rem" }}>Tell us about your company</p>
                </div>
              </div>

              {/* Logo Upload */}
              <div className="mb-5 flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 border-2 border-dashed border-slate-300 flex items-center justify-center">
                  <Upload size={20} className="text-[#93C5FD]" />
                </div>
                <div>
                  <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.875rem" }}>Company Logo</p>
                  <button className="mt-1 text-[#6D28D9] hover:underline" style={{ fontSize: "0.78rem" }}>Upload logo (PNG, SVG)</button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Company Name *", placeholder: "e.g. TechCorp DZ" },
                  { label: "Registration Number", placeholder: "RC / NIF" },
                  { label: "Industry / Sector *", placeholder: "e.g. Technology" },
                  { label: "Founded Year", placeholder: "e.g. 2019" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                      {field.label}
                    </label>
                    <input
                      placeholder={field.placeholder}
                      className="w-full px-4 py-2.5 bg-blue-50 rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#93C5FD] outline-none focus:border-[#6D28D9] transition-colors"
                      style={{ fontSize: "0.875rem" }}
                    />
                  </div>
                ))}
                <div className="col-span-2">
                  <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Company Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your company, mission, and culture..."
                    className="w-full px-4 py-2.5 bg-blue-50 rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#93C5FD] outline-none focus:border-[#6D28D9] transition-colors resize-none"
                    style={{ fontSize: "0.875rem" }}
                  />
                </div>
                <div>
                  <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Website
                  </label>
                  <input
                    placeholder="https://yourcompany.com"
                    className="w-full px-4 py-2.5 bg-blue-50 rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#93C5FD] outline-none focus:border-[#6D28D9] transition-colors"
                    style={{ fontSize: "0.875rem" }}
                  />
                </div>
                <div>
                  <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    LinkedIn Page
                  </label>
                  <input
                    placeholder="linkedin.com/company/..."
                    className="w-full px-4 py-2.5 bg-blue-50 rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#93C5FD] outline-none focus:border-[#6D28D9] transition-colors"
                    style={{ fontSize: "0.875rem" }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Team Setup */}
          {currentStep === 2 && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Users size={18} className="text-[#6D28D9]" />
                </div>
                <div>
                  <h2 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.1rem" }}>Team & Location</h2>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.78rem" }}>Tell us about your team size and location</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#1A1A3E] mb-2" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Company Size
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {["1–10", "11–50", "51–200", "200–500", "500–1000", "1000+"].map((size) => (
                      <button
                        key={size}
                        className="px-4 py-3 bg-blue-50 rounded-xl border-2 border-transparent hover:border-[#6D28D9] text-[#6B7280] hover:text-[#6D28D9] transition-all text-sm"
                      >
                        {size} employees
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#1A1A3E] mb-1.5 flex items-center gap-1" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                      <MapPin size={13} /> Headquarters
                    </label>
                    <select className="w-full px-4 py-2.5 bg-blue-50 rounded-xl border border-slate-200 text-[#1A1A3E] outline-none focus:border-[#6D28D9] appearance-none" style={{ fontSize: "0.875rem" }}>
                      <option>Alger</option>
                      <option>Oran</option>
                      <option>Constantine</option>
                      <option>Annaba</option>
                      <option>Sétif</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                      Operating Wilayas
                    </label>
                    <input
                      placeholder="e.g. Alger, Oran, Constantine"
                      className="w-full px-4 py-2.5 bg-blue-50 rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#93C5FD] outline-none focus:border-[#6D28D9] transition-colors"
                      style={{ fontSize: "0.875rem" }}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Hiring Goals
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Full-time hiring", "Freelance projects", "Short-term contracts", "Internships", "Remote work"].map((goal) => (
                      <button
                        key={goal}
                        className="px-3 py-1.5 bg-blue-50 rounded-xl border-2 border-transparent hover:border-[#6D28D9] text-[#6B7280] hover:text-[#6D28D9] transition-all"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {goal}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {currentStep === 3 && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Briefcase size={18} className="text-[#6D28D9]" />
                </div>
                <div>
                  <h2 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.1rem" }}>Hiring Preferences</h2>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.78rem" }}>What kind of talent are you looking for?</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#1A1A3E] mb-2" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Domains / Skills Needed
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Software Dev",
                      "Manual Labor",
                      "Design",
                      "Marketing",
                      "Finance",
                      "HR",
                      "Operations",
                      "Data Science",
                      "Legal",
                      "Sales",
                      "Logistics",
                      "Trades & Services",
                    ].map((domain) => (
                      <button
                        key={domain}
                        className="px-3 py-1.5 bg-blue-50 rounded-xl border-2 border-transparent hover:border-[#6D28D9] text-[#6B7280] hover:text-[#6D28D9] transition-all"
                        style={{ fontSize: "0.8rem" }}
                      >
                        {domain}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Preferred Budget Range (per project)
                  </label>
                  <select className="w-full px-4 py-2.5 bg-blue-50 rounded-xl border border-slate-200 text-[#1A1A3E] outline-none focus:border-[#6D28D9] appearance-none" style={{ fontSize: "0.875rem" }}>
                    <option>50,000 – 150,000 DZD</option>
                    <option>150,000 – 500,000 DZD</option>
                    <option>500,000+ DZD</option>
                    <option>Negotiable</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#1A1A3E] mb-2" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Plan
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { name: "Starter", price: "Free", features: ["5 job posts/month", "Basic search", "Email support"], highlight: false },
                      { name: "Enterprise Pro", price: "14,900 DZD/mo", features: ["Unlimited job posts", "AI matching", "Priority support", "Analytics dashboard"], highlight: true },
                    ].map((plan) => (
                      <div
                        key={plan.name}
                        className={`p-4 rounded-2xl border-2 transition-all ${plan.highlight ? "border-[#6D28D9] bg-blue-50" : "border-slate-200 hover:border-slate-300"}`}
                      >
                        <p className="text-[#1A1A3E] mb-0.5" style={{ fontWeight: 700, fontSize: "0.9rem" }}>{plan.name}</p>
                        <p className="text-[#6D28D9] mb-3" style={{ fontWeight: 700, fontSize: "1rem" }}>{plan.price}</p>
                        {plan.features.map((f) => (
                          <div key={f} className="flex items-center gap-1.5 mb-1">
                            <CheckCircle size={12} className="text-[#6D28D9]" />
                            <span className="text-[#6B7280]" style={{ fontSize: "0.75rem" }}>{f}</span>
                          </div>
                        ))}
                        {plan.highlight && (
                          <span className="mt-2 inline-block px-2 py-0.5 bg-[#6D28D9] text-white rounded-lg" style={{ fontSize: "0.65rem", fontWeight: 600 }}>
                            Recommended
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div>
              <div className="text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6D28D9] to-[#2563EB] flex items-center justify-center mx-auto mb-3">
                  <CheckCircle size={26} className="text-white" />
                </div>
                <h2 className="text-[#1A1A3E] mb-1" style={{ fontWeight: 700, fontSize: "1.2rem" }}>
                  Almost there!
                </h2>
                <p className="text-[#6B7280]" style={{ fontSize: "0.875rem" }}>
                  Review your information before submitting
                </p>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Company", value: "TechCorp DZ" },
                  { label: "Industry", value: "Technology" },
                  { label: "Size", value: "51–200 employees" },
                  { label: "Location", value: "Alger, Algeria" },
                  { label: "Plan", value: "Enterprise Pro — 14,900 DZD/mo" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
                    <span className="text-[#6B7280]" style={{ fontSize: "0.85rem" }}>{item.label}</span>
                    <span className="text-[#1A1A3E]" style={{ fontWeight: 500, fontSize: "0.85rem" }}>{item.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 p-4 bg-blue-50 rounded-xl border border-slate-200">
                <p className="text-[#6D28D9]" style={{ fontSize: "0.78rem", fontWeight: 500 }}>
                  ✓ By continuing, you agree to Hustlify's Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prev}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-[#6B7280] rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ fontSize: "0.875rem", fontWeight: 500 }}
          >
            <ArrowLeft size={15} />
            Back
          </button>
          <button
            onClick={next}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:opacity-90 transition-opacity"
            style={{ fontSize: "0.875rem", fontWeight: 600 }}
          >
            {currentStep === 4 ? "Launch Enterprise Account" : "Continue"}
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
