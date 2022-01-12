import { PlayerData } from "../Models/CombinedData";
import { FplGameweek } from "../Models/FplGameweek";
import { FplOverview, Team } from "../Models/FplOverview";
import { FixtureInfo } from "../Store/fixtureSlice";

export function GetTeamDataFromOverviewWithFixtureTeamID(teamNumber : number, overview: FplOverview): Team {
    return overview.teams.filter(team => team.id == teamNumber)[0]
};

export function GetPlayerGameweekDataSortedByPosition(gameweekData: FplGameweek, overviewData: FplOverview, fixtureInfo: FixtureInfo): PlayerData[] | null {
    var listOfPlayersFromFixtures = fixtureInfo.isHome ? fixtureInfo.fixture?.stats.filter(stat => stat.identifier === 'bps')[0].h :
                                                         fixtureInfo.fixture?.stats.filter(stat => stat.identifier === 'bps')[0].a;

    var combinedPlayerData: PlayerData[] | null = null;

    if (listOfPlayersFromFixtures !== undefined) {
        combinedPlayerData = listOfPlayersFromFixtures.map(
            (fixturePlayer) => (
                { 
                    gameweekData: gameweekData.elements.find((gameweekPlayer) => gameweekPlayer.id === fixturePlayer.element),
                    overviewData: overviewData.elements.find((overviewPlayer) => overviewPlayer.id === fixturePlayer.element),
                } as PlayerData))

        combinedPlayerData.sort((playerA, playerB) => (playerA.overviewData.element_type - playerB.overviewData.element_type));
    }
    
    return combinedPlayerData;
}