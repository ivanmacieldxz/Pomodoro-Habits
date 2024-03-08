
//get every habit
let habits = document.getElementsByClassName("habit");
//get every record
let records = document.getElementsByClassName("habit-record");

//get day of january 1st, to determine which squares should be
let startingDay = (new Date(new Date().getFullYear(), 0, 1)).getDay();


let days;
//for every habit
for (let i = 0; i < habits.length; i++) {
    //get its record day squares
    days = records[i].children;

    //make invisible those squares of last year
    for (let j = 0; j < startingDay; j++) {
        days[j].style = "visibility:hidden;";
    }

}