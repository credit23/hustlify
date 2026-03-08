import { useState } from "react";
import { useNavigate } from "react-router";
import { CheckCircle, ArrowRight, ArrowLeft, User, Target, ChevronDown, ChevronUp, Upload, MapPin } from "lucide-react";
import hustlifyLogo from "figma:asset/ee079ff6b92e2af14de5404d0251f4a3326be5ea.png";

const STEPS = [
  { step: 1, label: "Your Needs" },
  { step: 2, label: "Profile" },
];

// Grouped domains structure
const DOMAIN_GROUPS = [
  {
    name: "Manual & Physical Services",
    domains: [
      "Plumber",
      "Electrician",
      "Painter",
      "Mechanic",
      "Carpenter",
      "HVAC Technician",
      "Landscaper",
      "Construction Worker",
      "Welder",
      "Mason",
    ],
  },
  {
    name: "Tech & IT",
    expandable: true,
    domains: [
      "Software Development",
      "Web Design",
      "Mobile Apps",
      "Data Science",
      "Cybersecurity",
      "DevOps",
      "UI/UX Design",
      "Cloud Computing",
      "Database Administration",
      "QA Testing",
    ],
  },
  {
    name: "Creative Services",
    domains: [
      "Graphic Design",
      "Video Editing",
      "Content Writing",
      "Photography",
      "Animation",
      "Illustration",
      "Voice Over",
      "Music Production",
    ],
  },
  {
    name: "Business & Professional",
    domains: [
      "Finance & Accounting",
      "Legal Services",
      "HR & Recruitment",
      "Consulting",
      "Project Management",
      "Business Analysis",
    ],
  },
  {
    name: "Marketing & Sales",
    domains: [
      "Digital Marketing",
      "SEO Specialist",
      "Social Media Manager",
      "Sales Representative",
      "Content Marketing",
      "Email Marketing",
    ],
  },
  {
    name: "Education & Training",
    domains: [
      "Tutoring",
      "Language Instruction",
      "Training & Development",
      "Curriculum Development",
    ],
  },
  {
    name: "Other Services",
    domains: [
      "Translation",
      "Logistics",
      "Customer Support",
      "Data Entry",
      "Virtual Assistant",
      "Event Planning",
    ],
  },
];

// Wilaya to Communes mapping (selected major wilayas with sample communes)
const WILAYA_COMMUNES: { [key: string]: string[] } = {
  "Alger": ["Bab El Oued", "Sidi M'Hamed", "El Madania", "Belouizdad", "Bab Ezzouar", "Hydra", "Ben Aknoun", "Dar El Beïda", "Baraki", "Birtouta"],
  "Oran": ["Oran Centre", "Bir El Djir", "Arzew", "Es Senia", "Aïn El Turk", "Bethioua", "Gdyel", "Hassi Bounif", "Hassi Ben Okba", "Mers El Kébir"],
  "Constantine": ["Constantine Centre", "El Khroub", "Aïn Smara", "Zighoud Youcef", "Hamma Bouziane", "Didouche Mourad", "Ibn Badis", "El Milia"],
  "Annaba": ["Annaba Centre", "Berrahal", "El Hadjar", "El Bouni", "Sidi Amar", "Seraïdi", "Aïn Berda"],
  "Blida": ["Blida Centre", "Boufarik", "Bougara", "Larbaa", "Bouinan", "Meftah", "Soumaa", "Ouled Yaïch"],
  "Batna": ["Batna Centre", "Barika", "Arris", "Merouana", "Tazoult", "N'Gaous", "Aïn Touta"],
  "Sétif": ["Sétif Centre", "El Eulma", "Aïn El Kebira", "Bougaa", "Aïn Oulmène", "Béni Aziz", "Salah Bey"],
  "Sidi Bel Abbès": ["Sidi Bel Abbès Centre", "Telagh", "Ben Badis", "Sfisef", "Mostefa Ben Brahim"],
  "Tlemcen": ["Tlemcen Centre", "Maghnia", "Remchi", "Sebdou", "Ghazaouet", "Nedroma", "Hennaya"],
  "Béjaïa": ["Béjaïa Centre", "Akbou", "Sidi Aïch", "El Kseur", "Amizour", "Tichy", "Tazmalt"],
  "Tizi Ouzou": ["Tizi Ouzou Centre", "Azazga", "Draa Ben Khedda", "Tigzirt", "Aïn El Hammam", "Larbaâ Nath Irathen"],
  "Biskra": ["Biskra Centre", "Tolga", "Sidi Okba", "Ouled Djellal", "Zeribet El Oued", "El Kantara"],
  "Tébessa": ["Tébessa Centre", "Bir El Ater", "Cheria", "El Ouenza", "El Aouinet"],
  "Tiaret": ["Tiaret Centre", "Sougueur", "Frenda", "Ksar Chellala", "Medroussa"],
  "Béchar": ["Béchar Centre", "Beni Ounif", "Kenadsa", "Abadla", "Taghit"],
  "Mostaganem": ["Mostaganem Centre", "Aïn Tedeles", "Hassi Mameche", "Sidi Ali", "Bouguirat"],
  "Bordj Bou Arreridj": ["Bordj Bou Arreridj Centre", "Ras El Oued", "Bordj Ghdir", "El Achir", "Medjana"],
  "Djelfa": ["Djelfa Centre", "Aïn Oussera", "Messaad", "Hassi Bahbah", "Birine"],
  "Jijel": ["Jijel Centre", "Taher", "El Milia", "Chekfa", "El Aouana"],
  "Skikda": ["Skikda Centre", "Tamalous", "Azzaba", "El Harrouch", "Collo"],
  "Médéa": ["Médéa Centre", "Berrouaghia", "Ksar Boukhari", "El Omaria", "Tablat"],
  "M'Sila": ["M'Sila Centre", "Bou Saâda", "Sidi Aïssa", "Aïn El Melh", "Magra"],
  "Mascara": ["Mascara Centre", "Sig", "Mohammadia", "Ghriss", "Tighennif"],
  "Ouargla": ["Ouargla Centre", "Hassi Messaoud", "Touggourt", "Rouissat", "Aïn Beïda"],
  "Chlef": ["Chlef Centre", "Ech Chettia", "Boukadir", "Oued Fodda", "Sobha"],
};

const WILAYAS = Object.keys(WILAYA_COMMUNES).sort();

export default function ClientOnboarding() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["Tech & IT"]);
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [selectedCommune, setSelectedCommune] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>(null);

  const toggleDomain = (d: string) => {
    setSelectedDomains((prev) => prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]);
  };

  const toggleGroup = (groupName: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupName)
        ? prev.filter((x) => x !== groupName)
        : [...prev, groupName]
    );
  };

  const handleWilayaChange = (wilaya: string) => {
    setSelectedWilaya(wilaya);
    setSelectedCommune(""); // Reset commune when wilaya changes
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const next = () => {
    if (currentStep < 2) setCurrentStep((s) => s + 1);
    else navigate("/client/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-[#FAFBFF] to-[#EBF4FF] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-3">
            <img src={hustlifyLogo} alt="Hustlify" className="h-14 object-contain" />
          </div>
          <h1 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.5rem" }}>Client Setup</h1>
          <p className="text-[#6B7280]" style={{ fontSize: "0.875rem" }}>Tell us what you need and we'll match you with the best talent</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-0 mb-8">
          {STEPS.map((s, i) => (
            <div key={s.step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${currentStep > s.step ? "bg-green-500" : currentStep === s.step ? "bg-gradient-to-r from-[#6D28D9] to-[#2563EB]" : "bg-white border-2 border-slate-200"}`}>
                  {currentStep > s.step ? <CheckCircle size={16} className="text-white" /> : (
                    <span className={currentStep >= s.step ? "text-white" : "text-[#9CA3AF]"} style={{ fontSize: "0.8rem", fontWeight: 700 }}>{s.step}</span>
                  )}
                </div>
                <span className={`mt-1 ${currentStep >= s.step ? "text-[#6D28D9]" : "text-[#9CA3AF]"}`} style={{ fontSize: "0.7rem", fontWeight: 500 }}>{s.label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`h-0.5 w-20 mx-3 mb-5 ${currentStep > s.step ? "bg-green-400" : "bg-slate-200"}`} />}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-slate-200 shadow-sm p-8 mb-5">
          {/* Step 1: Your Needs */}
          {currentStep === 1 && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Target size={18} className="text-[#6D28D9]" />
                </div>
                <div>
                  <h2 className="text-[#1A1A3E]" style={{ fontWeight: 700 }}>What do you need help with?</h2>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.78rem" }}>Select all that apply</p>
                </div>
              </div>
              
              {/* Grouped Domains */}
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {DOMAIN_GROUPS.map((group) => (
                  <div key={group.name} className="border border-slate-200 rounded-xl p-4">
                    {/* Group Header */}
                    <div 
                      className="flex items-center justify-between mb-3 cursor-pointer"
                      onClick={() => group.expandable && toggleGroup(group.name)}
                    >
                      <h3 className="text-[#1A1A3E]" style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                        {group.name}
                      </h3>
                      {group.expandable && (
                        <button className="text-[#6D28D9] hover:bg-blue-50 p-1 rounded transition-colors">
                          {expandedGroups.includes(group.name) ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Domains */}
                    {(!group.expandable || expandedGroups.includes(group.name)) && (
                      <div className="flex flex-wrap gap-2">
                        {group.domains.map((d) => (
                          <button
                            key={d}
                            onClick={() => toggleDomain(d)}
                            className={`px-3 py-2 rounded-xl border-2 transition-all ${
                              selectedDomains.includes(d)
                                ? "border-[#6D28D9] bg-blue-50 text-[#6D28D9]"
                                : "border-slate-200 text-[#6B7280] hover:border-[#6D28D9]/50"
                            }`}
                            style={{ fontSize: "0.82rem", fontWeight: selectedDomains.includes(d) ? 600 : 400 }}
                          >
                            {selectedDomains.includes(d) && <CheckCircle size={12} className="inline mr-1.5" />}
                            {d}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Selected count */}
              {selectedDomains.length > 0 && (
                <div className="mt-4 text-center">
                  <span className="text-[#6D28D9]" style={{ fontSize: "0.82rem", fontWeight: 600 }}>
                    {selectedDomains.length} domain{selectedDomains.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Profile */}
          {currentStep === 2 && (
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <User size={18} className="text-[#6D28D9]" />
                </div>
                <div>
                  <h2 className="text-[#1A1A3E]" style={{ fontWeight: 700 }}>Complete Your Profile</h2>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.78rem" }}>Help us match you with nearby talent</p>
                </div>
              </div>

              <div className="space-y-5">
                {/* Profile Picture Upload */}
                <div>
                  <label className="block text-[#1A1A3E] mb-2" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Profile Picture
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-2xl bg-blue-50 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden">
                        {profilePicture ? (
                          <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <User size={24} className="text-[#93C5FD]" />
                        )}
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="profile-picture-upload"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="profile-picture-upload"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-[#6D28D9] rounded-xl border border-slate-200 hover:bg-blue-100 transition-colors cursor-pointer"
                        style={{ fontSize: "0.875rem", fontWeight: 500 }}
                      >
                        <Upload size={16} />
                        Upload Photo
                      </label>
                      <p className="text-[#9CA3AF] mt-1" style={{ fontSize: "0.75rem" }}>
                        JPG, PNG or GIF (max 5MB)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                    Phone Number
                  </label>
                  <input
                    placeholder="+213 770 xxx xxx"
                    className="w-full px-4 py-2.5 bg-blue-50 rounded-xl border border-slate-200 text-[#1A1A3E] placeholder-[#93C5FD] outline-none focus:border-[#6D28D9] transition-colors"
                    style={{ fontSize: "0.875rem" }}
                  />
                </div>

                {/* Location Section */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Wilaya */}
                  <div>
                    <label className="block text-[#1A1A3E] mb-1.5 flex items-center gap-1" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                      <MapPin size={13} className="text-[#6D28D9]" /> Wilaya
                    </label>
                    <select
                      value={selectedWilaya}
                      onChange={(e) => handleWilayaChange(e.target.value)}
                      className="w-full px-4 py-2.5 bg-blue-50 rounded-xl border border-slate-200 text-[#1A1A3E] outline-none focus:border-[#6D28D9] appearance-none transition-colors"
                      style={{ fontSize: "0.875rem" }}
                    >
                      <option value="">Select Wilaya</option>
                      {WILAYAS.map((wilaya) => (
                        <option key={wilaya} value={wilaya}>
                          {wilaya}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Commune */}
                  <div>
                    <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>
                      Commune
                    </label>
                    <select
                      value={selectedCommune}
                      onChange={(e) => setSelectedCommune(e.target.value)}
                      disabled={!selectedWilaya}
                      className="w-full px-4 py-2.5 bg-blue-50 rounded-xl border border-slate-200 text-[#1A1A3E] outline-none focus:border-[#6D28D9] appearance-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{ fontSize: "0.875rem" }}
                    >
                      <option value="">Select Commune</option>
                      {selectedWilaya && WILAYA_COMMUNES[selectedWilaya]?.map((commune) => (
                        <option key={commune} value={commune}>
                          {commune}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Location Info */}
                <div className="p-4 bg-blue-50 rounded-xl border border-slate-200">
                  <p className="text-[#6D28D9] flex items-start gap-2" style={{ fontSize: "0.78rem", fontWeight: 500 }}>
                    <MapPin size={14} className="mt-0.5 flex-shrink-0" />
                    <span>
                      Your location helps us show you talent closest to you first, making it easier to find local professionals for onsite work.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button onClick={() => setCurrentStep((s) => Math.max(1, s - 1))} disabled={currentStep === 1} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-[#6B7280] rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed" style={{ fontSize: "0.875rem" }}>
            <ArrowLeft size={15} /> Back
          </button>
          <button onClick={next} className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:opacity-90 transition-opacity" style={{ fontSize: "0.875rem", fontWeight: 600 }}>
            {currentStep === 2 ? "Start Browsing Talent" : "Continue"} <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}