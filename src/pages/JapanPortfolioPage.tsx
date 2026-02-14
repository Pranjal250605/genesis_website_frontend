import JapanPortfolio from "@/components/sections/JapanPortfolio"

interface JapanPortfolioPageProps {
  onNavigate: (page: "home" | "about-us" | "services" | "impact-innovation" | "careers" | "japan-portfolio") => void
}

export default function JapanPortfolioPage({ onNavigate: _onNavigate }: JapanPortfolioPageProps) {
  return (
    <div className="min-h-screen bg-[#050505]">
      <JapanPortfolio />
    </div>
  )
}
