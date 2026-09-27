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


app.post("/ask-ai", async (req, res) => {

    const question = req.body.question;

    console.log("User:", question);

});


app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});