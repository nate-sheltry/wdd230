
const __temp = document.querySelector(".temperature");
const __windSpeed = document.querySelector(".wind_speed");
const __windChill = document.querySelector(".wind_chill");
const farenheit = "°F" 
const speed = " mph"

let temperature;
let windSpeed;


function calcWindchill(t, s){
    return 35.74 + (0.6215*t) - (35.75 *(Math.pow(s, 0.16))) + (0.4275 * t * (Math.pow(s, 0.16)))
}

function retrieveWeatherValues(){
    temperature = parseFloat(__temp.textContent.split("°")[0]);
    windSpeed = parseFloat(__windSpeed.textContent.split(" ")[0]);
    console.log(temperature +"\n"+windSpeed)
}

function setWeatherValues(){
    if(temperature > 50 || windSpeed <= 3){
        __windChill.textContent = "N/A"
        return
    }
    __windChill.textContent = `${calcWindchill(temperature, windSpeed).toFixed(1)}${farenheit}`;
}

retrieveWeatherValues();
setWeatherValues()

