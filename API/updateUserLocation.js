// updateUserLocation.js
import express from "express";
import UserWeatherData from "../models/userWeatherDataSchema.js"; // Adjust the import path

const router = express.Router();

router.put("/update-user-location/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const { location } = req.body;

    // Find the user by email and update their location
    const user = await UserWeatherData.findOneAndUpdate(
      { email },
      { location },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User location updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
