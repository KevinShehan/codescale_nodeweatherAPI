// controllers/userWeatherDataController.js
import UserWeatherData from "../models/userWeatherDataSchema.js";

// Function to save user weather data
export const saveWeatherData = async (req, res) => {
  try {
    const { email, location, temperature } = req.body;

    let user = await UserWeatherData.findOne({ email });

    if (!user) {
      user = new UserWeatherData({
        email,
        location,
      });
    }

    user.weatherData.push({ temperature });

    await user.save();

    res.status(200).json({ message: "Weather data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
