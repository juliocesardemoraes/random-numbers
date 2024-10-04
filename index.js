const sortDiv = document.getElementById("sort-list");
let arrayOfPossibilites = [];

const createElementInDom = (i) => {
  const elTag = document.createElement("div");
  // elTag.id = i;
  elTag.classList.add("progress");

  const progressTag = document.createElement("div");
  progressTag.id = i;
  //   progressTag.style.width = "30px";
  //   progressTag.style.height = "30px";
  progressTag.classList.add("progress-value");

  const progressTagText = document.createElement("span");
  progressTagText.textContent = i;

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

      arrayOfPossibilites[i][`${i + 1}`] += 20;

      const value = arrayOfPossibilites[i][`${i + 1}`];

      if (documentGetListItem) {
        documentGetListItem.style.width = `${value}px`;
        resolve();
      }
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
