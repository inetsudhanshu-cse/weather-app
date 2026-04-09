const apiKey = "54d4ab6488129967857619ef0fc01673";
document.getElementById("search-btn").addEventListener("click", () => {
  const city = document.getElementById("city-input").value;
  if (city) {
    getWeather(city);
  }
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    // Update DOM
    document.getElementById("city-name").textContent = data.name;
    document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
    document.getElementById("humidity-value").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind-value").textContent = `Wind: ${data.wind.speed} m/s`;
    document.querySelector(".current-weather").style.display="block";

    // Weather condition (e.g. Clear, Clouds, Rain, Mist, Snow)
    const weatherCondition = data.weather[0].main.toLowerCase();
    console.log(data);
    // Map to your images
   const iconMap = {
  clear: "Images/clear.png",
  clouds: "Images/clouds.png",
  rain: "Images/drizzle.png",
  mist: "Images/mist.png",
  snow: "Images/snow.png"
};

    // Pick correct image, fallback to clouds
    document.getElementById("weather-icon").src = iconMap[weatherCondition] || "clouds.png";
  } catch (error) {
    alert(error.message);
  }
}
