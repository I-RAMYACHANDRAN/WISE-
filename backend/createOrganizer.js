const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const connectDB = require("./config/db");
const User = require("./models/User");

const createOrganizer = async () => {

  try {

    await connectDB();

    const existingUser = await User.findOne({
      email: "admin@wise.com",
    });

    if (existingUser) {

      console.log("Organizer already exists.");

      process.exit();

    }

    const password = await bcrypt.hash(
      "admin123",
      10
    );

    await User.create({

      name: "Organizer",

      email: "admin@wise.com",

      password,

      organization: "WISE",

      designation: "Conference Organizer",

      role: "organizer",

    });

    console.log("Organizer created successfully.");

    process.exit();

  } catch (error) {

    console.error(error);

    process.exit(1);

  }

};

createOrganizer();