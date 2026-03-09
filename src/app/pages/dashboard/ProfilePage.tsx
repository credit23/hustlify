import { useState } from "react";
import { User, MapPin, Star, Briefcase, Edit3, Plus, X, Camera, Award, ExternalLink } from "lucide-react";
import imgProfile from "../../../assets/225350e362ddcd84f3581c2fdf7b5ea867eadc53.png";

const SKILLS_INIT = ["React Native", "Flutter", "TypeScript", "Firebase", "REST APIs", "Git"];
const EXPERIENCE_INIT = [
  { id: 1, role: "Senior Mobile Developer", company: "Djezzy", period: "2022 – Present", desc: "Led development of customer-facing mobile apps serving 15M+ users." },
  { id: 2, role: "Mobile Developer", company: "Yassir", period: "2020 – 2022", desc: "Built ride-hailing features using React Native and integrated payment SDKs." },
];
const PORTFOLIO_INIT = [
  { id: 1, title: "DZDeliver App", desc: "Last-mile delivery app with real-time tracking.", tag: "React Native" },
  { id: 2, title: "HealthDZ",      desc: "Telemedicine platform connecting patients and doctors.", tag: "Flutter" },
  { id: 3, title: "EduAlgerie",    desc: "E-learning app used by 50,000+ students.", tag: "React Native" },
];
const RATINGS = [
  { client: "Sonatrach HR", rating: 5, comment: "Exceptional work, delivered on time with great quality.", date: "Jan 2024" },
  { client: "Cevital Tech", rating: 4.8, comment: "Very professional, great communication throughout.", date: "Nov 2023" },
  { client: "Ooredoo Algérie", rating: 5, comment: "Exactly what we needed. Would hire again.", date: "Sep 2023" },
];

export default function ProfilePage() {
  const [skills, setSkills] = useState(SKILLS_INIT);
  const [newSkill, setNewSkill] = useState("");
  const [editingPersonal, setEditingPersonal] = useState(false);
  const [name, setName] = useState("Karim Benali");
  const [title, setTitle] = useState("Mobile Developer");
  const [location, setLocation] = useState("Constantine, Algeria");
  const [bio, setBio] = useState("Passionate mobile developer with 5+ years building apps for the Algerian market. Expert in React Native and Flutter.");
  const [activeTab, setActiveTab] = useState<"skills"|"experience"|"portfolio"|"ratings">("skills");

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) setSkills(p => [...p, newSkill.trim()]);
    setNewSkill("");
  };

  const avgRating = (RATINGS.reduce((s, r) => s + r.rating, 0) / RATINGS.length).toFixed(1);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-[#1A1A3E] mb-1" style={{ fontSize: "2rem", fontWeight: 800 }}>My Profile</h1>
        <p className="text-[#6B7280]" style={{ fontSize: "0.95rem" }}>How clients see you on Hustlify.</p>
      </div>

      {/* Personal Info Card */}
      <div className="bg-white/90 rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-[#1E1B4B] via-[#312E81] to-[#1E3A8A] h-24 relative">
          <div className="absolute -bottom-8 left-6">
            <div className="relative">
              <img src={imgProfile} alt="Profile" className="w-20 h-20 rounded-2xl object-cover ring-4 ring-white shadow-lg" />
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#6D28D9] rounded-lg flex items-center justify-center shadow-md">
                <Camera size={13} className="text-white" />
              </button>
            </div>
          </div>
          <button onClick={() => setEditingPersonal(!editingPersonal)} className="absolute top-3 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur text-white rounded-xl hover:bg-white/30 transition-all" style={{ fontSize: "0.8rem", fontWeight: 600 }}>
            <Edit3 size={13} /> Edit
          </button>
        </div>

        <div className="pt-12 px-6 pb-6">
          {editingPersonal ? (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[#6B7280] mb-1 block" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Full Name</label><input value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2.5 bg-[#F8F7FF] rounded-xl border border-[#E5E7EB] outline-none focus:border-[#6D28D9]" style={{ fontSize: "0.9rem" }} /></div>
                <div><label className="text-[#6B7280] mb-1 block" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Title</label><input value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2.5 bg-[#F8F7FF] rounded-xl border border-[#E5E7EB] outline-none focus:border-[#6D28D9]" style={{ fontSize: "0.9rem" }} /></div>
              </div>
              <div><label className="text-[#6B7280] mb-1 block" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Location</label><input value={location} onChange={e => setLocation(e.target.value)} className="w-full px-3 py-2.5 bg-[#F8F7FF] rounded-xl border border-[#E5E7EB] outline-none focus:border-[#6D28D9]" style={{ fontSize: "0.9rem" }} /></div>
              <div><label className="text-[#6B7280] mb-1 block" style={{ fontSize: "0.75rem", fontWeight: 600 }}>Bio</label><textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="w-full px-3 py-2.5 bg-[#F8F7FF] rounded-xl border border-[#E5E7EB] outline-none focus:border-[#6D28D9] resize-none" style={{ fontSize: "0.9rem" }} /></div>
              <button onClick={() => setEditingPersonal(false)} className="px-5 py-2.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:shadow-lg transition-all" style={{ fontSize: "0.88rem", fontWeight: 700 }}>Save Changes</button>
            </div>
          ) : (
            <div>
              <h2 className="text-[#1A1A3E] mb-0.5" style={{ fontSize: "1.4rem", fontWeight: 800 }}>{name}</h2>
              <p className="text-[#6D28D9] mb-2" style={{ fontSize: "0.95rem", fontWeight: 600 }}>{title}</p>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1.5"><MapPin size={14} className="text-[#9CA3AF]" /><span className="text-[#6B7280]" style={{ fontSize: "0.83rem" }}>{location}</span></div>
                <div className="flex items-center gap-1.5"><Star size={14} className="fill-[#F59E0B] text-[#F59E0B]" /><span className="text-[#1A1A3E]" style={{ fontSize: "0.83rem", fontWeight: 600 }}>{avgRating} ({RATINGS.length} ratings)</span></div>
              </div>
              <p className="text-[#6B7280]" style={{ fontSize: "0.88rem", lineHeight: "1.6" }}>{bio}</p>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["skills","experience","portfolio","ratings"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-xl border capitalize transition-all ${activeTab === tab ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white border-transparent shadow-md" : "bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#6D28D9]"}`}
            style={{ fontSize: "0.88rem", fontWeight: 600 }}>
            {tab}
          </button>
        ))}
      </div>

      {/* Skills */}
      {activeTab === "skills" && (
        <div className="bg-white/90 rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
          <h3 className="text-[#1A1A3E] mb-4" style={{ fontSize: "1.05rem", fontWeight: 700 }}>Skills</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.map(s => (
              <span key={s} className="flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-[#6D28D9] to-[#3B82F6] text-white rounded-xl" style={{ fontSize: "0.83rem", fontWeight: 600 }}>
                {s}
                <button onClick={() => setSkills(p => p.filter(x => x !== s))} className="hover:opacity-70 transition-opacity"><X size={12} strokeWidth={3} /></button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === "Enter" && addSkill()} placeholder="Add a skill…" className="flex-1 px-4 py-2.5 bg-[#F8F7FF] rounded-xl border border-[#E5E7EB] outline-none focus:border-[#6D28D9]" style={{ fontSize: "0.88rem" }} />
            <button onClick={addSkill} className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:shadow-md transition-all" style={{ fontSize: "0.88rem", fontWeight: 700 }}>
              <Plus size={16} /> Add
            </button>
          </div>
        </div>
      )}

      {/* Experience */}
      {activeTab === "experience" && (
        <div className="bg-white/90 rounded-2xl border border-[#E5E7EB] shadow-sm p-6 space-y-4">
          <h3 className="text-[#1A1A3E] mb-2" style={{ fontSize: "1.05rem", fontWeight: 700 }}>Work Experience</h3>
          {EXPERIENCE_INIT.map(exp => (
            <div key={exp.id} className="flex gap-4 p-4 bg-[#F8F7FF] rounded-xl">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6D28D9] to-[#2563EB] flex items-center justify-center flex-shrink-0">
                <Briefcase size={18} className="text-white" />
              </div>
              <div>
                <p className="text-[#1A1A3E]" style={{ fontSize: "0.95rem", fontWeight: 700 }}>{exp.role}</p>
                <p className="text-[#6D28D9]" style={{ fontSize: "0.82rem", fontWeight: 600 }}>{exp.company} · {exp.period}</p>
                <p className="text-[#6B7280] mt-1" style={{ fontSize: "0.82rem" }}>{exp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Portfolio */}
      {activeTab === "portfolio" && (
        <div className="bg-white/90 rounded-2xl border border-[#E5E7EB] shadow-sm p-6">
          <h3 className="text-[#1A1A3E] mb-4" style={{ fontSize: "1.05rem", fontWeight: 700 }}>Portfolio</h3>
          <div className="grid grid-cols-3 gap-4">
            {PORTFOLIO_INIT.map(p => (
              <div key={p.id} className="p-4 bg-[#F8F7FF] rounded-xl border border-[#E5E7EB] hover:border-[#6D28D9] transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6D28D9] to-[#2563EB] flex items-center justify-center mb-3">
                  <Award size={18} className="text-white" />
                </div>
                <p className="text-[#1A1A3E] mb-1" style={{ fontSize: "0.9rem", fontWeight: 700 }}>{p.title}</p>
                <p className="text-[#6B7280] mb-2" style={{ fontSize: "0.78rem" }}>{p.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-[#F0EEFF] text-[#6D28D9] rounded-lg" style={{ fontSize: "0.7rem", fontWeight: 600 }}>{p.tag}</span>
                  <ExternalLink size={14} className="text-[#9CA3AF] group-hover:text-[#6D28D9] transition-colors" />
                </div>
              </div>
            ))}
            <div className="p-4 bg-[#F8F7FF] rounded-xl border-2 border-dashed border-[#D1D5DB] hover:border-[#6D28D9] transition-all cursor-pointer flex flex-col items-center justify-center gap-2 min-h-[140px]">
              <Plus size={24} className="text-[#9CA3AF]" />
              <p className="text-[#9CA3AF]" style={{ fontSize: "0.82rem", fontWeight: 600 }}>Add project</p>
            </div>
          </div>
        </div>
      )}

      {/* Ratings */}
      {activeTab === "ratings" && (
        <div className="bg-white/90 rounded-2xl border border-[#E5E7EB] shadow-sm p-6 space-y-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="text-center">
              <p className="text-[#1A1A3E]" style={{ fontSize: "3rem", fontWeight: 800, lineHeight: 1 }}>{avgRating}</p>
              <div className="flex gap-0.5 justify-center mt-1">{[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-[#F59E0B] text-[#F59E0B]" />)}</div>
              <p className="text-[#9CA3AF] mt-1" style={{ fontSize: "0.75rem" }}>{RATINGS.length} reviews</p>
            </div>
          </div>
          {RATINGS.map((r, i) => (
            <div key={i} className="p-4 bg-[#F8F7FF] rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[#1A1A3E]" style={{ fontSize: "0.88rem", fontWeight: 700 }}>{r.client}</p>
                <div className="flex items-center gap-1">
                  <Star size={13} className="fill-[#F59E0B] text-[#F59E0B]" />
                  <span className="text-[#1A1A3E]" style={{ fontSize: "0.82rem", fontWeight: 700 }}>{r.rating}</span>
                  <span className="text-[#9CA3AF] ml-2" style={{ fontSize: "0.72rem" }}>{r.date}</span>
                </div>
              </div>
              <p className="text-[#6B7280]" style={{ fontSize: "0.82rem" }}>"{r.comment}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
