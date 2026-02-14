import Services from "@/components/sections/Services"

interface ServicesPageProps {
  onNavigate: (page: "home" | "about-us" | "services" | "impact-innovation" | "careers") => void
}

export default function ServicesPage({ onNavigate: _onNavigate }: ServicesPageProps) {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Services />
    </div>
  )
}
