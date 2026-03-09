import { useNavigate } from "react-router";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  MessageSquare,
  Bell,
  Settings,
  Plus,
  TrendingUp,
  CheckCircle,
  Clock,
  Star,
  Search,
  ChevronDown,
  Building2,
  BarChart3,
  Eye,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import hustlifyLogo from "../../../assets/ee079ff6b92e2af14de5404d0251f4a3326be5ea.png";

const chartData = [
  { month: "Aug", applications: 24 },
  { month: "Sep", applications: 38 },
  { month: "Oct", applications: 52 },
  { month: "Nov", applications: 41 },
  { month: "Dec", applications: 67 },
  { month: "Jan", applications: 84 },
];

const JOB_POSTS = [
  { id: "1", title: "Senior React Developer", dept: "Engineering", applicants: 23, status: "active", deadline: "Feb 28, 2026" },
  { id: "2", title: "UX/UI Designer", dept: "Product", applicants: 15, status: "active", deadline: "Mar 5, 2026" },
  { id: "3", title: "Data Scientist", dept: "Analytics", applicants: 8, status: "closed", deadline: "Jan 30, 2026" },
  { id: "4", title: "Digital Marketing Manager", dept: "Marketing", applicants: 31, status: "active", deadline: "Mar 10, 2026" },
];

const RECENT_APPLICANTS = [
  { name: "Karim Benali", role: "React Developer", rating: 4.9, status: "shortlisted", img: "https://images.unsplash.com/photo-1565687981296-535f09db714e?w=80&q=80" },
  { name: "Sonia Amrani", role: "UX Designer", rating: 5.0, status: "interviewed", img: "https://images.unsplash.com/photo-1765648580528-8d659861d81a?w=80&q=80" },
  { name: "Yacine Messaoud", role: "Data Scientist", rating: 4.7, status: "pending", img: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=80&q=80" },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Briefcase, label: "Job Posts" },
  { icon: Users, label: "Applicants" },
  { icon: MessageSquare, label: "Messages" },
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Settings" },
];

export default function EnterpriseDashboard() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("Dashboard");

  const statusColor: Record<string, string> = {
    shortlisted: "bg-blue-100 text-blue-600",
    interviewed: "bg-green-100 text-green-600",
    pending: "bg-yellow-100 text-yellow-600",
    hired: "bg-purple-100 text-purple-600",
    rejected: "bg-red-100 text-red-600",
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-[#F5F3FF] to-[#EBF4FF] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 bg-white/90 backdrop-blur-sm border-r border-purple-100 flex flex-col shadow-sm shrink-0">
        <div className="p-5 border-b border-purple-50">
          <button onClick={() => navigate("/")} className="flex items-center">
            <img src={hustlifyLogo} alt="Hustlify" className="h-10 object-contain" />
            <span className="block text-[#9CA3AF] ml-1" style={{ fontSize: "0.65rem" }}>Enterprise</span>
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setActiveNav(item.label);
                if (item.label === "Job Posts") navigate("/enterprise/jobs");
                if (item.label === "Applicants") navigate("/enterprise/jobs/1/applicants");
                if (item.label === "Messages") navigate("/dashboard/messages");
              }}
              className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all ${
                activeNav === item.label
                  ? "bg-gradient-to-r from-[#6C63FF]/10 to-[#9B8FFF]/10 text-[#6C63FF]"
                  : "text-[#6B7280] hover:bg-purple-50 hover:text-[#6C63FF]"
              }`}
            >
              <item.icon size={17} className={activeNav === item.label ? "text-[#6C63FF]" : "text-[#9CA3AF]"} />
              <span style={{ fontSize: "0.875rem", fontWeight: activeNav === item.label ? 600 : 400 }}>{item.label}</span>
            </button>
          ))}

          {/* Hustlify.AI */}
          <div className="pt-4 border-t border-purple-50 mt-4">
            <button
              onClick={() => navigate("/dashboard/hustlify-ai")}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all bg-gradient-to-r from-[#6C63FF]/5 to-[#9B8FFF]/5 text-[#6C63FF] hover:from-[#6C63FF]/10 hover:to-[#9B8FFF]/10"
            >
              <Sparkles size={17} className="text-[#6C63FF]" />
              <span style={{ fontSize: "0.875rem", fontWeight: 700 }}>Hustlify.AI</span>
              <span className="ml-auto px-1.5 py-0.5 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-md" style={{ fontSize: "0.6rem", fontWeight: 700 }}>
                NEW
              </span>
            </button>
          </div>
        </nav>
        <div className="p-4 border-t border-purple-50">
          <div className="flex items-center gap-2 px-2 py-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#9B8FFF] flex items-center justify-center">
              <Building2 size={14} className="text-white" />
            </div>
            <div>
              <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.78rem" }}>TechCorp DZ</p>
              <p className="text-[#9CA3AF]" style={{ fontSize: "0.68rem" }}>Enterprise Pro</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white/70 backdrop-blur-sm border-b border-purple-100 flex items-center px-6 gap-4">
          <div className="flex-1">
            <div className="relative max-w-xs">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input placeholder="Search..." className="w-full pl-8 pr-4 py-2 bg-[#F5F3FF] rounded-xl border border-purple-100 outline-none focus:border-[#6C63FF] text-sm text-[#1A1A3E] placeholder-[#9CA3AF]" />
            </div>
          </div>
          <button
            onClick={() => navigate("/enterprise/jobs")}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-xl hover:opacity-90 transition-opacity"
            style={{ fontSize: "0.875rem", fontWeight: 600 }}
          >
            <Plus size={15} />
            Post Job
          </button>
          <button className="relative p-2 rounded-xl hover:bg-purple-50">
            <Bell size={17} className="text-[#6B7280]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mb-5">
            <h1 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.4rem" }}>
              Enterprise Dashboard
            </h1>
            <p className="text-[#6B7280]" style={{ fontSize: "0.875rem" }}>TechCorp DZ · Alger, Algeria</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { icon: Briefcase, label: "Active Jobs", value: "12", change: "+3", color: "#6C63FF", bg: "#F0EEFF" },
              { icon: Users, label: "Total Applicants", value: "247", change: "+34", color: "#4F8EF7", bg: "#EBF4FF" },
              { icon: CheckCircle, label: "Hired This Month", value: "8", change: "+2", color: "#10B981", bg: "#D1FAE5" },
              { icon: Star, label: "Avg. Rating Given", value: "4.7", change: "↑", color: "#F59E0B", bg: "#FEF3C7" },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-2xl p-4 border border-purple-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.bg }}>
                    <stat.icon size={16} style={{ color: stat.color }} />
                  </div>
                  <span className="text-green-500" style={{ fontSize: "0.75rem", fontWeight: 600 }}>{stat.change} this week</span>
                </div>
                <p className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.5rem" }}>{stat.value}</p>
                <p className="text-[#9CA3AF]" style={{ fontSize: "0.78rem" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Applications Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-purple-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#1A1A3E] flex items-center gap-2" style={{ fontWeight: 700, fontSize: "1rem" }}>
                  <BarChart3 size={16} className="text-[#6C63FF]" />
                  Applications Overview
                </h3>
                <select className="text-[#6B7280] bg-[#F5F3FF] rounded-lg px-2 py-1 outline-none border border-purple-100" style={{ fontSize: "0.78rem" }}>
                  <option>Last 6 months</option>
                  <option>Last year</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0EEFF" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: "12px", border: "1px solid #E9D5FF", fontSize: "0.8rem" }}
                    cursor={{ fill: "#F0EEFF" }}
                  />
                  <Bar dataKey="applications" fill="url(#purpleGrad)" radius={[6, 6, 0, 0]} />
                  <defs>
                    <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6C63FF" />
                      <stop offset="100%" stopColor="#9B8FFF" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Applicants */}
            <div className="bg-white rounded-2xl border border-purple-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1rem" }}>Recent Applicants</h3>
                <button
                  onClick={() => navigate("/enterprise/jobs/1/applicants")}
                  className="text-[#6C63FF] hover:underline"
                  style={{ fontSize: "0.75rem" }}
                >
                  View all
                </button>
              </div>
              <div className="space-y-3">
                {RECENT_APPLICANTS.map((app) => (
                  <div key={app.name} className="flex items-center gap-3">
                    <img src={app.img} alt={app.name} className="w-9 h-9 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[#1A1A3E] truncate" style={{ fontWeight: 600, fontSize: "0.82rem" }}>{app.name}</p>
                      <p className="text-[#9CA3AF] truncate" style={{ fontSize: "0.72rem" }}>{app.role}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-lg capitalize ${statusColor[app.status]}`} style={{ fontSize: "0.65rem", fontWeight: 600 }}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Active Job Posts */}
          <div className="mt-5 bg-white rounded-2xl border border-purple-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1rem" }}>Active Job Posts</h3>
              <button
                onClick={() => navigate("/enterprise/jobs")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0EEFF] text-[#6C63FF] rounded-xl hover:bg-purple-100 transition-colors"
                style={{ fontSize: "0.78rem", fontWeight: 500 }}
              >
                <Plus size={13} />
                New Post
              </button>
            </div>
            <div className="space-y-2">
              {JOB_POSTS.map((job) => (
                <div key={job.id} className="flex items-center gap-4 p-3 bg-[#F5F3FF] rounded-xl hover:bg-purple-100/50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.875rem" }}>{job.title}</p>
                    <p className="text-[#9CA3AF]" style={{ fontSize: "0.75rem" }}>{job.dept} · Deadline: {job.deadline}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[#6B7280]" style={{ fontSize: "0.78rem" }}>
                      <Users size={13} />
                      {job.applicants}
                    </span>
                    <span className={`px-2 py-0.5 rounded-lg capitalize ${job.status === "active" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`} style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                      {job.status}
                    </span>
                    <button
                      onClick={() => navigate(`/enterprise/jobs/${job.id}/applicants`)}
                      className="p-1.5 rounded-lg hover:bg-purple-200 transition-colors"
                    >
                      <Eye size={14} className="text-[#6C63FF]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}