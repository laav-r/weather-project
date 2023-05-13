const getWeatherData = (city) => {
  fetch(`http://localhost:3000/api/data/${city}`)
    .then((response) => response.json())
    .then((data) => showWeatherData(data))
    .catch((error) => console.log(error));
};

const city = document.getElementById("cityInput");
city.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.getElementById("searchButton").click();
  }
});

const searchCity = () => {
  getWeatherData(city.value);
};

const showWeatherData = (weatherData) => {
  const cityTitle = document.getElementById("cityTitle");
  cityTitle.innerText = weatherData.name;

  const weatherDescription = document.getElementById("weatherDescription");
  weatherDescription.innerText = weatherData.weather[0].main;
  changeBackground(weatherDescription);

  const weatherIcon = document.getElementById("weatherIcon");
  weatherIcon.src = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  weatherIcon.alt = weatherData.weather[0].description;
  weatherIcon.style.display = "block";

  const temp = document.getElementById("temp");
  temp.innerText = weatherData.main.temp;

  const minTemp = document.getElementById("minTemp");
  minTemp.innerText = weatherData.main.temp_min;

  const maxTemp = document.getElementById("maxTemp");
  maxTemp.innerText = weatherData.main.temp_max;
};

const changeBackground = (weatherDescription) => {

  const attribution = document.getElementById("attribution");

  switch (weatherDescription.innerText) {
    case "Clouds":
      document.body.style.backgroundImage =
        "url('images/sky-clouds-background.jpg')";
        attribution.innerText = "Designed by Freepik";
      break;

    case "Clear":
      document.body.style.backgroundImage = "url('images/blue-sky.jpg')";
      attribution.innerText = "Designed by Freepik";
      break;

    case "Rain":
      document.body.style.backgroundImage = "url('images/raindrops.jpg')";
      attribution.innerText = "Designed by Freepik";
      break;

    case "Haze":
    case "Mist":
    case "Fog":
      document.body.style.backgroundImage = "url('images/haze.jpg')";
      attribution.innerText = "Designed by Freepik";
      break;

    default:
      document.body.style.backgroundImage =
        "url('images/clean-gray-paper.png')";
  }
};


