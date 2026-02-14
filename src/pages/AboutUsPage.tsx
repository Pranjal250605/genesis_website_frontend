import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import AboutUs from "@/components/sections/AboutUs"
import TeamMarquee from "@/components/sections/TeamMarquee"
import Global_Footprint from "@/components/sections/Global_Footprint"

gsap.registerPlugin(ScrollTrigger)

interface AboutUsPageProps {
  onNavigate: (page: "home" | "about-us" | "services" | "impact-innovation" | "careers") => void
}

export default function AboutUsPage({ onNavigate: _onNavigate }: AboutUsPageProps) {
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
      <AboutUs />
      <TeamMarquee />
      <Global_Footprint />
    </div>
  )
}
