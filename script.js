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

const randomFromRPS = () =>{
    switch (random(1,3)) {
        case 1:
            return 'rock'
        case 2:
            return 'paper'
        case 3:
            return 'scissors'
    }
}

const images = {
    'rock': './assets/rock.png',
    'paper': './assets/paper.png',
    'scissors': './assets/scissors.png'
}

class RPS {
    constructor(role, x, y, velX, velY, size,image) {
        this.role = role
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.size = size;
        this.image = image
    }

    draw() {
        this.image.src=images[this.role]
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.drawImage(this.image, this.x, this.y,this.size,this.size)

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
        for (const ball of objectsRPS) {
            if (!(this === ball)) {
                const dx = this.x - ball.x;
                const dy = this.y - ball.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < this.size + ball.size) {
                    if (this.role === 'scissors' && ball.role === 'rock') {
                        this.role = 'rock'
                        this.color = images[this.role]
                    }
                    if (this.role === 'paper' && ball.role === 'scissors') {
                        this.role = 'scissors'
                        this.color = images[this.role]
                    }
                    if (this.role === 'rock' && ball.role === 'paper') {
                        this.role = 'paper'
                        this.color = images[this.role]
                    }
                    this.velX = random(-1, 1);
                    this.velY = random(-1, 1);
                }
            }
        }
    }

}

const objectsRPS = [];

while (objectsRPS.length < 20) {
    const image = new Image(20, 20)
    const size = 30;
    const objectRPS = new RPS(
        randomFromRPS(),
        random(0 + size,    width - size),
        random(0 + size, height - size),
        random(-1, 1),
        random(-1, 1),
        size,
        image
    );

    objectsRPS.push(objectRPS);
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
    for (const objectRockPaperScissor of objectsRPS) {
        let isSame = true
        if (objectRockPaperScissor.role !== this.role) {
            isSame = false

        }
        if (!isSame) {
            objectRockPaperScissor.draw();
            objectRockPaperScissor.update();
            objectRockPaperScissor.collisionDetect();
        }
    }
    requestAnimationFrame(loop);
}

loop();