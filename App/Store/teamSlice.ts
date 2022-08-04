import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import UserTeamInfo from "../Helpers/FplDataStorageService";
import { FplFixture } from "../Models/FplFixtures";

interface baseInfo {
    gameweek: number;
    liveGameweek: number;
}

export interface FixtureInfo extends baseInfo {
    teamType: TeamTypes.Fixture,
    fixture: FplFixture | null,
    isHome: boolean,
}

export interface DraftInfo extends baseInfo {
    teamType: TeamTypes.Draft,
    info: UserTeamInfo,
}

export interface BudgetInfo extends baseInfo {
    teamType: TeamTypes.Budget,
    info: UserTeamInfo,
}

export interface DreamTeamInfo extends baseInfo {
    teamType: TeamTypes.Dream,
}

export interface EmptyTeam extends baseInfo {
    teamType: TeamTypes.Empty,
}

export type TeamInfo = FixtureInfo | DraftInfo | BudgetInfo | DreamTeamInfo | EmptyTeam;


export enum TeamTypes {
    Fixture,
    Dream,
    Draft,
    Budget,
    Empty,
}

const initialState: TeamInfo = {teamType: TeamTypes.Empty, gameweek: 1, liveGameweek: 1} as TeamInfo;

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        changeGameweek(state: TeamInfo, action: PayloadAction<number>): void {
            if (action.payload > 0 && action.payload < 39) {
                state.gameweek = action.payload;
            }
        },

        setLiveGameweek(state: TeamInfo, action: PayloadAction<number>): void {
            state.liveGameweek = action.payload;
        },

        changingFixtureWhenGameweekChanged(state: TeamInfo, action: PayloadAction<FplFixture|null>): TeamInfo {
            if ( state.teamType === TeamTypes.Fixture) {
                return { teamType: TeamTypes.Fixture, fixture: action.payload, isHome: (state.teamType === TeamTypes.Fixture) ? state.isHome : true , gameweek: action.payload?.event, liveGameweek: state.liveGameweek } as FixtureInfo;
            }

            return state;
        },

        changeToFixture(state: TeamInfo, action: PayloadAction<FplFixture|null>): FixtureInfo {
            return { teamType: TeamTypes.Fixture, fixture: action.payload, isHome: (state.teamType === TeamTypes.Fixture) ? state.isHome : true , gameweek: action.payload?.event, liveGameweek: state.liveGameweek } as FixtureInfo;
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
            return {teamType: TeamTypes.Dream, gameweek: state.gameweek, liveGameweek: state.liveGameweek}
        },

        changeToDraftTeam(state: TeamInfo, action: PayloadAction<UserTeamInfo>): DraftInfo {
            return { teamType: TeamTypes.Draft, gameweek: state.gameweek, info: action.payload, liveGameweek: state.liveGameweek }
        },

        changeToBudgetTeam(state: TeamInfo, action: PayloadAction<UserTeamInfo>): BudgetInfo {
            return { teamType: TeamTypes.Budget, gameweek: state.gameweek, info: action.payload, liveGameweek: state.liveGameweek}
        },

        changeToEmpty(state: TeamInfo) : EmptyTeam {
            return { teamType: TeamTypes.Empty, gameweek: state.gameweek, liveGameweek: state.liveGameweek }
        },
    }
});

export const { changeGameweek, setLiveGameweek, changeToFixture, removeFixture, toggleTeamShown, setIsHomeToTrue, changeToDreamTeam, 
               changeToDraftTeam, changeToBudgetTeam, changingFixtureWhenGameweekChanged, changeToEmpty } = teamSlice.actions;
export default teamSlice.reducer;