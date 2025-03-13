const countryDetails = document.getElementById('country-details')
const back = document.getElementById('back')


function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param); 
}

async function countries() {
    try{
    const country =  getQueryParam('name')
    const fetcount = await fetch(`https://restcountries.com/v3.1/name/${country}`)
    const res = await fetcount.json();
    
        displayCountryDetails(res[0]);

    }catch(error){
    console.log('error', error)
    countryDetails.innerHTML = `<p>Не удалось загрузить информацию о стране.</p>`;

    }
}

function displayCountryDetails(country) {
    countryDetails.innerHTML = `
        <h2>${country.name.common}</h2>
        <img src="${country.flags.svg}" alt="${country.name.common}" width="500px">
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Population:</strong> ${country.population}</p>
        <p><strong>Capital:</strong> ${country.capital}</p>
        <p><strong>Language:</strong> ${Object.values(country.languages).join(', ')}</p>
        <p><strong>Currency:</strong> ${Object.values(country.currencies).map(currency => currency.name).join(', ')}<span> - ${Object.values(country.currencies).map(currency => currency.symbol).join(', ')}</span>
        </p>
    `;
}

back.addEventListener('click', () => {
    window.history.back(); 
});

countries()