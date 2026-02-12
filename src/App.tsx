import { useEffect, useState } from "react"
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
import AboutUsPage from "@/pages/AboutUsPage"
import ServicesPage from "@/pages/ServicesPage"

gsap.registerPlugin(ScrollTrigger)

type Page = "home" | "about-us" | "services"

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home")

  const handleNavigate = (page: Page) => {
    ScrollTrigger.getAll().forEach(st => st.kill())
    window.scrollTo(0, 0)
    const urlMap: Record<Page, string> = { home: "/", "about-us": "/about-us", services: "/services" }
    window.history.pushState({ page }, "", urlMap[page])
    setCurrentPage(page)
  }

  // Browser back/forward button support
  useEffect(() => {
    const handlePop = (e: PopStateEvent) => {
      const page = (e.state?.page as Page) || "home"
      ScrollTrigger.getAll().forEach(st => st.kill())
      window.scrollTo(0, 0)
      setCurrentPage(page)
    }
    window.addEventListener("popstate", handlePop)
    return () => window.removeEventListener("popstate", handlePop)
  }, [])

  // Lenis smooth scroll — only for home page
  useEffect(() => {
    if (currentPage !== "home") return

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
  }, [currentPage])

  if (currentPage === "about-us") {
    return <AboutUsPage onNavigate={handleNavigate} />
  }

  if (currentPage === "services") {
    return <ServicesPage onNavigate={handleNavigate} />
  }

  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar onNavigate={handleNavigate} />
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
