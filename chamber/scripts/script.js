
const __menu = document.getElementsByClassName("navigation");
const __header = document.querySelector("header");

function toggleMenu(){
    __menu[0].classList.toggle("responsive");
    
}

// select the DOM elements to manipulate (we will output to these)
const datefield = document.querySelector("time");
const date = new Date()
// for european/family history format with day first.

// derive the current date using a date object
const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
	date
);
// "full" or long, medium, short options ... try them

datefield.textContent = fulldate;
datefield.dateTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`

if(date.getDay() == 1 | date.getDay() == 2){
    let __banner = document.createElement("div")
    let __title = document.createElement("h2")
    let __line = document.createElement("hr")
    let __subTitle = document.createElement("p")
    __title.textContent = "🤝🏼 Come join us for the chamber meet and greet!";
    __subTitle.textContent = "Wednesday at 7:00 p.m.";
    
    __banner.appendChild(__title);__banner.appendChild(__line)
    __banner.appendChild(__subTitle)

    __banner.classList.add("banner")
    

    __header.parentNode.insertBefore(__banner, __header.nextSibling);




}