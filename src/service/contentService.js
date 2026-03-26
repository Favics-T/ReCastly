export const generateContent = async (prompt, inputText) => {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, inputText }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate");
  }

  return res.json();
};