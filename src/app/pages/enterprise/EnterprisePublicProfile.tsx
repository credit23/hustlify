import { useNavigate } from "react-router";
import { MapPin, Star, CheckCircle, Briefcase, Users, Globe, Award, Share2, MessageSquare, ArrowLeft } from "lucide-react";
import PublicNavbar from "../../components/layout/PublicNavbar";

const OPEN_JOBS = [
  { id: "1", title: "Senior React Developer", dept: "Engineering", type: "Full-time", salary: "120,000–180,000 DZD/mo", location: "Alger" },
  { id: "2", title: "UX/UI Designer", dept: "Product", type: "Full-time", salary: "90,000–130,000 DZD/mo", location: "Remote" },
  { id: "3", title: "Digital Marketing Manager", dept: "Marketing", type: "Contract", salary: "Negotiable", location: "Alger" },
];

const EMPLOYEES_HIRED = [
  { name: "Karim B.", role: "Lead Developer", rating: 5.0, img: "https://images.unsplash.com/photo-1565687981296-535f09db714e?w=80&q=80" },
  { name: "Sonia A.", role: "UX Designer", rating: 4.9, img: "https://images.unsplash.com/photo-1765648580528-8d659861d81a?w=80&q=80" },
  { name: "Yacine M.", role: "Data Analyst", rating: 4.8, img: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=80&q=80" },
];

const REVIEWS = [
  { author: "Karim Benali", text: "TechCorp DZ is a fantastic employer. Great culture, fair pay, and exciting projects.", rating: 5, date: "Jan 2026" },
  { author: "Sonia Amrani", text: "Very professional team. Clear communication and they respect deadlines.", rating: 5, date: "Dec 2025" },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={12} className={i <= Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"} />
      ))}
    </div>
  );
}

export default function EnterprisePublicProfile() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] to-[#EBF4FF]">
      <PublicNavbar />
      <div className="max-w-5xl mx-auto px-6 pt-24 pb-12">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#6B7280] hover:text-[#6C63FF] mb-6 transition-colors" style={{ fontSize: "0.875rem" }}>
          <ArrowLeft size={16} /> Back
        </button>

        {/* Header Card */}
        <div className="bg-white rounded-2xl border border-purple-100 overflow-hidden mb-5">
          {/* Banner */}
          <div className="h-36 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] relative">
            <div className="absolute inset-0 flex items-center px-8">
              <div className="text-white/20 text-8xl font-black">TC</div>
            </div>
          </div>
          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-10 mb-4">
              <div className="w-20 h-20 rounded-2xl bg-white border-4 border-white shadow-md flex items-center justify-center">
                <div className="w-full h-full rounded-xl bg-gradient-to-br from-[#6C63FF] to-[#9B8FFF] flex items-center justify-center">
                  <span className="text-white text-2xl font-black">TC</span>
                </div>
              </div>
              <div className="flex gap-2 pb-1">
                <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-purple-100 text-[#6B7280] rounded-xl hover:bg-purple-50">
                  <Share2 size={14} /><span style={{ fontSize: "0.8rem" }}>Share</span>
                </button>
                <button onClick={() => navigate("/dashboard/messages")} className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-xl hover:opacity-90">
                  <MessageSquare size={14} /><span style={{ fontSize: "0.8rem", fontWeight: 500 }}>Contact</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.4rem" }}>TechCorp DZ</h1>
                  <CheckCircle size={18} className="text-[#6C63FF]" />
                </div>
                <p className="text-[#6B7280] mb-2" style={{ fontSize: "0.9rem" }}>Technology & Software Development</p>
                <div className="flex flex-wrap gap-3">
                  <span className="flex items-center gap-1 text-[#6B7280]" style={{ fontSize: "0.8rem" }}><MapPin size={13} className="text-[#9CA3AF]" /> Alger, Algeria</span>
                  <span className="flex items-center gap-1 text-[#6B7280]" style={{ fontSize: "0.8rem" }}><Users size={13} className="text-[#9CA3AF]" /> 51–200 employees</span>
                  <span className="flex items-center gap-1 text-[#6B7280]" style={{ fontSize: "0.8rem" }}><Globe size={13} className="text-[#9CA3AF]" /> techcorp.dz</span>
                </div>
              </div>
              <div className="flex gap-3">
                {[
                  { value: "4.8", label: "Rating" },
                  { value: "42", label: "Hired" },
                  { value: "12", label: "Open Jobs" },
                ].map((s) => (
                  <div key={s.label} className="text-center px-4 py-2 bg-[#F5F3FF] rounded-xl">
                    <p className="text-[#6C63FF]" style={{ fontWeight: 700, fontSize: "1.1rem" }}>{s.value}</p>
                    <p className="text-[#9CA3AF]" style={{ fontSize: "0.72rem" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                { icon: Award, label: "Verified Enterprise", color: "#6C63FF", bg: "#F0EEFF" },
                { icon: CheckCircle, label: "Tax Registered", color: "#10B981", bg: "#D1FAE5" },
                { icon: Star, label: "Top Employer 2025", color: "#F59E0B", bg: "#FEF3C7" },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ backgroundColor: badge.bg }}>
                  <badge.icon size={13} style={{ color: badge.color }} />
                  <span style={{ color: badge.color, fontSize: "0.75rem", fontWeight: 600 }}>{badge.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="md:col-span-2 space-y-5">
            {/* About */}
            <div className="bg-white rounded-2xl border border-purple-100 p-5">
              <h2 className="text-[#1A1A3E] mb-3" style={{ fontWeight: 700, fontSize: "1rem" }}>About TechCorp DZ</h2>
              <p className="text-[#6B7280]" style={{ fontSize: "0.875rem", lineHeight: 1.7 }}>
                TechCorp DZ is a leading technology company based in Algiers, specializing in building
                scalable digital solutions for enterprises and government agencies across Algeria. Founded
                in 2018, we've grown to 120+ team members and serve 200+ clients nationwide.
                <br /><br />
                We believe in investing in talent, offering competitive salaries, flexible work arrangements,
                and continuous learning opportunities. Our culture is built on innovation, respect, and delivery excellence.
              </p>
            </div>

            {/* Open Jobs */}
            <div className="bg-white rounded-2xl border border-purple-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1rem" }}>Open Positions ({OPEN_JOBS.length})</h2>
              </div>
              <div className="space-y-3">
                {OPEN_JOBS.map((job) => (
                  <div key={job.id} className="p-4 bg-[#F5F3FF] rounded-xl border border-purple-100 hover:border-[#6C63FF] transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.9rem" }}>{job.title}</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-[#6B7280]" style={{ fontSize: "0.78rem" }}>{job.dept}</span>
                          <span className="px-2 py-0.5 bg-[#E0DCFF] text-[#6C63FF] rounded-lg" style={{ fontSize: "0.7rem", fontWeight: 500 }}>{job.type}</span>
                          <span className="text-[#6B7280]" style={{ fontSize: "0.78rem" }}>📍 {job.location}</span>
                        </div>
                        <p className="text-[#6C63FF] mt-1" style={{ fontSize: "0.8rem", fontWeight: 500 }}>{job.salary}</p>
                      </div>
                      <button className="px-3 py-1.5 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-xl hover:opacity-90 transition-opacity" style={{ fontSize: "0.78rem", fontWeight: 500 }}>
                        Apply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl border border-purple-100 p-5">
              <h2 className="text-[#1A1A3E] mb-4" style={{ fontWeight: 700, fontSize: "1rem" }}>Employee Reviews</h2>
              <div className="space-y-4">
                {REVIEWS.map((review) => (
                  <div key={review.author} className="pb-4 border-b border-purple-50 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.875rem" }}>{review.author}</p>
                      <div className="flex items-center gap-2">
                        <Stars rating={review.rating} />
                        <span className="text-[#9CA3AF]" style={{ fontSize: "0.72rem" }}>{review.date}</span>
                      </div>
                    </div>
                    <p className="text-[#6B7280]" style={{ fontSize: "0.82rem", lineHeight: 1.6 }}>"{review.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Hired Employees */}
            <div className="bg-white rounded-2xl border border-purple-100 p-5">
              <h3 className="text-[#1A1A3E] mb-4" style={{ fontWeight: 700, fontSize: "0.95rem" }}>Team Members</h3>
              <div className="space-y-3">
                {EMPLOYEES_HIRED.map((emp) => (
                  <div key={emp.name} className="flex items-center gap-3">
                    <img src={emp.img} alt={emp.name} className="w-9 h-9 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-[#1A1A3E] truncate" style={{ fontWeight: 600, fontSize: "0.82rem" }}>{emp.name}</p>
                      <p className="text-[#9CA3AF] truncate" style={{ fontSize: "0.72rem" }}>{emp.role}</p>
                    </div>
                    <Stars rating={emp.rating} />
                  </div>
                ))}
              </div>
            </div>

            {/* Company Info */}
            <div className="bg-white rounded-2xl border border-purple-100 p-5">
              <h3 className="text-[#1A1A3E] mb-3" style={{ fontWeight: 700, fontSize: "0.95rem" }}>Company Details</h3>
              <div className="space-y-2.5">
                {[
                  { label: "Founded", value: "2018" },
                  { label: "Headquarters", value: "Alger, DZ" },
                  { label: "Size", value: "51–200 employees" },
                  { label: "Active Jobs", value: "12 positions" },
                  { label: "Response Time", value: "Within 24 hours" },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between py-1.5 border-b border-purple-50 last:border-0">
                    <span className="text-[#9CA3AF]" style={{ fontSize: "0.78rem" }}>{item.label}</span>
                    <span className="text-[#1A1A3E]" style={{ fontSize: "0.78rem", fontWeight: 500 }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
