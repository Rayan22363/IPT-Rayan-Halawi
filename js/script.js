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

// Directory panel GSAP (Left to Right)
  const directoryPanel = document.getElementById("directoryPanel");
  gsap.set(directoryPanel, { x: -350, opacity: 0, display: "none" });

  document.querySelector(".direct").addEventListener("click", function (e) {
    e.preventDefault();
    const isHidden = directoryPanel.classList.contains("hidden");

    if (isHidden) {
      directoryPanel.classList.remove("hidden");
      directoryPanel.classList.add("visible");
      gsap.set(directoryPanel, { display: "block" });
      gsap.to(directoryPanel, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
        showOverlay(); 

    } else {
      gsap.to(directoryPanel, {
        x: -350,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          directoryPanel.classList.remove("visible");
          directoryPanel.classList.add("hidden");
          gsap.set(directoryPanel, { display: "none" });
        },
      });
    }
  });

  // UpcomingPannel GSAP (Left to Right)
  const upcomingPanel = document.getElementById("UpcomingPannel");
  gsap.set(upcomingPanel, { x: -350, opacity: 0, display: "none" });

  document.querySelector(".upcoming").addEventListener("click", function (e) {
    e.preventDefault();
    const isHidden = upcomingPanel.classList.contains("hidden");

    if (isHidden) {
      upcomingPanel.classList.remove("hidden");
      upcomingPanel.classList.add("visible");
      gsap.set(upcomingPanel, { display: "block" });
      gsap.to(upcomingPanel, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
              showOverlay(); 

    } else {
      gsap.to(upcomingPanel, {
        x: -350,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          upcomingPanel.classList.remove("visible");
          upcomingPanel.classList.add("hidden");
          gsap.set(upcomingPanel, { display: "none" });
        },
      });
    }
  });

  // Close panel buttons
  document.querySelectorAll(".close-panel").forEach((button) => {
    button.addEventListener("click", function () {
const panel = this.closest(".Upcoming-Pannel, .directory-panel, .Poll-Panel");
      if (panel) {
        gsap.to(panel, {
          x: -350,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => {
            panel.classList.remove("visible");
            panel.classList.add("hidden");
            gsap.set(panel, { display: "none" });
                      hideOverlayIfNoPanelsOpen(); 

          },
        });
      }
    });
  });

  document.getElementById("userSearch").addEventListener("input", function () {
    const filter = this.value.toLowerCase();
    const users = document.querySelectorAll(".user-list .user-card");

    users.forEach(function (user) {
      user.style.display = user.textContent.toLowerCase().includes(filter) ? "" : "none";
    });
  });
  document.querySelectorAll(".chevron-link").forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const wrapper = this.closest(".user-wrapper");
      const detailsPanel = wrapper.querySelector(".details-panel");
      if (detailsPanel) {
        detailsPanel.classList.toggle("hidden");
      }
    });
  });

  const links = document.querySelectorAll(".dashboard-line a");
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      links.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

const pollPanel = document.getElementById("PollPanel");
gsap.set(pollPanel, { x: -350, opacity: 0, display: "none" });

document.querySelector(".polls").addEventListener("click", function (e) {
  e.preventDefault();
  const isHidden = pollPanel.classList.contains("hidden");

  if (isHidden) {
    pollPanel.classList.remove("hidden");
    pollPanel.classList.add("visible");
    gsap.set(pollPanel, { display: "block" });
    gsap.to(pollPanel, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" });
            showOverlay(); 

  } else {
    gsap.to(pollPanel, {
      x: -350,
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        pollPanel.classList.remove("visible");
        pollPanel.classList.add("hidden");
        gsap.set(pollPanel, { display: "none" });
        
      },
    });
  }
});
const pollOptions = document.querySelectorAll('.poll-option');
let hasVoted = false;

pollOptions.forEach(option => {
  option.addEventListener('click', () => {
    if (hasVoted) return; 
    hasVoted = true;

    pollOptions.forEach(opt => {
      const percent = opt.getAttribute('data-result');

      const fill = document.createElement('div');
      fill.classList.add('poll-fill-bar');
      opt.appendChild(fill);

      requestAnimationFrame(() => {
        fill.style.width = percent + '%';
      });

      const percentSpan = document.createElement('span');
      percentSpan.classList.add('percent');
      percentSpan.innerText = `${percent}%`;
      opt.appendChild(percentSpan);
    });
  });
});

function showOverlay() {
  const overlay = document.getElementById("PanelOverlay");
  overlay.classList.remove("hidden");
  overlay.classList.add("visible");
}

function hideOverlayIfNoPanelsOpen() {
  const overlay = document.getElementById("PanelOverlay");
  const anyPanelOpen = document.querySelector(
    ".directory-panel.visible, .Upcoming-Pannel.visible, .Poll-Panel.visible"
  );

  if (!anyPanelOpen) {
    overlay.classList.remove("visible");
    overlay.classList.add("hidden");
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('albumModal');
  const modalImage = modal.querySelector('.modal-image');
  const modalTitle = modal.querySelector('.modal-title');
  const closeBtn = modal.querySelector('.close-btn');
  const prevBtn = modal.querySelector('.prev-btn');
  const nextBtn = modal.querySelector('.next-btn');
  const imageCounter = modal.querySelector('.image-counter');

  const albums = [
    {
      title: "Energy in Action",
      images: [
        "assets/media/solar-panels-roof-with-cloudy-sky-background.jpg",
        "assets/media/3.jpg",
        "assets/media/2.jpg",
        "assets/media/87100.jpg",
        "assets/media/3.jpg",
        "assets/media/consumption based model.jpg",
        "assets/media/2.jpg",
         "assets/media/87100.jpg",
        "assets/media/3.jpg",
        "assets/media/consumption based model.jpg",

      ]
    },
    {
      title: "Empower Together",
      images: [
        "assets/media/87100.jpg",
        "assets/media/3.jpg",
        "assets/media/consumption based model.jpg",
                "assets/media/2.jpg",

      ]
    },
    {
      title: "Power Moments",
      images: [
        "assets/media/3.jpg",
      ]
    }
  ];

  let currentAlbumIndex = 0;
  let currentImageIndex = 0;

  const albumLinks = document.querySelectorAll('.card');

  albumLinks.forEach((albumLink, index) => {
    albumLink.addEventListener('click', (e) => {
      e.preventDefault();
      currentAlbumIndex = index;
      currentImageIndex = 0;
      openModal();
    });
  });

  function updateModalImage() {
  const album = albums[currentAlbumIndex];
  modalImage.src = album.images[currentImageIndex];
  const paddedNumber = String(currentImageIndex + 1).padStart(2, '0');
  imageCounter.textContent = paddedNumber;
}


  function openModal() {
    const album = albums[currentAlbumIndex];
    modalTitle.textContent = album.title;
    updateModalImage();
    modal.classList.remove('hidden');

  }

  function closeModal() {
    modal.classList.add('hidden');

  }

  function showNext() {
    const album = albums[currentAlbumIndex];
    currentImageIndex = (currentImageIndex + 1) % album.images.length;
    updateModalImage();
  }

  function showPrev() {
    const album = albums[currentAlbumIndex];
    currentImageIndex = (currentImageIndex - 1 + album.images.length) % album.images.length;
    updateModalImage();
  }

  closeBtn.addEventListener('click', closeModal);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);


  const prevBg = modal.querySelector('.prev-bg');
const nextBg = modal.querySelector('.next-bg');

function updateModalImage() {
  const album = albums[currentAlbumIndex];
  modalImage.src = album.images[currentImageIndex];


  // Zero-padded number
  const paddedNumber = String(currentImageIndex + 1).padStart(2, '0');
  imageCounter.textContent = paddedNumber;
}


});





