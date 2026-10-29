
const canvas = document.getElementById("artwork");
const ctx = canvas.getContext("2d");

let width, height;
let time = 0;
let mouseX = 0;
let mouseY = 0;

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeCanvas);

window.addEventListener("pointermove", (event) => {
  mouseX = (event.clientX / width - 0.5) * 35;
  mouseY = (event.clientY / height - 0.5) * 25;
});

function drawWave(offset, amplitude, frequency, color, speed) {
  ctx.beginPath();

  for (let x = 0; x <= width; x += 3) {
    const wave =
      Math.sin(x * frequency + time * speed + offset) * amplitude;

    const secondWave =
      Math.sin(x * frequency * 0.45 - time * speed * 0.7 + offset) *
      amplitude * 0.4;

    const y =
      height * 0.56 +
      wave +
      secondWave +
      mouseY +
      Math.sin(x * 0.006 + time * 0.4 + offset) * 25;

    if (x === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }

  ctx.strokeStyle = color;
  ctx.lineWidth = 0.8;
  ctx.shadowBlur = 8;
  ctx.shadowColor = color;
  ctx.stroke();
  ctx.shadowBlur = 0;
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  time += 0.012;

  ctx.save();
  ctx.translate(mouseX * 0.35, 0);

  const colors = [
    "rgba(230, 190, 165, 0.24)",
    "rgba(255, 255, 255, 0.25)",
    "rgba(190, 205, 220, 0.22)",
    "rgba(220, 150, 115, 0.28)",
    "rgba(255, 235, 220, 0.20)"
  ];

  for (let i = 0; i < 65; i++) {
    drawWave(
      i * 0.12,
      45 + Math.sin(i * 0.2) * 35,
      0.006 + (i % 5) * 0.0007,
      colors[i % colors.length],
      0.6 + (i % 4) * 0.15
    );
  }

  ctx.restore();
  requestAnimationFrame(animate);
}

resizeCanvas();
animate();
