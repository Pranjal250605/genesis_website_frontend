import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { ArrowLeft, FileText } from "lucide-react"
import reskillinggxImg from "@/components/images/reskillinggx.jpg"

interface GxBrochurePageProps {
  onNavigate: (page: "gx-training" | "services") => void
}

export default function GxBrochurePage({ onNavigate }: GxBrochurePageProps) {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">

      {/* ── Sticky top bar ─────────────────────────── */}
      <div className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-10 py-4 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <button
          onClick={() => onNavigate("gx-training")}
          className="flex items-center gap-2 text-white/50 hover:text-white text-[12px] uppercase tracking-[0.15em] transition-colors duration-300 group"
        >
          <ArrowLeft
            size={15}
            strokeWidth={2}
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />
          {t("gx_training_page.back")}
        </button>

        <div className="flex items-center gap-2 text-white/30">
          <FileText size={14} strokeWidth={1.5} />
          <span className="text-[11px] uppercase tracking-[0.2em]">
            {t("gx_training_page.badge")}
          </span>
        </div>
      </div>

      {/* ── Page heading ───────────────────────────── */}
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 pt-10 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#4ade80]/60 mb-3">
            {t("gx_training_page.eyebrow")}
          </p>
          <h1 className="text-[22px] sm:text-[32px] font-bold text-white leading-tight">
            {t("gx_training_page.badge")}
          </h1>
          <div className="mt-3 h-px w-16 bg-[#4ade80]/30" />
        </motion.div>
      </div>

      {/* ── Document ───────────────────────────────── */}
      <div className="flex-1 flex items-start justify-center px-4 sm:px-8 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="w-full max-w-4xl"
        >
          {/* Paper frame */}
          <div
            className="w-full rounded-2xl overflow-hidden"
            style={{
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.07), 0 24px 80px rgba(0,0,0,0.7), 0 4px 20px rgba(0,0,0,0.5)",
            }}
          >
            <img
              src={reskillinggxImg}
              alt="GX Reskilling Support Course — Full Brochure"
              className="w-full h-auto block"
              style={{ imageRendering: "crisp-edges" }}
            />
          </div>

          {/* Footer action */}
          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-[13px] text-white/35 leading-relaxed max-w-lg">
              {t("gx_training_page.subtitle")}
            </p>
            <button
              onClick={() => onNavigate("gx-training")}
              className="
                group shrink-0 flex items-center gap-3
                px-7 py-3 rounded-full
                border border-[#4ade80]/35 bg-[#4ade80]/[0.07]
                text-[12px] font-bold uppercase tracking-[0.15em] text-[#4ade80]/80
                hover:bg-[#4ade80]/[0.14] hover:border-[#4ade80]/55 hover:text-[#4ade80]
                active:scale-95 transition-all duration-300
              "
            >
              {t("gxSection.cta")}
              <svg
                width="12" height="12" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5"
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>

    </div>
  )
}
