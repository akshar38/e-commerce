const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected To MongoDB database ${conn.connection.host}`);
  } catch (err) {
    console.log(`Error in MongoDB ${err}`);
  }
};

module.exports = connectDB;
