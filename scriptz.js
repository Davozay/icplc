const bubbleContainer = document.getElementById("bubble-container");
const bubbleCount = 18;

const imageUrls = [
  "./assets/lworld_main.png",


 
  "https://placehold.co/100x100/0c1a3a/gold?text=ICPLC",
];

for (let i = 0; i < bubbleCount; i++) {
  const bubble = document.createElement("div");
  bubble.className = "bubble";

  const size = Math.random() * 160 + 60;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;

  // Random position
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.top = `${Math.random() * 100}%`;

  // Random animation delay and duration
  bubble.style.animationDelay = `${Math.random() * 5}s`;
  bubble.style.animationDuration = `${15 + Math.random() * 15}s`;

  // Add image to bubble
  const img = document.createElement("img");
  img.src = imageUrls[Math.floor(Math.random() * imageUrls.length)];
  img.alt = "LoveWorld";
  bubble.appendChild(img);

  bubbleContainer.appendChild(bubble);

  // Animate bubbles in
  setTimeout(() => {
    bubble.classList.add("loaded");
  }, 100 * i);
}

// Countdown timer for September 4, 2025
function updateCountdown() {
  const targetDate = new Date("2025-09-04T00:00:00").getTime();
  const now = new Date().getTime();
  const timeRemaining = targetDate - now;

  if (timeRemaining > 0) {
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days
      .toString()
      .padStart(2, "0");
    document.getElementById("hours").textContent = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("minutes").textContent = minutes
      .toString()
      .padStart(2, "0");
    document.getElementById("seconds").textContent = seconds
      .toString()
      .padStart(2, "0");
  } else {
    // If countdown is over
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

// Add scroll animations
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 1s ease-out forwards";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all sections for scroll animation
document.querySelectorAll(".section").forEach((section) => {
  observer.observe(section);
});
