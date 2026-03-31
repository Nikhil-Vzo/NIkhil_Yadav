import useInView from '../hooks/useInView';
import './About.css';

const stats = [
  { value: '400+', label: 'Active Users' },
  { value: '7', label: 'Countries' },
  { value: '50K+', label: 'Interactions' },
  { value: '4+', label: 'Live Platforms' },
];

const About = () => {
  const [leftRef, leftVisible] = useInView();
  const [rightRef, rightVisible] = useInView();
  const [statsRef, statsVisible] = useInView();

  return (
    <section id="about" className="about-section">
      {/* Tinted colour bleed — unique to this section */}
      <div className="about-glow" />

      <div className="about-inner">
        <div className="about-left" ref={leftRef}>
          <span className={`section-label reveal from-left ${leftVisible ? 'is-visible' : ''}`}>/ ABOUT</span>
          <h2 className={`about-heading reveal-blur ${leftVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            Full-Stack<br />
            Engineer.<br />
            <span className="heading-accent">Builder.</span>
          </h2>
          <p className={`about-location reveal ${leftVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
            
          </p>
        </div>
        <div className="about-right" ref={rightRef}>
          <p className={`about-bio reveal ${rightVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            Full-Stack Software Engineer (MERN) with production experience 
            architecting high-availability web applications. Specialized in 
            TypeScript, React.js 18, and Node.js 20.
          </p>
          <p className={`about-bio reveal ${rightVisible ? 'is-visible' : ''}`} style={{ marginTop: '1.5rem', color: 'var(--color-muted)', transitionDelay: '0.2s' }}>
            Turned university projects into platforms that serve users across 7 
            countries. Currently pursuing B.Tech CSE at Amity University. 
            Seeking Summer 2026 Internship.
          </p>
          <div ref={statsRef} className={`about-stats stagger-children ${statsVisible ? 'is-visible' : ''}`}>
            {stats.map((s) => (
              <div key={s.label} className="stat-item">
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
