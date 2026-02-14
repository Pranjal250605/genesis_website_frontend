import ImpactInnovation from "@/components/sections/ImpactInnovation"
import SignatureEvent from "@/components/sections/SignatureEvent"

interface ImpactInnovationPageProps {
  onNavigate: (page: "home" | "about-us" | "services" | "impact-innovation" | "careers") => void
}

export default function ImpactInnovationPage({ onNavigate: _onNavigate }: ImpactInnovationPageProps) {
  return (
    <div className="min-h-screen bg-[#050505]">
      <ImpactInnovation />
      <SignatureEvent />
    </div>
  )
}
