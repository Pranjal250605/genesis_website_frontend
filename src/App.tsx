import { useEffect, useState } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Layout Components
import Navbar from "@/components/sections/Navbar"

// Home Sections
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Core from "@/components/sections/Core" // Standardized casing
import Services from "@/components/sections/Services" // Added your new component
import Global_Footprint from "@/components/sections/Global_Footprint"
import Partners from "@/components/sections/Partners"
import CeoVision from "@/components/sections/CeoVision"
import Contact from "@/components/sections/Contact"

// Pages
import AboutUsPage from "@/pages/AboutUsPage"
import ServicesPage from "@/pages/ServicesPage"
import ImpactInnovationPage from "@/pages/ImpactInnovationPage"
import CareersPage from "@/pages/CareersPage"

gsap.registerPlugin(ScrollTrigger)

type Page = "home" | "about-us" | "services" | "impact-innovation" | "careers"

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home")

  const handleNavigate = (page: Page) => {
    ScrollTrigger.getAll().forEach(st => st.kill())
    window.scrollTo(0, 0)
    const urlMap: Record<Page, string> = { home: "/", "about-us": "/about-us", services: "/services", "impact-innovation": "/impact-innovation", careers: "/careers" }
    window.history.pushState({ page }, "", urlMap[page])
    setCurrentPage(page)
  }

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

  useEffect(() => {
    if (currentPage !== "home") return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on("scroll", ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [currentPage])

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* Navbar stays outside the conditional logic so it's ALWAYS visible */}
      <Navbar onNavigate={handleNavigate} />
      
      <main>
        {currentPage === "home" && (
          <>
            <Hero />
            <About />
            <Core />
            <Global_Footprint />
            <Partners />
            <CeoVision />
            <Contact />
          </>
        )}

        {currentPage === "about-us" && <AboutUsPage onNavigate={handleNavigate} />}
        {currentPage === "services" && <ServicesPage onNavigate={handleNavigate} />}
        {currentPage === "impact-innovation" && <ImpactInnovationPage onNavigate={handleNavigate} />}
        {currentPage === "careers" && <CareersPage onNavigate={handleNavigate} />}
      </main>
    </div>
  )
}