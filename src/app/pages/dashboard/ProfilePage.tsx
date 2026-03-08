import { useState } from "react";
import {
  Star,
  MapPin,
  CheckCircle,
  Edit2,
  Plus,
  ExternalLink,
  Award,
  Briefcase,
  BookOpen,
  Code,
  BarChart3,
  Share2,
} from "lucide-react";

const SKILLS = [
  "Project Management", "Product Strategy", "Figma", "Agile / Scrum",
  "Data Analysis", "User Research", "Roadmapping", "SQL",
];

const PORTFOLIO = [
  {
    title: "Hustlify Platform",
    desc: "Led the product strategy and design of Hustlify's MVP, from concept to launch.",
    tags: ["SaaS", "Marketplace", "Algeria"],
    img: "https://images.unsplash.com/photo-1758711516684-e7a87556015e?w=400&q=80",
  },
  {
    title: "DZfintech App",
    desc: "Product Manager for a B2B fintech platform serving 200+ SMEs in Algeria.",
    tags: ["Fintech", "B2B", "Mobile"],
    img: "https://images.unsplash.com/photo-1764690690771-b4522d66b433?w=400&q=80",
  },
];

const REVIEWS = [
  {
    author: "Karim Benali",
    role: "Tech Lead at TechCorp DZ",
    rating: 5,
    text: "Alex is an outstanding product manager. His ability to balance user needs with business goals is exceptional.",
    date: "Jan 2026",
    img: "https://images.unsplash.com/photo-1565687981296-535f09db714e?w=60&q=80",
  },
  {
    author: "Sonia Amrani",
    role: "UX Designer",
    rating: 5,
    text: "Great collaboration experience. Alex always provides clear briefs and constructive feedback.",
    date: "Dec 2025",
    img: "https://images.unsplash.com/photo-1765648580528-8d659861d81a?w=60&q=80",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={13} className={i <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"} />
      ))}
    </div>
  );
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "portfolio" | "reviews">("overview");

  return (
    <div className="p-6 max-w-5xl">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-purple-100 overflow-hidden mb-5">
        {/* Banner */}
        <div className="h-28 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] relative">
          <button className="absolute top-3 right-3 p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors">
            <Edit2 size={14} className="text-white" />
          </button>
        </div>

        {/* Profile info */}
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1738750908048-14200459c3c9?w=120&q=80"
                className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-md"
                alt="Alex Johnson"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-white" />
            </div>
            <div className="flex gap-2 pb-1">
              <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-purple-100 text-[#6B7280] rounded-xl hover:bg-purple-50 transition-colors">
                <Share2 size={14} />
                <span style={{ fontSize: "0.8rem" }}>Share</span>
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-xl hover:opacity-90 transition-opacity">
                <Edit2 size={14} />
                <span style={{ fontSize: "0.8rem", fontWeight: 500 }}>Edit Profile</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-start gap-4 justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.3rem" }}>
                  Alex Johnson
                </h1>
                <CheckCircle size={18} className="text-[#6C63FF]" />
                <span className="px-2 py-0.5 bg-[#F0EEFF] text-[#6C63FF] rounded-lg" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                  PRO
                </span>
              </div>
              <p className="text-[#6B7280] mb-2" style={{ fontSize: "0.9rem" }}>
                Senior Product Manager
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1 text-[#6B7280]" style={{ fontSize: "0.8rem" }}>
                  <MapPin size={13} className="text-[#9CA3AF]" />
                  Alger, Algeria
                </span>
                <span className="flex items-center gap-1.5">
                  <StarRating rating={5} />
                  <span className="text-[#1A1A3E]" style={{ fontSize: "0.8rem", fontWeight: 600 }}>4.9</span>
                  <span className="text-[#9CA3AF]" style={{ fontSize: "0.75rem" }}>(47 reviews)</span>
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex gap-4">
              {[
                { label: "Projects", value: "24" },
                { label: "Reviews", value: "47" },
                { label: "Hired", value: "12" },
              ].map((stat) => (
                <div key={stat.label} className="text-center px-4 py-2 bg-[#F5F3FF] rounded-xl">
                  <p className="text-[#6C63FF]" style={{ fontWeight: 700, fontSize: "1.1rem" }}>{stat.value}</p>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.72rem" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            {[
              { icon: Award, label: "Top Rated", color: "#F59E0B", bg: "#FEF3C7" },
              { icon: CheckCircle, label: "ID Verified", color: "#10B981", bg: "#D1FAE5" },
              { icon: Star, label: "5-Star Avg", color: "#6C63FF", bg: "#F0EEFF" },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
                style={{ backgroundColor: badge.bg }}
              >
                <badge.icon size={13} style={{ color: badge.color }} />
                <span style={{ color: badge.color, fontSize: "0.75rem", fontWeight: 600 }}>{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {(["overview", "portfolio", "reviews"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl capitalize transition-all ${
              activeTab === tab
                ? "bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white"
                : "bg-white border border-purple-100 text-[#6B7280] hover:border-purple-200"
            }`}
            style={{ fontSize: "0.875rem", fontWeight: 500 }}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-5">
          {activeTab === "overview" && (
            <>
              {/* About */}
              <div className="bg-white rounded-2xl border border-purple-100 p-5">
                <h3 className="text-[#1A1A3E] mb-3" style={{ fontWeight: 700, fontSize: "1rem" }}>About</h3>
                <p className="text-[#6B7280]" style={{ fontSize: "0.875rem", lineHeight: 1.7 }}>
                  Senior Product Manager with 6+ years of experience building digital products
                  in Algeria's startup ecosystem. Passionate about creating user-centric solutions
                  that drive measurable business impact. Currently working with Hustlify to reshape
                  the talent marketplace.
                </p>
              </div>

              {/* Experience */}
              <div className="bg-white rounded-2xl border border-purple-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[#1A1A3E] flex items-center gap-2" style={{ fontWeight: 700, fontSize: "1rem" }}>
                    <Briefcase size={16} className="text-[#6C63FF]" />
                    Experience
                  </h3>
                  <button className="p-1.5 rounded-lg hover:bg-purple-50 transition-colors">
                    <Plus size={16} className="text-[#6C63FF]" />
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    { title: "Senior Product Manager", company: "Hustlify", period: "2024 – Present", desc: "Leading product strategy and roadmap for Algeria's top talent marketplace." },
                    { title: "Product Manager", company: "Yassir", period: "2022 – 2024", desc: "Managed super-app features serving 2M+ users across North Africa." },
                    { title: "Product Analyst", company: "CPA Bank", period: "2019 – 2022", desc: "Drove digital banking product initiatives for retail clients." },
                  ].map((exp) => (
                    <div key={exp.title} className="flex gap-3 pb-4 border-b border-purple-50 last:border-0 last:pb-0">
                      <div className="w-9 h-9 rounded-xl bg-[#F5F3FF] flex items-center justify-center flex-shrink-0">
                        <Briefcase size={15} className="text-[#6C63FF]" />
                      </div>
                      <div>
                        <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.875rem" }}>{exp.title}</p>
                        <p className="text-[#6C63FF]" style={{ fontSize: "0.8rem" }}>{exp.company}</p>
                        <p className="text-[#9CA3AF]" style={{ fontSize: "0.75rem" }}>{exp.period}</p>
                        <p className="text-[#6B7280] mt-1" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>{exp.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="bg-white rounded-2xl border border-purple-100 p-5">
                <h3 className="text-[#1A1A3E] flex items-center gap-2 mb-4" style={{ fontWeight: 700, fontSize: "1rem" }}>
                  <BookOpen size={16} className="text-[#6C63FF]" />
                  Education
                </h3>
                {[
                  { degree: "Master's in Business & Tech", school: "USTHB Alger", year: "2019" },
                  { degree: "Bachelor's in Computer Science", school: "Université d'Alger 1", year: "2017" },
                ].map((edu) => (
                  <div key={edu.degree} className="flex gap-3 mb-3 last:mb-0">
                    <div className="w-9 h-9 rounded-xl bg-[#F5F3FF] flex items-center justify-center flex-shrink-0">
                      <BookOpen size={15} className="text-[#6C63FF]" />
                    </div>
                    <div>
                      <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.875rem" }}>{edu.degree}</p>
                      <p className="text-[#6B7280]" style={{ fontSize: "0.8rem" }}>{edu.school} · {edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "portfolio" && (
            <div className="space-y-4">
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-dashed border-purple-200 text-[#6C63FF] rounded-2xl hover:bg-purple-50 w-full justify-center transition-colors">
                <Plus size={16} />
                <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>Add Project</span>
              </button>
              {PORTFOLIO.map((project) => (
                <div key={project.title} className="bg-white rounded-2xl border border-purple-100 overflow-hidden">
                  <img src={project.img} alt={project.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.95rem" }}>{project.title}</p>
                      <button className="p-1.5 rounded-lg hover:bg-purple-50 transition-colors">
                        <ExternalLink size={14} className="text-[#6C63FF]" />
                      </button>
                    </div>
                    <p className="text-[#6B7280] mb-3" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>{project.desc}</p>
                    <div className="flex gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-[#F0EEFF] text-[#6C63FF] rounded-lg" style={{ fontSize: "0.7rem", fontWeight: 500 }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="space-y-4">
              {REVIEWS.map((review) => (
                <div key={review.author} className="bg-white rounded-2xl border border-purple-100 p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <img src={review.img} alt={review.author} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.875rem" }}>{review.author}</p>
                        <span className="text-[#9CA3AF]" style={{ fontSize: "0.75rem" }}>{review.date}</span>
                      </div>
                      <p className="text-[#9CA3AF]" style={{ fontSize: "0.75rem" }}>{review.role}</p>
                      <div className="mt-1"><StarRating rating={review.rating} /></div>
                    </div>
                  </div>
                  <p className="text-[#6B7280]" style={{ fontSize: "0.85rem", lineHeight: 1.6 }}>"{review.text}"</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Skills */}
          <div className="bg-white rounded-2xl border border-purple-100 p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[#1A1A3E] flex items-center gap-2" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                <Code size={15} className="text-[#6C63FF]" />
                Skills
              </h3>
              <button className="p-1.5 rounded-lg hover:bg-purple-50 transition-colors">
                <Plus size={14} className="text-[#6C63FF]" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SKILLS.map((skill) => (
                <span key={skill} className="px-2.5 py-1 bg-[#F5F3FF] text-[#6C63FF] rounded-xl" style={{ fontSize: "0.75rem", fontWeight: 500 }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-2xl border border-purple-100 p-5">
            <h3 className="text-[#1A1A3E] flex items-center gap-2 mb-4" style={{ fontWeight: 700, fontSize: "0.95rem" }}>
              <BarChart3 size={15} className="text-[#6C63FF]" />
              Profile Stats
            </h3>
            {[
              { label: "Profile Views", value: "1,247", change: "+12%" },
              { label: "Search Appearances", value: "328", change: "+8%" },
              { label: "Contact Requests", value: "43", change: "+21%" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center justify-between py-2.5 border-b border-purple-50 last:border-0">
                <p className="text-[#6B7280]" style={{ fontSize: "0.8rem" }}>{stat.label}</p>
                <div className="text-right">
                  <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.875rem" }}>{stat.value}</p>
                  <p className="text-green-500" style={{ fontSize: "0.7rem" }}>{stat.change}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Upgrade CTA */}
          <div className="bg-gradient-to-br from-[#6C63FF] to-[#9B8FFF] rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Award size={16} className="text-yellow-300" />
              <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>Upgrade to PRO</span>
            </div>
            <p className="text-white/80 mb-4" style={{ fontSize: "0.78rem", lineHeight: 1.5 }}>
              Get featured at the top of search results, priority support, and advanced analytics.
            </p>
            <button className="w-full py-2 bg-white text-[#6C63FF] rounded-xl hover:bg-white/90 transition-colors" style={{ fontWeight: 600, fontSize: "0.8rem" }}>
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
