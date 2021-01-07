//jshint esversion:6

const navSlide = () => {
const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

toggleButton.addEventListener('click', () => {
  navbarLinks.classList.toggle('active');

  toggleButton.classList.toggle("toggle");
});
};
navSlide();
