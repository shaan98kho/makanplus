import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchGeminiContent = createAsyncThunk(
    'gemini/fetchContent',
    async (inputText: string) => {
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ inputText }),
        })
        const data = await response.json()
        return data.text
    }
)

export const analyzeFeedback = createAsyncThunk(
    "gemini/analyzeFeedback",
    async (feedback: string, thunkAPI) => {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback })
      })
      if (!res.ok) {
        const err = await res.text()
        return thunkAPI.rejectWithValue(err)
      }
      const data = await res.json()
      return data
    }
)
  