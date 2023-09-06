// userWeatherDataSchema.js
import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the schema for storing user details and weather data
const userWeatherDataSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  weatherData: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      temperature: {
        type: Number,
        required: true,
      },
      // Add more weather data fields as needed
    },
  ],
});

userWeatherDataSchema.methods.getWeatherDataForDay = function (date) {
  return this.weatherData.filter((data) => {
    // Compare the date with the provided date (ignoring time)
    const dataDate = new Date(data.date).toDateString();
    const queryDate = new Date(date).toDateString();
    return dataDate === queryDate;
  });
};

// Create and export the UserWeatherData model based on the schema
export default mongoose.model("UserWeatherData", userWeatherDataSchema);
