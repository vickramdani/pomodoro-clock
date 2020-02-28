let countdown = document.querySelector(".countdown");
let play = document.querySelector(".fa-play");
let pause = document.querySelector(".fa-pause");
let refresh = document.querySelector(".fa-refresh");
let up = document.querySelector(".fa-angle-up");
let down = document.querySelector(".fa-angle-down");
let pomodoro = document.getElementById("pomodoro");
let breaks = document.getElementById("breaks");
let breakUp = document.querySelector(".break-up");
let breakDown = document.querySelector(".break-down");

document.querySelector(".session").classList.add("ylw");
pomodoro.classList.add("ylw");


breaks.innerHTML = 5;
let countBreak = breaks.innerHTML * 60;
let timeBreak = countBreak;

pomodoro.innerHTML = 25;
let countdownTime = pomodoro.innerHTML * 60;
let timePassed = 0;
let timeLeft = countdownTime;
let timerInterval = null;


countdown.innerHTML = `${formatTime(timeLeft)}`;

function startTimer() {
    let countdownTime = pomodoro.innerHTML * 60;
    let timePassed = 0;
    let timeLeft = countdownTime;
    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeLeft = countdownTime - timePassed;
        countdown.innerHTML = formatTime(timeLeft);

        if (timeLeft === 0) {
            onTimesUp();
            countdown.innerHTML = formatTime(timeBreak);
            play.addEventListener("click", breakTimer);
            play.removeEventListener("click", startTimer);
            pause.addEventListener("click", onTimesUp);
            breakUp.addEventListener("click", increaseBreak);
            breakDown.addEventListener("click", decreaseBreak);
            up.removeEventListener("click", increaseTimer);
            down.removeEventListener("click", decreaseTimer);
            document.querySelector(".break-session").classList.add("ylw");
            breaks.classList.add("ylw");
            pomodoro.classList.remove("ylw");
            document.querySelector(".session").classList.remove("ylw");
        }
    }, 1000);

    document.querySelector(".countdown").classList.add("green");
    setTimeout(function () { document.querySelector(".countdown").classList.remove("green") }, 500);
    document.querySelector(".countdown").classList.remove("yellow");

    play.style.color = "rgb(12, 117, 12)";
    pause.style.color = "black";
    refresh.style.color = "black";
}

function breakTimer() {
    let countBreak = breaks.innerHTML * 60;
    let timePassed = 0;
    let timeBreak = countBreak;

    timerInterval = setInterval(() => {
        timePassed = timePassed += 1;
        timeBreak = countBreak - timePassed;
        countdown.innerHTML = formatTime(timeBreak);

        if (timeBreak === 0) {
            onTimesUp();
            countdown.innerHTML = formatTime(countdownTime);
            play.removeEventListener("click", breakTimer);
            play.addEventListener("click", startTimer);
            pause.addEventListener("click", onTimesUp);
            refresh.addEventListener("click", resetTime);
            breakUp.removeEventListener("click", increaseBreak);
            breakDown.removeEventListener("click", decreaseBreak);
            up.addEventListener("click", increaseTimer);
            down.addEventListener("click", decreaseTimer);
            document.querySelector(".session").classList.add("ylw");
            pomodoro.classList.add("ylw");
            breaks.classList.remove("ylw");
            document.querySelector(".break-session").classList.remove("ylw");
        }
    }, 1000);

    document.querySelector(".countdown").classList.add("green");
    setTimeout(function () { document.querySelector(".countdown").classList.remove("green") }, 500);
    document.querySelector(".countdown").classList.remove("yellow");

    play.style.color = "maroon";
    pause.style.color = "black";
    refresh.style.color = "black";
}


function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    return `${minutes}:${seconds}`;
}

function onTimesUp() {
    clearInterval(timerInterval);
    pause.style.color = "rgb(196, 196, 15)";
    play.style.color = "black";
    refresh.style.color = "black";
    document.querySelector(".countdown").classList.add("yellow");
    setTimeout(function () { document.querySelector(".countdown").classList.remove("yellow") }, 500);
}

function resetTime() {
    clearInterval(timerInterval);
    timerInterval = null;
    pomodoro.innerHTML = 25;
    breaks.innerHTML = 5;
    let countdownTime = pomodoro.innerHTML * 60;
    let timeLeft = countdownTime;
    play.addEventListener("click", startTimer);
    play.removeEventListener("click", breakTimer);
    document.querySelector(".countdown").classList.remove("yellow");
    document.querySelector(".countdown").classList.add("maroon");
    setTimeout(function () { document.querySelector(".countdown").classList.remove("maroon") }, 500);

    countdown.innerHTML = `${formatTime(timeLeft)}`;

    down.style.color = "white";
    up.style.color = "white";

    breakDown.style.color = "white";
    breakUp.style.color = "white";

    refresh.style.color = "maroon";
    play.style.color = "black";
    pause.style.color = "black";
}

function increaseTimer() {
    pomodoro.innerHTML++;
    countdownTime = pomodoro.innerHTML * 60;
    formatTime(countdownTime);
    countdown.innerHTML = `${formatTime(countdownTime)}`;
    up.style.color = "yellow";
    down.style.color = "white";
}

function decreaseTimer() {
    pomodoro.innerHTML--;
    countdownTime = pomodoro.innerHTML * 60;
    formatTime(countdownTime);
    countdown.innerHTML = `${formatTime(countdownTime)}`;
    down.style.color = "yellow";
    up.style.color = "white";
}

function increaseBreak() {
    breaks.innerHTML++;
    countBreak = breaks.innerHTML * 60;
    formatTime(countBreak);
    countdown.innerHTML = `${formatTime(countBreak)}`;
    breakUp.style.color = "yellow";
    breakDown.style.color = "white";
}

function decreaseBreak() {
    breaks.innerHTML--;
    countBreak = breaks.innerHTML * 60;
    formatTime(countBreak);
    countdown.innerHTML = `${formatTime(countBreak)}`;
    breakDown.style.color = "yellow";
    breakUp.style.color = "white";
}

play.addEventListener("click", startTimer);
pause.addEventListener("click", onTimesUp);
refresh.addEventListener("click", resetTime);
up.addEventListener("click", increaseTimer);
down.addEventListener("click", decreaseTimer);