import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionSheetIOS } from "react-native";
import { FplDraftUserInfo } from "../Models/FplDraftUserInfo";
import { FplFixture } from "../Models/FplFixtures";
import { FplManagerInfo } from "../Models/FplManagerInfo";

export interface FixtureInfo {
    teamType: TeamTypes.Fixture,
    fixture: FplFixture | null,
    isHome: boolean,
    gameweek: number,
}

export interface DraftInfo {
    teamType: TeamTypes.Draft,
    gameweek: number,
}

export interface BudgetInfo {
    teamType: TeamTypes.Budget,
    gameweek: number,
}

export interface DreamTeamInfo {
    teamType: TeamTypes.Dream,
    gameweek: number,
}

export interface EmptyTeam {
    teamType: TeamTypes.Empty,
    gameweek: number,
}

export type TeamInfo = FixtureInfo | DraftInfo | BudgetInfo | DreamTeamInfo | EmptyTeam;


export enum TeamTypes {
    Fixture,
    Dream,
    Draft,
    Budget,
    Empty,
}

const initialState: TeamInfo = {teamType: TeamTypes.Empty} as TeamInfo;

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        changeGameweek(state: TeamInfo, action: PayloadAction<number>): void {
            state.gameweek = action.payload;
        },

        changeToFixture(state: TeamInfo, action: PayloadAction<FplFixture|null>): FixtureInfo {
            return { teamType: TeamTypes.Fixture, fixture: action.payload, isHome: (state.teamType === TeamTypes.Fixture) ? state.isHome : true , gameweek: action.payload?.event } as FixtureInfo;
        },

        removeFixture(state: TeamInfo): void {
            if (state.teamType === TeamTypes.Fixture) {
                state.fixture = null;
            }
        },

        toggleTeamShown(state: TeamInfo) : void {
            if (state.teamType === TeamTypes.Fixture) {
                state.isHome = !state.isHome;
            }            
        },

        setIsHomeToTrue(state: TeamInfo) : void {
            if (state.teamType === TeamTypes.Fixture) {
                state.isHome = true;
            } 
        },

        changeToDreamTeam(state: TeamInfo): DreamTeamInfo {
            return {teamType: TeamTypes.Dream, gameweek: state.gameweek}
        },
    }
});

export const { changeGameweek, changeToFixture, removeFixture, toggleTeamShown, setIsHomeToTrue, changeToDreamTeam } = teamSlice.actions;
export default teamSlice.reducer;