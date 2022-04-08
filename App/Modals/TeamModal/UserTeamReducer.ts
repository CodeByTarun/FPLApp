import UserTeamInfo from "../../Helpers/FplDataStorageService";

export enum UserTeamActionKind {
    ChangeName,
    ChangeID,
    IsDraft,
    SetTeamEditing,
    Reset,
}

export type UserTeamActions = {
    type: UserTeamActionKind.ChangeName;
    value: string;
    data: UserTeamInfo[] | undefined;
} | {
    type: UserTeamActionKind.ChangeID;
    value: string;
    data: UserTeamInfo[] | undefined;
} | {
    type: UserTeamActionKind.IsDraft;
    value: boolean;
    data: UserTeamInfo[] | undefined;
}| {
    type: UserTeamActionKind.SetTeamEditing;
    value: UserTeamInfo;
} | {
    type: UserTeamActionKind.Reset;
}

export interface UserTeamState {
    userTeam : UserTeamInfo,
    error: string | null,
    teamEditing: UserTeamInfo | null,
}

export const userTeamInitialState: UserTeamState = {
    userTeam: { isDraftTeam: false, isFavourite: false } as UserTeamInfo,
    error: null,
    teamEditing: null,
}

export function userTeamReducer(state: UserTeamState, action: UserTeamActions) : UserTeamState {
    
    let errorMessage: string | null = null; 

    switch (action.type) {
        case UserTeamActionKind.ChangeName: {

            let teamInfo: UserTeamInfo[] | undefined = (state.teamEditing) ? action.data?.filter(team => team.id !== state.teamEditing?.id) : action.data

            if (teamInfo && teamInfo.some(team => team.name === action.value)) {
                errorMessage = 'This team name is already used.'
            }

            return {
                userTeam: {
                    ...state.userTeam,
                    name: action.value,
                },
                error: errorMessage,
                teamEditing: state.teamEditing,
            };
        }
        case UserTeamActionKind.ChangeID: {

            let teamInfo: UserTeamInfo[] | undefined = (state.teamEditing) ? action.data?.filter(team => team.id !== state.teamEditing?.id) : action.data

            if (teamInfo && teamInfo.filter(team => team.isDraftTeam === state.userTeam.isDraftTeam)
                                    .some(team => team.id.toString() === action.value)) {
                errorMessage = "This team has already been added."                                        
            }

            return {
                userTeam: {
                    ...state.userTeam,
                    id: parseInt(action.value),
                },
                error: errorMessage,
                teamEditing: state.teamEditing,
            };
        }
        case UserTeamActionKind.IsDraft: {

            let teamInfo: UserTeamInfo[] | undefined = (state.teamEditing) ? action.data?.filter(team => team.id !== state.teamEditing?.id) : action.data

            if (teamInfo && teamInfo.filter(team => team.isDraftTeam === state.userTeam.isDraftTeam)
                                          .some(team => team.id === state.userTeam.id)) {
                errorMessage = "This team has already been added."                                        
            }

            return {
                userTeam: {
                    ...state.userTeam,
                    isDraftTeam: action.value,
                },
                error: errorMessage,
                teamEditing: state.teamEditing,
            };
        }
        case UserTeamActionKind.SetTeamEditing:
            return {
                userTeam: action.value,
                error: null,
                teamEditing: action.value,
            };
        case UserTeamActionKind.Reset:
            return userTeamInitialState;
    }
}