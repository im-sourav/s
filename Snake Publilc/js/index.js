const movement = ID("movement");
createCanvas(2000, 2000);

const scale = 100;
let FPS = 10;
let score = 0;
let gamePause = false;
let lastMove = true;
let snakeIncrige = false;
let snakeBody = [];
let energyTime = 0;
let blink = 0;
let blinkTime = scale / 48;

let s = new Snake();

// sereen movement even listaner
let startX = 0,
  Xstore = 0,
  startY = 0,
  Ystore = 0;

function whenTrue(x, y) {
  s.dir = { x: x, y: y };
  lastMove = false;
}
movement.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});
movement.addEventListener("touchmove", (e) => {
  Xstore = e.touches[0].clientX - startX;
  Ystore = e.touches[0].clientY - startY;
  if (lastMove) {
    if (Xstore >= Ystore && Xstore >= 30 && s.dir.x === 0) {
      whenTrue(1, 0); // right
    } else if (Xstore <= Ystore && Xstore <= -30 && s.dir.x === 0) {
      whenTrue(-1, 0); // left
    } else if (Xstore <= Ystore && Ystore >= 30 && s.dir.y === 0) {
      whenTrue(0, 1); // down
    } else if (Xstore >= Ystore && Ystore <= -30 && s.dir.y === 0) {
      whenTrue(0, -1); // up
    }
  }
  if (sr(Xstore) > 30 || sr(Ystore) > 30) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    Xstore = 0;
    Ystore = 0;
  }
});
// movement.addEventListener("touchend", () => {});

// desktop event listener
document.addEventListener("keydown", (e) => {
  if (e.keyCode == 39 && s.dir.x === 0) {
    whenTrue(1, 0); // right
  } else if (e.keyCode == 37 && s.dir.x === 0) {
    whenTrue(-1, 0); // left
  } else if (e.keyCode == 38 && s.dir.y === 0) {
    whenTrue(0, -1); // up
  } else if (e.keyCode == 40 && s.dir.y === 0) {
    whenTrue(0, 1); // down
  }
});

// reload blink time
let loop = () => {
  blinkTime = blinkTime == scale / 48 ? -scale / 48 : scale / 48;
  if (!gamePause) {
    setTimeout(loop, 1000);
  }
};
loop();

function animation() {
  clearRect();
  rect("#000000");
  s.drawNormalFood();
  s.drawEnergylFood();

  // when snake food eat then spam particle
  if (s.particle.length != 0) {
    for (let i = 0; i < s.particle.length; i++) {
      arc(
        `${s.particle[i].color}${Math.floor(
          9 * s.particle[i].alpha
        )}${Math.floor(9 * s.particle[i].alpha)}`,
        s.particle[i].x * scale + scale / 2,
        s.particle[i].y * scale + scale / 2,
        s.particle[i].size
      );
      s.particle[i].x += s.particle[i].vx;
      s.particle[i].y += s.particle[i].vy;
      s.particle[i].alpha -= (s.particle[i].size / (scale / 8)) * 0.03;
      if (s.particle[i].alpha < 0.0001) {
        s.particle.splice(i);
      }
    }
  }

  if (s.food.energy.length != 0) {
    energyTime += 1000 / 50;

    // draw energy power
    arc(
      `rgba(0, 0, 255, ${(energyTime / 10000) * 0.1})`,
      s.food.energy.x * scale + scale / 2,
      s.food.energy.y * scale + scale / 2,
      scale * 2 - (scale * energyTime) / 10000 - scale / 5
    );

    if (energyTime >= 10000) {
      s.food.energy = { length: 0 };
    }
  }

  {
    // draw diat food
    // arc(
    //   "#000fff",
    //   s.dietFood.x * scale + scale / 2,
    //   s.dietFood.y * scale + scale / 2,
    //   scale / 2
    // );
    // arc(
    //   s.dietFood.color,
    //   s.dietFood.x * scale + scale / 2,
    //   s.dietFood.y * scale + scale / 2,
    //   (s.dietFood.colorVal / 4) * (sr(blink) * 0.1) + scale / 3
    // );
  }
  s.drawSnake();
  if (!gamePause) {
    setTimeout(animation, 1000 / 50);
  }
  blink += blinkTime;
}
animation();

// snake movement and snake collision
function update() {
  s.snakeMove();
  snakeIncrige = false;
  lastMove = true;
  s.snakeCollision();
  if (!gamePause) {
    setTimeout(() => {
      update();
    }, 1000 / FPS);
  }
}
update();
