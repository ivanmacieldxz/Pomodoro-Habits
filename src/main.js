
//by default, set it on pomodoro mode
setOnPomodoro();

pomoButton.addEventListener("click", () => {
    setOnPomodoro();
});

trackerButton.addEventListener("click", () => {
    setOnTracker();
});

//mode change functions
function setOnPomodoro() {
    tracker.classList.add("hidden");
    pomodoro.classList.remove("hidden");
}

function setOnTracker() {
    tracker.classList.remove("hidden");
    pomodoro.classList.add("hidden");
}

let notification;

//if browser supports notifications
if ("Notification" in window) {
    //ask for permission
    Notification.requestPermission().then((result) => {
        console.log(result);
    });

    //remove notifications when tab becomes visible
    document.addEventListener("visibilitychange", () => {
        //if there's a notification and tab became visible, clear the notification
        if (notification != undefined && document.visibilityState === "visible") {
            notification.close();
        }
    })

}


