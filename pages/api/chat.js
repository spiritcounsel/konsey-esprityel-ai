import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ text: "Metòd pa otorize" });
  }

  try {
    // Check if the API key exists
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("API Key is missing in DigitalOcean settings");
    }

    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "Ou se Sanktyè, yon gid espirityèl Katolik k ap pale Kreyòl Ayisyen. Bay moun konsèy ak lapriyè.",
    });

    // Extract message clearly
    const userPrompt = req.body.message || "Bonjou";

    const chat = model.startChat({ history: [] });
    const result = await chat.sendMessage(userPrompt);
    const response = await result.response;
    const text = response.text();
    
    return res.status(200).json({ text: text });

  } catch (error) {
    console.error("Gemini Error:", error);
    // This tells the website exactly what went wrong
    return res.status(500).json({ 
      text: "Sanktyè gen yon ti pwoblèm koneksyon kounye a. Tanpri eseye ankò." 
    });
  }
}
