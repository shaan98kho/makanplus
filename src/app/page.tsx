"use client";

import { GoogleGenAI } from "@google/genai";
import { useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

async function generateContent(contents: string): Promise<string> {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents,
  });
  
  return response.text ?? "No response returned";
}

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value);
  };

  const handleSubmit = async () => {
    
    const text = await generateContent(inputText);
    setOutputText(text);
  };

  return (
    <>
      <div className="field-wrap">
        <label>Gemini test:</label>
        <input
          type="text"
          value={inputText}
          onChange={handleInput}
          placeholder="ask any question here"
          className="border-b border-solid border-white-300"
        />
      </div>
      
      <button onClick={handleSubmit} className="btn mt-4">Submit</button>
      <span>Gemini says:</span><div>{outputText}</div>
    </>
  );
}
