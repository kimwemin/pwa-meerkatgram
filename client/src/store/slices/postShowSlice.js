import { createSlice } from '@reduxjs/toolkit';
import { postShowThunk } from '../thunks/postShowThunk.js';

const initialState = {
  show: null,
}

const slice = createSlice({
  name: 'postShow',
  initialState,
  reducers: {
    clearPostShow(state) {
      state.show = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postShowThunk.fulfilled, (state, action) => {
        state.show = action.payload.data;
      })
  },
});

// reducers의 action들을 내보내는 처리
export const {
  clearPostShow,
} = slice.actions;

export default slice.reducer;