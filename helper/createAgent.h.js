const {createToolCallingAgent, AgentExecutor} = require("langchain/agents");
const { ChatPromptTemplate } = require('@langchain/core/prompts');
const {model} = require('../config/model.c')

function createExecutor(systemPrompt, tools) {
    const prompt = ChatPromptTemplate.fromMessages([
        ["system", systemPrompt],
        ["human", "{input}"],
        ["placeholder", "{agent_scratchpad}"],
    ]);

    const agent = createToolCallingAgent({ llm: model, tools, prompt });

    return new AgentExecutor({ agent, tools });
}

module.exports = {
    createExecutor
}
