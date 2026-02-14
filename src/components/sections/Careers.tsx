import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Upload,
  CheckCircle2,
  User,
  Mail,
  Briefcase,
  FileText,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react";
import Starry from "@/components/ui/Starry";
import { supabase } from "@/lib/supabase";

/* ───────────────────── Types ───────────────────── */

interface FormData {
  fullName: string;
  email: string;
  areaOfInterest: string;
  cv: File | null;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  areaOfInterest?: string;
  cv?: string;
}

/* ───────────────────── Component ───────────────────── */

interface CareersProps {
  onNavigate?: (page: "home" | "about-us" | "services" | "impact-innovation" | "careers" | "social-initiatives" | "join-us" | "updates") => void;
}

export default function Careers(_props: CareersProps = {}) {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    areaOfInterest: "",
    cv: null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  /* Hero parallax */
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(heroProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.9]);
  const smoothHeroY = useSpring(heroY, { stiffness: 50, damping: 20 });

  /* ── Validation ── */
  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = t("careers_page.errors.full_name_required");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("careers_page.errors.email_required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("careers_page.errors.email_invalid");
    }

    if (!formData.areaOfInterest.trim()) {
      newErrors.areaOfInterest = t("careers_page.errors.area_required");
    }

    if (!formData.cv) {
      newErrors.cv = t("careers_page.errors.cv_required");
    } else {
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(formData.cv.type)) {
        newErrors.cv = t("careers_page.errors.cv_format");
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ── Submit ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError("");

    // Step 1: Upload CV to private bucket
    let cvPath: string | undefined;
    if (formData.cv) {
      const fileExt = formData.cv.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("cv-uploads")
        .upload(fileName, formData.cv, {
          contentType: formData.cv.type,
        });

      if (uploadError) {
        setIsSubmitting(false);
        setSubmitError(t("open_application_page.error_upload"));
        return;
      }

      cvPath = fileName;
    }

    // Step 2: Insert into open_applications table
    const { error } = await supabase.from("open_applications").insert({
      full_name: formData.fullName,
      email: formData.email,
      expertise: formData.areaOfInterest,
      cv_url: cvPath || null,
    });

    setIsSubmitting(false);

    if (error) {
      setSubmitError(t("open_application_page.error_submit"));
    } else {
      setSubmitted(true);
      setFormData({ fullName: "", email: "", areaOfInterest: "", cv: null });
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  /* ── File change ── */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, cv: file }));
    if (errors.cv) setErrors((prev) => ({ ...prev, cv: undefined }));
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505]">
      {/* Hidden file input — placed at root level to avoid overflow/z-index issues */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
        id="cv-upload-input"
      />

      {/* Starry background */}
      <Starry />

      {/* Ambient light */}
      <motion.div
        animate={{
          opacity: [0.08, 0.15, 0.08],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-amber-400/10 blur-[120px] pointer-events-none"
        style={{ zIndex: 1 }}
      />

      <div className="relative z-10">
        {/* ═══════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════ */}
        <section
          ref={heroRef}
          className="relative min-h-[70vh] flex flex-col items-center justify-center px-8 lg:px-16 text-center pt-32 pb-16"
        >
          <motion.div
            style={{ y: smoothHeroY, opacity: heroOpacity, scale: heroScale }}
            className="max-w-4xl"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex items-center justify-center gap-4 mb-10"
            >
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
              <span className="text-amber-400/70 text-[11px] font-medium uppercase tracking-[0.4em]">
                {t("careers_page.hero_eyebrow")}
              </span>
              <div className="h-px w-16 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
            </motion.div>

            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[48px] lg:text-[80px] font-bold tracking-tight leading-[0.95] mb-8"
            >
              <span
                className="text-white"
                dangerouslySetInnerHTML={{
                  __html: t("careers_page.hero_title", {
                    interpolation: { escapeValue: false },
                  }),
                }}
              />
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              className="text-[18px] lg:text-[20px] text-white/50 leading-relaxed max-w-2xl mx-auto"
            >
              {t("careers_page.hero_subtitle")}
            </motion.p>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════════
            CV SUBMISSION FORM
        ═══════════════════════════════════════════ */}
        <section className="relative max-w-[720px] mx-auto px-8 lg:px-16 pb-40">
          <AnimatePresence mode="wait">
            {submitted ? (
              /* ── Success Message ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-[32px] border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-xl overflow-hidden"
              >
                {/* Ambient glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-amber-400/[0.06] blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 py-20 px-8 lg:px-14 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="w-20 h-20 rounded-full border border-amber-400/30 bg-amber-400/[0.08] flex items-center justify-center mx-auto mb-8"
                  >
                    <CheckCircle2 size={36} className="text-amber-400" />
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="text-[18px] lg:text-[20px] text-white/70 leading-relaxed max-w-lg mx-auto"
                  >
                    {t("careers_page.confirmation_message")}
                  </motion.p>
                </div>
              </motion.div>
            ) : (
              /* ── Form ── */
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-xl overflow-hidden"
              >
                {/* Top glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-amber-400/[0.04] blur-[100px] rounded-full pointer-events-none" />

                <form onSubmit={handleSubmit} className="relative z-10 p-8 lg:p-14">
                  <div className="space-y-8">
                    {/* Full Name */}
                    <div>
                      <label className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.2em] text-white/40 mb-3">
                        <User size={14} className="text-amber-400/60" />
                        {t("careers_page.form.full_name")}
                        <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, fullName: e.target.value }));
                          if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                        }}
                        placeholder={t("careers_page.form.full_name_placeholder")}
                        className={`w-full px-6 py-4 rounded-2xl bg-white/[0.03] border ${
                          errors.fullName ? "border-red-400/50" : "border-white/10"
                        } text-white text-[16px] placeholder:text-white/20 outline-none transition-all duration-300 focus:border-amber-400/40 focus:bg-white/[0.05] focus:shadow-[0_0_30px_rgba(251,191,36,0.06)]`}
                      />
                      {errors.fullName && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400/80 text-[13px] mt-2"
                        >
                          {errors.fullName}
                        </motion.p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.2em] text-white/40 mb-3">
                        <Mail size={14} className="text-amber-400/60" />
                        {t("careers_page.form.email")}
                        <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, email: e.target.value }));
                          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                        }}
                        placeholder={t("careers_page.form.email_placeholder")}
                        className={`w-full px-6 py-4 rounded-2xl bg-white/[0.03] border ${
                          errors.email ? "border-red-400/50" : "border-white/10"
                        } text-white text-[16px] placeholder:text-white/20 outline-none transition-all duration-300 focus:border-amber-400/40 focus:bg-white/[0.05] focus:shadow-[0_0_30px_rgba(251,191,36,0.06)]`}
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400/80 text-[13px] mt-2"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </div>

                    {/* Area of Interest */}
                    <div>
                      <label className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.2em] text-white/40 mb-3">
                        <Briefcase size={14} className="text-amber-400/60" />
                        {t("careers_page.form.area_of_interest")}
                        <span className="text-amber-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.areaOfInterest}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, areaOfInterest: e.target.value }));
                          if (errors.areaOfInterest) setErrors((prev) => ({ ...prev, areaOfInterest: undefined }));
                        }}
                        placeholder={t("careers_page.form.area_placeholder")}
                        className={`w-full px-6 py-4 rounded-2xl bg-white/[0.03] border ${
                          errors.areaOfInterest ? "border-red-400/50" : "border-white/10"
                        } text-white text-[16px] placeholder:text-white/20 outline-none transition-all duration-300 focus:border-amber-400/40 focus:bg-white/[0.05] focus:shadow-[0_0_30px_rgba(251,191,36,0.06)]`}
                      />
                      {errors.areaOfInterest && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400/80 text-[13px] mt-2"
                        >
                          {errors.areaOfInterest}
                        </motion.p>
                      )}
                    </div>

                    {/* CV Upload */}
                    <div>
                      <label className="flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.2em] text-white/40 mb-3">
                        <FileText size={14} className="text-amber-400/60" />
                        {t("careers_page.form.cv_upload")}
                        <span className="text-amber-400">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          fileInputRef.current?.click();
                        }}
                        className={`w-full px-6 py-6 rounded-2xl border border-dashed ${
                          errors.cv ? "border-red-400/50" : "border-white/15"
                        } bg-white/[0.02] text-center transition-all duration-300 hover:border-amber-400/30 hover:bg-white/[0.04] group cursor-pointer`}
                      >
                        {formData.cv ? (
                          <div className="flex items-center justify-center gap-3">
                            <FileText size={20} className="text-amber-400" />
                            <span className="text-white/70 text-[15px]">
                              {formData.cv.name}
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-3">
                            <Upload
                              size={24}
                              className="text-white/20 transition-colors duration-300 group-hover:text-amber-400/60"
                            />
                            <span className="text-white/30 text-[14px] transition-colors duration-300 group-hover:text-white/50">
                              {t("careers_page.form.cv_placeholder")}
                            </span>
                            <span className="text-white/15 text-[12px]">
                              PDF, DOC, DOCX
                            </span>
                          </div>
                        )}
                      </button>
                      {errors.cv && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400/80 text-[13px] mt-2"
                        >
                          {errors.cv}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  {/* Error feedback */}
                  {submitError && (
                    <div className="flex items-center gap-3 rounded-xl border border-red-400/20 bg-red-400/[0.04] px-5 py-3 mt-6">
                      <AlertCircle size={18} className="text-red-400 shrink-0" />
                      <p className="text-red-300 text-sm">{submitError}</p>
                    </div>
                  )}

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    className="w-full mt-10 px-10 py-5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-[14px] uppercase tracking-wider shadow-[0_0_40px_rgba(251,191,36,0.15)] transition-all duration-500 hover:shadow-[0_0_60px_rgba(251,191,36,0.3)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                      />
                    ) : (
                      <>
                        {t("careers_page.form.submit")}
                        <ArrowUpRight size={16} />
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
