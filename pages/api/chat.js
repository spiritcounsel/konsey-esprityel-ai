import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metòd pa otorize" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const userPrompt = body.message || "Bonjou";

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: `Ou se 'Sanktyè', yon gid espirityèl Katolik pou kominote Ayisyen an.
        Ton ou dwe dou, plen lanmou, ak sajès.

        MISYON OU:
        1. Sèvi ak lapriyè Katolik (Notre Père, Je vous salue Marie, elatriye) pou ankouraje moun.
        2. Sèvi ak kantik Katolik Ayisyen pou bay moun fòs.
        3. Toujou pale an Kreyòl Ayisyen.
        4. Si yon moun di li gen gwo kriz oswa li vle fè tèt li mal, di li wè yon pè oswa yon doktè imedyatman.`,
      messages: [{ role: "user", content: userPrompt }],
    });

    const text = message.content[0].text;
    return res.status(200).json({ text });

  } catch (error) {
    console.error("DEBUG:", error);
    return res.status(500).json({
      text: "Sanktyè gen yon ti pwoblèm. Erè: " + error.message,
    });
  }
}
