import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const japanPortfolio = [
  {
    productName: "Smart Non-Contact Condition Monitoring System (BI-NCM)",
    brandOwner: "Simhatel Pvt. Ltd. and CAIR, IIT Mandi",
    channelPartner: "GENESIS Edify Group",
  },
  {
    productName: "adapID AI \u2013 Behavioral Biometrics Platform",
    brandOwner: "IIT Mandi (CAIR) & Industry Partners",
    channelPartner: "GENESIS Edify Group",
  },
  {
    productName: "DenseSight - AI Video Intelligence Platform",
    brandOwner: "Simhatel Pvt. Ltd.",
    channelPartner: "GENESIS Edify Group",
  },
  {
    productName: "HOMA 1.0 & 2.0 - Autonomous Aerial Firefighting Systems",
    brandOwner: "Simhatel Pvt. Ltd.",
    channelPartner: "GENESIS Edify Group",
  },
  {
    productName: "REAGVIS DeepTrust - AI Platform for Deepfake and Forgery Detection",
    brandOwner: "Reagvis Labs Pvt. Ltd.",
    channelPartner: "GENESIS Edify Group",
  },
  {
    productName: "Van Rakshak - AI-Powered Drone System",
    brandOwner: "Simhatel Pvt. Ltd.",
    channelPartner: "GENESIS Edify Group",
  },
  {
    productName: "Project Nayan - AI-AR Platform",
    brandOwner: "Simhatel Pvt. Ltd.",
    channelPartner: "GENESIS Edify Group",
  },
  {
    productName: "Immersive Bihar Heritage - AR/VR Restoration and Drone Telepresence",
    brandOwner: "Simhatel Pvt. Ltd.",
    channelPartner: "GENESIS Edify Group",
  },
];

export default function JapanPortfolio() {
  const { t } = useTranslation();

  // Generate stable random star positions once
  const stars = useMemo(
    () =>
      Array.from({ length: 80 }).map(() => ({
        w: Math.random() * 2 + 1,
        top: Math.random() * 100,
        left: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.1,
      })),
    []
  );

  return (
    <section className="relative overflow-hidden">
      {/* Starry background — fixed so it stays while scrolling */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[#050505]" />
        {stars.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${s.w}px`,
              height: `${s.w}px`,
              top: `${s.top}%`,
              left: `${s.left}%`,
              opacity: s.opacity,
            }}
          />
        ))}
        {/* Ambient glow */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80vw",
            height: "60vh",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(245,158,11,0.06) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-32 pb-24">
        {/* Hero heading */}
        <motion.div
          className="max-w-4xl mx-auto text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-transparent">
              {t("japanPortfolioSection.title")}
            </span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
            {t("japanPortfolioSection.subtitle")}
          </p>
        </motion.div>

        {/* Cards — stacked full-width rows */}
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          {japanPortfolio.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: 0.08 * (i % 3),
                ease: "easeOut",
              }}
              className="group bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[28px] overflow-hidden hover:border-amber-500/30 hover:bg-white/[0.05] transition-all duration-500 flex flex-col md:flex-row"
            >
              {/* Left — Info */}
              <div className="flex-1 p-7 md:p-9 flex flex-col justify-center">
                {/* Index badge */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-amber-400/80 text-xs font-mono tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                {/* Product name */}
                <h3 className="text-white font-semibold text-xl md:text-2xl leading-snug mb-5 group-hover:text-amber-100 transition-colors duration-300">
                  {project.productName}
                </h3>

                {/* Details */}
                <div className="space-y-3">
                  <div>
                    <span className="text-amber-400/60 text-xs font-medium uppercase tracking-wider">
                      {t("japanPortfolioSection.brandOwner")}
                    </span>
                    <p className="text-white/70 text-sm mt-1">
                      {project.brandOwner}
                    </p>
                  </div>
                  <div>
                    <span className="text-amber-400/60 text-xs font-medium uppercase tracking-wider">
                      {t("japanPortfolioSection.channelPartner")}
                    </span>
                    <p className="text-white/70 text-sm mt-1">
                      {project.channelPartner}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right — Image placeholder */}
              <div className="md:w-[45%] lg:w-[40%] min-h-[220px] md:min-h-[280px] bg-white/[0.02] border-t md:border-t-0 md:border-l border-white/5 flex items-center justify-center">
                <span className="text-white/20 text-sm font-mono tracking-wider">
                  {String(i + 1).padStart(2, "0")} / IMAGE
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
