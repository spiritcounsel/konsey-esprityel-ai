export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    return res.status(200).json({
      reply: "Mwen tande ou. Kijan mwen ka ede ou? 🙏🏾",
    });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong" });
  }
}
