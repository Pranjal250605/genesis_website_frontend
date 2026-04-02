import { useEffect, useLayoutEffect, useState } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "@/i18n"

// Layout Components
import Navbar from "@/components/sections/Navbar"

// Home Sections
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Core from "@/components/sections/Core"
import Global_Footprint from "@/components/sections/Global_Footprint"
import Partners from "@/components/sections/Partners"
import CeoVision from "@/components/sections/CeoVision"
import Contact from "@/components/sections/Contact"

// Pages
import AboutUsPage from "@/pages/AboutUsPage"
import ServicesPage from "@/pages/ServicesPage"
import ImpactInnovationPage from "@/pages/ImpactInnovationPage"
import CareersPage from "@/pages/CareersPage"
import SocialInitiativesPage from "@/pages/SocialInitiativesPage"
import JoinUsPage from "@/pages/JoinUsPage" // New import
import UpdatesPage from "@/pages/UpdatesPage" // New import
import OpenApplicationPage from "@/pages/OpenApplicationPage"
import JapanPortfolioPage from "@/pages/JapanPortfolioPage"
import ContactUsPage from "@/pages/ContactUsPage"
import GxTrainingPage from "@/pages/GxTrainingPage"
import GxBrochurePage from "@/pages/GxBrochurePage"

gsap.registerPlugin(ScrollTrigger)

type Page =
  | "home"
  | "about-us"
  | "services"
  | "impact-innovation"
  | "careers"
  | "social-initiatives"
  | "join-us"
  | "updates"
  | "open-application"
  | "japan-portfolio"
  | "contact-us"
  | "gx-training"
  | "gx-brochure"

const urlMap: Record<Page, string> = {
  home: "/",
  "about-us": "/about-us",
  services: "/services",
  "impact-innovation": "/impact-innovation",
  careers: "/careers",
  "social-initiatives": "/social-initiatives",
  "join-us": "/join-us",
  updates: "/updates",
  "open-application": "/open-application",
  "japan-portfolio": "/japan-portfolio",
  "contact-us": "/contact-us",
  "gx-training": "/gx-training",
  "gx-brochure": "/gx-brochure",
}

function cleanupScrollState() {
  ScrollTrigger.getAll().forEach((st) => st.kill())
  ScrollTrigger.clearScrollMemory()
  window.scrollTo(0, 0)
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [homeKey, setHomeKey] = useState(0)
  const [pageKey, setPageKey] = useState(0)

  const handleNavigate = (page: Page) => {
    cleanupScrollState()
    window.history.pushState({ page }, "", urlMap[page])
    setCurrentPage(page)
    setPageKey((k) => k + 1)
  }

  const handleHomeReset = () => {
    cleanupScrollState()
    setHomeKey((k) => k + 1)
    setPageKey((k) => k + 1)
  }

  // Handle browser back/forward
  useEffect(() => {
    const handlePop = (e: PopStateEvent) => {
      const page = (e.state?.page as Page) || "home"
      cleanupScrollState()
      setCurrentPage(page)
    }

    window.addEventListener("popstate", handlePop)
    return () => window.removeEventListener("popstate", handlePop)
  }, [])

  // Force scroll to 0 synchronously before children paint on every page change
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  // Single Lenis instance for ALL pages — recreated on every page change / home reset
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) =>
        Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.scrollTo(0, { immediate: true })

    lenis.on("scroll", ScrollTrigger.update)

    const update = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    // After Lenis is ready and children have mounted with their ScrollTriggers,
    // recalculate all pin positions and scroll heights
    const refreshId = requestAnimationFrame(() => {
      ScrollTrigger.refresh(true)
    })

    return () => {
      cancelAnimationFrame(refreshId)
      lenis.destroy()
      gsap.ticker.remove(update)
    }
  }, [currentPage, homeKey, pageKey])

  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} onHomeReset={handleHomeReset} />

      <main>
        {currentPage === "home" && (
          <div key={homeKey}>
            <Hero />
            <About />
            <Core />
            <Global_Footprint />
            <Partners />
            <CeoVision />
            <Contact onNavigate={handleNavigate} />
          </div>
        )}

        {currentPage === "about-us" && (
          <AboutUsPage key={pageKey} onNavigate={handleNavigate} />
        )}

        {currentPage === "services" && (
          <ServicesPage key={pageKey} onNavigate={handleNavigate} />
        )}

        {currentPage === "impact-innovation" && (
          <ImpactInnovationPage key={pageKey} onNavigate={handleNavigate} />
        )}

        {currentPage === "careers" && (
          <CareersPage key={pageKey} onNavigate={handleNavigate} />
        )}

        {currentPage === "social-initiatives" && (
          <SocialInitiativesPage key={pageKey} onNavigate={handleNavigate} />
        )}

        {currentPage === "join-us" && (
          <JoinUsPage key={pageKey} onNavigate={handleNavigate} />
        )}

        {currentPage === "updates" && (
          <UpdatesPage key={pageKey} onNavigate={handleNavigate} />
        )}

        {currentPage === "open-application" && (
          <OpenApplicationPage key={pageKey} onNavigate={handleNavigate} />
        )}

        {currentPage === "japan-portfolio" && (
          <JapanPortfolioPage key={pageKey} onNavigate={handleNavigate} />
        )}

        {currentPage === "contact-us" && (
          <ContactUsPage key={pageKey} onNavigate={handleNavigate} />
        )}

        {currentPage === "gx-training" && (
          <GxTrainingPage key={pageKey} onNavigate={handleNavigate} />
        )}

        {currentPage === "gx-brochure" && (
          <GxBrochurePage key={pageKey} onNavigate={handleNavigate} />
        )}
      </main>
    </div>
  )
}
