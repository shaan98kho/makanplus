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