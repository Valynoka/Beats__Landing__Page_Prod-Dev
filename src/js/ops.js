const sections = $("section");
const display = $(".wrapper__container");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

console.log("isMobile", isMobile);

let inScroll = false

sections.first().addClass("active");

const performTransition = sectionEq => {
  if (inScroll === false) {
    inScroll = true;
    const position = sectionEq * -100;

    const currentSection = sections.eq(sectionEq);
    // const menuTheme = currentSection.attr("data-sidemenu-theme");
    const sideMenu = $(".fixed__navigation");

    display.css({
      transform: `translateY(${position}%)`
    });

    sections.eq(sectionEq).addClass("active").siblings().removeClass("active");


    setTimeout(() => {
      inScroll = false;

      sideMenu
        .find(".fixed__menu-item")
        .eq(sectionEq)
        .addClass("fixed__menu-item--active")
        .siblings()
        .removeClass("fixed__menu-item--active");
    }, 1300);
  }
};
performTransition();

const scrollViewport = direction => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();
  if ($("body").hasClass("lock") || $("body").hasClass("fancybox-active")) return;
  if (direction === "next" && nextSection.length) {
    performTransition(nextSection.index());

  }

  if (direction === "prev" && prevSection.length) {
    performTransition(prevSection.index());

  }
};

$(window).on("wheel", (e) => {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0) {
    scrollViewport("next");
  }

  if (deltaY < 0) {
    scrollViewport("prev");
  }
});

$(window).on("keydown", e => {
  const tagName = e.target.tagName.toLowerCase();

  if (tagName !== "input" && tagName !== "textarea") {
    switch (e.keyCode) {
      case 38:
        scrollViewport("prev");
        break;

      case 40:
        scrollViewport("next");
        break;
    }
  }
});

$(".wrapper").on("touchmove", e => e.preventDefault());

$("[data-scroll-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
});

if (isMobile) { 
  $("body").swipe({
    swipe: function (event, direction) {
      // const scroller = scrollViewport();
      // let scrollDirection = "";

      if (direction == "up") scrollViewport ("next");
      if (direction == "down") scrollViewport ("prev");

      // scroller[scrollDirection]();

    }
  });
};

