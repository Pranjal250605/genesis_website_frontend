import { useEffect } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Hero from "@/components/sections/Hero"
import Navbar from "@/components/sections/Navbar"
import About from "./components/sections/About"
import Core from "@/components/sections/core"
import Global_Footprint from "@/components/sections/Global_Footprint"
import Partners from "@/components/sections/Partners"
import CeoVision from "@/components/sections/CeoVision"
import Contact from "@/components/sections/Contact"

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    // Connect Lenis to GSAP ScrollTrigger
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
      <Navbar />
      <Hero />
      <About />
      <Core />
      <Global_Footprint />
      <Partners />
      <CeoVision />
      <Contact />
    </div>
  )
}

