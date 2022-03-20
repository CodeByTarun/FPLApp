import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerData } from "../Models/CombinedData";
import { PlayerOverview } from "../Models/FplOverview";

export enum ModalTypes {
    PlayerModal, 
    DetailedPlayerModal,
    TeamModal,
    BackgroundOnly,
    Closed,
}

export interface PlayerModalInfo {
    modalType: ModalTypes.PlayerModal,
    player: PlayerData,
}

export interface DetailedPlayerModalInfo {
    modalType: ModalTypes.DetailedPlayerModal,
    player: PlayerOverview,
}

export interface TeamModalInfo {
    modalType: ModalTypes.TeamModal,
}

export interface BackgroundOnlyInfo {
    modalType: ModalTypes.BackgroundOnly,
}

export interface ClosedInfo {
    modalType: ModalTypes.Closed,
}

export type ModalInfo = PlayerModalInfo | DetailedPlayerModalInfo | TeamModalInfo | BackgroundOnlyInfo | ClosedInfo;

const initialState = {modalType: ModalTypes.Closed} as ModalInfo;

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {

        openPlayerModal(state: ModalInfo, action: PayloadAction<PlayerData>): ModalInfo {
            return { modalType: ModalTypes.PlayerModal, player: action.payload};
        },

        openPlayerDetailedStatsModal(state: ModalInfo, action: PayloadAction<PlayerOverview>): ModalInfo {
            return { modalType: ModalTypes.DetailedPlayerModal, player: action.payload };
        },

        openTeamModal(state: ModalInfo): ModalInfo {
            return { modalType: ModalTypes.TeamModal };
        },

        closeModal(state: ModalInfo): ModalInfo {
            return { modalType: ModalTypes.Closed };
        },

        showModalBackground(state: ModalInfo): ModalInfo {
            return { modalType: ModalTypes.BackgroundOnly };
        }
    }
});

export const { openPlayerModal, openPlayerDetailedStatsModal, openTeamModal, closeModal, showModalBackground } =  modalSlice.actions;
export default modalSlice.reducer;