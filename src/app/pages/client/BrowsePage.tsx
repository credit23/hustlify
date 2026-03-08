import { useNavigate } from "react-router";
import { useState } from "react";
import { Search, MapPin, Star, Heart, MessageSquare, Filter, Sparkles, ChevronRight, DollarSign, Check, Bot, CheckCircle, X, Award } from "lucide-react";
import { motion } from "motion/react";
import imgImage6 from "figma:asset/225350e362ddcd84f3581c2fdf7b5ea867eadc53.png";

const TOP_EMPLOYEES = [
  {
    id: 1,
    name: "Abdelkader Boualam",
    title: "Web Developer, Mobile Apps",
    location: "Algiers, Dergana",
    rating: 4.9,
    reviews: 127,
    rate: "3000DA",
    image: imgImage6,
    verified: true,
    available: true,
    skills: ["React", "Node.js"],
    completedProjects: 47,
    yearsExperience: 5,
  },
  {
    id: 2,
    name: "Sarah Messaoudi",
    title: "UI/UX Designer",
    location: "Oran, Es Senia",
    rating: 4.8,
    reviews: 94,
    rate: "2500DA",
    image: imgImage6,
    verified: true,
    available: true,
    skills: ["Figma", "Adobe XD"],
    completedProjects: 38,
    yearsExperience: 4,
  },
  {
    id: 3,
    name: "Karim Benali",
    title: "Mobile Developer",
    location: "Constantine",
    rating: 4.9,
    reviews: 156,
    rate: "3200DA",
    image: imgImage6,
    verified: true,
    available: true,
    skills: ["React Native", "Flutter"],
    completedProjects: 62,
    yearsExperience: 6,
  },
];

const ALL_EMPLOYEES = [
  {
    id: 1,
    name: "Abdelkader Bouam",
    title: "Web Developer",
    location: "Algiers, Dergana",
    rating: 4.9,
    reviews: 127,
    rate: "3000DA/H",
    image: imgImage6,
    verified: true,
    available: true,
    saved: false,
  },
  {
    id: 2,
    name: "Yacine Benali",
    title: "Mobile Developer",
    location: "Constantine",
    rating: 4.7,
    reviews: 89,
    rate: "2800DA/H",
    image: imgImage6,
    verified: true,
    available: true,
    saved: false,
  },
  {
    id: 3,
    name: "Amira Khelifi",
    title: "Graphic Designer",
    location: "Tizi Ouzou",
    rating: 4.8,
    reviews: 102,
    rate: "2200DA/H",
    image: imgImage6,
    verified: false,
    available: false,
    saved: true,
  },
  {
    id: 4,
    name: "Mohamed Bencherif",
    title: "Electrician",
    location: "Blida",
    rating: 4.6,
    reviews: 73,
    rate: "1500DA/H",
    image: imgImage6,
    verified: true,
    available: true,
    saved: false,
  },
  {
    id: 5,
    name: "Lina Hamidi",
    title: "Content Writer",
    location: "Algiers, Bab Ezzouar",
    rating: 4.9,
    reviews: 156,
    rate: "1800DA/H",
    image: imgImage6,
    verified: true,
    available: true,
    saved: false,
  },
  {
    id: 6,
    name: "Karim Boudjemaa",
    title: "Plumber",
    location: "Setif",
    rating: 4.5,
    reviews: 61,
    rate: "1200DA/H",
    image: imgImage6,
    verified: false,
    available: false,
    saved: false,
  },
  {
    id: 7,
    name: "Yasmine Larbi",
    title: "Digital Marketer",
    location: "Oran",
    rating: 4.8,
    reviews: 118,
    rate: "2500DA/H",
    image: imgImage6,
    verified: true,
    available: false,
    saved: true,
  },
  {
    id: 8,
    name: "Riad Meziane",
    title: "Photographer",
    location: "Annaba",
    rating: 4.7,
    reviews: 85,
    rate: "3500DA/H",
    image: imgImage6,
    verified: true,
    available: true,
    saved: false,
  },
];

export default function BrowsePage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [savedOnly, setSavedOnly] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [aiMessages, setAiMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([]);

  // Filter states
  const [locationFilter, setLocationFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState<string | null>(null);
  const [availabilityFilter, setAvailabilityFilter] = useState<string | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number>(0);

  // Applied filters (only applied when user clicks "Filter" button)
  const [appliedLocationFilter, setAppliedLocationFilter] = useState("");
  const [appliedPriceFilter, setAppliedPriceFilter] = useState<string | null>(null);
  const [appliedAvailabilityFilter, setAppliedAvailabilityFilter] = useState<string | null>(null);
  const [appliedRatingFilter, setAppliedRatingFilter] = useState<number>(0);

  // Apply filters function
  const applyFilters = () => {
    setAppliedLocationFilter(locationFilter);
    setAppliedPriceFilter(priceFilter);
    setAppliedAvailabilityFilter(availabilityFilter);
    setAppliedRatingFilter(ratingFilter);
    setActiveFilter(null); // Close all dropdowns
  };

  // Handle sending AI message
  const handleSendAiMessage = () => {
    if (!aiMessage.trim()) return;

    // Add user message
    setAiMessages((prev) => [...prev, { role: "user", text: aiMessage }]);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I can help you find the perfect candidate! What specific skills are you looking for?",
        "Based on your requirements, I'd recommend filtering by location and rating to find the best match.",
        "Great question! Let me analyze the available candidates for you...",
        "I found several highly-rated professionals who match your criteria. Would you like me to show you their profiles?",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setAiMessages((prev) => [...prev, { role: "ai", text: randomResponse }]);
    }, 1000);

    setAiMessage("");
  };

  // Helper function to parse rate from string like "3000DA/H"
  const getRateValue = (rateStr: string): number => {
    return parseInt(rateStr.replace(/[^\d]/g, ""));
  };

  // Filter employees based on applied filters
  let filteredEmployees = savedOnly ? ALL_EMPLOYEES.filter((e) => e.saved) : ALL_EMPLOYEES;

  // Apply location filter
  if (appliedLocationFilter) {
    filteredEmployees = filteredEmployees.filter((e) =>
      e.location.toLowerCase().includes(appliedLocationFilter.toLowerCase())
    );
  }

  // Apply price filter
  if (appliedPriceFilter) {
    filteredEmployees = filteredEmployees.filter((e) => {
      const rate = getRateValue(e.rate);
      switch (appliedPriceFilter) {
        case "0-1500":
          return rate <= 1500;
        case "1500-2500":
          return rate > 1500 && rate <= 2500;
        case "2500-3500":
          return rate > 2500 && rate <= 3500;
        case "3500+":
          return rate > 3500;
        default:
          return true;
      }
    });
  }

  // Apply availability filter
  if (appliedAvailabilityFilter === "available") {
    filteredEmployees = filteredEmployees.filter((e) => e.available);
  } else if (appliedAvailabilityFilter === "not-available") {
    filteredEmployees = filteredEmployees.filter((e) => !e.available);
  }

  // Apply rating filter
  if (appliedRatingFilter > 0) {
    filteredEmployees = filteredEmployees.filter((e) => e.rating >= appliedRatingFilter);
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-[#1A1A3E] mb-2" style={{ fontSize: "2.25rem", fontWeight: 700 }}>
          Browse Employees
        </h1>
        <p className="text-[#6B7280]" style={{ fontSize: "1rem" }}>
          Discover talented professionals ready to work on your projects.
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-3xl">
        <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        <input
          type="text"
          placeholder="Search for employees, skills, or services..."
          className="w-full pl-14 pr-5 py-4 bg-white rounded-2xl border border-[#E5E7EB] text-[#1A1A3E] placeholder-[#9CA3AF] outline-none focus:border-[#6D28D9] focus:ring-2 focus:ring-[#6D28D9]/10 transition-all shadow-sm"
          style={{ fontSize: "1rem" }}
        />
      </div>

      {/* Featured Employees Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-[#1A1A3E] mb-1.5 flex items-center gap-2" style={{ fontSize: "1.85rem", fontWeight: 700 }}>
              <Sparkles size={28} className="text-[#6D28D9]" />
              Featured Employees
            </h2>
            <p className="text-[#6B7280]" style={{ fontSize: "1rem", lineHeight: "1.6" }}>
              Meet some of the most talented professionals ready to bring your ideas to life.
            </p>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#1E3A8A] rounded-3xl p-8 border border-[#6D28D9]/30 shadow-2xl">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-60 h-60 bg-gradient-to-br from-[#6D28D9]/30 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-gradient-to-tl from-[#3B82F6]/30 to-transparent rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-[#8B5CF6]/20 to-transparent rounded-full blur-3xl" />

          <div className="relative grid grid-cols-3 gap-8">
            {TOP_EMPLOYEES.map((employee, idx) => (
              <motion.div
                key={employee.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.15, duration: 0.6 }}
                className="group relative bg-gradient-to-br from-white via-[#F8F7FF] to-[#EEF2FF] backdrop-blur-sm rounded-3xl p-8 border-2 border-[#C7D2FE]/40 hover:border-[#6D28D9]/60 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-3"
              >
                {/* Featured Badge - Only for first card */}
                {idx === 0 && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="relative">
                      <div className="px-5 py-2 bg-gradient-to-r from-[#F59E0B] via-[#EF4444] to-[#EC4899] rounded-full flex items-center gap-2 shadow-lg">
                        <Award size={16} className="text-white" />
                        <span className="text-white" style={{ fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.5px" }}>
                          TOP RATED
                        </span>
                      </div>
                      <div className="absolute -inset-2 bg-gradient-to-r from-[#F59E0B] via-[#EF4444] to-[#EC4899] rounded-full blur-lg opacity-50 animate-pulse" />
                    </div>
                  </div>
                )}

                {/* Avatar with gradient ring */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative group/avatar">
                    <div className="absolute -inset-2 bg-gradient-to-r from-[#6D28D9] via-[#3B82F6] to-[#8B5CF6] rounded-full opacity-80 group-hover/avatar:opacity-100 blur-sm transition-opacity duration-300" />
                    <div className="relative">
                      <img
                        src={employee.image}
                        alt={employee.name}
                        className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-lg"
                      />
                      {/* Availability Badge */}
                      <div className="absolute -bottom-2 -right-2">
                        <div className="relative">
                          {employee.available ? (
                            <>
                              <div className="w-11 h-11 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                                <CheckCircle size={20} className="text-white" />
                              </div>
                              <div className="absolute inset-0 bg-[#10B981] rounded-full animate-ping opacity-30" />
                            </>
                          ) : (
                            <>
                              <div className="w-11 h-11 bg-gradient-to-br from-[#EF4444] to-[#DC2626] rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                                <X size={20} className="text-white" />
                              </div>
                              <div className="absolute inset-0 bg-[#EF4444] rounded-full animate-ping opacity-30" />
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Employee Info */}
                <div className="text-center mb-5">
                  <h3 className="text-[#1A1A3E] mb-2" style={{ fontSize: "1.35rem", fontWeight: 700, lineHeight: "1.3" }}>
                    {employee.name}
                  </h3>
                  <p className="text-[#6B7280] mb-4" style={{ fontSize: "0.95rem", fontWeight: 500 }}>
                    {employee.title}
                  </p>

                  {/* Location */}
                  <div className="flex items-center justify-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-[#F0EEFF] to-[#EBF4FF] rounded-xl">
                    <MapPin size={16} className="text-[#6D28D9]" />
                    <span className="text-[#6D28D9]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                      {employee.location}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-3 mb-4 px-5 py-2.5 bg-gradient-to-r from-[#FEF3C7] to-[#FDE68A] rounded-xl">
                    <div className="flex items-center gap-1.5">
                      <Star size={18} className="fill-[#F59E0B] text-[#F59E0B]" />
                      <span className="text-[#92400E]" style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                        {employee.rating}
                      </span>
                    </div>
                    <span className="text-[#92400E]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                      ({employee.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
                  {employee.skills.map((skill, skillIdx) => (
                    <span
                      key={skillIdx}
                      className="px-4 py-2 bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] text-white rounded-xl hover:shadow-lg hover:scale-110 transition-all cursor-pointer font-semibold"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Hover Details - shown on hover */}
                <div className="overflow-hidden transition-all duration-300 max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 mb-5">
                  <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-r from-[#F0EEFF] via-[#EBF4FF] to-[#F0EEFF] rounded-2xl border border-[#6D28D9]/20">
                    <div className="text-center">
                      <p className="bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] bg-clip-text text-transparent mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                        {employee.completedProjects}
                      </p>
                      <p className="text-[#6B7280]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                        Projects Done
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] bg-clip-text text-transparent mb-1" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
                        {employee.yearsExperience}+ yrs
                      </p>
                      <p className="text-[#6B7280]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                        Experience
                      </p>
                    </div>
                  </div>
                </div>

                {/* Hourly Rate */}
                <div className="text-center mb-6 pb-6 border-b-2 border-dashed border-[#E5E7EB]">
                  <p className="bg-gradient-to-r from-[#6D28D9] via-[#3B82F6] to-[#8B5CF6] bg-clip-text text-transparent" style={{ fontSize: "2rem", fontWeight: 700, lineHeight: "1" }}>
                    {employee.rate}
                    <span className="text-[#9CA3AF]" style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                      {" "}/ hr
                    </span>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => navigate(`/employee/${employee.id}`)}
                    className="w-full px-5 py-3.5 border-2 border-[#6D28D9] text-[#6D28D9] rounded-xl hover:bg-gradient-to-r hover:from-[#F0EEFF] hover:to-[#EBF4FF] hover:shadow-lg transition-all"
                    style={{ fontSize: "0.9rem", fontWeight: 700 }}
                  >
                    View Profile
                  </button>
                  <button className="group/btn w-full px-5 py-3.5 bg-gradient-to-r from-[#6D28D9] via-[#3B82F6] to-[#2563EB] text-white rounded-xl hover:shadow-2xl hover:shadow-blue-300 transition-all relative overflow-hidden hover:scale-105" style={{ fontSize: "0.9rem", fontWeight: 700 }}>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <MessageSquare size={18} />
                      Connect Now
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#6D28D9] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="relative z-30">
        <div className="bg-white/60 backdrop-blur-md rounded-3xl px-6 py-4 border border-[#E5E7EB]/50 shadow-lg flex items-center gap-3">
          {/* Location Filter */}
          <div className="relative">
            <button
              onClick={() => setActiveFilter(activeFilter === "Location" ? null : "Location")}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#6D28D9] transition-all shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6D28D9] to-[#8B5CF6] flex items-center justify-center">
                <MapPin size={16} className="text-white" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[#1A1A3E]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                  Location
                </span>
                {locationFilter ? (
                  <span className="px-2 py-0.5 bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white rounded-md" style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                    {locationFilter}
                  </span>
                ) : (
                  <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>
                    Any
                  </span>
                )}
              </div>
              <ChevronRight size={14} className="text-[#9CA3AF]" />
            </button>

            {/* Location Dropdown */}
            {activeFilter === "Location" && (
              <div className="absolute top-full mt-2 left-0 z-[100] bg-white rounded-xl shadow-2xl border border-[#E5E7EB] p-4 w-72">
                <p className="text-[#1A1A3E] mb-2" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                  Enter Wilaya or Commune
                </p>
                <input
                  type="text"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  placeholder="e.g., Algiers, Oran, Constantine..."
                  className="w-full px-3 py-2 bg-[#F8F7FF] rounded-lg border border-[#E5E7EB] text-[#1A1A3E] placeholder-[#9CA3AF] outline-none focus:border-[#6D28D9] transition-all"
                  style={{ fontSize: "0.85rem" }}
                />
              </div>
            )}
          </div>

          {/* Price Filter */}
          <div className="relative">
            <button
              onClick={() => setActiveFilter(activeFilter === "Price" ? null : "Price")}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#6D28D9] transition-all shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center">
                <DollarSign size={16} className="text-white" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[#1A1A3E]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                  Price
                </span>
                {priceFilter ? (
                  <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>
                    {priceFilter === "0-1500" && "0-1,500DA"}
                    {priceFilter === "1500-2500" && "1,500-2,500DA"}
                    {priceFilter === "2500-3500" && "2,500-3,500DA"}
                    {priceFilter === "3500+" && "3,500+DA"}
                  </span>
                ) : (
                  <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>
                    Any Range
                  </span>
                )}
              </div>
              <ChevronRight size={14} className="text-[#9CA3AF]" />
            </button>

            {/* Price Dropdown */}
            {activeFilter === "Price" && (
              <div className="absolute top-full mt-2 left-0 z-[100] bg-white rounded-xl shadow-2xl border border-[#E5E7EB] p-3 w-64">
                <button
                  onClick={() => setPriceFilter("0-1500")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F8F7FF] transition-colors ${priceFilter === "0-1500" ? "bg-[#F8F7FF]" : ""}`}
                  style={{ fontSize: "0.85rem" }}
                >
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${priceFilter === "0-1500" ? "border-[#6D28D9] bg-[#6D28D9]" : "border-[#E5E7EB]"}`}>
                    {priceFilter === "0-1500" && <Check size={12} className="text-white" />}
                  </div>
                  0 - 1,500 DA/hr
                </button>
                <button
                  onClick={() => setPriceFilter("1500-2500")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F8F7FF] transition-colors ${priceFilter === "1500-2500" ? "bg-[#F8F7FF]" : ""}`}
                  style={{ fontSize: "0.85rem" }}
                >
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${priceFilter === "1500-2500" ? "border-[#6D28D9] bg-[#6D28D9]" : "border-[#E5E7EB]"}`}>
                    {priceFilter === "1500-2500" && <Check size={12} className="text-white" />}
                  </div>
                  1,500 - 2,500 DA/hr
                </button>
                <button
                  onClick={() => setPriceFilter("2500-3500")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F8F7FF] transition-colors ${priceFilter === "2500-3500" ? "bg-[#F8F7FF]" : ""}`}
                  style={{ fontSize: "0.85rem" }}
                >
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${priceFilter === "2500-3500" ? "border-[#6D28D9] bg-[#6D28D9]" : "border-[#E5E7EB]"}`}>
                    {priceFilter === "2500-3500" && <Check size={12} className="text-white" />}
                  </div>
                  2,500 - 3,500 DA/hr
                </button>
                <button
                  onClick={() => setPriceFilter("3500+")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F8F7FF] transition-colors ${priceFilter === "3500+" ? "bg-[#F8F7FF]" : ""}`}
                  style={{ fontSize: "0.85rem" }}
                >
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${priceFilter === "3500+" ? "border-[#6D28D9] bg-[#6D28D9]" : "border-[#E5E7EB]"}`}>
                    {priceFilter === "3500+" && <Check size={12} className="text-white" />}
                  </div>
                  3,500+ DA/hr
                </button>
              </div>
            )}
          </div>

          {/* Availability Filter */}
          <div className="relative">
            <button
              onClick={() => setActiveFilter(activeFilter === "Availability" ? null : "Availability")}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#6D28D9] transition-all shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center">
                <CheckCircle size={16} className="text-white" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[#1A1A3E]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                  Availability
                </span>
                {availabilityFilter ? (
                  <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>
                    {availabilityFilter === "available" ? "Available" : "Not Available"}
                  </span>
                ) : (
                  <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>
                    Any
                  </span>
                )}
              </div>
              <ChevronRight size={14} className="text-[#9CA3AF]" />
            </button>

            {/* Availability Dropdown */}
            {activeFilter === "Availability" && (
              <div className="absolute top-full mt-2 left-0 z-[100] bg-white rounded-xl shadow-2xl border border-[#E5E7EB] p-3 w-56">
                <button
                  onClick={() => setAvailabilityFilter("available")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F8F7FF] transition-colors ${availabilityFilter === "available" ? "bg-[#F8F7FF]" : ""}`}
                  style={{ fontSize: "0.85rem" }}
                >
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${availabilityFilter === "available" ? "border-[#6D28D9] bg-[#6D28D9]" : "border-[#E5E7EB]"}`}>
                    {availabilityFilter === "available" && <Check size={12} className="text-white" />}
                  </div>
                  Available Now
                </button>
                <button
                  onClick={() => setAvailabilityFilter("not-available")}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F8F7FF] transition-colors ${availabilityFilter === "not-available" ? "bg-[#F8F7FF]" : ""}`}
                  style={{ fontSize: "0.85rem" }}
                >
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${availabilityFilter === "not-available" ? "border-[#6D28D9] bg-[#6D28D9]" : "border-[#E5E7EB]"}`}>
                    {availabilityFilter === "not-available" && <Check size={12} className="text-white" />}
                  </div>
                  Not Available
                </button>
              </div>
            )}
          </div>

          {/* Rating Filter */}
          <div className="relative">
            <button
              onClick={() => setActiveFilter(activeFilter === "Rating" ? null : "Rating")}
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-[#E5E7EB] hover:border-[#6D28D9] transition-all shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center">
                <Star size={16} className="fill-white text-white" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[#1A1A3E]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>
                  Rating
                </span>
                {ratingFilter > 0 ? (
                  <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>
                    {ratingFilter}+ Stars
                  </span>
                ) : (
                  <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>
                    Any
                  </span>
                )}
              </div>
              <ChevronRight size={14} className="text-[#9CA3AF]" />
            </button>

            {/* Rating Dropdown */}
            {activeFilter === "Rating" && (
              <div className="absolute top-full mt-2 left-0 z-[100] bg-white rounded-xl shadow-2xl border border-[#E5E7EB] p-3 w-48">
                {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setRatingFilter(rating)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F8F7FF] transition-colors ${ratingFilter === rating ? "bg-[#F8F7FF]" : ""}`}
                    style={{ fontSize: "0.85rem" }}
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${ratingFilter === rating ? "border-[#6D28D9] bg-[#6D28D9]" : "border-[#E5E7EB]"}`}>
                      {ratingFilter === rating && <Check size={12} className="text-white" />}
                    </div>
                    {rating}+ Stars
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Apply Filters Button */}
          <button
            onClick={applyFilters}
            className="ml-auto px-6 py-3 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-2xl hover:shadow-lg transition-all"
            style={{ fontSize: "0.9rem", fontWeight: 600 }}
          >
            <Filter size={18} className="inline mr-2" />
            Apply Filters
          </button>

          {/* Saved Only Toggle */}
          <button
            onClick={() => setSavedOnly(!savedOnly)}
            className={`px-5 py-3 rounded-2xl border-2 transition-all ${
              savedOnly
                ? "bg-[#FDF2F8] border-[#EC4899] text-[#EC4899]"
                : "bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#EC4899]"
            }`}
            style={{ fontSize: "0.9rem", fontWeight: 600 }}
          >
            <Heart size={18} className={`inline mr-2 ${savedOnly ? "fill-[#EC4899]" : ""}`} />
            Saved Only
          </button>
        </div>
      </div>

      {/* Employee Grid */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[#1A1A3E]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
            All Employees ({filteredEmployees.length})
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              onClick={() => navigate(`/employee/${employee.id}`)}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-3">
                <img src={employee.image} alt={employee.name} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-[#1A1A3E]" style={{ fontSize: "1rem", fontWeight: 600 }}>
                      {employee.name}
                    </h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      className="p-1.5"
                    >
                      <Heart
                        size={18}
                        className={`transition-colors ${employee.saved ? "fill-[#EC4899] text-[#EC4899]" : "text-[#9CA3AF] hover:text-[#EC4899]"}`}
                      />
                    </button>
                  </div>
                  <p className="text-[#6B7280] mb-2" style={{ fontSize: "0.85rem" }}>
                    {employee.title}
                  </p>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={14} className="text-[#9CA3AF]" />
                    <span className="text-[#6B7280]" style={{ fontSize: "0.75rem" }}>
                      {employee.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="fill-[#F59E0B] text-[#F59E0B]" />
                  <span className="text-[#1A1A3E]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    {employee.rating}
                  </span>
                  <span className="text-[#9CA3AF]" style={{ fontSize: "0.75rem" }}>
                    ({employee.reviews})
                  </span>
                </div>
                <span
                  className={`px-2 py-1 rounded-lg ${
                    employee.available ? "bg-[#D1FAE5] text-[#059669]" : "bg-[#FEE2E2] text-[#DC2626]"
                  }`}
                  style={{ fontSize: "0.7rem", fontWeight: 600 }}
                >
                  {employee.available ? "Available" : "Busy"}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#F3F4F6]">
                <span className="text-[#1A1A3E]" style={{ fontSize: "1rem", fontWeight: 700 }}>
                  {employee.rate}
                </span>
                <button className="px-4 py-2 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-lg hover:shadow-md transition-all" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                  <MessageSquare size={14} className="inline mr-1.5" />
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Assistant Floating Button */}
      <button
        onClick={() => setShowAI(!showAI)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center z-50"
      >
        <Bot size={28} />
      </button>

      {/* AI Assistant Modal */}
      {showAI && (
        <div className="fixed bottom-28 right-8 w-96 bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] z-50">
          <div className="bg-gradient-to-r from-[#6D28D9] to-[#2563EB] px-5 py-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Bot size={20} className="text-white" />
              </div>
              <div>
                <p className="text-white" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                  Hustlify AI
                </p>
                <p className="text-white/80" style={{ fontSize: "0.7rem" }}>
                  Your hiring assistant
                </p>
              </div>
            </div>
            <button onClick={() => setShowAI(false)} className="text-white/80 hover:text-white">
              <X size={20} />
            </button>
          </div>

          <div className="p-4 h-80 overflow-y-auto space-y-3">
            {aiMessages.length === 0 ? (
              <div className="text-center py-8">
                <Bot size={48} className="text-[#6D28D9] mx-auto mb-3" />
                <p className="text-[#6B7280]" style={{ fontSize: "0.9rem" }}>
                  Hi! I'm here to help you find the perfect candidate. Ask me anything!
                </p>
              </div>
            ) : (
              aiMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white"
                        : "bg-[#F8F7FF] text-[#1A1A3E]"
                    }`}
                    style={{ fontSize: "0.85rem" }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-[#E5E7EB]">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendAiMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2.5 bg-[#F8F7FF] rounded-xl border border-[#E5E7EB] text-[#1A1A3E] placeholder-[#9CA3AF] outline-none focus:border-[#6D28D9] transition-all"
                style={{ fontSize: "0.85rem" }}
              />
              <button
                onClick={handleSendAiMessage}
                className="px-4 py-2.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:shadow-md transition-all"
              >
                <MessageSquare size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
