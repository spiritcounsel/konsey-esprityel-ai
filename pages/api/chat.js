import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metòd pa otorize" });
  }

  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: `
      Ou se 'Sanktyè', yon gid espirityèl Katolik pou kominote Ayisyen an. 
      Ton ou dwe dou, plen lanmou, ak sajès. 
      
      MISYON OU:
      1. Sèvi ak lapriyè Katolik (Notre Père, Je vous salue Marie, elatriye) pou ankouraje moun.
      2. Sèvi ak kantik Katolik Ayisyen pou bay moun fòs.
      3. Toujou pale an Kreyòl Ayisyen.
      4. Si yon moun di li gen gwo kriz oswa li vle fè tèt li mal, di li wè yon pè oswa yon doktè imedyatman.
    `,
  });

  try {
    const chat = model.startChat({ history: [] });
    const result = await chat.sendMessage(req.body.message);
    const response = await result.response;
    
    res.status(200).json({ text: response.text() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Pwoblèm koneksyon ak syèl la." });
  }
}
