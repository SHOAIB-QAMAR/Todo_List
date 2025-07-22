let highScore = localStorage.getItem("highScore") ? Number(localStorage.getItem("highScore")) : 0;

let gameSeq = [];
let userSeq = [];
let btnsList = ["red", "yellow", "green", "blue"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

h2.innerHTML = `Press any key to start <br> Highest Score: <b>${highScore}</b>`;

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game is started");
        started = true;

        h2.innerHTML = `Level ${level} <br> Highest Score: <b>${highScore}</b>`;

        levelUp();
    }
})

function levelUp() {
    userSeq = [];
    level++;
    h2.innerHTML = `Level ${level} <br> Highest Score: <b>${highScore}</b>`;

    let randInx = Math.floor(Math.random() * 4);
    let randColor = btnsList[randInx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);

    console.log(gameSeq);

    gameFlash(randBtn);
}

function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250)
}

let allBtn = document.querySelectorAll(".btn");
for (btn of allBtn){
    btn.addEventListener("click", btnPress);
}

function btnPress() {
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250)
}

function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp,1000);
        }        
    }
    else {

        if (level-1 > highScore) {
            highScore = level - 1;
            localStorage.setItem("highScore", highScore);
        }

        h2.innerHTML = `Game over! Your score was <b>${level-1}</b><br> Highest Score: <b>${highScore}</b><br> <br> Press any key to restart.`;

        document.querySelector("body").style.background = "red";
        setTimeout(function () {
            document.querySelector("body").style.background = "white";
        },150)
        reset();
    } 
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    h2.innerHTML = `Press any key to start <br> Highest Score: <b>${highScore}</b>`;
}