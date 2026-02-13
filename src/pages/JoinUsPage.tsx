import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import JoinUs from "@/components/sections/JoinUs"

gsap.registerPlugin(ScrollTrigger)

interface JoinUsPageProps {
  onNavigate: (
    page:
      | "home"
      | "about-us"
      | "services"
      | "impact-innovation"
      | "careers"
      | "social-initiatives"
      | "join-us"
      | "updates"
      | "open-application"
  ) => void
}

export default function JoinUsPage({ onNavigate }: JoinUsPageProps) {
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

    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
    })

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#050505]">
      <JoinUs onNavigate={onNavigate} />
    </div>
  )
}
