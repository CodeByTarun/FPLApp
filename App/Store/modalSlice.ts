import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerData } from "../Models/CombinedData";
import { PlayerOverview } from "../Models/FplOverview";
import { FplPlayerSummary } from "../Models/FplPlayerSummary";

export enum ModalTypes {
    PlayerModal, 
    DetailedPlayerModal,
    TeamModal,
    GameweekOverviewModal,
    PlayerComparisonModal,
    InfoModal,
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

export interface GameweekOverviewModalInfo {
    modalType: ModalTypes.GameweekOverviewModal,
}

export interface PlayerComparisonModalInfo {
    modalType: ModalTypes.PlayerComparisonModal,
    playerOverview: PlayerOverview,
    playerSummary: FplPlayerSummary,
}

export interface InfoModalInfo {
    modalType: ModalTypes.InfoModal,
}
export interface BackgroundOnlyInfo {
    modalType: ModalTypes.BackgroundOnly,
}

export interface ClosedInfo {
    modalType: ModalTypes.Closed,
}

export type ModalInfo = PlayerModalInfo | DetailedPlayerModalInfo | PlayerComparisonModalInfo | TeamModalInfo | 
                        GameweekOverviewModalInfo | InfoModalInfo | BackgroundOnlyInfo | ClosedInfo;

const initialState = {modalType: ModalTypes.Closed} as ModalInfo;

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {

        openPlayerModal(state: ModalInfo, playerData: PayloadAction<PlayerData>): ModalInfo {
            return { modalType: ModalTypes.PlayerModal, player: playerData.payload};
        },

        openPlayerDetailedStatsModal(state: ModalInfo, playerOverview: PayloadAction<PlayerOverview>): ModalInfo {
            return { modalType: ModalTypes.DetailedPlayerModal, player: playerOverview.payload };
        },

        openPlayerComparisonModal(state: ModalInfo, playerData: PayloadAction<{playerOverview: PlayerOverview, playerSummary: FplPlayerSummary}>): ModalInfo {
            return { modalType: ModalTypes.PlayerComparisonModal, playerOverview: playerData.payload.playerOverview, playerSummary: playerData.payload.playerSummary }
        },

        openTeamModal(state: ModalInfo): ModalInfo {
            return { modalType: ModalTypes.TeamModal };
        },

        openGameweekOverviewModal(state: ModalInfo): ModalInfo {
            return { modalType: ModalTypes.GameweekOverviewModal }
        },

        openInfoModal(state: ModalInfo): ModalInfo {
            return { modalType: ModalTypes.InfoModal}
        },

        closeModal(state: ModalInfo): ModalInfo {
            return { modalType: ModalTypes.Closed };
        },

        showModalBackground(state: ModalInfo): ModalInfo {
            return { modalType: ModalTypes.BackgroundOnly };
        }
    }
});

export const { openPlayerModal, openPlayerDetailedStatsModal, openPlayerComparisonModal, openTeamModal, 
               openGameweekOverviewModal, openInfoModal, closeModal, showModalBackground } =  modalSlice.actions;
export default modalSlice.reducer;