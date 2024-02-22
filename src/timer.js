
class Timer {
    constructor(minutes, watch) {
        this.minutes = minutes;
        this.seconds = 0;
        this.watch = watch;
    }

    get formattedTime() {
        return `${String(this.minutes).padStart(2, '0')}:${String(this.seconds).padStart(2, '0')}`;
    }

    set setSeconds(seconds) {
        this.seconds = seconds;
    }

    increaseMinutes() {
        this.minutes++;
    }

    decreaseMinutes() {
        this.minutes--;
    }

    increaseSeconds() {
        this.seconds++;
    }

    decreaseSeconds() {
        this.seconds--;
    }

    updateWatch() {
        this.watch.innerText = timer.formattedTime;
    }

}

let watch = document.getElementById("time");
let timer = new Timer(25, watch);

timer.updateWatch();

