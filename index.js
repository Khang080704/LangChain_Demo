const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());

app.use('/search', require('./router/search.r'))
app.use('/file', require('./router/file.r'))

app.listen(3000, () => {
    console.log("server is running");
});
