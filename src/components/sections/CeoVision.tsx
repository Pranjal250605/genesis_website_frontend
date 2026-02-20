import { useTranslation } from 'react-i18next';
import CeoImg from "@/components/images/ceo1.jpg";
import Starry from "@/components/ui/Starry";

export default function CeoVision() {
  const { t } = useTranslation();

  return (
    <section className="relative w-full bg-[#050505] py-16 sm:py-24 px-4 sm:px-6 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Starry />
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
        {/* Left Column — Text */}
        <div>
          {/* Eyebrow */}
          <span className="text-amber-400 text-xs font-bold uppercase tracking-[0.6em] mb-6 block">
            {t('ceoSection.eyebrow')}
          </span>

          {/* Headline + CEO Name row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-8 mb-8 sm:mb-10">
            <h2
              className="text-white text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
              dangerouslySetInnerHTML={{ __html: t('ceoSection.title') }}
            />
            <div className="shrink-0 text-left sm:text-right">
              <p className="text-white text-lg font-bold tracking-tight">
                {t('ceoSection.name')}
              </p>
              <p className="text-amber-400 text-xs font-bold uppercase tracking-widest">
                {t('ceoSection.role')}
              </p>
            </div>
          </div>

          {/* Quote */}
          <div className="relative">
            {/* Opening quote mark */}
            <span className="text-amber-400 text-5xl sm:text-8xl font-bold leading-none absolute -top-4 sm:-top-8 -left-1 sm:-left-2 select-none">
              &ldquo;
            </span>

            <p className="text-white/80 text-sm sm:text-base lg:text-lg leading-relaxed pl-6 sm:pl-10 pr-2 sm:pr-4">
              {t('ceoSection.quote')}
              {/* Closing quote mark */}
              <span className="text-amber-400 text-3xl font-bold leading-none ml-1 select-none">
                &rdquo;
              </span>
            </p>
          </div>
        </div>

        {/* Right Column — CEO Image */}
        <div className="flex justify-center lg:justify-end relative z-10">
          <div className="w-full max-w-md lg:max-w-lg overflow-hidden rounded-[20px] sm:rounded-[32px] border border-white/10 shadow-2xl bg-[#050505]">
            <img
              src={CeoImg}
              alt={t('ceoSection.altCeo')}
              className="w-full h-full object-cover opacity-100 block"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
