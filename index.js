const express = require("express");
const app = express();
require("dotenv").config();
const {research, writeToFile} = require('./controller/ai.c')

app.use(express.json());

app.post("/", research);
app.post("/file", writeToFile)

app.listen(3000, () => {
    console.log("server is running");
});
