import { useNavigate } from "react-router";
import { Bell, Briefcase, CheckCircle, Clock, ChevronRight, Star, TrendingUp, MapPin, Bookmark } from "lucide-react";
import imgProfile from "../../../assets/225350e362ddcd84f3581c2fdf7b5ea867eadc53.png";

const RECOMMENDED_JOBS = [
  { id: 1, title: "React Native Developer", company: "Djezzy", location: "Algiers", salary: "80,000–120,000 DA", type: "Full-time", match: 97, posted: "2h ago", logo: "🟠" },
  { id: 2, title: "Mobile App Developer", company: "Yassir", location: "Algiers", salary: "70,000–100,000 DA", type: "Full-time", match: 93, posted: "5h ago", logo: "🟡" },
  { id: 3, title: "Flutter Developer", company: "Mobilis", location: "Oran", salary: "60,000–90,000 DA", type: "Contract", match: 88, posted: "1 day ago", logo: "🟢" },
];

const RECENT_APPLICATIONS = [
  { id: 1, title: "Android Developer", company: "Sonatrach", status: "reviewing", appliedAt: "3 days ago", logo: "🔵" },
  { id: 2, title: "iOS Developer", company: "Air Algérie", status: "shortlisted", appliedAt: "1 week ago", logo: "🔴" },
  { id: 3, title: "Full Stack Developer", company: "Algérie Télécom", status: "rejected", appliedAt: "2 weeks ago", logo: "🟣" },
];

const NOTIFICATIONS = [
  { id: 1, text: "Yassir viewed your profile", time: "30 min ago", type: "view" },
  { id: 2, text: "Your application to Air Algérie was shortlisted!", time: "2h ago", type: "success" },
  { id: 3, text: "New job match: Flutter Developer at Mobilis", time: "5h ago", type: "job" },
];

const statusStyle: Record<string, string> = {
  reviewing:   "bg-[#FEF3C7] text-[#D97706]",
  shortlisted: "bg-[#D1FAE5] text-[#059669]",
  rejected:    "bg-[#FEE2E2] text-[#DC2626]",
};
const statusLabel: Record<string, string> = {
  reviewing: "Reviewing", shortlisted: "Shortlisted", rejected: "Rejected",
};

export default function DashboardHome() {
  const navigate = useNavigate();
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#1A1A3E] mb-1" style={{ fontSize: "2rem", fontWeight: 800 }}>Welcome back, Karim 👋</h1>
          <p className="text-[#6B7280]" style={{ fontSize: "0.95rem" }}>Here's what's happening with your job hunt today.</p>
        </div>
        <img src={imgProfile} alt="Profile" className="w-14 h-14 rounded-2xl object-cover ring-4 ring-[#6D28D9]/20 shadow-md" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Profile Views", value: "48", delta: "+12 this week", icon: TrendingUp, color: "from-[#6D28D9] to-[#8B5CF6]" },
          { label: "Jobs Applied",  value: "7",  delta: "3 active",       icon: Briefcase,   color: "from-[#2563EB] to-[#3B82F6]" },
          { label: "Shortlisted",   value: "2",  delta: "1 new",          icon: CheckCircle, color: "from-[#10B981] to-[#059669]" },
          { label: "Saved Jobs",    value: "11", delta: "Browse more",    icon: Bookmark,    color: "from-[#EC4899] to-[#BE185D]" },
        ].map((s) => (
          <div key={s.label} className="bg-white/90 rounded-2xl p-5 border border-[#E5E7EB] shadow-sm">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
              <s.icon size={20} className="text-white" />
            </div>
            <p className="text-[#1A1A3E]" style={{ fontSize: "1.8rem", fontWeight: 800, lineHeight: 1 }}>{s.value}</p>
            <p className="text-[#6B7280] mt-1" style={{ fontSize: "0.78rem" }}>{s.label}</p>
            <p className="text-[#6D28D9] mt-0.5" style={{ fontSize: "0.72rem", fontWeight: 600 }}>{s.delta}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recommended Jobs */}
        <div className="col-span-2 bg-white/90 rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#F3F4F6]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6D28D9] to-[#8B5CF6] flex items-center justify-center">
                <Star size={15} className="text-white" />
              </div>
              <h2 className="text-[#1A1A3E]" style={{ fontSize: "1rem", fontWeight: 700 }}>Recommended Jobs</h2>
            </div>
            <button onClick={() => navigate("/dashboard/jobs")} className="flex items-center gap-1 text-[#6D28D9]" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
              View all <ChevronRight size={14} />
            </button>
          </div>
          <div className="divide-y divide-[#F3F4F6]">
            {RECOMMENDED_JOBS.map((job) => (
              <div key={job.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#F8F7FF] transition-colors cursor-pointer group" onClick={() => navigate("/dashboard/jobs")}>
                <div className="w-11 h-11 rounded-xl bg-[#F3F4F6] flex items-center justify-center flex-shrink-0 text-xl">{job.logo}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#1A1A3E]" style={{ fontSize: "0.92rem", fontWeight: 600 }}>{job.title}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-[#6B7280]" style={{ fontSize: "0.78rem" }}>{job.company}</span>
                    <div className="flex items-center gap-1"><MapPin size={11} className="text-[#9CA3AF]" /><span className="text-[#9CA3AF]" style={{ fontSize: "0.73rem" }}>{job.location}</span></div>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="px-2 py-0.5 bg-[#F0EEFF] text-[#6D28D9] rounded-md" style={{ fontSize: "0.7rem", fontWeight: 600 }}>{job.type}</span>
                    <span className="text-[#6B7280]" style={{ fontSize: "0.73rem" }}>{job.salary}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <span className="px-2.5 py-1 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-lg" style={{ fontSize: "0.72rem", fontWeight: 700 }}>{job.match}% match</span>
                  <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>{job.posted}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white/90 rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[#F3F4F6]">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center">
              <Bell size={15} className="text-white" />
            </div>
            <h2 className="text-[#1A1A3E]" style={{ fontSize: "1rem", fontWeight: 700 }}>Notifications</h2>
            <span className="ml-auto px-2 py-0.5 bg-[#FEF3C7] text-[#D97706] rounded-full" style={{ fontSize: "0.7rem", fontWeight: 700 }}>{NOTIFICATIONS.length}</span>
          </div>
          <div className="divide-y divide-[#F3F4F6]">
            {NOTIFICATIONS.map((n) => (
              <div key={n.id} className="px-5 py-3.5 hover:bg-[#FFFBEB] transition-colors cursor-pointer">
                <div className="flex items-start gap-2.5">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.type === "success" ? "bg-[#10B981]" : n.type === "view" ? "bg-[#6D28D9]" : "bg-[#F59E0B]"}`} />
                  <div>
                    <p className="text-[#1A1A3E]" style={{ fontSize: "0.82rem", fontWeight: 500 }}>{n.text}</p>
                    <p className="text-[#9CA3AF] mt-0.5" style={{ fontSize: "0.72rem" }}>{n.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white/90 rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F3F4F6]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center">
              <Clock size={15} className="text-white" />
            </div>
            <h2 className="text-[#1A1A3E]" style={{ fontSize: "1rem", fontWeight: 700 }}>Recent Applications</h2>
          </div>
          <button onClick={() => navigate("/dashboard/applications")} className="flex items-center gap-1 text-[#6D28D9]" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
            View all <ChevronRight size={14} />
          </button>
        </div>
        <div className="divide-y divide-[#F3F4F6]">
          {RECENT_APPLICATIONS.map((app) => (
            <div key={app.id} className="flex items-center gap-4 px-6 py-4 hover:bg-[#F8F7FF] transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-[#F3F4F6] flex items-center justify-center text-lg flex-shrink-0">{app.logo}</div>
              <div className="flex-1">
                <p className="text-[#1A1A3E]" style={{ fontSize: "0.92rem", fontWeight: 600 }}>{app.title}</p>
                <p className="text-[#6B7280]" style={{ fontSize: "0.78rem" }}>{app.company} · Applied {app.appliedAt}</p>
              </div>
              <span className={`px-3 py-1 rounded-full ${statusStyle[app.status]}`} style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                {statusLabel[app.status]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
