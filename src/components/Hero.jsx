import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import MagneticElement from './MagneticElement';
import './Hero.css';

const Hero = () => {
  const [loading, setLoading] = useState(true);

  const loaderRef = useRef(null);
  const lampRef = useRef(null);
  const targetIRef = useRef(null);
  const loaderContentRef = useRef(null);

  const nameTopRef = useRef(null);
  const nameBottomRef = useRef(null);
  const parallaxTopRef = useRef(null);
  const parallaxBottomRef = useRef(null);
  const vertAxisRef = useRef(null);
  const cvBtnRef = useRef(null);
  const annotationsRef = useRef([]);

  useEffect(() => {
    let isBunnyLoaded = false;
    let isWindowLoaded = document.readyState === 'complete';
    let hasRevealed = false;
    let sequenceFinished = false;

    const lamp = lampRef.current;
    const targetI = targetIRef.current;
    const content = loaderContentRef.current;
    if (!lamp || !targetI || !content) return;

    // Wait one frame for fonts + layout to settle, then compute pixel-perfect positions
    requestAnimationFrame(() => {
      const iRect = targetI.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();
      const lampH = lamp.offsetHeight;
      const lampW = lamp.offsetWidth;

      // Target position: directly above the 'I', aligned at its center
      const targetX = iRect.left + iRect.width / 2 - contentRect.left - lampW / 2;
      const targetY = iRect.top - contentRect.top - lampH * 0.85;

      // Hop waypoints spread from far left to the I
      const hopSpacing = lampW * 2.5;
      const positions = [
        { x: targetX - hopSpacing * 3, y: targetY },  // entry
        { x: targetX - hopSpacing * 2, y: targetY },  // hop1 land
        { x: targetX - hopSpacing * 1, y: targetY },  // hop2 land
        { x: targetX, y: targetY },                     // final (on the I)
      ];

      // Hide lamp initially
      gsap.set(lamp, { x: positions[0].x - 80, y: positions[0].y - 250, rotation: -30, opacity: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          sequenceFinished = true;
          tryFinishLoad();
        }
      });

      // Appear + bounce land at position 0
      tl.to(lamp, { opacity: 1, duration: 0.01 })
        .to(lamp, { x: positions[0].x, y: positions[0].y, rotation: 5, ease: 'bounce.out', duration: 0.6 })
        
        // Hop 1: arc up then land
        .to(lamp, { x: (positions[0].x + positions[1].x) / 2, y: positions[0].y - 60, rotation: -8, ease: 'power2.out', duration: 0.2 })
        .to(lamp, { x: positions[1].x, y: positions[1].y, rotation: 5, ease: 'power2.in', duration: 0.18 })
        
        // Hop 2: arc up then land
        .to(lamp, { x: (positions[1].x + positions[2].x) / 2, y: positions[1].y - 70, rotation: -5, ease: 'power2.out', duration: 0.2 })
        .to(lamp, { x: positions[2].x, y: positions[2].y, rotation: 3, ease: 'power2.in', duration: 0.18 })
        
        // THE BIG JUMP: massive arc, head tilts forward aggressively
        .to(lamp, { x: (positions[2].x + positions[3].x) / 2, y: positions[2].y - 180, rotation: 25, scale: 1.15, ease: 'power3.out', duration: 0.35 })
        
        // SLAM DOWN onto the I
        .to(lamp, { x: positions[3].x, y: positions[3].y + 15, rotation: 0, scale: 1, ease: 'power4.in', duration: 0.25 })
        
        // IMPACT: squash the I and compress the lamp
        .add('impact')
        .to(targetI, { scaleY: 0.12, transformOrigin: 'bottom center', duration: 0.08, ease: 'power4.in' }, 'impact')
        .to(lamp, { scaleY: 0.65, scaleX: 1.25, transformOrigin: 'bottom center', duration: 0.08 }, 'impact')
        
        // Lamp rebounds upward slightly
        .to(lamp, { scaleY: 1.08, scaleX: 0.95, y: positions[3].y - 8, ease: 'power2.out', duration: 0.12 })
        .to(lamp, { scaleY: 1, scaleX: 1, y: positions[3].y, ease: 'elastic.out(1, 0.4)', duration: 0.5 })
        
        // Hold for dramatic beat
        .to({}, { duration: 0.5 });
    });

    const runReveal = () => {
      if (hasRevealed) return;
      hasRevealed = true;

      gsap.to(loaderContentRef.current, { scale: 1.3, opacity: 0, duration: 0.5, ease: 'power3.in' });
      gsap.to(loaderRef.current, { 
        height: 0, 
        duration: 1.2, 
        ease: 'power4.inOut', 
        delay: 0.3,
        onComplete: () => setLoading(false)
      });

      const tl = gsap.timeline({ delay: 1.0 });
      if (window.innerWidth >= 768) {
        tl.fromTo(vertAxisRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 1, ease: 'power3.out' })
          .fromTo(nameTopRef.current, { y: 150, opacity: 0, rotateX: -30 }, { y: 0, opacity: 1, rotateX: 0, duration: 1.2, ease: 'power4.out' }, "-=0.8")
          .fromTo(nameBottomRef.current, { y: 150, opacity: 0, rotateX: -30 }, { y: 0, opacity: 1, rotateX: 0, duration: 1.2, ease: 'power4.out' }, "-=1");
      } else {
        tl.set([vertAxisRef.current, nameTopRef.current, nameBottomRef.current], { opacity: 1 });
      }
      
      const allExtras = document.querySelectorAll('.mobile-extra-anim');
      tl.fromTo(annotationsRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1, stagger: 0.1 }, "-=0.5")
        .fromTo([cvBtnRef.current, ...allExtras], { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'back.out(1.5)', stagger: 0.1 }, "-=0.8");
    };

    const tryFinishLoad = () => {
      if (!hasRevealed && isBunnyLoaded && isWindowLoaded && sequenceFinished) {
        runReveal();
      }
    };

    const handleWindowLoad = () => { isWindowLoaded = true; tryFinishLoad(); };
    const handleBunnyLoad = () => { isBunnyLoaded = true; tryFinishLoad(); };

    window.addEventListener('load', handleWindowLoad);
    window.addEventListener('bunnyLoaded', handleBunnyLoad);

    const fallbackTimeout = setTimeout(() => {
      isWindowLoaded = true;
      isBunnyLoaded = true;
      tryFinishLoad();
    }, 5000);

    return () => {
      clearTimeout(fallbackTimeout);
      window.removeEventListener('load', handleWindowLoad);
      window.removeEventListener('bunnyLoaded', handleBunnyLoad);
    };
  }, []);

  // Parallax Text Effect
  useEffect(() => {
    if (!parallaxTopRef.current || !parallaxBottomRef.current) return;

    const xToTop = gsap.quickTo(parallaxTopRef.current, 'x', { duration: 1, ease: 'power3.out' });
    const yToTop = gsap.quickTo(parallaxTopRef.current, 'y', { duration: 1, ease: 'power3.out' });
    
    const xToBottom = gsap.quickTo(parallaxBottomRef.current, 'x', { duration: 1.2, ease: 'power3.out' });
    const yToBottom = gsap.quickTo(parallaxBottomRef.current, 'y', { duration: 1.2, ease: 'power3.out' });

    const handleMouseMove = (e) => {
      let clientX = e.clientX;
      let clientY = e.clientY;
      if (e.touches && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
      
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const xOffset = (clientX - centerX) / centerX;
      const yOffset = (clientY - centerY) / centerY;

      xToTop(xOffset * -20);
      yToTop(yOffset * -10);
      xToBottom(xOffset * 30);
      yToBottom(yOffset * 15);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <div 
        className="hero-loader" 
        ref={loaderRef}
        style={{ pointerEvents: loading ? 'auto' : 'none' }}
      >
        <div className="pixar-loader-content" ref={loaderContentRef}>
          {/* The Luxo Jr. Lamp — built entirely with CSS */}
          <div className="luxo-lamp" ref={lampRef}>
            <div className="luxo-head">
              <div className="luxo-beam"></div>
            </div>
            <div className="luxo-arm"></div>
            <div className="luxo-base"></div>
          </div>

          <div className="pixar-word">
            <span className="p-char">N</span>
            <span className="p-char">I</span>
            <span className="p-char">K</span>
            <span className="p-char">H</span>
            <span className="p-char target-i" ref={targetIRef}>I</span>
            <span className="p-char">L</span>
          </div>
          <div className="pixar-word pixar-word-bottom">
            <span className="p-char">Y</span>
            <span className="p-char">A</span>
            <span className="p-char">D</span>
            <span className="p-char">A</span>
            <span className="p-char">V</span>
          </div>
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
              <span className="diff-typo">MY</span> SITE SCREAMS <span className="diff-typo">ATTENTION</span>
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
