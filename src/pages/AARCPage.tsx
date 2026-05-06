import AARC from '@/components/sections/AARC';

type Page =
  | "home" | "about-us" | "services" | "impact-innovation" | "careers"
  | "social-initiatives" | "join-us" | "updates" | "open-application"
  | "japan-portfolio" | "contact-us" | "gx-training" | "gx-brochure" | "aarc"

interface AARCPageProps {
  onNavigate: (page: Page) => void;
}

export default function AARCPage({ onNavigate: _onNavigate }: AARCPageProps) {
  return (
    <div className="min-h-screen bg-[#050505]">
      <AARC />
    </div>
  );
}
