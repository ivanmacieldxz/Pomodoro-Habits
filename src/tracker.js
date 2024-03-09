
//get every habit
let habits = document.getElementsByClassName("habit");
//get every record
let records = document.getElementsByClassName("habit-record");

//get day of january 1st, to determine which squares should be
let startingDay = (new Date(new Date().getFullYear(), 0, 1)).getDay();

let days;
let checkers = document.getElementsByClassName("check");

let today = new Date();
let date = new Date(2024, 1, 29);

//for every habit
for (let i = 0; i < habits.length; i++) {
    //get its record day squares
    days = records[i].children;

    //para marcar un día como completado
    // days[x].classList.add("done")
    // days[x + i], con i como la cantidad de días atrás desde hoy para marcar

    //añadir los eventos a los botones
    checkers[i].addEventListener("click", () => {
        days[today.getDay()].classList.add("done");

        //hay algo mal en este, la fecha la calcula bien, pero el corrimiento lo hace mal
        days[Math.floor((today - date)
        /1000
        /60
        /60
        /24) + today.getDay() - 1].classList.add("done");
    });

}

function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}
