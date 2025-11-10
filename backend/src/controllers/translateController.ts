import type { Request, Response } from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.ELICE_API_KEY,
  baseURL: "https://mlapi.run/0e6857e3-a90b-4c99-93ac-1f9f887a193e/v1",
});

const TRANSLATOR_PROMPT = `
You are a professional translator specializing in Indonesian, English, Japanese, and Korean.
Your job is to translate text accurately while keeping the tone and meaning intact.
Do not add explanations — only return the translated text.
`;

export async function handleTranslation(req: Request, res: Response) {
  try {
    const { text, targetLang } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Missing text to translate" });
    }

    const systemPrompt = TRANSLATOR_PROMPT;
    const userPrompt = targetLang
      ? `Translate the following text into ${targetLang}:\n${text}`
      : `Translate this text appropriately:\n${text}`;

    const completion = await openai.chat.completions.create({
      model: "openai/gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const translation =
      completion.choices[0]?.message?.content || "Translation unavailable.";

    res.json({ translation });
  } catch (error: any) {
    console.error("[Translation Error]:", error);
    res.status(500).json({
      error: "Failed to translate text",
      message: error.message,
    });
  }
}
