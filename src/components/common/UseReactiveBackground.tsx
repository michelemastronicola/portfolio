import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setupAudio, stopAudio } from "./AudioManager";

const useReactiveRadialBackground = () => {
  const location = useLocation();
  const muted = useSelector((state: RootState) => state.audio.muted);

  useEffect(() => {
    const el = document.querySelector(".global-background") as HTMLElement;

    if (location.pathname === "/") {
      stopAudio();
      if (el) el.style.background = "";
      return;
    }

    if (muted) {
      stopAudio();
      if (el) {
        // Sfera viola statica
        el.style.background = `radial-gradient(circle at center, rgba(179, 0, 255, 0.7) 5%,rgb(41, 7, 56) 40%, #000 100%)`;
      }
      return;
    }

    const { analyser } = setupAudio();
    if (!analyser) return;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    let frameId: number;

    const animate = () => {
      analyser.getByteFrequencyData(dataArray);
      const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
      const intensity = Math.min(Math.max(avg / 256, 0.1), 1);
      if (el) {
        el.style.background = `radial-gradient(circle at center, rgba(179, 0, 255, ${intensity}) 5%, #29003a 40%, #000 100%)`;
      }
      frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [location.pathname, muted]);
};

export default useReactiveRadialBackground;