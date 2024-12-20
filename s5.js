const canvas = document.getElementById("table");
const ctx = canvas.getContext("2d");


const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    velocityX: 5,
    velocityY: 5,
    speed: 5,
    color: "green"
};

const user = {
    x: 0,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    score: 0,
    color: "red"
};

const cpu = {
    x: canvas.width - 10,
    y: (canvas.height - 100) / 2,
    width: 10,
    height: 100,
    score: 0,
    color: "red"
};

const separator = {
    x: (canvas.width - 2) / 2,
    y: 0,
    width: 2,
    height: 10,
    color: "orange"
};

function drawRectangle(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}

function drawScore(text, x, y) {
    ctx.fillStyle = "white";
    ctx.font = "60px Arial";
    ctx.fillText(text, x, y);
}

function drawSeparator() {
    for (let i = 0; i <= canvas.height; i += 20) {
        drawRectangle(separator.x, separator.y + i, separator.width, separator.height, separator.color);
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.velocityX = -ball.velocityX;
    ball.speed = 5;
}

function collision(player, ball) {
    return (
        ball.x - ball.radius < player.x + player.width &&
        ball.x + ball.radius > player.x &&
        ball.y - ball.radius < player.y + player.height &&
        ball.y + ball.radius > player.y
    );
}

function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    cpu.y += ((ball.y - (cpu.y + cpu.height / 2))) * 0.1;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.velocityY = -ball.velocityY;
    }

    if (collision(user, ball)) {
        ball.velocityX = -ball.velocityX;
    }

    if (collision(cpu, ball)) {
        ball.velocityX = -ball.velocityX;
    }

    if (ball.x - ball.radius < 0) {
        cpu.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        user.score++;
        resetBall();
    }
}

function render() {
    drawRectangle(0, 0, canvas.width, canvas.height, "black");

    drawScore(user.score, canvas.width / 4, canvas.height / 5);
    drawScore(cpu.score, (3 * canvas.width) / 4, canvas.height / 5);

    drawSeparator();

    drawRectangle(user.x, user.y, user.width, user.height, user.color);
    drawRectangle(cpu.x, cpu.y, cpu.width, cpu.height, cpu.color);

    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function game() {
    update();
    render();
}

canvas.addEventListener("mousemove", (event) => {
    let rect = canvas.getBoundingClientRect();
    user.y = event.clientY - rect.top - user.height / 2;
});

const framePerSecond = 50;
setInterval(game, 1000 / framePerSecond);
