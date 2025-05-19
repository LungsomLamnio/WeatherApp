const searchInput = document.getElementById("search-input");
const locBtn = document.getElementById("location-btn");
const toggleBtn = document.getElementById("unit-toggle");
const cityNameEl = document.getElementById("city-name");
const tempEl = document.getElementById("temperature");
const humidityEl = document.getElementById("humidity");
const descEl = document.getElementById("weather-description");
const weatherIconEl = document.getElementById("weather-icon");
const forecastContainer = document.getElementById("forecast-container");

const API_KEY = "f58ae87198246a07b383759b4dbebb69";
let currentTempCelsius = null;
let isCelsius = true;

document.addEventListener("DOMContentLoaded", () => {
  fetchWeatherData("Guwahati");
});

locBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => fetchWeatherByCoords(coords.latitude, coords.longitude),
      () => alert("Location access denied or not available!")
    );
  } else {
    alert("Geolocation is not supported by this browser!");
  }
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const city = searchInput.value.trim();
    if (city) {
      searchInput.value = "";
      fetchWeatherData(city);
    }
  }
});

toggleBtn.addEventListener("click", () => {
  isCelsius = !isCelsius;
  updateTemperatureDisplay();
  toggleBtn.textContent = `Switch to °${isCelsius ? "F" : "C"}`;
});

function updateTemperatureDisplay() {
  if (currentTempCelsius === null) return;
  const temp = isCelsius
    ? currentTempCelsius
    : (currentTempCelsius * 9) / 5 + 32;
  const unit = isCelsius ? "°C" : "°F";
  tempEl.textContent = `Temperature: ${Math.round(temp)}${unit}`;
}

async function fetchWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayWeatherData(data);
  } catch (err) {
    console.error("Error fetching weather by coordinates:", err);
  }
}

async function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod === "404") {
      displayError();
    } else {
      displayWeatherData(data);
    }
  } catch (err) {
    console.error("Error fetching weather data:", err);
  }
}

function displayWeatherData(data) {
  const { lat, lon } = data.coord;
  displayForecast(lat, lon);

  cityNameEl.textContent = data.name;
  currentTempCelsius = data.main.temp;
  updateTemperatureDisplay();

  humidityEl.textContent = `Humidity: ${data.main.humidity}%`;
  descEl.textContent = `Weather: ${data.weather[0].main}`;
  weatherIconEl.src = getWeatherIcon(data.weather[0].main.toLowerCase());
}

function displayError() {
  cityNameEl.textContent = "City Not Found";
  tempEl.textContent = "";
  humidityEl.textContent = "";
  descEl.textContent = "";
  weatherIconEl.src = getWeatherIcon("not found");
}

function getWeatherIcon(condition) {
  const icons = {
    clear: "sunny",
    cloud: "cloudy",
    rain: "rainy",
    snow: "snowy",
    thunderstorm: "thunderstorm",
    smoke: "smoke",
    haze: "haze",
    mist: "mist",
  };

  for (let key in icons) {
    if (condition.includes(key)) return `../Images/${icons[key]}.png`;
  }
  return "../Images/no-image.png";
}

async function displayForecast(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod !== "200") return;

    const daily = {};
    data.list.forEach((f) => {
      const day = new Date(f.dt * 1000).toLocaleDateString("en-US", {
        weekday: "short",
      });
      if (!daily[day]) daily[day] = f;
    });

    forecastContainer.innerHTML = "";
    Object.values(daily)
      .slice(1, 4)
      .forEach((day) => {
        const icon = getWeatherIcon(day.weather[0].main.toLowerCase());
        forecastContainer.innerHTML += `
          <div class="forecast-day">
            <p>${new Date(day.dt * 1000).toLocaleDateString("en-US", {
              weekday: "short",
            })}</p>
            <img src="${icon}" alt="${day.weather[0].main}" />
            <p>${Math.round(day.main.temp)}°C</p>
          </div>
        `;
      });
  } catch (err) {
    console.error("Error fetching forecast:", err);
  }
}
