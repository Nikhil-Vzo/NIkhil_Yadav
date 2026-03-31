import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useParams, Link } from 'react-router-dom';
import './CaseStudy.css';

gsap.registerPlugin(ScrollTrigger);

const CaseStudy = () => {
  const { id } = useParams();
  const pageRef = useRef(null);

  useEffect(() => {
    // Quick fade in for the case study container
    gsap.fromTo(pageRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 });
  }, [id]);

  return (
    <div className="case-study-page" ref={pageRef}>
      <header className="cs-header">
        <Link to="/" className="cs-back-btn">← BACK TO HOME</Link>
        <h1 className="cs-title">{id.replace('-', ' ').toUpperCase()}</h1>
      </header>
      
      <section className="cs-content">
        <div className="cs-meta">
          <p>This is a dedicated cinematic case study page tailored for <strong>{id}</strong>.</p>
          <p>It prevents the main portfolio from accumulating too much text, keeping the experience clean and immersive as requested in the plan.</p>
        </div>
      </section>
    </div>
  );
};

export default CaseStudy;
