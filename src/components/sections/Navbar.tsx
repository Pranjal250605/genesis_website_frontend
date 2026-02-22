import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '@/components/images/logo.png';
import { Globe, Menu, X } from 'lucide-react';
import MenuOverlay from '@/components/sections/MenuOverlay';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: "home" | "about-us" | "services" | "impact-innovation" | "careers" | "social-initiatives" | "join-us" | "updates" | "japan-portfolio") => void;
  onHomeReset: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate, onHomeReset }) => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
    <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} onNavigate={(page) => { setMenuOpen(false); onNavigate(page); }} />
    <nav className="fixed top-4 left-0 right-0 z-[1000] flex justify-center px-2 sm:px-4">
      <div className="flex h-14 sm:h-20 w-full max-w-[1440px] items-center justify-between rounded-[24px] sm:rounded-[40px] border border-white/10 bg-zinc-950/20 px-4 sm:px-10 shadow-2xl backdrop-blur-xl">

        {/* Logo Section */}
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => {
          setMenuOpen(false);
          if (currentPage === "home") {
            onHomeReset();
          } else {
            onNavigate("home");
          }
        }}>
            <img
                src={Logo}
                alt="Main Logo"
                className="h-8 sm:h-12 w-auto object-contain"
            />

            <div className="hidden sm:block h-8 w-[2px] bg-amber-400/20" />

            <div className="hidden sm:flex flex-col justify-center">
                <span className="text-[12px] font-medium uppercase tracking-wider text-amber-400/80">
                {t('navbar.tagline')}
                </span>
                <span className="text-[10px] text-white/30 tracking-tight">
                {t('navbar.established')}
                </span>
            </div>
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center gap-3 sm:gap-6">

            {/* Language Selector — toggle disabled temporarily, EN translations preserved */}
            {/* <div
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ja' : 'en')}
            >
                <Globe
                    size={20}
                    className="text-white/50 group-hover:text-white transition-colors"
                    strokeWidth={1.5}
                />
                <span className="text-sm font-medium text-white/50 group-hover:text-white transition-colors">
                {i18n.language === 'en' ? 'JP' : 'EN'}
                </span>
            </div> */}

            <div className="hidden sm:block h-6 w-[2px] bg-white/10" />

            {/* JOIN US Button */}
            <button onClick={() => { setMenuOpen(false); onNavigate("join-us"); }} className="
                hidden sm:block
                px-5 py-2 rounded-full
                bg-white/5 backdrop-blur-md
                border border-white/20
                text-sm font-medium text-white/50
                uppercase tracking-wide
                transition-all duration-300
                hover:bg-white/20 hover:text-white
                active:scale-95 cursor-pointer
            ">
                {t('navbar.joinUs')}
            </button>

            {/* UPDATES Button */}
            <button onClick={() => { setMenuOpen(false); onNavigate("updates"); }} className="
                hidden sm:block
                px-5 py-2 rounded-full
                bg-white/5 backdrop-blur-md
                border border-white/20
                text-sm font-medium text-white/50
                uppercase tracking-wide
                transition-all duration-300
                hover:bg-white/20 hover:text-white
                active:scale-95 cursor-pointer
            ">
                {t('navbar.updates')}
            </button>

            <div className="hidden sm:block h-6 w-[2px] bg-white/10" />

            {/* MENU Button (Icon Only) */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center group cursor-pointer">
                {menuOpen ? (
                  <X
                    size={28}
                    className="text-amber-400 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110"
                    strokeWidth={2}
                  />
                ) : (
                  <Menu
                    size={28}
                    className="text-amber-400 transition-transform duration-300 group-hover:rotate-180 group-hover:scale-110"
                    strokeWidth={2}
                  />
                )}
            </button>

        </div>
      </div>
    </nav>
    </>
  );
};

export default Navbar;