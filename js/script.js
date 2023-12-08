// AOS ---------------------------------
AOS.init();

// MOBILE PLAYER
const mobileAudioPlayer = document.getElementById("mobile-audio-player");
const mobilePlayButton = document.querySelector(".mobile-player__play");
const mobilePauseButton = document.querySelector(".mobile-player__pause");
const mobileTimeDisplay = document.querySelector(".mobile-player__time");
const mobileProgressBar = document.querySelector(".mobile-player__progress");
const mobileProgressBarFill = document.querySelector(
  ".mobile-player__progress-fill"
);
const mobileSlider = document.querySelector(".mobile-player__slider");
let isDragging = false;
let previousVolume = 1;
mobilePlayButton.addEventListener("click", () => {
  mobileAudioPlayer.play();
  mobilePlayButton.style.display = "none";
  mobilePauseButton.style.display = "flex";
});
mobilePauseButton.addEventListener("click", () => {
  mobileAudioPlayer.pause();
  mobilePauseButton.style.display = "none";
  mobilePlayButton.style.display = "flex";
});
mobileAudioPlayer.addEventListener("timeupdate", () => {
  const currentTime = mobileAudioPlayer.currentTime;
  const duration = mobileAudioPlayer.duration;
  const elapsed = formatTime(currentTime);
  mobileTimeDisplay.textContent = `${elapsed} / ${formatTime(duration)}`;
  const progress = (currentTime / duration) * 100;
  mobileProgressBarFill.style.width = `${progress}%`;
  const sliderOffset = 5;
  const progressBarWidth = mobileProgressBar.clientWidth;
  const sliderPosition =
    (progress / 100) * progressBarWidth -
    mobileSlider.offsetWidth / 2 +
    sliderOffset;
  mobileSlider.style.left = `${sliderPosition}px`;
});
mobileSlider.addEventListener("mousedown", () => {
  isDragging = true;
  previousVolume = mobileAudioPlayer.volume;
  mobileAudioPlayer.volume = 0.1;
});
document.addEventListener("mouseup", () => {
  if (isDragging) {
    isDragging = false;
    mobileAudioPlayer.volume = previousVolume;
    updateAudioTime();
  }
});
mobileProgressBar.addEventListener("mousedown", (event) => {
  const progressBarWidth = mobileProgressBar.clientWidth;
  const clickX = event.clientX - mobileProgressBar.getBoundingClientRect().left;
  const newTime = (clickX / progressBarWidth) * mobileAudioPlayer.duration;
  mobileAudioPlayer.currentTime = newTime;
});
mobileProgressBar.addEventListener("mousemove", (event) => {
  if (isDragging) {
    updateAudioTime(event.clientX);
  }
});
// Touch events
mobileSlider.addEventListener("touchstart", (event) => {
  isDragging = true;
  previousVolume = mobileAudioPlayer.volume;
  mobileAudioPlayer.volume = 0.1;
  handleTouch(event);
});
document.addEventListener("touchend", () => {
  if (isDragging) {
    isDragging = false;
    mobileAudioPlayer.volume = previousVolume;
    updateAudioTime();
  }
});
mobileProgressBar.addEventListener("touchstart", (event) => {
  handleTouch(event);
});
mobileProgressBar.addEventListener("touchmove", (event) => {
  if (isDragging) {
    handleTouch(event);
  }
});
function handleTouch(event) {
  const progressBarWidth = mobileProgressBar.clientWidth;
  const touchX =
    event.touches[0].clientX - mobileProgressBar.getBoundingClientRect().left;
  const newTime = (touchX / progressBarWidth) * mobileAudioPlayer.duration;
  mobileAudioPlayer.currentTime = newTime;
}
function updateAudioTime(clientX) {
  const progressBarWidth = mobileProgressBar.clientWidth;
  const clickX = clientX || event.clientX;
  const newTime =
    ((clickX - mobileProgressBar.getBoundingClientRect().left) /
      progressBarWidth) *
    mobileAudioPlayer.duration;
  mobileAudioPlayer.currentTime = newTime;
}
function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// HEADER Menu ---------------------------------------------
const headerMenu = document.querySelector(".header-main-menu");
const headerBackground = document.querySelector(".header-background");
let prevScrollPos = window.pageYOffset;

window.addEventListener("scroll", function () {
  const currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    headerMenu.classList.remove("scrolled");
  } else {
    headerMenu.classList.add("scrolled");
    headerMenu.classList.add("header-main-menu__scroll");
  }

  if (currentScrollPos === 0) {
    headerMenu.classList.remove("header-main-menu__scroll");
  }

  headerBackground.style.transform = `translate3d(0, ${
    currentScrollPos * 0.5
  }px, 0)`;

  prevScrollPos = currentScrollPos;
});

document.addEventListener("DOMContentLoaded", function () {
  const headerElement = document.getElementById("header");
  headerElement.scrollIntoView({ behavior: "smooth" });
});

document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll(".header-menu-link");
  menuLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      menuLinks.forEach(function (link) {
        link.classList.remove("home-active");
      });
      this.classList.add("home-active");
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const targetPosition = targetElement.offsetTop - 100;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

// PARALLAX
window.addEventListener("scroll", function () {
  const headerBackground = document.querySelector(".header-background");
  const scrollPosition = window.pageYOffset;
  headerBackground.style.transform = `translate3d(0, ${
    scrollPosition * 0.5
  }px, 0)`;
});

// HEADER SMOOTH SCROLL
const menuLinks = document.querySelectorAll(".header-menu-link__mobile");
menuLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const targetId = link.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const offsetTop = targetElement.offsetTop;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// NEWS CONTAINER
const button = document.querySelector(".news-description-button");
const container = document.querySelector(".news-description-container");
const closeButton = document.querySelector(".news-description-close-button");

button.addEventListener("click", () => {
  button.classList.add("rounded");
  button.innerHTML = "";
  closeButton.style.display = "block";
  container.style.opacity = "1";
  container.style.visibility = "visible";
});

closeButton.addEventListener("click", () => {
  button.classList.remove("rounded");
  button.innerHTML = "Read more...";
  closeButton.style.display = "none";
  container.style.opacity = "0";
  container.style.visibility = "hidden";
});
const button2 = document.querySelector("#read-more-button-2");
const container2 = document.querySelector(
  ".news-card-image__two .news-description-container"
);
const closeButton2 = document.querySelector("#close-button-2");

button2.addEventListener("click", () => {
  button2.classList.add("rounded");
  button2.innerHTML = "";
  closeButton2.style.display = "block";
  container2.style.opacity = "1";
  container2.style.visibility = "visible";
});

closeButton2.addEventListener("click", () => {
  button2.classList.remove("rounded");
  button2.innerHTML = "Read more...";
  closeButton2.style.display = "none";
  container2.style.opacity = "0";
  container2.style.visibility = "hidden";
});

const button3 = document.querySelector("#read-more-button-3");
const container3 = document.querySelector(
  ".news-card-image__three .news-description-container"
);
const closeButton3 = document.querySelector("#close-button-3");

button3.addEventListener("click", () => {
  button3.classList.add("rounded");
  button3.innerHTML = "";
  closeButton3.style.display = "block";
  container3.style.opacity = "1";
  container3.style.visibility = "visible";
});

closeButton3.addEventListener("click", () => {
  button3.classList.remove("rounded");
  button3.innerHTML = "Read more...";
  closeButton3.style.display = "none";
  container3.style.opacity = "0";
  container3.style.visibility = "hidden";
});

// PLAYER ---------------------------------
const audioPlayer = document.querySelector(".audio-player");
const audio = new Audio("./audio/WarForLove.mp3");

console.dir(audio);

audio.addEventListener(
  "loadeddata",
  () => {
    audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
      audio.duration
    );
    audio.volume = 0.75;
  },
  false
);

const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener(
  "click",
  (e) => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
    audio.currentTime = timeToSeek;
  },
  false
);

const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
volumeSlider.addEventListener(
  "click",
  (e) => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    audioPlayer.querySelector(".controls .volume-percentage").style.width =
      newVolume * 100 + "%";
  },
  false
);

setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
    audio.currentTime
  );
}, 500);

const playBtn = audioPlayer.querySelector(".controls .toggle-play");
playBtn.addEventListener(
  "click",
  () => {
    if (audio.paused) {
      playBtn.classList.remove("play");
      playBtn.classList.add("pause");
      audio.play();
    } else {
      playBtn.classList.remove("pause");
      playBtn.classList.add("play");
      audio.pause();
    }
  },
  false
);

audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
  const volumeEl = audioPlayer.querySelector(".volume-container .volume");
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeEl.classList.remove("icono-volumeMedium");
    volumeEl.classList.add("icono-volumeMute");
  } else {
    volumeEl.classList.add("icono-volumeMedium");
    volumeEl.classList.remove("icono-volumeMute");
  }
});

//turn 128 seconds
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

// POP Up window ---------------------------------
const textIcon = document.querySelector(".text__icon");
const newIcon = document.querySelector(".new__icon");
const popupContainer = document.querySelector(".popup-container");

textIcon.style.display = "flex";
newIcon.style.display = "none";

textIcon.addEventListener("mouseover", () => {
  textIcon.style.cursor = "pointer";
  newIcon.style.cursor = "pointer";
});

textIcon.addEventListener("click", () => {
  textIcon.style.display = "flex";
  newIcon.style.display = "flex";
  popupContainer.classList.add("active");
});

newIcon.addEventListener("click", () => {
  textIcon.style.display = "flex";
  newIcon.style.display = "none";
  popupContainer.classList.remove("active");
});

popupContainer.addEventListener("click", () => {
  textIcon.style.display = "flex";
  newIcon.style.display = "none";
  popupContainer.classList.remove("active");
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (target !== textIcon && target !== newIcon) {
    textIcon.style.display = "flex";
    newIcon.style.display = "none";
    popupContainer.classList.remove("active");
  }
});

// YT VIDEO PLAYER ---------------------------------
let player;

function loadYouTubeAPI() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

const thumbnail = document.getElementById("thumbnail");
thumbnail.addEventListener("click", function () {
  const thumbnailContainer = document.getElementById("thumbnail-container");
  thumbnailContainer.innerHTML = "";

  const playerContainer = document.createElement("div");
  playerContainer.id = "player";
  thumbnailContainer.appendChild(playerContainer);

  player = new YT.Player(playerContainer, {
    height: "100%",
    width: "100%",
    videoId: "VSoJcLOggZs",
    playerVars: {
      autoplay: 1,
      controls: 1,
    },
    events: {
      onReady: onPlayerReady,
    },
  });
});

const videoLinks = document.querySelectorAll("#video-links__playlist a");
videoLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const videoId = this.href.split("v=")[1];
    const thumbnailContainer = document.getElementById("thumbnail-container");
    thumbnailContainer.innerHTML = "";

    const playerContainer = document.createElement("div");
    playerContainer.id = "player";
    thumbnailContainer.appendChild(playerContainer);
    player = new YT.Player(playerContainer, {
      height: "100%",
      width: "100%",
      videoId: videoId,
      playerVars: {
        autoplay: 1,
        controls: 1,
      },
      events: {
        onReady: onPlayerReady,
      },
    });
  });
});

// SHADOW Desktop and mobile
function onPlayerReady(event) {
  const player = event.target;
  const iframe = player.getIframe();
  const shadowAnimationDuration = 0.3; // Длительность анимации в секундах

  function addShadow() {
    iframe.style.transition = `box-shadow ${shadowAnimationDuration}s ease-in-out`;
    iframe.style.boxShadow = "0 0 1000px 0 rgba(0, 0, 0, 0.5)";
  }

  function removeShadow() {
    iframe.style.transition = `box-shadow ${shadowAnimationDuration}s ease-in-out`;
    iframe.style.boxShadow =
      "0 0 115px 0 rgba(18, 129, 101, 0.199), 0px 0px 100px 50px rgba(71, 136, 180, 0.144), 25px 25px 110px 0 rgba(251, 0, 255, 0.274)";
  }

  player.addEventListener("onStateChange", function (event) {
    if (event.data === YT.PlayerState.PAUSED) {
      addShadow();
    } else if (event.data === YT.PlayerState.PLAYING) {
      removeShadow();
    }
  });
}

window.onload = loadYouTubeAPI;

// Player Return ---------------------------------
const links = document.querySelectorAll("#video-links__playlist a");

links.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    const container = document.getElementById("for-link-yt-player");
    container.scrollIntoView({ behavior: "smooth" });
  });
});

// GALLERY ---------------------------------
document.getElementsByClassName("close")[0].onclick = function () {
  const modal = document.getElementById("myModal");
  const headerMainMenu = document.querySelector(".header-main-menu");

  modal.style.display = "none";
  headerMainMenu.classList.remove("back");
  headerMainMenu.style.display = "flex";
};
document.addEventListener("DOMContentLoaded", function () {
  const imageElements = document.querySelectorAll(".g-img__hover");
  const modal = document.getElementById("myModal");
  const headerMainMenu = document.querySelector(".header-main-menu");

  imageElements.forEach((image) => {
    image.addEventListener("click", function () {
      modal.style.display = "flex";
      headerMainMenu.classList.add("back");
      headerMainMenu.style.display = "none";
    });
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      headerMainMenu.classList.remove("back");
      headerMainMenu.style.display = "flex";
    }
  });
});

// SWIPER GALLERY MODAL ---------------------------------
const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// BOX SHADOW SWIPER ---------------------------------
const checkbox = document.getElementById("highload1");
const swiperShadow = document.querySelector(".swiper");

checkbox.addEventListener("change", function () {
  if (this.checked) {
    swiperShadow.style.boxShadow =
      "0 0 115px 0 rgba(36, 0, 65, 0.705), 0px 0px 100px 50px rgba(0, 105, 175, 0.226), 25px 25px 1100px 0 rgba(254, 211, 255, 0.438)";
  } else {
    swiperShadow.style.boxShadow = "none";
  }
});

// ROTATE

// EVENTS SPLIDE SWIPER ---------------------------------
const splide = new Splide(".splide", {
  perMove: 1,
  perPage: 3,
  gap: "1vw",

  breakpoints: {
    768: {
      perPage: 1,
      gap: ".6rem",
      height: "100%",
    },
  },
});

splide.mount();

// FOOTER
