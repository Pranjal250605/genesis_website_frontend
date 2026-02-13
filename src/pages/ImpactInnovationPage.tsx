import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ImpactInnovation from "@/components/sections/ImpactInnovation"
import SignatureEvent from "@/components/sections/SignatureEvent"

gsap.registerPlugin(ScrollTrigger)

interface ImpactInnovationPageProps {
  onNavigate: (page: "home" | "about-us" | "services" | "impact-innovation" | "careers") => void
}

export default function ImpactInnovationPage({ onNavigate: _onNavigate }: ImpactInnovationPageProps) {
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
      <ImpactInnovation />
      <SignatureEvent />
    </div>
  )
}
