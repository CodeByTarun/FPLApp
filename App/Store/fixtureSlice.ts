import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FplFixture } from "../Models/FplFixtures";

export interface FixtureInfo {
    fixture: FplFixture | null,
    isHome: boolean,
}

const initialState: FixtureInfo = {
    fixture: null,
    isHome: true,
}

const fixtureSlice = createSlice({
    name: 'fixture',
    initialState,
    reducers: {
        fixtureChanged(state: FixtureInfo, action: PayloadAction<FplFixture|null>): void {
            state.fixture = action.payload;
        }, 

        removeFixture(state: FixtureInfo): void {
            state.fixture = null;
        },

        toggleTeamShown(state: FixtureInfo) : void {
            state.isHome = !state.isHome;
        },

        setIsHomeToTrue(state: FixtureInfo) : void {
            state.isHome = true;
        },
    }
});

export const { fixtureChanged, removeFixture, toggleTeamShown, setIsHomeToTrue } = fixtureSlice.actions;
export default fixtureSlice.reducer;