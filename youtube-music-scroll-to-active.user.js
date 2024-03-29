// ==UserScript==
// @name            YouTube Music scroll to active periodically
// @version         2024-02-12
// @description     scrolls the active/playing item in the playlist into view
// @author          oliver-moeller
// @match           https://music.youtube.com/*
// ==/UserScript==

// since YT Music is a single-page application the script won't load when just matching "https://music.youtube.com/watch?v=*"

const intervalSeconds = 10;

let previousTitle = "";
function main() {
  if (window.location.pathname === "/watch") {
    let activeQueueItem = document.querySelector(
      'ytmusic-player-page > * ytmusic-player-queue-item[play-button-state="playing"]'
    );
    if (activeQueueItem) {
      let title = activeQueueItem.querySelector(".song-title").innerText;
      if (title !== previousTitle) {
        activeQueueItem.scrollIntoView();
        previousTitle = title;
      }
    }
  }
}

setInterval(main, intervalSeconds * 1000);
