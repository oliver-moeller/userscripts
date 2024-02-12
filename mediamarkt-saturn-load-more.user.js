// ==UserScript==
// @name            MediaMarkt & Saturn Load More
// @version         2024-02-12
// @description     Adds a "Load x Times" button on the MediaMarkt and Saturn "Fundgrube" pages
// @author          oliver-moeller
// @match           https://www.mediamarkt.de/de/data/fundgrube
// @match           https://www.saturn.de/de/data/fundgrube
// ==/UserScript==

const xTimes = 5;
const originalButtonText = "Mehr Produkte laden"; //text on the original button, which will then be clicked x times
const newButtonText = xTimes + "x laden"; //may not contain originalButtonText

function querySelectorAllContainsText(selector, text) {
  return [...document.querySelectorAll(selector)].filter(element => {
    return RegExp(text).test(element.textContent);
  });
}

function loadXTimes() {
  spinner.style.display = "inline-block";
  //const scrollY = window.scrollY;
  const scrollTop = document.body.scrollTop;
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
        //window.scrollTo(0, scrollY);
        document.body.scrollTop = scrollTop;
        spinner.style.display = "none";
      }, 500);
    }
  }, 250);
}

const color = /.*saturn.*/.test(window.location.hostname) ? "#ef7c00" : "#df0000";
const button = document.createElement("button");
button.onclick = loadXTimes;
button.style.cssText = `
  display: flex;
  position: fixed;
  right: 20px;
  bottom: 20px;
  align-items: center;
  cursor: pointer;
  border-style: none;
  border-radius: 5px;
  background-color: ${color};
  padding: 10px;
  color: white;
  font-weight: bold;
  font-size: 16px;
`;
document.body.appendChild(button);

const spinner = document.createElement("span");
spinner.style.cssText = `
  display: none;
  box-sizing: border-box;
  margin-right: 8px;
  border: 2px solid white;
  border-right-color: transparent;
  border-radius: 50%;
  width: 16px;
  height: 16px;
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
