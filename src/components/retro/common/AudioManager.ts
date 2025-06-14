let audio: HTMLAudioElement | null = null;
let ctx: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let src: MediaElementAudioSourceNode | null = null;

export const setupAudio = () => {
  if (audio || ctx) return { audio, analyser }; 

  audio = new Audio("/sounds/retro-gaming.mp3");
  audio.loop = true;
  audio.volume = 0.5;

  ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  src = ctx.createMediaElementSource(audio);
  analyser = ctx.createAnalyser();
  analyser.fftSize = 256;

  src.connect(analyser);
  analyser.connect(ctx.destination);

  audio.play().catch(() => {});

  return { audio, analyser };
};

export const stopAudio = () => {
  if (audio) audio.pause();
  if (ctx) ctx.close();
  audio = null;
  ctx = null;
  analyser = null;
  src = null;
};
