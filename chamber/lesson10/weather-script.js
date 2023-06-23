const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const key = "b3e32e8ae2f50de7dd9f4dec87b818c7"
const lat = '39.17'
const lon = '-75.45'
const city = 'Dover'
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`

function displayResults(weatherData) {
    console.log(currentTemp)
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)}</strong>`;
  
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;
    let descriptionArray = desc.split(' ');
    descriptionArray = descriptionArray.map(word => {
        console.log(word[0].toUpperCase() + word.slice(1))
        return word[0].toUpperCase() + word.slice(1)
    })
    let description = ''
    if(descriptionArray.length > 0){
        for(let i = 0; i < descriptionArray.length; i++){
            if(descriptionArray[i+1])
                description += descriptionArray[i] + ' '
            else
                description += descriptionArray[i];
        }
    }
    console.log(description)
  
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', description);
    captionDesc.textContent = description;
}

async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // this is for testing the call
        displayResults(data);
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
  }
  
apiFetch();
