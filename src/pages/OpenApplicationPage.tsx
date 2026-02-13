import { useEffect, useRef, useState } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { ArrowLeft, Upload, Send, FileText, X } from "lucide-react"
import Starry from "@/components/ui/Starry"

gsap.registerPlugin(ScrollTrigger)

interface OpenApplicationPageProps {
  onNavigate: (page: "home" | "about-us" | "services" | "impact-innovation" | "careers" | "social-initiatives" | "join-us" | "updates") => void
}

export default function OpenApplicationPage({ onNavigate }: OpenApplicationPageProps) {
  const { t } = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedIn: "",
    portfolio: "",
    yearsOfExperience: "",
    expertise: "",
    motivation: "",
    availability: "",
  })

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on("scroll", ScrollTrigger.update)

    const update = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(update)
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Construct mailto link with form data
    const subject = encodeURIComponent(`Open Application - ${formData.fullName}`)
    const body = encodeURIComponent(`
Full Name: ${formData.fullName}
Email: ${formData.email}
Phone: ${formData.phone}
Location: ${formData.location}
LinkedIn: ${formData.linkedIn}
Portfolio: ${formData.portfolio}
Years of Experience: ${formData.yearsOfExperience}
Area of Expertise: ${formData.expertise}
Motivation: ${formData.motivation}
Availability: ${formData.availability}
    `)
    window.location.href = `mailto:careers@genesis.co?subject=${subject}&body=${body}`
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      <Starry />

      {/* Ambient glow */}
      <motion.div
        animate={{
          opacity: [0.05, 0.12, 0.05],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-amber-400/10 blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-8 pt-32 pb-24">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => onNavigate("join-us")}
          className="group flex items-center gap-2 mb-12 text-white/40 hover:text-amber-400 transition-colors duration-300"
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="text-sm uppercase tracking-wider">{t("open_application_page.back")}</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <motion.span
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-amber-400 text-[11px] font-bold uppercase tracking-[0.6em] mb-6 block"
          >
            {t("open_application_page.eyebrow")}
          </motion.span>

          <h1
            className="text-[48px] lg:text-[64px] font-bold text-white tracking-tight leading-[0.95] mb-6"
            dangerouslySetInnerHTML={{
              __html: t("open_application_page.title")
                .replace("<1>", '<span class="text-amber-400">')
                .replace("</1>", "</span>"),
            }}
          />

          <p className="text-[18px] text-white/50 leading-relaxed max-w-2xl">
            {t("open_application_page.subtitle")}
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Personal Information */}
          <div className="rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 lg:p-10">
            <h3 className="text-white text-xl font-bold mb-6 uppercase tracking-wider">{t("open_application_page.personal_info")}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">{t("open_application_page.full_name")} <span className="text-amber-400">*</span></label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                  placeholder={t("open_application_page.full_name_placeholder")}
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">{t("open_application_page.email")} <span className="text-amber-400">*</span></label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                  placeholder={t("open_application_page.email_placeholder")}
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">{t("open_application_page.phone")}</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">{t("open_application_page.location")} <span className="text-amber-400">*</span></label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                  placeholder={t("open_application_page.location_placeholder")}
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 lg:p-10">
            <h3 className="text-white text-xl font-bold mb-6 uppercase tracking-wider">{t("open_application_page.professional_bg")}</h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">{t("open_application_page.linkedin")}</label>
                  <input
                    type="url"
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                    placeholder="linkedin.com/in/yourprofile"
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">{t("open_application_page.portfolio")}</label>
                  <input
                    type="url"
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                    placeholder="yourportfolio.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">{t("open_application_page.experience")} <span className="text-amber-400">*</span></label>
                  <select
                    name="yearsOfExperience"
                    required
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                  >
                    <option value="">{t("open_application_page.select_experience")}</option>
                    <option value="0-1">{t("open_application_page.exp_0_1")}</option>
                    <option value="1-3">{t("open_application_page.exp_1_3")}</option>
                    <option value="3-5">{t("open_application_page.exp_3_5")}</option>
                    <option value="5-10">{t("open_application_page.exp_5_10")}</option>
                    <option value="10+">{t("open_application_page.exp_10_plus")}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">{t("open_application_page.availability")}</label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                  >
                    <option value="">{t("open_application_page.avail_select")}</option>
                    <option value="immediate">{t("open_application_page.avail_immediate")}</option>
                    <option value="2-weeks">{t("open_application_page.avail_2_weeks")}</option>
                    <option value="1-month">{t("open_application_page.avail_1_month")}</option>
                    <option value="flexible">{t("open_application_page.avail_flexible")}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">{t("open_application_page.expertise")} <span className="text-amber-400">*</span></label>
                <input
                  type="text"
                  name="expertise"
                  required
                  value={formData.expertise}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                  placeholder={t("open_application_page.expertise_placeholder")}
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">{t("open_application_page.why_genesis")} <span className="text-amber-400">*</span></label>
                <textarea
                  name="motivation"
                  required
                  rows={6}
                  value={formData.motivation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:outline-none transition-colors duration-300 resize-none"
                  placeholder={t("open_application_page.why_genesis_placeholder")}
                />
              </div>
            </div>
          </div>

          {/* Resume / CV Upload */}
          <div className="rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 lg:p-10">
            <h3 className="text-white text-xl font-bold mb-6 uppercase tracking-wider">{t("open_application_page.resume_title")}</h3>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setCvFile(e.target.files?.[0] || null)}
              className="hidden"
            />

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                fileInputRef.current?.click()
              }}
              className={`w-full px-6 py-8 rounded-2xl border border-dashed ${
                cvFile ? "border-amber-400/30 bg-amber-400/[0.03]" : "border-white/15 bg-white/[0.02]"
              } text-center transition-all duration-300 hover:border-amber-400/30 hover:bg-white/[0.04] group cursor-pointer`}
            >
              {cvFile ? (
                <div className="flex items-center justify-center gap-3">
                  <FileText size={20} className="text-amber-400" />
                  <span className="text-white/70 text-[15px]">{cvFile.name}</span>
                  <span
                    onClick={(e) => {
                      e.stopPropagation()
                      setCvFile(null)
                      if (fileInputRef.current) fileInputRef.current.value = ""
                    }}
                    className="ml-2 p-1 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X size={14} className="text-white/40 hover:text-white" />
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Upload
                    size={28}
                    className="text-white/20 transition-colors duration-300 group-hover:text-amber-400/60"
                  />
                  <span className="text-white/30 text-[14px] transition-colors duration-300 group-hover:text-white/50">
                    {t("open_application_page.resume_upload")}
                  </span>
                  <span className="text-white/15 text-[12px]">
                    {t("open_application_page.resume_formats")}
                  </span>
                </div>
              )}
            </button>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full group relative px-8 py-5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-sm uppercase tracking-wider overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(251,191,36,0.4)] flex items-center justify-center gap-3"
          >
            <span>{t("open_application_page.submit")}</span>
            <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>

          <p className="text-center text-white/30 text-xs">
            {t("open_application_page.disclaimer")}
          </p>
        </motion.form>
      </div>
    </div>
  )
}
