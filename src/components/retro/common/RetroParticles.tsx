import React, { useEffect, useRef } from "react";

const RetroParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Array<{
      type: "glitch";
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      life: number;
      maxLife: number;
      color: string;
      flickerPhase: number;
    }> = [];

    const glitchEffects: Array<{
      type: "scanline" | "block" | "noise" | "displacement";
      x: number;
      y: number;
      width: number;
      height: number;
      life: number;
      maxLife: number;
      color: string;
      intensity: number;
    }> = [];

    const colors = ["#00ff88", "#ff0088", "#88ff00", "#8800ff"];

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;

      // calculate mouse speed
      const mouseSpeed = Math.sqrt(
        Math.pow(mouseX - lastMouseX, 2) + Math.pow(mouseY - lastMouseY, 2)
      );

      if (mouseSpeed > 2 && Math.random() < 0.3) {
        particles.push({
          x: mouseX + (Math.random() - 0.5) * 10,
          y: mouseY + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.floor(Math.random() * 3) + 3, 
          life: 30, 
          maxLife: 30,
          type: "glitch",
          color: colors[Math.floor(Math.random() * colors.length)],
          flickerPhase: Math.random() * Math.PI * 2,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // initial particles
    for (let i = 0; i < 15; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.floor(Math.random() * 2) + 1,
        life: Math.random() * 100 + 50,
        maxLife: 150,
        type: "glitch",
        color: colors[Math.floor(Math.random() * colors.length)],
        flickerPhase: Math.random() * Math.PI * 2,
      });
    }

    // Animation loop
    const animate = () => {
      // Clear with fast fade
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // random glitchs
      if (Math.random() < 0.015) {
        const glitchType = Math.random();

        if (glitchType < 0.3) {
          // scanline
          glitchEffects.push({
            type: "scanline",
            x: 0,
            y: Math.random() * canvas.height,
            width: canvas.width,
            height: Math.random() * 2 + 1,
            life: Math.random() * 10 + 5,
            maxLife: 15,
            color: colors[Math.floor(Math.random() * colors.length)],
            intensity: Math.random() * 0.3 + 0.1,
          });
        } else if (glitchType < 0.6) {
          // glitch block
          const blockSize = Math.random() * 40 + 20;
          glitchEffects.push({
            type: "block",
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            width: blockSize,
            height: blockSize * (Math.random() * 0.5 + 0.5),
            life: Math.random() * 20 + 10,
            maxLife: 30,
            color: colors[Math.floor(Math.random() * colors.length)],
            intensity: Math.random() * 0.2 + 0.1,
          });
        } else if (glitchType < 0.85) {
          // Noise pattern
          glitchEffects.push({
            type: "noise",
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            width: Math.random() * 80 + 40,
            height: Math.random() * 80 + 40,
            life: Math.random() * 15 + 5,
            maxLife: 20,
            color: colors[Math.floor(Math.random() * colors.length)],
            intensity: Math.random() * 0.15 + 0.05,
          });
        } else {
          // Displacement glitch
          glitchEffects.push({
            type: "displacement",
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            width: Math.random() * 200 + 50,
            height: 2,
            life: Math.random() * 8 + 4,
            maxLife: 12,
            color: colors[Math.floor(Math.random() * colors.length)],
            intensity: Math.random() * 10 + 5,
          });
        }
      }

      // paint glitch effects
      for (let i = glitchEffects.length - 1; i >= 0; i--) {
        const glitch = glitchEffects[i];
        glitch.life--;

        if (glitch.life <= 0) {
          glitchEffects.splice(i, 1);
          continue;
        }

        const alpha = (glitch.life / glitch.maxLife) * glitch.intensity;
        ctx.save();
        ctx.globalAlpha = alpha;

        switch (glitch.type) {
          case "scanline":
            ctx.fillStyle = glitch.color;
            ctx.fillRect(0, Math.floor(glitch.y), canvas.width, glitch.height);
            break;

          case "block":
            for (let j = 0; j < 3; j++) {
              ctx.globalAlpha = alpha * (0.3 - j * 0.1);
              ctx.fillStyle = glitch.color;
              ctx.fillRect(
                Math.floor(glitch.x + Math.random() * 4 - 2),
                Math.floor(glitch.y + (j * glitch.height) / 3),
                glitch.width,
                glitch.height / 3
              );
            }
            break;

          case "noise":
            const pixelSize = 4;
            for (let px = 0; px < glitch.width; px += pixelSize) {
              for (let py = 0; py < glitch.height; py += pixelSize) {
                if (Math.random() < 0.3) {
                  ctx.globalAlpha = alpha * Math.random();
                  ctx.fillStyle =
                    colors[Math.floor(Math.random() * colors.length)];
                  ctx.fillRect(
                    Math.floor(glitch.x + px),
                    Math.floor(glitch.y + py),
                    pixelSize,
                    pixelSize
                  );
                }
              }
            }
            break;

          case "displacement":
            ctx.fillStyle = glitch.color;
            for (let d = 0; d < 3; d++) {
              ctx.globalAlpha = alpha * (0.5 - d * 0.15);
              ctx.fillRect(
                Math.floor(glitch.x + Math.sin(d) * glitch.intensity),
                Math.floor(glitch.y + d),
                glitch.width,
                1
              );
            }
            break;
        }

        ctx.restore();
      }

      // Update and draw particles 
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Update position 
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        p.flickerPhase += 0.3;

        // random glitch
        if (Math.random() < 0.02) {
          p.x += (Math.random() - 0.5) * 4;
          p.y += (Math.random() - 0.5) * 4;
        }

        // Remove dead particles
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Draw particle
        const alpha = (p.life / p.maxLife) * 0.6;
        const flicker = Math.sin(p.flickerPhase) * 0.5 + 0.5;

        ctx.save();
        ctx.globalAlpha = alpha * flicker;

        // pixel squares
        ctx.fillStyle = p.color;
        ctx.fillRect(
          Math.floor(p.x - p.size / 2),
          Math.floor(p.y - p.size / 2),
          p.size,
          p.size
        );

        // occasional extra glitch
        if (Math.random() < 0.1) {
          ctx.globalAlpha = alpha * 0.3;
          ctx.fillRect(
            Math.floor(p.x - p.size / 2 + (Math.random() - 0.5) * 10),
            Math.floor(p.y - p.size / 2),
            p.size * 2,
            1
          );
        }

        ctx.restore();
      }

      // super rare extra particles
      if (Math.random() < 0.005 && particles.length < 30) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.floor(Math.random() * 2) + 1,
          life: 100,
          maxLife: 100,
          type: "glitch",
          color: colors[Math.floor(Math.random() * colors.length)],
          flickerPhase: Math.random() * Math.PI * 2,
        });
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 1,
        mixBlendMode: "screen",
        opacity: 0.7,
      }}
    />
  );
};

export default RetroParticles;
