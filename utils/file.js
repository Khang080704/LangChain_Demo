const fs = require('fs')
const { z } = require("zod");
const {tool} = require('@langchain/core/tools');

const writeToFile = async ({filename, content, append}) => {
    if(append) {
        await fs.appendFileSync(filename, content, "utf8");
        return "Append successfully"
    }
    await fs.writeFileSync(filename, content, "utf8")
    return "Write down successfully"
}

const fileTool = tool(writeToFile, {
    name: 'file_working',
    description: 'Using this tool when user askes to write down something to file',
    schema: z.object({
        filename: z.string().describe("This is filename. User will provide"),
        content: z.string().describe("This is content written to file, user will provide the content"),
        append: z.boolean().describe("If user asks to write append, set this to true. If user doens't say anything or doens't allow to append, set this to false")
    })
})

module.exports = {
    fileTool
}