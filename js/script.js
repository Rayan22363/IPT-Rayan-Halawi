document.addEventListener("DOMContentLoaded", function () {
  const imageChangeTime = 5;
  let time = 0;
  let currentSlider;

  const progressIndicator = document.getElementById("progress-indicator");
  const totalSlides = 3;

  function renderProgress(index) {
    progressIndicator.innerHTML = "";

    for (let i = 0; i < totalSlides; i++) {
      const number = document.createElement("div");
      number.textContent = String(i + 1).padStart(2, "0");
      number.classList.add("progress-number", "slide-number");
      number.style.fontWeight = "normal";
      number.style.fontSize = "18px";
      if (i <= index) number.classList.add("active");

      progressIndicator.appendChild(number);

      if (i === index) {
        const sliderWrapper = document.createElement("div");
        sliderWrapper.classList.add("slider-wrapper");

        const slider = document.createElement("input");
        slider.type = "range";
        slider.className = "slider";
        slider.value = 0;
        slider.max = imageChangeTime;
        slider.step = 0.01;

        sliderWrapper.appendChild(slider);
        progressIndicator.appendChild(sliderWrapper);

        currentSlider = slider;
        slider.addEventListener("input", updateSliderBackground);
      }
    }
  }

  function updateSliderBackground() {
    if (!currentSlider) return;
    const value = (currentSlider.value / currentSlider.max) * 100;
    currentSlider.style.backgroundImage = `linear-gradient(to right, white ${value}%, grey ${value}%)`;
  }

  function resetRangeSlider() {
    time = 0;
    if (currentSlider) {
      currentSlider.value = 0;
    }
  }

  setInterval(() => {
    time += 0.01;
    if (currentSlider) {
      currentSlider.value = time;
      updateSliderBackground();
    }
  }, 10);

  const swiper = new Swiper(".hero-slider", {
    loop: true,
    autoplay: {
      delay: imageChangeTime * 1000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    slidesPerView: 1,
    centeredSlides: false,
    on: {
      slideChange: function () {
        const counter = document.getElementById("counter");
        if (counter) {
          counter.textContent = `${this.realIndex + 1}/${totalSlides}`;
        }
        renderProgress(this.realIndex);
        resetRangeSlider();
      },
    },
  });

  renderProgress(0);

 let currentIndex = 0;
  const employees = document.querySelectorAll(".employee");
  const totalEmployees = employees.length;
  const dots = document.querySelectorAll(".dot");

  employees.forEach((employee, index) => {
    if (index !== currentIndex) {
      employee.style.display = "none";
    }
  });

  function showNextEmployee() {
    employees[currentIndex].style.display = "none";
    dots[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % totalEmployees;
    employees[currentIndex].style.display = "flex";
    dots[currentIndex].classList.add("active");
  }

  setInterval(showNextEmployee, 3000);
});