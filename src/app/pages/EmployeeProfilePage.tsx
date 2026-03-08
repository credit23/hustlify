import { useNavigate, useParams } from "react-router";
import {
  Star,
  MapPin,
  CheckCircle,
  MessageSquare,
  ArrowLeft,
  Award,
  Calendar,
  Clock,
  Share2,
  Heart,
  Briefcase,
  ExternalLink,
  Shield,
} from "lucide-react";
import PublicNavbar from "./../../app/components/layout/PublicNavbar";

const EMPLOYEES_DATA: Record<string, any> = {
  "1": {
    name: "Karim Benali",
    role: "Full-Stack Developer",
    rating: 4.9,
    reviews: 142,
    location: "Alger, Algeria",
    available: true,
    img: "https://images.unsplash.com/photo-1565687981296-535f09db714e?w=300&q=80",
    hourlyRate: "3,500 DZD/hr",
    experience: "5 years",
    skills: ["React", "Node.js", "PostgreSQL", "TypeScript", "Docker", "AWS", "MongoDB", "Redis"],
    bio: "Senior Full-Stack Developer with 5+ years of experience building scalable web applications. I specialize in modern JavaScript frameworks and cloud architecture. I've worked with startups and enterprises across Algeria, delivering high-quality products on time.",
    portfolio: [
      { title: "E-Commerce Platform", desc: "Built a full e-commerce solution handling 50k+ daily users.", tags: ["React", "Node.js", "MongoDB"] },
      { title: "HR Management SaaS", desc: "Enterprise HR system for 200-employee company.", tags: ["Vue.js", "PostgreSQL", "Docker"] },
    ],
    reviews_list: [
      { author: "Alex J.", rating: 5, text: "Outstanding developer. Delivered the project ahead of schedule with excellent code quality.", date: "Jan 2026", img: "https://images.unsplash.com/photo-1738750908048-14200459c3c9?w=60&q=80" },
      { author: "Sonia A.", rating: 5, text: "Very professional and communicative throughout the entire project.", date: "Dec 2025", img: "https://images.unsplash.com/photo-1765648580528-8d659861d81a?w=60&q=80" },
    ],
  },
  "2": {
    name: "Jessica Lee",
    role: "UX/UI Designer",
    rating: 5.0,
    reviews: 98,
    location: "Oran, Algeria",
    available: true,
    img: "https://images.unsplash.com/photo-1765648580528-8d659861d81a?w=300&q=80",
    hourlyRate: "2,800 DZD/hr",
    experience: "4 years",
    skills: ["Figma", "Branding", "Adobe XD", "Illustration", "Motion Design", "Prototyping"],
    bio: "Creative UX/UI Designer passionate about crafting beautiful and intuitive digital experiences. I work closely with clients to understand their vision and translate it into stunning designs.",
    portfolio: [],
    reviews_list: [],
  },
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={14} className={i <= Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"} />
      ))}
    </div>
  );
}

export default function EmployeeProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const emp = EMPLOYEES_DATA[id || "1"] || EMPLOYEES_DATA["1"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] to-[#EBF4FF]">
      <PublicNavbar />
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#6B7280] hover:text-[#6D28D9] mb-6 transition-colors"
          style={{ fontSize: "0.875rem" }}
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left: Profile Card */}
          <div className="space-y-4">
            {/* Main card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
              <div className="relative inline-block mb-3">
                <img
                  src={emp.img}
                  alt={emp.name}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-blue-100 mx-auto"
                />
                {emp.available && (
                  <div className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-green-400 border-3 border-white" />
                )}
              </div>
              <h1 className="text-[#1A1A3E] mb-1" style={{ fontWeight: 700, fontSize: "1.2rem" }}>
                {emp.name}
              </h1>
              <p className="text-[#6B7280] mb-2" style={{ fontSize: "0.875rem" }}>
                {emp.role}
              </p>
              <div className="flex items-center justify-center gap-1 mb-1">
                <StarRating rating={emp.rating} />
                <span className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.875rem" }}>
                  {emp.rating}
                </span>
              </div>
              <p className="text-[#9CA3AF] mb-3" style={{ fontSize: "0.75rem" }}>
                ({emp.reviews} reviews)
              </p>

              <div className="flex flex-wrap gap-2 justify-center mb-4">
                <span className="flex items-center gap-1 text-[#6B7280]" style={{ fontSize: "0.78rem" }}>
                  <MapPin size={12} className="text-[#9CA3AF]" />
                  {emp.location}
                </span>
                <span className="flex items-center gap-1" style={{ fontSize: "0.78rem" }}>
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-green-600">Available</span>
                </span>
              </div>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => navigate("/dashboard/messages")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:opacity-90 transition-opacity"
                  style={{ fontWeight: 600, fontSize: "0.85rem" }}
                >
                  <MessageSquare size={15} />
                  Contact
                </button>
                <button className="p-2.5 bg-blue-50 border border-slate-200 rounded-xl hover:bg-blue-100 transition-colors">
                  <Heart size={16} className="text-[#6D28D9]" />
                </button>
                <button className="p-2.5 bg-blue-50 border border-slate-200 rounded-xl hover:bg-blue-100 transition-colors">
                  <Share2 size={16} className="text-[#6D28D9]" />
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100">
                {[
                  { icon: Clock, label: "Rate", value: emp.hourlyRate },
                  { icon: Briefcase, label: "Exp.", value: emp.experience },
                  { icon: CheckCircle, label: "Jobs", value: "18" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <s.icon size={14} className="text-[#6D28D9] mx-auto mb-1" />
                    <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.8rem" }}>{s.value}</p>
                    <p className="text-[#9CA3AF]" style={{ fontSize: "0.68rem" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="text-[#1A1A3E] mb-3" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                Trust & Badges
              </h3>
              <div className="space-y-2.5">
                {[
                  { icon: CheckCircle, label: "Identity Verified", color: "#10B981", bg: "#D1FAE5" },
                  { icon: Shield, label: "Background Checked", color: "#6D28D9", bg: "#EEF2FF" },
                  { icon: Award, label: "Top Rated Badge", color: "#F59E0B", bg: "#FEF3C7" },
                  { icon: Star, label: "5-Star Average", color: "#6D28D9", bg: "#EEF2FF" },
                ].map((badge) => (
                  <div
                    key={badge.label}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl"
                    style={{ backgroundColor: badge.bg }}
                  >
                    <badge.icon size={15} style={{ color: badge.color }} />
                    <span style={{ color: badge.color, fontSize: "0.78rem", fontWeight: 600 }}>
                      {badge.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="text-[#1A1A3E] mb-3" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                Availability
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <Calendar size={15} className="text-[#6D28D9]" />
                <span className="text-[#6B7280]" style={{ fontSize: "0.8rem" }}>Available from Jan 20, 2026</span>
              </div>
              <div className="flex gap-1 flex-wrap">
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => (
                  <span key={day} className="px-2 py-1 bg-[#EEF2FF] text-[#6D28D9] rounded-lg" style={{ fontSize: "0.72rem", fontWeight: 500 }}>
                    {day}
                  </span>
                ))}
                {["Sat", "Sun"].map((day) => (
                  <span key={day} className="px-2 py-1 bg-gray-100 text-[#9CA3AF] rounded-lg" style={{ fontSize: "0.72rem" }}>
                    {day}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Details */}
          <div className="md:col-span-2 space-y-5">
            {/* About */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-[#1A1A3E] mb-3" style={{ fontWeight: 700, fontSize: "1.05rem" }}>About</h2>
              <p className="text-[#6B7280]" style={{ fontSize: "0.875rem", lineHeight: 1.7 }}>{emp.bio}</p>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h2 className="text-[#1A1A3E] mb-4" style={{ fontWeight: 700, fontSize: "1.05rem" }}>Skills & Expertise</h2>
              <div className="flex flex-wrap gap-2">
                {emp.skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-blue-50 text-[#6D28D9] rounded-xl"
                    style={{ fontSize: "0.8rem", fontWeight: 500 }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Portfolio */}
            {emp.portfolio.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="text-[#1A1A3E] mb-4" style={{ fontWeight: 700, fontSize: "1.05rem" }}>Portfolio</h2>
                <div className="grid grid-cols-1 gap-4">
                  {emp.portfolio.map((project: any) => (
                    <div key={project.title} className="bg-blue-50 rounded-xl p-4 border border-slate-200">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.9rem" }}>{project.title}</p>
                        <button className="p-1 rounded-lg hover:bg-blue-100 transition-colors">
                          <ExternalLink size={14} className="text-[#6D28D9]" />
                        </button>
                      </div>
                      <p className="text-[#6B7280] mb-2" style={{ fontSize: "0.8rem" }}>{project.desc}</p>
                      <div className="flex gap-1.5">
                        {project.tags.map((tag: string) => (
                          <span key={tag} className="px-2 py-0.5 bg-white text-[#6D28D9] rounded-lg border border-slate-200" style={{ fontSize: "0.7rem", fontWeight: 500 }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {emp.reviews_list.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h2 className="text-[#1A1A3E] mb-4" style={{ fontWeight: 700, fontSize: "1.05rem" }}>
                  Reviews ({emp.reviews})
                </h2>
                <div className="space-y-4">
                  {emp.reviews_list.map((review: any) => (
                    <div key={review.author} className="pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <img src={review.img} alt={review.author} className="w-9 h-9 rounded-xl object-cover" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.875rem" }}>{review.author}</p>
                            <span className="text-[#9CA3AF]" style={{ fontSize: "0.72rem" }}>{review.date}</span>
                          </div>
                          <div className="mb-2"><StarRating rating={review.rating} /></div>
                          <p className="text-[#6B7280]" style={{ fontSize: "0.8rem", lineHeight: 1.6 }}>{review.text}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}