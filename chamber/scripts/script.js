const date = new Date();
const re = new RegExp(/[A-Z\s\-]{7,}/i)
let businessDict = {};

async function fetchData(array, url){
    await fetch(url).then(response => response.json()).then(result => {businessDict = result})
}
async function directoryPage(){
    const __businessTemplate = document.querySelector('template')
    const __businessesDiv = document.querySelector('.businesses')
    const __gridButtons = document.querySelector('#directory_page').querySelectorAll('button')
    let URL = "./json/businesses.json"
    await fetchData(businessDict, URL)
    Object.keys(businessDict).forEach(business => {
        const businessTemplate = __businessTemplate.content.cloneNode(true).children[0]
        businessTemplate.children[0].textContent = businessDict[business].name;
        businessTemplate.children[1].src = businessDict[business].img;
        businessTemplate.children[2].textContent = businessDict[business].address;
        businessTemplate.children[3].textContent = businessDict[business].phonenumber;
        businessTemplate.children[4].querySelector('a').textContent = businessDict[business].website;
        businessTemplate.children[4].querySelector('a').href = businessDict[business].website;
        __businessesDiv.append(businessTemplate);
    })
    __gridButtons[0].addEventListener('click', () => {
        __businessesDiv.classList.toggle('listview', false)
        document.querySelectorAll('section').forEach((element) => {
            element.classList.toggle('list', false)
        })
    })
    __gridButtons[1].addEventListener('click', () => {
        __businessesDiv.classList.toggle('listview', true)
        document.querySelectorAll('section').forEach((element) => {
            element.classList.toggle('list', true)
        })
    })
}

if(document.querySelector("#directory_page")){
    directoryPage()
}

if(document.querySelector("#discover_page")){
    const msToDay = 86400000;
    const msToHr = 3600000;
    const __days = document.querySelector(".days_ago");
    const __hours = document.querySelector(".hours_ago");
    const __minutes = document.querySelector(".minutes_ago");
    const __seconds = document.querySelector(".seconds_ago");

    window.addEventListener('unload', () => {
        localStorage.setItem('lastVisited', date.getTime())
    });
    const priorVisit = localStorage.getItem('lastVisited') || 0;
    
    function findDays(value){
        if(value == 0){
            return [0, 0, 0, 0];
        }
        let miliseconds = date.getTime() - value;
        let days = miliseconds/msToDay;
        let hours = (miliseconds%msToDay)/msToHr;
        let minutes = ((miliseconds%msToDay)%msToHr)/60000;
        let seconds = (((miliseconds%msToDay)%msToHr)%60000)/1000;
        return [days, hours, minutes,seconds];
    }
    const lastVisit = findDays(priorVisit);
    
    function displayVisit(){
        __days.textContent = `${Math.round(lastVisit[0])}`;
        __hours.textContent = `${Math.round(lastVisit[1])}`;
        __minutes.textContent = `${Math.round(lastVisit[2])}`;
        __seconds.textContent = `${Math.round(lastVisit[3])}`;
    }
    displayVisit();

}

const __menu = document.getElementsByClassName("navigation");
const __header = document.querySelector("header");
const __textYear = document.querySelector(".footer_year")
const __modifiedDate = document.querySelector(".last_modified_date")
const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

if(document.querySelector("#submissionTime")){
    const __timeLabel = document.querySelector("#submissionTime");
    function getDateAndTime(){
        let currentTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        let currentDate = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()}, ${currentTime}`;
        __timeLabel.value = currentDate;
    }
}

__textYear.textContent = date.getFullYear();
__modifiedDate.textContent = `${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}/${date.getFullYear()} ${time}`;

function toggleMenu(){
    __menu[0].classList.toggle("responsive");
    
}

// select the DOM elements to manipulate (we will output to these)
const datefield = document.querySelector("time");
// for european/family history format with day first.

// derive the current date using a date object
const fulldate = new Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
	date
);
// "full" or long, medium, short options ... try them

datefield.textContent = fulldate;
datefield.dateTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`

if(date.getDay() == 1 || date.getDay() == 2){
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

const __images = document.querySelectorAll("img[data-src]");

//This function allows us to use an attribute to switch our place holder
//and enables us to remove that attribute, which allows us to do some CSS magic.
function loadImages(image){
    const newSrc = image.getAttribute("data-src");
    //If our targeted item does not have a data-src attribute, escape!
    if(!newSrc){
        return;
    }
    //This is just replacing the placeholder with the new src.
    image.setAttribute("src", newSrc);
    //This is telling us to get rid of the attribute after the image loads.
    image.onload = () => {
        image.removeAttribute("data-src");
    }
}

//Options is defining our view area as we scroll
let options = {
    root: document.querySelector("#scrollArea"),
    rootMargin: "0px",
    //1 means closer to being centered in screen, 0 means the bottom.
    threshold: 0,
};

function callback(entries, imgObserver) {
    //Entry in this case is an instance of our observer detecting something.
    entries.forEach((entry) => {
        //If the image isn't being viewed or isn't viewable, exit out!
        if(!entry.isIntersecting){
            return;
        //If the image is viewable (our entry's target), load the image and stop observing it.
        } else {
        loadImages(entry.target);
        imgObserver.unobserve(entry.target);
        }
    })
}

//This is telling us to call a function, which automatically passes the event causing it, and the
//object which called it. Then options is our viewable scroll area.
const observer = new IntersectionObserver(callback, options);

//Here we are telling our new observer to observe every image on the page
__images.forEach((img) => {
    observer.observe(img);
});