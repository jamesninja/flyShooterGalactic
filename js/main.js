let ship;
let meteors = [];
let gameover = false;
let points = 0;
//let laserTotal = 2;
let laser = [];

const ctx = document.querySelector("canvas").getContext("2d");
const W = ctx.canvas.width;
const H = ctx.canvas.height;

function draw() {
  //dessiner le sol

  // Iteration 1: background drawing
  //
  const img = document.createElement("img");
  img.src = "images/background.png";
  ctx.drawImage(img, 0, 0, W, H);

  //
  // Iteration 2: ship drawing
  //
  ship.draw();

  //drawLaser();
  //
  // Iteration #4: obstacles
  //

  meteors.forEach(function (ob) {
    ob.draw();
    //});

    //
    // Iteration #5: collisions
    //

    meteors.forEach(function (ob) {
      if (ob.hits(ship)) {
        gameover = true;
      }
    });

    //
    // Iteration #6: points
    //
    ctx.font = "30px serif";
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${points}`, 10, 30);
  });
}
document.onkeydown = function (e) {
  if (!ship) return;

  // TODO
  switch (e.keyCode) {
    case 37:
      ship.moveLeft();
      break;
    case 39:
      ship.moveRight();
      break;
    case 38:
      ship.moveUp();
      break;
    case 40:
      ship.moveDown();
      break;
    case 32:
      ship.shoot();
      break;
  }
  // // if (e.keyCode == 32 && lasers.length <= laserTotal) {
  // //   lasers.push([ship.x + ship.w, ship.y + ship.h / 2, 4, 20]);
  // //   // console.log(lasers);
  // }
};

// function drawLaser() {
//   if (lasers.length)
//     for (var i = 0; i < lasers.length; i++) {
//       ctx.fillStyle = "#f00";
//       ctx.fillRect(lasers[i][0], lasers[i][1], lasers[i][2], lasers[i][3]);
//     }
// }
// function moveLaser() {
//   for (var i = 0; i < lasers.length; i++) {
//     if (lasers[i][1] > -11) {
//       lasers[i][1] -= 10;
//     } else if (lasers[i][1] < -10) {
//       lasers.splice(i, 1);
//     }
//   }
// }

let raf;
let frames = 0;
function animLoop() {
  frames++;
  if (frames % 50 === 0) {
    meteors.push(new Meteor());
  }
  for (let i = 0; i < meteors.length; i++) {
    meteors[i].x -= 6;
    meteors[i].y += 0;
    if (meteors[i].y > ship.y + ship.h) {
      points++;
      meteors.splice(i, 1);
    }
  }
  draw();
  //moveLaser();
  //drawLaser();

  if (!gameover) {
    raf = requestAnimationFrame(animLoop);
  } else {
    //ctx.fillStyle = "black";
    //ctx.fillRect(300, 270, 620, 300);

    ctx.font = "80px serif";
    ctx.fillStyle = "#870007";
    ctx.textAlign = "center";
    ctx.fillText("Game Over!", W / 2, H / 2 + 10);

    ctx.font = "80px serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("Your final score", W / 2, H / 2 + 110);

    ctx.font = "80px serif";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(`${points}`, W / 2, H / 2 + 200);
  }
}

function startGame() {
  if (raf) {
    cancelAnimationFrame(raf);
  }
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = "red";
  ctx.fillRect(0, 450, W, 200);
  gameover = false;
  meteors = [];
  points = 0;

  ship = new Ship();
  let meteor = new Meteor();
  meteors.push(meteor);

  animLoop();
}

document.getElementById("start-button").onclick = function () {
  document.querySelector(".game-intro").style.visibility = "hidden";

  startGame();
};

// auto-start
//startGame()
