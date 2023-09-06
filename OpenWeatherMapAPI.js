import { get } from "axios";

const OPENWEATHERMAP_API_KEY = "d3656dd5dcf1326671971b7e6dffd962";

async function fetchWeatherData(location) {
  try {
    const response = await get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${OPENWEATHERMAP_API_KEY}`
    );
    const weatherData = {
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      // Add other relevant weather data fields
    };
    return weatherData;
  } catch (error) {
    throw error;
  }
}

export default { fetchWeatherData };
