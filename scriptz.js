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

  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.top = `${Math.random() * 100}%`;

  bubble.style.animationDelay = `${Math.random() * 5}s`;
  bubble.style.animationDuration = `${15 + Math.random() * 15}s`;

  const img = document.createElement("img");
  img.src = imageUrls[Math.floor(Math.random() * imageUrls.length)];
  img.alt = "LoveWorld";
  bubble.appendChild(img);

  bubbleContainer.appendChild(bubble);

  setTimeout(() => {
    bubble.classList.add("loaded");
  }, 100 * i);
}

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
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();

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

document.querySelectorAll(".section").forEach((section) => {
  observer.observe(section);
});

// Enhanced Attendees slider functionality

document.addEventListener("DOMContentLoaded", function () {
  const sliderTrack = document.querySelector(".slider-track");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const cards = document.querySelectorAll(".attendee-card");
  const dotsContainer = document.querySelector(".slider-dots");

  let currentPosition = 0;
  let currentSlide = 0;
  let autoSlideInterval;
  let touchStartX = 0;
  let touchEndX = 0;
  const swipeThreshold = 50;
  const cardWidth = cards[0].offsetWidth + 25; // width + gap
  const visibleCards = Math.floor(sliderTrack.offsetWidth / cardWidth);
  const totalSlides = Math.ceil(cards.length / visibleCards);

  
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");
    dot.classList.add("slider-dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    currentPosition = -slideIndex * visibleCards * cardWidth;
    sliderTrack.style.transform = `translateX(${currentPosition}px)`;

   
    document.querySelectorAll(".slider-dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === slideIndex);
    });
  }

  function moveSlider(direction) {
    currentSlide += direction;

    
    if (currentSlide < 0) {
      currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
      currentSlide = 0;
    }

    goToSlide(currentSlide);
  }

  // Touch event handlers for mobile
  sliderTrack.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlide();
    },
    { passive: true }
  );

  sliderTrack.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoSlide();
    },
    { passive: true }
  );

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        moveSlider(-1); 
      } else {
        moveSlider(1); 
      }
    }
  }

  // Event listeners for buttons
  prevBtn.addEventListener("click", () => moveSlider(-1));
  nextBtn.addEventListener("click", () => moveSlider(1));

  // Auto-slide functions
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => moveSlider(1), 5000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  
  sliderTrack.addEventListener("mouseenter", stopAutoSlide);
  sliderTrack.addEventListener("mouseleave", startAutoSlide);
  prevBtn.addEventListener("mouseenter", stopAutoSlide);
  nextBtn.addEventListener("mouseenter", stopAutoSlide);
  prevBtn.addEventListener("mouseleave", startAutoSlide);
  nextBtn.addEventListener("mouseleave", startAutoSlide);

  startAutoSlide();

  
  window.addEventListener("resize", function () {
    
    const newCardWidth = cards[0].offsetWidth + 25;
    const newVisibleCards = Math.floor(sliderTrack.offsetWidth / newCardWidth);
    const newTotalSlides = Math.ceil(cards.length / newVisibleCards);

    if (newVisibleCards !== visibleCards || newTotalSlides !== totalSlides) {
      
      location.reload(); 
    }
  });
});
