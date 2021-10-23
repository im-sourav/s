const $ = (givMe) => {
  const self = document.querySelectorAll(givMe);
  self.T = (text) => {
    self.forEach((all) => {
      all.innerText = text;
    });
  };
  self.O = (event, fun) => {
    self.forEach((all) => {
      all.addEventListener(event, fun);
    });
  };
  self.S = (object) => {
    const css = Object.entries(object);
    self.forEach((all) => {
      css.forEach(([prorerty, value]) => {
        all.style[prorerty] = value;
      });
    });
  };
  return self;
};

// return Id
const ID = (id) => {
  return document.getElementById(id);
};

//for canvas shortcut
const $x = document.createElement("canvas");
function createCanvas(width = 400, height = 400) {
  $x.setAttribute("width", width);
  $x.setAttribute("id", "$x");
  $x.setAttribute("height", height);
  document.body.appendChild($x);
}
const $2d = $x != undefined ? $x.getContext("2d") : "null";

function rect(
  fillStyle = "#ff0000",
  startX = 0,
  startY = 0,
  endX = $x.width,
  endY = $x.height,
  lineWidth = 0,
  strockColor = "#00000000"
) {
  if ($x != null) {
    return (
      $2d.beginPath(),
      $2d.fillStyle = fillStyle,
      $2d.lineWidth = lineWidth,
      $2d.strokeStyle = strockColor,
      $2d.fillRect(startX, startY, endX, endY),
      $2d.rect(startX, startY, endX, endY),
      $2d.stroke()
    )
  }
}
function arc(
  fillStyle = "#0ff000",
  x = $x.width / 2,
  y = $x.height / 2,
  radius = ($x.width + $x.height) / 4,
  startAngle = 0,
  endAngle = Math.PI * 2,
  boolean = false,
  strokeClor = "",
  lineWidth = ""
) {
  if ($x != null) {
    return (
      ($2d.fillStyle = fillStyle == "" ? "" : fillStyle),
      ($2d.strokeStyle = strokeClor == "" ? "" : strokeClor),
      $2d.beginPath(),
      ($2d.lineWidth = lineWidth == "" ? 1 : lineWidth),
      $2d.arc(x, y, radius, startAngle, endAngle, boolean),
      $2d.fill(),
      $2d.stroke()
    );
  }
}
function moveTo(
  strokeStyle = "#ffffff",
  x = 0,
  y = 0,
  fillStyle = "#00000000",
  lineWidth = 1
) {
  if ($x != null) {
    return (
      ($2d.strokeStyle = strokeStyle == "" ? "#00000000" : strokeStyle),
      ($2d.fillStyle = fillStyle == "" ? "#00000000" : fillStyle),
      ($2d.lineWidth = lineWidth),
      $2d.beginPath(),
      $2d.moveTo(x, y)
    );
  }
}
function lineTo(
  x = $x != null ? $x.width : "",
  y = $x != null ? $x.height : ""
) {
  if ($x != null) {
    return $2d.lineTo(x, y);
  }
}
function closePath() {
  if ($x != null) {
    return $2d.closePath(), $2d.fill(), $2d.stroke();
  }
}
function clearRect(startX = 0, startY = 0, endX = $x.width, endY = $x.height) {
  if ($x != null) {
    return $2d.clearRect(startX, startY, endX, endY);
  }
}

// always positive
function sr(val){
  return Math.sqrt(Math.pow(val, 2));
}

// degree convert to radian
function toRadian(degree){
  return degree * Math.PI / 180;
}

// radian convert to Degree
function toDegree(radian){
  return radian * 180 / Math.PI;
}


/* <div
 style="background: linear-gradient(180deg, blue, yellow, green); position: relative; border-radius: 20px;" > <h1 style="color: red; font-size: 3rem; padding: 30px; z-index: 10000;"> Hacker </h1> </div> */

//  https://darez.in/en/quiz/abbc06#
