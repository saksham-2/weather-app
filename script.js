document.getElementById('city-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const city = document.getElementById('city-input').value;
  const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
  const options = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '0e946549dbmsh3b7e4eda54f939fp1a0303jsn035db1b67fa8',
          'x-rapidapi-host': 'weather-by-api-ninjas.p.rapidapi.com'
      }
  };

  try {
      console.log('Fetching weather data...');
      const response = await fetch(url, options);

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Weather data received:', result);

      if (!result.temp) {
          throw new Error('Weather data not available for this city');
      }

      displayWeatherInfo(city, result);
  } catch (error) {
      console.error('Error fetching weather data:', error);
      showError(error.message);
  }
});

function displayWeatherInfo(city, weatherData) {
  const { temp, humidity, wind_speed, sunrise, sunset, feels_like, cloud_pct, max_temp, min_temp, wind_degrees } = weatherData;

  document.getElementById('city-name').innerText = city;
  document.getElementById('temperature').innerText = `Temperature: ${temp}°C`;
  document.getElementById('feels-like').innerText = `Feels Like: ${feels_like}°C`;
  document.getElementById('humidity').innerText = `Humidity: ${humidity}%`;
  document.getElementById('wind-speed').innerText = `Wind Speed: ${wind_speed} m/s`;
  document.getElementById('cloud-pct').innerText = `Cloud Coverage: ${cloud_pct}%`;
  document.getElementById('sunrise').innerText = `Sunrise: ${formatTime(sunrise)}`;
  document.getElementById('sunset').innerText = `Sunset: ${formatTime(sunset)}`;
  document.getElementById('max-temp').innerText = `Max Temperature: ${max_temp}°C`;
  document.getElementById('min-temp').innerText = `Min Temperature: ${min_temp}°C`;
  document.getElementById('wind-degrees').innerText = `Wind Degrees: ${wind_degrees}°`;

  document.getElementById('weather-info').style.display = 'block';
  document.getElementById('error-message').innerText = '';
}

function showError(message) {
  document.getElementById('weather-info').style.display = 'none';
  document.getElementById('error-message').innerText = `Error: ${message}`;
}

function formatTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
