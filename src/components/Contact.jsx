import useInView from '../hooks/useInView';
import MagneticElement from './MagneticElement';
import './Contact.css';

const links = [
  { label: 'Email: nikhilyadav200530@gmail.com', href: 'mailto:nikhilyadav200530@gmail.com' },
  { label: 'Phone: +91 89262 65583', href: 'tel:+918926265583' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/nikhilyadav', external: true },
  { label: 'GitHub', href: 'https://github.com/nikhilyadav', external: true },
];

const Contact = () => {
  const [headerRef, headerVisible] = useInView();
  const [linksRef, linksVisible] = useInView({ threshold: 0.05 });

  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <span className={`section-label reveal from-left ${headerVisible ? 'is-visible' : ''}`} ref={headerRef}>/ CONTACT</span>
        <h2 className={`contact-heading clip-reveal ${headerVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
          LET'S BUILD<br />SOMETHING.
        </h2>

        <div
          ref={linksRef}
          className={`contact-links stagger-children ${linksVisible ? 'is-visible' : ''}`}
        >
          {links.map((l) => (
            <MagneticElement key={l.label} tag="a" strength={0.2}>
              <a
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noreferrer' : undefined}
                className="contact-link hover-target"
                style={{ display: 'inline-block' }}
              >
                <span>{l.label}</span>
                <span className="link-arrow">↗</span>
              </a>
            </MagneticElement>
          ))}
        </div>

        <div className={`contact-footer reveal ${linksVisible ? 'is-visible' : ''}`} style={{ transitionDelay: '0.5s' }}>
          <p>Raipur, India • Available for Summer 2026 Internship</p>
          <p style={{ marginTop: '0.5rem', color: '#333' }}>© 2026 Nikhil Yadav</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
