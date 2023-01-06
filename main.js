const worldScreen = document.querySelectorAll(".world")[0];
const w = 80;
const h = 50;
let world = [];

function init() {
  for (let i = 0; i < w; i++) {
    world.push([]);
    for (let j = 0; j < h; j++) {
      world[i].push(getRandomNumber());
    }
  }

  draw();
  setInterval(() => {
    draw();
    evolution();
  }, 100);
}
init();

function draw() {
  worldScreen.innerHTML = "";
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      const divElement = document.createElement("div");
      if (world[i][j]) divElement.classList.add("live");
      worldScreen.appendChild(divElement);
    }
  }
}

function evolution() {
  let newWorld = world;
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      let lives = 0;
      for (let id = i - 1; id <= i + 1; id++) {
        for (let jd = j - 1; jd <= j + 1; jd++) {
          let iIndex = id < 0 ? w - 1 : id == w ? 0 : id;
          let jIndex = jd < 0 ? h - 1 : jd == h ? 0 : jd;

          if (world[iIndex][jIndex]) lives++;
        }
      }
      if (world[i][j]) lives--;

      newWorld[i][j] = lives == 3 || (lives == 2 && world[i][j]);
    }
  }
  world = newWorld;
}

function getRandomNumber() {
  return Math.round(Math.random());
}
