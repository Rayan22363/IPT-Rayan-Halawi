document.addEventListener('DOMContentLoaded', function(event) {
  

gsap.from(".navbar-nav .nav-item", {
  y: -20,
  opacity: 0,
  duration: 0.6,
  stagger: 0.2,
  ease: "back.out(1.7)"
});
document.querySelectorAll(".btn-danger").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, { scale: 1.1, duration: 0.2 });
  });
  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, { scale: 1, duration: 0.2 });
  });
});
gsap.from(".employee", {
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.3,
  scrollTrigger: {
    trigger: ".welcome",
    start: "top 70%",
  }
});
gsap.registerPlugin(ScrollTrigger);

gsap.from(".news-item", {
  scrollTrigger: {
    trigger: ".news",
    start: "top 80%", 
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: "power2.out",
  stagger: 0.3 
});


gsap.registerPlugin(ScrollTrigger);

const swiper = new Swiper('.hero-slider', {
    loop: true, 
    autoplay: {
        delay: 5000, 
    },
    on: {
        slideChangeTransitionStart: function () {
            const activeSlide = document.querySelector('.swiper-slide-active .slide-header');
            
            if (activeSlide) {
                gsap.fromTo(activeSlide,
                    { y: 50, opacity: 0 }, 
                    {
                        y: 0,
                        opacity: 1,
                        duration: 3, 
                        ease: "power2.out" 
                    });
            }
        }
    }
});
 

}); 
window.addEventListener("load", () => {
  const firstHeader = document.querySelector('.swiper-slide-active .slide-header');
  if (firstHeader) {
      gsap.fromTo(firstHeader,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 4, ease: "power2.out" });
  }
});
gsap.utils.toArray(".image-card, .image-card2, .image-card3").forEach(card => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
    },
    y: 13,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
  });
});

//modal
function animateModalOpen(modalEl) {
  gsap.fromTo(modalEl,
    { opacity: 0 },
    { opacity: 1, duration: 0.5, ease: "power2.out" }
  );
}

//img
function animateImageWrapper(wrapperEl) {
  gsap.fromTo(wrapperEl,
    { opacity: 0, scale: 0.95 },
    { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById('albumModal');
  const modalImage = modal?.querySelector('.modal-image');
  const imageWrapper = modal?.querySelector('.image-wrapper');
  const albumLinks = document.querySelectorAll('.card');

  if (!modal || !modalImage || !imageWrapper) return;

  const observer = new MutationObserver(() => {
    animateImageWrapper(imageWrapper);
  });
  observer.observe(modalImage, { attributes: true, attributeFilter: ['src'] });

  albumLinks.forEach(link => {
    link.addEventListener("click", () => {
      setTimeout(() => {
        animateModalOpen(modal);
        animateImageWrapper(imageWrapper);
      }, 50); // wait a bit so src updates first
    });
  });
});
