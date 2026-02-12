import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Navbar from "@/components/sections/Navbar"
import SocialInitiatives from "@/components/sections/SocialInitiatives"

gsap.registerPlugin(ScrollTrigger)

interface SocialInitiativesPageProps {
  onNavigate: (
    page:
      | "home"
      | "about-us"
      | "services"
      | "impact-innovation"
      | "careers"
      | "social-initiatives"
  ) => void
}

export default function SocialInitiativesPage({
  onNavigate,
}: SocialInitiativesPageProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on("scroll", ScrollTrigger.update)

    gsap.ticker.add((time: number) => {
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
      <SocialInitiatives />
    </div>
  )
}
