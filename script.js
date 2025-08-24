// === Elements ===
let currentIndex = 0;
const audio = document.getElementById("audio");
const playlistEl = document.getElementById("playlist");
let playlist = [];

// === Fetch Playlist from JSON ===
fetch("data/playlist.json")
  .then(response => response.json())
  .then(data => {
    playlist = data;
    buildPlaylist();
    loadTrack(currentIndex);
  })
  .catch(error => console.error("Error loading playlist:", error));

// === Build Playlist UI ===
function buildPlaylist() {
  playlistEl.innerHTML = ""; // Clear existing
  playlist.forEach((track, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${track.title}</span>
      <a href="${track.file}" download>⬇️ Download</a>
    `;
    li.addEventListener("click", () => loadTrack(index));
    playlistEl.appendChild(li);
  });
}

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
