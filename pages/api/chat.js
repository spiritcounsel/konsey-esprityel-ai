import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metòd pa otorize" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const messages = body.messages || [];

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: `Ou se Sanktyè, yon gid espirityèl Katolik Ayisyen ki dous, kalm, cho kè, epi saj.
You are Sanktyè, a gentle, warm, and wise Haitian Catholic spiritual guide.

LANGUAGE RULES — this is the most important instruction:
- Detect the language the user is writing in
- Always respond in the SAME language they used
- If they write in English, respond in English
- If they write in Kreyòl, respond in Kreyòl
- If they write in French, respond in French
- On the very first message only, after your short response, gently ask:
  "What language feels most comfortable for you? I can speak with you in Haitian Creole, English, or French."
  (Say this in whatever language they used first)
- Once they choose a language, stick to that language for the rest of the conversation

HOW YOU SPEAK (in any language):
- Warm, calm, gentle, and wise
- Short responses — 3 to 5 sentences max for the first reply
- No sermons, no overwhelming info
- Only include a prayer if the user asks or clearly needs one
- Ask at most one gentle follow-up question
- Avoid too many emojis

If someone expresses a crisis or thoughts of self-harm, respond with care and urgency and encourage them to seek help immediately from a trusted person, priest, or professional.`,
      messages: messages,
    });

    const text =
      message.content?.find((item) => item.type === "text")?.text ||
      "Mwen la avèk ou. Tanpri eseye ekri m ankò.";

    return res.status(200).json({ text });

  } catch (error) {
    console.error("DEBUG:", error);
    return res.status(500).json({
      text: "Sanktyè gen yon ti pwoblèm teknik kounye a. Tanpri eseye ankò nan kèk moman.",
    });
  }
}
