'use client';
import { useEffect, useState } from 'react';

const Background = () => {
  const [colorPhase, setColorPhase] = useState(0);

  useEffect(() => {
    // Much slower color animation for better performance
    const colorInterval = setInterval(() => {
      setColorPhase(prev => (prev + 2) % 360);
    }, 1000); // Much slower updates (1 second instead of 200ms)

    return () => {
      clearInterval(colorInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Simplified gradient background with reduced intensity */}
      <div 
        className="absolute inset-0 transition-all duration-2000 ease-linear"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, hsl(${240 + colorPhase}, 30%, 4%) 0%, transparent 80%),
            radial-gradient(circle at 80% 20%, hsl(${280 + colorPhase}, 35%, 3%) 0%, transparent 80%),
            linear-gradient(135deg, hsl(${220 + colorPhase}, 40%, 1%) 0%, hsl(${180 + colorPhase}, 50%, 0.5%) 100%)
          `
        }}
      />

      {/* Static elements with reduced opacity */}
      <div className="absolute inset-0 opacity-10">
        {/* Only 2 static orbs without animation */}
        {[...Array(2)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              background: `radial-gradient(circle, hsl(${200 + i * 90}, 40%, 20%) 0%, transparent 85%)`,
              width: `${180 + i * 120}px`,
              height: `${180 + i * 120}px`,
              filter: 'blur(80px)',
              left: `${30 + i * 40}%`,
              top: `${30 + i * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Very subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-3"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
        }}
      />
    </div>
  );
};

export default Background;
