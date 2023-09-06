// database.js
import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://kevin_shehan30:kevin_shehan30@cluster0.n2gbu.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("MongoDB Connection Successful");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { connectToDatabase };