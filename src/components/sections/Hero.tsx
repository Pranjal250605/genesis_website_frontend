import Vid from "@/components/images/JapanAsla.mp4"

function Hero() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 min-w-full min-h-full object-cover"
      >
        <source 
          src={Vid} 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent" />

      {/* 3. Centralized Content */}
      <div className="relative z-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold underline text-white decoration-sky-500 tracking-tight">
          Figma to Code: Ready!
        </h1>
        <p className="mt-4 text-white/60 font-medium uppercase tracking-widest text-sm">
          Technology Pioneers
        </p>
      </div>
    </div>
    
  )
}

export default Hero