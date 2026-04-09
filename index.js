const apiKey = "YOUR_REAL_API_KEY";

document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();
  if (city) getWeather(city);
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message);
    }

    const data = await response.json();

    document.getElementById("city-name").textContent = data.name;
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("humidity-value").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind-value").textContent = `Wind: ${data.wind.speed} m/s`;

    document.querySelector(".current-weather").style.display = "block";

    const iconMap = {
      clear: "Images/clear.png",
      clouds: "Images/clouds.png",
      rain: "Images/drizzle.png",
      mist: "Images/mist.png",
      snow: "Images/snow.png"
    };

    const condition = data.weather[0].main.toLowerCase();
    document.getElementById("weather-icon").src =
      iconMap[condition] || "Images/clouds.png";

  } catch (error) {
    alert(error.message);
  }
}