import { useNavigate } from "react-router";
import { Plus, Search, Eye, Edit2, Trash2, Users, Clock, MapPin, ChevronDown, X, Check } from "lucide-react";
import { useState } from "react";

const JOBS = [
  { id: "1", title: "Senior React Developer", dept: "Engineering", type: "Full-time", location: "Alger", salary: "120,000–180,000 DZD/mo", applicants: 23, status: "active", deadline: "Feb 28, 2026", posted: "Jan 10, 2026" },
  { id: "2", title: "UX/UI Designer", dept: "Product", type: "Full-time", location: "Remote", salary: "90,000–130,000 DZD/mo", applicants: 15, status: "active", deadline: "Mar 5, 2026", posted: "Jan 15, 2026" },
  { id: "3", title: "Data Scientist", dept: "Analytics", type: "Contract", location: "Alger", salary: "200,000 DZD/project", applicants: 8, status: "closed", deadline: "Jan 30, 2026", posted: "Dec 20, 2025" },
  { id: "4", title: "Digital Marketing Manager", dept: "Marketing", type: "Contract", location: "Alger", salary: "Negotiable", applicants: 31, status: "active", deadline: "Mar 10, 2026", posted: "Jan 20, 2026" },
  { id: "5", title: "Backend Developer (Node.js)", dept: "Engineering", type: "Freelance", location: "Remote", salary: "1,800 DZD/hr", applicants: 19, status: "paused", deadline: "Mar 15, 2026", posted: "Jan 25, 2026" },
];

const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-100 text-green-600",
  closed: "bg-gray-100 text-gray-500",
  paused: "bg-yellow-100 text-yellow-600",
  draft: "bg-blue-100 text-blue-600",
};

export default function ManageJobs() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filtered = JOBS.filter((j) => {
    const matchSearch = j.title.toLowerCase().includes(searchQ.toLowerCase());
    const matchStatus = filterStatus === "all" || j.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] to-[#EBF4FF] p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.4rem" }}>Manage Job Posts</h1>
            <p className="text-[#6B7280]" style={{ fontSize: "0.875rem" }}>{JOBS.length} total positions</p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-xl hover:opacity-90 transition-opacity"
            style={{ fontSize: "0.875rem", fontWeight: 600 }}
          >
            <Plus size={16} />
            Post New Job
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Search job posts..."
              className="w-full pl-8 pr-4 py-2 bg-white rounded-xl border border-purple-100 outline-none focus:border-[#6C63FF] text-[#1A1A3E] placeholder-[#9CA3AF]"
              style={{ fontSize: "0.875rem" }}
            />
          </div>
          <div className="flex gap-2">
            {["all", "active", "paused", "closed"].map((s) => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-4 py-2 rounded-xl capitalize transition-all ${
                  filterStatus === s
                    ? "bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white"
                    : "bg-white border border-purple-100 text-[#6B7280] hover:border-purple-200"
                }`}
                style={{ fontSize: "0.8rem", fontWeight: 500 }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Job Cards */}
        <div className="space-y-3">
          {filtered.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl border border-purple-100 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1rem" }}>{job.title}</h3>
                    <span className={`px-2 py-0.5 rounded-lg capitalize ${STATUS_COLORS[job.status]}`} style={{ fontSize: "0.7rem", fontWeight: 600 }}>
                      {job.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-2">
                    <span className="text-[#6B7280]" style={{ fontSize: "0.8rem" }}>{job.dept}</span>
                    <span className="px-2 py-0.5 bg-[#F5F3FF] text-[#6C63FF] rounded-lg" style={{ fontSize: "0.72rem", fontWeight: 500 }}>{job.type}</span>
                    <span className="flex items-center gap-1 text-[#6B7280]" style={{ fontSize: "0.8rem" }}>
                      <MapPin size={11} className="text-[#9CA3AF]" />{job.location}
                    </span>
                    <span className="text-[#6C63FF]" style={{ fontSize: "0.8rem", fontWeight: 500 }}>{job.salary}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1 text-[#6B7280]" style={{ fontSize: "0.78rem" }}>
                      <Users size={13} className="text-[#9CA3AF]" />
                      {job.applicants} applicants
                    </span>
                    <span className="flex items-center gap-1 text-[#6B7280]" style={{ fontSize: "0.78rem" }}>
                      <Clock size={13} className="text-[#9CA3AF]" />
                      Deadline: {job.deadline}
                    </span>
                    <span className="text-[#9CA3AF]" style={{ fontSize: "0.75rem" }}>Posted: {job.posted}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/enterprise/jobs/${job.id}/applicants`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F0EEFF] text-[#6C63FF] rounded-xl hover:bg-purple-100 transition-colors"
                    style={{ fontSize: "0.78rem", fontWeight: 500 }}
                  >
                    <Eye size={13} />
                    View ({job.applicants})
                  </button>
                  <button className="p-2 rounded-xl bg-[#F5F3FF] hover:bg-purple-100 transition-colors">
                    <Edit2 size={14} className="text-[#6B7280]" />
                  </button>
                  <button className="p-2 rounded-xl bg-[#FFF5F5] hover:bg-red-100 transition-colors">
                    <Trash2 size={14} className="text-red-400" />
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3 pt-3 border-t border-purple-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[#9CA3AF]" style={{ fontSize: "0.72rem" }}>Application Progress</span>
                  <span className="text-[#6C63FF]" style={{ fontSize: "0.72rem", fontWeight: 600 }}>{Math.round((job.applicants / 40) * 100)}%</span>
                </div>
                <div className="h-1.5 bg-[#F5F3FF] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] rounded-full"
                    style={{ width: `${Math.min((job.applicants / 40) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Post Job Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl border border-purple-100 shadow-xl w-full max-w-lg p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.1rem" }}>Post New Job</h2>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-xl hover:bg-purple-50 transition-colors">
                  <X size={16} className="text-[#6B7280]" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>Job Title *</label>
                  <input placeholder="e.g. Senior React Developer" className="w-full px-4 py-2.5 bg-[#F5F3FF] rounded-xl border border-purple-100 outline-none focus:border-[#6C63FF] text-[#1A1A3E] placeholder-[#C4B5FD]" style={{ fontSize: "0.875rem" }} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>Department</label>
                    <select className="w-full px-4 py-2.5 bg-[#F5F3FF] rounded-xl border border-purple-100 outline-none focus:border-[#6C63FF] text-[#1A1A3E] appearance-none" style={{ fontSize: "0.875rem" }}>
                      <option>Engineering</option><option>Product</option><option>Marketing</option><option>Sales</option><option>Operations</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>Type</label>
                    <select className="w-full px-4 py-2.5 bg-[#F5F3FF] rounded-xl border border-purple-100 outline-none focus:border-[#6C63FF] text-[#1A1A3E] appearance-none" style={{ fontSize: "0.875rem" }}>
                      <option>Full-time</option><option>Contract</option><option>Freelance</option><option>Internship</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>Job Description</label>
                  <textarea rows={4} placeholder="Describe the role, responsibilities, and requirements..." className="w-full px-4 py-2.5 bg-[#F5F3FF] rounded-xl border border-purple-100 outline-none focus:border-[#6C63FF] text-[#1A1A3E] placeholder-[#C4B5FD] resize-none" style={{ fontSize: "0.875rem" }} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>Salary</label>
                    <input placeholder="e.g. 120,000 DZD/mo" className="w-full px-4 py-2.5 bg-[#F5F3FF] rounded-xl border border-purple-100 outline-none focus:border-[#6C63FF] text-[#1A1A3E] placeholder-[#C4B5FD]" style={{ fontSize: "0.875rem" }} />
                  </div>
                  <div>
                    <label className="block text-[#1A1A3E] mb-1.5" style={{ fontSize: "0.8rem", fontWeight: 500 }}>Deadline</label>
                    <input type="date" className="w-full px-4 py-2.5 bg-[#F5F3FF] rounded-xl border border-purple-100 outline-none focus:border-[#6C63FF] text-[#1A1A3E]" style={{ fontSize: "0.875rem" }} />
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 bg-[#F5F3FF] text-[#6B7280] rounded-xl hover:bg-purple-100 transition-colors" style={{ fontWeight: 500, fontSize: "0.875rem" }}>
                  Cancel
                </button>
                <button onClick={() => setShowModal(false)} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-xl hover:opacity-90 transition-opacity" style={{ fontWeight: 600, fontSize: "0.875rem" }}>
                  <Check size={16} /> Post Job
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
