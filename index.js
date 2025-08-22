const express = require("express");
const app = express();
require("dotenv").config();
const {browser, browserTool} = require('./utils/browser')
const {createExecutor} = require('./helper/createAgent.h')

app.use(express.json());

app.use('/search', require('./router/search.r'))
app.use('/file', require('./router/file.r'))
app.post('/web', require('./controller/ai.c').crawlWebPage);

app.listen(3000, () => {
    console.log("server is running");
});