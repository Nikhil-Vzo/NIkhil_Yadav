import useInView from '../hooks/useInView';
import './Achievements.css';

const achievements = [
  { value: '400+', label: 'Users', sub: 'Other Half platform across 7 countries' },
  { value: '24.2%', label: 'Bounce Rate', sub: 'vs industry average of 40–60%' },
  { value: '6m 19s', label: 'Avg Session', sub: 'Time spent per visit' },
  { value: '₹40K+', label: 'Revenue', sub: 'Generated with 100% payment success' },
  { value: '65.1%', label: 'CTR', sub: 'Search click-through rate' },
  { value: '15K+', label: 'Page Views', sub: 'Organic traffic' },
];



const Achievements = () => {
  const [headerRef, headerVisible] = useInView();
  const [gridRef, gridVisible] = useInView({ threshold: 0.05 });

  return (
    <section id="achievements" className="achievements-section">
      <div className="ach-header" ref={headerRef}>
        <span className={`section-label reveal from-left ${headerVisible ? 'is-visible' : ''}`}>/ ACHIEVEMENTS</span>
        <h2 className={`ach-title clip-reveal ${headerVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
          BY THE<br />NUMBERS
        </h2>
      </div>

      <div ref={gridRef} className="ach-grid">
        {achievements.map((a, i) => (
          <div 
            className={`ach-card reveal-cubic ${gridVisible ? 'is-visible' : ''}`} 
            style={{ transitionDelay: `${i * 0.15}s` }} 
            key={a.label}
          >
            <span className="ach-value">{a.value}</span>
            <span className="ach-label">{a.label}</span>
            <span className="ach-sub">{a.sub}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achievements;
