let myMap;

const init = () => {
  myMap = new ymaps.Map("ymap", {
    center: [55.751631, 37.595478],
    zoom: 14,
    controls: []
  });

  const coords = [
    [55.758918, 37.582689],
    [55.745295, 37.581555],
    [55.750115, 37.603775],
    [55.752420, 37.614332]
  ];

  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: "default#image",
    iconImageHref: "./img/marker.svg",
    iconImageSize: [46,57],
    iconImageOffset: [-35, -52]
  });

  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  });

  myMap.geoObjects.add(myCollection);

  myMap.behaviors.disable("scrollZoom");
};
ymaps.ready(init);