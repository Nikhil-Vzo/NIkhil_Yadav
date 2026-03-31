import { useEffect, useRef } from 'react';
import './AmbientLayer.css';

class Particle {
  constructor(width, height) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 1.5 + 0.5;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = (Math.random() * 30) + 1;
    this.velocity = {
      x: (Math.random() - 0.5) * 0.5,
      y: (Math.random() - 0.5) * 0.5
    };
  }

  draw(ctx) {
    ctx.fillStyle = 'rgba(242, 240, 235, 0.15)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update(mouse, width, height) {
    this.x += this.velocity.x;
    this.y += this.velocity.y;

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;

    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    
    let force = (mouse.radius - distance) / mouse.radius;
    let directionX = (forceDirectionX * force * this.density) * -1;
    let directionY = (forceDirectionY * force * this.density) * -1;

    if (distance < mouse.radius) {
      this.x += directionX;
      this.y += directionY;
    } else {
      if (this.x !== this.baseX) {
        let dxReturn = this.x - this.baseX;
        this.x -= dxReturn / 100;
      }
      if (this.y !== this.baseY) {
        let dyReturn = this.y - this.baseY;
        this.y -= dyReturn / 100;
      }
    }
  }
}

const AmbientLayer = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    let particles = [];
    const numParticles = Math.min(window.innerWidth / 15, 100);
    
    let mouse = {
      x: width / 2,
      y: height / 2,
      radius: 150
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };
    
    function initParticles() {
      particles = [];
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(width, height));
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].draw(ctx);
        particles[i].update(mouse, width, height);
      }
      
      // Draw faint connective lines
      connect();
      requestAnimationFrame(animate);
    }

    function connect() {
      let opacityValue = 1;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
            + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
          
          if (distance < (width / 10) * (height / 10)) {
            opacityValue = 1 - (distance / 20000);
            ctx.strokeStyle = `rgba(126, 124, 119, ${opacityValue * 0.15})`; // --color-muted slightly opaque
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    initParticles();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-layer-canvas" />;
};

export default AmbientLayer;
