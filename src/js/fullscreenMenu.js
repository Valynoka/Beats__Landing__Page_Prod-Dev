const fullscreenButton = document.querySelector(".hamburger");
const fullscreenMenu = document.querySelector(".burger-menu");

fullscreenButton.addEventListener("click", function (e) {
  e.preventDefault();
  fullscreenButton.classList.toggle("hamburger--active");
  fullscreenMenu.classList.toggle("burger-menu--active");
  $("body").toggleClass("lock");
});

fullscreenMenu.addEventListener("click", (e) => {
  const target = e.target;

  if (target.classList.contains("burger-menu-link")) {
    toggleMenu();
  }
});


function toggleMenu () {
  fullscreenButton.classList.toggle("hamburger--active");
  fullscreenMenu.classList.toggle("burger-menu--active");
  $("body").toggleClass("lock");
};