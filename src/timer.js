
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
        this.watch.innerText = this.formattedTime;
    }

    start = () => {
        let interval = setInterval(() => {
            if (this.seconds == 0) {
                if (this.minutes != 0) {
                    this.seconds = 59;
                    this.decreaseMinutes();
                }
            } else {
                this.decreaseSeconds();

                //if gets to 00:00 after decreasing
                if (this.minutes == 0 && this.seconds == 0) {
                    //clear and alert before next iteration
                    clearInterval(interval);
                    alert("ended");
                }
            }
            this.updateWatch();
        }, 1000);

        return interval;
    }

}

let watch = document.getElementById("time");
let timer = new Timer(1, watch);

timer.updateWatch();

