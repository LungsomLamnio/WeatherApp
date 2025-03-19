let searchInput = document.getElementById("search-input");

document.addEventListener("DOMContentLoaded", () => {
  fetchWeatherData("Guwahati");
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    let cityName = searchInput.value.trim();
    searchInput.value = "";
    fetchWeatherData(cityName);
  }
});

async function fetchWeatherData(cityName) {
  let API_KEY = "f58ae87198246a07b383759b4dbebb69";
  let API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.cod === "404") {
      displayError();
      return;
    }
    displayWeatherData(data);
  } catch (err) {
    console.error("Error fetching weather data: ", err);
  }
}

async function displayForecast(lat, lon) {
  let API_KEY = "f58ae87198246a07b383759b4dbebb69";
  let API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.cod === "200") {
      for (let i = 8; i < 25; i += 8) {
        console.log(data.list[i]);

        // let fore_temp = document.getElementById("fore-temp");
        // fore_temp.innerText = `${data.list[i].main.temp}`;
      }
      return;
    } else {
      console.log("not found");
    }
  } catch (err) {
    console.error("Error fetching weather data: ", err);
  }
}

function displayWeatherData(data) {
  const lat = data.coord.lat;
  const lon = data.coord.lon;
  displayForecast(lat, lon);

  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const humidity = document.getElementById("humidity");
  const weatherDescription = document.getElementById("weather-description");
  const weatherIcon = document.getElementById("weather-icon");

  cityName.innerText = data.name;
  temperature.innerText = `Temperature ${data.main.temp}°C`;
  humidity.innerText = `Humidity: ${data.main.humidity}%`;
  weatherDescription.innerText = `Weather: ${data.weather[0].main}`;

  const weatherCondition = data.weather[0].main.toLowerCase();
  weatherIcon.src = getWeatherIcon(weatherCondition);
}

function getWeatherIcon(weatherCondition) {
  if (weatherCondition.includes("clear")) {
    return "../Images/sunny.png";
  } else if (weatherCondition.includes("cloud")) {
    return "../Images/cloudy.png";
  } else if (weatherCondition.includes("rain")) {
    return "../Images/rainy.png";
  } else if (weatherCondition.includes("snow")) {
    return "../Images/snowy.png";
  } else if (weatherCondition.includes("thunderstorm")) {
    return "../Images/thunderstorm.png";
  } else if (weatherCondition.includes("smoke")) {
    return "../Images/smoke.png";
  } else if (weatherCondition.includes("haze")) {
    return "../Images/haze.png";
  } else if (weatherCondition.includes("mist")) {
    return "../Images/mist.png";
  } else {
    return "../Images/no-image.png";
  }
}

function displayError() {
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const humidity = document.getElementById("humidity");
  const weatherDescription = document.getElementById("weather-description");
  const weatherIcon = document.getElementById("weather-icon");

  cityName.innerText = "City Not Found";
  temperature.innerText = "";
  humidity.innerText = "";
  weatherDescription.innerText = "";

  weatherIcon.src = getWeatherIcon("City Not Found");
}
