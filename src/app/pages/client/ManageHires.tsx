import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  MessageSquare,
  Star,
  MoreVertical,
  FileText,
  AlertCircle,
  ChevronDown,
  X,
} from "lucide-react";

type HireStatus = "in_progress" | "completed" | "paused" | "cancelled";

const HIRES = [
  {
    id: "1",
    name: "Karim Benali",
    role: "Full-Stack Developer",
    job: "React Developer needed",
    status: "in_progress" as HireStatus,
    progress: 65,
    startDate: "Jan 10, 2026",
    endDate: "Mar 10, 2026",
    budget: "120,000 DZD",
    paid: "78,000 DZD",
    rating: null,
    img: "https://images.unsplash.com/photo-1565687981296-535f09db714e?w=80&q=80",
    milestones: [
      { label: "Project kickoff", done: true },
      { label: "Initial design & architecture", done: true },
      { label: "Core features development", done: true },
      { label: "Testing & QA", done: false },
      { label: "Final delivery", done: false },
    ],
  },
  {
    id: "2",
    name: "Sonia Amrani",
    role: "UX/UI Designer",
    job: "UX Designer for landing page",
    status: "completed" as HireStatus,
    progress: 100,
    startDate: "Dec 1, 2025",
    endDate: "Jan 15, 2026",
    budget: "45,000 DZD",
    paid: "45,000 DZD",
    rating: 5,
    img: "https://images.unsplash.com/photo-1765648580528-8d659861d81a?w=80&q=80",
    milestones: [
      { label: "Discovery & research", done: true },
      { label: "Wireframes", done: true },
      { label: "UI design", done: true },
      { label: "Final handoff", done: true },
    ],
  },
  {
    id: "3",
    name: "Yacine Messaoud",
    role: "Content Writer",
    job: "Content Writer (French/Arabic)",
    status: "paused" as HireStatus,
    progress: 30,
    startDate: "Jan 20, 2026",
    endDate: "Feb 20, 2026",
    budget: "30,000 DZD",
    paid: "9,000 DZD",
    rating: null,
    img: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=80&q=80",
    milestones: [
      { label: "Content strategy", done: true },
      { label: "First batch of articles", done: false },
      { label: "Review & revisions", done: false },
      { label: "Final delivery", done: false },
    ],
  },
];

const STATUS_CONFIG: Record<HireStatus, { label: string; color: string; bg: string; icon: any }> = {
  in_progress: { label: "In Progress", color: "#4F8EF7", bg: "#EBF4FF", icon: Clock },
  completed: { label: "Completed", color: "#10B981", bg: "#D1FAE5", icon: CheckCircle },
  paused: { label: "Paused", color: "#F59E0B", bg: "#FEF3C7", icon: AlertCircle },
  cancelled: { label: "Cancelled", color: "#EF4444", bg: "#FEE2E2", icon: X },
};

function StarRating({ rating, onRate }: { rating: number | null; onRate?: (r: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          onMouseEnter={() => onRate && setHover(i)}
          onMouseLeave={() => onRate && setHover(0)}
          onClick={() => onRate?.(i)}
          disabled={!onRate}
        >
          <Star
            size={16}
            className={
              i <= (hover || rating || 0)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-200 fill-gray-200"
            }
          />
        </button>
      ))}
    </div>
  );
}

export default function ManageHires() {
  const navigate = useNavigate();
  const [hires, setHires] = useState(HIRES);
  const [selectedHire, setSelectedHire] = useState<typeof HIRES[0] | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | HireStatus>("all");
  const [showRateModal, setShowRateModal] = useState<string | null>(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const filtered = filterStatus === "all" ? hires : hires.filter((h) => h.status === filterStatus);

  const submitRating = (hireId: string) => {
    setHires((prev) =>
      prev.map((h) => (h.id === hireId ? { ...h, rating: ratingValue, status: "completed" as HireStatus } : h))
    );
    setShowRateModal(null);
    setRatingValue(0);
    setReviewText("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] to-[#EBF4FF] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/client/dashboard")}
            className="p-2 rounded-xl bg-white border border-purple-100 hover:bg-purple-50 transition-colors"
          >
            <ArrowLeft size={16} className="text-[#6B7280]" />
          </button>
          <div>
            <h1 className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "1.3rem" }}>
              Manage Hires
            </h1>
            <p className="text-[#6B7280]" style={{ fontSize: "0.82rem" }}>
              Track your active and past engagements
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Hires", value: hires.length.toString(), color: "#6C63FF", bg: "#F0EEFF" },
            { label: "In Progress", value: hires.filter((h) => h.status === "in_progress").length.toString(), color: "#4F8EF7", bg: "#EBF4FF" },
            { label: "Completed", value: hires.filter((h) => h.status === "completed").length.toString(), color: "#10B981", bg: "#D1FAE5" },
            { label: "Total Spent", value: "152,000 DZD", color: "#F59E0B", bg: "#FEF3C7" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 border border-purple-100 shadow-sm">
              <p className="text-[#9CA3AF] mb-1" style={{ fontSize: "0.75rem" }}>{stat.label}</p>
              <p style={{ color: stat.color, fontWeight: 700, fontSize: "1.3rem" }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {(["all", "in_progress", "completed", "paused", "cancelled"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-4 py-2 rounded-xl whitespace-nowrap capitalize transition-all ${
                filterStatus === s
                  ? "bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white"
                  : "bg-white border border-purple-100 text-[#6B7280] hover:border-purple-200"
              }`}
              style={{ fontSize: "0.8rem", fontWeight: 500 }}
            >
              {s === "all" ? "All Hires" : s.replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="flex gap-5">
          {/* Hire Cards */}
          <div className="flex-1 space-y-4">
            {filtered.map((hire) => {
              const cfg = STATUS_CONFIG[hire.status];
              return (
                <div
                  key={hire.id}
                  onClick={() => setSelectedHire(hire)}
                  className={`bg-white rounded-2xl border p-5 cursor-pointer hover:shadow-md transition-all ${
                    selectedHire?.id === hire.id ? "border-[#6C63FF] shadow-md" : "border-purple-100"
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <img src={hire.img} alt={hire.name} className="w-12 h-12 rounded-xl object-cover border-2 border-purple-100" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "0.95rem" }}>{hire.name}</p>
                          <p className="text-[#6B7280]" style={{ fontSize: "0.8rem" }}>{hire.role}</p>
                          <p className="text-[#9CA3AF]" style={{ fontSize: "0.75rem" }}>
                            {hire.job}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className="flex items-center gap-1 px-2.5 py-1 rounded-xl"
                            style={{ backgroundColor: cfg.bg, color: cfg.color, fontSize: "0.72rem", fontWeight: 600 }}
                          >
                            <cfg.icon size={11} />
                            {cfg.label}
                          </span>
                          <button
                            className="p-1.5 rounded-lg hover:bg-purple-50 transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreVertical size={14} className="text-[#9CA3AF]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[#6B7280]" style={{ fontSize: "0.78rem" }}>Project Progress</span>
                      <span className="text-[#6C63FF]" style={{ fontSize: "0.78rem", fontWeight: 600 }}>
                        {hire.progress}%
                      </span>
                    </div>
                    <div className="h-2 bg-[#F5F3FF] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          hire.status === "completed"
                            ? "bg-green-400"
                            : hire.status === "paused"
                            ? "bg-yellow-400"
                            : "bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF]"
                        }`}
                        style={{ width: `${hire.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-purple-50">
                    <div className="flex gap-4">
                      <div>
                        <p className="text-[#9CA3AF]" style={{ fontSize: "0.68rem" }}>BUDGET</p>
                        <p className="text-[#1A1A3E]" style={{ fontWeight: 600, fontSize: "0.82rem" }}>{hire.budget}</p>
                      </div>
                      <div>
                        <p className="text-[#9CA3AF]" style={{ fontSize: "0.68rem" }}>PAID</p>
                        <p className="text-green-600" style={{ fontWeight: 600, fontSize: "0.82rem" }}>{hire.paid}</p>
                      </div>
                      <div>
                        <p className="text-[#9CA3AF]" style={{ fontSize: "0.68rem" }}>DEADLINE</p>
                        <p className="text-[#1A1A3E]" style={{ fontWeight: 500, fontSize: "0.82rem" }}>{hire.endDate}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {hire.status === "completed" && !hire.rating && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setShowRateModal(hire.id); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FEF3C7] text-[#F59E0B] rounded-xl hover:bg-yellow-100 transition-colors"
                          style={{ fontSize: "0.75rem", fontWeight: 600 }}
                        >
                          <Star size={12} /> Rate
                        </button>
                      )}
                      {hire.rating && (
                        <div className="flex items-center gap-1">
                          <StarRating rating={hire.rating} />
                        </div>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate("/dashboard/messages"); }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-[#F0EEFF] text-[#6C63FF] rounded-xl hover:bg-purple-100 transition-colors"
                        style={{ fontSize: "0.75rem", fontWeight: 500 }}
                      >
                        <MessageSquare size={12} /> Message
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-purple-100">
                <div className="w-14 h-14 rounded-2xl bg-[#F5F3FF] flex items-center justify-center mb-3">
                  <FileText size={24} className="text-[#C4B5FD]" />
                </div>
                <p className="text-[#1A1A3E] mb-1" style={{ fontWeight: 600 }}>No hires found</p>
                <p className="text-[#9CA3AF]" style={{ fontSize: "0.875rem" }}>Post a job to start hiring talent</p>
                <button
                  onClick={() => navigate("/client/post-job")}
                  className="mt-4 px-5 py-2 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-xl"
                  style={{ fontSize: "0.875rem", fontWeight: 500 }}
                >
                  Post a Job
                </button>
              </div>
            )}
          </div>

          {/* Detail Panel */}
          {selectedHire && (
            <div className="w-72 flex-shrink-0">
              <div className="bg-white rounded-2xl border border-purple-100 p-5 sticky top-0">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-[#1A1A3E]" style={{ fontWeight: 700, fontSize: "0.95rem" }}>Contract Details</p>
                  <button
                    onClick={() => setSelectedHire(null)}
                    className="p-1.5 rounded-lg hover:bg-purple-50 transition-colors"
                  >
                    <X size={14} className="text-[#9CA3AF]" />
                  </button>
                </div>

                <div className="text-center mb-4">
                  <img src={selectedHire.img} alt={selectedHire.name} className="w-14 h-14 rounded-2xl object-cover border-4 border-purple-100 mx-auto mb-2" />
                  <p className="text-[#1A1A3E]" style={{ fontWeight: 700 }}>{selectedHire.name}</p>
                  <p className="text-[#6B7280]" style={{ fontSize: "0.8rem" }}>{selectedHire.role}</p>
                  {selectedHire.rating && <StarRating rating={selectedHire.rating} />}
                </div>

                <div className="space-y-2 mb-4">
                  {[
                    { label: "Start Date", value: selectedHire.startDate },
                    { label: "End Date", value: selectedHire.endDate },
                    { label: "Budget", value: selectedHire.budget },
                    { label: "Paid So Far", value: selectedHire.paid },
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between py-2 border-b border-purple-50 last:border-0">
                      <span className="text-[#9CA3AF]" style={{ fontSize: "0.78rem" }}>{item.label}</span>
                      <span className="text-[#1A1A3E]" style={{ fontSize: "0.78rem", fontWeight: 500 }}>{item.value}</span>
                    </div>
                  ))}
                </div>

                {/* Milestones */}
                <p className="text-[#9CA3AF] mb-2" style={{ fontSize: "0.72rem", fontWeight: 600 }}>MILESTONES</p>
                <div className="space-y-2 mb-4">
                  {selectedHire.milestones.map((m, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${m.done ? "bg-green-500" : "border-2 border-gray-200"}`}>
                        {m.done && <CheckCircle size={12} className="text-white" />}
                      </div>
                      <span
                        className={m.done ? "text-[#1A1A3E] line-through" : "text-[#6B7280]"}
                        style={{ fontSize: "0.78rem" }}
                      >
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => navigate("/dashboard/messages")}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-xl hover:opacity-90 transition-opacity"
                    style={{ fontSize: "0.82rem", fontWeight: 600 }}
                  >
                    <MessageSquare size={14} /> Send Message
                  </button>
                  <button
                    onClick={() => navigate("/client/payments")}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-[#F0EEFF] text-[#6C63FF] rounded-xl hover:bg-purple-100 transition-colors"
                    style={{ fontSize: "0.82rem", fontWeight: 500 }}
                  >
                    <FileText size={14} /> View Invoice
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rate Modal */}
      {showRateModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl border border-purple-100 shadow-xl p-6 w-full max-w-sm">
            <div className="text-center mb-5">
              <h3 className="text-[#1A1A3E] mb-1" style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                Rate Your Experience
              </h3>
              <p className="text-[#9CA3AF]" style={{ fontSize: "0.82rem" }}>
                How was working with {hires.find((h) => h.id === showRateModal)?.name}?
              </p>
            </div>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <button key={i} onClick={() => setRatingValue(i)}>
                  <Star
                    size={32}
                    className={i <= ratingValue ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}
                  />
                </button>
              ))}
            </div>
            <textarea
              rows={3}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Share your experience..."
              className="w-full px-4 py-2.5 bg-[#F5F3FF] rounded-xl border border-purple-100 outline-none focus:border-[#6C63FF] resize-none mb-4"
              style={{ fontSize: "0.875rem" }}
            />
            <div className="flex gap-3">
              <button
                onClick={() => { setShowRateModal(null); setRatingValue(0); }}
                className="flex-1 py-2.5 bg-[#F5F3FF] text-[#6B7280] rounded-xl"
                style={{ fontWeight: 500, fontSize: "0.875rem" }}
              >
                Cancel
              </button>
              <button
                onClick={() => submitRating(showRateModal!)}
                disabled={ratingValue === 0}
                className="flex-1 py-2.5 bg-gradient-to-r from-[#6C63FF] to-[#9B8FFF] text-white rounded-xl disabled:opacity-40"
                style={{ fontWeight: 600, fontSize: "0.875rem" }}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
