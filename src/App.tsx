import Hero from "@/components/sections/Hero"
import Navbar from "@/components/sections/Navbar"
import About from "./components/sections/About"
import Core from "@/components/sections/core"
import Global_Footprint from "@/components/sections/Global_Footprint"

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar />
      <Hero />
      <About />
      <Core />
      <Global_Footprint />
    </div>
  )
}

