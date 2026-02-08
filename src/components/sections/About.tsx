import Starry from "@/components/ui/Starry"

export default function About() {
    return (
        <div className="relative bg-[#050505] min-h-[500px] overflow-hidden">
            <div className="relative z-10 flex flex-col items-center justify-center py-200">
                <h1 className="text-white text-5xl font-bold font-['Montserrat']">About</h1>
                <div className="h-px w-24 bg-amber-400 mt-4" />
            </div>

            <Starry />
        </div>
    )
}