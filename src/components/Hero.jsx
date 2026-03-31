import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import MagneticElement from './MagneticElement';
import './Hero.css';

const Hero = () => {
  const [loading, setLoading] = useState(true);

  const loaderRef = useRef(null);
  const countRef = useRef(null);
  const progressLineRef = useRef(null);

  const nameTopRef = useRef(null);
  const nameBottomRef = useRef(null);
  const parallaxTopRef = useRef(null);
  const parallaxBottomRef = useRef(null);
  const vertAxisRef = useRef(null);
  const cvBtnRef = useRef(null);
  const annotationsRef = useRef([]);

  useEffect(() => {
    let assetsReady = false;
    let hasRevealed = false;
    const counter = { val: 0 };

    const el     = countRef.current;
    const line   = progressLineRef.current;
    if (!el || !line) return;

    // Phase 1: rapid climb 0 → 90 (takes ~1.8s)
    const phase1 = gsap.to(counter, {
      val: 90,
      duration: 1.8,
      ease: 'power1.inOut',
      onUpdate: () => {
        el.textContent = String(Math.floor(counter.val)).padStart(2, '0');
        gsap.set(line, { scaleX: counter.val / 100 });
      }
    });

    // Phase 2: crawl 90 → 99 while waiting for assets
    const phase2 = gsap.to(counter, {
      val: 99,
      duration: 3,
      ease: 'power0.none', // linear crawl
      paused: true,
      onUpdate: () => {
        el.textContent = String(Math.floor(counter.val)).padStart(2, '0');
        gsap.set(line, { scaleX: counter.val / 100 });
      }
    });

    phase1.then(() => phase2.play());

    const runReveal = () => {
      if (hasRevealed) return;
      hasRevealed = true;
      phase2.kill();

      // Slam to 100
      gsap.to(counter, {
        val: 100,
        duration: 0.3,
        ease: 'power3.out',
        onUpdate: () => {
          el.textContent = String(Math.floor(counter.val)).padStart(3, '0');
          gsap.set(line, { scaleX: counter.val / 100 });
        },
        onComplete: () => {
          // Loader slides up and out
          gsap.to(loaderRef.current, {
            yPercent: -100,
            duration: 0.9,
            ease: 'power4.inOut',
            delay: 0.15,
            onComplete: () => setLoading(false)
          });
        }
      });
    };

    const tryReveal = () => { if (assetsReady) runReveal(); };

    // Tie to real events
    const onLoad   = () => { assetsReady = true; tryReveal(); };
    const onBunny  = () => { assetsReady = true; tryReveal(); };
    window.addEventListener('load',        onLoad);
    window.addEventListener('bunnyLoaded', onBunny);

    // Fallback: never get stuck longer than 4s
    const fallback = setTimeout(() => { assetsReady = true; tryReveal(); }, 4000);

    // Also reveal once phase1 finishes if assets already loaded
    phase1.then(() => { if (assetsReady) runReveal(); });

    return () => {
      clearTimeout(fallback);
      window.removeEventListener('load',        onLoad);
      window.removeEventListener('bunnyLoaded', onBunny);
      phase1.kill(); phase2.kill();
    };
  }, []);

  // Parallax mousemove
  useEffect(() => {
    if (!parallaxTopRef.current || !parallaxBottomRef.current) return;
    const xToTop    = gsap.quickTo(parallaxTopRef.current,    'x', { duration: 1,   ease: 'power3.out' });
    const yToTop    = gsap.quickTo(parallaxTopRef.current,    'y', { duration: 1,   ease: 'power3.out' });
    const xToBottom = gsap.quickTo(parallaxBottomRef.current, 'x', { duration: 1.2, ease: 'power3.out' });
    const yToBottom = gsap.quickTo(parallaxBottomRef.current, 'y', { duration: 1.2, ease: 'power3.out' });

    const onMove = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      xToTop((x - cx) / cx * -20);   yToTop((y - cy) / cy * -10);
      xToBottom((x - cx) / cx * 30); yToBottom((y - cy) / cy * 15);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove',  onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove',  onMove);
    };
  }, []);

  return (
    <>
      <div
        className="hero-loader"
        ref={loaderRef}
        style={{ pointerEvents: loading ? 'auto' : 'none' }}
      >
        {/* Bottom-right counter */}
        <div className="loader-counter-wrap">
          <span className="loader-counter-num" ref={countRef}>00</span>
          <span className="loader-counter-pct">%</span>
        </div>

        {/* Bottom progress line */}
        <div className="loader-progress-track">
          <div className="loader-progress-line" ref={progressLineRef}></div>
        </div>
      </div>

      <section id="hero" className="hero-section">
        <div className="hero-vert-axis" ref={vertAxisRef}>
          <span>SOFTWARE ENGINEER • 2028 GRADUATE</span>
        </div>

        <div className="anno anno-tl" ref={el => annotationsRef.current[0] = el}>SEC.01 // LAT.49</div>
        <div className="anno anno-tr" ref={el => annotationsRef.current[1] = el}>SYS.READY []</div>
        <div className="anno anno-bl" ref={el => annotationsRef.current[2] = el}>VOL.99</div>
        <div className="anno anno-br" ref={el => annotationsRef.current[3] = el}>[X, Y, Z]</div>

        <div className="hero-typography">
          <div className="hero-attention-text mobile-extra-anim">
            <h3 className="attention-txt">
              <span className="diff-typo">MY</span> SITES SCREAM <span className="diff-typo">ATTENTION</span>
            </h3>
          </div>

          <div className="parallax-inner" ref={parallaxTopRef}>
            <div className="mask-wrapper">
              <h1 ref={nameTopRef} className="name-offset-right">NIKHIL</h1>
            </div>
          </div>
          <div className="parallax-inner" ref={parallaxBottomRef}>
            <div className="mask-wrapper">
              <h1 ref={nameBottomRef} className="name-offset-left">YADAV</h1>
            </div>
          </div>
          
          <div className="hero-action-block" ref={cvBtnRef}>
            <span className="action-tag desk-only" style={{ marginBottom: '1.5rem' }}>[ DOWNLOAD ]</span>
            <MagneticElement strength={1.2}>
              <a href="/Nikhil Yadav Resume.pdf" download="Nikhil Yadav Resume.pdf" className="hero-cv-btn hover-target">
                GET<br />RESUME<br />↓
              </a>
            </MagneticElement>
          </div>

          <div className="mobile-terminal-feed mobile-extra-anim">
           
            <p className="terminal-blink">&gt; SCROLL DOWN TO EXPLORE_</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
