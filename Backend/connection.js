const mongoose = require("mongoose");
//Write missing code here
mongoose
  .connect(
   "mongodb+srv://irin:irinsajo@cluster0.rsru3.mongodb.net/Sample?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error);
  });
 