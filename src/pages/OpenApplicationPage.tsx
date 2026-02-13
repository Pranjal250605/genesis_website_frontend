import { useEffect, useState } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"
import { ArrowLeft, Upload, Send } from "lucide-react"
import Starry from "@/components/ui/Starry"

gsap.registerPlugin(ScrollTrigger)

interface OpenApplicationPageProps {
  onNavigate: (page: "home" | "about-us" | "services" | "impact-innovation" | "careers" | "social-initiatives" | "join-us" | "updates") => void
}

export default function OpenApplicationPage({ onNavigate }: OpenApplicationPageProps) {
  const { t } = useTranslation()
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
          <span className="text-sm uppercase tracking-wider">Back to Careers</span>
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
            Open Application
          </motion.span>

          <h1 className="text-[48px] lg:text-[64px] font-bold text-white tracking-tight leading-[0.95] mb-6">
            Join Our <span className="text-amber-400">Team</span>
          </h1>

          <p className="text-[18px] text-white/50 leading-relaxed max-w-2xl">
            Don't see a role that fits? We're always looking for exceptional talent. Tell us about yourself and how you'd like to contribute to Genesis.
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
            <h3 className="text-white text-xl font-bold mb-6 uppercase tracking-wider">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">Phone</label>
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
                <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">Location *</label>
                <input
                  type="text"
                  name="location"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                  placeholder="City, Country"
                />
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 lg:p-10">
            <h3 className="text-white text-xl font-bold mb-6 uppercase tracking-wider">Professional Background</h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">LinkedIn Profile</label>
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
                  <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">Portfolio / Website</label>
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
                  <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">Years of Experience *</label>
                  <select
                    name="yearsOfExperience"
                    required
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select experience</option>
                    <option value="0-1">0-1 years</option>
                    <option value="1-3">1-3 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-10">5-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">Availability</label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select availability</option>
                    <option value="immediate">Immediate</option>
                    <option value="2-weeks">2 weeks notice</option>
                    <option value="1-month">1 month notice</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">Area of Expertise *</label>
                <input
                  type="text"
                  name="expertise"
                  required
                  value={formData.expertise}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:outline-none transition-colors duration-300"
                  placeholder="e.g., AI/ML, Blockchain, Full Stack Development"
                />
              </div>

              <div>
                <label className="block text-white/60 text-sm uppercase tracking-wider mb-3">Why Genesis? *</label>
                <textarea
                  name="motivation"
                  required
                  rows={6}
                  value={formData.motivation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:border-amber-400/50 focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Tell us why you want to join Genesis and what unique value you would bring to our team..."
                />
              </div>
            </div>
          </div>

          {/* Resume Upload Note */}
          <div className="rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-xl p-8 lg:p-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center shrink-0">
                <Upload size={20} className="text-amber-400/60" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-white text-lg font-bold mb-2">Resume / CV</h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  Please attach your resume/CV to the email that will be generated after submitting this form. Accepted formats: PDF, DOC, DOCX (Max 5MB)
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full group relative px-8 py-5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-sm uppercase tracking-wider overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(251,191,36,0.4)] flex items-center justify-center gap-3"
          >
            <span>Submit Application</span>
            <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </motion.button>

          <p className="text-center text-white/30 text-xs">
            By submitting this form, you agree to our privacy policy and terms of service.
          </p>
        </motion.form>
      </div>
    </div>
  )
}
