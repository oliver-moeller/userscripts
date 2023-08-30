// ==UserScript==
// @name            MediaMarkt & Saturn Load More
// @description     Adds a "Load x Times" button on the MediaMarkt and Saturn "Fundgrube" pages
// @match           https://www.mediamarkt.de/*
// @match           https://www.saturn.de/*
// @author          oliver-moeller
// @version         1.0
// ==/UserScript==

const xTimes = 20;
const originalButtonText = "Mehr Produkte laden"; //text on the original button, which will then be clicked x times
const newButtonText = xTimes + "x laden"; //may not contain originalButtonText

function querySelectorAllContainsText(selector, text) {
  return [...document.querySelectorAll(selector)].filter(element => {
    return RegExp(text).test(element.textContent);
  });
}

function loadXTimes() {
  const scrollY = window.scrollY;
  let sucCount = 0;
  let errCount = 0;
  let buttons;
  const interval = setInterval(() => {
    buttons = querySelectorAllContainsText("button", originalButtonText); //the button is always regenerated, requery every time
    if (!buttons.length) {
      errCount++;
    } else {
      errCount = 0;
      sucCount++;
      buttons.forEach(el => {
        el.click();
      });
    }
    if (sucCount >= xTimes || errCount >= 5) {
      clearInterval(interval);
      console.log(window.scrollY);
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 500);
    }
  }, 250);
}

const button = document.createElement("button");
button.textContent = newButtonText;
button.onclick = loadXTimes;

button.style.position = "fixed";
button.style.right = "20px";
button.style.bottom = "20px";

button.style.cursor = "pointer";
button.style.backgroundColor = "red";
button.style.padding = "10px";
button.style.borderRadius = "5px";
button.style.borderStyle = "none";
button.style.fontWeight = "bold";
button.style.fontSize = "16px";
button.style.color = "white";

document.body.appendChild(button);
