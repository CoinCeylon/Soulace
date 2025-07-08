const canvas = document.getElementById('background');
const ctx = canvas.getContext('2d');

let width, height, particles = [];

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function createParticles(count) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3
    });
  }
}
createParticles(100);

function animate() {
  ctx.fillStyle = 'rgba(15, 15, 26, 0.2)';
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = '#00f5ff';
  for (let p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > width) p.dx *= -1;
    if (p.y < 0 || p.y > height) p.dy *= -1;
  }

  requestAnimationFrame(animate);
}
animate();
