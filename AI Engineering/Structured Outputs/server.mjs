import OpenAI from "openai";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());
app.use(express.static("public"));

app.post("/learn", async (req, res) => {
    const topic = req.body.topic?.trim();

    if (!topic) {
        return res.status(400).json({
            error: "Please enter a topic."
        });
    }

    try {
        const response = await client.responses.create({
            model: "gpt-5.6-luna",
            input: `Explain ${topic} for a beginner.`,

            text: {
                format: {
                    type: "json_schema",
                    name: "learning_topic",
                    strict: true,
                    schema: {
                        type: "object",
                        properties: {
                            topic: {
                                type: "string"
                            },
                            level: {
                                type: "string"
                            },
                            summary: {
                                type: "string"
                            },
                            uses: {
                                type: "array",
                                items: {
                                    type: "string"
                                }
                            }
                        },
                        required: [
                            "topic",
                            "level",
                            "summary",
                            "uses"
                        ],
                        additionalProperties: false
                    }
                }
            }
        });

        const data = JSON.parse(response.output_text);

        res.json(data);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            error: "AI request failed. Check your API key, credits, and server console."
        });
    }
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
