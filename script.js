// === Playlist Data (can later move to playlist.json) ===
const playlist = [
  { title: "Track 1", file: "music/track1.mp3" },
  { title: "Track 2", file: "music/track2.mp3" },
  { title: "Track 3", file: "music/track3.mp3" }
];

// === Elements ===
let currentIndex = 0;
const audio = document.getElementById("audio");
const playlistEl = document.getElementById("playlist");

// === Build Playlist UI ===
playlist.forEach((track, index) => {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${track.title}</span>
    <a href="${track.file}" download>⬇️ Download</a>
  `;
  li.addEventListener("click", () => loadTrack(index));
  playlistEl.appendChild(li);
});

// === Load Track Function ===
function loadTrack(index) {
  currentIndex = index;
  audio.src = playlist[index].file;
  audio.play();
  highlightActive();
}

// === Highlight Active Track ===
function highlightActive() {
  const items = playlistEl.querySelectorAll("li");
  items.forEach((li, idx) => {
    li.style.background = idx === currentIndex ? "#e6f0ff" : "transparent";
  });
}

// === Controls ===
document.getElementById("play").addEventListener("click", () => audio.play());
document.getElementById("pause").addEventListener("click", () => audio.pause());

document.getElementById("next").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(currentIndex);
});

document.getElementById("prev").addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentIndex);
});

// === Auto-play Next Track ===
audio.addEventListener("ended", () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(currentIndex);
});

// === Initialize ===
loadTrack(currentIndex);

