const line = document.getElementById('line');
const btn = document.getElementById('closeBtn');
const timerDisplay = document.getElementById('timer');

const colors = [
  '#ff0000', '#ff8000', '#ffff00', '#80ff00', '#00ff00',
  '#00ff80', '#00ffff', '#0080ff', '#8000ff', '#ff00ff'
];

let animationFrameId = null;
let intervalId = null;

function animateLine() {
  let duration = 60000;
  let start = null;
  let screenWidth = window.innerWidth;
  let lastColorIndex = -1;


  line.style.right = '0px';
  line.style.opacity = '1';
  line.style.backgroundColor = colors[0];
  timerDisplay.textContent = '60 ثانیه';


  let remaining = 60;
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    remaining--;
    timerDisplay.textContent = remaining + ' ثانیه';
    if (remaining <= 0) clearInterval(intervalId);
  }, 1000);

  function animate(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const newRight = screenWidth * progress;
    line.style.right = `${newRight}px`;


    const colorIndex = Math.floor(progress * 10);
    if (colorIndex !== lastColorIndex && colors[colorIndex]) {
      line.style.backgroundColor = colors[colorIndex];
      lastColorIndex = colorIndex;
    }

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      line.style.opacity = '0';
    }
  }

  requestAnimationFrame(animate);
}

btn.addEventListener('click', () => {

  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  if (intervalId) clearInterval(intervalId);
  animateLine();
});