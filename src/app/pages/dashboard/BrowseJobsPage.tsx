import { useNavigate } from "react-router";
import { useState } from "react";
import { Search, MapPin, Bookmark, Filter, ChevronRight, DollarSign, Clock, Building2, Star, Check, X, ChevronLeft } from "lucide-react";

const ALL_JOBS = [
  { id: 1,  title: "React Native Developer",  company: "Djezzy",         location: "Algiers",    salary: "80,000–120,000 DA", type: "Full-time", category: "Tech",       posted: "2h ago",    logo: "🟠", rating: 4.7, desc: "Build cross-platform mobile apps for millions of Algerian users." },
  { id: 2,  title: "Mobile App Developer",    company: "Yassir",         location: "Algiers",    salary: "70,000–100,000 DA", type: "Full-time", category: "Tech",       posted: "5h ago",    logo: "🟡", rating: 4.9, desc: "Join Algeria's leading ride-hailing app to develop new features." },
  { id: 3,  title: "Flutter Developer",       company: "Mobilis",        location: "Oran",       salary: "60,000–90,000 DA",  type: "Contract",  category: "Tech",       posted: "1 day ago", logo: "🟢", rating: 4.5, desc: "Work on internal tools and customer-facing apps." },
  { id: 4,  title: "UI/UX Designer",          company: "Sonatrach",      location: "Algiers",    salary: "55,000–80,000 DA",  type: "Full-time", category: "Design",     posted: "1 day ago", logo: "🔵", rating: 4.6, desc: "Design interfaces for energy sector digital products." },
  { id: 5,  title: "Backend Developer",       company: "Algérie Télécom",location: "Constantine",salary: "65,000–95,000 DA",  type: "Full-time", category: "Tech",       posted: "2 days ago",logo: "🟣", rating: 4.4, desc: "Build APIs and microservices for telecom infrastructure." },
  { id: 6,  title: "Content Writer (FR/AR)",  company: "Echorouk",       location: "Algiers",    salary: "30,000–50,000 DA",  type: "Part-time", category: "Writing",    posted: "3 days ago",logo: "📰", rating: 4.3, desc: "Write engaging editorial content in French and Arabic." },
  { id: 7,  title: "Digital Marketer",        company: "Ooredoo",        location: "Algiers",    salary: "50,000–75,000 DA",  type: "Full-time", category: "Marketing",  posted: "3 days ago",logo: "🔴", rating: 4.8, desc: "Lead digital campaigns across social media channels." },
  { id: 8,  title: "Data Analyst",            company: "Sonelgaz",       location: "Blida",      salary: "70,000–100,000 DA", type: "Full-time", category: "Tech",       posted: "4 days ago",logo: "⚡", rating: 4.5, desc: "Analyse energy consumption data and build dashboards." },
  { id: 9,  title: "Graphic Designer",        company: "Air Algérie",    location: "Algiers",    salary: "40,000–65,000 DA",  type: "Full-time", category: "Design",     posted: "5 days ago",logo: "✈️", rating: 4.6, desc: "Create visual assets for marketing and brand materials." },
  { id: 10, title: "DevOps Engineer",         company: "CIB",            location: "Algiers",    salary: "90,000–130,000 DA", type: "Full-time", category: "Tech",       posted: "5 days ago",logo: "🏦", rating: 4.7, desc: "Manage CI/CD pipelines and cloud infrastructure." },
  { id: 11, title: "HR Coordinator",          company: "Cevital",        location: "Béjaïa",     salary: "40,000–60,000 DA",  type: "Full-time", category: "HR",         posted: "1 week ago", logo: "🏭", rating: 4.2, desc: "Support recruitment and employee relations activities." },
  { id: 12, title: "Cybersecurity Analyst",   company: "Algérie Poste",  location: "Algiers",    salary: "85,000–115,000 DA", type: "Full-time", category: "Tech",       posted: "1 week ago", logo: "📮", rating: 4.8, desc: "Protect digital infrastructure and respond to incidents." },
];

const CATEGORIES = ["All", "Tech", "Design", "Marketing", "Writing", "HR"];
const JOB_TYPES  = ["Full-time", "Part-time", "Contract"];
const ITEMS_PER_PAGE = 9;

export default function BrowseJobsPage() {
  const navigate = useNavigate();
  const [search, setSearch]       = useState("");
  const [category, setCategory]   = useState("All");
  const [typeFilter, setTypeFilter]= useState<string[]>([]);
  const [locationInput, setLocationInput] = useState("");
  const [locationTags, setLocationTags]   = useState<string[]>([]);
  const [salaryFilter, setSalaryFilter]   = useState<string | null>(null);
  const [saved, setSaved]         = useState<number[]>([]);
  const [page, setPage]           = useState(1);
  const [openFilter, setOpenFilter] = useState<string | null>(null);

  const addLocation = () => {
    const v = locationInput.trim();
    if (v && !locationTags.includes(v)) setLocationTags(p => [...p, v]);
    setLocationInput("");
  };

  const toggleType = (t: string) => setTypeFilter(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);
  const toggleSaved = (id: number, e: React.MouseEvent) => { e.stopPropagation(); setSaved(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]); };

  let jobs = ALL_JOBS.filter(j => {
    if (search && !j.title.toLowerCase().includes(search.toLowerCase()) && !j.company.toLowerCase().includes(search.toLowerCase())) return false;
    if (category !== "All" && j.category !== category) return false;
    if (typeFilter.length && !typeFilter.includes(j.type)) return false;
    if (locationTags.length && !locationTags.some(l => j.location.toLowerCase().includes(l.toLowerCase()))) return false;
    if (salaryFilter) {
      const min = parseInt(j.salary.replace(/\D.*/, ""));
      if (salaryFilter === "0-50000" && min > 50000) return false;
      if (salaryFilter === "50000-80000" && (min < 50000 || min > 80000)) return false;
      if (salaryFilter === "80000+" && min < 80000) return false;
    }
    return true;
  });

  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const paged = jobs.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[#1A1A3E] mb-1" style={{ fontSize: "2rem", fontWeight: 800 }}>Browse Jobs</h1>
        <p className="text-[#6B7280]" style={{ fontSize: "0.95rem" }}>Find your next opportunity in Algeria.</p>
      </div>

      {/* Search */}
      <div className="relative max-w-2xl">
        <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
        <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Search jobs, companies..." className="w-full pl-14 pr-5 py-4 bg-white rounded-2xl border border-[#E5E7EB] outline-none focus:border-[#6D28D9] shadow-sm transition-all" style={{ fontSize: "1rem" }} />
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => { setCategory(c); setPage(1); }}
            className={`px-4 py-2 rounded-xl border transition-all ${category === c ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white border-transparent shadow-md" : "bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#6D28D9]"}`}
            style={{ fontSize: "0.85rem", fontWeight: 600 }}>
            {c}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white/60 backdrop-blur-md rounded-3xl px-6 py-4 border border-[#E5E7EB]/50 shadow flex items-center gap-3 flex-wrap relative z-30">
        {/* Location */}
        <div className="relative">
          <button onClick={() => setOpenFilter(openFilter === "loc" ? null : "loc")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border shadow-sm transition-all ${locationTags.length ? "bg-[#F0EEFF] border-[#6D28D9]" : "bg-white border-[#E5E7EB] hover:border-[#6D28D9]"}`}
            style={{ fontSize: "0.85rem", fontWeight: 600 }}>
            <MapPin size={15} className="text-[#6D28D9]" />
            {locationTags.length ? `${locationTags.length} location${locationTags.length > 1 ? "s" : ""}` : "Location"}
          </button>
          {openFilter === "loc" && (
            <div className="absolute top-full mt-2 left-0 z-[100] bg-white rounded-xl shadow-2xl border border-[#E5E7EB] p-4 w-72">
              <div className="flex gap-2 mb-3">
                <input value={locationInput} onChange={e => setLocationInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addLocation()} placeholder="e.g. Algiers, Oran…" className="flex-1 px-3 py-2 bg-[#F8F7FF] rounded-lg border border-[#E5E7EB] outline-none focus:border-[#6D28D9]" style={{ fontSize: "0.85rem" }} autoFocus />
                <button onClick={addLocation} className="px-3 py-2 bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white rounded-lg font-bold">+</button>
              </div>
              {locationTags.length > 0 && <div className="flex flex-wrap gap-1.5">{locationTags.map(l => <span key={l} className="flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] text-white rounded-lg" style={{ fontSize: "0.78rem", fontWeight: 600 }}>{l}<button onClick={() => setLocationTags(p => p.filter(x => x !== l))}><X size={11} strokeWidth={3} /></button></span>)}</div>}
            </div>
          )}
        </div>

        {/* Job Type */}
        <div className="relative">
          <button onClick={() => setOpenFilter(openFilter === "type" ? null : "type")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border shadow-sm transition-all ${typeFilter.length ? "bg-[#FFFBEB] border-[#F59E0B]" : "bg-white border-[#E5E7EB] hover:border-[#6D28D9]"}`}
            style={{ fontSize: "0.85rem", fontWeight: 600 }}>
            <Clock size={15} className="text-[#F59E0B]" />
            {typeFilter.length ? typeFilter.join(", ") : "Job Type"}
          </button>
          {openFilter === "type" && (
            <div className="absolute top-full mt-2 left-0 z-[100] bg-white rounded-xl shadow-2xl border border-[#E5E7EB] p-3 w-52">
              {JOB_TYPES.map(t => (
                <button key={t} onClick={() => toggleType(t)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F8F7FF] transition-colors ${typeFilter.includes(t) ? "bg-[#FFFBEB]" : ""}`} style={{ fontSize: "0.85rem" }}>
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${typeFilter.includes(t) ? "border-[#F59E0B] bg-[#F59E0B]" : "border-[#E5E7EB]"}`}>{typeFilter.includes(t) && <Check size={11} className="text-white" />}</div>
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Salary */}
        <div className="relative">
          <button onClick={() => setOpenFilter(openFilter === "sal" ? null : "sal")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border shadow-sm transition-all ${salaryFilter ? "bg-[#F0FDF4] border-[#10B981]" : "bg-white border-[#E5E7EB] hover:border-[#6D28D9]"}`}
            style={{ fontSize: "0.85rem", fontWeight: 600 }}>
            <DollarSign size={15} className="text-[#10B981]" />
            {salaryFilter === "0-50000" ? "Under 50k" : salaryFilter === "50000-80000" ? "50k–80k" : salaryFilter === "80000+" ? "80k+" : "Salary"}
          </button>
          {openFilter === "sal" && (
            <div className="absolute top-full mt-2 left-0 z-[100] bg-white rounded-xl shadow-2xl border border-[#E5E7EB] p-3 w-52">
              {[["0-50000","Under 50,000 DA"],["50000-80000","50,000 – 80,000 DA"],["80000+","80,000+ DA"]].map(([v,l]) => (
                <button key={v} onClick={() => setSalaryFilter(salaryFilter === v ? null : v)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#F8F7FF] transition-colors ${salaryFilter === v ? "bg-[#F0FDF4]" : ""}`} style={{ fontSize: "0.85rem" }}>
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${salaryFilter === v ? "border-[#10B981] bg-[#10B981]" : "border-[#E5E7EB]"}`}>{salaryFilter === v && <Check size={11} className="text-white" />}</div>
                  {l}
                </button>
              ))}
            </div>
          )}
        </div>

        <span className="text-[#9CA3AF] ml-auto" style={{ fontSize: "0.82rem" }}>{jobs.length} jobs found</span>
      </div>

      {/* Job Grid */}
      <div className="grid grid-cols-3 gap-5">
        {paged.map(job => (
          <div key={job.id} onClick={() => navigate(`/dashboard/jobs/${job.id}`)} className="bg-white/90 rounded-2xl p-5 border border-[#E5E7EB] shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 rounded-xl bg-[#F3F4F6] flex items-center justify-center text-2xl">{job.logo}</div>
              <button onClick={e => toggleSaved(job.id, e)} className={`p-2 rounded-xl transition-all ${saved.includes(job.id) ? "bg-[#FDF2F8]" : "hover:bg-[#F8F7FF]"}`}>
                <Bookmark size={17} className={saved.includes(job.id) ? "fill-[#EC4899] text-[#EC4899]" : "text-[#9CA3AF]"} />
              </button>
            </div>
            <h3 className="text-[#1A1A3E] mb-1" style={{ fontSize: "0.95rem", fontWeight: 700 }}>{job.title}</h3>
            <div className="flex items-center gap-1.5 mb-1">
              <Building2 size={13} className="text-[#9CA3AF]" />
              <span className="text-[#6B7280]" style={{ fontSize: "0.78rem" }}>{job.company}</span>
              <div className="flex items-center gap-1 ml-1">
                <Star size={11} className="fill-[#F59E0B] text-[#F59E0B]" />
                <span className="text-[#6B7280]" style={{ fontSize: "0.73rem" }}>{job.rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 mb-3">
              <MapPin size={13} className="text-[#9CA3AF]" />
              <span className="text-[#9CA3AF]" style={{ fontSize: "0.75rem" }}>{job.location}</span>
            </div>
            <p className="text-[#6B7280] mb-3 line-clamp-2" style={{ fontSize: "0.78rem" }}>{job.desc}</p>
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="px-2.5 py-1 bg-[#F0EEFF] text-[#6D28D9] rounded-lg" style={{ fontSize: "0.72rem", fontWeight: 600 }}>{job.type}</span>
              <span className="px-2.5 py-1 bg-[#F3F4F6] text-[#6B7280] rounded-lg" style={{ fontSize: "0.72rem", fontWeight: 600 }}>{job.category}</span>
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-[#F3F4F6]">
              <span className="text-[#1A1A3E]" style={{ fontSize: "0.85rem", fontWeight: 700 }}>{job.salary}</span>
              <span className="text-[#9CA3AF]" style={{ fontSize: "0.7rem" }}>{job.posted}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 py-4">
          <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#6D28D9] disabled:opacity-40 transition-all" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
            <ChevronLeft size={18} /> Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i+1).map(p => (
            <button key={p} onClick={() => setPage(p)} className={`w-10 h-10 rounded-xl font-semibold transition-all ${p === page ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white shadow-md" : "bg-white border border-[#E5E7EB] text-[#6B7280] hover:border-[#6D28D9]"}`} style={{ fontSize: "0.9rem" }}>{p}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#E5E7EB] bg-white text-[#6B7280] hover:border-[#6D28D9] disabled:opacity-40 transition-all" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
            Next <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
