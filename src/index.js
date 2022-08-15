function updateCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city");
  cityInput = cityInput.value;
  searchCity(cityInput);
}

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "2b17fbae1b8b000780a0accf16f61402";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2">
          <div class="card" style="width: 7rem;">
  <img class="card-img-top" src="http://openweathermap.org/img/wn/50d@2x.png" alt="Card image cap">
  <div class="card-body">
    <div class = "weather-forecast-date">${day}</div>
    <div class="weather-forecast-temp">
    <span class="weather-forecast-temp-max">29°C</span><span class="weather-forecast-temp-min"> 17°C</span></div>
   
  </div>
</div>
</div>
          
          `;
  });
  forecastHTML = forecastHTML + `<div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "2b17fbae1b8b000780a0accf16f61402";
  let apiUrl = `api.openweathermap.org/data/2.5/forecast/daily?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let temp = document.querySelector("#ctof");
  celsiusTemperature = response.data.main.temp;
  temp.innerHTML = Math.round(celsiusTemperature);
  let description = document.querySelector("#weather-description");
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let name = document.querySelector("#current-city");
  name.innerHTML = response.data.name;
  let dateElement = document.querySelector("#day");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let icon = document.querySelector("#main-weather-icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function buttonClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

function retrievePosition(position) {
  let apiKey = "2b17fbae1b8b000780a0accf16f61402";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temp = document.querySelector("#ctof");
  celsiuslink.classList.remove("active");
  farenheitlink.classList.add("active");
  temp.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiuslink.classList.add("active");
  farenheitlink.classList.remove("active");
  let temp = document.querySelector("#ctof");
  temp.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let cityEntry = document.querySelector("#city-entry");
cityEntry.addEventListener("submit", updateCity);

let button = document.querySelector("button");
button.addEventListener("click", buttonClick);

let farenheitlink = document.querySelector("#fahrenheit-link");
farenheitlink.addEventListener("click", showFahrenheitTemperature);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", showCelsiusTemperature);
