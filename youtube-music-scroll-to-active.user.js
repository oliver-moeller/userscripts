// ==UserScript==
// @name             YouTube Music scroll to active periodically
// @match            https://music.youtube.com/*
// @version          1.0
// @description      scrolls the active/playing item in the playlist into view
// ==/UserScript==

// since YT Music is a single-page application the script won't load when just matching "https://music.youtube.com/watch?v=*"

const intervalSeconds = 60;

function main() {
  if (window.location.pathname === "/watch") {
    let activeQueueItem = document.querySelector('.modular > * ytmusic-player-queue-item[play-button-state="playing"]');
    if (activeQueueItem) {
      activeQueueItem.scrollIntoView();
    }
  }
}

setInterval(main, intervalSeconds * 1000);
