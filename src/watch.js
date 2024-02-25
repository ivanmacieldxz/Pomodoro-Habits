
class Watch {
    _interval;

    constructor(watch) {
        this.minutes = 0;
        this.seconds = 0;
        this.watch = watch;
        this.paused = false;
        this._interval = null;
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
}
