import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useIsMobile } from '@/lib/useIsMobile';

// ─── Data ────────────────────────────────────────────────────────────────────

interface Member {
  name: string;
  role: string;
  org: string;
}

interface Pillar {
  num: string;
  title: string;
  members: Member[];
}

const pillars: Pillar[] = [
  {
    num: '01',
    title: 'Leadership Office & Secretariat',
    members: [
      { name: 'Dr. Rahul Kumar Rai', role: 'Director & Consortium Lead', org: 'Edify Genesis Inc. Japan' },
      { name: 'Mrs. Fujiwara', role: 'Executive Liaison, Corporate Relations & Partnerships', org: 'Edify Genesis Inc. Japan' },
    ],
  },
  {
    num: '02',
    title: 'Partner Leadership Council',
    members: [
      { name: 'Dr. Sachin Chaudhary', role: 'Partner Representative', org: 'CEO, Reagvis Lab India' },
      { name: 'Dr. Durgesh Ametha', role: 'Partner Representative', org: 'CTO, Simheatel Pvt. Ltd. India' },
      { name: 'Dr. Durgesh Ametha', role: 'Partner Representative', org: 'CTO, Deep Algo India' },
    ],
  },
  {
    num: '03',
    title: 'Research & Strategic Advisory Council',
    members: [
      { name: 'Dr. Praful Hambarde', role: 'Academic Advisor', org: 'Asst. Professor, IIT Mandi' },
      { name: 'Shri Akshat Jain', role: 'Strategic Research Advisor', org: 'Scientist C, ADA-DRDO' },
      { name: 'Dr. Amit Shukla', role: 'Academic Advisor', org: 'Chairperson CAIR, IIT Mandi' },
      { name: 'Shri Devesh Kumar', role: 'Strategic Research Advisor', org: 'Senior Scientist E, ADA-DRDO' },
    ],
  },
];

// ─── Animated Background ─────────────────────────────────────────────────────

function TopographicBg() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
      {/* Topographic contour lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Flowing contour paths — top-left cluster */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <ellipse
            key={`tl-${i}`}
            cx="20%"
            cy="25%"
            rx={180 + i * 90}
            ry={120 + i * 60}
            fill="none"
            stroke="#1e3a8a"
            strokeWidth="0.5"
            opacity={0.06 - i * 0.007}
            transform={`rotate(-25 20 25)`}
          />
        ))}
        {/* Bottom-right cluster */}
        {[0, 1, 2, 3, 4].map((i) => (
          <ellipse
            key={`br-${i}`}
            cx="80%"
            cy="75%"
            rx={200 + i * 100}
            ry={140 + i * 70}
            fill="none"
            stroke="#1e3a8a"
            strokeWidth="0.5"
            opacity={0.05 - i * 0.007}
            transform={`rotate(15 80 75)`}
          />
        ))}
        {/* Center halo */}
        {[0, 1, 2].map((i) => (
          <circle
            key={`center-${i}`}
            cx="50%"
            cy="50%"
            r={300 + i * 150}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="0.4"
            opacity={0.035 - i * 0.008}
          />
        ))}
      </svg>

      {/* Subtle animated floating dots */}
      {[
        { x: '15%', y: '20%', delay: 0, size: 3 },
        { x: '85%', y: '15%', delay: 1.5, size: 2.5 },
        { x: '70%', y: '80%', delay: 3, size: 3.5 },
        { x: '25%', y: '75%', delay: 2, size: 2 },
        { x: '50%', y: '40%', delay: 4, size: 2.5 },
        { x: '90%', y: '50%', delay: 1, size: 2 },
        { x: '10%', y: '55%', delay: 3.5, size: 3 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-indigo-900/20"
          style={{ left: dot.x, top: dot.y, width: dot.size, height: dot.size }}
          animate={{
            y: [0, -15, 0, 10, 0],
            opacity: [0.3, 0.6, 0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: dot.delay,
          }}
        />
      ))}

      {/* Very subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(30,58,138,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(30,58,138,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}


// ─── Glassmorphic Pillar Card with 3D Tilt ───────────────────────────────────

function PillarCard({ num, title, members, index, isMobile }: Pillar & { index: number; isMobile: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: index % 2 === 0 ? -20 : 20, rotateY: index % 2 === 0 ? -3 : 3 }}
      whileInView={{ opacity: 1, y: 0, x: 0, rotateY: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={isMobile ? undefined : { perspective: 800 }}
      className="flex-1 min-w-[260px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={isMobile ? undefined : handleMouseMove}
        onMouseEnter={isMobile ? undefined : () => setIsHovered(true)}
        onMouseLeave={isMobile ? undefined : handleMouseLeave}
        style={isMobile ? undefined : {
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className={`
          relative flex flex-col rounded-[20px] sm:rounded-[28px]
          bg-white/60 backdrop-blur-xl
          border transition-all duration-500
          shadow-lg p-6 sm:p-8 gap-4 group cursor-default h-full overflow-hidden
          ${isHovered
            ? 'border-amber-400/40 shadow-[0_8px_40px_rgba(251,191,36,0.12),0_0_60px_rgba(30,58,138,0.06)]'
            : 'border-slate-200/60 shadow-[0_4px_24px_rgba(15,23,42,0.06)]'
          }
        `}
      >
        {/* Holographic sheen on hover */}
        {!isMobile && (
          <div
            className="pointer-events-none absolute inset-0 z-10 rounded-[28px] transition-opacity duration-500"
            style={{
              opacity: isHovered ? 0.06 : 0,
              background:
                'linear-gradient(105deg, transparent 30%, rgba(30,58,138,0.25) 45%, rgba(255,255,255,0.2) 50%, rgba(251,191,36,0.2) 55%, transparent 70%)',
            }}
          />
        )}

        {/* Content */}
        <div
          className="relative z-20 flex flex-col h-full transition-transform duration-500 ease-out"
          style={isMobile ? undefined : {
            transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Number badge */}
          <div className="flex items-center gap-3 mb-3">
            <motion.span
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-indigo-900/5 border border-indigo-900/10 text-[11px] font-bold tracking-[0.2em] text-indigo-900/50"
              animate={!isMobile ? {
                scale: [1, 1.04, 1],
                opacity: [0.7, 1, 0.7],
              } : undefined}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.8,
              }}
            >
              {num}
            </motion.span>
            <div className="flex-1 h-px bg-gradient-to-r from-indigo-900/15 via-amber-400/20 to-transparent" />
          </div>

          {/* Title */}
          <h4 className="text-[12px] sm:text-[14px] font-bold text-indigo-950 leading-snug group-hover:text-indigo-800 transition-colors duration-300 uppercase tracking-wide">
            {title}
          </h4>

          {/* Divider with amber accent */}
          <div className="relative h-px w-10 my-3 group-hover:w-full transition-all duration-700 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 via-amber-400/40 to-indigo-900/10" />
          </div>

          {/* Members list */}
          <div className="flex flex-col gap-4 flex-1">
            {members.map((m, mi) => (
              <div key={mi} className="flex flex-col gap-0.5">
                <p className="text-[13px] sm:text-[14px] font-semibold text-indigo-950/80">{m.name}</p>
                <p className="text-[11px] sm:text-[12px] font-medium text-amber-600/70">{m.role}</p>
                <p className="text-[11px] sm:text-[12px] text-slate-400 italic">{m.org}</p>
              </div>
            ))}
          </div>

          {/* Bottom amber accent line on hover */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Connecting Line Between Pillars ──────────────────────────────────────────

function PillarConnector() {
  return (
    <div className="hidden sm:flex items-center justify-center shrink-0 px-1">
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-0 origin-left"
      >
        <div className="w-6 lg:w-10 h-px bg-gradient-to-r from-indigo-900/20 to-amber-400/30" />
        <div className="w-2 h-2 rounded-full bg-amber-400/50 border border-amber-400/30 shrink-0" />
        <div className="w-6 lg:w-10 h-px bg-gradient-to-r from-amber-400/30 to-indigo-900/20" />
      </motion.div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

const AARC = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative w-full bg-[#f7f8fc] overflow-hidden">
      <TopographicBg />

      {/* ── Cinematic top edge blend from dark site ── */}
      <div className="absolute top-0 left-0 w-full h-32 sm:h-40 bg-gradient-to-b from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-20" />

      <div className="relative z-10 py-28 sm:py-32 lg:py-40 px-5 sm:px-10 lg:px-24">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-10 lg:gap-14">

          {/* ── AARC Hero — Globe + Title + Map ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-3 sm:gap-4"
          >
            {/* Globe + AARC + Map row */}
            <div className="flex items-center justify-center gap-0">
              {/* Globe icon */}
              <motion.svg
                initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1, type: 'spring', stiffness: 150, damping: 15 }}
                viewBox="0 0 100 100"
                className="w-[45px] h-[45px] sm:w-[75px] sm:h-[75px] lg:w-[110px] lg:h-[110px] shrink-0"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="50" cy="50" r="44" stroke="#7f7f7f" strokeWidth="3" />
                <ellipse cx="50" cy="50" rx="22" ry="44" stroke="#7f7f7f" strokeWidth="2.5" />
                <line x1="6" y1="50" x2="94" y2="50" stroke="#7f7f7f" strokeWidth="2.5" />
                <ellipse cx="50" cy="30" rx="36" ry="8" stroke="#7f7f7f" strokeWidth="2" />
                <ellipse cx="50" cy="70" rx="36" ry="8" stroke="#7f7f7f" strokeWidth="2" />
                <line x1="50" y1="6" x2="50" y2="94" stroke="#7f7f7f" strokeWidth="2.5" />
              </motion.svg>

              {/* AARC text */}
              <div className="overflow-hidden shrink-0">
                <motion.h2
                  initial={{ y: '100%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="text-[56px] sm:text-[96px] lg:text-[130px] xl:text-[150px] font-bold tracking-[-0.03em] leading-none select-none"
                  style={{ fontFamily: "'ITC Busorama Std', 'Busorama', sans-serif", color: '#7f7f7f' }}
                >
                  AARC
                </motion.h2>
              </div>

              {/* Map image — side by side */}
              <motion.img
                src="/aarclogo.png"
                alt="India-Japan Map"
                initial={{ opacity: 0, x: 30, scale: 0.8 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="w-[70px] sm:w-[120px] lg:w-[170px] xl:w-[200px] h-auto object-contain shrink-0 -ml-2 sm:-ml-4 lg:-ml-6"
              />
            </div>

            {/* Subtitles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-center flex flex-col gap-1"
            >
              <p className="text-[16px] sm:text-[22px] lg:text-[28px] font-bold text-gray-600 tracking-tight leading-snug">
                Applied AI Research Consortium
              </p>
              <p className="text-[14px] sm:text-[18px] lg:text-[24px] font-bold text-gray-500 tracking-tight leading-snug">
                応用AI研究コンソーシアム
              </p>
            </motion.div>
          </motion.div>

          {/* ── About Section ── */}
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="text-center max-w-3xl flex flex-col items-center gap-4"
          >
            <h3 className="text-[22px] lg:text-[28px] font-bold text-indigo-950 leading-snug uppercase tracking-tight">
              概要
            </h3>

            {/* Divider with amber center */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-24 sm:w-32 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent origin-center"
            />

            <p className="text-[15px] lg:text-[17px] text-slate-600 leading-relaxed">
              AARC（Applied AI Research Consortium）は、産界・学術界・戦略研究分野の知見を結集し、共通のイノベーション基盤のもとで新たな価値創出を目指す、国際連携型の協働プラットフォームです。Edify Genesis Inc. Japanの主導により設立されたAARCは、組織と専門家の有機的な連携を促進し、有望なアイデア、製品、技術イニシアチブを、より深い洞察、より広い連携、そして実践的な方向性によってさらに発展させることを目的としています。
            </p>
            <p className="text-[13px] lg:text-[14px] text-slate-500 leading-relaxed">
              またAARCは、インド、日本、そしてより広い国際的エコシステムの間に、双方向のイノベーション導線を構築することを目指しています。これにより、インドで創出されたイノベーションを日本およびグローバル市場へより効果的に展開できると同時に、日本その他の国際的な環境から生まれるソリューションや取り組みについても、インド市場における連携、導入、展開の機会に向けて、適切に適応・位置づけ・支援することが可能となります。
            </p>
            <p className="text-[13px] lg:text-[14px] text-slate-400 leading-relaxed">
              AARCは、能力、ビジョン、そして信頼に基づく協働が一つの基盤の上で結びつくとき、より強いイノベーションが生まれるという考えのもとに運営されています。この枠組みにおいて、参加組織はそれぞれの製品としての独自性と所有権を維持しながら、共同の専門知見、国際的な市場接点、そして協創によるイノベーションの価値を享受します。
            </p>
          </motion.div>

          {/* ── Mission Statement / Pull Quote ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative max-w-2xl w-full rounded-2xl bg-white/50 backdrop-blur-xl border border-slate-200/40 shadow-lg px-8 py-8 sm:px-10 sm:py-10 overflow-hidden"
          >
            {/* Amber accent bar — left */}
            <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-amber-400/80 via-amber-400/40 to-transparent" />

            <div className="pl-4 sm:pl-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-amber-500/70 mb-3">
                ミッション
              </p>
              <p className="text-[17px] sm:text-[20px] lg:text-[22px] font-medium text-indigo-950/80 leading-relaxed italic">
                「インドと日本の間に、応用AIイノベーションの持続可能な架け橋を構築し、
                国際的な研究連携、産業協力、そして戦略的な知識交流を促進する。」
              </p>
            </div>

            {/* Subtle corner decoration */}
            <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-amber-400/20 rounded-tr-lg" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-amber-400/20 rounded-bl-lg" />
          </motion.div>

          {/* ── Governing Structure Label ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4 mt-4"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-8 sm:w-12 h-px bg-gradient-to-r from-amber-400/50 to-transparent origin-left"
            />
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.5em] text-amber-500/70">
              ガバナンス体制
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="w-8 sm:w-12 h-px bg-gradient-to-l from-amber-400/50 to-transparent origin-right"
            />
          </motion.div>

          {/* ── Governing Structure Description ── */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-center max-w-3xl text-[13px] lg:text-[14px] text-slate-500 leading-relaxed"
          >
            AARCは、統括的なリーダーシップ、パートナー間の連携、そして専門的助言を支える三層構造のガバナンス体制を採用しています。この形式は、主幹コーディネーターが事務局を通じて活動し、運営委員会（パートナー機関）および諮問委員会によって支えられるという、国際コンソーシアムにおける一般的な運営慣行に準拠しています。
          </motion.p>

          {/* ── Pillar Cards with Connectors ── */}
          <div className="flex flex-col sm:flex-row items-stretch w-full gap-5 sm:gap-0">
            {pillars.map((p, i) => (
              <div key={p.num} className="flex flex-col sm:flex-row items-stretch flex-1">
                <PillarCard {...p} index={i} isMobile={isMobile} />
                {i < pillars.length - 1 && <PillarConnector />}
              </div>
            ))}
          </div>

          {/* ── Bottom CTA / Transition Element ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col items-center gap-5 mt-6"
          >

          </motion.div>

        </div>
      </div>

      {/* ── Cinematic bottom edge blend back to dark ── */}
      <div className="absolute bottom-0 left-0 w-full h-32 sm:h-40 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default AARC;
