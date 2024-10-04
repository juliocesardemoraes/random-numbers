const sortDiv = document.getElementById("sort-list");
let arrayOfPossibilites = [];
let colors = [];

function HSVtoRGB(h, s, v) {
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
    (s = h.s), (v = h.v), (h = h.h);
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    case 0:
      (r = v), (g = t), (b = p);
      break;
    case 1:
      (r = q), (g = v), (b = p);
      break;
    case 2:
      (r = p), (g = v), (b = t);
      break;
    case 3:
      (r = p), (g = q), (b = v);
      break;
    case 4:
      (r = t), (g = p), (b = v);
      break;
    case 5:
      (r = v), (g = p), (b = q);
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}
const createElementInDom = (i) => {
  const elTag = document.createElement("div");
  // elTag.id = i;
  elTag.classList.add("progress");

  const progressTag = document.createElement("div");
  progressTag.id = i;
  //   progressTag.style.width = "30px";
  //   progressTag.style.height = "30px";
  progressTag.classList.add("progress-value");

  const randHue = Math.random() + 0.618033988749895;

  const colorBack = HSVtoRGB(randHue, 0.5, 0.95);
  console.log(colorBack);

  const colorText = "#fff";

  progressTag.style.background = `rgb(${colorBack.r}, ${colorBack.g}, ${colorBack.b})`;
  progressTag.style.color = colorText;

  const progressTagText = document.createElement("span");
  progressTagText.textContent = i;
  progressTagText.id = `${i}-text`;

  progressTag.append(progressTagText);
  elTag.append(progressTag);

  sortDiv.append(elTag);
};

// Creating the array of numbers
const createArray = (length) => {
  for (let i = 1; i < length; i++) {
    arrayOfPossibilites.push({ [i]: 0 });
    createElementInDom(i);
  }
};

createArray(10);
console.log(arrayOfPossibilites);

// Generating the numbers

function getRandomInt(max, min) {
  return Math.floor(Math.random() * max);
}

function delay(i) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const documentGetListItem = document.getElementById(`${i + 1}`);
      const documentGetListItemText = document.getElementById(`${i + 1}-text`);

      arrayOfPossibilites[i][`${i + 1}`] += 20;

      const value = arrayOfPossibilites[i][`${i + 1}`];

      if (documentGetListItem) {
        documentGetListItem.style.width = `${value}px`;
        documentGetListItemText.textContent = i + 1 + " - " + value;
      }
      resolve();
    }, 1);
  });
}

function resetArray() {
  arrayOfPossibilites = [];
  createArray(10);
}

async function runDelays() {
  for (let i = 0; i < 100; i++) {
    const index = getRandomInt(arrayOfPossibilites.length);
    await delay(index);

    if (i === 999) {
      console.log("FINALIZOU");
    }
  }
}

async function sortear(event) {
  console.log(event.target);
  sortDiv.innerHTML = "";

  event.target.disabled = true;
  resetArray();
  await runDelays();
  event.target.disabled = false;
}
