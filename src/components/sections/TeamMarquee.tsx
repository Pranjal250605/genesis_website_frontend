import { motion } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";
import Starry from "@/components/ui/Starry";

interface TeamMember {
  name: string;
  role: string;
  initials: string;
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
    <div className="flex flex-col items-center gap-5 flex-shrink-0 w-72 group">
      {/* Circle avatar */}
      <div
        className={`w-80 h-80 rounded-full bg-gradient-to-br ${gradient} border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:border-amber-400/40 group-hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]`}
      >
        <span className="text-5xl font-bold text-white/80 uppercase tracking-wider select-none">
          {member.initials}
        </span>
      </div>

      {/* Name tag */}
      <div className="text-center">
        <p className="text-[13px] font-bold text-white/90 leading-tight">{member.name}</p>
        <p className="text-[10px] text-amber-400/60 uppercase tracking-wider mt-0.5">{member.role}</p>
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
      <div className={`flex gap-20 w-max ${animClass} hover:[animation-play-state:paused]`}>
        {doubled.map((member, i) => (
          <PersonCircle key={`${member.initials}-${i}`} member={member} index={i % members.length} />
        ))}
      </div>
    </div>
  );
}

export default function TeamMarquee() {
  const { t } = useTranslation();

  const leadershipTeam: TeamMember[] = [
    { name: t('teamSection.leadership.rm.name'), role: t('teamSection.leadership.rm.role'), initials: "RM" },
    { name: t('teamSection.leadership.at.name'), role: t('teamSection.leadership.at.role'), initials: "AT" },
    { name: t('teamSection.leadership.vs.name'), role: t('teamSection.leadership.vs.role'), initials: "VS" },
    { name: t('teamSection.leadership.sc.name'), role: t('teamSection.leadership.sc.role'), initials: "SC" },
    { name: t('teamSection.leadership.ad.name'), role: t('teamSection.leadership.ad.role'), initials: "AD" },
    { name: t('teamSection.leadership.yw.name'), role: t('teamSection.leadership.yw.role'), initials: "YW" },
    { name: t('teamSection.leadership.pk.name'), role: t('teamSection.leadership.pk.role'), initials: "PK" },
    { name: t('teamSection.leadership.ki.name'), role: t('teamSection.leadership.ki.role'), initials: "KI" },
  ];

  const mentors: TeamMember[] = [
    { name: t('teamSection.mentors.hn.name'), role: t('teamSection.mentors.hn.role'), initials: "HN" },
    { name: t('teamSection.mentors.as.name'), role: t('teamSection.mentors.as.role'), initials: "AS" },
    { name: t('teamSection.mentors.ev.name'), role: t('teamSection.mentors.ev.role'), initials: "EV" },
    { name: t('teamSection.mentors.tm.name'), role: t('teamSection.mentors.tm.role'), initials: "TM" },
    { name: t('teamSection.mentors.mp.name'), role: t('teamSection.mentors.mp.role'), initials: "MP" },
    { name: t('teamSection.mentors.dl.name'), role: t('teamSection.mentors.dl.role'), initials: "DL" },
    { name: t('teamSection.mentors.rk.name'), role: t('teamSection.mentors.rk.role'), initials: "RK" },
    { name: t('teamSection.mentors.sh.name'), role: t('teamSection.mentors.sh.role'), initials: "SH" },
  ];

  return (
    <section className="relative w-full py-28 overflow-hidden bg-[#050505]">

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
          className="mb-20"
        >
          <div className="text-center mb-12">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.6em] mb-3 block">
              {t('teamSection.eyebrow')}
            </span>
            <h2 className="text-white text-5xl lg:text-6xl font-bold tracking-tight">
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
            <h2 className="text-white text-5xl lg:text-6xl font-bold tracking-tight">
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
