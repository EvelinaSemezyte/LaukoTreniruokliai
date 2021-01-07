//jshint esversion:6
 //Nustatomas didinimo kiekis
let scaleAmount = 0.002;

//Sukuriamas nuotraukos scrolinant priartinimo/tolinimo funkcija
function scrollZoom(){
const images = document.querySelectorAll(".zoom img");
//Nustatomo scrolling padetis
let scrollPosY = 0;

  const observerConfig = {
    rootMargin: "0% 0% 0% 0%",
    threshold: 0
  };
  // Išskiriam nuotraukų objektus ir patikriname ar tas objektas yra matomas,
  //taip galime pritaikyti zoom funkcija atskirai kiekvienam nuotraukos objektui

  images.forEach(image => {
    let isVisible = false;

    const observer = new IntersectionObserver((elements, self) => {
      elements.forEach(element => {
          isVisible = element.isIntersecting;
      });
    }, observerConfig);

    observer.observe(image);

    // Nustatoma pradinė vaizdo skalė įkeliant puslapį

    image.style.transform = `scale(${1 + scaleAmount * percentageSeen(image)})`;

    window.addEventListener("scroll", () => {
      if (isVisible) {
        scrollPosY = window.pageYOffset;
        image.style.transform = `scale(${1 + scaleAmount * percentageSeen(image)})`;
      }
    });
  });

  // Apskaičiuoja procenta, pagal tai kada vaizdas buvo matomas ir kada nebėra matomas
  // Gaunamas pirminio mazgo(node) aukštis

  function percentageSeen(element) {
    const parent = element.parentNode;
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const elPosY = parent.getBoundingClientRect().top + scrollY;
    const borderHeight = parseFloat(getComputedStyle(parent).getPropertyValue('border-bottom-width')) + parseFloat(getComputedStyle(element).getPropertyValue('border-top-width'));

    const elHeight = parent.offsetHeight + borderHeight;

    if (elPosY > scrollY + viewportHeight) {
      // nepasiekėm nuotraukos
      return 0;
    } else if (elPosY + elHeight < scrollY) {
      // Jei baigėme slinkti per puslapį
      return 100;
    } else {
      // Kai nuotrauka yra matoma
      const distance = scrollY + viewportHeight - elPosY;
      let percentage = distance / ((viewportHeight + elHeight) / 500);
      percentage = Math.round(percentage);
      return percentage;
    }
  }
}

scrollZoom();
