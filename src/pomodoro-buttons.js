
//optionButtons
let optionsButtons = document.querySelectorAll(".options");

optionsButtons.forEach(button => {
    button.addEventListener("click", select);
});

function select(event) {
    optionsButtons.forEach(btn => {
        btn.classList.remove("selected");
    });

    let buttonPressed = event.target || event.srcElement;
    buttonPressed.classList.add("selected")
}


//check as a habit button
let habitChecker = document.getElementById("habit-checker");
let habitCheckerLabel = document.getElementById("habit-checker-button");

habitChecker.addEventListener("click", () => {
    habitCheckerLabel.classList.toggle("selected");
});

//timer buttons
let timeButtons = document.querySelectorAll(".increaser-decreaser");

//interval to manage when button keeps pressed
let buttonInterval;

//add time button
timeButtons[0].addEventListener("mousedown", () => {
    increaseTime();
    buttonInterval = setInterval(increaseTime, 400)
});

timeButtons[0].addEventListener("mouseup", () => {
    removeBtnInterval();
});

//decrease time button
timeButtons[1].addEventListener("mousedown", () => {
    decreaseTime();
    buttonInterval = setInterval(decreaseTime, 400);
});

timeButtons[1].addEventListener("mouseup", () => {
    removeBtnInterval();
});

function removeBtnInterval() {
    if (buttonInterval)
        clearInterval(buttonInterval);
}

function increaseTime() {
    timer.increaseMinutes();
    timer.updateWatch();
}

function decreaseTime() {
    timer.decreaseMinutes();
    timer.updateWatch();
}

//timer function buttons events
start.addEventListener("click", timer.start);

pause.addEventListener("click", timer.pause);

restart.addEventListener("click", timer.restart)