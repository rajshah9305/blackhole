# Black Hole Visualization

A Next.js project featuring an interactive black hole visualization with realistic physics simulation and particle effects.

## Overview

This project creates a visually stunning black hole animation using HTML5 Canvas and React. The simulation includes:

- Realistic gravitational effects
- Particle-based accretion disk
- Star field background
- Responsive design that works across devices

## Installation

To get started with this project, follow these steps:

```bash
# Clone the repository
git clone https://github.com/rajshah9305/blackhole.git
cd blackhole

# Install dependencies
npm install
# or
pnpm install
# or
yarn install

# Start the development server
npm run dev
# or
pnpm dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

The project is organized as follows:

- `/app` - Next.js app directory containing the main page and layout
- `/components` - React components including the black hole animations
- `/public` - Static assets
- `/styles` - Global CSS styles

## Key Components

### Black Hole Animation

The [`black-hole-animation.tsx`](/components/black-hole-animation.tsx) component creates a simple black hole effect with:

```typescript
// Animation function
const animate = () => {
  // Draw black hole
  ctx.beginPath()
  ctx.arc(blackHoleX, blackHoleY, blackHoleRadius, 0, Math.PI * 2)
  ctx.fillStyle = "black"
  ctx.fill()
  
  // Draw accretion disk (ring around black hole)
  // ...
  
  // Update and draw particles
  // ...
}
```

### Interstellar Black Hole

The [`interstellar-black-hole.tsx`](/components/interstellar-black-hole.tsx) component provides a more advanced visualization inspired by the movie "Interstellar", featuring:

- Realistic gravitational effects
- Particle trails that simulate the accretion disk
- Dynamic star field background
- Responsive canvas that adjusts to screen size

```typescript
// Calculate gravitational effect
const dx = blackHoleX - particle.x
const dy = blackHoleY - particle.y
const distance = Math.sqrt(dx * dx + dy * dy)

// Slow orbital movement
const baseSpeed = 0.0008 * timeScale * particle.speedFactor
const orbitSpeed = (baseSpeed * (blackHoleRadius * 8)) / Math.max(distance, blackHoleRadius)

// Update angle based on distance (closer = faster)
particle.angle += orbitSpeed
```

### Hero Section

The [`hero-section.tsx`](/components/hero-section.tsx) component integrates the black hole visualization with text content to create an engaging hero section for the website.

## Physics Simulation

The black hole simulation implements several key physics concepts:

1. **Gravitational Pull**: Particles are attracted to the center of the black hole with a force proportional to 1/r²
2. **Angular Momentum**: Particles maintain orbital motion around the black hole
3. **Accretion Disk**: Particles form a disk-like structure around the black hole
4. **Event Horizon**: Particles that cross the event horizon (get too close to the black hole) are "consumed"

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- HTML5 Canvas - For rendering the animation
- [Radix UI](https://www.radix-ui.com/) - Headless UI components

## Customization

You can customize the black hole visualization by modifying parameters in the respective component files:

- Adjust `blackHoleRadius` to change the size of the black hole
- Modify the number of particles by changing the loop count
- Adjust gravitational constants to change the behavior of particles
- Change colors and opacity values for different visual effects

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.