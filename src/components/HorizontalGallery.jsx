import { Link } from 'react-router-dom';
import './HorizontalGallery.css';

const mockups = [
  {
    id: 'chemistry',
    title: 'CHEMISTRY',
    sub: 'OthrHalff · Campus Connect',
    img: '/mockups/Chemistry_starts_in_the_chat__version_1.png',
  },
  {
    id: 'dark',
    title: 'DATING IN DARK',
    sub: 'OthrHalff · Matching',
    img: '/mockups/Dating_is_better_in_the_dark__version_1.png',
  },
  {
    id: 'connections',
    title: 'CONNECTIONS',
    sub: 'OthrHalff · Social Graph',
    img: '/mockups/Make_connections_that_matter__version_1.png',
  },
  {
    id: 'energy',
    title: 'LIBRARY ENERGY',
    sub: 'OthrHalff · Study Mode',
    img: '/mockups/Match_your_library_energy__version_1.png',
  },
];

const HorizontalGallery = () => (
  <section className="gallery-section">
    <div className="gallery-label">
      <span className="section-label">/ OTHRHALFF — SELECTED SCREENS</span>
    </div>
    <div className="gallery-scroll-area">
      {mockups.map((m) => (
        <div className="gallery-slide" key={m.id}>
          <div className="gallery-img-wrap">
            <img src={m.img} alt={m.title} loading="lazy" />
          </div>
          <div className="gallery-slide-meta">
            <h3>{m.title}</h3>
            <p>{m.sub}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default HorizontalGallery;
