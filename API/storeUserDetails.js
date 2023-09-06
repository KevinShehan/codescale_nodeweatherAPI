// storeUserDetails.js
import express from "express";
import UserWeatherData from "../models/userWeatherDataSchema.js"; // Adjust the import path

const router = express.Router();

router.post("/store-user-details", async (req, res) => {
  try {
    const { email, location } = req.body;

    // Create a new user or update an existing user's location
    let user = await UserWeatherData.findOne({ email });

    if (!user) {
      user = new UserWeatherData({
        email,
        location,
      });
    } else {
      user.location = location;
    }

    await user.save();

    res.status(200).json({ message: "User details stored successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
