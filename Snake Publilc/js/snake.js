function Snake() {
  this.x = 2;
  this.y = 4;
  this.foodTat = 0;

  this.food = {
    normal: {},
    energy: {
      length: 0,
    },
  };
  this.particle = [];
  this.dietFood = [];

  for (let i = 0; i < 10; i++) {
    snakeBody[i] = {
      x: this.x + i,
      y: this.y,
    };
  }

  this.dir = {
    x: 1,
    y: 0,
  };

  this.drawSnake = () => {
    for (let i = 0; i < snakeBody.length; i++) {
      let color =
        i != snakeBody.length - 1
          ? `rgb(${i * 2}, ${255 - i * 5}, 0)`
          : "#00830f";
      let strokeColor = i != snakeBody.length - 1 ? "#008200" : "#75ff75";
      rect(
        color,
        snakeBody[i].x * scale,
        snakeBody[i].y * scale,
        scale,
        scale,
        scale / 15, 
        strokeColor 
      );
    }
  };

  // set food location
  this.Food = (name) => {
    this.food[name] = {
      x: Math.floor(Math.random() * ($x.width / scale)),
      y: Math.floor(Math.random() * ($x.height / scale)),
      angle: 0,
      length: 1,
    };
    let snakeAndFoodPositionIsSame = snakeBody.some(
      (e) =>
        (this.food.normal.x == e.x && this.food.normal.y == e.y) ||
        (this.food.energy.x == e.x && this.food.energy.y == e.y)
    );
    if (
      snakeAndFoodPositionIsSame ||
      (this.food.energy.x == this.food.normal.x &&
        this.food.energy.y == this.food.normal.y)
    ) {
      this.Food(name);
    }
  };
  this.Food("normal");

  // draw normal food
  this.drawNormalFood = () => {
    arc(
      `rgba(0, 255, 255, ${sr(5 / blink)})`,
      this.food.normal.x * scale + scale / 2,
      this.food.normal.y * scale + scale / 2,
      (scale / 3) * (sr(blink) * 0.025) + scale / 3
    );
    // food particle
    arc(
      "#00ffff",
      this.food.normal.x * scale + scale / 2,
      this.food.normal.y * scale + scale / 2,
      scale / 2.5
    );
  };

  this.drawEnergylFood = () => {
    let cosA = Math.cos(toRadian(this.food.energy.angle));
    let sinA = Math.sin(toRadian(this.food.energy.angle));
    moveTo(
      "#ff4400",
      this.food.energy.x * scale + scale / 2 + (scale / 2) * sinA,
      this.food.energy.y * scale + scale / 2 - (scale / 2) * cosA,
      "#ffe100",
      scale / 10
    );
    lineTo(
      this.food.energy.x * scale + scale / 2 + (scale / 2) * cosA,
      this.food.energy.y * scale + scale / 2 + (scale / 2) * sinA
    );
    lineTo(
      this.food.energy.x * scale + scale / 2 - (scale / 2) * sinA,
      this.food.energy.y * scale + scale / 2 + (scale / 2) * cosA
    );
    lineTo(
      this.food.energy.x * scale + scale / 2 + (-scale / 2) * cosA,
      this.food.energy.y * scale + scale / 2 + (-scale / 2) * sinA
    );
    closePath();
    this.food.energy.angle += 1 + blink / 5;
  };

  // diet food
  this.DietFood = () => {
    this.dietFood = {
      x: Math.floor(Math.random() * ($x.width / scale)),
      y: Math.floor(Math.random() * ($x.height / scale)),
      color: `rgb(255, 0, 0)`,
      colorVal: 0,
    };
    let snakeAndFoodPositionIsSame = snakeBody.some(
      (e) => this.food.normal.x == e.x && this.food.normal.y == e.y
    );

    if (
      snakeAndFoodPositionIsSame ||
      (this.dietFood.x == this.food.normal.x &&
        this.dietFood.y == this.food.normal.y)
    ) {
      this.DietFood();
    } else {
      let maxTime = true;
      let loop = () => {
        if (maxTime) {
          setTimeout(() => {
            loop();
            this.dietFood.color = `rgba(${255 - this.dietFood.colorVal}, ${
              this.dietFood.colorVal
            }, ${255 - this.dietFood.colorVal}, 0.3)`;
            this.dietFood.colorVal += 1;
          }, 10000 / 255);
        }
      };
      loop();
      setTimeout(() => {
        maxTime = false;
        this.dietFood = [];
      }, 10000);
    }
  };

  // this.DietFood();

  // food name of eneargy
  this.Food("energy");

  this.snakeMove = () => {
    let X = snakeBody[snakeBody.length - 1].x + this.dir.x,
      Y = snakeBody[snakeBody.length - 1].y + this.dir.y;

    if ((X + 1) * scale > $x.width) {
      X = 0;
    } else if (X * scale < 0) {
      X = $x.width / scale - 1;
    } else if ((Y + 1) * scale > $x.height) {
      Y = 0;
    } else if (Y * scale < 0) {
      Y = $x.height / scale - 1;
    }

    snakeBody.push({
      x: X,
      y: Y,
    });
    if (!snakeIncrige) {
      snakeBody.shift();
    }
  };

  // snake Collision Food 
  this.snakeCollision = () => {
    let s = snakeBody[snakeBody.length - 1];
    for (var i = 0; i < snakeBody.length - 1; i++) {
      if (s.x == snakeBody[i].x && s.y == snakeBody[i].y) {
        console.log("Game Over");
        gamePause = true;
      }
    }
    if (this.food.normal.x == s.x && this.food.normal.y == s.y) {
      this.Food("normal");
      snakeIncrige = true;
      score += 10;
      if (FPS <= 20) {
        FPS += 0.125;
      }
      console.log(score);
      this.foodTat++;
      this.Particle(s.x, s.y);
      if (this.foodTat % 10 == 0) {
        this.Food("energy");
        energyTime = 0;
      }
    }

    if (this.food.energy.x == s.x && this.food.energy.y == s.y) {
      score += 25;
      console.log(score);
      this.food.energy = { length: 0 };
      this.Particle(s.x, s.y);
      for (let i = 0; i < Math.floor(6 - energyTime / 2000); i++) {
        snakeBody.shift();
        this.Particle(snakeBody[0].x, snakeBody[0].y, "#00ff00") 
      } 
    }
    // let snakeEatingFood = snakeBody.some(
    //   (e) => this.food.normal.x == s.x && this.food.normal.y == s.y
    // ); 
    //   console.log(snakeEatingFood);
    // if (this.food.energy.length != 0) {
    //   let snakeEatingEnergyFood = snakeBody.some(
    //     (e) => this.food.energy.x == s.x && this.food.energy.y == s.y
    //   );
    // }
    // return {
    //   normal: this.food.normal.x == s.x && this.food.normal.y == s.y,
    //   energy: this.food.energy.x == s.x && this.food.energy.y == s.y
    // }
  };

  this.Particle = (x, y, color = "#ff0000") => {
    for (let i = 0; i < 20; i++) {
      let speed = (Math.random() * scale) / scale;
      let angle = toRadian(Math.random() * 360);
      this.particle[i] = {
        x: x,
        y: y,
        color: color,
        vy: (speed * Math.sin(angle)) / (scale / 20),
        vx: (speed * Math.cos(angle)) / (scale / 20),
        size: Math.random() * (scale / 8),
        alpha: 1,
      };
    }
  };
}

{
  // if (this.dietFood.length != 0) {
  //   let snakeEatingDietFood = snakeBody.some(
  //     (e) => this.dietFood.x == s.x && this.dietFood.y == s.y
  //   );
  //   if (snakeEatingDietFood) {
  //     score += 25;
  //     maxTime = false;
  //     this.dietFood = [];
  //     this.Particle(s.x, s.y);
  //     snakeBody.shift();
  //     snakeBody.shift();
  //   }
  // }
}
