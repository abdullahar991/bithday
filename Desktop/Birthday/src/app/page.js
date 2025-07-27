"use client"
import React, { useState, useEffect, useRef } from 'react';

const BirthdayCelebration = () => {
  const [fireworks, setFireworks] = useState([]);
  const [confetti, setConfetti] = useState([]);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Firework class
    class Firework {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particles = [];
        this.hue = Math.random() * 360;

        for (let i = 0; i < 30; i++) {
          this.particles.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8,
            life: 100,
            decay: Math.random() * 2 + 1
          });
        }
      }

      update() {
        this.particles = this.particles.filter(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.vy += 0.1; // gravity
          particle.life -= particle.decay;
          return particle.life > 0;
        });

        return this.particles.length > 0;
      }

      draw(ctx) {
        this.particles.forEach(particle => {
          const alpha = particle.life / 100;
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = `hsl(${this.hue}, 100%, 50%)`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }
    }

    const fireworksArray = [];

    const createFirework = (x, y) => {
      fireworksArray.push(new Firework(x || Math.random() * canvas.width, y || Math.random() * canvas.height * 0.7));
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = fireworksArray.length - 1; i >= 0; i--) {
        const firework = fireworksArray[i];
        if (!firework.update()) {
          fireworksArray.splice(i, 1);
        } else {
          firework.draw(ctx);
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Auto fireworks
    const fireworkInterval = setInterval(() => {
      createFirework();
    }, 800);

    // Click handler
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      createFirework(x, y);
    };

    canvas.addEventListener('click', handleClick);

    return () => {
      clearInterval(fireworkInterval);
      cancelAnimationFrame(animationRef.current);
      canvas.removeEventListener('click', handleClick);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Canvas for fireworks */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-auto cursor-pointer"
      />

      {/* Stars background */}
      <div className="absolute inset-0 z-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen p-4 pointer-events-none">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 mb-8 text-center animate-pulse">
          🎉 Happy Birthday Sulayman! 🎉
        </h1>

        {/* Message */}
        <div className="max-w-4xl mx-auto mb-16 p-6 md:p-8 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl">
          <p className="text-lg md:text-2xl text-white text-center leading-relaxed font-medium">
            May Allah provide you all the happiness in the world and help you to achieve your dreams and goals 🤲✨
          </p>
        </div>

        {/* Beautiful 3D Birthday Cake */}
        <div className="relative mb-8 mt-20">
          <div className="cake-container animate-float">
            <div className="relative transform-gpu perspective-1000">
              {/* Candles (moved to top) */}
              <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="relative">
                    {/* Candle */}
                    <div
                      className="w-2.5 h-12 rounded-sm shadow-lg"
                      style={{
                        background: `linear-gradient(to bottom, ${['#fbbf24', '#ec4899', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][i]}, ${['#f59e0b', '#db2777', '#7c3aed', '#0891b2', '#059669', '#d97706', '#dc2626'][i]})`
                      }}
                    ></div>

                    {/* Flame */}
                    <div
                      className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-3 h-5 rounded-full animate-flicker"
                      style={{
                        background: 'radial-gradient(ellipse at center, #fbbf24 20%, #f59e0b 40%, #dc2626 70%)',
                        animationDelay: `${i * 0.15}s`,
                        animationDuration: '1s'
                      }}
                    ></div>

                    {/* Flame glow */}
                    <div
                      className="absolute -top-5 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full opacity-40 animate-pulse"
                      style={{
                        background: 'radial-gradient(circle, #fbbf24, transparent)',
                        animationDelay: `${i * 0.15}s`
                      }}
                    ></div>

                    {/* Wax drip */}
                    <div
                      className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-2 opacity-60 rounded-b-full"
                      style={{
                        background: ['#fbbf24', '#ec4899', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'][i]
                      }}
                    ></div>
                  </div>
                ))}
              </div>

              {/* Top Layer (smallest) */}
              <div className="relative">
                <div className="w-40 h-20 md:w-48 md:h-24 mx-auto bg-gradient-to-b from-yellow-100 via-yellow-50 to-yellow-200 rounded-2xl shadow-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-yellow-100 opacity-80"></div>
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-gradient-to-b from-white to-yellow-100 rounded-full"></div>
                  <div className="absolute top-3 left-4 w-2 h-3 bg-gradient-to-b from-orange-300 to-orange-400 rounded-full"></div>
                  <div className="absolute top-3 right-4 w-2 h-3 bg-gradient-to-b from-orange-300 to-orange-400 rounded-full"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-300 via-pink-400 to-pink-300 opacity-80"></div>
                </div>
              </div>

              {/* Middle Layer */}
              <div className="relative -mt-5">
                <div className="w-56 h-24 md:w-68 md:h-30 mx-auto bg-gradient-to-b from-purple-100 via-purple-50 to-purple-200 rounded-2xl shadow-xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 opacity-80"></div>
                  <div className="absolute top-2 left-6 w-3 h-6 bg-gradient-to-b from-white to-purple-100 rounded-full transform rotate-12"></div>
                  <div className="absolute top-2 right-6 w-3 h-6 bg-gradient-to-b from-white to-purple-100 rounded-full transform -rotate-12"></div>
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-8 bg-gradient-to-b from-white to-purple-100 rounded-full"></div>
                  <div className="absolute top-3 left-12 w-2 h-2 bg-blue-500 rounded-full shadow-sm"></div>
                  <div className="absolute top-5 left-10 w-2 h-2 bg-blue-600 rounded-full shadow-sm"></div>
                  <div className="absolute top-3 right-12 w-2 h-2 bg-blue-500 rounded-full shadow-sm"></div>
                  <div className="absolute top-5 right-10 w-2 h-2 bg-blue-600 rounded-full shadow-sm"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-green-300 via-green-400 to-green-300 opacity-80"></div>
                </div>
              </div>

              {/* Bottom Layer (largest) */}
              <div className="relative -mt-6">
                <div className="w-72 h-28 md:w-88 md:h-36 mx-auto bg-gradient-to-b from-pink-100 via-pink-50 to-pink-200 rounded-2xl shadow-2xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-pink-100 opacity-80"></div>
                  <div className="absolute -bottom-1 left-4 w-8 h-4 bg-gradient-to-b from-pink-200 to-pink-300 rounded-b-full"></div>
                  <div className="absolute -bottom-1 left-16 w-6 h-3 bg-gradient-to-b from-pink-200 to-pink-300 rounded-b-full"></div>
                  <div className="absolute -bottom-1 right-4 w-8 h-4 bg-gradient-to-b from-pink-200 to-pink-300 rounded-b-full"></div>
                  <div className="absolute -bottom-1 right-16 w-6 h-3 bg-gradient-to-b from-pink-200 to-pink-300 rounded-b-full"></div>
                  <div className="absolute top-3 left-8 w-4 h-4 bg-gradient-radial from-red-400 to-red-600 rounded-full shadow-md"></div>
                  <div className="absolute top-3 left-6 w-6 h-6 bg-gradient-radial from-red-300 to-red-500 rounded-full shadow-lg"></div>
                  <div className="absolute top-5 right-8 w-4 h-4 bg-gradient-radial from-red-400 to-red-600 rounded-full shadow-md"></div>
                  <div className="absolute top-5 right-6 w-6 h-6 bg-gradient-radial from-red-300 to-red-500 rounded-full shadow-lg"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-3 bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 opacity-80"></div>
                  <div className="absolute top-6 left-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-ping"></div>
                  <div className="absolute top-4 right-1/3 w-1 h-1 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute top-8 left-1/2 w-1 h-1 bg-yellow-300 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                </div>
              </div>

              {/* Plate */}
              <div className="w-80 h-6 md:w-96 md:h-8 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-full mx-auto shadow-2xl relative overflow-hidden -mt-2">
                <div className="absolute inset-0 bg-gradient-to-t from-gray-400 to-transparent opacity-50"></div>
                <div className="absolute top-1 left-1/4 w-2 h-1 bg-white opacity-60 rounded-full blur-sm"></div>
              </div>

              {/* Magical sparkles around cake */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-300 rounded-full animate-twinkle z-20"
                  style={{
                    left: `${15 + (i * 12)}%`,
                    top: `${40 + Math.sin(i) * 25}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: '2s'
                  }}
                ></div>
              ))}
            </div>

          </div>
        </div>

        {/* Interactive hint */}
        <p className="text-white/70 text-sm md:text-base text-center animate-bounce pointer-events-none">
          🎆 Click anywhere for more fireworks! 🎆
        </p>
      </div>

      {/* Floating confetti */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 animate-bounce pointer-events-none z-5"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: ['#fbbf24', '#f59e0b', '#dc2626', '#7c3aed', '#2563eb', '#059669'][Math.floor(Math.random() * 6)],
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}

      <style jsx>{`
        .cake-container {
          filter: drop-shadow(0 25px 50px rgba(0,0,0,0.4));
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotateY(0deg);
          }
          25% {
            transform: translateY(-5px) rotateY(1deg);
          }
          50% {
            transform: translateY(-8px) rotateY(0deg);
          }
          75% {
            transform: translateY(-5px) rotateY(-1deg);
          }
        }
        
        @keyframes flicker {
          0%, 100% {
            transform: translateX(-50%) scale(1) rotateZ(-2deg);
            opacity: 1;
          }
          25% {
            transform: translateX(-50%) scale(1.1) rotateZ(2deg);
            opacity: 0.9;
          }
          50% {
            transform: translateX(-50%) scale(0.95) rotateZ(-1deg);
            opacity: 1;
          }
          75% {
            transform: translateX(-50%) scale(1.05) rotateZ(1deg);
            opacity: 0.95;
          }
        }
        
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-flicker {
          animation: flicker 1s ease-in-out infinite;
        }
        
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BirthdayCelebration;