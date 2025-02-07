
# Weather App



## Overview
This is a simple Weather App that fetches real-time weather data for any city using the OpenWeather API. It displays temperature, humidity, and weather conditions with an appropriate weather icon. The default city shown on startup is Guwahati.
## Features

- Search for weather information by entering a city name.
- Displays temperature, humidity, and weather conditions.
- Shows an appropriate weather icon based on the weather    condition.
- Default location set to Guwahati when the app loads.
- Handles invalid city names and displays an error message.


## Tech Stack

**HTML:** Structure of the web page

**CSS:** Styling for a clean and responsive UI

**JavaScript:** Fetching and displaying weather data

**OpenWeather API:** Provides weather data


## Installation

### Prerequisites

- A web browser (Chrome, Firefox, Edge, etc.)

- A text editor (VS Code, Sublime Text, etc.)

### Steps to run the project

- Clone this repository:

```bash
  git clone https://github.com/LungsomLamnio/WeatherApp
```
- Open the project folder in your text editor.
- Replace **API_KEY** in app.js with your own API key from [OpenWeather](https://openweathermap.org/).
- Open **index.html** in your web browser.
## API Usage
This app uses the [OpenWeather API](This app uses the OpenWeather API to fetch weather data.) to fetch weather data.

- API Endpoint:
```bash
https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric
```
- Response includes:
    - **name:** City Name
    - **main.temp:** Temperature (°C)
    - **main.humidity:** Humidity (%)
    - **weather[0].main:** Weather condition

## Example Cities to Test
- New York
- London
- Tokyo
- Sydney
- Mumbai
- Dubai
## Future Enhancements
- Add a background that changes dynamically based on the weather.
- Show a 5-day weather forecast.
- Implement geolocation to fetch weather automatically based on user location.
## Screenshots

![Homepage Screenshot](../Images/screenshot.png)
## License

This project is open-source and free to use. Feel free to modify and improve it!


## Author

- Developed by ***Lungsom Lamnio***

