import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(request: NextRequest) {
  try {
    const { inputText } = await request.json();
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Gemini API key is not configured." }, { status: 500 });
    }
    
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: inputText,
    });
    
    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Error in Gemini API route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
