import JoinUs from "@/components/sections/JoinUs"

interface JoinUsPageProps {
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
      | "open-application"
  ) => void
}

export default function JoinUsPage({ onNavigate }: JoinUsPageProps) {
  return (
    <div className="min-h-screen bg-[#050505]">
      <JoinUs onNavigate={onNavigate} />
    </div>
  )
}
