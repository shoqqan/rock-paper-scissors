const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


function random(min, max) {
    let res = Math.floor(Math.random() * (max - min + 1)) + min;
    if (res === 0) {
        return random(min, max)
    } else {
        return res
    }
}


const colors = {
    1: '#F50000',
    2: '#0029F5',
    3: '#00F510'
}

class RPS{
    constructor(role, x, y, velX, velY, size) {
        this.role = role
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = colors[role];
        this.size = size;
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
    
    update() {

        if ((this.x + this.size) >= width) {
            this.velX = -(Math.abs(this.velX));
        }
        if ((this.x - this.size) <= 0) {
            this.velX = Math.abs(this.velX);
        }
        if ((this.y + this.size) >= height) {
            this.velY = -(Math.abs(this.velY));
        }
        if ((this.y - this.size) <= 0) {
            this.velY = Math.abs(this.velY);
        }
        this.x += this.velX;
        this.y += this.velY;
    }

    collisionDetect() {
        for (const ball of balls) {
            if (!(this === ball)) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.size + ball.size) {
                    if (this.role === 1 && ball.role === 2) {
                        this.role = 2
                        this.color = colors[this.role]
                    }
                    if (this.role === 3 && ball.role === 1) {
                        this.role = 1
                        this.color = colors[this.role]
                    }
                    if (this.role === 2 && ball.role === 3) {
                        this.role = 3
                        this.color = colors[this.role]
                    }
                    this.velX = random(-1, 1);
                    this.velY = random(-1, 1);
                }
            }
        }
    }

}

const balls = [];

while (balls.length < 20) {
    const size = 10;
    const ball = new RPS(
        random(1, 3),
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-1, 1),
        random(-1, 1),
        size
    );

    balls.push(ball);
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
    for (const ball of balls) {
        let isSame = true
        if (ball.role !== this.role) {
            isSame = false

        }
        if (!isSame) {
            ball.draw();
            ball.update();
            ball.collisionDetect();
        }
    }
    requestAnimationFrame(loop);
}

loop();