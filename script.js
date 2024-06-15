const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let speed = 1;
const speedView = document.getElementById("speed");
speedView.value = speed;

let dx = 1;
let dy = -1;

let lives = 10;

let pressedRight = false;
let pressedLeft = false;

const ballRadius = 6;
let ballX = canvas.width / 2;
let ballY = canvas.height - ballRadius * 2;

const paddleWidth = canvas.width / ballRadius;
const paddleHeight = ballRadius;
let paddleX = canvas.width / 2 - paddleWidth / 2;
const paddleY = canvas.height - paddleHeight;

function ball()
{
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, ballRadius, Math.PI * ballRadius);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();

    const touch_side = ballX - ballRadius < 0 || ballX + ballRadius > canvas.width;
    const touch_top_or_paddle = ballY - ballRadius < 0 || ballX > paddleX && ballX < paddleX + paddleWidth && ballY + ballRadius > paddleY;
    const touch_bottom = ballY + ballRadius > canvas.height;

    if (touch_side) {
        dx = -dx;
    } else if (touch_top_or_paddle) {
        dy = -dy;
    } else if (touch_bottom) {
        dy = -dy;
        lives --;
        document.getElementById("lives").innerText = "LIVES " + lives.toString();
        if ( ! lives) {
            setTimeout(() => {
                alert("GAME OVER !!!\nYOUR SPEED IS " + speed.toString());
                askPlayAgain();
            }, 250);
        }
    }

    ballX += dx * speed;
    ballY += dy * speed;
}

function paddle()
{
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();

    const has_space_right = canvas.width - paddleX - paddleWidth > 0;
    const has_space_left = paddleX > 0;

    if (pressedRight && has_space_right) {
        paddleX += ballRadius * speed;
    } else if (pressedLeft && has_space_left) {
        paddleX -= ballRadius * speed;
    }
}

document.addEventListener("keydown", (e) => {
    if (e.code === "ArrowRight") {
        pressedRight = true;
    } else if (e.code === "ArrowLeft") {
        pressedLeft = true;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.code === "ArrowRight") {
        pressedRight = false;
    } else if (e.code === "ArrowLeft") {
        pressedLeft = false;
    }
});

function askPlayAgain()
{
    const ask = confirm("Are you want to play again?");
    if (ask) {
        window.location.reload();
    } else {
        if ( ! window.close()) {
            window.alert("I can't close this page!\nI'll reload this page.");
            window.location.reload();
        }
    }
}

setInterval(() => {
    if (speed < 100) {
        speed ++;
        document.getElementById("level").innerText = "SPEED " + speed.toString();
        document.getElementById("speed").value = speed;
    } else {
        setTimeout(() => {
            alert("YOUR SPEED IS MAX!!!\nYOU ARE GREAT!!!");
            askPlayAgain();
        }, 250);
    }
}, 1000 * 5);

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ball();
    paddle();

    requestAnimationFrame(draw);
}

draw();

