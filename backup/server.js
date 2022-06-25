const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");



const fs = require("fs");

const path = require("path");

const express = require("express");

const { animals } = require("./data/animals.json");

console.log(animals);

const PORT = process.env.PORT || 3001;
const app = express();

//Parse incoming string or array data
app.use(express.urlencoded({ extended: true}));

//Parse incoming JSON data
app.use(express.json());

app.use("/api", apiRoutes);

app.use("/", htmlRoutes);


// make public css and js available
app.use(express.static("public"));




app.listen(PORT, () => {

    console.log(`API Server now on port ${PORT}`);

});