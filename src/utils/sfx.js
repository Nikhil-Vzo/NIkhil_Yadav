class UI_SFX {
  constructor() {
    this.audioCtx = null;
    // Don't initialize AudioContext immediately; wait for user interaction
  }

  init() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playBloop() {
    this.init();
    const ctx = this.audioCtx;
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Futuristic soft bloop
    osc.type = 'sine';
    
    // Quick frequency drop for "bloop" shape
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
    
    // Quick volume fade
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  }

  unlock = () => {
    try {
      this.init();
      // Play a silent oscillator to force the hardware to unlock the audio context completely
      const osc = this.audioCtx.createOscillator();
      const gainNode = this.audioCtx.createGain();
      gainNode.gain.value = 0; // Silent
      osc.connect(gainNode);
      gainNode.connect(this.audioCtx.destination);
      osc.start(0);
      osc.stop(this.audioCtx.currentTime + 0.01);
      
      this.unlocked = true;

      // Remove listeners once successfully unlocked
      window.removeEventListener('click', this.unlock);
      window.removeEventListener('touchstart', this.unlock);
      window.removeEventListener('keydown', this.unlock);
    } catch (e) {
      console.warn('Audio Context unlocking failed: ', e);
    }
  }

  setupUnlockListeners() {
    if (typeof window !== 'undefined') {
      window.addEventListener('click', this.unlock, { once: true });
      window.addEventListener('touchstart', this.unlock, { once: true });
      window.addEventListener('keydown', this.unlock, { once: true });
    }
  }

  playTypewriter() {
    this.init();
    const ctx = this.audioCtx;
    if (!ctx) return;

    // High frequency short static tick
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  }
}

// Automatically create and setup the utility singleton
const sfxInstance = new UI_SFX();
sfxInstance.setupUnlockListeners();
export const sfx = sfxInstance;
