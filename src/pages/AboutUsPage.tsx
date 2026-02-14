import AboutUs from "@/components/sections/AboutUs"
import TeamMarquee from "@/components/sections/TeamMarquee"
import Global_Footprint from "@/components/sections/Global_Footprint"

interface AboutUsPageProps {
  onNavigate: (page: "home" | "about-us" | "services" | "impact-innovation" | "careers") => void
}

export default function AboutUsPage({ onNavigate: _onNavigate }: AboutUsPageProps) {
  return (
    <div className="min-h-screen bg-[#050505]">
      <AboutUs />
      <TeamMarquee />
      <Global_Footprint />
    </div>
  )
}
