
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
let timeButtons = [].slice.call(document.querySelectorAll("#watch-container button"));
let timerButton = timeButtons[2];
timeButtons.splice(-1);

let increasing = false;
let decreasing = false;
let buttonTimeout;

timeButtons[0].addEventListener("mousedown", () => {
    clearTimeout();
    buttonTimeout = setTimeout(increaseTime, 500)
});

timeButtons[0].addEventListener("mouseup", () => {
    clearTimeout();
});

timeButtons[1].addEventListener("mousedown", () => {
    clearTimeout();
    buttonTimeout = setTimeout(decreaseTime, 500);
});

timeButtons[0].addEventListener("mouseup", () => {
    clearTimeout();
});

function clearTimeout() {
    if (buttonTimeout)
        clearTimeout(buttonTimeout);
}

function increaseTime() {
    timer.increaseMinutes();
    timer.updateWatch();
}

function decreaseTime() {
    timer.decreaseMinutes();
    timer.updateWatch();
}