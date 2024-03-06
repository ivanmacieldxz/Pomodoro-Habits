
let mode = "timer";
let interval;
let minutes = 0, seconds = 0, millis = 0;
const defaultTimer = 25;
const defaultBreak = 5;
let timerConfig = defaultTimer;
let breakConfig = defaultBreak;
let stopped = true;

updateWatch(defaultTimer);

function updateWatch(m, s) {
    minutes = m != undefined ? m : minutes;
    seconds = s != undefined ? s : seconds;
    watch.innerText = `${minutes}`.padStart(2, "0") + ":" + `${seconds}`.padStart(2, "0");
}

function hideTimerButtons() {
    increase.classList.add("hidden");
    decrease.classList.add("hidden");
}

function showTimerButtons() {
    increase.classList.remove("hidden");
    decrease.classList.remove("hidden");
}

function showDefaultButton() {
    resetDefault.classList.remove("hidden");
}

function hideDefaultButton() {
    resetDefault.classList.add("hidden");
}

timerButton.addEventListener("click", () => {
    mode = "timer";
    updateWatch(timerConfig);
    showTimerButtons();
    showDefaultButton();
});

breakButton.addEventListener("click", () => {
    mode = "break";
    updateWatch(breakConfig);
    showTimerButtons();
    showDefaultButton();
});

swButton.addEventListener("click", () => {
    mode = "stopwatch";
    updateWatch(0, 0);
    hideTimerButtons();
    hideDefaultButton();
});

//TODO: CHECKER LISTENER

increase.addEventListener("click", () => {
    if (mode == "timer") {
        timerConfig++;
        updateWatch(timerConfig);
    } else if (mode == "break") {
        breakConfig++;
        updateWatch(breakConfig);
    }
});

decrease.addEventListener("click", () => {
    if (mode == "timer") {
        timerConfig--;
        updateWatch(timerConfig);
    } else if (mode == "break") {
        breakConfig--;
        updateWatch(breakConfig);
    }
});

start.addEventListener("click", () => {
    //show start button and hide pause button
    start.classList.add("hidden");
    pause.classList.remove("hidden");
    hideTimerButtons();

    resumeInterval();
    stopped = false;
});

pause.addEventListener("click", () => {
    if (stopped) {
        resumeInterval();
        pause.innerText = "Pause";
    }
    else{
        clearInterval(interval);
        pause.innerText = "Resume";
    }

    stopped = !stopped;
});

reset.addEventListener("click", () => {
    //clear current interval, whichever it is
    clearInterval(interval);

    //show start button and hide pause button
    start.classList.remove("hidden");
    pause.classList.add("hidden");

    stopped = true;
    pause.innerText = "Pause";

    //if on timer mode
    if (mode == "timer") {
        //show timer with previous config
        updateWatch(timerConfig, 0);
        //show increase, decrease and reset to default config buttons
        showTimerButtons();
        showDefaultButton();
    } else if (mode == "break") {
        //show break timer with previous config
        updateWatch(breakConfig, 0);
        //show increase, decrease and reset to default config buttons
        showTimerButtons();
        showDefaultButton();
    } else if (mode == "stopwatch") {
        //show stopwatch config
        updateWatch(0, 0);
    }
});

resetDefault.addEventListener("click", () => {
    if (mode == "timer") {
        timerConfig = defaultTimer;
        updateWatch(timerConfig, 0);
    } else if (mode == "break") {
        breakConfig = defaultBreak;
        updateWatch(breakConfig, 0);
    }
});

function resumeInterval() {
    let end = Date.now() + minutes * 60 * 1000 + seconds * 1000 + millis;

    interval = setInterval(() => {
        let actual = Date.now();
        let diff = end - actual;

        updateWatch(
            Math.floor(diff / 60 / 1000),
            Math.floor((diff % (60 * 1000)) / 1000)
        );

        millis = diff - seconds * 1000 - minutes * 1000 * 60;
    }, 200);
}