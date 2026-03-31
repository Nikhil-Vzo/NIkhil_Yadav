import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import MagneticElement from './MagneticElement';
import './Hero.css';

const Hero = () => {
  const [loading, setLoading] = useState(true);

  const loaderRef = useRef(null);
  const lampRef = useRef(null);
  const targetIRef = useRef(null);
  const charsRef = useRef([]);

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

    // The entire Pixar sequence is entirely CSS/GSAP (0 React re-renders = perfectly smooth on mobile)
    const pixarTl = gsap.timeline({
      onComplete: () => {
        sequenceFinished = true;
        tryFinishLoad();
      }
    });

    // 1. Lamp drops in and hops
    pixarTl.fromTo(lampRef.current, { x: '-20vw', y: '-50vh', rotation: -45 }, { x: '-10vw', y: 0, rotation: 0, ease: 'bounce.out', duration: 0.8 })
      // Hop 1 (N)
      .to(lampRef.current, { x: '-5vw', y: '-15vh', ease: 'power2.out', duration: 0.3 })
      .to(lampRef.current, { x: '-2vw', y: 0, ease: 'power2.in', duration: 0.25 })
      // Hop 2 (I)
      .to(lampRef.current, { x: '2vw', y: '-15vh', ease: 'power2.out', duration: 0.3 })
      .to(lampRef.current, { x: '5vw', y: 0, ease: 'power2.in', duration: 0.25 })
      // The Big Jump
      .to(lampRef.current, { x: '7vw', y: '-25vh', rotation: 180, ease: 'power3.out', duration: 0.5 })
      // SQUASH the I!
      .to(lampRef.current, { x: '9vw', y: '0vh', rotation: 360, ease: 'power4.in', duration: 0.35 })
      .add('squash') // label for simultaneous actions
      .to(targetIRef.current, { scaleY: 0.1, transformOrigin: 'bottom', ease: 'elastic.out(1, 0.3)', duration: 0.8 }, 'squash')
      .to(lampRef.current, { scaleY: 0.6, scaleX: 1.3, transformOrigin: 'bottom', y: '2vh', duration: 0.15 }, 'squash')
      .to(lampRef.current, { scaleY: 1, scaleX: 1, y: 0, ease: 'elastic.out(1, 0.5)', duration: 0.6 });

    const runReveal = () => {
      if (hasRevealed) return;
      hasRevealed = true;

      // Hide loader explosively
      gsap.to('.pixar-loader-content', { scale: 1.5, opacity: 0, duration: 0.6, ease: 'power3.in' });
      gsap.to(loaderRef.current, { 
        height: 0, 
        duration: 1.2, 
        ease: 'power4.inOut', 
        delay: 0.4,
        onComplete: () => setLoading(false)
      });

      // Enter Hero typography sequence
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
    }, 4500);

    return () => {
      clearTimeout(fallbackTimeout);
      window.removeEventListener('load', handleWindowLoad);
      window.removeEventListener('bunnyLoaded', handleBunnyLoad);
      pixarTl.kill();
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
      
      // Calculate normalized offset from center (-1 to 1)
      const xOffset = (clientX - centerX) / centerX;
      const yOffset = (clientY - centerY) / centerY;

      // Subtle parallax pushes (opposites for top/bottom to create torsion)
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
        <div className="pixar-loader-content">
          <div className="loader-lamp" ref={lampRef}></div>
          <div className="pixar-word">
            <span className="p-char" ref={el => charsRef.current[0] = el}>N</span>
            <span className="p-char" ref={el => charsRef.current[1] = el}>I</span>
            <span className="p-char" ref={el => charsRef.current[2] = el}>K</span>
            <span className="p-char" ref={el => charsRef.current[3] = el}>H</span>
            <span className="p-char" ref={targetIRef}>I</span>
            <span className="p-char" ref={el => charsRef.current[4] = el}>L</span>
          </div>
          <div className="pixar-word">
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
