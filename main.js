//setter margin til 0 og henter spillområdet fra HTML
document.body.style.margin = '0px'
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//setter størrelsen på spillfeltet
canvas.width = 1440
canvas.height = 787

//definer mesteparten av variblene som blir brukt i løpet av hele koden

const increaseX = 1
const increaseY = 0.5
const behind = 25
const ballWidth = 30
const basePositionY = canvas.height/2 - ballWidth/2
const basePositionX = canvas.width/2 - ballWidth/2
let score1 = 0
let score2 = 0
const fromTop = 25
const gap = 25
const scoreCounterWidth = 100
const scoreCounterHeight = 150
const scorePositionLeft = canvas.width/3 + scoreCounterWidth/2
const scorePositionRight = canvas.width-(canvas.width/3) + gap - scoreCounterWidth/2
const scorePositionLeft2 = canvas.width/3 - gap - scoreCounterWidth + scoreCounterWidth/2
const scorePositionRight2 = canvas.width-(canvas.width/3) - scoreCounterWidth - scoreCounterWidth/2

//tilfeldig retning på ballen på start
let directionX = parseInt(Math.random()*2+1)
if (directionX === 2) {
    directionX = 1
    console.log('if')
} else {
    directionX = -1
    console.log('else')
}
let directionY = parseInt(Math.random()*2+1)
if (directionY === 2) {
    directionY = 1
    console.log('if')
} else {
    directionY = -1
    console.log('else')
}
let baseSpeedX = 4 * directionX
let baseSpeedY = parseInt(Math.random()*10 + 1) * directionY

//tegner spillfeltet
c.fillRect(0, 0, canvas.width, canvas.height)

//lager en klasse for å gjøre det lettere å lage like spillere
class Sprite {
    constructor({position, velocity, color = 'white'}) {
        this.position = position
        this.velocity = velocity
        this. width = 30
        this.height = 150
        this.color = color
    }

    //tegner spillerne
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

    }

    //oppdaterer spillerne sin posisjon
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.position.y = canvas.height - 150
            console.log('bot')
        } else if (this.position.y <= 0) {
            this.position.y = 0
            console.log('top')
        }
    }

}

//creates a class for the ball
class BallClass {
    constructor({position, velocity, color = 'white'}) {
        this.position = position
        this.velocity = velocity
        this.width = ballWidth
        this.height = ballWidth
        this.lastkey
        this.color = color
    }

    //tegner ballen
    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    //oppdaterer ballen sin posisjon
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y    
        
        if (this.velocity.y >= 10) {
            this.velocity.y = 10
        } else if (this.velocity.y <= -10) {
            this.velocity.y = -10
        }
        
        if (this.velocity.x >= 20) {
            this.velocity.x = 20
        } else if (this.velocity.x <= -20) {
            this.velocity.x = -20
        }

    }



}

//lager spiller 1
const player1 = new Sprite({
    position: {
        x: 150,
        y: canvas.height/2 - 75
    },
    velocity: {
        x: 0,
        y: 0

    }

})

//lager spiller 2
const player2 = new Sprite({
    position: {
        x: canvas.width - 150,
        y: canvas.height/2 - 75
    },
    velocity: {
        x: 0,
        y: 0

    }

})

//lager ballen
const ball = new BallClass({
    position: {
        x: basePositionX,
        y: basePositionY
    },
    velocity: {
        x: baseSpeedX,
        y: baseSpeedY
    }
})

// gjør at spillerne stopper å bevege seg når de slipper flytte knappen 
const keys =  {
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    }
}

//teller stillingen
function score(side) {
    if (side < canvas.width/2) {
        score2 += 1
    } else {
        score1 += 1
    }
}

//tegner midtlinjen
function drawMiddle() {
    const middleWidth = 10
    const splitHeight = canvas.height/20
    let pos = splitHeight/2
    c.fillStyle = 'black'
    c.fillRect(canvas.width/2-middleWidth/2, 0, middleWidth, canvas.height)
    for (let i=1; i<=10; i++) {
        c.fillStyle = 'white'
        c.fillRect(canvas.width/2-middleWidth/2, pos, middleWidth, splitHeight)
        pos += splitHeight*2 

    }
}

//tegner tall
function drawNumbers(sideScore, side) {

    const scorePosition = side

    if (sideScore === 0) {
        c.fillRect(scorePosition + scoreCounterWidth/4, scoreCounterHeight/5 + fromTop, scoreCounterWidth - scoreCounterWidth/2, scoreCounterHeight - scoreCounterHeight/2.5)
    }

    if (sideScore === 1) {
        c.fillRect(scorePosition, scoreCounterHeight/5 + fromTop, scoreCounterWidth/3, scoreCounterHeight - scoreCounterHeight/5)
        c.fillRect(scorePosition + scoreCounterWidth - scoreCounterWidth/3, fromTop, scoreCounterWidth/3, scoreCounterHeight)
    } 

    if (sideScore === 2) {
        c.fillRect(scorePosition, scoreCounterHeight/5 + fromTop, scoreCounterWidth - scoreCounterWidth/4, scoreCounterHeight/5)
        c.fillRect(scorePosition + scoreCounterWidth/4, scoreCounterHeight - scoreCounterHeight/2.5 + fromTop, scoreCounterWidth - scoreCounterWidth/4, scoreCounterHeight/5)
    }

    if (sideScore === 3) {
        c.fillRect(scorePosition, scoreCounterHeight/5 + fromTop, scoreCounterWidth - scoreCounterWidth/4, scoreCounterHeight/5)
        c.fillRect(scorePosition, scoreCounterHeight - scoreCounterHeight/2.5 + fromTop, scoreCounterWidth - scoreCounterWidth/4, scoreCounterHeight/5)
    }

    if (sideScore === 4) {
        c.fillRect(scorePosition + scoreCounterWidth/4, fromTop, scoreCounterWidth/2, scoreCounterHeight/2.5)
        c.fillRect(scorePosition, scoreCounterHeight - scoreCounterHeight/2.5 + fromTop, scoreCounterWidth - scoreCounterWidth/4, scoreCounterHeight/2.5)
    }

    if (sideScore === 5) {
        c.fillRect(scorePosition + scoreCounterWidth/4, scoreCounterHeight/5 + fromTop, scoreCounterWidth - scoreCounterWidth/4, scoreCounterHeight/5)
        c.fillRect(scorePosition, scoreCounterHeight - scoreCounterHeight/2.5 + fromTop, scoreCounterWidth - scoreCounterWidth/4, scoreCounterHeight/5) 
    }
    
    if (sideScore === 6) {
        c.fillRect(scorePosition + scoreCounterWidth/4, scoreCounterHeight/5 + fromTop, scoreCounterWidth - scoreCounterWidth/4, scoreCounterHeight/5)
        c.fillRect(scorePosition + scoreCounterWidth/4, scoreCounterHeight - scoreCounterHeight/2.5 + fromTop, scoreCounterWidth/2, scoreCounterHeight/5 )
    }

    if (sideScore === 7) {
        c.fillRect(scorePosition, scoreCounterHeight/5 + fromTop, scoreCounterWidth/1.5, scoreCounterHeight - scoreCounterHeight/5)
    }

    if (sideScore === 8) {
        c.fillRect(scorePosition + scoreCounterWidth/4, scoreCounterHeight/5 + fromTop, scoreCounterWidth/2, scoreCounterHeight/5 )
        c.fillRect(scorePosition + scoreCounterWidth/4, scoreCounterHeight - scoreCounterHeight/2.5 + fromTop, scoreCounterWidth/2, scoreCounterHeight/5 )
    }

    if (sideScore === 9) {
        c.fillRect(scorePosition + scoreCounterWidth/4, scoreCounterHeight/5 + fromTop, scoreCounterWidth/2, scoreCounterHeight/5 )
        c.fillRect(scorePosition, scoreCounterHeight - scoreCounterHeight/2.5 + fromTop, scoreCounterWidth/1.5, scoreCounterHeight - scoreCounterHeight/5)
    }

}

//tegner riktige tall på riktig posisjon
function drawScore(sideScore, side, side2) {

    let scoreTen = parseInt(sideScore/10) % 10
    let scoreOne = sideScore % 10

    c.fillStyle = 'white'
    c.fillRect(side, fromTop, scoreCounterWidth, scoreCounterHeight)
    c.fillRect(side2, fromTop, scoreCounterWidth, scoreCounterHeight)
    c.fillStyle = 'black'
    
    //tegner tieren
    drawNumbers(scoreTen, side2)

    //tegner eneren
    drawNumbers(scoreOne, side)

}

//setter ballen tilbake til midten
function reset() {
    ball.velocity.x = baseSpeedX
    ball.velocity.y = baseSpeedY
    ball.position.x = basePositionX
    ball.position.y = basePositionY

    //tilfeldig retning på ballen etter poeng
    directionX = parseInt(Math.random()*2+1)
    if (directionX === 2) {
        directionX = 1
        console.log('if')
    } else {
        directionX = -1
        console.log('else')
    }
    directionY = parseInt(Math.random()*2+1)
    if (directionY === 2) {
        directionY = 1
        console.log('if')
    } else {
        directionY = -1
        console.log('else')
    }
    baseSpeedX *= directionX
    baseSpeedY = parseInt(Math.random()*10 + 1) * directionY
}

//gjør at ballen spretter og blir raskere hvis den treffer en spiller
function hitPlayer(amountX) {
    ball.velocity.x *= -1
    ball.velocity.x += amountX
    if (ball.velocity.y < 0) {
        ball.velocity.y -= increaseY
    } else {
        ball.velocity.y += increaseY
    }
}

//hoved loopen
function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    drawMiddle()
    drawScore(score1, scorePositionLeft, scorePositionLeft2)
    drawScore(score2, scorePositionRight, scorePositionRight2)
    player1.update()
    player2.update()
    ball.update()

    //stopper spillerne sånn at de ikke fortsetter å flytte seg når de ikke trykker knappene
    player1.velocity.y = 0
    player2.velocity.y = 0

    //player1 bevegelse
    if (keys.w.pressed && player1.lastkey === 'w') {
        player1.velocity.y = -5
    } else if (keys.s.pressed && player1.lastkey === 's') {
        player1.velocity.y = 5
    }

    //player2 bevegelse
    if (keys.ArrowUp.pressed && player2.lastkey === 'ArrowUp') {
        player2.velocity.y = -5
    } else if (keys.ArrowDown.pressed && player2.lastkey === 'ArrowDown') {
        player2.velocity.y = 5
    }


    //spiller 1 treff
    if (
        ball.position.x <= player1.position.x + player1.width &&
        ball.position.y + ball.height >= player1.position.y &&
        ball.position.y <= player1.position.y + player1.height &&
        ball.position.x >= player1.position.x
    ) {
        hitPlayer(increaseX)
    }

    //spiller 2 treff
    if (
        ball.position.x + ball.width >= player2.position.x &&
        ball.position.y + ball.height >= player2.position.y &&
        ball.position.y <= player2.position.y + player2.height &&
        ball.position.x + ball.width <= player2.position.x + player2.width
    ) {
        hitPlayer(-increaseX)
        console.log(ball)
    }

    //spretter ballen hvis den treffer toppen eller bunnen
    if (
        ball.position.y <= 0 || ball.position.y + ball.height >= canvas.height
    ) {
        ball.velocity.y *= -1
    }

    //gir poeng hvis ballen går ut på en av sidene
    if (
        ball.position.x <= behind || ball.position.x + ball.width >= canvas.width - behind
    ) {
        score(ball.position.x)
        reset()       
    }

}

//kjører hoved loopen
animate()

//gjør at spillerne kan bevege seg
window.addEventListener(('keydown'), (event) => {
    switch (event.key) {
        case 'w':
            keys.w.pressed = true
            player1.lastkey = 'w'
            break
        case 's':
            keys.s.pressed = true
            player1.lastkey = 's'
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = true
            player2.lastkey = 'ArrowUp'
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = true
            player2.lastkey = 'ArrowDown'
            break
    }
})

//sjekker når spillern stopper å trykke bevegelses knappene
window.addEventListener(('keyup'), (event) => {
    switch (event.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break
        case 'ArrowDown':
            keys.ArrowDown.pressed = false
            break
    }
})