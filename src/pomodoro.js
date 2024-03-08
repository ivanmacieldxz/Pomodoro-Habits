
let mode = "timer";
let interval;
let minutes = 0, seconds = 0, millis = 0;
const defaultTimer = 25;
const defaultBreak = 5;
const minTimer = 10;
const minBreak = 5;
let timerConfig = defaultTimer;
let breakConfig = defaultBreak;
let started = false, stopped = true;
let accumulatedTime = 0;
let lastStopwatchRecord = 0;
let lastNotification = 0;

updateWatch(defaultTimer);

timerButton.addEventListener("click", () => {
    mode = "timer";
    updateWatch(timerConfig);
    showTimerButtons();
});

breakButton.addEventListener("click", () => {
    mode = "break";
    updateWatch(breakConfig);
    showTimerButtons();
});

swButton.addEventListener("click", () => {
    mode = "stopwatch";
    updateWatch(0, 0);
    hideTimerButtons();
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
        //if actual time is more than the minimum recommended
        if (timerConfig > minTimer) {
            timerConfig--;
            updateWatch(timerConfig);
        } else {
            alert("Sessions under 10 minutes are inefficient!");
        }
    } else if (mode == "break") {
        //if actual break time is not less than recomended
        if (breakConfig > minBreak){
            breakConfig--;
            updateWatch(breakConfig);
        } else {
            alert("Take at least 5 minutes to rest!");
        }
    }
});

start.addEventListener("click", () => {
    //hide start button and show pause button
    start.classList.add("hidden");
    pause.classList.remove("hidden");
    hideTimerButtons();

    if (mode == "stopwatch") {
        resumeStopwatch();
    } else {
        resumeTimer();
    }

    started = true;
    stopped = false;
});

pause.addEventListener("click", () => {
    //if on pause
    if (stopped) {
        //resume stopwatch or timer, accordingly
        if (mode == "stopwatch") {
            resumeStopwatch();
        } else {
            resumeTimer();
        }

        //update button text
        pause.innerText = "Pause";
    } else {
        //if not on pause, clear corresponding interval, change text
        clearInterval(interval);
        pause.innerText = "Resume";

        //and update time passed
        updateAccTime();
    }

    stopped = !stopped;
});

reset.addEventListener("click", () => {

    //show start button and hide pause button
    start.classList.remove("hidden");
    pause.classList.add("hidden");

    //if on execution, clear timer, break or stopwatch
    if (!stopped) {
        //clear current interval, whichever it is
        clearInterval(interval);

        //set as not executing and change pause text
        stopped = true;
        pause.innerText = "Pause";
    }

    if (mode == "timer") {
        //if not on execution, reset to default configuration
        if (!started) {
            timerConfig = defaultTimer;
        }

        //show increase and decrease buttons
        showTimerButtons();

        updateWatch(timerConfig, 0);
    } else if (mode == "break") {
        //if not on execution, reset to default configuration
        if (!started) {
            breakConfig = defaultBreak;
        }

        //show increase and decrease buttons
        showTimerButtons();

        updateWatch(breakConfig, 0);
    } else if (mode == "stopwatch") {
        //on stopwatch mode, reset to 0
        updateWatch(0, 0);
        lastStopwatchRecord = 0;
        lastNotification = 0;
    }

    //update started accordingly
    started = false;
});

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

function resumeTimer() {
    let end = Date.now() + minutes * 60 * 1000 + seconds * 1000 + millis;

    interval = setInterval(() => {
        let actual = Date.now();
        let diff = end - actual;

        //if timer finished
        if (diff < 0) {
            //clear interval that implements timer
            clearInterval(interval);

            //show start button and hide pause button
            start.classList.remove("hidden");
            pause.classList.add("hidden");
            
            let text;

            //show corresponding notif and change to corresponding mode
            if (mode == "timer") {
                //reflect results to user
                updateAccTime();

                text = "Good job! Wanna take a break?";
                breakButton.click();
            } else {
                text = "Time to focus!";
                timerButton.click();
            }

            //if notifications are allowed
            if (Notification.permission == "granted") {
                notification = new Notification(text);
            }

            //reset millis counter
            millis = 0;
        } else {
            //if hasn't finished yet, update watch with time decreased
            updateWatch(
                Math.floor(diff / 60 / 1000),
                Math.floor((diff % (60 * 1000)) / 1000)
            );

            //and update milliseconds track, to avoid innacuracies
            millis = diff - seconds * 1000 - minutes * 1000 * 60;
        }
        
    }, 200);
}

function resumeStopwatch() {
    let startTime = Date.now() - millis - seconds * 1000 - minutes * 1000 * 60;

    interval = setInterval(() => {
        let now = Date.now();
        let diff = now - startTime;

        updateWatch(
            Math.floor(diff / 1000 / 60),
            Math.floor((diff % (1000 * 60)) / 1000)
        );
        
        millis = diff - seconds * 1000 - minutes * 60 * 1000;
        
        //if 25 minutes have passed from start or last notification, suggest user to take a break.
        if (lastNotification != minutes && seconds == 0 && (minutes * 1000) % 25000 == 0) {
            n = new Notification("More than 25 minutes have passed since last pause. Wanna take a break?\nCurrent time: " + minutes);

            lastNotification = minutes;
        }

    }, 200);
}

function updateAccTime() {

    if (mode == "timer") {
        accumulatedTime += timerConfig - minutes - Math.ceil(seconds / 60);
    } else if (mode == "stopwatch") {
        accumulatedTime += minutes - lastStopwatchRecord;
        lastStopwatchRecord = minutes;
    }

    timeRecord.innerText = accumulatedTime;
}