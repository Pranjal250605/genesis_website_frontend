import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { Mail, ArrowUpRight, ArrowLeft } from "lucide-react"
import Starry from "@/components/ui/Starry"

gsap.registerPlugin(ScrollTrigger)

interface ContactUsPageProps {
  onNavigate: (page: "home" | "about-us" | "services" | "impact-innovation" | "careers" | "contact-us") => void
}

export default function ContactUsPage({ onNavigate }: ContactUsPageProps) {
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
          onClick={() => onNavigate("home")}
          className="group flex items-center gap-2 mb-16 text-white/40 hover:text-amber-400 transition-colors duration-300"
        >
          <ArrowLeft size={16} className="transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="text-sm uppercase tracking-wider">Back to Home</span>
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
            Contact Us
          </motion.span>

          <h1 className="text-[48px] lg:text-[72px] font-bold tracking-tight leading-[0.95] mb-8">
            <span className="text-white">Let's </span>
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              Connect
            </span>
          </h1>

          <p className="text-[18px] text-white/50 leading-relaxed max-w-2xl">
            For collaborations, partnerships, business enquiries, or any questions about our work — we'd love to hear from you.
          </p>
        </motion.div>

        {/* Email Card */}
        <motion.a
          href="mailto:enquiry@edify.jp"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="group block rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-xl p-10 lg:p-14 hover:border-amber-400/30 hover:bg-white/[0.04] transition-all duration-500"
        >
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] flex items-center justify-center shrink-0 group-hover:bg-amber-400/[0.12] transition-colors duration-500">
              <Mail size={28} className="text-amber-400" />
            </div>

            <div className="flex-1">
              <p className="text-white/40 text-xs font-medium uppercase tracking-[0.2em] mb-3">
                Email Us
              </p>
              <p className="text-3xl lg:text-5xl font-bold tracking-tight mb-5 flex items-center gap-4">
                <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                  enquiry@edify.jp
                </span>
                <ArrowUpRight size={28} className="text-amber-400/40 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
              </p>
              <p className="text-white/50 text-[15px] leading-relaxed max-w-xl">
                Whether it's a collaboration proposal, partnership opportunity, technical enquiry, or general question — reach out and our team will get back to you.
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
              Headquarters
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              Hiroshima, Japan
            </p>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8">
            <p className="text-amber-400/60 text-xs font-medium uppercase tracking-[0.2em] mb-3">
              Response Time
            </p>
            <p className="text-white/70 text-sm leading-relaxed">
              We typically respond within 1–2 business days.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
