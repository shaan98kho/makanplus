import { createSlice } from '@reduxjs/toolkit'
import { fetchGeminiContent } from './geminiThunk'

interface GeminiState {
  content: string,
  loading: boolean,
  error: string | null
}

const initialState: GeminiState = {
  content: '',
  loading: false,
  error: null,
}

const geminiSlice = createSlice({
  name: 'gemini',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeminiContent.pending, (state) => {
        state.loading = true,
        state.error = null
      })
      .addCase(fetchGeminiContent.fulfilled, (state, action) => {
        state.loading = false,
        state.content = action.payload
      })
      .addCase(fetchGeminiContent.rejected, (state, action) => {
        state.loading = false,
        state.error = action.error.message || 'Failed to fetch content'
      })
  }
})

export default geminiSlice.reducer