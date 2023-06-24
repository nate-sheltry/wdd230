if(document.querySelector("#weather")){
const __temp = document.querySelector(".temperature");
const __windSpeed = document.querySelector(".wind_speed");
const __windChill = document.querySelector(".wind_chill");
const __weatherIcon = document.querySelector("#weather").querySelector("img");
const __weatherDesc = document.querySelector(".weather_descriptor");
const farenheit = "°F" 
const speed = " mph"

const url = "https://api.openweathermap.org/data/2.5/weather?q=Dover&units=imperial&appid=b3e32e8ae2f50de7dd9f4dec87b818c7"

let temperature;
let windSpeed;

function capitalizeString(string){
    let strArray = string.split(" ")
    let newString = "";
    for(i = 0; i < strArray.length; i++){
        strArray[i] = strArray[i][0].toUpperCase() + strArray[i].slice(1)
        if(strArray[i+1])
            newString += strArray[i] + ' ';
        else
            newString += strArray[i]
    }
    return newString
}

async function apiFetch(){
    const data = await fetch(url).then(res => res.json()).then(result => {return result})
    .catch(error => console.error(error))
    setWeatherValues(data);
}

function calcWindchill(t, s){
    return 35.74 + (0.6215*t) - (35.75 *(Math.pow(s, 0.16))) + (0.4275 * t * (Math.pow(s, 0.16)))
}

function setWeatherValues(weatherData){
    let = temperature = weatherData.main.temp.toFixed(0);
    __temp.textContent = temperature + farenheit
    let windSpeed = weatherData.wind.speed.toFixed(0);
    __windSpeed.textContent = windSpeed + speed
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    __weatherIcon.src = iconsrc
    let desc = capitalizeString(weatherData.weather[0].description)
    __weatherDesc.textContent = desc
    if(temperature > 50 || windSpeed <= 3){
        __windChill.textContent = "N/A"
        return
    }
    __windChill.textContent = `${calcWindchill(temperature, windSpeed).toFixed(1)}${farenheit}`;
}


    apiFetch()
}
