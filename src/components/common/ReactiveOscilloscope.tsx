import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setupAudio, stopAudio } from "./AudioManager";
import { useLocation } from "react-router-dom";

const ReactiveOscilloscope = () => {
    const location = useLocation();
    const muted = useSelector((state: RootState) => state.audio.muted);
    const [points, setPoints] = useState<number[]>([]);
    const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
    const frameRef = useRef<number | null>(null);

    useEffect(() => {
        const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (location.pathname === "/" || muted) {
            stopAudio();
            setPoints([]);
            return;
        }

        const { analyser } = setupAudio();
        if (!analyser) return;

        const oscArray = new Uint8Array(analyser.fftSize);

        const animate = () => {
            analyser.getByteTimeDomainData(oscArray);

            const w = dimensions.width;
            const h = dimensions.height;
            const cx = w / 2;
            const cy = h / 2;
            const r = Math.min(w, h) * 0.4;

            // Trova l'offset dove la differenza tra due punti consecutivi (ciclo chiuso) è minima
            let minDiff = Infinity;
            let bestOffset = 0;
            for (let offset = 0; offset < oscArray.length; offset++) {
                const prev = oscArray[(offset - 1 + oscArray.length) % oscArray.length];
                const curr = oscArray[offset];
                const diff = Math.abs(curr - prev);
                if (diff < minDiff) {
                    minDiff = diff;
                    bestOffset = offset;
                }
            }

            // Genera i punti ruotando l'array per la chiusura più fluida
            const oscPoints: number[] = [];
            for (let i = 0; i < oscArray.length; i++) {
                const idx = (i + bestOffset) % oscArray.length;
                const angle = (i / oscArray.length) * Math.PI * 2;
                const value = (oscArray[idx] - 128) / 128;
                const radius = r + value * (r * 0.03);
                const x = cx + radius * Math.cos(angle);
                const y = cy + radius * Math.sin(angle);
                oscPoints.push(x, y);
            }

            // Chiudi il cerchio aggiungendo il primo punto alla fine
            if (oscPoints.length > 1) {
                oscPoints.push(oscPoints[0], oscPoints[1]);
            }
            setPoints(oscPoints);

            frameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (frameRef.current) cancelAnimationFrame(frameRef.current);
        };
    }, [location.pathname, muted, dimensions]);

    return (
        <Stage
            width={dimensions.width}
            height={dimensions.height}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                pointerEvents: "none", // così i click passano sotto
                zIndex: -1,
            }}
        >
            <Layer>
                <Line
                    points={points}
                    stroke="rgba(140, 10, 196, 0.7)"
                    strokeWidth={2}
                    closed
                />
            </Layer>
        </Stage>
    );
};

export default ReactiveOscilloscope;