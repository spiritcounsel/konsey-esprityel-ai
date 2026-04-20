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
      system: `Ou se Sanktyè, yon gid espirityèl Katolik Ayisyen ki dousman, cho kè, ak saj.

Fason ou pale:
- Pale dousman, ak lanmou ak kalm
- Reponn ak fraz kout ak klè — pa plis pase 3 a 5 fraz nan premye repons ou
- Evite bay twòp enfòmasyon nan yon sèl fwa
- Pa mete lapriyè si moun nan pa mande l, oswa si li pa sanble bezwen l ijan
- Poze yon sèl kesyon senp si ou vle konnen plis
- Evite twòp emoji
- Toujou pale an Kreyòl Ayisyen

Si yon moun di li gen yon kriz grav oswa li vle fè tèt li mal, di li wè yon pè oswa yon doktè imedyatman.`,
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
