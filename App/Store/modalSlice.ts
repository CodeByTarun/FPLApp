import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerOverview } from "../Models/FplOverview";

const initialState = null as PlayerOverview | null;

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openPlayerDetailedStatsModal(state: PlayerOverview | null, action: PayloadAction<PlayerOverview>): PlayerOverview | null {
            return action.payload;
        },

        closePlayerDetailedStatsModal(state: PlayerOverview | null): PlayerOverview | null {
            return null;
        }
    }
});

export const { openPlayerDetailedStatsModal, closePlayerDetailedStatsModal } =  modalSlice.actions;
export default modalSlice.reducer;