import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserTeamInfo from "../Helpers/FplDataStorageService";
import { FplFixture } from "../Models/FplFixtures";

export interface FixtureInfo {
    teamType: TeamTypes.Fixture,
    fixture: FplFixture | null,
    isHome: boolean,
    gameweek: number,
}

export interface DraftInfo {
    teamType: TeamTypes.Draft,
    gameweek: number,
    info: UserTeamInfo,
}

export interface BudgetInfo {
    teamType: TeamTypes.Budget,
    gameweek: number,
    info: UserTeamInfo,
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

        changingFixtureWhenGameweekChanged(state: TeamInfo, action: PayloadAction<FplFixture|null>): TeamInfo {
            if ( state.teamType === TeamTypes.Fixture) {
                return { teamType: TeamTypes.Fixture, fixture: action.payload, isHome: (state.teamType === TeamTypes.Fixture) ? state.isHome : true , gameweek: action.payload?.event } as FixtureInfo;
            }

            return state;
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

        changeToDraftTeam(state: TeamInfo, action: PayloadAction<UserTeamInfo>): DraftInfo {
            return { teamType: TeamTypes.Draft, gameweek: state.gameweek, info: action.payload }
        },

        changeToBudgetTeam(state: TeamInfo, action: PayloadAction<UserTeamInfo>): BudgetInfo {
            return { teamType: TeamTypes.Budget, gameweek: state.gameweek, info: action.payload }
        },

        changeToEmpty(state: TeamInfo) : EmptyTeam {
            return { teamType: TeamTypes.Empty, gameweek: state.gameweek }
        },
    }
});

export const { changeGameweek, changeToFixture, removeFixture, toggleTeamShown, setIsHomeToTrue, changeToDreamTeam, 
               changeToDraftTeam, changeToBudgetTeam, changingFixtureWhenGameweekChanged, changeToEmpty } = teamSlice.actions;
export default teamSlice.reducer;