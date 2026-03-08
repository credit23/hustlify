import { useNavigate } from "react-router";
import { TrendingUp, Users, MessageSquare, Briefcase, ChevronRight, Star, Clock, Award } from "lucide-react";
import imgImage6 from "figma:asset/225350e362ddcd84f3581c2fdf7b5ea867eadc53.png";

const ACTIVE_JOBS = [
  { id: "1", title: "React Developer needed", candidates: 8, status: "active", posted: "2 days ago", budget: "120,000 DZD" },
  { id: "2", title: "UX Designer for landing page", candidates: 5, status: "active", posted: "5 days ago", budget: "45,000 DZD" },
  { id: "3", title: "Content Writer (French/Arabic)", candidates: 12, status: "reviewing", posted: "1 week ago", budget: "30,000 DZD" },
];

const CONTACTED_WORKERS = [
  {
    id: 1,
    name: "Karim Benali",
    role: "Developer",
    lastMessage: "Sure, I can start next week",
    time: "2h ago",
    img: imgImage6,
    unread: true,
  },
  {
    id: 2,
    name: "Sonia Amrani",
    role: "Designer",
    lastMessage: "Thank you for reaching out!",
    time: "1 day ago",
    img: imgImage6,
    unread: false,
  },
  {
    id: 3,
    name: "Ahmed Meziani",
    role: "Plumber",
    lastMessage: "I'm available this weekend",
    time: "3 days ago",
    img: imgImage6,
    unread: false,
  },
];

export default function OverviewPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-[#1A1A3E] mb-2" style={{ fontSize: "2.25rem", fontWeight: 700 }}>
          Dashboard Overview
        </h1>
        <p className="text-[#6B7280]" style={{ fontSize: "1rem" }}>
          Welcome back! Here's what's happening with your projects.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#E5E7EB] shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6D28D9] to-[#8B5CF6] flex items-center justify-center">
              <Briefcase size={24} className="text-white" />
            </div>
            <div className="px-3 py-1 bg-[#D1FAE5] rounded-full">
              <span className="text-[#059669]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                +12%
              </span>
            </div>
          </div>
          <p className="text-[#6B7280] mb-1" style={{ fontSize: "0.9rem" }}>
            Active Jobs
          </p>
          <p className="text-[#1A1A3E]" style={{ fontSize: "2rem", fontWeight: 700 }}>
            3
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#E5E7EB] shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center">
              <Users size={24} className="text-white" />
            </div>
            <div className="px-3 py-1 bg-[#FEF3C7] rounded-full">
              <span className="text-[#D97706]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                +25
              </span>
            </div>
          </div>
          <p className="text-[#6B7280] mb-1" style={{ fontSize: "0.9rem" }}>
            Total Candidates
          </p>
          <p className="text-[#1A1A3E]" style={{ fontSize: "2rem", fontWeight: 700 }}>
            25
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#E5E7EB] shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center">
              <MessageSquare size={24} className="text-white" />
            </div>
            <div className="px-3 py-1 bg-[#DBEAFE] rounded-full">
              <span className="text-[#2563EB]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                3 New
              </span>
            </div>
          </div>
          <p className="text-[#6B7280] mb-1" style={{ fontSize: "0.9rem" }}>
            Messages
          </p>
          <p className="text-[#1A1A3E]" style={{ fontSize: "2rem", fontWeight: 700 }}>
            12
          </p>
        </div>
      </div>

      {/* Active Jobs Section */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#E5E7EB] shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-[#1A1A3E]" style={{ fontSize: "1.25rem", fontWeight: 700 }}>
            Active Job Posts
          </h3>
          <button
            onClick={() => navigate("/client/jobs")}
            className="flex items-center gap-1 text-[#6D28D9] hover:text-[#5B21B6] transition-colors"
            style={{ fontSize: "0.9rem", fontWeight: 600 }}
          >
            View All
            <ChevronRight size={16} />
          </button>
        </div>
        <div className="space-y-4">
          {ACTIVE_JOBS.map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between p-4 bg-[#F8F7FF] rounded-xl hover:bg-[#F0EEFF] transition-colors cursor-pointer"
            >
              <div className="flex-1">
                <h4 className="text-[#1A1A3E] mb-1" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                  {job.title}
                </h4>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Users size={14} className="text-[#6B7280]" />
                    <span className="text-[#6B7280]" style={{ fontSize: "0.8rem" }}>
                      {job.candidates} candidates
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-[#6B7280]" />
                    <span className="text-[#6B7280]" style={{ fontSize: "0.8rem" }}>
                      {job.posted}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[#1A1A3E]" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                  {job.budget}
                </span>
                <span
                  className={`px-3 py-1 rounded-full ${
                    job.status === "active"
                      ? "bg-[#D1FAE5] text-[#059669]"
                      : "bg-[#FEF3C7] text-[#D97706]"
                  }`}
                  style={{ fontSize: "0.75rem", fontWeight: 600 }}
                >
                  {job.status === "active" ? "Active" : "Reviewing"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Recent Messages */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#E5E7EB] shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[#1A1A3E]" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
              Recent Messages
            </h3>
            <button
              onClick={() => navigate("/client/messages")}
              className="flex items-center gap-1 text-[#6D28D9] hover:text-[#5B21B6] transition-colors"
              style={{ fontSize: "0.85rem", fontWeight: 600 }}
            >
              View All
              <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-3">
            {CONTACTED_WORKERS.slice(0, 3).map((worker) => (
              <div
                key={worker.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#F8F7FF] transition-colors cursor-pointer"
              >
                <img src={worker.img} alt={worker.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[#1A1A3E]" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                      {worker.name}
                    </p>
                    {worker.unread && <div className="w-2.5 h-2.5 bg-[#6D28D9] rounded-full" />}
                  </div>
                  <p className="text-[#6B7280] truncate" style={{ fontSize: "0.8rem" }}>
                    {worker.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-[#E5E7EB] shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-[#1A1A3E]" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
              Recent Activity
            </h3>
          </div>
          <div className="space-y-4">
            {[
              { action: "New application", name: "Karim Benali", time: "2h ago", type: "application" },
              { action: "Message received", name: "Sonia Amrani", time: "5h ago", type: "message" },
              { action: "Profile viewed", name: "Ahmed Meziani", time: "1d ago", type: "view" },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3 pb-4 border-b border-[#F3F4F6] last:border-0 last:pb-0">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    activity.type === "application"
                      ? "bg-[#F0EEFF]"
                      : activity.type === "message"
                      ? "bg-[#EBF4FF]"
                      : "bg-[#FCE7F3]"
                  }`}
                >
                  {activity.type === "application" && <Briefcase size={14} className="text-[#6D28D9]" />}
                  {activity.type === "message" && <MessageSquare size={14} className="text-[#2563EB]" />}
                  {activity.type === "view" && <Users size={14} className="text-[#EC4899]" />}
                </div>
                <div className="flex-1">
                  <p className="text-[#1A1A3E] mb-0.5" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    {activity.action}
                  </p>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.75rem" }}>
                    {activity.name}
                  </p>
                </div>
                <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
