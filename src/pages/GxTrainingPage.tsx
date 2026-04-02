import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { ArrowLeft, Leaf, Clock, Users, TrendingUp } from "lucide-react"
import Starry from "@/components/ui/Starry"
import reskillingGxImg from "@/components/images/reskillinggx.jpg"
import takakoImg from "@/components/images/takako1.png"

type NavigablePage = "home" | "services" | "contact-us" | "gx-brochure"

interface GxTrainingPageProps {
  onNavigate: (page: NavigablePage) => void
}

function richText(raw: string) {
  return raw
    .replace("<1>", '<span class="text-[#4ade80]">')
    .replace("</1>", "</span>")
}

const subsidy_icons = [Leaf, Clock, TrendingUp, Users]

export default function GxTrainingPage({ onNavigate }: GxTrainingPageProps) {
  const { t } = useTranslation()

  const modules = t("gx_training_page.modules", { returnObjects: true }) as Array<{
    num: string
    title: string
    desc: string
  }>

  const subsidies = t("gx_training_page.subsidies", { returnObjects: true }) as Array<{
    title: string
    desc: string
  }>

  const outcomes = t("gx_training_page.outcomes", { returnObjects: true }) as string[]

  return (
    <div className="min-h-screen bg-[#050505] overflow-hidden">

      {/* ══════════════════════════════════════════
          HERO — cinematic full-height banner
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* Background image */}
        <motion.img
          src={reskillingGxImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: "easeOut" }}
        />

        {/* Overlay layers */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-transparent" />

        {/* Back button */}
        <motion.button
          onClick={() => onNavigate("services")}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-28 left-5 sm:left-12 lg:left-24 flex items-center gap-2 text-white/50 hover:text-white text-[13px] uppercase tracking-[0.15em] transition-colors duration-300 group z-30"
        >
          <ArrowLeft
            size={16}
            strokeWidth={2}
            className="group-hover:-translate-x-1 transition-transform duration-300"
          />
          {t("gx_training_page.back")}
        </motion.button>

        {/* Hero content */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-12 lg:px-24 pb-20 sm:pb-28 lg:pb-36">
          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#4ade80]/30 bg-[#4ade80]/[0.07] text-[11px] font-bold uppercase tracking-[0.25em] text-[#4ade80]">
              <Leaf size={12} strokeWidth={2.5} />
              {t("gx_training_page.badge")}
            </span>
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/[0.08] text-[11px] font-bold uppercase tracking-[0.25em] text-amber-400">
              {t("gx_training_page.subsidy_badge")}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="text-[36px] sm:text-[60px] lg:text-[80px] xl:text-[96px] font-bold text-white leading-[1.0] uppercase tracking-tight mb-6"
            dangerouslySetInnerHTML={{ __html: richText(t("gx_training_page.title")) }}
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="text-[15px] sm:text-[18px] text-white/55 max-w-2xl leading-relaxed"
          >
            {t("gx_training_page.subtitle")}
          </motion.p>

          {/* Key stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-wrap gap-px"
          >
            {[
              { val: t("gx_training_page.stat_hours"), label: t("gx_training_page.stat_hours_label") },
              { val: t("gx_training_page.stat_cost"), label: t("gx_training_page.stat_cost_label") },
              { val: t("gx_training_page.stat_subsidy"), label: t("gx_training_page.stat_subsidy_label"), green: true },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center px-8 py-5 border border-white/10 bg-white/[0.04] backdrop-blur-md first:rounded-l-2xl last:rounded-r-2xl"
              >
                <span
                  className={`text-[28px] sm:text-[36px] font-bold leading-none ${stat.green ? "text-[#4ade80]" : "text-amber-400"}`}
                >
                  {stat.val}
                </span>
                <span className="mt-1 text-[11px] uppercase tracking-[0.15em] text-white/40">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          OVERVIEW
      ══════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <Starry />
        </div>

        {/* Ambient glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70vw",
            height: "70vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(74,222,128,0.05) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            {/* Left — text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#4ade80]/70 mb-4">
                {t("gx_training_page.overview_eyebrow")}
              </p>
              <h2
                className="text-[30px] sm:text-[44px] lg:text-[52px] font-bold text-white uppercase tracking-tight leading-tight mb-8"
                dangerouslySetInnerHTML={{ __html: richText(t("gx_training_page.overview_title")) }}
              />
              <div className="w-12 h-px bg-[#4ade80]/40 mb-8" />
              <p className="text-[15px] sm:text-[17px] text-white/60 leading-[1.85]">
                {t("gx_training_page.overview_body")}
              </p>
            </motion.div>

            {/* Right — profile card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
              className="w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto"
            >
              <div className="rounded-[24px] bg-white/[0.04] backdrop-blur-2xl border border-white/10 overflow-hidden shadow-[0_0_80px_rgba(74,222,128,0.06)]">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={takakoImg}
                    alt={t("gxSection.card.name")}
                    className="w-full h-full object-cover object-[center_15%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4ade80] bg-black/60 backdrop-blur-md border border-[#4ade80]/25 rounded-full px-3 py-1">
                      {t("gxSection.card.company")}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-[17px] font-bold text-white leading-tight mb-1">
                    {t("gxSection.card.name")}
                  </h4>
                  <p className="text-[13px] text-[#4ade80]/80 font-semibold uppercase tracking-wide mb-5">
                    {t("gxSection.card.subtitle")}
                  </p>
                  <div className="h-px w-full bg-gradient-to-r from-white/10 via-[#4ade80]/20 to-white/10 mb-5" />
                  <p className="text-[11px] text-white/40 font-bold uppercase tracking-[0.15em] mb-3">
                    {t("gxSection.card.heading")}
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {[t("gxSection.card.affiliation1"), t("gxSection.card.affiliation2")].map((aff) => (
                      <li key={aff} className="flex items-start gap-2.5">
                        <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#4ade80]/50" />
                        <span className="text-[13px] text-white/60 leading-snug">{aff}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CURRICULUM BANNER
      ══════════════════════════════════════════ */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505] to-[#050505]" />
        {/* Subtle green scan-line */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            background: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(74,222,128,0.025) 40px)",
          }}
        />

        <section className="relative z-10 py-20 sm:py-28 lg:py-36">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-12 lg:px-24">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-14 sm:mb-20"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="h-px w-8 bg-[#4ade80]/40" />
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#4ade80]/70">
                  {t("gx_training_page.curriculum_eyebrow")}
                </p>
              </div>
              <h2
                className="text-[30px] sm:text-[48px] lg:text-[64px] font-bold text-white uppercase tracking-tight leading-tight mb-4"
                dangerouslySetInnerHTML={{ __html: richText(t("gx_training_page.curriculum_title")) }}
              />
              <p className="text-[13px] sm:text-[15px] text-white/40 uppercase tracking-[0.12em]">
                {t("gx_training_page.curriculum_subtitle")}
              </p>
            </motion.div>

            {/* Module grid — 2 cols on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {modules.map((mod, i) => (
                <motion.div
                  key={mod.num}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: "easeOut" }}
                  className="group flex items-start gap-5 rounded-[20px] border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm p-6 hover:border-[#4ade80]/25 hover:bg-white/[0.04] transition-all duration-400"
                >
                  {/* Number badge */}
                  <div className="shrink-0 w-12 h-12 rounded-xl border border-[#4ade80]/20 bg-[#4ade80]/[0.05] flex items-center justify-center group-hover:border-[#4ade80]/40 transition-colors duration-400">
                    <span className="text-[13px] font-bold text-[#4ade80]/70 tabular-nums group-hover:text-[#4ade80] transition-colors duration-400">
                      {mod.num}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[15px] sm:text-[16px] font-bold text-white/90 leading-snug mb-2 group-hover:text-white transition-colors duration-300">
                      {mod.title}
                    </h3>
                    <p className="text-[13px] text-white/45 leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                      {mod.desc}
                    </p>
                  </div>

                  {/* Accent line */}
                  <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#4ade80]/0 to-transparent group-hover:via-[#4ade80]/20 transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════════
          SUBSIDY BENEFITS
      ══════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 lg:py-36">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <Starry />
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-12 lg:px-24">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-14 sm:mb-20 text-center"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mx-auto mb-6 h-px w-24 bg-gradient-to-r from-transparent via-[#4ade80]/50 to-transparent origin-center"
            />
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#4ade80]/70 mb-4">
              {t("gx_training_page.subsidy_eyebrow")}
            </p>
            <h2
              className="text-[30px] sm:text-[48px] lg:text-[60px] font-bold text-white uppercase tracking-tight leading-tight"
              dangerouslySetInnerHTML={{ __html: richText(t("gx_training_page.subsidy_title")) }}
            />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-[#4ade80]/50 to-transparent origin-center"
            />
          </motion.div>

          {/* 4-card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {subsidies.map((sub, i) => {
              const Icon = subsidy_icons[i]
              return (
                <motion.div
                  key={sub.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
                  className="group relative rounded-[24px] border border-white/10 bg-white/[0.025] backdrop-blur-xl p-8 hover:border-[#4ade80]/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden"
                >
                  {/* Glow on hover */}
                  <div className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(circle at 30% 30%, rgba(74,222,128,0.06) 0%, transparent 70%)" }}
                  />

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl border border-[#4ade80]/20 bg-[#4ade80]/[0.06] flex items-center justify-center mb-6 group-hover:border-[#4ade80]/40 transition-colors duration-400">
                      <Icon size={22} className="text-[#4ade80]/70 group-hover:text-[#4ade80] transition-colors duration-400" strokeWidth={1.5} />
                    </div>

                    <h3 className="text-[20px] sm:text-[22px] font-bold text-white mb-3 leading-tight">
                      {sub.title}
                    </h3>

                    <div className="h-px w-8 bg-gradient-to-r from-[#4ade80]/40 to-transparent mb-4" />

                    <p className="text-[14px] text-white/55 leading-relaxed group-hover:text-white/70 transition-colors duration-400">
                      {sub.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TRAINING OUTCOMES
      ══════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

            {/* Left — header */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="lg:sticky lg:top-32"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-amber-400/70 mb-4">
                {t("gx_training_page.outcomes_eyebrow")}
              </p>
              <h2
                className="text-[30px] sm:text-[44px] lg:text-[56px] font-bold text-white uppercase tracking-tight leading-tight"
                dangerouslySetInnerHTML={{ __html: richText(t("gx_training_page.outcomes_title")) }}
              />
              <div className="mt-8 w-full max-w-xs">
                <div className="h-px bg-gradient-to-r from-amber-400/30 to-transparent mb-3" />
                <p className="text-[12px] text-white/30 uppercase tracking-[0.15em]">
                  {t("gx_training_page.curriculum_subtitle")}
                </p>
              </div>
            </motion.div>

            {/* Right — outcome list */}
            <div className="flex flex-col gap-5">
              {outcomes.map((outcome, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                  className="group flex items-start gap-5 rounded-[16px] border border-white/[0.07] bg-white/[0.02] p-5 sm:p-6 hover:border-amber-400/20 hover:bg-white/[0.035] transition-all duration-400"
                >
                  {/* Index */}
                  <span className="shrink-0 mt-0.5 text-[13px] font-bold tabular-nums text-amber-400/50 w-7 group-hover:text-amber-400/80 transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* Divider */}
                  <div className="shrink-0 mt-2 w-px h-4 bg-amber-400/20 group-hover:bg-amber-400/40 transition-colors duration-300" />
                  {/* Text */}
                  <p className="text-[14px] sm:text-[15px] text-white/65 leading-relaxed group-hover:text-white/85 transition-colors duration-300">
                    {outcome}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BLOCK
      ══════════════════════════════════════════ */}
      <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(74,222,128,0.07) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 border-t border-b border-[#4ade80]/[0.06]" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-5 sm:px-12 lg:px-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#4ade80]/25 bg-[#4ade80]/[0.05] text-[11px] font-bold uppercase tracking-[0.25em] text-[#4ade80]/80 mb-8">
              <Leaf size={11} strokeWidth={2.5} />
              {t("gx_training_page.badge")}
            </span>

            <h2 className="text-[30px] sm:text-[48px] lg:text-[64px] font-bold text-white uppercase tracking-tight leading-tight mb-5">
              {t("gxSection.panel3Title")}
            </h2>
            <p className="text-[15px] sm:text-[17px] text-white/45 max-w-xl mx-auto leading-relaxed mb-12">
              {t("gxSection.panel3Sub")}
            </p>

            <motion.button
              onClick={() => onNavigate("contact-us")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="
                group inline-flex items-center gap-3
                px-8 py-4 sm:px-12 sm:py-5
                rounded-full border border-[#4ade80]/40 bg-[#4ade80]/[0.08]
                backdrop-blur-md
                text-[13px] sm:text-[15px] font-bold uppercase tracking-[0.15em] text-[#4ade80]
                hover:bg-[#4ade80]/[0.15] hover:border-[#4ade80]/60
                transition-all duration-300
              "
            >
              {t("contactSection.contact.ctaButton")}
              <svg
                width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5"
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
