const express = require("express");
const cors = require("cors");
const mongoose = require("./connection");
const BlogModel = require("./model");
const app = express();
var PORT = 3001;
app.use(express.json());
app.use(cors());
//Write missing code here
// DELETE route
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await BlogModel.findByIdAndDelete(id);
    res.status(200).send({ message: "Blog deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error deleting blog" });
  }
});

// UPDATE route
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await BlogModel.findByIdAndUpdate(id, req.body);
    res.status(200).send({ message: "Blog updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error updating blog" });
  }
});

// POST route to add new blog
app.post("/add", async (req, res) => {
  try {
    const blog = new BlogModel(req.body);
    await blog.save();
    res.status(201).send({ message: "Blog added successfully", blog });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error adding blog" });
  }
});

//Write your POST API here

app.get("/get", async (req, res) => {
  try {
    let data = await BlogModel.find();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});


app.listen(PORT, () => {
  console.log(`${PORT} is up and running`);
});
