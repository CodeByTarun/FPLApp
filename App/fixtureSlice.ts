import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FplFixture } from "../Models/FplFixtures";

const initialState = null as FplFixture | null;

const fixtureSlice = createSlice({
    name: 'fixture',
    initialState,
    reducers: {
        fixtureChanged(state: FplFixture | null, action: PayloadAction<FplFixture|null>): void {
            state = action.payload;
        }, 

        removeFixture(state: FplFixture | null): void {
            state = null;
        }
    }
});

export const { fixtureChanged, removeFixture } = fixtureSlice.actions;
export default fixtureSlice.reducer;