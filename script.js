const countriesContainer = document.getElementById('countries-container')
const searchInput = document.getElementById('search')
const filterSelect = document.getElementById('filter')
const btn = document.getElementById('btn')
const body = document.querySelector('body')
let countries = []; 


async function fetchCountries() {
    try{
        const response = await fetch("https://restcountries.com/v3.1/all")
        countries = await response.json()
        console.log(countries)
        displayCountries(countries)
    }catch (error){
        console.error("Error", error)
    }
}



function displayCountries(countries){
    countriesContainer.innerHTML=``
    countries.forEach(country => {
        const card = document.createElement('div')
        card.classList.add('country-card')
        card.innerHTML=`
            <img src="${country.flags.svg}" alt="${country.name.common}">
            <h3>${country.name.common}</h3>
        
        `;
        card.addEventListener('click', ()=>{
            window.location.href = `country.html?name=${country.name.common}`;
        })
        countriesContainer.appendChild(card)
    });
}

fetchCountries()

function search(){
    const inputValue= searchInput.value.trim().toLowerCase()
    const filtered = countries.filter(country=>{
        const n = country.name.common.trim().toLowerCase()
        return n.includes(inputValue)
    })
    if(filtered.length > 0){
        displayCountries(filtered)
    }else{
        countriesContainer.innerHTML=`<p>Ниче не найдено</p>`
    }
}


function filterBy(){
   const select = filterSelect.value.toLowerCase()
   if (select === "all" || select === "") {
    filteredCountries = countries;
} else {
    
    filteredCountries = countries.filter(country => {
        return country.region && country.region.toLowerCase() === select;
    });
}

displayCountries(filteredCountries); 
}

btn.addEventListener('click', () => {
    body.classList.toggle('color');
});

searchInput.addEventListener('input', search)

filterSelect.addEventListener('input', filterBy)

