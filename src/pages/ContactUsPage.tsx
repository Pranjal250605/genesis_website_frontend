import { useState } from "react"
import { useTranslation } from "react-i18next"
import { motion } from "framer-motion"
import { Mail, ArrowUpRight, ArrowLeft, Send, CheckCircle, AlertCircle } from "lucide-react"
import Starry from "@/components/ui/Starry"
import { supabase } from "@/lib/supabase"

interface ContactUsPageProps {
  onNavigate: (page: "home" | "about-us" | "services" | "impact-innovation" | "careers" | "contact-us") => void
}

export default function ContactUsPage({ onNavigate }: ContactUsPageProps) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    const { error } = await supabase.from("contact_submissions").insert({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    })

    if (error) {
      setStatus("error")
    } else {
      setStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    }
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

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 pt-32 pb-24">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => onNavigate("home")}
          className="group flex items-center gap-2 mb-16 text-white/40 hover:text-amber-400 transition-colors duration-300"
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="text-sm uppercase tracking-wider">{t("contact_us_page.back")}</span>
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
            {t("contact_us_page.eyebrow")}
          </motion.span>

          <h1 className="text-[30px] sm:text-[48px] lg:text-[72px] font-bold tracking-tight leading-[0.95] mb-8">
            <span className="text-white">{t("contact_us_page.title_1")} </span>
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              {t("contact_us_page.title_2")}
            </span>
          </h1>

          <p className="text-[18px] text-white/50 leading-relaxed max-w-2xl">
            {t("contact_us_page.subtitle")}
          </p>
        </motion.div>

        {/* Email Card */}
        <motion.a
          href="mailto:enquiry@edify.jp"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="group block rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-xl p-5 sm:p-10 lg:p-14 hover:border-amber-400/30 hover:bg-white/[0.04] transition-all duration-500"
        >
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] flex items-center justify-center shrink-0 group-hover:bg-amber-400/[0.12] transition-colors duration-500">
              <Mail size={28} className="text-amber-400" />
            </div>

            <div className="flex-1">
              <p className="text-white/40 text-xs font-medium uppercase tracking-[0.2em] mb-3">
                {t("contact_us_page.email_label")}
              </p>
              <p className="text-lg sm:text-3xl lg:text-5xl font-bold tracking-tight mb-5 flex items-center gap-4">
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  enquiry@edify.jp
                </span>
                <ArrowUpRight size={28} className="text-amber-400/40 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </p>
              <p className="text-white/50 text-[15px] leading-relaxed max-w-xl">
                {t("contact_us_page.email_desc")}
              </p>
            </div>
          </div>
        </motion.a>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="rounded-[24px] border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8">
            <p className="text-amber-400/60 text-xs font-medium uppercase tracking-[0.2em] mb-3">
              {t("contact_us_page.hq_label")}
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              {t("contact_us_page.hq_value")}
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8">
            <p className="text-amber-400/60 text-xs font-medium uppercase tracking-[0.2em] mb-3">
              {t("contact_us_page.response_label")}
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              {t("contact_us_page.response_value")}
            </p>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16"
        >
          <h2 className="text-white text-2xl font-bold mb-8 uppercase tracking-wider">
            {t("contact_us_page.form_title")}
          </h2>

          {status === "success" ? (
            <div className="rounded-[32px] border border-green-400/20 bg-green-400/[0.04] backdrop-blur-xl p-10 text-center">
              <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
              <h3 className="text-white text-xl font-bold mb-2">{t("contact_us_page.form_success_title")}</h3>
              <p className="text-white/50 text-[15px]">{t("contact_us_page.form_success_body")}</p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-amber-400 text-sm uppercase tracking-wider hover:text-amber-300 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 lg:p-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">
                      {t("contact_us_page.form_name")} <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                      placeholder={t("contact_us_page.form_name_placeholder")}
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">
                      {t("contact_us_page.form_email")} <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                      placeholder={t("contact_us_page.form_email_placeholder")}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">
                    {t("contact_us_page.form_subject")} <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                    placeholder={t("contact_us_page.form_subject_placeholder")}
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">
                    {t("contact_us_page.form_message")} <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:outline-none transition-colors duration-300 resize-none"
                    placeholder={t("contact_us_page.form_message_placeholder")}
                  />
                </div>
              </div>

              {status === "error" && (
                <div className="flex items-center gap-3 rounded-xl border border-red-400/20 bg-red-400/[0.04] px-5 py-3">
                  <AlertCircle size={18} className="text-red-400 shrink-0" />
                  <p className="text-red-300 text-sm">{t("contact_us_page.form_error")}</p>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full group relative px-8 py-5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-sm uppercase tracking-wider overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(251,191,36,0.4)] flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span>{status === "loading" ? t("contact_us_page.form_submitting") : t("contact_us_page.form_submit")}</span>
                <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  )
}
