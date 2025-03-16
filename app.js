let body =document.body;
let h3 = document.querySelector("h3");
let h2 = document.querySelector("#higestScore");

let gameSeq = [];
let userSeq = [];

let btns = ["blue","red","green","yellow"];

let started = false;
let level = 0;                                          
let higestScore = 0;
let currUserScore = 0;

body.addEventListener("keypress", function () {
    if(started == false){
        console.log("Game started!");
        started = true;
        levelUp()
    }
})

function gameFlash(btn){
    btn.classList.add("flash");        
    setTimeout(function(){
        btn.classList.remove("flash");
    },250)
}

function userFlash(btn){
    btn.classList.add("userFlash");        
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250)
}

function levelUp(){
    userSeq = [];
    level++;
    if(currUserScore > higestScore){
        higestScore = currUserScore;
    }

    h2.innerText = `Higest Score ${higestScore}`
    currUserScore = level;

    h3.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`)
    gameSeq.push(randColor);
    console.log(gameSeq)
    gameFlash(randBtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp,1000);
        }
    }else{
        h3.innerHTML = `Game Over!,Your Score is ${level} <br>Press any key to restart the game`;
        body.style.background = "red";
        setTimeout(function(){
            body.style.background = "gray";
        },200)
        resetGame();
    }
}

function btnPress(){
    let btn = this;
    userFlash(this);
    btn.classList.add("opacity");
    setTimeout(function(){
        btn.classList.remove("opacity");
    },300);
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");

for(let btns of allBtns){
    btns.addEventListener("click",btnPress);
}

function resetGame(){
    higestScore = Math.max(higestScore,currUserScore);
    started = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
    currUserScore = 0;
}