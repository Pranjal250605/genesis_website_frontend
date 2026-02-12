import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Starry from "@/components/ui/Starry"; // Ensure this import is correct

interface ServiceCardData {
  number: string;
  title: string;
  desc: string;
  list: string[];
  footer: string;
}

const services: ServiceCardData[] = [
  {
    number: "01",
    title: "Product & Software / Hardware Sales",
    desc: "We connect innovative technology providers with high-potential markets through structured sales execution and strategic partnerships.",
    list: [
      "Enterprise SaaS & AI platforms",
      "Cybersecurity & cloud solutions",
      "Automation, IoT & emerging tech systems",
      "Industrial and specialized hardware",
    ],
    footer: "Market entry strategy · Channel development · Enterprise sales enablement · Revenue acceleration",
  },
  {
    number: "02",
    title: "Reskilling & Content Solutions",
    desc: "We design and distribute future-focused educational programs that prepare professionals and organizations for the evolving digital economy.",
    list: [
      "AI, Data & Cloud technologies",
      "Blockchain & Web3 fundamentals",
      "Cybersecurity & digital transformation",
      "Corporate training & certification tracks",
    ],
    footer: "Structured learning · Industry relevance · Scalable impact",
  },
  {
    number: "03",
    title: "Crypto & Blockchain Technology",
    desc: "We help organizations adopt decentralized technologies with clarity, security, and strategic alignment.",
    list: [
      "Blockchain strategy & advisory",
      "Smart contract & dApp support",
      "Tokenization frameworks",
      "Compliance-aware implementation",
    ],
    footer: "Secure · Scalable · Forward-looking",
  },
  {
    number: "04",
    title: "Tech Project Outsourcing",
    desc: "We deliver high-quality technical execution through dedicated teams in India serving international clients.",
    list: [
      "Custom software development",
      "Enterprise system architecture",
      "Embedded & hardware support",
      "Dedicated remote engineering teams",
    ],
    footer: "Transparent processes · Agile delivery · Global standards",
  },
];

function HolographicCard({ card, index }: { card: ServiceCardData; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 150,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
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
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{ 
          rotateX, 
          rotateY, 
          transformStyle: "preserve-3d",
          borderColor: isHovered ? "rgba(251,191,36,0.5)" : "rgba(255,255,255,0.1)",
          boxShadow: isHovered
            ? "0 0 40px rgba(251,191,36,0.12), 0 0 80px rgba(251,191,36,0.06), inset 0 0 60px rgba(251,191,36,0.03)"
            : "none",
        }}
        className="relative flex flex-col rounded-[28px] border bg-white/[0.02] backdrop-blur-xl overflow-hidden transition-[border-color,box-shadow] duration-500 h-full cursor-pointer"
      >
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-[28px] transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.08 : 0,
            background:
              "linear-gradient(105deg, transparent 30%, rgba(251,191,36,0.3) 45%, rgba(255,255,255,0.15) 50%, rgba(251,191,36,0.3) 55%, transparent 70%)",
          }}
        />

        <div
          className="relative z-20 flex flex-col h-full p-8 lg:p-10 transition-transform duration-500 ease-out"
          style={{ 
            transform: isHovered ? "translateZ(50px)" : "translateZ(0px)",
            transformStyle: "preserve-3d"
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-amber-400/60">{card.number}</span>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-400/30 to-transparent" />
          </div>

          <h3 className="text-[26px] lg:text-[30px] font-bold text-amber-400 leading-tight uppercase tracking-tight mb-5">
            {card.title}
          </h3>

          <p className="text-[15px] text-white/70 leading-relaxed mb-7">{card.desc}</p>

          <ul className="flex flex-col gap-3 mb-8 flex-1">
            {card.list.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/50" />
                <span className="text-[14px] text-white/70 leading-snug">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            <div className="h-px w-full bg-gradient-to-r from-white/10 via-amber-400/20 to-white/10 mb-5" />
            <p className="text-[12px] text-white/40 uppercase tracking-[0.15em] leading-relaxed">
              {card.footer}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  return (
    /* Changed bg-[#050505] to bg-transparent to allow Starry to show through */
    <section className="relative min-h-screen w-full bg-transparent overflow-hidden py-32">
      
      {/* Background Layer: Stars explicitly placed at z-0 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Starry />
      </div>

      {/* Ambient background glow (over the stars, under the text) */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          width: "80vw",
          height: "80vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(251,191,36,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-8 lg:px-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-[48px] lg:text-[72px] font-bold text-white uppercase tracking-tight leading-none mb-4">
            Our <span className="text-amber-400">Services</span>
          </h2>
          <p className="text-[18px] text-white/50 max-w-2xl leading-relaxed">
            Integrated solutions across technology, education, and innovation — designed for scale.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {services.map((card, i) => (
            <HolographicCard key={card.number} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}