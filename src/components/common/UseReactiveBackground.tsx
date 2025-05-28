import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setupAudio, stopAudio } from "./AudioManager";

const useReactiveBackground = () => {
  const location = useLocation();
  const muted = useSelector((state: RootState) => state.audio.muted);
  const frameRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let canvas = document.getElementById("oscilloscope-canvas") as HTMLCanvasElement | null;
    if (!canvas) {
      canvas = document.createElement("canvas");
      canvas.id = "oscilloscope-canvas";
      canvas.style.position = "absolute";
      canvas.style.top = "0";
      canvas.style.left = "0";
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = "2";
      const bg = document.querySelector(".global-background");
      if (bg) bg.appendChild(canvas);
    }
    canvasRef.current = canvas;

    if (location.pathname === "/" || muted) {
      stopAudio();
      if (canvas) canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    const { analyser } = setupAudio();
    if (!analyser) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const oscArray = new Uint8Array(analyser.fftSize);

    const animate = () => {
      analyser.getByteFrequencyData(dataArray);
      analyser.getByteTimeDomainData(oscArray);

      const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      const intensity = Math.min(Math.max(avg / 256, 0.1), 1);
      const el = document.querySelector(".global-background") as HTMLElement;
      if (el) {
        el.style.background = `radial-gradient(circle at center, rgba(179, 0, 255, ${intensity}) 5%, #29003a 40%, #000 100%)`;
      }

      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          const w = canvasRef.current.offsetWidth;
          const h = canvasRef.current.offsetHeight;
          canvasRef.current.width = w;
          canvasRef.current.height = h;

          ctx.clearRect(0, 0, w, h);
          ctx.save();
          ctx.beginPath();
          ctx.arc(w / 2, h / 2, Math.min(w, h) * 0.4, 0, 2 * Math.PI);
          ctx.clip();

          ctx.strokeStyle = "lime";
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let i = 0; i < oscArray.length; i++) {
            const x = (i / oscArray.length) * w;
            const y = h / 2 + ((oscArray[i] - 128) / 128) * (h * 0.18);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
          ctx.restore();
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    };
  }, [location.pathname, muted]);
};

export default useReactiveBackground;
