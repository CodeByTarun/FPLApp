import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlayerData } from "../Models/CombinedData";
import { PlayerOverview } from "../Models/FplOverview";
import { FplPlayerSummary } from "../Models/FplPlayerSummary";

export interface ListModalData {
    title: string,
    buttonText: string,
    buttonFn: () => void,
    items: string[],
    itemSelectFn: (item: string) => void,
    isSearchable: boolean,
    currentItem: string,
}

const initialListModalData: ListModalData = {
    title: 'Title',
    buttonText: 'button',
    buttonFn: () => {},
    items: [],
    itemSelectFn: () => {},
    isSearchable: false,
    currentItem: '',
}
export type ModalInfo = {
    playerData: PlayerData | null;
    playerOverview: PlayerOverview | null;
    playerSummary: FplPlayerSummary | null;
    listModalData: ListModalData;
} 

const initialState: ModalInfo = { playerData: null, playerOverview: null, playerSummary: null, listModalData: initialListModalData };

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

        changeListModalData(state: ModalInfo, listModalData: PayloadAction<ListModalData>): ModalInfo {
            return { ...state, listModalData: listModalData.payload };
        },
    }
});

export const { changePlayerModalInfo, changePlayerDetailedModalInfo, changePlayerOverviewInfo, 
               changePlayerSummaryInfo, changeListModalData } =  modalSlice.actions;

export default modalSlice.reducer;  