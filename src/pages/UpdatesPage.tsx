import Updates from "@/components/sections/Updates"

interface UpdatesPageProps {
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

export default function UpdatesPage({ onNavigate: _onNavigate }: UpdatesPageProps) {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Updates />
    </div>
  )
}
