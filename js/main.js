const menuToggle = document.querySelector(".menu-toggle");
const mobileNavigation = document.querySelector(".mobile-navigation");
const closeButton = document.querySelector(".menu-close");

if (menuToggle && mobileNavigation && closeButton) {
  const mobileLinks = mobileNavigation.querySelectorAll("a");

  const setMenuOpen = (isOpen, { returnFocus = false } = {}) => {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
    mobileNavigation.setAttribute("aria-hidden", String(!isOpen));
    mobileNavigation.inert = !isOpen;
    mobileNavigation.classList.toggle("is-open", isOpen);

    if (isOpen) {
      closeButton.focus();
    } else if (returnFocus) {
      menuToggle.focus();
    }
  };

  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  closeButton.addEventListener("click", () => {
    setMenuOpen(false, { returnFocus: true });
  });

  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false, { returnFocus: true }));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false, { returnFocus: true });
    }
  });

  window.matchMedia("(min-width: 761px)").addEventListener("change", (event) => {
    if (event.matches && menuToggle.getAttribute("aria-expanded") === "true") {
      setMenuOpen(false);
    }
  });
}

const ninjaCarousel = document.querySelector(".ninja-carousel");

if (ninjaCarousel) {
  const slide = ninjaCarousel.querySelector(".ninja-carousel__slide");
  const image = ninjaCarousel.querySelector(".ninja-carousel__image");
  const caption = ninjaCarousel.querySelector(".ninja-carousel__caption");
  const previousButton = ninjaCarousel.querySelector(".ninja-carousel__button--previous");
  const nextButton = ninjaCarousel.querySelector(".ninja-carousel__button--next");
  const pagination = ninjaCarousel.querySelector(".ninja-carousel__pagination");
  const slides = [
    {
      image: "public/images/tartarugas.png",
      alt: "Personagens Tartarugas Ninja em miniaturas colecionáveis",
      caption: "Tartarugas Ninja",
    },
    {
      image: "public/images/samurai.png",
      alt: "Personagens da coleção ninja em miniaturas colecionáveis",
      caption: "Coleção Ninja",
    },
  ];
  let activeIndex = 0;

  const indicators = slides.map((item, index) => {
    const indicator = document.createElement("button");
    indicator.className = "ninja-carousel__indicator";
    indicator.type = "button";
    indicator.setAttribute("aria-label", `Mostrar ${item.caption}`);
    indicator.addEventListener("click", () => showSlide(index));
    pagination.append(indicator);
    return indicator;
  });

  const showSlide = (index) => {
    activeIndex = (index + slides.length) % slides.length;
    const item = slides[activeIndex];
    image.src = item.image;
    image.alt = item.alt;
    caption.textContent = item.caption;
    slide.classList.remove("ninja-carousel__slide--arriving");
    void slide.offsetWidth;
    slide.classList.add("ninja-carousel__slide--arriving");

    indicators.forEach((indicator, indicatorIndex) => {
      if (indicatorIndex === activeIndex) {
        indicator.setAttribute("aria-current", "true");
      } else {
        indicator.removeAttribute("aria-current");
      }
    });
  };

  previousButton.addEventListener("click", () => showSlide(activeIndex - 1));
  nextButton.addEventListener("click", () => showSlide(activeIndex + 1));
  ninjaCarousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(activeIndex + 1);
    }
  });

  showSlide(activeIndex);
}

const menuSection = document.querySelector(".menu-section");

if (menuSection) {
  const filterButtons = menuSection.querySelectorAll("[data-menu-filter]");
  const menuCards = menuSection.querySelectorAll("[data-menu-category]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.menuFilter;

      filterButtons.forEach((filterButton) => {
        filterButton.setAttribute(
          "aria-pressed",
          String(filterButton === button),
        );
      });

      menuCards.forEach((card) => {
        card.hidden =
          selectedFilter !== "all" &&
          card.dataset.menuCategory !== selectedFilter;
      });
    });
  });
}