import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  // Only allow POST requests (what your website sends)
  if (req.method !== "POST") {
    return res.status(405).json({ text: "Metòd pa otorize" });
  }

  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: `
      Ou se 'Sanktyè', yon gid espirityèl Katolik pou kominote Ayisyen an. 
      Ton ou dwe dou, plen lanmou, ak sajès. 
      Toujou pale an Kreyòl Ayisyen.
      Sèvi ak lapriyè oswa kantik pou ankouraje moun.
    `,
  });

  try {
    const chat = model.startChat({ history: [] });
    const result = await chat.sendMessage(req.body.message || "Bonjou");
    const response = await result.response;
    const text = response.text();
    
    // This sends back 'text', which your website is looking for
    res.status(200).json({ text: text });
  } catch (error) {
    console.error(error);
    // If something breaks, this shows up in the gold box
    res.status(500).json({ text: "Sanktyè gen yon ti pwoblèm koneksyon kounye a. Tanpri eseye ankò." });
  }
}
