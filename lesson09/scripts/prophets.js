const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';

function displayProphets(info){
    info.forEach(value => {
        let prophetSection = document.createElement("section");
        let orderEnd = 'th'; let age;

        let nameHeader = document.createElement("h2"); prophetSection.appendChild(nameHeader);
        let infoBox = document.createElement("div"); prophetSection.appendChild(infoBox);
        infoBox.classList.add('prophet-info') 
        let birthDiv = document.createElement("div"); infoBox.appendChild(birthDiv);
        let birthSpan = document.createElement("span");
        let placeDiv = document.createElement("div"); infoBox.appendChild(placeDiv);
        let placeSpan = document.createElement("span"); 
        let childrenDiv = document.createElement("div"); infoBox.appendChild(childrenDiv);
        let childrenSpan = document.createElement("span");
        let yearsDiv = document.createElement("div"); infoBox.appendChild(yearsDiv);
        let yearsSpan = document.createElement("span");

        let divArray = [birthDiv, placeDiv, childrenDiv, yearsDiv]
        let spanArray = [birthSpan, placeSpan, childrenSpan, yearsSpan]
        
        let birthdayArray = value.birthdate.split(" ");
        age = (new Date().getFullYear()) - parseInt(birthdayArray[2]);

        if(value.death != null){
            let deathdayArray = value.death.split(" ");

            age = parseInt(deathdayArray[2]) - parseInt(birthdayArray[2])

            let deathDiv = document.createElement("div"); infoBox.appendChild(deathDiv);
            let deathSpan = document.createElement("span");
            deathSpan.textContent = value.death;

            deathDiv.textContent = "Death: "
            deathSpan.textContent = value.death;
            deathDiv.appendChild(deathSpan);

            divArray.push(deathDiv)
            spanArray.push(deathSpan)
        }

        let ageDiv = document.createElement("div");  infoBox.appendChild(ageDiv);
        let ageSpan = document.createElement("span"); 
        divArray.push(ageDiv)
        spanArray.push(ageSpan)

        divArray.forEach(item => {
            item.style.color = 'yellow'
        })
        spanArray.forEach(item => {
            item.style.color = 'white'
        })

        let portrait = document.createElement("picture"); prophetSection.appendChild(portrait);
        let img = document.createElement("img"); portrait.appendChild(img);

        nameHeader.textContent = `${value.name} ${value.lastname}`;
        birthDiv.textContent = `Date of Birth: `
        birthSpan.textContent = `${value.birthdate}`
        placeDiv.textContent = `Place of Birth: `
        placeSpan.textContent = `${value.birthplace}`
        childrenDiv.textContent = `Children: `
        childrenSpan.textContent = `${value.numofchildren}`
        yearsDiv.textContent = `Prophet Years: `
        yearsSpan.textContent = `${value.length}`
        ageDiv.textContent = `Age: `
        ageSpan.textContent = `${age}`

        birthDiv.appendChild(birthSpan);
        placeDiv.appendChild(placeSpan);
        childrenDiv.appendChild(childrenSpan);
        yearsDiv.appendChild(yearsSpan);

        ageDiv.appendChild(ageSpan);

        img.src = value.imageurl;
        switch(value.order){
            case 1:
                orderEnd = 'st';break;
            case 2:
                orderEnd = 'nd';break;
            case 3:
                orderEnd = 'rd';break;
            case 21:
                orderEnd = 'st';break;
            case 22:
                orderEnd = 'nd';break;
            case 23:
                orderEnd = 'rd';break;
        }
        img.alt = `Portrait of ${value.name} ${value.lastname} - ${value.order}${orderEnd} Latter-day President`;
        document.querySelector(".cards").appendChild(prophetSection);
    });
}

async function getProphetData() {
    const data = await fetch(url).then(promise => {return promise.json()});
    displayProphets(data.prophets);
}
  
  getProphetData();
