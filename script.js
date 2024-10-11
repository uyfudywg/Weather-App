let apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=1dc02c2cda3d32eda98eede7405d0e42`;
let searchField = document.querySelector(".search-container input");
let searchBtn = document.querySelector(".search-container button");
let search_message = document.querySelector(".search_message");
let not_found_message = document.querySelector(".not-found_message");
let WeatherDisplay = document.querySelector(".WeatherDisplay");


const weatherIcons = {
    Clouds: "img/clouds.png",
    Mist: "img/mist.png",
    Rain: "img/rain.png",
    Drizzle: "img/drizzle.png",
    Clear: "img/clear.png",
    Snow: "img/snow.png",
    Haze: "img/haze.png"
};

function city() {
    not_found_message.style.display = 'none';
    search_message.style.display = 'none';
    WeatherDisplay.style.display = 'none';
    searchField.style.borderBottom  = '2px solid rgba(255, 255, 255, 0.25)'; 
    
    const inputName = searchField.value.trim();
    const validInput = /^[a-zA-Z\s]+$/.test(inputName);
    if (inputName) {
        if(validInput){
            checkWeather(`&q=${inputName}`);
        }else{
            searchField.style.borderBottom  = '2px solid red';
            search_message.style.display = 'block';
        }
      
    } else {
        search_message.style.display = 'block';
    }
    

}

async function checkWeather(city) {
    try {
        const response = await fetch(apiURL + city);
        if (!response.ok) {
            throw new Error("Not Found");
        }
        const data = await response.json();
        search_message.style.display = 'none';

        let showdata = `
            <img src="${weatherIcons[data.weather[0].main]}" class="Weather-Icon" alt="${data.weather[0].main}">
            <h1 class="temperature">${Math.round(data.main.temp)}°C</h1>
            <h2 class="city">${data.name}</h2>
            <div class="detailsInfo">
                <div class="column">
                    <img src="img/humidity.png" alt="Humidity">
                    <div>
                        <p class="humidity">${data.main.humidity}%</p>
                        <p>Humidity</p>
                    </div>
                </div>
                <div class="column">
                    <img src="img/wind.png" alt="Wind Speed">
                    <div>
                        <p class="wind">${data.wind.speed} km/h</p>
                        <p>Wind</p>
                    </div>
                </div>
            </div>
        `;
        document.querySelector(".WeatherDisplay").innerHTML = showdata;
        WeatherDisplay.style.display = 'block';
    } catch (error) {
        not_found_message.style.display = 'block';
        search_message.style.display = 'none';
    }
}

searchBtn.addEventListener("click", city);

searchField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        city();
    }
});


