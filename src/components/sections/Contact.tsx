import { useTranslation } from 'react-i18next';
import Starry from "@/components/ui/Starry";
import { ArrowUpRight } from "lucide-react";
import Logo from "@/components/images/logo.png"

interface ContactProps {
  onNavigate?: (page: "home" | "about-us" | "services" | "impact-innovation" | "careers" | "social-initiatives" | "join-us" | "updates" | "contact-us") => void;
}

export default function Contact({ onNavigate }: ContactProps = {}) {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen bg-[#050505] pt-24 sm:pt-32 pb-10 px-5 sm:px-6 lg:px-20 overflow-hidden flex flex-col">
      <Starry />

      {/* 1. CALL TO ACTION SECTION */}
      <div className="relative z-10 w-full max-w-6xl mx-auto text-center mb-16 sm:mb-32">
        <span className="text-amber-400 text-sm font-semibold uppercase tracking-[0.3em] mb-4 block font-['Montserrat']">
          {t('contactSection.eyebrow')}
        </span>
        <button
          onClick={() => onNavigate?.("contact-us")}
          className="group cursor-pointer relative w-full py-5 px-6 rounded-[73px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all overflow-hidden block"
        >
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-white text-2xl sm:text-4xl lg:text-6xl font-bold font-['Inter']">
              {t('contactSection.cta')}
            </h2>
            <ArrowUpRight className="text-white w-6 h-6 sm:w-10 sm:h-10 lg:w-14 lg:h-14 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </button>
      </div>

    <div className="relative z-10 w-full max-w-7xl mx-auto flex-1 flex flex-col">
       {/* 2. MAIN FOOTER LINKS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-12 sm:mb-20 border-t border-white/20 pt-10 sm:pt-16 justify-items-center">
          {/* COMPANY */}
          <div className="flex flex-col gap-6 w-fit items-start text-left">
            <h4 className="text-white text-sm font-bold tracking-widest font-['Montserrat']">
              {t('contactSection.company.title')}
            </h4>
            <ul className="flex flex-col gap-3 items-start">
              <li><button onClick={() => onNavigate?.("about-us")} className="text-white/60 text-sm hover:text-white transition-colors font-['Inter'] text-left">{t('contactSection.company.whoAreWe')}</button></li>
              <li><button onClick={() => onNavigate?.("about-us")} className="text-white/60 text-sm hover:text-white transition-colors font-['Inter'] text-left">{t('contactSection.company.governance')}</button></li>
              <li><button onClick={() => onNavigate?.("about-us")} className="text-white/60 text-sm hover:text-white transition-colors font-['Inter'] text-left">{t('contactSection.company.theTeam')}</button></li>
            </ul>
          </div>

          {/* COMMITMENT */}
          <div className="flex flex-col gap-6 w-fit items-start text-left">
            <h4 className="text-white text-sm font-bold tracking-widest font-['Montserrat']">
              {t('contactSection.commitment.title')}
            </h4>
            <ul className="flex flex-col gap-3 items-start">
              <li><button onClick={() => onNavigate?.("social-initiatives")} className="text-white/60 text-sm hover:text-white transition-colors font-['Inter'] text-left">{t('contactSection.commitment.positionNotes')}</button></li>
              <li><button onClick={() => onNavigate?.("services")} className="text-white/60 text-sm hover:text-white transition-colors font-['Inter'] text-left">{t('contactSection.commitment.areasIntervention')}</button></li>
              <li><button onClick={() => onNavigate?.("updates")} className="text-white/60 text-sm hover:text-white transition-colors font-['Inter'] text-left">{t('contactSection.commitment.newsroom')}</button></li>
            </ul>
          </div>

          {/* OUR MEMBERS */}
          <div className="flex flex-col gap-6 w-fit items-start text-left">
            <h4 className="text-white text-sm font-bold tracking-widest font-['Montserrat']">
              {t('contactSection.members.title')}
            </h4>
            <ul className="flex flex-col gap-3 items-start">
              <li><button onClick={() => onNavigate?.("about-us")} className="text-white/60 text-sm hover:text-white transition-colors font-['Inter'] text-left">{t('contactSection.members.ourMembers')}</button></li>
              <li><button onClick={() => onNavigate?.("about-us")} className="text-white/60 text-sm hover:text-white transition-colors font-['Inter'] text-left">{t('contactSection.members.associateMembers')}</button></li>
              <li><button onClick={() => onNavigate?.("join-us")} className="text-white/60 text-sm hover:text-white transition-colors font-['Inter'] text-left">{t('contactSection.members.join')}</button></li>
            </ul>
          </div>

          {/* FOLLOW US */}
          <div className="flex flex-col gap-6 w-fit items-start text-left">
            <h4 className="text-white text-sm font-bold tracking-widest font-['Montserrat']">
              {t('contactSection.followUs.title')}
            </h4>
            <ul className="flex flex-col gap-3 items-start">
              <li><a href="https://www.linkedin.com/company/genesis" target="_blank" rel="noopener noreferrer" className="text-white/60 text-sm hover:text-white transition-colors font-['Inter']">{t('contactSection.followUs.linkedin')}</a></li>
              <li><a href="https://x.com/genesis" target="_blank" rel="noopener noreferrer" className="text-white/60 text-sm hover:text-white transition-colors font-['Inter']">{t('contactSection.followUs.x')}</a></li>
              <li><a href="https://youtube.com/@genesis" target="_blank" rel="noopener noreferrer" className="text-white/60 text-sm hover:text-white transition-colors font-['Inter']">{t('contactSection.followUs.youtube')}</a></li>
            </ul>
          </div>
        </div>

        {/* 3. CONTACT & LOGO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pb-12 border-t border-white/20 pt-16 items-start">
          {/* Logo Placeholder */}
          <div className="flex items-center justify-start h-full">
            <div className="text-white text-5xl font-bold tracking-tighter italic">
               <img src={Logo} className="max-w-[200px] sm:max-w-none w-auto h-auto" />
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <h4 className="text-white text-lg font-bold font-['Montserrat']">{t('contactSection.contact.title')}</h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="flex flex-col gap-1">
                <p className="text-white/40 text-xs uppercase font-['Inter']">{t('contactSection.contact.phone')}</p>
                <p className="text-white/60 text-sm font-['Inter']">{t('contactSection.contact.phoneValue')}</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-white/40 text-xs uppercase font-['Inter']">{t('contactSection.contact.address')}</p>
                <p className="text-white/60 text-sm font-['Inter']">{t('contactSection.contact.addressValue')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM BAR */}
        <div className="mt-auto pt-8 border-t border-white/10 flex flex-wrap justify-center lg:justify-end gap-4 sm:gap-8">
          <a href="#" className="text-white/40 text-xs hover:text-white transition-colors">{t('contactSection.legal.privacy')}</a>
          <a href="#" className="text-white/40 text-xs hover:text-white transition-colors">{t('contactSection.legal.legal')}</a>
          <a href="#" className="text-white/40 text-xs hover:text-white transition-colors">{t('contactSection.legal.cookies')}</a>
          <p className="text-white/40 text-xs">{t('contactSection.legal.copyright')}</p>
        </div>
      </div>
    </div>
  );
}