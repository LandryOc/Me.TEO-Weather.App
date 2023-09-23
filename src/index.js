/* Put your own API key here */ const apiKey = ""
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&lang=fr&units=metric';
//=====================================================================================
const cityInput = document.getElementById('search-input');
const searchButton = document.getElementById('button-submit');
const icons = document.querySelector('.weather-icons');
//=====================================================================================
async function weather(city) {
    //=================================================================================
    // API call
    const res = await fetch(apiUrl + `&appid=${apiKey}` + `&q=${city}`); 
    //=================================================================================
    if(res.status == 404) {
        const search = document.querySelector('.error');
        const errorText = document.createElement('p');
        errorText.classList.add('error-text')
        errorText.textContent = 'nom de ville inconnue';
        search.append(errorText);
        setTimeout(() => {
            errorText.textContent = '';
        }, 2500)
    } else {
        const data = await res.json();
        //console.log(data)
        const cityName = document.querySelector('.city-name');
        cityName.innerHTML = data.name; 
        const temp = document.querySelector('.temperature');
        const tempRound = Math.round(data.main.temp); 
        temp.innerHTML = tempRound + " °C";
        const description = document.querySelector('.description');
        description.innerHTML = data.weather[0].description; 
        const humidity = document.querySelector('.humidity-percent'); 
        humidity.innerHTML = data.main.humidity + "%";
        const wind = document.querySelector('.wind-speed');
        // Converting m/s into km/h 
        const windSpeed = data.wind.speed * 3.6;
        const windValue = Math.round(windSpeed);
        wind.innerHTML = windValue + " Km/H";
        //console.log(data.weather[0].main)
        if (data.weather[0].main == 'Clear') {
            icons.src = '../assets/icons8-summer-500.svg' 
        } else if (data.weather[0].main == 'Clouds') {
            icons.src = '../assets/icons8-clouds-500.svg'
        } else if (data.weather[0].main == 'Thunderstorm') {
            icons.src = '../assets/icons8-storm-500.svg'
        } else if (data.weather[0].main == 'Mist') {
            icons.src = '../assets/icons8-fog-500.svg'
        } else if (data.weather[0].main == 'Drizzle') {
            icons.src = '../assets/icons8-haze-500.svg'
        } else if (data.weather[0].main == 'Snow') {
            icons.src = '../assets/icons8-snow-500.svg'
        } else if (data.weather[0].main == 'Rain') {
            icons.src = '../assets/icons8-torrential-rain-500.svg'
        };
    //=================================================================================
        const weather = document.querySelector('.weather-box')
        weather.classList.add('show')
    }
};
//=====================================================================================
cityInput.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') {
        weather(cityInput.value)
    } 
})
searchButton.addEventListener('click', () => {
    weather(cityInput.value)
})
//=====================================================================================
// Dark & light mode
const button = document.querySelector('.toggle');
button.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.querySelector('.box-container');
    const container = document.querySelector('.app-container');
    const search = document.querySelector('.search-bar');
    const icons = document.querySelector('.search-icons');
    const lightButton = document.querySelector('.img-light');
    const darkButton = document.querySelector('.img-dark')
    if (document.body.style.backgroundColor === '' || document.body.style.backgroundColor === 'rgb(227, 228, 230)') {
        document.body.style.backgroundColor = '#333333';
        title.classList.add('dark');
        container.classList.add('dark');
        search.classList.add('dark');
        icons.src = '../assets/icons8-search.svg';
        lightButton.src = '../assets/icons8-sun.gif';
        lightButton.classList.add('dark');
        darkButton.classList.remove('dark')
        darkButton.src = '../assets/Icon-lune-blanc.svg';
        const input = document.getElementById('search-input');
        input.focus();
    } else {
        document.body.style.backgroundColor = '#e3e4e6';
        title.classList.remove('dark');
        container.classList.remove('dark');
        search.classList.remove('dark');
        icons.src = '../assets/icons8-chercher-480.svg';
        lightButton.classList.remove('dark');
        lightButton.src = '../assets/Icon-soleil-blanc.svg';
        darkButton.classList.add('dark');
        darkButton.src = '../assets/icons8-moon-and-stars.gif';
    }
});



