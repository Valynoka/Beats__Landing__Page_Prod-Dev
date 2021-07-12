let video;
let durationControl;
let soundControl;
let intervalId;
let soundLevel;

//кнопки

const playBtn = document.querySelector(".video__player-img");
const soundBtn = document.getElementById("mic");
const playerPlayBtn = document.querySelector(".duration__img");



video = document.getElementById('player');

video.addEventListener('loadeddata', function () {

  video.addEventListener('click', playStop);

  let playButtons = document.querySelectorAll(".play");
  for (let i = 0; i < playButtons.length; i++) {
    playButtons[i].addEventListener("click", playStop);
  }

  durationControl = document.getElementById('durationLevel');
  durationControl.min = 0;
  durationControl.value = 0;
  durationControl.max = video.duration;
  durationControl.addEventListener("input", setVideoTime);

  soundBtn.addEventListener("click", soundOf);

  soundControl = document.getElementById("micLevel");
  soundControl.min = 0;
  soundControl.max = 100;
  soundControl.value = soundControl.max;

  soundControl.addEventListener("input", changeSoundVolume);
});

video.addEventListener("ended", function () {
  playBtn.classList.toggle("video__player-img--active");
  video.currentTime = 0;
  playerPlayBtn.classList.remove("active");
});

function playStop() {
  playBtn.classList.toggle('video__player-img--active');
  if (video.paused) {
    video.play();
    playerPlayBtn.classList.add("active");
    intervalId = setInterval(updateTime, 1000 / 60);

  } else {
    video.pause();
    playerPlayBtn.classList.remove("active");
    clearInterval(intervalId);
    
  }
};

function setVideoTime() {
  video.currentTime = durationControl.value;
  updateTime();
}

function updateTime() {
  durationControl.value = video.currentTime;
  const step = video.duration / 99.5;
  const precent = video.currentTime / step;

  durationControl.style.background = `linear-gradient(90deg, #E01F3D 0%, #E01F3D ${precent}%, #E01F3D 0%, #333333 ${precent}%)`;

};

function soundOf() {

  if (video.volume == 0) {
    video.volume = soundLevel;
    soundControl.value = soundLevel * 100;
    soundBtn.classList.remove("active");
  } else {
    soundLevel = video.volume;
    video.volume = 0;
    soundControl.value = 0;
    soundBtn.classList.add("active");
  }
};

function changeSoundVolume() {
  video.volume = soundControl.value / 100;

  if (video.volume == 0) {
    soundBtn.classList.add("active");
  } else {
    soundBtn.classList.remove("active");
  }


  console.log("значение volume у видео" + video.volume);
  console.log("значение value у miclevel" + soundControl.value / 10);

};




