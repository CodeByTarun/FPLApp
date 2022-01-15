import { PlayerData } from "../Models/CombinedData";
import { FplFixture } from "../Models/FplFixtures";
import { FplGameweek } from "../Models/FplGameweek";
import { FplOverview, Team } from "../Models/FplOverview";
import { FixtureInfo, TeamInfo, TeamTypes } from "../Store/teamSlice";

export function GetTeamDataFromOverviewWithFixtureTeamID(teamNumber : number, overview: FplOverview): Team {
    return overview.teams.filter(team => team.id == teamNumber)[0]
};

export function GetPlayerGameweekDataSortedByPosition(gameweekData: FplGameweek, overviewData: FplOverview, teamInfo: TeamInfo): PlayerData[] | null {

    if (teamInfo.teamType === TeamTypes.Fixture) {
        return GetFixturePlayerData(gameweekData, overviewData, teamInfo);
    } else {
        return null;
    }

}

export function GetFixturePlayerData(gameweekData: FplGameweek, overviewData: FplOverview, fixtureInfo: FixtureInfo): PlayerData[] | null {
    let listOfPlayersFromFixtures = fixtureInfo.isHome ? overviewData.elements.filter(element => element.team == fixtureInfo.fixture?.team_h) :
                                                         overviewData.elements.filter(element => element.team == fixtureInfo.fixture?.team_a);

    if (listOfPlayersFromFixtures !== undefined) {
        let combinedPlayerData = listOfPlayersFromFixtures.map(
            (fixturePlayer) => (
                { 
                    gameweekData: gameweekData.elements.find((gameweekPlayer) => gameweekPlayer.id === fixturePlayer.id),
                    overviewData: fixturePlayer,
                } as PlayerData))

        return combinedPlayerData.filter(player => FilterForPlayerThatHavePlayedInTheFixture(player, fixtureInfo))
                                 .sort((playerA, playerB) => (playerA.overviewData.element_type - playerB.overviewData.element_type));
    }
    
    return null;
}

function FilterForPlayerThatHavePlayedInTheFixture(playerData: PlayerData, fixtureInfo: FixtureInfo) {

    if (playerData.gameweekData !== undefined) {
        let fixture = playerData.gameweekData.explain.find(explain => explain.fixture === fixtureInfo.fixture?.id);

        if (fixture !== undefined) {
            let stat = fixture.stats.find(stat => stat.identifier === "minutes")?.value;

            if (stat !== undefined && stat > 0) {
                return true;
            }
        }
    }

    return false;
}

export function IsThereAMatchInProgress(gameweekNumber: number, fixtures: FplFixture[]) : boolean {
    
    return fixtures.filter((fixture) => { return fixture.event === gameweekNumber })
                   .some((fixture) => { return (fixture.finished_provisional === false && fixture.started === true) });
  }

export function GetHighestMinForAPlayer(fixture: FplFixture, gameweek: FplGameweek) : number {
    var minutes = fixture.stats.filter(stat => stat.identifier === 'bps')[0].h
                               .map((stat) => gameweek.elements.find(element => element.id === stat.element)?.stats.minutes as number);

    return Math.max(...minutes)               
}

export function GetPlayerPointsForAFixture(playerData: PlayerData, fixtureInfo: FixtureInfo) : number {
    let playerStats = playerData.gameweekData.explain.find(explain => explain.fixture === fixtureInfo.fixture?.id)?.stats;

    if (playerStats !== undefined) {
        let playerPoints = playerStats.reduce((points, stat) => {return points + stat.points}, 0);
        return playerPoints;
    }

    return 0;
}