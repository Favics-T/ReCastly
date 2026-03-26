export const TONES = [
  { id: "viral", label: "🔥 Viral", desc: "Hooks, punchy lines, shareable" },
  { id: "professional", label: "💼 Professional", desc: "Polished, authoritative" },
  { id: "funny", label: "😂 Funny", desc: "Witty, playful, relatable" },
  { id: "educational", label: "🎓 Educational", desc: "Clear, structured, insightful" },
];

export const FORMATS = [
  {
    id: "youtube",
    label: "YouTube Script",
    icon: "▶",
    color: "#FF4444",
    prompt: (tone) =>
      `Write a full YouTube video script with a hook (first 15 seconds), intro, 3–5 main sections with timestamps, and a strong CTA. Tone: ${tone}. Use [B-ROLL], [CUT TO], and [TRANSITION] markers where helpful.`,
  },
  {
    id: "twitter",
    label: "Twitter Thread",
    icon: "𝕏",
    color: "#1DA1F2",
    prompt: (tone) =>
      `Write a viral Twitter/X thread. Start with a powerful tweet hook (tweet 1/n). Write 8–12 tweets total. End with a strong final tweet. Tone: ${tone}. Number each tweet.`,
  },
  {
    id: "instagram",
    label: "Instagram Caption",
    icon: "◈",
    color: "#E1306C",
    prompt: (tone) =>
      `Write an Instagram caption with a strong opening line, engaging body, and call-to-action. Include 15–20 relevant hashtags at the end. Tone: ${tone}.`,
  },
  {
    id: "blog",
    label: "Blog Post",
    icon: "✍",
    color: "#00C896",
    prompt: (tone) =>
      `Write a full SEO-optimized blog post with a title, meta description, introduction, 4–6 H2 sections with paragraphs, and a conclusion. Tone: ${tone}.`,
  },
  {
    id: "hook",
    label: "Hook Generator",
    icon: "⚡",
    color: "#FFB800",
    prompt: (tone) =>
      `Generate 10 different powerful hooks for this content — hooks for YouTube intros, tweet openers, article headlines, and Instagram first lines. Vary the style. Tone: ${tone}.`,
  },
];