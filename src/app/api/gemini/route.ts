import { NextRequest, NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { inputText, feedback } = body

    let prompt: string
    if (feedback) {
      prompt = `You are a community feedback analyzer. Analyze this input and return sentiment + summary:\n${feedback}`
    } else if (inputText) {
      prompt = inputText
    } else {
      return NextResponse.json(
        { error: "Request must include either inputText or feedback" },
        { status: 400 }
      )
    }

    const contentsPayload = [
      {
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ]

    
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured." },
        { status: 500 }
      )
    }
    const ai = new GoogleGenAI({ apiKey })

    
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contentsPayload,
    })


    return NextResponse.json({ text: response.text })
  } catch (error) {
    console.error("Error in Gemini API route:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
