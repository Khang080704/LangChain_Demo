const cheerio = require("cheerio");
const { z } = require("zod");
const { tool } = require("@langchain/core/tools");
const { AssemblyAI } = require("assemblyai");

const client = new AssemblyAI({
    apiKey: process.env.ASSEMBLYAI_API_KEY,
});

const browser = async ({ url }) => {
    const res = await cheerio.fromURL(url);
    const docs = res.text();

    return docs;
};

async function transcribeYoutube(url) {
    // 1. Gửi request tạo transcript từ YouTube URL
    const response = await fetch("https://api.assemblyai.com/v2/transcript", {
        method: "POST",
        headers: {
            authorization: process.env.ASSEMBLYAI_API_KEY,
            "content-type": "application/json",
        },
        body: JSON.stringify({
            audio_url: url,
        }),
    });

    const data = await response.json();
    console.log("Transcript ID:", data.id);

    // 2. Polling để lấy kết quả
    let transcript;
    const res = await fetch(
        `https://api.assemblyai.com/v2/transcript/${data.id}`,
        { headers: { authorization: process.env.ASSEMBLYAI_API_KEY } }
    );
    transcript = await res.json();

    if (transcript.status === "completed") {
        return transcript.text;
    } 

}

const youtubeBrowser = async ({ url }) => {
    const text = await transcribeYoutube(url);
    return text;
};

const browserTool = tool(browser, {
    name: "browser_tool",
    description: "Using this tool to summarize web pages",
    schema: z.object({
        url: z.string(),
    }),
});

const youtubeTool = tool(youtubeBrowser, {
    name: "youtube_tool",
    description: `Using this tool when user asks you to summarize a YouTube video. This tool will
        return to you a transcript of the video. Your mission is to summarize the transcript.`,
    schema: z.object({
        url: z.string(),
    }),
});

module.exports = {
    browser,
    browserTool,
    youtubeTool,
};
