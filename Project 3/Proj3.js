const text = "This isn’t just about today. It’s about choosing each other on ordinary days and holding hands through everything. 💕✨ Anyone can be there on happy and cheerful days🥰 but what's matter is who is there when there is no one and even you don't want anyone🎀, I'll be always there for you 💖       Always Here for You";

let index = 0;
let typingStarted = false;

function typeEffect() {
  if (index < text.length) {
    document.getElementById("typingText").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeEffect, 50);
  }
}

/* START TYPING ONLY WHEN SECTION IS VISIBLE */
const messageSection = document.getElementById("messageSection");

const observer = new IntersectionObserver(
  entries => {
    if (entries[0].isIntersecting && !typingStarted) {
      typingStarted = true;
      typeEffect();
    }
  },
  { threshold: 0.4 } // 40% visible
);

observer.observe(messageSection);


function next(){
  const sections = document.querySelectorAll("section");
  const currentScroll = window.scrollY;
  let nextSection = null;

  sections.forEach(sec => {
    if (sec.offsetTop > currentScroll + 10 && !nextSection) {
      nextSection = sec;
    }
  });

  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
}


const canvas = document.getElementById('scratch');
const ctx = canvas.getContext('2d');

/* Fill scratch layer */
ctx.fillStyle = '#c9184a';
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.globalCompositeOperation = 'destination-out';

let drawing = false;

function getPos(e) {
  const rect = canvas.getBoundingClientRect();
  const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
  const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
  return { x, y };
}

function scratch(e) {
  if (!drawing) return;
  e.preventDefault();
  const { x, y } = getPos(e);
  ctx.beginPath();
  ctx.arc(x, y, 28, 0, Math.PI * 2);
  ctx.fill();
}

/* Mouse events */
canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mousemove', scratch);

/* Touch events (THIS FIXES IT) */
canvas.addEventListener('touchstart', () => drawing = true);
canvas.addEventListener('touchend', () => drawing = false);
canvas.addEventListener('touchmove', scratch);

/* YES / NO */
document.addEventListener("DOMContentLoaded", () => {

  const yes = document.getElementById("yes");
  const no = document.getElementById("no");
  const result = document.getElementById("result");

  let yesScale = 1;
  let confettiPlayed = false;

  /* MOVE NO BUTTON */
  function moveNo() {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 150 - 75;

    no.style.transform = `translate(${x}px, ${y}px)`;

    yesScale += 0.15;
    yes.style.transform = `scale(${yesScale})`;
  }

  no.addEventListener("mouseenter", moveNo);
  no.addEventListener("click", moveNo);

  /* YES CLICK */
  yes.addEventListener("click", () => {
    result.innerHTML = `
      <p>You just made me the happiest person ❤️</p>
      <button class="btn" onclick="next()">Next 💕</button>
    `;

    yes.remove();
    no.remove();

    playConfetti();
  });

  /* CONFETTI — ONLY ONCE */
  function playConfetti() {
    if (confettiPlayed) return;
    confettiPlayed = true;

    for (let i = 0; i < 80; i++) {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "💖";

      const fromLeft = Math.random() > 0.5;

      heart.style.left = fromLeft ? "-40px" : "100vw";
      heart.style.top = Math.random() * 80 + 10 + "vh";

      heart.style.setProperty(
        "--x",
        (fromLeft ? 1 : -1) * (200 + Math.random() * 200) + "px"
      );

      heart.style.setProperty(
        "--y",
        Math.random() * 300 - 150 + "px"
      );

      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 4000);
    }
  }

});
