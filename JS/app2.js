async function fetchWeatherData() {
  let lon = -91.7086;
  let lat = 26.1158;
  let API_KEY = "f58ae87198246a07b383759b4dbebb69";
  let API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=26.1158&lon=-91.7086&appid=${API_KEY}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.cod === "200") {
      console.log(data);
      return;
    } else {
      console.log("not found");
    }
  } catch (err) {
    console.error("Error fetching weather data: ", err);
  }
}
