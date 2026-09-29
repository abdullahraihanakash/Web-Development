import OpenAI from "openai";

const client = new OpenAI()

const response = await client.responses.create({
    model: "gpt-6-astra",
    input: "What is javascript?",
});

console.log(response.output_text);