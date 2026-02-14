import Careers from "@/components/sections/Careers"

interface CareersPageProps {
  onNavigate: (page: "home" | "about-us" | "services" | "impact-innovation" | "careers" | "social-initiatives" | "join-us" | "updates") => void
}

export default function CareersPage({ onNavigate }: CareersPageProps) {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Careers onNavigate={onNavigate} />
    </div>
  )
}
