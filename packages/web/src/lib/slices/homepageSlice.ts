import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface HomepageState {
  data: unknown | null;
}

const initialState: HomepageState = {
  data: null,
};

export const homepageSlice = createSlice({
  name: 'homepage',
  initialState,
  reducers: {
    setHomepage: (state, action: PayloadAction<unknown>) => {
      state.data = action.payload;
    },
  },
});

export const { setHomepage } = homepageSlice.actions;
export const selectHomepageData = (state: RootState) => state.homepage.data;
export default homepageSlice.reducer;
