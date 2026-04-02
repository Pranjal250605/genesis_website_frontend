import Services from "@/components/sections/Services"

interface ServicesPageProps {
  onNavigate: (page: "home" | "about-us" | "services" | "impact-innovation" | "careers" | "gx-training" | "gx-brochure" | "contact-us") => void
}

export default function ServicesPage({ onNavigate }: ServicesPageProps) {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Services onNavigate={onNavigate} />
    </div>
  )
}
