document.addEventListener("DOMContentLoaded", () => {
  const cityInp = document.getElementById("inp");
  const getBtn = document.getElementById("btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityName = document.getElementById("city-name");
  const temp = document.getElementById("temperature");
  const desc = document.getElementById("description");
  const err = document.getElementById("error");
  const API_KEY = "65c5a61b9c059cca07c71cf05ca79f9b"; // env var

  getBtn.addEventListener("click", async () => {
    const city = cityInp.value.trim();
    if (!city) {
      alert("Enter a city......");
      return;
    }

    try {
      const wData = await fetchData(city);
      displayData(wData);
    } catch (error) {
      showError();
    }
  });

  async function fetchData(city) {
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  }

  function displayData(weatherData) {
    
    err.classList.add("hidden");

    weatherInfo.classList.remove("hidden");

    //  content
    cityName.textContent = `${weatherData.name}, ${weatherData.sys.country}`;
    temp.textContent = `${Math.round(weatherData.main.temp)}°C`;
    desc.textContent = `${weatherData.weather[0].main} : ${weatherData.weather[0].description}`;
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    err.classList.remove("hidden");
  }
});
