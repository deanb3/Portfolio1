async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '5c80007ced894433bb82894e2566433b';  // Replace with your actual API key
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;

    try {
        // Fetch current weather data
        const currentResponse = await fetch(currentWeatherUrl);
        const currentData = await currentResponse.json();

        // Update current weather section
        document.getElementById('cityName').textContent = currentData.name;
        document.getElementById('temperature').textContent = `Temperature: ${currentData.main.temp}°F`;
        document.getElementById('description').textContent = currentData.weather[0].description;

        const currentIconCode = currentData.weather[0].icon;
        const currentIconUrl = `http://openweathermap.org/img/wn/${currentIconCode}@2x.png`;
        document.querySelector('.current-weather .icon').innerHTML = `<img src="${currentIconUrl}" alt="weather icon">`;

        // Dynamically change the background based on the weather condition
        const weatherCondition = currentData.weather[0].main.toLowerCase();
        changeBackground(weatherCondition);

        // Fetch 5-day forecast data
        const forecastResponse = await fetch(forecastWeatherUrl);
        const forecastData = await forecastResponse.json();

        const forecastDays = document.querySelectorAll('.day');
        for (let i = 0; i < forecastDays.length; i++) {
            const forecastIndex = i * 8; // Get data for every 24 hours (3-hour intervals * 8 = 1 day)
            const forecastDay = forecastData.list[forecastIndex];

            // Update forecast icons and temperature
            const forecastIconCode = forecastDay.weather[0].icon;
            const forecastIconUrl = `http://openweathermap.org/img/wn/${forecastIconCode}@2x.png`;
            forecastDays[i].querySelector('.icon').innerHTML = `<img src="${forecastIconUrl}" alt="forecast icon">`;
            forecastDays[i].querySelector('.temp').textContent = `${Math.round(forecastDay.main.temp)}°F`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to change the background based on weather condition
function changeBackground(condition) {
    const body = document.body;

    switch (condition) {
        case 'clear':
            body.style.backgroundImage = "url('C:\Users\deane\Downloads\clear sky background (1).jpg')";
            break;
        case 'clouds':
            body.style.backgroundImage = "url('C:\Users\deane\Downloads\tinified (1)\cloudy background.jpg')";
            break;
        case 'rain':
            body.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Cloudy_sky_%2826171935906%29.jpg/1024px-Cloudy_sky_%2826171935906%29.jpg')";
            break;
        case 'snow':
            body.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Cloudy_sky_%2826171935906%29.jpg/1024px-Cloudy_sky_%2826171935906%29.jpg')";
            break;
        default:
            body.style.backgroundImage = "url('https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Cloudy_sky_%2826171935906%29.jpg/1024px-Cloudy_sky_%2826171935906%29.jpg')";
            break;
    }

    body.style.backgroundSize = 'cover';
    body.style.backgroundPosition = 'center';
    body.style.backgroundRepeat = 'no-repeat';
}
