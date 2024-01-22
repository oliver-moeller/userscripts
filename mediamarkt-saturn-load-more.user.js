// ==UserScript==
// @name            MediaMarkt & Saturn Load More
// @description     Adds a "Load x Times" button on the MediaMarkt and Saturn "Fundgrube" pages
// @match           https://www.mediamarkt.de/de/data/fundgrube
// @match           https://www.saturn.de/de/data/fundgrube
// @author          oliver-moeller
// @version         1.01
// ==/UserScript==

const xTimes = 10;
const originalButtonText = "Mehr Produkte laden"; //text on the original button, which will then be clicked x times
const newButtonText = xTimes + "x laden"; //may not contain originalButtonText

function querySelectorAllContainsText(selector, text) {
  return [...document.querySelectorAll(selector)].filter(element => {
    return RegExp(text).test(element.textContent);
  });
}

function loadXTimes() {
  spinner.style.display = "inline-block";
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
      setTimeout(() => {
        window.scrollTo(0, scrollY);
        spinner.style.display = "none";
      }, 500);
    }
  }, 250);
}

const color = /.*saturn.*/.test(window.location.hostname) ? "#ef7c00" : "#df0000";
const button = document.createElement("button");
button.onclick = loadXTimes;
button.style.cssText = `
  position: fixed;
  right: 20px;
  bottom: 20px;

  cursor: pointer;
  background-color: ${color};
  padding: 10px;
  border-radius: 5px;
  border-style: none;
  font-weight: bold;
  font-size: 16px;
  color: white;

  align-items: center;
  display: flex;
`;
document.body.appendChild(button);

const spinner = document.createElement("span");
spinner.style.cssText = `
  width: 16px;
  height: 16px;
  margin-right: 8px;
  border: 2px solid white;
  border-right-color: transparent;
  border-radius: 50%;
  box-sizing: border-box;
  display: none;
`;
spinner.animate(
  [
    {
      transform: "rotate(0deg)",
    },
    {
      transform: "rotate(360deg)",
    },
  ],
  {
    duration: 1000,
    iterations: Infinity,
  }
);
button.appendChild(spinner);

const label = document.createElement("span");
label.textContent = newButtonText;
button.appendChild(label);
