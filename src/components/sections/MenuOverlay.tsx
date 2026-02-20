import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import MapTexture from "@/components/images/image 27.png";

const menuItemKeys = [
  "aboutusUpper",
  "servicesUpper",
  "careersUpper",
  "socialInitiativesUpper",
  "impactInnovationUpper",
  "japanPortfolioUpper",
];

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
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
      | "japan-portfolio"
  ) => void;
}

export default function MenuOverlay({
  isOpen,
  onClose,
  onNavigate,
}: MenuOverlayProps) {
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClick = (index: number) => {
    const pages = ["about-us", "services", "careers", "social-initiatives", "impact-innovation", "japan-portfolio"] as const;
    onNavigate(pages[index]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Layer 1: Dark gradient base */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-950 to-[#1a1200]" />

          {/* Layer 2: Earth-like radial glow */}
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: "-30%",
              right: "-10%",
              width: "70vw",
              height: "70vw",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 40% 40%, #D6BC97 0%, #b39a72 15%, #7a6845 30%, #4a3f28 50%, #1a1400 70%, transparent 85%)",
              opacity: 0.7,
            }}
          />

          {/* Layer 3: Map texture */}
          <img
            src={MapTexture}
            alt=""
            className="absolute pointer-events-none"
            style={{
              bottom: "-30%",
              right: "-10%",
              width: "70vw",
              height: "70vw",
              borderRadius: "50%",
              objectFit: "cover",
              opacity: 1,
            }}
          />

          {/* Layer 4: Glass blur */}
          <div className="absolute inset-0 backdrop-blur-xl" />

          {/* Layer 5: Content */}
          <div className="relative z-10 h-full flex flex-col px-6 sm:px-12 lg:px-20 pt-24 sm:pt-32">
            {/* Menu links */}
            <div className="flex-1 flex flex-col justify-center gap-5">
              {menuItemKeys.map((key, i) => (
                <motion.span
                  key={key}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + i * 0.08,
                    ease: "easeOut",
                  }}
                  className="text-white/90 text-xl sm:text-3xl lg:text-5xl font-bold tracking-tight hover:text-amber-400 transition-colors duration-300 w-fit cursor-pointer"
                  onClick={() => handleClick(i)}
                >
                  {t(`menu.${key}`)}
                </motion.span>
              ))}

              {/* Accent link */}
              <motion.a
                href="https://edify.jp/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ x: -40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + menuItemKeys.length * 0.08,
                  ease: "easeOut",
                }}
                className="text-[#4ade80] text-xl sm:text-3xl lg:text-5xl font-bold tracking-tight hover:text-[#86efac] transition-colors duration-300 w-fit cursor-pointer mt-2"
              >
                {t('menu.edify')}
              </motion.a>
            </div>

            {/* Footer */}
            <motion.div
              className="pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="w-full h-px bg-white/10 mb-6" />
              <div className="flex gap-8">
                <span className="text-white/70 text-sm font-medium hover:text-white transition-colors duration-300 cursor-default">
                  {t('socials.instagram')}
                </span>
                <span className="text-white/70 text-sm font-medium hover:text-white transition-colors duration-300 cursor-default">
                  {t('socials.linkedin')}
                </span>
                <span className="text-white/70 text-sm font-medium hover:text-white transition-colors duration-300 cursor-default">
                  {t('socials.twitter')}
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
