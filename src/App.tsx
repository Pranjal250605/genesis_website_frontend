import Hero from "@/components/sections/Hero"
import Navbar from "@/components/sections/Navbar"
import About from "./components/sections/About"
import Core from "@/components/sections/core"

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Navbar />
      <Hero />
      <About />
      <Core />
    </div>
  )
}

