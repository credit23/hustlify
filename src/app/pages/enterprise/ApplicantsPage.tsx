import { useNavigate } from "react-router";
import { ArrowLeft, Star, CheckCircle, MessageSquare, X, ThumbsUp, ThumbsDown, Eye, Download, Filter } from "lucide-react";
import { useState } from "react";

type ApplicantStatus = "pending" | "shortlisted" | "interviewed" | "hired" | "rejected";

const APPLICANTS = [
  { id: "1", name: "Karim Benali", role: "Full-Stack Developer", rating: 4.9, reviews: 142, status: "shortlisted" as ApplicantStatus, appliedDate: "Jan 12, 2026", coverNote: "I have 5+ years of React experience and have built 3 SaaS platforms from scratch. Very excited about this opportunity.", skills: ["React", "Node.js", "TypeScript"], location: "Alger", img: "https://images.unsplash.com/photo-1565687981296-535f09db714e?w=120&q=80" },
  { id: "2", name: "Sonia Amrani", role: "Senior React Developer", rating: 5.0, reviews: 98, status: "interviewed" as ApplicantStatus, appliedDate: "Jan 14, 2026", coverNote: "With my background in both React and UX, I can bring a unique perspective to your engineering team.", skills: ["React", "Redux", "GraphQL"], location: "Oran", img: "https://images.unsplash.com/photo-1765648580528-8d659861d81a?w=120&q=80" },
  { id: "3", name: "Yacine Messaoud", role: "Frontend Developer", rating: 4.7, reviews: 67, status: "pending" as ApplicantStatus, appliedDate: "Jan 15, 2026", coverNote: "I'm passionate about building clean, performant user interfaces with React and modern tooling.", skills: ["React", "Vue.js", "CSS"], location: "Constantine", img: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=120&q=80" },
  { id: "4", name: "Nadia Kaci", role: "React Developer", rating: 4.8, reviews: 53, status: "pending" as ApplicantStatus, appliedDate: "Jan 16, 2026", coverNote: "I have been working with React for 4 years, mostly on fintech and e-commerce projects in Algeria.", skills: ["React", "Next.js", "Tailwind"], location: "Sétif", img: "https://images.unsplash.com/photo-1738750908048-14200459c3c9?w=120&q=80" },
  { id: "5", name: "Omar Cherif", role: "JavaScript Developer", rating: 4.6, reviews: 34, status: "rejected" as ApplicantStatus, appliedDate: "Jan 11, 2026", coverNote: "Experienced JavaScript developer looking for my next challenge.", skills: ["JavaScript", "React", "AWS"], location: "Annaba", img: "https://images.unsplash.com/photo-1764690690771-b4522d66b433?w=120&q=80" },
];

const STATUS_CONFIG: Record<ApplicantStatus, { label: string; color: string; bg: string }> = {
  pending: { label: "Pending Review", color: "#F59E0B", bg: "#FEF3C7" },
  shortlisted: { label: "Shortlisted", color: "#4F8EF7", bg: "#EBF4FF" },
  interviewed: { label: "Interviewed", color: "#6C63FF", bg: "#F0EEFF" },
  hired: { label: "Hired", color: "#10B981", bg: "#D1FAE5" },
  rejected: { label: "Rejected", color: "#EF4444", bg: "#FEE2E2" },
};

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={11} className={i <= Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"} />
      ))}
    </div>
  );
}

export default function ApplicantsPage() {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState(APPLICANTS);
  const [selectedApplicant, setSelectedApplicant] = useState<typeof APPLICANTS[0] | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | ApplicantStatus>("all");

  const updateStatus = (id: string, status: ApplicantStatus) => {
    setApplicants((prev) => prev.map((a) => (a.id === id ? { ...a, status } : a)));
    if (selectedApplicant?.id === id) {
      setSelectedApplicant((prev) => prev ? { ...prev, status } : null);
    }
  };

  const filtered = filterStatus === "all" ? applicants : applicants.filter((a) => a.status === filterStatus);

  const counts = applicants.reduce((acc, a) => {
    acc[a.status] = (acc[a.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] to-[#EBF4FF] p-6">
      <div className="max-w-6xl mx-auto">
        <button onClick={() => navigate("/enterprise/jobs")} className="flex items-center gap-2 text-[#6B7280] hover:text-[#6C63FF] mb-5 transition-colors" style={{ fontSize: "0.875rem" }}>
          <ArrowLeft size={15} /> Back to Job Posts
        </button>

        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.4rem" }}>Applicants</h1>
            <p className="text-[#6B7280]" style={{ fontSize: "0.875rem" }}>Senior React Developer · {applicants.length} total applicants</p>
          </div>
          <button className="flex items-center gap-1.5 px-4 py-2 bg-white border border-purple-100 text-[#6B7280] rounded-xl hover:bg-purple-50 transition-colors" style={{ fontSize: "0.875rem" }}>
            <Download size={15} /> Export
          </button>
        </div>

        {/* Status Summary */}
        <div className="grid grid-cols-5 gap-3 mb-5">
          {(Object.keys(STATUS_CONFIG) as ApplicantStatus[]).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s === filterStatus ? "all" : s)}
              className={`p-3 rounded-2xl text-center border-2 transition-all ${
                filterStatus === s ? "border-[#6C63FF] shadow-sm" : "border-transparent"
              }`}
              style={{ backgroundColor: STATUS_CONFIG[s].bg }}
            >
              <p style={{ color: STATUS_CONFIG[s].color, fontWeight: 700, fontSize: "1.2rem" }}>{counts[s] || 0}</p>
              <p style={{ color: STATUS_CONFIG[s].color, fontSize: "0.7rem", fontWeight: 500 }}>{STATUS_CONFIG[s].label}</p>
            </button>
          ))}
        </div>

        <div className="flex gap-5">
          {/* Applicant List */}
          <div className="flex-1 space-y-3">
            {filtered.map((app) => (
              <div
                key={app.id}
                onClick={() => setSelectedApplicant(app)}
                className={`bg-white rounded-2xl border p-4 cursor-pointer hover:border-[#6C63FF] transition-all ${
                  selectedApplicant?.id === app.id ? "border-[#6C63FF] shadow-md" : "border-purple-100"
                }`}
              >
                <div className="flex items-start gap-3">
                  <img src={app.img} alt={app.name} className="w-11 h-11 rounded-xl object-cover border-2 border-purple-100" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.9rem" }}>{app.name}</p>
                      <span
                        className="px-2 py-0.5 rounded-lg"
                        style={{ backgroundColor: STATUS_CONFIG[app.status].bg, color: STATUS_CONFIG[app.status].color, fontSize: "0.68rem", fontWeight: 600 }}
                      >
                        {STATUS_CONFIG[app.status].label}
                      </span>
                    </div>
                    <p className="text-[#6B7280]" style={{ fontSize: "0.78rem" }}>{app.role} · {app.location}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Stars rating={app.rating} />
                      <span className="text-[#6B7280]" style={{ fontSize: "0.72rem" }}>{app.rating} ({app.reviews})</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {app.skills.map((skill) => (
                        <span key={skill} className="px-2 py-0.5 bg-[#F5F3FF] text-[#6C63FF] rounded-lg" style={{ fontSize: "0.68rem", fontWeight: 500 }}>{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-purple-50">
                  <span className="text-[#9CA3AF]" style={{ fontSize: "0.72rem" }}>Applied {app.appliedDate}</span>
                  <div className="flex gap-1">
                    <button
                      onClick={(e) => { e.stopPropagation(); updateStatus(app.id, "hired"); }}
                      className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                      style={{ fontSize: "0.72rem", fontWeight: 500 }}
                    >
                      <ThumbsUp size={11} /> Hire
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); updateStatus(app.id, "rejected"); }}
                      className="flex items-center gap-1 px-2 py-1 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                      style={{ fontSize: "0.72rem", fontWeight: 500 }}
                    >
                      <ThumbsDown size={11} /> Reject
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Applicant Detail Panel */}
          {selectedApplicant && (
            <div className="w-80 flex-shrink-0">
              <div className="bg-white rounded-2xl border border-purple-100 p-5 sticky top-0">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "0.95rem" }}>Applicant Detail</p>
                  <button onClick={() => setSelectedApplicant(null)} className="p-1.5 rounded-lg hover:bg-purple-50 transition-colors">
                    <X size={14} className="text-[#9CA3AF]" />
                  </button>
                </div>

                <div className="text-center mb-4">
                  <img src={selectedApplicant.img} alt={selectedApplicant.name} className="w-16 h-16 rounded-2xl object-cover border-4 border-purple-100 mx-auto mb-2" />
                  <p className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1rem" }}>{selectedApplicant.name}</p>
                  <p className="text-[#6B7280]" style={{ fontSize: "0.8rem" }}>{selectedApplicant.role}</p>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <Stars rating={selectedApplicant.rating} />
                    <span style={{ fontSize: "0.78rem", color: "#1A1A3E", fontWeight: 600 }}>{selectedApplicant.rating}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="p-3 bg-[#F5F3FF] rounded-xl">
                    <p className="text-[#9CA3AF] mb-1" style={{ fontSize: "0.72rem", fontWeight: 500 }}>COVER NOTE</p>
                    <p className="text-[#6B7280]" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>{selectedApplicant.coverNote}</p>
                  </div>
                  <div className="flex justify-between py-2 border-b border-purple-50">
                    <span className="text-[#9CA3AF]" style={{ fontSize: "0.78rem" }}>Applied</span>
                    <span className="text-[#1A1A3E]" style={{ fontSize: "0.78rem", fontWeight: 500 }}>{selectedApplicant.appliedDate}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-purple-50">
                    <span className="text-[#9CA3AF]" style={{ fontSize: "0.78rem" }}>Location</span>
                    <span className="text-[#1A1A3E]" style={{ fontSize: "0.78rem", fontWeight: 500 }}>{selectedApplicant.location}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-[#9CA3AF]" style={{ fontSize: "0.78rem" }}>Status</span>
                    <span className="px-2 py-0.5 rounded-lg" style={{ backgroundColor: STATUS_CONFIG[selectedApplicant.status].bg, color: STATUS_CONFIG[selectedApplicant.status].color, fontSize: "0.7rem", fontWeight: 600 }}>
                      {STATUS_CONFIG[selectedApplicant.status].label}
                    </span>
                  </div>
                </div>

                {/* Status Actions */}
                <p className="text-[#9CA3AF] mb-2" style={{ fontSize: "0.72rem", fontWeight: 500 }}>CHANGE STATUS</p>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {(["shortlisted", "interviewed", "hired", "rejected"] as ApplicantStatus[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selectedApplicant.id, s)}
                      className={`py-1.5 rounded-xl capitalize transition-all ${
                        selectedApplicant.status === s
                          ? "font-semibold border-2"
                          : "opacity-60 hover:opacity-100 border border-dashed border-purple-100"
                      }`}
                      style={{
                        backgroundColor: STATUS_CONFIG[s].bg,
                        color: STATUS_CONFIG[s].color,
                        fontSize: "0.72rem",
                        fontWeight: selectedApplicant.status === s ? 700 : 400,
                        borderColor: selectedApplicant.status === s ? STATUS_CONFIG[s].color : undefined,
                      }}
                    >
                      {STATUS_CONFIG[s].label}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => navigate("/dashboard/messages")}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-xl hover:opacity-90 transition-opacity"
                    style={{ fontSize: "0.8rem", fontWeight: 600 }}
                  >
                    <MessageSquare size={14} /> Message
                  </button>
                  <button
                    onClick={() => navigate(`/employee/${selectedApplicant.id}`)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-[#F0EEFF] text-[#6C63FF] rounded-xl hover:bg-purple-100 transition-colors"
                    style={{ fontSize: "0.8rem", fontWeight: 600 }}
                  >
                    <Eye size={14} /> Profile
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
