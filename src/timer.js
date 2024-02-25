
class Timer extends Watch {

    constructor(minutes, watch) {
        super(watch);
        this.minutes = minutes;
    }

    start = () => {
        //moment when timer shall end
        let countDownDate = Date.now() + this.minutes * 60 * 1000;
        

        this._interval = setInterval(() => {
            //actual time
            let now = Date.now();
            
            //time elapsed from start to now
            let distance = countDownDate - now;

            this.minutes = Math.floor(distance / (1000 * 60));
            this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

            this.updateWatch();

            console.log(distance);
            if (distance == 0) {
                clearInterval(this._interval);
                alert("congrats!")
            }

        }, 250);
    }

    pause() {
        
    }

    reset = () => {
        clearInterval(this._interval);
    }
}

let watch = document.getElementById("time");
let timer = new Timer(1, watch);

timer.updateWatch();

