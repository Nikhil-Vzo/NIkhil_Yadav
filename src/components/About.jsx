import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sfx } from '../utils/sfx';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '400+', label: 'Active Users' },
  { value: '7', label: 'Countries' },
  { value: '50K+', label: 'Interactions' },
  { value: '4+', label: 'Live Platforms' },
];

const About = () => {
  const containerRef = useRef(null);
  const headingInnerRefs = useRef([]);
  const bioRefs = useRef([]);
  const statsRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%", 
          end: "bottom 25%",
          toggleActions: "restart reverse restart reverse",
        }
      });

      // 1. Text sliding up out of nowhere (hidden overflow masks with kinetic skew)
      tl.fromTo(headingInnerRefs.current, 
        { y: '120%', skewY: 8 },
        {
          y: '0%',
          skewY: 0,
          ease: "power4.out",
          duration: 1.5,
          stagger: 0.15,
          onStart: () => {
            try { sfx.playBloop(); } catch(e) {}
          }
        }
      );

      // 2. High Contrast "Blinds" Sweep combined with Clip-Path text reveal
      // Initially, text is fully clipped out of view
      gsap.set(bioRefs.current, { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" });
      // Initially, sweep block is 0 width on the left
      gsap.set('.bio-sweep-block', { scaleX: 0, transformOrigin: 'left center' });

      // Sweep block grows from left to right covering the line
      tl.to('.bio-sweep-block', {
        scaleX: 1,
        ease: "power3.inOut",
        duration: 0.7,
        stagger: 0.2
      }, "-=1.2");

      // While sweep block starts shrinking rightward, we uncover the text behind it!
      tl.to(bioRefs.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        ease: "power3.inOut",
        duration: 0.7,
        stagger: 0.2
      }, "-=0.7")
      .to('.bio-sweep-block', {
        scaleX: 0,
        transformOrigin: "right center",
        ease: "power3.inOut",
        duration: 0.7,
        stagger: 0.2
      }, "-=0.9");

      // 3. Stats stagger in aggressively
      tl.fromTo('.stat-item', 
        { opacity: 0, y: 50, scale: 0.9 }, 
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.5)", stagger: 0.1 }, 
        "-=0.5"
      );

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about-section" ref={containerRef}>
      {/* Tinted colour bleed — unique to this section */}
      <div className="about-glow" />

      <div className="about-inner">
        <div className="about-left">
          <span className="section-label">/ ABOUT</span>
          <h2 className="about-heading" style={{ marginTop: '2rem' }}>
            <div className="mask-box">
              <div className="mask-inner" ref={el => headingInnerRefs.current[0] = el}>Full-Stack</div>
            </div>
            <div className="mask-box">
              <div className="mask-inner" ref={el => headingInnerRefs.current[1] = el}>Engineer.</div>
            </div>
            <div className="mask-box">
              <div className="mask-inner heading-accent" ref={el => headingInnerRefs.current[2] = el}>Builder.</div>
            </div>
          </h2>
          <p className="about-location"></p>
        </div>

        <div className="about-right">
          <div className="bio-wrapper">
             {/* The sweeping contrast block that hides the text initially */}
             <div className="bio-sweep-block"></div>
             <p className="about-bio" ref={el => bioRefs.current[0] = el}>
               Full-Stack Software Engineer (MERN) with production experience 
               architecting high-availability web applications. Specialized in 
               TypeScript, React.js 18, and Node.js 20.
             </p>
          </div>
          
          <div className="bio-wrapper" style={{ marginTop: '1.5rem' }}>
             <div className="bio-sweep-block"></div>
             <p className="about-bio" ref={el => bioRefs.current[1] = el} style={{ color: 'var(--color-muted)' }}>
               Turned university projects into platforms that serve users across 7 
               countries. Currently pursuing B.Tech CSE at Amity University. 
               Seeking Summer 2026 Internship.
             </p>
          </div>

          <div ref={statsRef} className="about-stats" style={{ marginTop: '3rem' }}>
            {stats.map((s) => (
              <div key={s.label} className="stat-item" style={{ opacity: 0 }}>
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
