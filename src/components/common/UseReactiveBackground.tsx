import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setupAudio, stopAudio } from "./AudioManager";

const useReactiveBackground = () => {
  const location = useLocation();
  const muted = useSelector((state: RootState) => state.audio.muted);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (location.pathname === "/" || muted) {
      stopAudio();
      return;
    }

    const { analyser } = setupAudio();
    if (!analyser) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const animate = () => {
      analyser.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      const intensity = Math.min(Math.max(avg / 256, 0.1), 1);

      const el = document.querySelector(".global-background") as HTMLElement;
      if (el) {
        el.style.background = `radial-gradient(circle at center, rgba(179, 0, 255, ${intensity}) 5%, #29003a 40%, #000 100%)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [location.pathname, muted]);
};

export default useReactiveBackground;
