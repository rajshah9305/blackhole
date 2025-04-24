import InterstellarBlackHole from "./interstellar-black-hole"

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      <InterstellarBlackHole />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">Beyond the Event Horizon</h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
          Where time bends and light surrenders to the infinite pull of gravity
        </p>
        <button className="px-8 py-3 bg-white text-black rounded-full text-lg font-medium hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105">
          Explore the Universe
        </button>
      </div>
    </section>
  )
}
