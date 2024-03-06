
//by default, set it on pomodoro mode
setOnPomodoro();

pomoButton.addEventListener("click", () => {
    setOnPomodoro();
});

trackerButton.addEventListener("click", () => {
    setOnTracker();
});

function setOnPomodoro() {
    tracker.classList.add("hidden");
    pomodoro.classList.remove("hidden");
}

function setOnTracker() {
    tracker.classList.remove("hidden");
    pomodoro.classList.add("hidden");
}

