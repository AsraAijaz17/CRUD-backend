const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const User = require("./models/user.js");

const DbURL =
  "mongodb+srv://test:test123@cluster0.kegwifd.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DbURL)
  .then(() => console.log("Database connected ... "))
  .catch((err) => console.log(err));

// GET API
app.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.log("users"), res.send("something went wrong");
  }
});
// POST API
app.post("/", async (req, res) => {
  try {
    const users = await User.create(req.body);
    res.json(users);
  } catch (err) {
    console.log("users"), res.send("something went wrong");
  }
});

// DELETE API
app.delete("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);

    res.json({ message: "User deleted successfully" });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
  } catch (err) {
    console.log("users");
    res.status(500).send("something went wrong");
  }
});

// UPDATE API
app.put("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body;

    const user = await User.findByIdAndUpdate(userId, updatedUserData, {
      new: true,
    });
    res.json({ message: "User updated successfully", user });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).send("something went wrong");
  }
});

app.listen(4000, () => {
  console.log(`Server is running on ${4000}`);
});
