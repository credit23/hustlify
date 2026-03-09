import { useNavigate } from "react-router";
import { useState } from "react";
import { Search, MapPin, Star, Heart, MessageSquare, Filter, Sparkles, ChevronRight, ChevronLeft, DollarSign, Check, Bot, CheckCircle, X, Award } from "lucide-react";
import { motion } from "motion/react";
import imgImage6 from "../../../assets/225350e362ddcd84f3581c2fdf7b5ea867eadc53.png";

const TOP_EMPLOYEES = [
  { id: 1, name: "Abdelkader Boualam", title: "Web Developer, Mobile Apps", location: "Algiers, Dergana", rating: 4.9, reviews: 127, rate: "3000DA", image: imgImage6, verified: true, available: true, skills: ["React", "Node.js"], completedProjects: 47, yearsExperience: 5 },
  { id: 2, name: "Sarah Messaoudi", title: "UI/UX Designer", location: "Oran, Es Senia", rating: 4.8, reviews: 94, rate: "2500DA", image: imgImage6, verified: true, available: true, skills: ["Figma", "Adobe XD"], completedProjects: 38, yearsExperience: 4 },
  { id: 3, name: "Karim Benali", title: "Mobile Developer", location: "Constantine", rating: 4.9, reviews: 156, rate: "3200DA", image: imgImage6, verified: true, available: true, skills: ["React Native", "Flutter"], completedProjects: 62, yearsExperience: 6 },
];

// 36 employees across 3 pages (12 per page)
const ALL_EMPLOYEES = [
  { id: 1,  name: "Abdelkader Bouam",   title: "Web Developer",       location: "Algiers, Dergana",    rating: 4.9, reviews: 127, rate: "3000DA/H", image: imgImage6, verified: true,  available: true,  saved: false },
  { id: 2,  name: "Yacine Benali",      title: "Mobile Developer",    location: "Constantine",         rating: 4.7, reviews: 89,  rate: "2800DA/H", image: imgImage6, verified: true,  available: true,  saved: false },
  { id: 3,  name: "Amira Khelifi",      title: "Graphic Designer",    location: "Tizi Ouzou",          rating: 4.8, reviews: 102, rate: "2200DA/H", image: imgImage6, verified: false, available: false, saved: true  },
  { id: 4,  name: "Mohamed Bencherif",  title: "Electrician",         location: "Blida",               rating: 4.6, reviews: 73,  rate: "1500DA/H", image: imgImage6, verified: true,  available: true,  saved: false },
  { id: 5,  name: "Lina Hamidi",        title: "Content Writer",      location: "Algiers, Bab Ezzouar",rating: 4.9, reviews: 156, rate: "1800DA/H", image: imgImage6, verified: true,  available: true,  saved: false },
  { id: 6,  name: "Karim Boudjemaa",    title: "Plumber",             location: "Setif",               rating: 4.5, reviews: 61,  rate: "1200DA/H", image: imgImage6, verified: false, available: false, saved: false },
  { id: 7,  name: "Yasmine Larbi",      title: "Digital Marketer",    location: "Oran",                rating: 4.8, reviews: 118, rate: "2500DA/H", image: imgImage6, verified: true,  available: false, saved: true  },
  { id: 8,  name: "Riad Meziane",       title: "Photographer",        location: "Annaba",              rating: 4.7, reviews: 85,  rate: "3500DA/H", image: imgImage6, verified: true,  available: true,  saved: false },
  { id: 9,  name: "Nadia Ferhat",       title: "Data Analyst",        location: "Algiers, Kouba",      rating: 4.8, reviews: 110, rate: "3200DA/H", image: imgImage6, verified: true,  available: true,  saved: false },
  { id: 10, name: "Omar Zidane",        title: "Backend Developer",   location: "Oran, Bir El Djir",  rating: 4.6, reviews: 77,  rate: "2900DA/H", image: imgImage6, verified: true,  available: true,  saved: false },
  { id: 11, name: "Sabrina Aouiti",     title: "Translator",          location: "Algiers, Hussein Dey",rating: 4.7, reviews: 93,  rate: "1600DA/H", image: imgImage6, verified: false, available: true,  saved: false },
  { id: 12, name: "Bilal Mansouri",     title: "Video Editor",        location: "Batna",               rating: 4.9, reviews: 141, rate: "2700DA/H", image: imgImage6, verified: true,  available: true,  saved: true  },
  { id: 13, name: "Fatima Oukaci",      title: "Accountant",          location: "Tlemcen",             rating: 4.5, reviews: 58,  rate: "2000DA/H", image: imgImage6, verified: true,  available: false, saved: false },
  { id: 14, name: "Hichem Boulares",    title: "3D Artist",           location: "Algiers, Cheraga",    rating: 4.8, reviews: 99,  rate: "3100DA/H", image: imgImage6, verified: true,  available: true,  saved: false },
  { id: 15, name: "Meriem Saadi",       title: "SEO Specialist",      location: "Constantine",         rating: 4.6, reviews: 67,  rate: "2100DA/H", image: imgImage6, verified: false, available: true,  saved: false },
  { id: 16, name: "Adel Bekkouche",     title: "Network Engineer",    location: "Sidi Bel Abbes",      rating: 4.7, reviews: 82,  rate: "3300DA/H", image: imgImage6, verified: true,  available: false, saved: false },
  { id: 17, name: "Houria Benmoussa",   title: "Interior Designer",   location: "Algiers, Hydra",      rating: 4.9, reviews: 134, rate: "2600DA/H", image: imgImage6, verified: true,  available: true,  saved: true  },
  { id: 18, name: "Walid Hadjadj",      title: "Carpenter",           location: "Biskra",              rating: 4.4, reviews: 49,  rate: "1400DA/H", image: imgImage6, verified: false, available: true,  saved: false },
  { id: 19, name: "Asma Boukhobza",     title: "Social Media Mgr",    location: "Oran",                rating: 4.8, reviews: 107, rate: "2300DA/H", image: imgImage6, verified: true,  available: true,  saved: false },
  { id: 20, name: "Tarek Mouloudi",     title: "DevOps Engineer",     location: "Algiers, Ben Aknoun", rating: 4.9, reviews: 159, rate: "4000DA/H", image: imgImage6, verified: true,  available: true,  saved: false },
  { id: 21, name: "Lynda Cherif",       title: "HR Consultant",       location: "Setif",               rating: 4.6, reviews: 71,  rate: "2400DA/H", image: imgImage6, verified: true,  available: false, saved: false },
  { id: 22, name: "Sofiane Amrani",     title: "iOS Developer",       location: "Algiers, Dely Ibrahim",rating: 4.8, reviews: 115, rate: "3600DA/H", image: imgImage6, verified: true,  available: true,  saved: false },
  { id: 23, name: "Rania Belhadj",      title: "Makeup Artist",       location: "Blida",               rating: 4.7, reviews: 88,  rate: "1900DA/H", image: imgImage6, verified: false, available: true,  saved: true  },
  { id: 24, name: "Mourad Ouali",       title: "Cybersecurity Expert",location: "Algiers, El Harrach", rating: 4.9, reviews: 143, rate: "4500DA/H", image: imgImage6, verified: true,  available: true,  saved: false },
  { id: 25, name: "Zineb Boudaoud",     title: "Event Planner",       location: "Tizi Ouzou",          rating: 4.5, reviews: 63,  rate: "2200DA/H", image: imgImage6, verified: true,  available: false, saved: false },
  { id: 26, name: "Rachid Toumi",       title: "Painter",             location: "Annaba",              rating: 4.4, reviews: 44,  rate: "1100DA/H", image: imgImage6, verified: false, available: true,  saved: false },
  { id: 27, name: "Imane Hamzaoui",     title: "Nutritionist",        location: "Algiers, Bouzareah",  rating: 4.8, reviews: 96,  rate: "2800DA/H", image: imgImage6, verified: true,  available: true,  saved: false },
  { id: 28, name: "Nassim Bettache",    title: "Android Developer",   location: "Oran, Es Senia",      rating: 4.7, reviews: 79,  rate: "3000DA/H", image: imgImage6, verified: true,  available: true,  saved: false },
  { id: 29, name: "Dalila Mazouz",      title: "Language Teacher",    location: "Constantine",         rating: 4.6, reviews: 68,  rate: "1700DA/H", image: imgImage6, verified: true,  available: false, saved: true  },
  { id: 30, name: "Khaled Sahraoui",    title: "Architect",           location: "Algiers, Bir Mourad", rating: 4.9, reviews: 152, rate: "3800DA/H", image: imgImage6, verified: true,  available: true,  saved: false },
  { id: 31, name: "Feriel Brahim",      title: "Psychologist",        location: "Blida",               rating: 4.7, reviews: 84,  rate: "2500DA/H", image: imgImage6, verified: true,  available: true,  saved: false },
  { id: 32, name: "Anis Bensaid",       title: "Game Developer",      location: "Setif",               rating: 4.8, reviews: 108, rate: "3400DA/H", image: imgImage6, verified: true,  available: false, saved: false },
  { id: 33, name: "Samira Kerboua",     title: "Fashion Designer",    location: "Algiers, Kouba",      rating: 4.6, reviews: 72,  rate: "2000DA/H", image: imgImage6, verified: false, available: true,  saved: false },
  { id: 34, name: "Ayoub Kaci",         title: "Cloud Architect",     location: "Algiers, Telemly",    rating: 4.9, reviews: 161, rate: "4200DA/H", image: imgImage6, verified: true,  available: true,  saved: false },
  { id: 35, name: "Nawal Ghezali",      title: "Legal Advisor",       location: "Oran",                rating: 4.7, reviews: 91,  rate: "3500DA/H", image: imgImage6, verified: true,  available: true,  saved: true  },
  { id: 36, name: "Hamza Boukhari",     title: "Drone Operator",      location: "Tlemcen",             rating: 4.5, reviews: 55,  rate: "2900DA/H", image: imgImage6, verified: true,  available: false, saved: false },
];

const ITEMS_PER_PAGE = 12;
const TOTAL_PAGES = Math.ceil(ALL_EMPLOYEES.length / ITEMS_PER_PAGE);

export default function BrowsePage() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [savedOnly, setSavedOnly] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [aiMessage, setAiMessage] = useState("");
  const [aiMessages, setAiMessages] = useState<Array<{ role: "user" | "ai"; text: string }>>([]);

  const [locationFilters, setLocationFilters] = useState<string[]>([]);
  const [locationInput, setLocationInput] = useState("");
  const [priceFilter, setPriceFilter] = useState<string | null>(null);
  const [availabilityFilter, setAvailabilityFilter] = useState<string | null>(null);
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);

  const [appliedLocationFilters, setAppliedLocationFilters] = useState<string[]>([]);
  const [appliedPriceFilter, setAppliedPriceFilter] = useState<string | null>(null);
  const [appliedAvailabilityFilter, setAppliedAvailabilityFilter] = useState<string | null>(null);
  const [appliedRatingFilter, setAppliedRatingFilter] = useState<number>(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const addLocation = () => {
    const val = locationInput.trim();
    if (val && !locationFilters.includes(val)) {
      setLocationFilters(prev => [...prev, val]);
    }
    setLocationInput("");
  };
  const removeLocation = (loc: string) => setLocationFilters(prev => prev.filter(l => l !== loc));

  const applyFilters = () => {
    setAppliedLocationFilters(locationFilters);
    setAppliedPriceFilter(priceFilter);
    setAppliedAvailabilityFilter(availabilityFilter);
    setAppliedRatingFilter(ratingFilter);
    setActiveFilter(null);
    setCurrentPage(1);
  };

  const handleSendAiMessage = () => {
    if (!aiMessage.trim()) return;
    setAiMessages((prev) => [...prev, { role: "user", text: aiMessage }]);
    setTimeout(() => {
      const responses = [
        "I can help you find the perfect candidate! What specific skills are you looking for?",
        "Based on your requirements, I'd recommend filtering by location and rating to find the best match.",
        "Great question! Let me analyze the available candidates for you...",
        "I found several highly-rated professionals who match your criteria. Would you like me to show you their profiles?",
      ];
      setAiMessages((prev) => [...prev, { role: "ai", text: responses[Math.floor(Math.random() * responses.length)] }]);
    }, 1000);
    setAiMessage("");
  };

  const getRateValue = (rateStr: string): number => parseInt(rateStr.replace(/[^\d]/g, ""));

  let filteredEmployees = savedOnly ? ALL_EMPLOYEES.filter((e) => e.saved) : ALL_EMPLOYEES;
  if (appliedLocationFilters.length > 0) filteredEmployees = filteredEmployees.filter((e) => appliedLocationFilters.some(loc => e.location.toLowerCase().includes(loc.toLowerCase())));
  if (appliedPriceFilter) {
    filteredEmployees = filteredEmployees.filter((e) => {
      const rate = getRateValue(e.rate);
      if (appliedPriceFilter === "0-1500") return rate <= 1500;
      if (appliedPriceFilter === "1500-2500") return rate > 1500 && rate <= 2500;
      if (appliedPriceFilter === "2500-3500") return rate > 2500 && rate <= 3500;
      if (appliedPriceFilter === "3500+") return rate > 3500;
      return true;
    });
  }
  if (appliedAvailabilityFilter === "available") filteredEmployees = filteredEmployees.filter((e) => e.available);
  else if (appliedAvailabilityFilter === "not-available") filteredEmployees = filteredEmployees.filter((e) => !e.available);
  if (appliedRatingFilter > 0) filteredEmployees = filteredEmployees.filter((e) => e.rating >= appliedRatingFilter);

  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
  const paginatedEmployees = filteredEmployees.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-[#1A1A3E] mb-2" style={{ fontSize: "2.25rem", fontWeight: 700 }}>Browse Employees</h1>
        <p className="text-[#6B7280]" style={{ fontSize: "1rem" }}>Discover talented professionals ready to work on your projects.</p>
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

      {/* Featured Employees — smaller panel */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={22} className="text-[#6D28D9]" />
          <h2 className="text-[#1A1A3E]" style={{ fontSize: "1.4rem", fontWeight: 700 }}>Featured Employees</h2>
          <p className="text-[#6B7280] ml-2" style={{ fontSize: "0.9rem" }}>Top-rated professionals ready to work.</p>
        </div>

        <div className="relative bg-gradient-to-br from-[#1E1B4B] via-[#312E81] to-[#1E3A8A] rounded-2xl px-6 py-5 border border-[#6D28D9]/30 shadow-xl overflow-hidden">
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-[#6D28D9]/30 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-[#3B82F6]/30 to-transparent rounded-full blur-3xl" />

          <div className="relative grid grid-cols-3 gap-5">
            {TOP_EMPLOYEES.map((employee, idx) => (
              <motion.div
                key={employee.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.12, duration: 0.5 }}
                onMouseEnter={() => setHoveredCard(employee.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`relative bg-gradient-to-br from-white via-[#F8F7FF] to-[#EEF2FF] rounded-2xl p-5 border-2 shadow-lg transition-all duration-300 ${hoveredCard === employee.id ? "border-[#6D28D9]/60 shadow-2xl -translate-y-2" : "border-[#C7D2FE]/40"}`}
              >
                {idx === 0 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <div className="px-4 py-1.5 bg-gradient-to-r from-[#F59E0B] via-[#EF4444] to-[#EC4899] rounded-full flex items-center gap-1.5 shadow-lg">
                      <Award size={13} className="text-white" />
                      <span className="text-white" style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.5px" }}>TOP RATED</span>
                    </div>
                  </div>
                )}

                {/* Avatar */}
                <div className="flex flex-col items-center mb-4 mt-1">
                  <div className="relative">
                    <div className="absolute -inset-1.5 bg-gradient-to-r from-[#6D28D9] via-[#3B82F6] to-[#8B5CF6] rounded-full opacity-70 blur-sm" />
                    <div className="relative">
                      <img src={employee.image} alt={employee.name} className="w-20 h-20 rounded-full object-cover ring-3 ring-white shadow-md" />
                      <div className="absolute -bottom-1.5 -right-1.5">
                        {employee.available ? (
                          <div className="w-8 h-8 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-full flex items-center justify-center border-2 border-white shadow-md">
                            <CheckCircle size={14} className="text-white" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-gradient-to-br from-[#EF4444] to-[#DC2626] rounded-full flex items-center justify-center border-2 border-white shadow-md">
                            <X size={14} className="text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="text-center mb-3">
                  <h3 className="text-[#1A1A3E] mb-1" style={{ fontSize: "1rem", fontWeight: 700 }}>{employee.name}</h3>
                  <p className="text-[#6B7280] mb-2" style={{ fontSize: "0.82rem" }}>{employee.title}</p>
                  <div className="flex items-center justify-center gap-1.5 mb-2 px-3 py-1.5 bg-[#F0EEFF] rounded-lg">
                    <MapPin size={13} className="text-[#6D28D9]" />
                    <span className="text-[#6D28D9]" style={{ fontSize: "0.78rem", fontWeight: 600 }}>{employee.location}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 px-3 py-1.5 bg-[#FEF3C7] rounded-lg">
                    <Star size={14} className="fill-[#F59E0B] text-[#F59E0B]" />
                    <span className="text-[#92400E]" style={{ fontSize: "0.9rem", fontWeight: 700 }}>{employee.rating}</span>
                    <span className="text-[#92400E]" style={{ fontSize: "0.75rem" }}>({employee.reviews})</span>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap justify-center gap-1.5 mb-3">
                  {employee.skills.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] text-white rounded-lg" style={{ fontSize: "0.73rem", fontWeight: 600 }}>{skill}</span>
                  ))}
                </div>

                {/* Hover Expand: Experience + Projects */}
                <div
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ maxHeight: hoveredCard === employee.id ? "120px" : "0px", opacity: hoveredCard === employee.id ? 1 : 0 }}
                >
                  <div className="grid grid-cols-2 gap-3 mb-3 p-3 bg-gradient-to-r from-[#F0EEFF] to-[#EBF4FF] rounded-xl border border-[#6D28D9]/15">
                    <div className="text-center">
                      <p className="bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] bg-clip-text text-transparent" style={{ fontSize: "1.6rem", fontWeight: 800 }}>{employee.completedProjects}</p>
                      <p className="text-[#6B7280]" style={{ fontSize: "0.72rem", fontWeight: 600 }}>Projects Done</p>
                    </div>
                    <div className="text-center">
                      <p className="bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] bg-clip-text text-transparent" style={{ fontSize: "1.6rem", fontWeight: 800 }}>{employee.yearsExperience}+ yrs</p>
                      <p className="text-[#6B7280]" style={{ fontSize: "0.72rem", fontWeight: 600 }}>Experience</p>
                    </div>
                  </div>
                </div>

                {/* Rate + Buttons */}
                <div className="text-center mb-3 pb-3 border-b border-dashed border-[#E5E7EB]">
                  <span className="bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] bg-clip-text text-transparent" style={{ fontSize: "1.5rem", fontWeight: 700 }}>{employee.rate}</span>
                  <span className="text-[#9CA3AF]" style={{ fontSize: "0.8rem" }}> / hr</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => navigate(`/employee/${employee.id}`)} className="flex-1 py-2 border-2 border-[#6D28D9] text-[#6D28D9] rounded-xl hover:bg-[#F0EEFF] transition-all" style={{ fontSize: "0.8rem", fontWeight: 700 }}>View</button>
                  <button className="flex-1 py-2 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-1" style={{ fontSize: "0.8rem", fontWeight: 700 }}>
                    <MessageSquare size={14} /> Connect
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="relative z-30">
        <div className="bg-white/60 backdrop-blur-md rounded-3xl px-6 py-4 border border-[#E5E7EB]/50 shadow-lg flex items-center gap-3 flex-wrap">

          {/* Location — multi-select */}
          <div className="relative">
            <button
              onClick={() => setActiveFilter(activeFilter === "Location" ? null : "Location")}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all shadow-sm ${locationFilters.length > 0 ? "bg-[#F0EEFF] border-[#6D28D9]" : "bg-white border-[#E5E7EB] hover:border-[#6D28D9]"}`}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6D28D9] to-[#8B5CF6] flex items-center justify-center"><MapPin size={16} className="text-white" /></div>
              <div className="flex flex-col items-start">
                <span className="text-[#1A1A3E]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Location</span>
                {locationFilters.length > 0
                  ? <span className="text-[#6D28D9]" style={{ fontSize: "0.7rem", fontWeight: 600 }}>{locationFilters.length} selected</span>
                  : <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>Any</span>
                }
              </div>
              <ChevronRight size={14} className="text-[#9CA3AF]" />
            </button>
            {activeFilter === "Location" && (
              <div className="absolute top-full mt-2 left-0 z-[100] bg-white rounded-xl shadow-2xl border border-[#E5E7EB] p-4 w-72">
                <p className="text-[#1A1A3E] mb-2" style={{ fontSize: "0.85rem", fontWeight: 600 }}>Enter Wilaya or Commune</p>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addLocation(); } }}
                    placeholder="e.g., Algiers, Blida..."
                    className="flex-1 px-3 py-2 bg-[#F8F7FF] rounded-lg border border-[#E5E7EB] text-[#1A1A3E] placeholder-[#9CA3AF] outline-none focus:border-[#6D28D9] transition-all"
                    style={{ fontSize: "0.85rem" }}
                    autoFocus
                  />
                  <button
                    onClick={addLocation}
                    className="px-3 py-2 bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white rounded-lg hover:shadow-md transition-all"
                    style={{ fontSize: "0.85rem", fontWeight: 700 }}
                  >+</button>
                </div>
                {locationFilters.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {locationFilters.map((loc) => (
                      <span key={loc} className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white rounded-lg" style={{ fontSize: "0.78rem", fontWeight: 600 }}>
                        {loc}
                        <button onClick={() => removeLocation(loc)} className="ml-0.5 hover:opacity-70 transition-opacity">
                          <X size={11} strokeWidth={3} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Price */}
          <div className="relative">
            <button
              onClick={() => setActiveFilter(activeFilter === "Price" ? null : "Price")}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all shadow-sm ${priceFilter ? "bg-[#FFFBEB] border-[#F59E0B]" : "bg-white border-[#E5E7EB] hover:border-[#6D28D9]"}`}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center"><DollarSign size={16} className="text-white" /></div>
              <div className="flex flex-col items-start">
                <span className="text-[#1A1A3E]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Price</span>
                <span className={priceFilter ? "text-[#D97706]" : "text-[#9CA3AF]"} style={{ fontSize: "0.7rem", fontWeight: priceFilter ? 600 : 400 }}>
                  {priceFilter === "0-1500" ? "0-1,500DA" : priceFilter === "1500-2500" ? "1,500-2,500DA" : priceFilter === "2500-3500" ? "2,500-3,500DA" : priceFilter === "3500+" ? "3,500+DA" : "Any Range"}
                </span>
              </div>
              <ChevronRight size={14} className="text-[#9CA3AF]" />
            </button>
            {activeFilter === "Price" && (
              <div className="absolute top-full mt-2 left-0 z-[100] bg-white rounded-xl shadow-2xl border border-[#E5E7EB] p-3 w-64">
                {[["0-1500","0 - 1,500 DA/hr"],["1500-2500","1,500 - 2,500 DA/hr"],["2500-3500","2,500 - 3,500 DA/hr"],["3500+","3,500+ DA/hr"]].map(([val, label]) => (
                  <button key={val} onClick={() => setPriceFilter(priceFilter === val ? null : val)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F8F7FF] transition-colors ${priceFilter === val ? "bg-[#FFFBEB]" : ""}`} style={{ fontSize: "0.85rem" }}>
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${priceFilter === val ? "border-[#F59E0B] bg-[#F59E0B]" : "border-[#E5E7EB]"}`}>{priceFilter === val && <Check size={12} className="text-white" />}</div>
                    <span className={priceFilter === val ? "text-[#D97706] font-semibold" : "text-[#374151]"}>{label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Availability — toggle click to remove */}
          <div className="relative">
            <button
              onClick={() => setActiveFilter(activeFilter === "Availability" ? null : "Availability")}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all shadow-sm ${
                availabilityFilter === "not-available" ? "bg-[#FFF7E6] border-[#F59E0B]" :
                availabilityFilter === "available" ? "bg-[#F0FDF4] border-[#10B981]" :
                "bg-white border-[#E5E7EB] hover:border-[#6D28D9]"
              }`}
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                availabilityFilter === "not-available" ? "bg-[#EF4444]" : "bg-gradient-to-br from-[#10B981] to-[#059669]"
              }`}>
                {availabilityFilter === "not-available"
                  ? <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center"><X size={11} className="text-white" strokeWidth={3} /></div>
                  : <CheckCircle size={16} className="text-white" />
                }
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[#1A1A3E]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Availability</span>
                <span className={`${availabilityFilter === "not-available" ? "text-[#F59E0B]" : availabilityFilter === "available" ? "text-[#10B981]" : "text-[#9CA3AF]"}`} style={{ fontSize: "0.7rem", fontWeight: availabilityFilter ? 600 : 400 }}>
                  {availabilityFilter === "available" ? "Available" : availabilityFilter === "not-available" ? "Not Available" : "Any"}
                </span>
              </div>
              <ChevronRight size={14} className="text-[#9CA3AF]" />
            </button>
            {activeFilter === "Availability" && (
              <div className="absolute top-full mt-2 left-0 z-[100] bg-white rounded-xl shadow-2xl border border-[#E5E7EB] p-3 w-56">
                <button
                  onClick={() => setAvailabilityFilter(availabilityFilter === "available" ? null : "available")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all mb-1 ${availabilityFilter === "available" ? "bg-[#F0FDF4]" : "hover:bg-[#F8F7FF]"}`}
                  style={{ fontSize: "0.85rem" }}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${availabilityFilter === "available" ? "bg-[#10B981]" : "bg-[#E5E7EB]"}`}>
                    <CheckCircle size={16} className={availabilityFilter === "available" ? "text-white" : "text-[#9CA3AF]"} />
                  </div>
                  <span className={availabilityFilter === "available" ? "text-[#059669] font-semibold" : "text-[#374151]"}>Available Now</span>
                </button>
                <button
                  onClick={() => setAvailabilityFilter(availabilityFilter === "not-available" ? null : "not-available")}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${availabilityFilter === "not-available" ? "bg-[#FFF7E6]" : "hover:bg-[#F8F7FF]"}`}
                  style={{ fontSize: "0.85rem" }}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${availabilityFilter === "not-available" ? "bg-[#EF4444]" : "bg-[#E5E7EB]"}`}>
                    <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                      <X size={10} className={availabilityFilter === "not-available" ? "text-white" : "text-[#9CA3AF]"} strokeWidth={3} />
                    </div>
                  </div>
                  <span className={availabilityFilter === "not-available" ? "text-[#F59E0B] font-semibold" : "text-[#374151]"}>Not Available</span>
                </button>
              </div>
            )}
          </div>

          {/* Rating — 5 clickable stars */}
          <div className="relative">
            <button
              onClick={() => setActiveFilter(activeFilter === "Rating" ? null : "Rating")}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all shadow-sm ${ratingFilter > 0 ? "bg-[#FFFBEB] border-[#F59E0B]" : "bg-white border-[#E5E7EB] hover:border-[#6D28D9]"}`}
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center">
                <Star size={16} className="fill-white text-white" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[#1A1A3E]" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Rating</span>
                {ratingFilter > 0
                  ? <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <Star key={s} size={10} className={s <= ratingFilter ? "fill-[#F59E0B] text-[#F59E0B]" : "text-[#D1D5DB]"} />)}</div>
                  : <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>Any</span>
                }
              </div>
              <ChevronRight size={14} className="text-[#9CA3AF]" />
            </button>
            {activeFilter === "Rating" && (
              <div className="absolute top-full mt-2 left-0 z-[100] bg-white rounded-xl shadow-2xl border border-[#E5E7EB] p-4 w-52">
                <p className="text-[#1A1A3E] mb-3" style={{ fontSize: "0.82rem", fontWeight: 600 }}>Minimum rating</p>
                <div className="flex items-center justify-center gap-2 mb-2"
                  onMouseLeave={() => setHoverRating(0)}
                >
                  {[1,2,3,4,5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onClick={() => setRatingFilter(ratingFilter === star ? 0 : star)}
                      className="transition-transform hover:scale-125"
                    >
                      <Star
                        size={28}
                        className={`transition-colors ${
                          star <= (hoverRating || ratingFilter)
                            ? "fill-[#F59E0B] text-[#F59E0B]"
                            : "fill-none text-[#D1D5DB]"
                        }`}
                        strokeWidth={1.5}
                      />
                    </button>
                  ))}
                </div>
                {ratingFilter > 0 && (
                  <p className="text-center text-[#D97706] mt-1" style={{ fontSize: "0.78rem", fontWeight: 600 }}>
                    {ratingFilter}+ stars selected
                  </p>
                )}
                {ratingFilter > 0 && (
                  <button onClick={() => setRatingFilter(0)} className="mt-2 w-full py-1.5 text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg transition-colors text-center" style={{ fontSize: "0.78rem", fontWeight: 600 }}>
                    Clear
                  </button>
                )}
              </div>
            )}
          </div>

          <button onClick={applyFilters} className="ml-auto px-6 py-3 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-2xl hover:shadow-lg transition-all" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
            <Filter size={18} className="inline mr-2" />Apply Filters
          </button>
          <button onClick={() => setSavedOnly(!savedOnly)} className={`px-5 py-3 rounded-2xl border-2 transition-all ${savedOnly ? "bg-[#FDF2F8] border-[#EC4899] text-[#EC4899]" : "bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#EC4899]"}`} style={{ fontSize: "0.9rem", fontWeight: 600 }}>
            <Heart size={18} className={`inline mr-2 ${savedOnly ? "fill-[#EC4899]" : ""}`} />Saved Only
          </button>
        </div>
      </div>

      {/* Employee Grid */}
      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[#1A1A3E]" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
            All Employees ({filteredEmployees.length})
          </h2>
          <p className="text-[#6B7280]" style={{ fontSize: "0.9rem" }}>
            Page {currentPage} of {totalPages}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {paginatedEmployees.map((employee) => (
            <div
              key={employee.id}
              onClick={() => navigate(`/employee/${employee.id}`)}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 border border-[#E5E7EB] shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-3">
                <img src={employee.image} alt={employee.name} className="w-16 h-16 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-[#1A1A3E]" style={{ fontSize: "1rem", fontWeight: 600 }}>{employee.name}</h4>
                    <button onClick={(e) => e.stopPropagation()} className="p-1.5">
                      <Heart size={18} className={`transition-colors ${employee.saved ? "fill-[#EC4899] text-[#EC4899]" : "text-[#9CA3AF] hover:text-[#EC4899]"}`} />
                    </button>
                  </div>
                  <p className="text-[#6B7280] mb-2" style={{ fontSize: "0.85rem" }}>{employee.title}</p>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#9CA3AF]" />
                    <span className="text-[#6B7280]" style={{ fontSize: "0.75rem" }}>{employee.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="fill-[#F59E0B] text-[#F59E0B]" />
                  <span className="text-[#1A1A3E]" style={{ fontSize: "0.85rem", fontWeight: 600 }}>{employee.rating}</span>
                  <span className="text-[#9CA3AF]" style={{ fontSize: "0.75rem" }}>({employee.reviews})</span>
                </div>
                <span className={`px-2 py-1 rounded-lg ${employee.available ? "bg-[#D1FAE5] text-[#059669]" : "bg-[#FEE2E2] text-[#DC2626]"}`} style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                  {employee.available ? "Available" : "Busy"}
                </span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#F3F4F6]">
                <span className="text-[#1A1A3E]" style={{ fontSize: "1rem", fontWeight: 700 }}>{employee.rate}</span>
                <button className="px-4 py-2 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-lg hover:shadow-md transition-all" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
                  <MessageSquare size={14} className="inline mr-1.5" />Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4 pb-8">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#6D28D9] hover:text-[#6D28D9] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
            style={{ fontSize: "0.9rem", fontWeight: 600 }}
          >
            <ChevronLeft size={18} /> Previous
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-xl transition-all font-semibold ${
                  page === currentPage
                    ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white shadow-md"
                    : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#6D28D9] hover:text-[#6D28D9]"
                }`}
                style={{ fontSize: "0.9rem" }}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#6D28D9] hover:text-[#6D28D9] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm"
            style={{ fontSize: "0.9rem", fontWeight: 600 }}
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* AI Assistant */}
      <button onClick={() => setShowAI(!showAI)} className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center z-50">
        <Bot size={28} />
      </button>
      {showAI && (
        <div className="fixed bottom-28 right-8 w-96 bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] z-50">
          <div className="bg-gradient-to-r from-[#6D28D9] to-[#2563EB] px-5 py-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><Bot size={20} className="text-white" /></div>
              <div>
                <p className="text-white" style={{ fontSize: "0.95rem", fontWeight: 600 }}>Hustlify AI</p>
                <p className="text-white/80" style={{ fontSize: "0.7rem" }}>Your hiring assistant</p>
              </div>
            </div>
            <button onClick={() => setShowAI(false)} className="text-white/80 hover:text-white"><X size={20} /></button>
          </div>
          <div className="p-4 h-80 overflow-y-auto space-y-3">
            {aiMessages.length === 0 ? (
              <div className="text-center py-8">
                <Bot size={48} className="text-[#6D28D9] mx-auto mb-3" />
                <p className="text-[#6B7280]" style={{ fontSize: "0.9rem" }}>Hi! I'm here to help you find the perfect candidate. Ask me anything!</p>
              </div>
            ) : aiMessages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${msg.role === "user" ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white" : "bg-[#F8F7FF] text-[#1A1A3E]"}`} style={{ fontSize: "0.85rem" }}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-[#E5E7EB]">
            <div className="flex items-center gap-2">
              <input type="text" value={aiMessage} onChange={(e) => setAiMessage(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendAiMessage()} placeholder="Ask me anything..." className="flex-1 px-4 py-2.5 bg-[#F8F7FF] rounded-xl border border-[#E5E7EB] text-[#1A1A3E] placeholder-[#9CA3AF] outline-none focus:border-[#6D28D9] transition-all" style={{ fontSize: "0.85rem" }} />
              <button onClick={handleSendAiMessage} className="px-4 py-2.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:shadow-md transition-all"><MessageSquare size={18} /></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
