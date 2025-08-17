const {ChatGoogleGenerativeAI} = require("@langchain/google-genai");


const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.0-flash",
    temperature: 0,
    apiKey: process.env.GOOGLE_API_KEY
});

module.exports = {
    model
}