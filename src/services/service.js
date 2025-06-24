// services/aiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize with proper error handling
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export const generateAIDescription = async (productDetails) => {
  try {
    // Validate input
    if (!productDetails?.title) {
      throw new Error("Product title is required");
    }

    // system prompt
    const systemPrompt = `You are AI assistance who is an expert e-commerce SEO fridenly Description writer. Write a short, concise product description (1-2 sentences, 25-35 words) in a modern, persuasive style. 
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

    // Model Configuration
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        maxOutputTokens: 100,
        temperature: 0.7,
      },
    });

    const result = await model.generateContent(systemPrompt);
    const response = result.response;

    // Handle different response structures
    if (response?.text) {
      return response.text().trim();
    } else if (response?.candidates?.[0]?.content?.parts?.[0]?.text) {
      return response.candidates[0].content.parts[0].text.trim();
    } else {
      throw new Error("Unexpected response format from AI");
    }
  } catch (error) {
    console.error("AI description generation failed:", error);
    throw new Error(`Description generation failed: ${error.message}`);
  }
};
