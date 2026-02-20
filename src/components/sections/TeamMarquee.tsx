import { motion } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";
import Starry from "@/components/ui/Starry";

import koheiImg from "@/components/images/kohei yoshida.png";
import nickImg from "@/components/images/nick nakatani.png";
import rahulImg from "@/components/images/rahul rai.png";
import takakoImg from "@/components/images/takako1.png";
import reshuImg from "@/components/images/reshu bansal.png";
import prafulImg from "@/components/images/praful hambarde.png";
import makotoImg from "@/components/images/makoto oda.png";

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  image?: string;
}

// Deterministic gradient based on initials for consistent colors
const gradients = [
  "from-amber-500/40 to-amber-700/20",
  "from-amber-400/30 to-yellow-600/20",
  "from-amber-600/30 to-orange-500/20",
  "from-yellow-500/30 to-amber-600/20",
  "from-amber-500/25 to-amber-800/20",
  "from-orange-400/30 to-amber-500/20",
  "from-yellow-600/30 to-amber-400/20",
  "from-amber-300/30 to-amber-700/20",
];

function PersonCircle({ member, index }: { member: TeamMember; index: number }) {
  const gradient = gradients[index % gradients.length];

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-5 flex-shrink-0 w-28 sm:w-72 group">
      {/* Circle avatar */}
      <div
        className={`w-20 h-20 sm:w-44 sm:h-44 rounded-full ${member.image ? "" : `bg-gradient-to-br ${gradient}`} border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-amber-400/40 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.15)] overflow-hidden`}
      >
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <span className="text-3xl font-bold text-white/80 uppercase tracking-wider select-none">
            {member.initials}
          </span>
        )}
      </div>

      {/* Name tag */}
      <div className="text-center">
        <p className="text-[10px] sm:text-[13px] font-bold text-white/90 leading-tight">{member.name}</p>
        <p className="text-[8px] sm:text-[10px] text-amber-400/60 uppercase tracking-wider mt-0.5">{member.role}</p>
      </div>
    </div>
  );
}

function MarqueeRow({
  members,
  direction,
}: {
  members: TeamMember[];
  direction: "left" | "right";
}) {
  const doubled = [...members, ...members];
  const animClass = direction === "left" ? "animate-marquee" : "animate-marquee-reverse";

  return (
    <div className="overflow-hidden">
      <div className={`flex gap-4 sm:gap-20 w-max ${animClass} hover:[animation-play-state:paused]`}>
        {doubled.map((member, i) => (
          <PersonCircle key={`${member.initials}-${i}`} member={member} index={i % members.length} />
        ))}
      </div>
    </div>
  );
}

export default function TeamMarquee() {
  const { t } = useTranslation();

  const leadershipImages: Record<string, string | undefined> = {
    ky: koheiImg,
    nn: nickImg,
    rr: rahulImg,
    tf: takakoImg,
    rb: reshuImg,
  };

  const leadershipKeys = ["ky", "nn", "tm", "sm", "yy", "rr", "ym", "ks", "ka", "aa", "tf", "rb", "ky2", "mn", "mo", "tk", "km", "ni"];
  const leadershipTeam: TeamMember[] = leadershipKeys.map((key) => ({
    name: t(`teamSection.leadership.${key}.name`),
    role: t(`teamSection.leadership.${key}.role`),
    initials: t(`teamSection.leadership.${key}.initials`),
    image: leadershipImages[key],
  }));

  const mentorImages: Record<string, string | undefined> = {
    ph: prafulImg,
    mo2: makotoImg,
  };

  const mentorKeys = ["ph", "mo2", "ko", "ue", "ma"];
  const mentors: TeamMember[] = mentorKeys.map((key) => ({
    name: t(`teamSection.mentors.${key}.name`),
    role: t(`teamSection.mentors.${key}.role`),
    initials: t(`teamSection.mentors.${key}.initials`),
    image: mentorImages[key],
  }));

  return (
    <section className="relative w-full py-16 sm:py-28 overflow-hidden bg-[#050505]">

      {/* ⭐ Background Layer (same pattern as CeoVision) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Starry />
      </div>

      {/* Ambient glow (same z-layer as stars) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center"
      >
        <div
          style={{
            width: "60vw",
            height: "60vw",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(251,191,36,0.03) 0%, transparent 65%)",
          }}
        />
      </div>

      {/* Content Layer */}
      <div className="relative z-10">

        {/* Row 1: Leadership Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 sm:mb-20"
        >
          <div className="text-center mb-12">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.6em] mb-3 block">
              {t('teamSection.eyebrow')}
            </span>
            <h2 className="text-white text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <Trans
                i18nKey="teamSection.leadershipTitle"
                components={{
                  1: <span className="text-amber-400" />
                }}
              />
            </h2>
          </div>

          <MarqueeRow members={leadershipTeam} direction="left" />
        </motion.div>

        {/* Row 2: Mentors */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-white text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              <Trans
                i18nKey="teamSection.mentorsTitle"
                components={{
                  1: <span className="text-amber-400" />
                }}
              />
            </h2>
          </div>

          <MarqueeRow members={mentors} direction="right" />
        </motion.div>
      </div>
    </section>
  );
}
