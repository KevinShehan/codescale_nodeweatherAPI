// getWeatherDataForDay.js
import express from "express";
import UserWeatherData from "../models/userWeatherDataSchema.js"; // Adjust the import path

const router = express.Router();

router.get("/weather-data-for-day/:email/:day", async (req, res) => {
  try {
    const { email, day } = req.params;

    // Find the user by email
    const user = await UserWeatherData.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get weather data for the specified day
    const weatherDataForDay = user.getWeatherDataForDay(day);

    res.status(200).json({ weatherDataForDay });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
