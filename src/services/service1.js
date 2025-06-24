// services/aiService.js
import OpenAI from "openai";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_APP_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

export const generateAIDescription = async (productDetails) => {
  try {
    const prompt = `You are an expert e-commerce copywriter. Write a short, concise product description (1-2 sentences, 25-35 words) in a modern, persuasive style. 
Example: "The Nike Air Max 270 delivers modern comfort with a sleek, sporty style. Featuring a large Air unit in the heel for a soft, responsive ride."
Product Details:
- Product Name: ${productDetails.title}
- Category: ${productDetails.category || "not specified"}
- Tags: ${
      Array.isArray(productDetails.tags)
        ? productDetails.tags.join(", ")
        : productDetails.tags || "not specified"
    }
- Brand: ${productDetails.brand || "not specified"}
Description:`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a professional e-commerce product description writer.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("AI description generation failed:", error);
    throw new Error("Failed to generate product description");
  }
};
