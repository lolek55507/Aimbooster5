const ticking = new Audio('ticking.mp3');
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const orange = document.getElementById('orange');
const startButton = document.getElementById('startButton');
let untillNextCircleTimmer = 5000;
let canvasWidth = 500;
let canvasHeight = 500;
let orangeHeight = canvasWidth * 0.1;
let orangeWidth = canvasHeight * 0.1;
let orangeCoordinatesY = Math.floor(Math.random() * (canvasHeight - orangeHeight));
let orangeCoordinatesX = Math.floor(Math.random() * (canvasWidth - orangeWidth));
const scoreContainer = document.getElementById('Score');
const timeContainer = document.getElementById('Timmer');
const popA = document.getElementById('popA');
const popB = document.getElementById('popB');
const slowestTimmerContainer = document.getElementById('slowestTimer');
const fastestTimmerContainer = document.getElementById('fastestTimer');
const avrageTimmerContainer = document.getElementById('avrageTimer');
const bestContainer = document.getElementById('best');

let timmeInterval;
let fastest = 0;
let slowest = 0;
let avrage = 0;
let timmes = [];
let time = 0;

let score = 0;
let Timmer = 60;

canvas.width = canvasWidth;
canvas.height = canvasHeight;
function countingTime() {
    time++;
}
canvas.onclick = function(e) {
    let rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;
    
    
    if (
        mouseX >= orangeCoordinatesX  &&
        mouseX <= orangeCoordinatesX + orangeWidth &&
        mouseY >= orangeCoordinatesY &&
        mouseY <= orangeCoordinatesY + orangeHeight
    ) {
        orangeCoordinatesY = Math.floor(Math.random() * (canvasHeight - orangeHeight));
        orangeCoordinatesX = Math.floor(Math.random() * (canvasWidth - orangeWidth));
        timmes.push(time);
        clearInterval(timmeInterval);
        time = 0;
        score++;
        scoreContainer.innerText = score;
        canvas.width = canvasWidth;
        ctx.fillStyle = 'orange';
        ctx.drawImage(orange, orangeCoordinatesX, orangeCoordinatesY, orangeWidth, orangeHeight);
        

        // loop for smallest
for (let i = 0; i < timmes.length; i++) {
    if (timmes[i] < slowest || slowest == 0) {
        slowest = timmes[i];
    }
}
// loop for fastest 
for (let i = 0; i < timmes.length; i++) {
    if (timmes[i] > fastest) {
        fastest = timmes[i];
    }
}
    couAvrage();

        console.log('avrage' + avrage);
        console.log('slowest' + slowest);
        console.log('fastest' + fastest);
        console.log(timmes);
    }
};

startButton.addEventListener('click', startGame);

function startGame() {
    let timmeInterval = setInterval(countingTime, 1);
    startButton.removeEventListener('click', startGame);
    canvas.style.opacity = '1';
    scoreContainer.style.opacity = '0';
    startButton.style.opacity = '0';
    popA.style.opacity = '0';
    score = 0;
    let decInterval = setInterval(deacreaseTimmer, 1000);
    drawCircle();
    setTimeout(() => {
        orangeCoordinatesY = Math.floor(Math.random() * (canvasHeight - orangeHeight));
        orangeCoordinatesX = Math.floor(Math.random() * (canvasWidth - orangeWidth));
        Timmer = 60;
        timeContainer.innerText = Timmer + ' sec';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        clearInterval(decInterval); // Clear the previous interval
        scoreContainer.style.opacity = '1';
    startButton.style.opacity = '1';
    popA.style.opacity = '1';
    canvas.style.opacity = '0';
    startButton.addEventListener('click', startGame);
    slowestTimmerContainer.innerText = fastest + " ms";
    fastestTimmerContainer.innerText = slowest + " ms";
    avrageTimmerContainer.innerText = Math.round(avrage) + " ms";
    fastest = 0;
    slowest = 0;
    avrage = 0;
    timmes = [];
    time = 0;

     console.log('avrage' + avrage);
        console.log('slowest' + slowest);
        console.log('fastest' + fastest);
        console.log(timmes);
        if (score > best || best == null) {
            localStorage.setItem("best", score);
            bestContainer.innerText = score;
            console.log(best);
        }  else {
            bestContainer.innerText = localStorage.getItem('best') || 0;
        }
        
    }, 60000);
}

function drawCircle() {
    
    canvas.width = canvasWidth;
    ctx.fillStyle = 'orange';
    ctx.drawImage(orange, orangeCoordinatesX, orangeCoordinatesY, orangeWidth, orangeHeight);
}

function deacreaseTimmer() {
    Timmer--;
    timeContainer.innerText = Timmer + ' sec';
    ticking.play();
}



// avrage 
function couAvrage() {
    let sum = 0;
    for (let i = 0; i < timmes.length; i++) {
        sum += timmes[i];
    }
    avrage = sum / timmes.length; // Calculate the average
    return avrage; // Return the calculated average
}

 function setTheBest() {
    if (best === null) {
best = 0;
bestContainer.innerText = best;
    } else {
best = localStorage.getItem('best');
bestContainer.innerText = best;
    }

 }
 setTheBest();