import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "@/components/sections/Navbar"
import Services from "@/components/sections/Services"

gsap.registerPlugin(ScrollTrigger)

interface ServicesPageProps {
  onNavigate: (page: "home" | "about-us" | "services" | "impact-innovation") => void
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar onNavigate={onNavigate} />
      <Services />
    </div>
  )
}
