import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import { PlayerData } from "../Models/CombinedData";
import { PlayerOverview } from "../Models/FplOverview";
import { FplPlayerSummary } from "../Models/FplPlayerSummary";


export type ModalInfo = {
    playerData: PlayerData | null;
    playerOverview: PlayerOverview | null;
    playerSummary: FplPlayerSummary | null;
    mutableView: { view: React.ReactNode | null, width: string | number};
    filterView: React.ReactNode | null;
} 

const initialState: ModalInfo = { playerData: null, playerOverview: null, playerSummary: null, mutableView: {view: null, width: '65%'}, filterView: null };

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {

        changePlayerModalInfo(state: ModalInfo, playerData: PayloadAction<PlayerData>): ModalInfo {
            return { ...state, playerData: playerData.payload };
        },

        changePlayerDetailedModalInfo(state: ModalInfo, playerInfo: PayloadAction<{ playerOverview: PlayerOverview, playerSummary: FplPlayerSummary }>): ModalInfo {
            return { ...state, playerOverview: playerInfo.payload.playerOverview, playerSummary: playerInfo.payload.playerSummary };
        },

        changePlayerOverviewInfo(state: ModalInfo, playerOverview: PayloadAction<PlayerOverview>): ModalInfo {
            return { ...state, playerOverview: playerOverview.payload };
        },

        changePlayerSummaryInfo(state: ModalInfo, playerSummary: PayloadAction<FplPlayerSummary>): ModalInfo {
            return { ...state, playerSummary: playerSummary.payload };
        },

        changeMutableView(state: ModalInfo, mutableView: PayloadAction<{view: React.ReactNode, width: string | number}>): ModalInfo {
            return { ...state, mutableView: mutableView.payload };
        },

        changeFilterView(state: ModalInfo, filterView: PayloadAction<React.ReactNode>): ModalInfo {
            return { ...state, filterView: filterView.payload };
        }
    }
});

export const { changePlayerModalInfo, changePlayerDetailedModalInfo, changePlayerOverviewInfo, 
               changePlayerSummaryInfo, changeMutableView, changeFilterView } =  modalSlice.actions;

export default modalSlice.reducer;  