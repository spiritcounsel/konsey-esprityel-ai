import fs from "fs";
import path from "path";
import OpenAI from "openai";

export const config = {
  api: {
    bodyParser: false,
  },
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function readRequestBuffer(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const buffer = await readRequestBuffer(req);

    const transcription = await openai.audio.transcriptions.create({
      file: new File([buffer], "recording.webm", { type: "audio/webm" }),
      model: "gpt-4o-mini-transcribe",
    });

    const userText = transcription.text || "";

    const completion = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are a kind, faith-based Haitian spiritual counselor. Respond with warmth, privacy, compassion, and simple Haitian Creole. Do not claim to be a priest. Encourage prayer, scripture, reflection, and seeking trusted spiritual/community support when appropriate. If the person seems in danger, urges self-harm, or is in crisis, tell them to contact local emergency help or a trusted person immediately.",
        },
        {
          role: "user",
          content: userText,
        },
      ],
    });

    const reply = completion.output_text || "Bondye la avèk ou. Mèsi paske ou pale avè m.";

    const speech = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "alloy",
      input: reply,
    });

    const audioBuffer = Buffer.from(await speech.arrayBuffer());
    const audioDir = path.join(process.cwd(), "public", "audio");
    fs.mkdirSync(audioDir, { recursive: true });
    const fileName = `reply-${Date.now()}.mp3`;
    const filePath = path.join(audioDir, fileName);
    fs.writeFileSync(filePath, audioBuffer);

    return res.status(200).json({
      transcript: userText,
      reply,
      audioUrl: `/audio/${fileName}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Nou pa t ka trete mesaj la." });
  }
}
