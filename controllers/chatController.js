import OpenAI from "openai";
import Product from "../models/products.js";
import Category from "../models/category.js";

// Initialize OpenAI client configured for Groq API
const getGroqClient = () => {
    return new OpenAI({
        apiKey: process.env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1",
    });
};

export const handleChat = async (req, res) => {
    try {
        const { messages, message } = req.body;

        // Support both single message and full messages array
        let rawMessages = messages;
        if (!rawMessages && message) {
            rawMessages = [{ sender: "user", text: message }];
        }

        if (!rawMessages || !Array.isArray(rawMessages) || rawMessages.length === 0) {
            return res.status(400).json({ message: "Messages history array is required" });
        }

        // 1. Fetch current catalog context from MongoDB
        const products = await Product.find().select("name price description rating size").lean();
        const categories = await Category.find().select("name").lean();

        const catalogContext = `
Available Categories: ${categories.map(c => c.name).join(", ")}
Available Products:
${products.map(p => `- ${p.name} (Price: ₹${p.price}, Rating: ${p.rating}/5, Description: ${p.description})`).join("\n")}
        `;

        const systemPrompt = `
You are FurniBot, the official AI shopping assistant for Furniro Furniture Store.
Your job is to assist customers in a friendly, helpful, and concise manner.
Use the following real-time store inventory data to answer customer questions:
${catalogContext}

If a user asks about something not in the store inventory, politely inform them about the products you do have available.
Keep your answers brief, engaging, and easy to read. Remember conversation context when users reply with "yes", "tell me more", "how much", etc.
        `;

        const groq = getGroqClient();

        // 2. Format entire message history for OpenAI / Groq SDK format
        const formattedMessages = [
            { role: "system", content: systemPrompt },
            ...rawMessages.map((msg) => ({
                role: msg.sender === "user" ? "user" : "assistant",
                content: msg.text || msg.content || ""
            }))
        ];

        // 3. Request chat completion from Groq API (Llama 3.3 model)
        const response = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: formattedMessages,
            temperature: 0.7,
        });

        const reply = response.choices[0]?.message?.content || "Sorry, I couldn't process your request.";

        res.status(200).json({ reply });
    } catch (error) {
        console.error("Chat Controller Error:", error);
        res.status(500).json({ message: "Failed to process AI chat", error: error.message });
    }
};
