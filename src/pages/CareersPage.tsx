import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Careers from "@/components/sections/Careers"

gsap.registerPlugin(ScrollTrigger)

interface CareersPageProps {
  onNavigate: (page: "home" | "about-us" | "services" | "impact-innovation" | "careers" | "social-initiatives" | "join-us" | "updates") => void
}

export default function CareersPage({ onNavigate }: CareersPageProps) {
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
    <div className="min-h-screen bg-[#050505]">
      <Careers onNavigate={onNavigate} />
    </div>
  )
}
