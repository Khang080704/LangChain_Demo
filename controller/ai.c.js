const {TavilyTool, WikiTool} = require('../utils/search')
const {fileTool} = require('../utils/file')
const {createExecutor} = require('../helper/createAgent.h')

const tools = [TavilyTool, WikiTool, fileTool]
 
const research = async (req, res) => {
    const {text} = req.body
    const excutor = createExecutor("You are a helpful assistance that help user answer the following information. You have to access these tools and respone to user the information",tools)
    const result = await excutor.invoke({
        input: text
    })
    return res.json({respone: result})
}

const writeToFile = async (req, res) => {
    const {text} = req.body
    const excutor = createExecutor("You are a helpful assistance that help users write their content into a file indicated by them, if file name doens'n exit, you should create it", tools)
    const result = await excutor.invoke({
        input: text
    })
    return res.json({respone: result})

}

module.exports = {
    research,
    writeToFile
}