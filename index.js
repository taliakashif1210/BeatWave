const songs = [
  {
    title: "Ethereal Dreams",
    artist: "Aurora Sky",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "assets/song1.jpg"
  },
  {
    title: "City Nights",
    artist: "Neon Soul",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "assets/song2.jpg"
  },
  {
    title: "Sunset Boulevard",
    artist: "Dreamwave",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "assets/song3.jpg"
  },
  {
    title: "Rainy Café",
    artist: "Loft Beats",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    cover: "assets/song4.jpg"
  },
  {
    title: "Galaxy Flow",
    artist: "Nova",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    cover: "assets/song5.jpg"
  }
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const playIcon = document.getElementById("play-icon");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const seek = document.getElementById("seek");
const currentTimeEl = document.getElementById("current");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");
const volumeIcon = document.getElementById("volume-icon");
const playlistEl = document.getElementById("playlist");
const bars = document.getElementById("bars");

let currentSong = 0;
let isPlaying = false;

// Initialize playlist
songs.forEach((song, index) => {
  const el = document.createElement("div");
  el.classList.add("song");
  el.innerHTML = `
    <div class="thumb"><img src="${song.cover}" alt=""></div>
    <div class="meta-s"><div class="t">${song.title}</div><div class="a">${song.artist}</div></div>
  `;
  el.addEventListener("click", () => loadSong(index, true));
  playlistEl.appendChild(el);
});

const songEls = document.querySelectorAll(".song");

function loadSong(index, playNow = false) {
  currentSong = index;
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;

  songEls.forEach(el => el.classList.remove("active"));
  songEls[index].classList.add("active");

  if (playNow) playSong();
}

function playSong() {
  isPlaying = true;
  audio.play();

  // Change play icon → pause icon
  playIcon.classList.replace("fa-play", "fa-pause");

  bars.style.visibility = "visible";
}

function pauseSong() {
  isPlaying = false;
  audio.pause();

  // Change pause icon → play icon
  playIcon.classList.replace("fa-pause", "fa-play");

  bars.style.visibility = "hidden";
}


playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong, true);
});

nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong, true);
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    seek.value = (audio.currentTime / audio.duration) * 100;
    updateTime();
  }
});

seek.addEventListener("input", () => {
  if (audio.duration) {
    audio.currentTime = (seek.value / 100) * audio.duration;
  }
});

audio.addEventListener("ended", () => nextBtn.click());

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

let isMuted = false;

volumeIcon.addEventListener("click", () => {
  if (isMuted) {
    // Unmute
    audio.muted = false;
    volumeIcon.classList.replace("fa-volume-xmark", "fa-volume-high");
    isMuted = false;
  } else {
    // Mute
    audio.muted = true;
    volumeIcon.classList.replace("fa-volume-high", "fa-volume-xmark");
    isMuted = true;
  }
});


function updateTime() {
  const current = formatTime(audio.currentTime);
  const total = formatTime(audio.duration);
  currentTimeEl.textContent = current;
  durationEl.textContent = total;
}

function formatTime(time) {
  if (isNaN(time)) return "0:00";
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

loadSong(currentSong);
