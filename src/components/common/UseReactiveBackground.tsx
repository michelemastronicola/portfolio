import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../store/store";

const useReactiveBackground = () => {
    const location = useLocation();
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const ctxRef = useRef<AudioContext | null>(null);
    const frameRef = useRef<number | null>(null);
    const muted = useSelector((state: RootState) => state.audio.muted);

    useEffect(() => {
        if (location.pathname === "/" || muted) return;

        if (!audioRef.current) {
            audioRef.current = new Audio("/sounds/retro-gaming.mp3");
            audioRef.current.loop = true;
            audioRef.current.volume = 0.5;

            ctxRef.current = new ((window as any).AudioContext || (window as any).webkitAudioContext)();
            if (ctxRef.current) {
                const src = ctxRef.current.createMediaElementSource(audioRef.current);
                const analyser = ctxRef.current.createAnalyser();
                analyser.fftSize = 256;

                src.connect(analyser);
                analyser.connect(ctxRef.current.destination);
                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                const animate = () => {
                    analyser.getByteFrequencyData(dataArray);
                    const avg = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
                    const intensity = Math.min(Math.max(avg / 256, 0.1), 1);
                    const x = 50 + Math.sin(Date.now() / 400) * intensity * 20;
                    const y = 50 + Math.cos(Date.now() / 600) * intensity * 15;
                    const opacity = 0.6 + intensity * 0.4;

                    const el = document.querySelector(".global-background") as HTMLElement;
                    if (el) {
                        el.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(179, 0, 255, ${opacity}) 5%, #29003a 40%, #000 100%)`;
                    }
                    frameRef.current = requestAnimationFrame(animate);
                };

                audioRef.current.play().catch(() => { });
                animate();
            }
        }

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            if (ctxRef.current) {
                ctxRef.current.close();
                ctxRef.current = null;
            }
        };
    }, [location.pathname, muted]);
};

export default useReactiveBackground;
