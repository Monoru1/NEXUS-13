let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let running = false;
let oscillators: OscillatorNode[] = [];
let lfoOscillators: OscillatorNode[] = [] ;

function isEnabled(): boolean {
  try {
    return localStorage.getItem('nexus-13:audio-enabled') !== 'false';
  } catch {
    return false;
  }
}

export function startAmbient() {
  if (typeof window === 'undefined' || running || !isEnabled()) return;

  try {
    ctx = new AudioContext();
    if (ctx.state === 'suspended') ctx.resume();
  } catch {
    return;
  }

  masterGain = ctx.createGain();
  masterGain.gain.setValueAtTime(0, ctx.currentTime);
  masterGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 3);
  masterGain.connect(ctx.destination);

  // Drone: A1 (55 Hz), E2 (82.4 Hz), A2 (110 Hz)
  const drones = [55, 82.4, 110];
  oscillators = drones.map((freq, i) => {
    if (!ctx || !masterGain) return null as unknown as OscillatorNode;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.value = freq;

    lfo.type = 'sine';
    lfo.frequency.value = 0.07 + i * 0.03;
    lfoGain.gain.value = 1.5;

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    gain.gain.value = i === 0 ? 0.6 : i === 1 ? 0.3 : 0.2;

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start();
    lfo.start();
    lfoOscillators.push(lfo);

    return osc;
  }).filter(Boolean);

  running = true;
}

export function stopAmbient() {
  if (!running || !ctx || !masterGain) return;
  const now = ctx.currentTime;
  masterGain.gain.linearRampToValueAtTime(0, now + 2);
  setTimeout(() => {
    oscillators.forEach((o) => { try { o.stop(); } catch { /* already stopped */ } });
    lfoOscillators.forEach((o) => { try { o.stop(); } catch { /* already stopped */ } });
    oscillators = [];
    lfoOscillators = [];
    ctx?.close();
    ctx = null;
    masterGain = null;
    running = false;
  }, 2200);
}

export function isAmbientRunning(): boolean {
  return running;
}
