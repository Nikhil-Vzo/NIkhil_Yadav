import useInView from '../hooks/useInView';
import './Experience.css';

const experiences = [
  {
    role: 'Web Developer',
    org: 'TEDx Amity University Raipur',
    period: 'Sep 2025 – Present',
    accent: '#ff4d4d',
    points: [
      'Built ticket verification and payment system from scratch',
      'Processed ₹40,000+ in revenue with 100% payment success rate',
      'Integrated Razorpay API and real-time webhooks',
      'Built serverless Edge Functions (Deno/Resend)',
      'Automated ticket dispatch — saved 15+ manual hours/week',
    ],
  },
  {
    role: 'Freelance Full-Stack Developer',
    org: 'Remote — International B2B Client',
    period: 'Jun 2024 – Aug 2024',
    accent: '#00e5a0',
    points: [
      'Developed custom full-stack web application for international B2B client',
      'Managed full SDLC from requirements gathering to deployment',
      'React.js + Tailwind frontend, Node.js/Express backend',
      'Improved data processing efficiency across the pipeline',
    ],
  },
  {
    role: 'Event Coordinator & Anchor',
    org: 'Amity University Clubs',
    period: 'Sep 2024 – Present',
    accent: '#ffd700',
    points: [
      'Coordinated 10+ events with 500+ attendees',
      'Reduced coordination delays by 40%',
    ],
  },
];

const ExpItem = ({ e, index }) => {
  const [ref, visible] = useInView({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`exp-item reveal-rotate ${visible ? 'is-visible' : ''}`}
      style={{ '--accent': e.accent, transitionDelay: `${index * 0.12}s` }}
    >
      <div className="exp-left">
        <span className="exp-period">{e.period}</span>
        <span className="exp-accent-bar" style={{ background: e.accent }} />
      </div>
      <div className="exp-right">
        <h3 className="exp-role">{e.role}</h3>
        <p className="exp-org">{e.org}</p>
        <ul className="exp-points">
          {e.points.map((pt, j) => (
            <li key={j}>
              <span className="exp-bullet" style={{ background: e.accent }} />
              {pt}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Experience = () => {
  const [headerRef, headerVisible] = useInView();
  return (
    <section id="experience" className="experience-section">
      <div className="exp-header" ref={headerRef}>
        <span className={`section-label reveal from-left ${headerVisible ? 'is-visible' : ''}`} style={{ color: '#00e5a0' }}>/ EXPERIENCE</span>
        <h2 className={`exp-title clip-reveal ${headerVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
          WHERE I'VE<br />WORKED
        </h2>
      </div>
      <div className="exp-list">
        {experiences.map((e, i) => <ExpItem key={i} e={e} index={i} />)}
      </div>
    </section>
  );
};

export default Experience;
