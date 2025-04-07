"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchGeminiContent } from "@/store/features/gemini/geminiThunk"
import { RootState, AppDispatch } from "@/store/store"


export default function Home() {
  const [inputText, setInputText] = useState('')
  const [isToggled, setIsToggled] = useState(false)
  const dispatch: AppDispatch = useDispatch()
  const { content, loading, error } = useSelector((state: RootState) => state.gemini);


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputText(e.target.value)
  }

  const handleSubmit = async () => {
      dispatch(fetchGeminiContent(inputText));

  }

  return (
    <>
      <h1>This is home page</h1>

      <button onClick={() => setIsToggled((prev) => !prev)}>Test</button>
      {isToggled &&
        <div>
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
          <span>Gemini says:</span>
          {loading ? (
            <p>Thinking...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <p>{content}</p>
          )}
        </div>
      }
    </>
  );
}
