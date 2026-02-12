import CeoImg from "@/components/images/ceo.jpg";
import Starry from "@/components/ui/Starry";

export default function CeoVision() {
  return (
    <section className="relative w-full bg-[#050505] py-24 px-6 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Starry />
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Column — Text */}
        <div>
          {/* Eyebrow */}
          <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.6em] mb-6 block">
            VISION FROM OUR CEO
          </span>

          {/* Headline + CEO Name row */}
          <div className="flex items-end justify-between gap-8 mb-10">
            <h2 className="text-white text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Pioneering the Future<br />of Technology
            </h2>
            <div className="shrink-0 text-right">
              <p className="text-white text-lg font-bold tracking-tight">
                Kohie Yoshida
              </p>
              <p className="text-amber-400 text-xs font-bold uppercase tracking-widest">
                CEO & Founder
              </p>
            </div>
          </div>

          {/* Quote */}
          <div className="relative">
            {/* Opening quote mark */}
            <span className="text-amber-400 text-8xl font-bold leading-none absolute -top-8 -left-2 select-none">
              &ldquo;
            </span>

            <p className="text-white/80 text-base lg:text-lg leading-relaxed pl-10 pr-4">
              At Genesis, we believe technology is not just a tool — it is the
              bridge between ambition and impact. Our mission has always been to
              empower businesses across the globe with forward-thinking solutions
              that drive real, measurable transformation. From Japan to India to
              the UAE, we are building a network of innovation that transcends
              borders. Every partnership we forge, every project we deliver, is a
              step toward a more connected and resilient future. The world is
              evolving faster than ever, and we are proud to be at the forefront
              — pioneering what comes next.
              {/* Closing quote mark */}
              <span className="text-amber-400 text-3xl font-bold leading-none ml-1 select-none">
                &rdquo;
              </span>
            </p>
          </div>
        </div>

        {/* Right Column — CEO Image */}
        <div className="flex justify-center lg:justify-end relative z-10">
          <div className="w-full max-w-md lg:max-w-lg overflow-hidden rounded-[32px] border border-white/10 shadow-2xl bg-[#050505]">
            <img
              src={CeoImg}
              alt="Kohie Yoshida — CEO & Founder"
              className="w-full h-full object-cover opacity-100 block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
