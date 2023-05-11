
const __menu = document.getElementsByClassName("navigation");

function toggleMenu(){
    __menu[0].classList.toggle("responsive");
    
}

// select the DOM elements to manipulate (we will output to these)
const datefield = document.querySelector("time");
// for european/family history format with day first.

// derive the current date using a date object
const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
	new Date()
);
// "full" or long, medium, short options ... try them

datefield.textContent = fulldate;