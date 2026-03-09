import { useNavigate } from "react-router";
import { useState } from "react";
import { FileText, Clock, CheckCircle, XCircle, Eye, MapPin, Building2, ChevronRight } from "lucide-react";

const APPLICATIONS = [
  { id: 1, title: "React Native Developer", company: "Djezzy",         location: "Algiers",     salary: "80,000–120,000 DA", type: "Full-time", status: "reviewing",   appliedAt: "3 days ago",  logo: "🟠", note: "Your application is being reviewed by the hiring team." },
  { id: 2, title: "iOS Developer",          company: "Air Algérie",    location: "Algiers",     salary: "75,000–110,000 DA", type: "Full-time", status: "shortlisted", appliedAt: "1 week ago",  logo: "✈️", note: "Congratulations! You've been shortlisted. Expect a call soon." },
  { id: 3, title: "Android Developer",      company: "Sonatrach",      location: "Algiers",     salary: "70,000–100,000 DA", type: "Full-time", status: "reviewing",   appliedAt: "1 week ago",  logo: "🔵", note: "Application received and under initial review." },
  { id: 4, title: "Full Stack Developer",   company: "Algérie Télécom",location: "Constantine", salary: "65,000–95,000 DA",  type: "Full-time", status: "rejected",    appliedAt: "2 weeks ago", logo: "🟣", note: "Unfortunately you were not selected for this role." },
  { id: 5, title: "Flutter Developer",      company: "Mobilis",        location: "Oran",        salary: "60,000–90,000 DA",  type: "Contract",  status: "shortlisted", appliedAt: "2 weeks ago", logo: "🟢", note: "Great news! The team wants to schedule an interview." },
];

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any; bg: string }> = {
  reviewing:   { label: "Reviewing",   color: "text-[#D97706]", icon: Clock,         bg: "bg-[#FEF3C7]" },
  shortlisted: { label: "Shortlisted", color: "text-[#059669]", icon: CheckCircle,   bg: "bg-[#D1FAE5]" },
  rejected:    { label: "Rejected",    color: "text-[#DC2626]", icon: XCircle,       bg: "bg-[#FEE2E2]" },
};

export default function ApplicationsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? APPLICATIONS : APPLICATIONS.filter(a => a.status === filter);

  const counts = {
    all: APPLICATIONS.length,
    reviewing: APPLICATIONS.filter(a => a.status === "reviewing").length,
    shortlisted: APPLICATIONS.filter(a => a.status === "shortlisted").length,
    rejected: APPLICATIONS.filter(a => a.status === "rejected").length,
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[#1A1A3E] mb-1" style={{ fontSize: "2rem", fontWeight: 800 }}>My Applications</h1>
        <p className="text-[#6B7280]" style={{ fontSize: "0.95rem" }}>Track all your applied jobs and their status.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { key: "all",         label: "Total Applied",  color: "from-[#6D28D9] to-[#8B5CF6]", icon: FileText    },
          { key: "reviewing",   label: "Under Review",   color: "from-[#F59E0B] to-[#D97706]", icon: Clock       },
          { key: "shortlisted", label: "Shortlisted",    color: "from-[#10B981] to-[#059669]", icon: CheckCircle },
          { key: "rejected",    label: "Not Selected",   color: "from-[#EF4444] to-[#DC2626]", icon: XCircle     },
        ].map(s => (
          <div key={s.key} className={`bg-white/90 rounded-2xl p-5 border shadow-sm cursor-pointer transition-all ${filter === s.key ? "border-[#6D28D9] ring-2 ring-[#6D28D9]/20" : "border-[#E5E7EB] hover:border-[#6D28D9]"}`} onClick={() => setFilter(s.key)}>
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
              <s.icon size={18} className="text-white" />
            </div>
            <p className="text-[#1A1A3E]" style={{ fontSize: "1.7rem", fontWeight: 800, lineHeight: 1 }}>{counts[s.key as keyof typeof counts]}</p>
            <p className="text-[#6B7280] mt-1" style={{ fontSize: "0.78rem" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {["all","reviewing","shortlisted","rejected"].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl border capitalize transition-all ${filter === f ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white border-transparent shadow-md" : "bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#6D28D9]"}`}
            style={{ fontSize: "0.85rem", fontWeight: 600 }}>
            {f === "all" ? "All Applications" : STATUS_CONFIG[f].label} {f !== "all" && `(${counts[f as keyof typeof counts]})`}
          </button>
        ))}
      </div>

      {/* Applications list */}
      <div className="space-y-4">
        {filtered.map(app => {
          const s = STATUS_CONFIG[app.status];
          return (
            <div key={app.id} className="bg-white/90 rounded-2xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all overflow-hidden">
              <div className="flex items-center gap-5 p-5">
                <div className="w-14 h-14 rounded-2xl bg-[#F3F4F6] flex items-center justify-center text-3xl flex-shrink-0">{app.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-[#1A1A3E]" style={{ fontSize: "1rem", fontWeight: 700 }}>{app.title}</h3>
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${s.bg} ${s.color}`} style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                      <s.icon size={13} /> {s.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-1"><Building2 size={13} className="text-[#9CA3AF]" /><span className="text-[#6B7280]" style={{ fontSize: "0.8rem" }}>{app.company}</span></div>
                    <div className="flex items-center gap-1"><MapPin size={13} className="text-[#9CA3AF]" /><span className="text-[#6B7280]" style={{ fontSize: "0.8rem" }}>{app.location}</span></div>
                    <span className="px-2 py-0.5 bg-[#F0EEFF] text-[#6D28D9] rounded-md" style={{ fontSize: "0.72rem", fontWeight: 600 }}>{app.type}</span>
                  </div>
                  <div className={`flex items-start gap-2 px-3 py-2 rounded-xl ${s.bg} mt-2`}>
                    <s.icon size={14} className={`${s.color} flex-shrink-0 mt-0.5`} />
                    <p className={`${s.color}`} style={{ fontSize: "0.78rem", fontWeight: 500 }}>{app.note}</p>
                  </div>
                </div>
              </div>
              <div className={`flex items-center justify-between px-5 py-3 border-t border-[#F3F4F6] bg-[#FAFAFA]`}>
                <div>
                  <span className="text-[#1A1A3E]" style={{ fontSize: "0.88rem", fontWeight: 700 }}>{app.salary}</span>
                  <span className="text-[#9CA3AF] ml-3" style={{ fontSize: "0.75rem" }}>Applied {app.appliedAt}</span>
                </div>
                <button onClick={() => navigate("/dashboard/jobs")} className="flex items-center gap-1.5 px-4 py-2 bg-[#F0EEFF] text-[#6D28D9] rounded-xl hover:bg-[#E5E0FF] transition-all" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
                  <Eye size={14} /> View Job <ChevronRight size={13} />
                </button>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <FileText size={48} className="text-[#D1D5DB] mx-auto mb-3" />
            <p className="text-[#6B7280]" style={{ fontSize: "1rem" }}>No applications in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
