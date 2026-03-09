import { useNavigate } from "react-router";
import { useState, useRef, useCallback } from "react";
import { Camera, Upload, CheckCircle, ArrowRight, ArrowLeft, RefreshCw, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function EmployeeSelfie() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mode, setMode] = useState<"choose" | "camera" | "preview">("choose");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraReady, setCameraReady] = useState(false);

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: false });
      setStream(s);
      setMode("camera");
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.onloadedmetadata = () => setCameraReady(true);
        }
      }, 100);
    } catch {
      alert("Could not access camera. Please allow camera access or upload from gallery.");
    }
  };

  const stopCamera = useCallback(() => {
    stream?.getTracks().forEach((t) => t.stop());
    setStream(null);
    setCameraReady(false);
  }, [stream]);

  const takeSelfie = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
    setCapturedImage(canvas.toDataURL("image/jpeg", 0.9));
    stopCamera();
    setMode("preview");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setCapturedImage(ev.target?.result as string);
      setMode("preview");
    };
    reader.readAsDataURL(file);
  };

  const retake = () => {
    setCapturedImage(null);
    stopCamera();
    setMode("choose");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-[#FAFBFF] to-[#EBF4FF] flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-sm"
      >
        {/* Single white card — all content inside */}
        <div className="bg-white rounded-3xl shadow-xl border border-[#E5E7EB] overflow-hidden">

          {/* ── Header inside card ── */}
          <div className="px-7 pt-6 pb-5 text-center border-b border-[#F3F4F6]">

            {/* Back button — aligned left */}
            <div className="flex items-center mb-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#6D28D9] transition-colors"
                style={{ fontSize: "0.82rem" }}
              >
                <ArrowLeft size={14} /> Back
              </button>
            </div>

            {/* Camera icon */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#6D28D9] to-[#2563EB] flex items-center justify-center mx-auto mb-3 shadow-md">
              <Camera size={24} className="text-white" />
            </div>

            <h1 className="text-[#1A1A3E] mb-1.5" style={{ fontSize: "1.4rem", fontWeight: 800 }}>
              Profile Photo
            </h1>
            <p className="text-[#6B7280]" style={{ fontSize: "0.85rem" }}>
              Upload a clear selfie so clients can recognise you.
            </p>

            {/* Progress bar — 2 of 2, both active */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-10 h-1.5 rounded-full bg-[#6D28D9]" />
              <div className="w-10 h-1.5 rounded-full bg-[#6D28D9]" />
            </div>
            <p className="text-[#9CA3AF] mt-1.5" style={{ fontSize: "0.72rem" }}>
              Step 2 of 2 — Final step
            </p>
          </div>

          {/* ── Animated body ── */}
          <AnimatePresence mode="wait">

            {/* CHOOSE */}
            {mode === "choose" && (
              <motion.div
                key="choose"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="px-7 py-5"
              >
                {/* Face oval guide */}
                <div className="relative mx-auto mb-4 flex items-center justify-center" style={{ width: 170, height: 170 }}>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6D28D9]/15 to-[#2563EB]/15 blur-xl" />
                  <svg width="170" height="170" className="absolute inset-0">
                    <ellipse cx="85" cy="85" rx="61" ry="77" fill="none" stroke="#6D28D9" strokeWidth="2" strokeDasharray="7 4" opacity="0.6" />
                  </svg>
                  {/* Corner brackets */}
                  {[
                    { top: 5, left: 22, rotate: 0 },
                    { top: 5, right: 22, rotate: 90 },
                    { bottom: 5, left: 22, rotate: 270 },
                    { bottom: 5, right: 22, rotate: 180 },
                  ].map((pos, i) => (
                    <svg key={i} width="16" height="16" className="absolute" style={{ top: (pos as any).top, left: (pos as any).left, right: (pos as any).right, bottom: (pos as any).bottom, transform: `rotate(${pos.rotate}deg)` }}>
                      <path d="M2 14 L2 2 L14 2" fill="none" stroke="#6D28D9" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  ))}
                  {/* Silhouette */}
                  <div className="relative z-10 flex flex-col items-center justify-end" style={{ height: 120 }}>
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#6D28D9]/25 to-[#2563EB]/25 border-2 border-dashed border-[#6D28D9]/35 flex items-center justify-center mb-1">
                      <User size={20} className="text-[#6D28D9]/45" />
                    </div>
                    <div className="w-18 h-7 rounded-t-full bg-gradient-to-br from-[#6D28D9]/15 to-[#2563EB]/15 border-t-2 border-dashed border-[#6D28D9]/35" style={{ width: 72 }} />
                  </div>
                </div>

                <p className="text-center text-[#9CA3AF] mb-4" style={{ fontSize: "0.76rem" }}>
                  Position your face in the oval — well-lit and clearly visible
                </p>

                {/* Tips */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { icon: "☀️", label: "Good lighting" },
                    { icon: "👤", label: "Face centred" },
                    { icon: "😐", label: "Neutral expression" },
                  ].map((tip) => (
                    <div key={tip.label} className="flex flex-col items-center gap-1 p-2 bg-[#F8F7FF] rounded-xl">
                      <span style={{ fontSize: "1rem" }}>{tip.icon}</span>
                      <span className="text-[#6B7280] text-center" style={{ fontSize: "0.63rem", fontWeight: 600 }}>{tip.label}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={startCamera}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all"
                    style={{ fontWeight: 700, fontSize: "0.9rem" }}
                  >
                    <Camera size={17} /> Take a Selfie
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border-2 border-[#6D28D9] text-[#6D28D9] rounded-xl hover:bg-[#F0EEFF] transition-all"
                    style={{ fontWeight: 700, fontSize: "0.9rem" }}
                  >
                    <Upload size={17} /> Choose from Gallery
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </div>
              </motion.div>
            )}

            {/* CAMERA */}
            {mode === "camera" && (
              <motion.div key="camera" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="relative bg-black" style={{ aspectRatio: "4/3" }}>
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
                  <canvas ref={canvasRef} className="hidden" />
                  <div className="absolute inset-0 pointer-events-none">
                    <svg width="100%" height="100%" className="absolute inset-0">
                      <defs>
                        <mask id="ovalMask">
                          <rect width="100%" height="100%" fill="white" />
                          <ellipse cx="50%" cy="48%" rx="33%" ry="40%" fill="black" />
                        </mask>
                      </defs>
                      <rect width="100%" height="100%" fill="rgba(0,0,0,0.5)" mask="url(#ovalMask)" />
                      <ellipse cx="50%" cy="48%" rx="33%" ry="40%" fill="none" stroke="#6D28D9" strokeWidth="2.5" strokeDasharray="9 5" />
                    </svg>
                    <div className="absolute bottom-12 left-0 right-0 text-center">
                      <p className="text-white font-semibold drop-shadow-lg" style={{ fontSize: "0.8rem" }}>Align your face in the oval</p>
                    </div>
                  </div>
                  {!cameraReady && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <div className="w-9 h-9 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>
                <div className="px-5 py-4 flex gap-3">
                  <button onClick={() => { stopCamera(); setMode("choose"); }} className="px-4 py-2.5 rounded-xl border-2 border-[#E5E7EB] text-[#6B7280] hover:bg-[#F8F7FF] transition-all" style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    Cancel
                  </button>
                  <button onClick={takeSelfie} disabled={!cameraReady} className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl disabled:opacity-50 transition-all" style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                    <Camera size={17} /> Capture
                  </button>
                </div>
              </motion.div>
            )}

            {/* PREVIEW */}
            {mode === "preview" && capturedImage && (
              <motion.div key="preview" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="px-7 py-6">
                <div className="flex flex-col items-center mb-5">
                  <div className="relative mb-3">
                    <div className="absolute -inset-2 bg-gradient-to-br from-[#6D28D9] to-[#2563EB] rounded-full blur-md opacity-35" />
                    <img src={capturedImage} alt="Your selfie" className="relative w-36 h-36 rounded-full object-cover border-4 border-white shadow-xl" style={{ objectPosition: "center top" }} />
                    <div className="absolute bottom-0.5 right-0.5 w-9 h-9 bg-[#10B981] rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                      <CheckCircle size={17} className="text-white" />
                    </div>
                  </div>
                  <p className="text-[#1A1A3E]" style={{ fontSize: "0.95rem", fontWeight: 700 }}>Looks good!</p>
                  <p className="text-[#9CA3AF]" style={{ fontSize: "0.78rem" }}>Make sure your face is clearly visible</p>
                </div>
                <div className="space-y-2.5">
                  <button onClick={() => navigate("/dashboard")} className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all" style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                    Use this photo <ArrowRight size={16} />
                  </button>
                  <button onClick={retake} className="w-full flex items-center justify-center gap-2 py-3 bg-white border-2 border-[#E5E7EB] text-[#6B7280] rounded-xl hover:bg-[#F8F7FF] transition-all" style={{ fontWeight: 600, fontSize: "0.85rem" }}>
                    <RefreshCw size={15} /> Retake / Choose again
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
