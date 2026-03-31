import { Link } from 'react-router-dom';
import useInView from '../hooks/useInView';
import './Projects.css';

export const projects = [
  {
    id: 'other-half',
    number: '01',
    title: 'OTHER HALF',
    tag: 'Social Platform',
    accent: '#00e5a0',
    year: '2026',
    liveLink: 'https://othrhalff.in',
    media: [
      { type: 'image', category: 'Analytics', src: '/mockups/othrhalff/analytics/Screenshot 2026-03-01 010857.png' },
      { type: 'image', category: 'Analytics', src: '/mockups/othrhalff/analytics/Screenshot 2026-03-01 011517.png' },
      { type: 'image', category: 'Analytics', src: '/mockups/othrhalff/analytics/Screenshot 2026-03-01 011650.png' },
      { type: 'image', category: 'Analytics', src: '/mockups/othrhalff/analytics/Screenshot 2026-03-01 012234.png' },
      { type: 'image', category: 'UI Interfaces', src: '/mockups/othrhalff/ui mockup/Screenshot 2026-02-23 194742.png' },
      { type: 'image', category: 'UI Interfaces', src: '/mockups/othrhalff/ui mockup/Screenshot 2026-02-24 015802.png' },
      { type: 'image', category: 'UI Interfaces', src: '/mockups/othrhalff/ui mockup/Screenshot 2026-02-24 015822.png' },
      { type: 'image', category: 'UI Interfaces', src: '/mockups/othrhalff/ui mockup/Screenshot 2026-02-24 015850.png' },
      { type: 'image', category: 'UI Interfaces', src: '/mockups/othrhalff/ui mockup/Screenshot 2026-02-24 015921.png' },
      { type: 'image', category: 'UI Interfaces', src: '/mockups/othrhalff/ui mockup/Screenshot 2026-02-24 015936.png' },
      { type: 'image', category: 'UI Interfaces', src: '/mockups/othrhalff/ui mockup/Screenshot 2026-02-24 015947.png' },
      { type: 'image', category: 'UI Interfaces', src: '/mockups/othrhalff/ui mockup/Screenshot 2026-02-24 015958.png' },
      { type: 'image', category: 'UI Interfaces', src: '/mockups/othrhalff/ui mockup/Screenshot 2026-02-24 020010.png' },
      { type: 'image', category: 'UI Interfaces', src: '/mockups/othrhalff/ui mockup/Screenshot 2026-02-24 220824.png' },
      { type: 'image', category: 'UI Interfaces', src: '/mockups/othrhalff/ui mockup/Screenshot 2026-02-24 221156.png' },
      { type: 'image', category: 'UI Interfaces', src: '/mockups/othrhalff/ui mockup/Screenshot 2026-02-24 221208.png' }
    ],
    tagline: '400+ users. 7 countries. One campus app.',
    desc: 'Campus social platform scaling to 400+ users across 7 countries with 50,000+ interactions. 15,000+ page views, 65.1% CTR.',
    stats: ['400+ Users', '7 Countries', '35% Latency Cut'],
    stack: ['React.js', 'Node.js', 'PostgreSQL', 'Supabase', 'Tailwind', 'TypeScript'],
    highlights: [
      'Reduced latency by 35% via PostgreSQL query optimization',
      '15,000+ organic page views with 65.1% CTR',
      '6m 19s average session time (industry avg: 2–3min)',
      '24.2% bounce rate vs industry average of 40–60%',
      '50,000+ total in-app interactions',
    ],
    problem: 'Students at university had no single platform to meet people with shared real interests — not based on looks, but shared library vibes, lab energy, and campus chemistry.',
    solution: 'Built a full-stack social graph with interest-based matching algorithms, real-time chat, and a premium mobile-first UI. Deployed to production and grew organically.',
  },
  {
    id: 'tedx-auc',
    number: '02',
    title: 'TEDX AUC',
    tag: 'Event Management',
    accent: '#ff4d4d',
    year: '2025',
    liveLink: 'https://tedxamity.com',
    tagline: '₹40,000+ processed. 100% success rate.',
    desc: 'Full-stack ticketing platform with Razorpay integration. Processed ₹40,000+ revenue with 100% payment success and zero failed deliveries.',
    stats: ['₹40K+ Revenue', '100% Success', 'Zero Failures'],
    stack: ['React.js', 'Node.js', 'Razorpay', 'Supabase', 'Deno', 'Resend API'],
    highlights: [
      '₹40,000+ in transaction volume processed',
      '100% payment success rate via Razorpay webhooks',
      'Zero failed ticket deliveries — fully automated',
      'Serverless Edge Functions saved 15+ manual hours/week',
      'QR-based ticket scanning with anti-reuse protection',
    ],
    problem: 'TEDx event organizers were manually verifying hundreds of ticket registrations and chasing payment failures, wasting hours per event.',
    solution: 'Built an end-to-end ticketing platform: Razorpay payment gateway, automated ticket email delivery via Resend API and Deno Edge Functions, and a QR scan dashboard for gate entry.',
  },
  {
    id: 'guidely',
    number: '03',
    title: 'GUIDELY',
    tag: 'Career Guidance',
    accent: '#ffd700',
    year: '2025–26',
    tagline: '95% accuracy. Special Mention at SIH 2024.',
    desc: 'Career guidance algorithm with weighted scoring (95% accuracy). Led a team of 4. Earned Special Mention at SIH 2024.',
    stats: ['95% Accuracy', 'Team of 4', 'SIH 2024'],
    stack: ['React.js', 'Node.js', 'Python', 'MongoDB', 'ML Algorithms'],
    highlights: [
      'Weighted scoring algorithm achieving 95% career match accuracy',
      'Special Mention at Smart India Hackathon 2024',
      'Led team of 4 engineers across frontend and backend',
      'Built adaptive quiz engine adjusting question depth dynamically',
    ],
    problem: 'Students in India lack accessible, personalized career guidance. Existing tools are generic and fail to account for diverse academic backgrounds.',
    solution: 'Built a weighted multi-factor scoring algorithm that maps student skills, interests, and academic performance to career paths with 95% accuracy rating from test cohorts.',
  },
  {
    id: 'fest-platform',
    number: '04',
    title: 'FEST PLATFORM',
    tag: 'Booking System',
    accent: '#ff6b35',
    year: '2026',
    tagline: 'Real-time QR scanning. Dynamic zone control.',
    desc: 'University fest booking system with dynamic zone restrictions, Razorpay payment, QR ticket generation, and real-time anti-reuse scan tracking.',
    stats: ['QR Ticketing', 'Razorpay', 'Real-time Scan'],
    stack: ['React.js', 'Node.js', 'Razorpay', 'QR Engine', 'Resend API'],
    highlights: [
      'Dynamic zone restriction system per event category',
      'Razorpay payment with instant QR ticket generation on success',
      'Real-time QR scanning with anti-reuse scan tracking',
      'Resend API for automated ticket dispatch',
    ],
    problem: 'University fests had no digital infrastructure — registrations were via Google Forms, payments via UPI screenshots, and entry management was completely manual.',
    solution: 'Built a complete booking infrastructure: digital registration, Razorpay checkout, auto-generated QR tickets via email, and an admin scan dashboard with zone management.',
  },
];

const ProjectRow = ({ p, index }) => {
  const [ref, visible] = useInView({ threshold: 0.1 });
  const animClass = index % 2 === 0 ? 'reveal-70deg' : 'reveal-40deg';
  return (
    <Link
      to={`/project/${p.id}`}
      ref={ref}
      className={`project-row hover-target ${animClass} ${visible ? 'is-visible' : ''}`}
      style={{ '--accent': p.accent, transitionDelay: `${index * 0.15}s` }}
    >
      <div className="project-number" style={{ color: p.accent }}>{p.number}</div>
      <div className="project-info">
        <div className="project-top">
          <h3 className="project-name">{p.title}</h3>
          <span className="project-tag">{p.tag}</span>
          <span className="project-year">{p.year}</span>
        </div>
        <p className="project-tagline">{p.tagline}</p>
        <div className="project-stats">
          {p.stats.map((s) => (
            <span key={s} className="project-stat" style={{ borderColor: p.accent + '44', color: p.accent }}>{s}</span>
          ))}
        </div>
      </div>
      <div className="project-arrow" style={{ color: p.accent }}>→</div>
    </Link>
  );
};

const Projects = () => {
  const [headerRef, headerVisible] = useInView();
  return (
    <section id="projects" className="projects-section">
      <div className="projects-header" ref={headerRef}>
        <span className={`section-label reveal from-left ${headerVisible ? 'is-visible' : ''}`} style={{ color: '#ff6b35' }}>/ PROJECTS</span>
        <h2 className={`projects-title reveal-stretch ${headerVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
          SELECTED<br />WORK
        </h2>
        <p className={`projects-sub reveal ${headerVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.25s' }}>
          Click any project for a full case study ↓
        </p>
      </div>
      <div className="projects-list">
        {projects.map((p, i) => <ProjectRow key={p.id} p={p} index={i} />)}
      </div>
    </section>
  );
};

export default Projects;
