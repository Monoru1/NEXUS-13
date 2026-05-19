let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function isEnabled(): boolean {
  try {
    return localStorage.getItem('nexus-13:audio-enabled') !== 'false';
  } catch {
    return false;
  }
}

function tone(
  freq: number,
  duration: number,
  gain: number,
  type: OscillatorType = 'sine',
  fadeOut = true,
) {
  if (!isEnabled()) return;
  const c = getCtx();
  if (!c) return;

  const osc = c.createOscillator();
  const gainNode = c.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(freq, c.currentTime);

  gainNode.gain.setValueAtTime(gain, c.currentTime);
  if (fadeOut) {
    gainNode.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
  }

  osc.connect(gainNode);
  gainNode.connect(c.destination);

  osc.start(c.currentTime);
  osc.stop(c.currentTime + duration);
}

export function playClick() {
  tone(880, 0.06, 0.04, 'square');
}

export function playDenied() {
  const c = getCtx();
  if (!c || !isEnabled()) return;
  tone(220, 0.15, 0.06, 'sawtooth');
  setTimeout(() => tone(180, 0.2, 0.05, 'sawtooth'), 80);
}

export function playSuccess() {
  const c = getCtx();
  if (!c || !isEnabled()) return;
  tone(440, 0.08, 0.04, 'sine');
  setTimeout(() => tone(660, 0.12, 0.04, 'sine'), 60);
  setTimeout(() => tone(880, 0.2, 0.035, 'sine'), 120);
}

export function playReveal() {
  tone(1200, 0.04, 0.03, 'square');
}

export function setAudioEnabled(enabled: boolean) {
  try {
    localStorage.setItem('nexus-13:audio-enabled', enabled ? 'true' : 'false');
  } catch {
    // ignore
  }
}

export function getAudioEnabled(): boolean {
  return isEnabled();
}
