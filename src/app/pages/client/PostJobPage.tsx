import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  DollarSign,
  Clock,
  Tag,
  CheckCircle,
  Plus,
  X,
  Star,
  Zap,
} from "lucide-react";

const DOMAINS = [
  "Software Development", "UI/UX Design", "Digital Marketing", "Data Science",
  "Finance & Accounting", "HR & Recruitment", "Operations", "Content Writing",
  "Legal", "Sales", "Logistics", "Customer Support",
];

const JOB_TYPES = ["Full-time", "Part-time", "Freelance", "Contract", "Internship"];
const BUDGETS = [
  "< 20,000 DZD", "20,000 – 50,000 DZD", "50,000 – 120,000 DZD",
  "120,000 – 300,000 DZD", "300,000+ DZD", "Negotiable",
];
const WILAYAS = [
  "Alger", "Oran", "Constantine", "Annaba", "Sétif", "Blida", "Batna",
  "Tizi Ouzou", "Béjaïa", "Tlemcen", "Remote", "All Wilayas",
];

export default function PostJobPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    title: "",
    domain: "",
    type: "",
    location: "",
    budget: "",
    description: "",
    requirements: "",
    skills: [] as string[],
    newSkill: "",
    urgent: false,
    deadline: "",
    visibility: "public",
  });

  const set = (key: keyof typeof form, value: any) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const addSkill = () => {
    if (form.newSkill.trim() && form.skills.length < 10) {
      set("skills", [...form.skills, form.newSkill.trim()]);
      set("newSkill", "");
    }
  };

  const removeSkill = (s: string) =>
    set("skills", form.skills.filter((x) => x !== s));

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] to-[#EBF4FF] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl border border-purple-100 shadow-xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6C63FF] to-[#9B8FFF] flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={36} className="text-white" />
          </div>
          <h1 className="text-[#1A1A3E] mb-2" style={{ fontWeight: 700, fontSize: "1.5rem" }}>
            Job Posted Successfully!
          </h1>
          <p className="text-[#6B7280] mb-2" style={{ fontSize: "0.9rem" }}>
            Your job <span className="text-[#6C63FF] font-semibold">"{form.title || "Untitled Job"}"</span> is now live.
          </p>
          <p className="text-[#9CA3AF] mb-8" style={{ fontSize: "0.82rem" }}>
            Candidates will start applying soon. You'll receive notifications for each new applicant.
          </p>
          <div className="space-y-3">
            <div className="flex gap-3 p-3 bg-[#F5F3FF] rounded-xl text-left">
              <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
              <p className="text-[#6B7280]" style={{ fontSize: "0.82rem" }}>
                Your job is visible to 1,500+ verified professionals in Algeria
              </p>
            </div>
            <div className="flex gap-3 p-3 bg-[#F5F3FF] rounded-xl text-left">
              <Zap size={16} className="text-[#6C63FF] mt-0.5 flex-shrink-0" />
              <p className="text-[#6B7280]" style={{ fontSize: "0.82rem" }}>
                Our AI matching will suggest the best candidates for your role
              </p>
            </div>
          </div>
          <div className="flex gap-3 mt-7">
            <button
              onClick={() => navigate("/client/dashboard")}
              className="flex-1 py-3 bg-[#F5F3FF] text-[#6C63FF] rounded-xl hover:bg-purple-100 transition-colors"
              style={{ fontWeight: 600, fontSize: "0.875rem" }}
            >
              My Dashboard
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex-1 py-3 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-xl hover:opacity-90 transition-opacity"
              style={{ fontWeight: 600, fontSize: "0.875rem" }}
            >
              Browse Talent
            </button>
          </div>
        </div>
      </div>
    );
  }

  const STEPS = [
    { n: 1, label: "Job Details" },
    { n: 2, label: "Requirements" },
    { n: 3, label: "Review" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] to-[#EBF4FF] p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/client/dashboard")}
            className="p-2 rounded-xl bg-white border border-purple-100 hover:bg-purple-50 transition-colors"
          >
            <ArrowLeft size={16} className="text-[#6B7280]" />
          </button>
          <div>
            <h1 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.3rem" }}>
              Post a Job
            </h1>
            <p className="text-[#6B7280]" style={{ fontSize: "0.82rem" }}>
              Reach thousands of verified professionals in Algeria
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-0 mb-7">
          {STEPS.map((s, i) => (
            <div key={s.n} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    step > s.n
                      ? "bg-green-500"
                      : step === s.n
                      ? "bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF]"
                      : "bg-white border-2 border-purple-200"
                  }`}
                >
                  {step > s.n ? (
                    <CheckCircle size={16} className="text-white" />
                  ) : (
                    <span
                      className={step >= s.n ? "text-white" : "text-[#9CA3AF]"}
                      style={{ fontSize: "0.8rem", fontWeight: 700 }}
                    >
                      {s.n}
                    </span>
                  )}
                </div>
                <span
                  className={`mt-1 whitespace-nowrap ${step >= s.n ? "text-[#6C63FF]" : "text-[#9CA3AF]"}`}
                  style={{ fontSize: "0.7rem", fontWeight: 500 }}
                >
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-0.5 w-16 mx-2 mb-5 transition-all ${step > s.n ? "bg-green-400" : "bg-purple-100"}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-purple-100 shadow-sm p-7 mb-5">
          {/* Step 1: Job Details */}
          {step === 1 && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#F0EEFF] flex items-center justify-center">
                  <Briefcase size={18} className="text-[#6C63FF]" />
                </div>
                <div>
                  <h2 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.1rem" }}>Job Details</h2>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.78rem" }}>Basic information about the position</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Job Title *
                  </label>
                  <input
                    value={form.title}
                    onChange={(e) => set("title", e.target.value)}
                    placeholder="e.g. Senior React Developer"
                    className="w-full px-4 py-2.5 bg-[#F5F3FF] rounded-xl border border-purple-100 text-[#1A1A3E] placeholder-[#C4B5FD] outline-none focus:border-[#6C63FF] transition-colors"
                    style={{ fontSize: "0.875rem" }}
                  />
                </div>

                <div>
                  <label className="block text-[#1A1A3E] mb-2" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Domain / Category *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DOMAINS.map((d) => (
                      <button
                        key={d}
                        onClick={() => set("domain", d)}
                        className={`px-3 py-1.5 rounded-xl border-2 transition-all ${
                          form.domain === d
                            ? "border-[#6C63FF] bg-[#F0EEFF] text-[#6C63FF]"
                            : "border-purple-100 bg-[#F5F3FF] text-[#6B7280] hover:border-purple-200"
                        }`}
                        style={{ fontSize: "0.78rem", fontWeight: form.domain === d ? 600 : 400 }}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                      <Clock size={13} className="inline mr-1" />
                      Job Type
                    </label>
                    <select
                      value={form.type}
                      onChange={(e) => set("type", e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F5F3FF] rounded-xl border border-purple-100 text-[#1A1A3E] outline-none focus:border-[#6C63FF] appearance-none"
                      style={{ fontSize: "0.875rem" }}
                    >
                      <option value="">Select type</option>
                      {JOB_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                      <MapPin size={13} className="inline mr-1" />
                      Wilaya / Location
                    </label>
                    <select
                      value={form.location}
                      onChange={(e) => set("location", e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F5F3FF] rounded-xl border border-purple-100 text-[#1A1A3E] outline-none focus:border-[#6C63FF] appearance-none"
                      style={{ fontSize: "0.875rem" }}
                    >
                      <option value="">Select wilaya</option>
                      {WILAYAS.map((w) => <option key={w}>{w}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#1A1A3E] mb-2" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    <DollarSign size={13} className="inline mr-1" />
                    Budget Range
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {BUDGETS.map((b) => (
                      <button
                        key={b}
                        onClick={() => set("budget", b)}
                        className={`px-2 py-2 rounded-xl border-2 transition-all text-center ${
                          form.budget === b
                            ? "border-[#6C63FF] bg-[#F0EEFF] text-[#6C63FF]"
                            : "border-purple-100 bg-[#F5F3FF] text-[#6B7280] hover:border-purple-200"
                        }`}
                        style={{ fontSize: "0.72rem", fontWeight: form.budget === b ? 600 : 400 }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    value={form.deadline}
                    onChange={(e) => set("deadline", e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#F5F3FF] rounded-xl border border-purple-100 text-[#1A1A3E] outline-none focus:border-[#6C63FF] transition-colors"
                    style={{ fontSize: "0.875rem" }}
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-[#F5F3FF] rounded-xl">
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-[#F59E0B]" />
                    <div>
                      <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.85rem" }}>Urgent Hiring</p>
                      <p className="text-[#9CA3AF]" style={{ fontSize: "0.75rem" }}>Mark as urgent to attract faster applications</p>
                    </div>
                  </div>
                  <button
                    onClick={() => set("urgent", !form.urgent)}
                    className={`w-11 h-6 rounded-full transition-all relative ${form.urgent ? "bg-[#6C63FF]" : "bg-gray-200"}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all shadow-sm ${form.urgent ? "left-5" : "left-0.5"}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Requirements */}
          {step === 2 && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#F0EEFF] flex items-center justify-center">
                  <Tag size={18} className="text-[#6C63FF]" />
                </div>
                <div>
                  <h2 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.1rem" }}>Requirements</h2>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.78rem" }}>Describe what you're looking for</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Job Description *
                  </label>
                  <textarea
                    rows={5}
                    value={form.description}
                    onChange={(e) => set("description", e.target.value)}
                    placeholder="Describe the role, responsibilities, and what success looks like in this position..."
                    className="w-full px-4 py-3 bg-[#F5F3FF] rounded-xl border border-purple-100 text-[#1A1A3E] placeholder-[#C4B5FD] outline-none focus:border-[#6C63FF] resize-none transition-colors"
                    style={{ fontSize: "0.875rem" }}
                  />
                </div>

                <div>
                  <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Candidate Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={form.requirements}
                    onChange={(e) => set("requirements", e.target.value)}
                    placeholder="e.g. 3+ years of experience, Bachelor's degree, strong communication skills..."
                    className="w-full px-4 py-3 bg-[#F5F3FF] rounded-xl border border-purple-100 text-[#1A1A3E] placeholder-[#C4B5FD] outline-none focus:border-[#6C63FF] resize-none transition-colors"
                    style={{ fontSize: "0.875rem" }}
                  />
                </div>

                <div>
                  <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Required Skills (up to 10)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      value={form.newSkill}
                      onChange={(e) => set("newSkill", e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && addSkill()}
                      placeholder="Add a skill and press Enter"
                      className="flex-1 px-4 py-2 bg-[#F5F3FF] rounded-xl border border-purple-100 text-[#1A1A3E] placeholder-[#C4B5FD] outline-none focus:border-[#6C63FF] transition-colors"
                      style={{ fontSize: "0.875rem" }}
                    />
                    <button
                      onClick={addSkill}
                      className="px-3 py-2 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-xl hover:opacity-90 transition-opacity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {form.skills.map((skill) => (
                      <span
                        key={skill}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0EEFF] text-[#6C63FF] rounded-xl"
                        style={{ fontSize: "0.78rem", fontWeight: 500 }}
                      >
                        {skill}
                        <button onClick={() => removeSkill(skill)}>
                          <X size={12} className="hover:text-red-500 transition-colors" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[#1A1A3E] mb-2" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Job Visibility
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "public", label: "Public", desc: "Visible to all Hustlify users" },
                      { value: "private", label: "Private", desc: "Invite-only, not searchable" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => set("visibility", opt.value)}
                        className={`p-3 rounded-xl border-2 text-left transition-all ${
                          form.visibility === opt.value
                            ? "border-[#6C63FF] bg-[#F0EEFF]"
                            : "border-purple-100 hover:border-purple-200"
                        }`}
                      >
                        <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.85rem" }}>{opt.label}</p>
                        <p className="text-[#9CA3AF]" style={{ fontSize: "0.72rem" }}>{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                  <CheckCircle size={18} className="text-green-600" />
                </div>
                <div>
                  <h2 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.1rem" }}>Review & Post</h2>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.78rem" }}>Confirm your job listing before publishing</p>
                </div>
              </div>

              <div className="bg-[#F5F3FF] rounded-2xl p-5 mb-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.05rem" }}>
                      {form.title || "Untitled Job"}
                    </h3>
                    <p className="text-[#6C63FF]" style={{ fontSize: "0.82rem" }}>{form.domain || "No domain selected"}</p>
                  </div>
                  {form.urgent && (
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-orange-100 text-orange-600 rounded-xl" style={{ fontSize: "0.72rem", fontWeight: 600 }}>
                      <Zap size={11} /> Urgent
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {form.type && (
                    <span className="px-2.5 py-1 bg-white text-[#6B7280] rounded-lg border border-purple-100" style={{ fontSize: "0.72rem" }}>
                      {form.type}
                    </span>
                  )}
                  {form.location && (
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-white text-[#6B7280] rounded-lg border border-purple-100" style={{ fontSize: "0.72rem" }}>
                      <MapPin size={10} /> {form.location}
                    </span>
                  )}
                  {form.budget && (
                    <span className="flex items-center gap-1 px-2.5 py-1 bg-white text-[#6C63FF] rounded-lg border border-purple-100" style={{ fontSize: "0.72rem", fontWeight: 500 }}>
                      {form.budget}
                    </span>
                  )}
                </div>
                {form.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {form.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 bg-[#F0EEFF] text-[#6C63FF] rounded-lg" style={{ fontSize: "0.7rem", fontWeight: 500 }}>
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-3">
                {[
                  { label: "Job Type", value: form.type || "Not set" },
                  { label: "Location", value: form.location || "Not set" },
                  { label: "Budget", value: form.budget || "Not set" },
                  { label: "Deadline", value: form.deadline || "Not set" },
                  { label: "Visibility", value: form.visibility === "public" ? "Public" : "Private" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-purple-50 last:border-0">
                    <span className="text-[#6B7280]" style={{ fontSize: "0.82rem" }}>{item.label}</span>
                    <span className="text-[#1A1A3E]" style={{ fontWeight: 500, fontSize: "0.82rem" }}>{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-4 bg-[#F0EEFF] rounded-xl border border-purple-100">
                <div className="flex items-center gap-2 mb-1">
                  <Star size={14} className="text-[#6C63FF]" />
                  <p className="text-[#6C63FF]" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                    AI Matching Active
                  </p>
                </div>
                <p className="text-[#6B7280]" style={{ fontSize: "0.75rem" }}>
                  Our AI will automatically suggest the best-matching candidates from our talent pool.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => step > 1 ? setStep((s) => (s - 1) as 1 | 2 | 3) : navigate("/client/dashboard")}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-purple-200 text-[#6B7280] rounded-xl hover:bg-purple-50 transition-colors"
            style={{ fontSize: "0.875rem", fontWeight: 500 }}
          >
            <ArrowLeft size={15} />
            {step === 1 ? "Cancel" : "Back"}
          </button>
          <button
            onClick={() => step < 3 ? setStep((s) => (s + 1) as 1 | 2 | 3) : handleSubmit()}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-xl hover:opacity-90 transition-opacity"
            style={{ fontSize: "0.875rem", fontWeight: 600 }}
          >
            {step === 3 ? (
              <>
                <CheckCircle size={15} />
                Post Job
              </>
            ) : (
              "Continue →"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
