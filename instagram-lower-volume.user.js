// ==UserScript==
// @name             Instagram lower volume
// @version          1.0
// @author           oliver-moeller
// @match            https://www.instagram.com/reel/*
// ==/UserScript==

const volume = 0.1;

let loop = setInterval(() => {
  let vid = document.getElementsByTagName("video")[0];
  if (vid) {
    vid.volume = volume;
    clearInterval(loop);
  }
});
