const __hamburger_menu = document.querySelector(".hamburger");
const __freshPage = document.querySelector("#freshpage");
const date = new Date();
document.querySelector('#last_modified_date').textContent = ` ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`
function runMenu(){
    if(__hamburger_menu == null)
        return
    __hamburger_menu.addEventListener("click", e => {
        let pages = document.querySelector(".pages")
        pages.classList.toggle('show', !pages.classList.contains('show'));
    });
}

runMenu();
let fruitList;
function freshPage(){
    return new Promise(async (resolve, reject) => {
    if(!__freshPage){
        return
    }
    const __fruitField = document.querySelector("#fruitsfield");
    fruitList = await fetch("fruits.json").then((res) => {return res.json()});
    let fruitBoxes = []
    fruitList.forEach(item => {
        let template = document.querySelector("[data-attribute=\"fruit-template\"]").content.cloneNode(true);
        let label = template.querySelector("label");
        let fruit = template.querySelector("input");
        fruit.setAttribute('id', item.name)
        fruit.setAttribute('name', item.name)

        label.setAttribute('for', item.name);

        label.appendChild(fruit)
        label.innerHTML += " " + item.name.replace(item.name[0], item.name[0].toUpperCase());
        __fruitField.appendChild(template);
        fruitBoxes.push(fruit);
    });

    resolve();
})
}

function freshPage2(){
    let fruitBoxes = document.querySelectorAll('.fruit')
    fruitBoxes.forEach(box => {
        box.addEventListener('change', (e) => {
            let fruitsSelected = document.querySelectorAll('.fruit:checked')
            if(fruitsSelected.length > 3){
                e.target.checked = false;
            }
            
        })
    })
    document.querySelector("#submit").addEventListener('click', (e)  => {
        e.preventDefault()


        let formParams = document.querySelectorAll('input');

        let name = formParams[0].value;
        let email = formParams[1].value;
        let phone = formParams[2].value;
        let instructions = document.querySelector('#instructions').value;
        if(name === '' || name == null){
            window.alert('A name is required to submit the form.')
            return
        }
        if(email === '' || email == null){
            window.alert('An email is required to submit the form.')
            return
        }
        if(phone === '' || phone == null){
            window.alert('A phone number is required to submit the form.')
            return
        }

        let fruits = []
        let fruitsStr = ""
        let fruitBoxes = document.querySelectorAll('.fruit')
        let fruitsChecked = document.querySelectorAll('.fruit:checked')
        let nutritionInfo = {"carbs": 0, "protein":0, "fat": 0, "sugar": 0, "calories": 0};
        if(fruitsChecked.length < 1){
            window.alert('At least one flavor is required to submit the form.')
            return
        }
        for(let i = 0; i < fruitList.length; i++){
            if(fruitBoxes[i].checked){
                fruits.push(fruitList[i])
                nutritionInfo.carbs += fruitList[i].carbs;
                nutritionInfo.protein += fruitList[i].protein;
                nutritionInfo.fat += fruitList[i].fat;
                nutritionInfo.sugar += fruitList[i].sugar;
                nutritionInfo.calories += fruitList[i].calories;
                fruitsStr = fruitsStr.concat(", ", fruitList[i].name[0].toUpperCase() + fruitList[i].name.slice(1, fruitList[i].name.length))
            }
        }
        const __submissionForm = document.querySelector('#form_submitted');
        __submissionForm.style.display = 'grid';
        const __firstName = document.querySelector("#firstname");
        const __mail = document.querySelector("#mail");
        const __number = document.querySelector("#number");
        const __fruits = document.querySelector("#fruits");
        const __instructions = document.querySelector("#customerinstructions");
        const __nutrition = document.querySelector('#nutrition')

        let nutritionStr =  `Carbs: &#9;${nutritionInfo.carbs}g<br>`+
                            `Protein: &#9;${nutritionInfo.protein}g<br>`+
                            `Fat: &#9;${nutritionInfo.fat}g<br>`+
                            `Sugar: &#9;${nutritionInfo.sugar}g<br>`+
                            `Calories: ${nutritionInfo.calories}`;

        __firstName.textContent = name;
        __mail.textContent = email;
        __number.textContent = phone;
        __fruits.textContent = fruitsStr.slice(2, fruitsStr.length)
        __instructions.textContent = instructions;
        __nutrition.innerHTML = nutritionStr;

        let customer = {orders: [], length: 0, time: []}
        if(localStorage.getItem('customer')){
            customer = JSON.parse(localStorage.getItem('customer'));
            customer.orders.push(fruitsStr.slice(2, fruitsStr.length));
            customer.time.push(`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`);
            customer.length += 1;
            localStorage.setItem('customer', JSON.stringify(customer))
        }
        else{
            customer.orders.push(fruitsStr.slice(2, fruitsStr.length));
            customer.time.push(`${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`);
            customer.length += 1;
            localStorage.setItem('customer', JSON.stringify(customer))
        }


    });
}

freshPage().then(freshPage2);

if(document.querySelector("#weather")){
    const currentDay = date.getDay();
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const __template = document.querySelector("[data-src=\"weather_day\"]")
    const farenheit = "°F" 
    const speed = " mph"
    const __weatherContainer = document.querySelector("#weather");
    
    const url = "https://api.openweathermap.org/data/2.5/forecast?q=Oceanside&units=imperial&cnt=24&appid=b3e32e8ae2f50de7dd9f4dec87b818c7"

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
        let indexValue = 0;
        
        for(let i = 0; i < 3; i++){
            const weatherDay = __template.content.cloneNode(true).children[0];
            const __dayHeader = weatherDay.children[0]
            const __temp = weatherDay.querySelector(".temperature");
            const __windSpeed = weatherDay.querySelector(".wind_speed");
            const __windChill = weatherDay.querySelector(".wind_chill");
            const __weatherIcon = weatherDay.querySelector("img");
            const __weatherDesc = weatherDay.querySelector(".weather_descriptor");

            let day = currentDay + i

            __dayHeader.textContent = dayNames[currentDay + i] ? dayNames[currentDay + i]: dayNames[currentDay + i - 7];
            let temperature = weatherData.list[indexValue + (i * 8)].main.temp.toFixed(0);
            __temp.textContent = temperature + farenheit
            let windSpeed = weatherData.list[indexValue + (i * 8)].wind.speed.toFixed(0);
            __windSpeed.textContent = windSpeed + speed
            const iconSrc = `https://openweathermap.org/img/w/${weatherData.list[indexValue + (i * 8)].weather[0].icon}.png`;
            __weatherIcon.src = iconSrc
            let desc = capitalizeString(weatherData.list[indexValue + (i * 8)].weather[0].description)
            __weatherDesc.textContent = desc
            if(temperature > 50 || windSpeed <= 3){
                __windChill.textContent = "N/A"
            }
            __windChill.textContent = `${calcWindchill(temperature, windSpeed).toFixed(1)}${farenheit}`;
            __weatherContainer.appendChild(weatherDay);
        }
    }
    
    
    apiFetch()
}

function getDrinks(){
    const __drinks = document.querySelector('#drinks')
    if(!__drinks)
        return
    const __drinksNum = document.querySelector('#drinks_num');
    if(localStorage.getItem('customer'))
        __drinksNum.textContent = JSON.parse(localStorage.getItem('customer')).length;
    else
        __drinksNum.textContent = '0';
}
getDrinks();