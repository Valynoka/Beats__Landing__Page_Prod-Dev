const slider = $(".assortment__list").bxSlider({
  pager: false,
  controls: false
});

$(".assortment__control--left").click((e) => {
  e.preventDefault();
  slider.goToPrevSlide();
});

$(".assortment__control--right").click((e) => {
  e.preventDefault();
  slider.goToNextSlide();
});