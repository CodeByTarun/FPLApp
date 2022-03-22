import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ScreenTypes {
    Main,
    PlayerStats,
    Fixtures,
}

export interface Screen {
    screenType: ScreenTypes,
}

const initialState = {screenType: ScreenTypes.Main} as Screen;

const navigationSlice = createSlice({
    name: 'navigation',
    initialState,
    reducers: {
        goToMainScreen() : Screen {
            return {screenType: ScreenTypes.Main};
        },
        
        goToPlayerStatsScreen() : Screen {
            return {screenType: ScreenTypes.PlayerStats};
        },
        
        goToFixturesScreen() : Screen {
            return {screenType: ScreenTypes.Fixtures};
        },

    }
})

export const { goToMainScreen, goToPlayerStatsScreen, goToFixturesScreen } = navigationSlice.actions;
export default navigationSlice.reducer;