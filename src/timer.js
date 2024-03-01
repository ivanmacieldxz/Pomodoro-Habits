
class Timer extends Watch {

    #setting

    constructor(minutes, watch) {
        super(watch);
        this.#setting = minutes;
        this.minutes = this.#setting;
    }

    start = () => {
        //moment when timer shall end
        let countDownDate = Date.now() + this.minutes * 60 * 1000 + this.seconds * 1000;
        

        this._interval = setInterval(() => {
            //actual time
            let now = Date.now();
            
            //time elapsed from start to now
            let distance = countDownDate - now;

            this.minutes = Math.floor(distance / (1000 * 60));
            this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.updateWatch();

            if (this.seconds == 0 && this.minutes == 0) {
                clearInterval(this._interval);
                console.log("congrats!");
            }

        }, 250);
    }

    pause = () => {
        if (this.paused) {
            this.start();
        } else {
            clearInterval(this._interval);
        }
        this.paused = !this.paused;
    }

    reset = () => {
        clearInterval(this._interval);
        this.minutes = this.#setting;
        this.seconds = 0;
        this.updateWatch();
    }
}

let watch = document.getElementById("time");
let timer = new Timer(1, watch);

timer.updateWatch();

