import { GoogleGenerativeAI } from "@google/generative-ai";

// We add 'v1' here to stop the 404 error from the logs
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ text: "Metòd pa otorize" });
  }

  try {
    // We specify the model AND use the most stable generation method
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash" 
    }, { apiVersion: 'v1' }); 

    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const userPrompt = body.message || "Bonjou";

    const result = await model.generateContent(
      `Ou se Sanktyè, yon gid espirityèl Katolik Ayisyen. Reponn ak anpil sajès nan lang Kreyòl sèlman: ${userPrompt}`
    );
    
    const response = await result.response;
    const text = response.text();
    
    return res.status(200).json({ text: text });

  } catch (error) {
    console.error("LOGS:", error);
    // This will now show the exact error message on your website screen
    return res.status(500).json({ 
      text: "Sanktyè gen yon ti pwoblèm. Erè: " + error.message 
    });
  }
}
