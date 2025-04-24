"use client"

import { useEffect, useRef } from "react"

export default function InterstellarBlackHole() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full width/height and handle high DPI screens
    const handleResize = () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window
      const height = Math.min(innerHeight, 800) // Cap the height for very tall screens

      canvas.width = innerWidth * devicePixelRatio
      canvas.height = height * devicePixelRatio
      canvas.style.width = `${innerWidth}px`
      canvas.style.height = `${height}px`

      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    // Create stars for the background
    const stars: Star[] = []
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: (Math.random() * canvas.width) / devicePixelRatio,
        y: (Math.random() * canvas.height) / devicePixelRatio,
        size: Math.random() * 1.5,
        opacity: Math.random() * 0.8 + 0.2,
      })
    }

    // Create particles for the swirling effect
    const particles: Particle[] = []
    const blackHoleRadius = (Math.min(canvas.width, canvas.height) * 0.06) / devicePixelRatio
    const blackHoleX = canvas.width / (2 * devicePixelRatio)
    const blackHoleY = canvas.height / (2 * devicePixelRatio)

    // Initialize particles in a spiral pattern
    const numParticles = 300
    for (let i = 0; i < numParticles; i++) {
      const angle = (i * (Math.PI * 12)) / numParticles
      const distance = (((i / numParticles) * canvas.width) / devicePixelRatio) * 0.4 + blackHoleRadius * 2

      particles.push({
        x: blackHoleX + Math.cos(angle) * distance,
        y: blackHoleY + Math.sin(angle) * distance,
        size: Math.random() * 1.5 + 0.5,
        speedFactor: Math.random() * 0.4 + 0.6, // Varied speed for more natural look
        angle,
        distance,
        alpha: Math.random() * 0.5 + 0.5,
        trail: [],
      })
    }

    let lastTime = 0
    // Animation function
    const animate = (timestamp: number) => {
      // Calculate delta time for smooth animation regardless of frame rate
      const deltaTime = timestamp - lastTime
      lastTime = timestamp
      const timeScale = deltaTime / 16.67 // Normalize to 60fps

      // Clear canvas with fade effect for trails
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)"
      ctx.fillRect(0, 0, canvas.width / devicePixelRatio, canvas.height / devicePixelRatio)

      // Draw stars
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * (0.5 + Math.sin(timestamp * 0.001) * 0.5)})`
        ctx.fill()
      })

      // Draw black hole
      const glow = ctx.createRadialGradient(
        blackHoleX,
        blackHoleY,
        blackHoleRadius * 0.1,
        blackHoleX,
        blackHoleY,
        blackHoleRadius * 2.5,
      )
      glow.addColorStop(0, "rgba(0, 0, 0, 1)")
      glow.addColorStop(0.4, "rgba(0, 0, 0, 1)")
      glow.addColorStop(0.5, "rgba(30, 30, 30, 0.3)")
      glow.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.beginPath()
      ctx.arc(blackHoleX, blackHoleY, blackHoleRadius * 2.5, 0, Math.PI * 2)
      ctx.fillStyle = glow
      ctx.fill()

      ctx.beginPath()
      ctx.arc(blackHoleX, blackHoleY, blackHoleRadius, 0, Math.PI * 2)
      ctx.fillStyle = "black"
      ctx.fill()

      // Draw accretion disk (subtle ring around black hole)
      ctx.beginPath()
      ctx.arc(blackHoleX, blackHoleY, blackHoleRadius * 1.2, 0, Math.PI * 2)
      const diskGradient = ctx.createRadialGradient(
        blackHoleX,
        blackHoleY,
        blackHoleRadius,
        blackHoleX,
        blackHoleY,
        blackHoleRadius * 1.5,
      )
      diskGradient.addColorStop(0, "rgba(255, 255, 255, 0.4)")
      diskGradient.addColorStop(1, "rgba(255, 255, 255, 0)")
      ctx.strokeStyle = diskGradient
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Update and draw particles
      particles.forEach((particle) => {
        // Store previous position for trail
        if (particle.trail.length > 5) {
          particle.trail.pop()
        }
        particle.trail.unshift({ x: particle.x, y: particle.y })

        // Calculate gravitational effect
        const dx = blackHoleX - particle.x
        const dy = blackHoleY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Slow orbital movement
        const baseSpeed = 0.0008 * timeScale * particle.speedFactor
        const orbitSpeed = (baseSpeed * (blackHoleRadius * 8)) / Math.max(distance, blackHoleRadius)

        // Update angle based on distance (closer = faster)
        particle.angle += orbitSpeed

        // Gradually decrease distance (spiral inward)
        const gravitationalPull = 0.02 * timeScale * (blackHoleRadius / Math.max(distance, blackHoleRadius))
        particle.distance = Math.max(particle.distance - gravitationalPull, blackHoleRadius * 1.1)

        // Update position
        particle.x = blackHoleX + Math.cos(particle.angle) * particle.distance
        particle.y = blackHoleY + Math.sin(particle.angle) * particle.distance

        // Reset particle if it gets too close to the black hole
        if (distance < blackHoleRadius * 1.1) {
          const newDistance =
            (Math.random() * canvas.width) / (3 * devicePixelRatio) + canvas.width / (6 * devicePixelRatio)
          const newAngle = Math.random() * Math.PI * 2

          particle.x = blackHoleX + Math.cos(newAngle) * newDistance
          particle.y = blackHoleY + Math.sin(newAngle) * newDistance
          particle.distance = newDistance
          particle.trail = []
        }

        // Draw particle trail
        if (particle.trail.length > 1) {
          ctx.beginPath()
          ctx.moveTo(particle.trail[0].x, particle.trail[0].y)

          for (let i = 1; i < particle.trail.length; i++) {
            ctx.lineTo(particle.trail[i].x, particle.trail[i].y)
          }

          // Calculate opacity based on distance
          const distanceFactor = Math.min(1, (distance - blackHoleRadius) / (blackHoleRadius * 5))
          const opacity = distanceFactor * particle.alpha * 0.8

          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
          ctx.lineWidth = particle.size
          ctx.stroke()
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size / 2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" style={{ background: "black" }} />
  )
}

// Type definitions
interface Particle {
  x: number
  y: number
  size: number
  speedFactor: number
  angle: number
  distance: number
  alpha: number
  trail: { x: number; y: number }[]
}

interface Star {
  x: number
  y: number
  size: number
  opacity: number
}
