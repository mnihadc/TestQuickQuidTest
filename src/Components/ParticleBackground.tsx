import React, { useMemo } from "react";
import { motion } from "framer-motion";

const ParticleBackground: React.FC = () => {
  // Generate particles using deterministic algorithm or move to useEffect
  const particles = useMemo(() => {
    // Using a pseudo-random generator that's deterministic
    let seed = 12345;
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: pseudoRandom() * 100,
      top: pseudoRandom() * 100,
      duration: pseudoRandom() * 20 + 10,
    }));
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full"
          initial={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            x: 0,
            y: 0,
          }}
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear" as const,
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
