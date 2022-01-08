import { FplOverview, Team } from "../Models/FplOverview";

export function GetTeamDataFromOverviewWithFixtureTeamID(teamNumber : number, overview: FplOverview): Team {
    return overview.teams.filter(team => team.id == teamNumber)[0]
};