import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "@/components/sections/Navbar"
import AboutUs from "@/components/sections/AboutUs"

gsap.registerPlugin(ScrollTrigger)

interface AboutUsPageProps {
  onNavigate: (page: "home" | "about-us" | "services") => void
}

export default function AboutUsPage({ onNavigate }: AboutUsPageProps) {
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

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar onNavigate={onNavigate} />
      <AboutUs />
    </div>
  )
}
