import SocialInitiatives from "@/components/sections/SocialInitiatives"

interface SocialInitiativesPageProps {
  onNavigate: (
    page:
      | "home"
      | "about-us"
      | "services"
      | "impact-innovation"
      | "careers"
      | "social-initiatives"
      | "join-us"
      | "updates"
  ) => void
}

export default function SocialInitiativesPage({
  onNavigate,
}: SocialInitiativesPageProps) {
  return (
    <div className="min-h-screen bg-[#050505]">
      <SocialInitiatives onNavigate={onNavigate} />
    </div>
  )
}
