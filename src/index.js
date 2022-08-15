//Allow person to enter the city
//Update the city to show the city entered
//Find the temperature, general weather, humidity & wind for that city
//Update the app to show the weather for that city

function updateCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#enter-city");
  cityInput = cityInput.value;

  let newCity = document.querySelector("#current-city");
  newCity.innerHTML = cityInput;
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

function showTemperature(response) {
  let temp = document.querySelector("#ctof");
  temp.innerHTML = Math.round(response.data.main.temp);
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
}
//Geolocation
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

let cityEntry = document.querySelector("#city-entry");
cityEntry.addEventListener("submit", updateCity);

let button = document.querySelector("button");
button.addEventListener("click", buttonClick);
