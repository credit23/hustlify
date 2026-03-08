import { useNavigate } from "react-router";
import {
  Star,
  MapPin,
  CheckCircle,
  SlidersHorizontal,
  ChevronDown,
  Search,
} from "lucide-react";
import { useState } from "react";

const EMPLOYEES = [
  {
    id: "1",
    name: "John Smith",
    role: "Software Developer",
    rating: 4.9,
    reviews: 198,
    skills: ["Web development", "Mobile Apps", "JavaScript"],
    reviews_label: "Reviews: 2",
    img: "https://images.unsplash.com/photo-1565687981296-535f09db714e?w=120&q=80",
    verified: true,
    location: "Alger",
    available: true,
  },
  {
    id: "2",
    name: "Jessica Lee",
    role: "Graphic Designer",
    rating: 5.0,
    reviews: 1108,
    skills: ["Logo Design", "Branding", "Adobe Creative Suite"],
    reviews_label: "Reviews: 37",
    img: "https://images.unsplash.com/photo-1765648580528-8d659861d81a?w=120&q=80",
    verified: true,
    location: "Oran",
    available: true,
  },
  {
    id: "3",
    name: "Michael Davis",
    role: "Digital Marketer",
    rating: 4.8,
    reviews: 67,
    skills: ["Social Media", "SEO", "Online advertising"],
    reviews_label: "Reviews: 104",
    img: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=120&q=80",
    verified: true,
    location: "Constantine",
    available: false,
  },
  {
    id: "4",
    name: "Sarah Chen",
    role: "Data Analyst",
    rating: 4.7,
    reviews: 187,
    skills: ["Python", "Power BI", "Data-entry"],
    reviews_label: "Reviews: 106",
    img: "https://images.unsplash.com/photo-1738750908048-14200459c3c9?w=120&q=80",
    verified: true,
    location: "Alger",
    available: true,
  },
  {
    id: "5",
    name: "Karim Benali",
    role: "Backend Developer",
    rating: 4.6,
    reviews: 83,
    skills: ["Node.js", "PostgreSQL", "Docker"],
    reviews_label: "Reviews: 83",
    img: "https://images.unsplash.com/photo-1764690690771-b4522d66b433?w=120&q=80",
    verified: true,
    location: "Annaba",
    available: true,
  },
  {
    id: "6",
    name: "Nadia Kaci",
    role: "Content Writer",
    rating: 4.9,
    reviews: 221,
    skills: ["Arabic", "French", "SEO Writing"],
    reviews_label: "Reviews: 221",
    img: "https://images.unsplash.com/photo-1765648580528-8d659861d81a?w=120&q=80",
    verified: false,
    location: "Sétif",
    available: true,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={11}
          className={
            i <= Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-200 fill-gray-200"
          }
        />
      ))}
    </div>
  );
}

export default function DashboardHome() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("Best Rating");
  const [filterDomain, setFilterDomain] = useState("");

  return (
    <div className="p-6">
      {/* Welcome Banner */}
      <div className="mb-6">
        <h1 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.5rem" }}>
          Welcome back, <span className="text-[#6C63FF]">Alex!</span>
        </h1>
        <p className="text-[#6B7280]" style={{ fontSize: "0.9rem" }}>
          Find the right employee to help you today
        </p>
      </div>

      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] rounded-2xl p-6 mb-6 overflow-hidden">
        <div className="relative z-10 max-w-sm">
          <h2 className="text-white mb-1" style={{ fontWeight: 700, fontSize: "1.3rem" }}>
            Welcome to Hustlify
          </h2>
          <p className="text-white/80 mb-4" style={{ fontSize: "0.875rem" }}>
            Start by finding a skilled employee that matches your needs
          </p>
          <button
            onClick={() => navigate("/client/post-job")}
            className="px-5 py-2.5 bg-white text-[#6C63FF] rounded-xl hover:bg-white/90 transition-colors"
            style={{ fontWeight: 600, fontSize: "0.875rem" }}
          >
            Find Employee
          </button>
        </div>
        {/* Decorative circles */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/10" />
        <div className="absolute right-16 top-2 w-16 h-16 rounded-full bg-white/10" />
        <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/5" />
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between mb-4 gap-4">
        <div>
          <h2 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
            Employees
          </h2>
          <p className="text-[#9CA3AF]" style={{ fontSize: "0.8rem" }}>
            2,145 results found
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              value={filterDomain}
              onChange={(e) => setFilterDomain(e.target.value)}
              placeholder="Filter domain..."
              className="pl-8 pr-4 py-2 bg-white rounded-xl border border-purple-100 text-[#1A1A3E] placeholder-[#9CA3AF] outline-none focus:border-[#6C63FF] transition-colors"
              style={{ fontSize: "0.8rem", width: "160px" }}
            />
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-white rounded-xl border border-purple-100 text-[#6B7280] hover:border-[#6C63FF] transition-colors">
            <SlidersHorizontal size={14} />
            <span style={{ fontSize: "0.8rem" }}>Filter</span>
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-xl">
            <span style={{ fontSize: "0.8rem", fontWeight: 500 }}>{sortBy}</span>
            <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {EMPLOYEES.map((emp) => (
          <div
            key={emp.id}
            className="bg-white rounded-2xl p-4 border border-purple-100 shadow-sm hover:shadow-md hover:border-purple-200 transition-all"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="relative">
                <img
                  src={emp.img}
                  alt={emp.name}
                  className="w-11 h-11 rounded-xl object-cover border-2 border-purple-100"
                />
                {emp.available && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <p
                      className="text-[#1A1A3E]"
                      style={{ fontWeight: 600, fontSize: "0.9rem" }}
                    >
                      {emp.name}
                    </p>
                    <p className="text-[#6B7280]" style={{ fontSize: "0.78rem" }}>
                      {emp.role}
                    </p>
                  </div>
                  <span className="flex items-center gap-0.5 text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>
                    <MapPin size={10} />
                    {emp.location}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <StarRating rating={emp.rating} />
                  <span className="text-[#1A1A3E]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                    {emp.rating}
                  </span>
                  <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>
                    {emp.reviews} reviews
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-3">
              {emp.skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-0.5 bg-[#F5F3FF] text-[#6C63FF] rounded-lg"
                  style={{ fontSize: "0.68rem", fontWeight: 500 }}
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-purple-50">
              <div className="flex items-center gap-1">
                {emp.verified ? (
                  <span className="flex items-center gap-1 text-[#6C63FF] bg-[#F0EEFF] px-2 py-0.5 rounded-lg" style={{ fontSize: "0.68rem", fontWeight: 500 }}>
                    <CheckCircle size={10} />
                    {emp.reviews_label}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[#9CA3AF] bg-gray-50 px-2 py-0.5 rounded-lg" style={{ fontSize: "0.68rem" }}>
                    Pending verify
                  </span>
                )}
              </div>
              <button
                onClick={() => navigate(`/employee/${emp.id}`)}
                className="px-4 py-1.5 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-xl hover:opacity-90 transition-opacity"
                style={{ fontSize: "0.75rem", fontWeight: 500 }}
              >
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-6">
        <button className="px-6 py-2.5 bg-white rounded-xl border border-purple-200 text-[#6C63FF] hover:bg-purple-50 transition-colors" style={{ fontSize: "0.875rem", fontWeight: 500 }}>
          Load More Employees
        </button>
      </div>
    </div>
  );
}
