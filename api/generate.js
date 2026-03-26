export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt, inputText } = req.body;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        system: prompt,
        messages: [
          {
            role: "user",
            content: inputText,
          },
        ],
      }),
    });

    const data = await response.json();

    res.status(200).json({
      output: data.content?.[0]?.text || "No output",
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}