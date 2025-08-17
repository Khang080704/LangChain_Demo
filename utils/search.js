const {tavily} = require("@tavily/core")
const { z } = require("zod");
const {tool} = require('@langchain/core/tools');

const searchFromWiki = async ({text}) => {
    const res = await fetch(
        `https://en.wikipedia.org/w/api.php?action=parse&page=${text}&format=json`
    );
    const respone = await res.json();
    return respone;
};

const searchFromTavily = async ({text}) => {
    const tvl = tavily({
        apiKey: process.env.TAVILY_API_KEY
    })
    const result = await tvl.search(text)

    return result;
};

const WikiTool = tool(searchFromWiki, {
    name: 'search_wiki',
    description: "Searching information with wikipedia. Passing the text argument. When the argument is a name of a novel, using this tool",
    schema: z.object({
        text: z.string().describe("param for tool")
    })
})

const TavilyTool = tool(searchFromTavily, {
    name: "seach_tavily",
    description: "General tool search. Using for all questions except the questions that have the name of a novel",
    schema: z.object({
        text: z.string().describe("Param for tool")
    })
})

module.exports = {
    WikiTool,
    TavilyTool
};
