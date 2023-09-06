import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { connectToDatabase } from "./database/database.js";
import UserWeatherData from "./models/userWeatherDataSchema.js";
import { saveWeatherData } from "./API/userWeatherDataController.js";
import storeUserDetailsRoute from "./API/storeUserDetails.js";
import updateUserLocationRoute from "./API/updateUserLocation.js";
import getWeatherDataForDayRoute from "./API/getWeatherDataForDay.js";

const app = express();
const port = 4000;

app.use(bodyParser.json());

connectToDatabase()
  .then(() => {

    app.use("/api", storeUserDetailsRoute);
    app.use("/api", updateUserLocationRoute);
    app.use("/api", getWeatherDataForDayRoute);
    // Route to save user weather data
    app.post("/api/save-weather-data", saveWeatherData);

    // Route to get weather data for a specific day (you can add this route as well)
    app.get("/api/weather-data-for-day/:email/:day", async (req, res) => {
      try {
        const { email, day } = req.params;
        const user = await UserWeatherData.findOne({ email });

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const weatherDataForDay = user.getWeatherDataForDay(day);

        res.status(200).json({ weatherDataForDay });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    app.listen(port, () => {
      console.log(`Server is running on port: http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
