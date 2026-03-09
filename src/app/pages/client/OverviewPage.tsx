import { useNavigate } from "react-router";
import { Users, MessageSquare, Heart, ChevronRight, Star, MapPin, CheckCircle, X, Bookmark, Phone, ExternalLink } from "lucide-react";
import imgImage6 from "../../../assets/225350e362ddcd84f3581c2fdf7b5ea867eadc53.png";

const CONTACTED_WORKERS = [
  { id: 1, name: "Karim Benali", role: "Mobile Developer", location: "Constantine", rating: 4.9, lastMessage: "Sure, I can start next week!", time: "2h ago", img: imgImage6, available: true, unread: true, rate: "3200DA/H" },
  { id: 2, name: "Sonia Amrani", role: "UI/UX Designer", location: "Oran", rating: 4.8, lastMessage: "Thank you for reaching out, I'd love to discuss further.", time: "Yesterday", img: imgImage6, available: true, unread: false, rate: "2500DA/H" },
  { id: 3, name: "Ahmed Meziani", role: "Plumber", location: "Algiers, Bab El Oued", rating: 4.6, lastMessage: "I'm available this weekend, let me know!", time: "3 days ago", img: imgImage6, available: false, unread: false, rate: "1500DA/H" },
  { id: 4, name: "Nadia Ferhat", role: "Data Analyst", location: "Algiers, Kouba", rating: 4.8, lastMessage: "Sounds good, I'll send you my portfolio.", time: "4 days ago", img: imgImage6, available: true, unread: false, rate: "3200DA/H" },
];

const SAVED_EMPLOYEES = [
  { id: 1, name: "Yasmine Larbi", role: "Digital Marketer", location: "Oran", rating: 4.8, reviews: 118, img: imgImage6, available: false, rate: "2500DA/H", skills: ["SEO", "Ads"] },
  { id: 2, name: "Amira Khelifi", role: "Graphic Designer", location: "Tizi Ouzou", rating: 4.8, reviews: 102, img: imgImage6, available: false, rate: "2200DA/H", skills: ["Figma", "Adobe XD"] },
  { id: 3, name: "Bilal Mansouri", role: "Video Editor", location: "Batna", rating: 4.9, reviews: 141, img: imgImage6, available: true, rate: "2700DA/H", skills: ["Premiere", "After FX"] },
  { id: 4, name: "Dalila Mazouz", role: "Language Teacher", location: "Constantine", rating: 4.6, reviews: 68, img: imgImage6, available: false, rate: "1700DA/H", skills: ["French", "English"] },
  { id: 5, name: "Nawal Ghezali", role: "Legal Advisor", location: "Oran", rating: 4.7, reviews: 91, img: imgImage6, available: true, rate: "3500DA/H", skills: ["Contract Law"] },
  { id: 6, name: "Houria Benmoussa", role: "Interior Designer", location: "Algiers", rating: 4.9, reviews: 134, img: imgImage6, available: true, rate: "2600DA/H", skills: ["AutoCAD", "3D"] },
];

export default function OverviewPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-[#1A1A3E] mb-1" style={{ fontSize: "2.1rem", fontWeight: 700 }}>Dashboard</h1>
        <p className="text-[#6B7280]" style={{ fontSize: "1rem" }}>Welcome back, Alex! Here's your hiring activity.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-5">
        <div className="bg-white/90 rounded-2xl p-5 border border-[#E5E7EB] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#6D28D9] to-[#8B5CF6] flex items-center justify-center flex-shrink-0">
            <MessageSquare size={22} className="text-white" />
          </div>
          <div>
            <p className="text-[#6B7280]" style={{ fontSize: "0.82rem", fontWeight: 500 }}>Contacted Workers</p>
            <p className="text-[#1A1A3E]" style={{ fontSize: "1.8rem", fontWeight: 700, lineHeight: 1.1 }}>{CONTACTED_WORKERS.length}</p>
          </div>
        </div>
        <div className="bg-white/90 rounded-2xl p-5 border border-[#E5E7EB] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EC4899] to-[#BE185D] flex items-center justify-center flex-shrink-0">
            <Heart size={22} className="text-white" />
          </div>
          <div>
            <p className="text-[#6B7280]" style={{ fontSize: "0.82rem", fontWeight: 500 }}>Saved Employees</p>
            <p className="text-[#1A1A3E]" style={{ fontSize: "1.8rem", fontWeight: 700, lineHeight: 1.1 }}>{SAVED_EMPLOYEES.length}</p>
          </div>
        </div>
        <div className="bg-white/90 rounded-2xl p-5 border border-[#E5E7EB] shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center flex-shrink-0">
            <CheckCircle size={22} className="text-white" />
          </div>
          <div>
            <p className="text-[#6B7280]" style={{ fontSize: "0.82rem", fontWeight: 500 }}>Available Now</p>
            <p className="text-[#1A1A3E]" style={{ fontSize: "1.8rem", fontWeight: 700, lineHeight: 1.1 }}>
              {CONTACTED_WORKERS.filter(w => w.available).length + SAVED_EMPLOYEES.filter(e => e.available).length}
            </p>
          </div>
        </div>
      </div>

      {/* Contacted Workers */}
      <div className="bg-white/90 rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F3F4F6]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6D28D9] to-[#8B5CF6] flex items-center justify-center">
              <MessageSquare size={16} className="text-white" />
            </div>
            <h2 className="text-[#1A1A3E]" style={{ fontSize: "1.1rem", fontWeight: 700 }}>Contacted Workers</h2>
            <span className="px-2 py-0.5 bg-[#F0EEFF] text-[#6D28D9] rounded-full" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
              {CONTACTED_WORKERS.length}
            </span>
          </div>
          <button
            onClick={() => navigate("/client/messages")}
            className="flex items-center gap-1 text-[#6D28D9] hover:text-[#5B21B6] transition-colors"
            style={{ fontSize: "0.85rem", fontWeight: 600 }}
          >
            View Messages <ChevronRight size={15} />
          </button>
        </div>

        <div className="divide-y divide-[#F3F4F6]">
          {CONTACTED_WORKERS.map((worker) => (
            <div
              key={worker.id}
              className="flex items-center gap-4 px-6 py-4 hover:bg-[#F8F7FF] transition-colors cursor-pointer group"
              onClick={() => navigate("/client/messages")}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <img src={worker.img} alt={worker.name} className="w-12 h-12 rounded-xl object-cover" />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${worker.available ? "bg-[#10B981]" : "bg-[#9CA3AF]"}`} />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-[#1A1A3E]" style={{ fontSize: "0.95rem", fontWeight: 600 }}>{worker.name}</p>
                  {worker.unread && (
                    <span className="px-2 py-0.5 bg-[#6D28D9] text-white rounded-full" style={{ fontSize: "0.65rem", fontWeight: 700 }}>NEW</span>
                  )}
                </div>
                <p className="text-[#6D28D9] mb-1" style={{ fontSize: "0.78rem", fontWeight: 600 }}>{worker.role}</p>
                <p className="text-[#9CA3AF] truncate" style={{ fontSize: "0.78rem" }}>"{worker.lastMessage}"</p>
              </div>

              {/* Meta */}
              <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                <span className="text-[#9CA3AF]" style={{ fontSize: "0.72rem" }}>{worker.time}</span>
                <div className="flex items-center gap-1">
                  <MapPin size={11} className="text-[#9CA3AF]" />
                  <span className="text-[#9CA3AF]" style={{ fontSize: "0.72rem" }}>{worker.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={11} className="fill-[#F59E0B] text-[#F59E0B]" />
                  <span className="text-[#1A1A3E]" style={{ fontSize: "0.78rem", fontWeight: 600 }}>{worker.rating}</span>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={(e) => { e.stopPropagation(); navigate("/client/messages"); }}
                className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-[#6D28D9] to-[#2563EB] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md"
              >
                <MessageSquare size={16} className="text-white" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Employees / Shortlist */}
      <div className="bg-white/90 rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F3F4F6]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#EC4899] to-[#BE185D] flex items-center justify-center">
              <Bookmark size={16} className="text-white" />
            </div>
            <h2 className="text-[#1A1A3E]" style={{ fontSize: "1.1rem", fontWeight: 700 }}>Saved Employees</h2>
            <span className="px-2 py-0.5 bg-[#FDF2F8] text-[#EC4899] rounded-full" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
              {SAVED_EMPLOYEES.length} shortlisted
            </span>
          </div>
          <button
            onClick={() => navigate("/client/browse")}
            className="flex items-center gap-1 text-[#EC4899] hover:text-[#BE185D] transition-colors"
            style={{ fontSize: "0.85rem", fontWeight: 600 }}
          >
            Browse More <ChevronRight size={15} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-0 divide-x divide-y divide-[#F3F4F6]">
          {SAVED_EMPLOYEES.map((emp) => (
            <div
              key={emp.id}
              className="p-5 hover:bg-[#FDF2F8] transition-colors cursor-pointer group"
              onClick={() => navigate(`/employee/${emp.id}`)}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="relative flex-shrink-0">
                  <img src={emp.img} alt={emp.name} className="w-11 h-11 rounded-xl object-cover" />
                  <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white ${emp.available ? "bg-[#10B981]" : "bg-[#9CA3AF]"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#1A1A3E] truncate" style={{ fontSize: "0.92rem", fontWeight: 700 }}>{emp.name}</p>
                  <p className="text-[#6D28D9]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>{emp.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 mb-2">
                <MapPin size={12} className="text-[#9CA3AF] flex-shrink-0" />
                <span className="text-[#9CA3AF] truncate" style={{ fontSize: "0.73rem" }}>{emp.location}</span>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1">
                  <Star size={12} className="fill-[#F59E0B] text-[#F59E0B]" />
                  <span className="text-[#1A1A3E]" style={{ fontSize: "0.8rem", fontWeight: 600 }}>{emp.rating}</span>
                  <span className="text-[#9CA3AF]" style={{ fontSize: "0.72rem" }}>({emp.reviews})</span>
                </div>
                <span className={`px-2 py-0.5 rounded-lg ${emp.available ? "bg-[#D1FAE5] text-[#059669]" : "bg-[#F3F4F6] text-[#9CA3AF]"}`} style={{ fontSize: "0.68rem", fontWeight: 600 }}>
                  {emp.available ? "Available" : "Busy"}
                </span>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {emp.skills.map((s, i) => (
                  <span key={i} className="px-2 py-0.5 bg-[#F0EEFF] text-[#6D28D9] rounded-md" style={{ fontSize: "0.68rem", fontWeight: 600 }}>{s}</span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#F3F4F6]">
                <span className="text-[#1A1A3E]" style={{ fontSize: "0.92rem", fontWeight: 700 }}>{emp.rate}</span>
                <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate("/client/messages"); }}
                    className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#6D28D9] to-[#2563EB] flex items-center justify-center shadow-sm"
                  >
                    <MessageSquare size={13} className="text-white" />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/employee/${emp.id}`); }}
                    className="w-7 h-7 rounded-lg bg-[#F0EEFF] flex items-center justify-center"
                  >
                    <ExternalLink size={13} className="text-[#6D28D9]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
