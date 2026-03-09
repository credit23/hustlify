import { useNavigate } from "react-router";
import { useState, useRef, useCallback } from "react";
import { Camera, Upload, CheckCircle, ArrowRight, RefreshCw, User } from "lucide-react";
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

  const confirm = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-[#FAFBFF] to-[#EBF4FF] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6D28D9] to-[#2563EB] flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Camera size={28} className="text-white" />
          </div>
          <h1 className="text-[#1A1A3E] mb-2" style={{ fontSize: "1.75rem", fontWeight: 800 }}>Profile Photo</h1>
          <p className="text-[#6B7280]" style={{ fontSize: "0.95rem" }}>
            Upload a clear selfie so clients can recognise you.
          </p>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-8 h-1.5 rounded-full bg-[#6D28D9]" />
            <div className="w-8 h-1.5 rounded-full bg-[#6D28D9]" />
            <div className="w-8 h-1.5 rounded-full bg-[#6D28D9]" />
          </div>
          <p className="text-[#9CA3AF] mt-1" style={{ fontSize: "0.75rem" }}>Step 3 of 3 — Final step</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-[#E5E7EB] overflow-hidden">
          <AnimatePresence mode="wait">

            {/* CHOOSE MODE */}
            {mode === "choose" && (
              <motion.div
                key="choose"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-6"
              >
                {/* Face guide preview */}
                <div className="relative mx-auto mb-6 flex items-center justify-center" style={{ width: 220, height: 220 }}>
                  {/* Outer glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6D28D9]/20 to-[#2563EB]/20 blur-xl" />
                  {/* Dashed oval guide */}
                  <svg width="220" height="220" className="absolute inset-0">
                    <ellipse
                      cx="110" cy="110" rx="80" ry="100"
                      fill="none"
                      stroke="#6D28D9"
                      strokeWidth="2.5"
                      strokeDasharray="8 5"
                      opacity="0.6"
                    />
                  </svg>
                  {/* Corner brackets */}
                  {[
                    { top: 8, left: 30, rotate: 0 },
                    { top: 8, right: 30, rotate: 90 },
                    { bottom: 8, left: 30, rotate: 270 },
                    { bottom: 8, right: 30, rotate: 180 },
                  ].map((pos, i) => (
                    <svg key={i} width="22" height="22" className="absolute" style={{ top: pos.top, left: (pos as any).left, right: (pos as any).right, bottom: pos.bottom, transform: `rotate(${pos.rotate}deg)` }}>
                      <path d="M2 20 L2 2 L20 2" fill="none" stroke="#6D28D9" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  ))}
                  {/* Silhouette */}
                  <div className="relative z-10 flex flex-col items-center justify-end" style={{ height: 160 }}>
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#6D28D9]/30 to-[#2563EB]/30 border-2 border-dashed border-[#6D28D9]/40 flex items-center justify-center mb-1">
                      <User size={30} className="text-[#6D28D9]/50" />
                    </div>
                    <div className="w-24 h-10 rounded-t-full bg-gradient-to-br from-[#6D28D9]/20 to-[#2563EB]/20 border-t-2 border-dashed border-[#6D28D9]/40" />
                  </div>
                </div>

                <p className="text-center text-[#6B7280] mb-6" style={{ fontSize: "0.82rem" }}>
                  Position your face within the oval — make sure it's well-lit and clearly visible
                </p>

                {/* Tips */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                  {[
                    { icon: "☀️", label: "Good lighting" },
                    { icon: "👤", label: "Face centred" },
                    { icon: "😐", label: "Neutral expression" },
                  ].map((tip) => (
                    <div key={tip.label} className="flex flex-col items-center gap-1 p-2.5 bg-[#F8F7FF] rounded-xl">
                      <span style={{ fontSize: "1.2rem" }}>{tip.icon}</span>
                      <span className="text-[#6B7280] text-center" style={{ fontSize: "0.68rem", fontWeight: 600 }}>{tip.label}</span>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={startCamera}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-2xl hover:shadow-lg hover:shadow-blue-200 transition-all"
                    style={{ fontWeight: 700, fontSize: "0.95rem" }}
                  >
                    <Camera size={20} />
                    Take a Selfie
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-white border-2 border-[#6D28D9] text-[#6D28D9] rounded-2xl hover:bg-[#F0EEFF] transition-all"
                    style={{ fontWeight: 700, fontSize: "0.95rem" }}
                  >
                    <Upload size={20} />
                    Choose from Gallery
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                </div>
              </motion.div>
            )}

            {/* CAMERA MODE */}
            {mode === "camera" && (
              <motion.div
                key="camera"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                <div className="relative bg-black" style={{ aspectRatio: "4/3" }}>
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
                  <canvas ref={canvasRef} className="hidden" />

                  {/* Oval overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg width="100%" height="100%" className="absolute inset-0">
                      {/* dark mask outside oval */}
                      <defs>
                        <mask id="ovalMask">
                          <rect width="100%" height="100%" fill="white" />
                          <ellipse cx="50%" cy="48%" rx="33%" ry="40%" fill="black" />
                        </mask>
                      </defs>
                      <rect width="100%" height="100%" fill="rgba(0,0,0,0.5)" mask="url(#ovalMask)" />
                      {/* oval border */}
                      <ellipse cx="50%" cy="48%" rx="33%" ry="40%" fill="none" stroke="#6D28D9" strokeWidth="3" strokeDasharray="10 6" />
                      {/* corner brackets */}
                    </svg>
                    {/* Guide text */}
                    <div className="absolute bottom-16 left-0 right-0 text-center">
                      <p className="text-white text-sm font-semibold drop-shadow-lg">Align your face in the oval</p>
                    </div>
                  </div>

                  {!cameraReady && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                      <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </div>

                <div className="p-5 flex items-center justify-between gap-4">
                  <button
                    onClick={() => { stopCamera(); setMode("choose"); }}
                    className="px-5 py-3 rounded-2xl border-2 border-[#E5E7EB] text-[#6B7280] hover:bg-[#F8F7FF] transition-all"
                    style={{ fontSize: "0.9rem", fontWeight: 600 }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={takeSelfie}
                    disabled={!cameraReady}
                    className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-2xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    style={{ fontWeight: 700, fontSize: "0.95rem" }}
                  >
                    <Camera size={20} /> Capture
                  </button>
                </div>
              </motion.div>
            )}

            {/* PREVIEW MODE */}
            {mode === "preview" && capturedImage && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="p-6"
              >
                <div className="flex flex-col items-center mb-6">
                  {/* Preview with oval crop feel */}
                  <div className="relative mb-4">
                    <div className="absolute -inset-2 bg-gradient-to-br from-[#6D28D9] to-[#2563EB] rounded-full blur-md opacity-40" />
                    <img
                      src={capturedImage}
                      alt="Your selfie"
                      className="relative w-44 h-44 rounded-full object-cover border-4 border-white shadow-xl"
                      style={{ objectPosition: "center top" }}
                    />
                    <div className="absolute bottom-1 right-1 w-10 h-10 bg-[#10B981] rounded-full border-3 border-white flex items-center justify-center shadow-lg">
                      <CheckCircle size={20} className="text-white" />
                    </div>
                  </div>
                  <p className="text-[#1A1A3E]" style={{ fontSize: "1rem", fontWeight: 700 }}>Looks good!</p>
                  <p className="text-[#6B7280]" style={{ fontSize: "0.82rem" }}>Make sure your face is clearly visible</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={confirm}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#6D28D9] to-[#2563EB] text-white rounded-2xl hover:shadow-lg hover:shadow-blue-200 transition-all"
                    style={{ fontWeight: 700, fontSize: "0.95rem" }}
                  >
                    Use this photo <ArrowRight size={18} />
                  </button>
                  <button
                    onClick={retake}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-white border-2 border-[#E5E7EB] text-[#6B7280] rounded-2xl hover:bg-[#F8F7FF] transition-all"
                    style={{ fontWeight: 600, fontSize: "0.9rem" }}
                  >
                    <RefreshCw size={17} /> Retake / Choose again
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
