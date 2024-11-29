const API_KEY = 'b4d5deeffda6e45ebc03953e551a4429';


const weatherBackgrounds = {
    'clear': 'images\ clear.png',
    'clouds':'images\ cloud.png',
    'rain':'images\ rain.png',
    'snow':'images\ snow.png',
    'default': 'images\ drizzle.png',
}


const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityNameEl = document.getElementById('city-name');
const weatherIconEl = document.getElementById('weather-icon');
const temperatureEl = document.getElementById('temperature');
const descriptionEl = document.getElementById('description');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind');

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value;
        if (city) {
            fetchWeather(city);
        }
    }
});

// Fetch Weather Function
async function fetchWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        if (data.cod === '404') {
            alert('City not found. Please try again.');
            return;
        }

        // Update weather information
        cityNameEl.textContent = data.name;
        document.querySelector("#temperature").innerHTML=Math.round(data.main.temp)+"°C";
        descriptionEl.textContent = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
        humidityEl.textContent = `Humidity: ${data.main.humidity}%`;
        windEl.textContent = `Wind Speed: ${data.wind.speed} m/s`;

        // Set weather icon
        const iconCode = data.weather[0].icon;
        weatherIconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        // Set background based on weather condition
        const mainCondition = data.weather[0].main.toLowerCase();
        const backgroundImage = weatherBackgrounds[mainCondition] || weatherBackgrounds['default'];
        document.body.style.backgroundImage = `url('${backgroundImage}')`;

    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('An error occurred while fetching weather data.');
    }
}