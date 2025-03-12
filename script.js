const apiKeys = [
    '5a9da0e181b0e6802a128c2b91095e18',
    '09e659d9700db4985ad9884916148b9b',
    // Add up to 24 API keys here
];

let keyIndex = 0;

async function getWeather(page) {
    const city = document.getElementById('search') ? document.getElementById('search').value : 'London';  // Default city if no input
    const apiKey = apiKeys[keyIndex];
    keyIndex = (keyIndex + 1) % apiKeys.length;  // Rotate to the next key

    try {
        let response;
        if (page === 'current') {
            response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        } else if (page === 'forecast') {
            response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        }

        const data = await response.json();
        displayWeather(data, page);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data, page) {
    const weatherData = document.getElementById('weather-data');

    if (page === 'current') {
        weatherData.innerHTML = `
            <div class="weather-info">
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            </div>
        `;
    } else if (page === 'forecast') {
        weatherData.innerHTML = data.list.map(item => `
            <div class="weather-info">
                <h3>${new Date(item.dt_txt).toLocaleString()}</h3>
                <p>Temperature: ${item.main.temp}°C</p>
                <p>Weather: ${item.weather[0].description}</p>
            </div>
        `).join('');
    }
}
