import { PlayerData } from "../Models/CombinedData";
import { FplDraftGameweekPicks } from "../Models/FplDraftGameekPicks";
import { FplDraftOverview } from "../Models/FplDraftOverview";
import { FplFixture } from "../Models/FplFixtures";
import { FplGameweek } from "../Models/FplGameweek";
import { FplManagerGameweekPicks } from "../Models/FplManagerGameweekPicks";
import { FplOverview, Team } from "../Models/FplOverview";
import { FixtureInfo, TeamInfo, TeamTypes } from "../Store/teamSlice";

export function GetTeamDataFromOverviewWithFixtureTeamID(teamNumber : number, overview: FplOverview): Team {
    return overview.teams.filter(team => team.id == teamNumber)[0]
};

export function GetPlayerGameweekDataSortedByPosition(gameweekData: FplGameweek, overviewData: FplOverview, teamInfo: TeamInfo,
                                                      draftOverview?: FplDraftOverview,
                                                      draftPicks?: FplDraftGameweekPicks, 
                                                      budgetPicks?: FplManagerGameweekPicks): PlayerData[] | null {

    if (teamInfo.teamType === TeamTypes.Fixture) {
        return GetFixturePlayerData(gameweekData, overviewData, teamInfo);
    }
    else if (teamInfo.teamType === TeamTypes.Dream) {
        return GetDreamTeamPlayerData(gameweekData, overviewData, teamInfo);
    }
    else if (teamInfo.teamType === TeamTypes.Budget || teamInfo.teamType === TeamTypes.Draft) {
        return GetDraftOrBudgetPlayerData(gameweekData, overviewData, teamInfo, draftOverview, draftPicks, budgetPicks);
    }
    else {
        return null;
    }

}

function GetFixturePlayerData(gameweekData: FplGameweek, overviewData: FplOverview, fixtureInfo: FixtureInfo): PlayerData[] | null {
    let listOfPlayersFromFixtures = fixtureInfo.isHome ? overviewData.elements.filter(element => element.team == fixtureInfo.fixture?.team_h) :
                                                         overviewData.elements.filter(element => element.team == fixtureInfo.fixture?.team_a);

    if (listOfPlayersFromFixtures) {
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

function GetDreamTeamPlayerData(gameweekData: FplGameweek, overviewData: FplOverview, teamInfo: TeamInfo): PlayerData[] | null {
    let listOfDreamTeamPlayers = gameweekData.elements.filter(element => element.stats.in_dreamteam === true);

    if (listOfDreamTeamPlayers) {
        let combinedPlayerData = listOfDreamTeamPlayers.map(
            (dreamTeamPlayer) => (
                {
                    gameweekData: dreamTeamPlayer,
                    overviewData: overviewData.elements.find((player => player.id === dreamTeamPlayer.id))
                } as PlayerData))
        
        return combinedPlayerData.sort((playerA, playerB) => (playerA.overviewData.element_type - playerB.overviewData.element_type)) 
    }
    
    return null;
}

function GetDraftOrBudgetPlayerData(gameweekData: FplGameweek, overviewData: FplOverview, teamInfo: TeamInfo, draftOverview?: FplDraftOverview,
                                    draftPicks?: FplDraftGameweekPicks, budgetPicks?: FplManagerGameweekPicks) : PlayerData[] | null {
    
    let picks = (teamInfo.teamType === TeamTypes.Budget) ? budgetPicks : draftPicks;

    if (picks) {
        if (teamInfo.teamType === TeamTypes.Budget) {
            let combinedPlayerData =  picks.picks.map(
                (pick) => {
                    return (
                    {
                        gameweekData: gameweekData.elements.find(player => player.id === pick.element),
                        overviewData: overviewData.elements.find(player => player.id === pick.element),
                        isCaptain: pick.is_captain,
                        isViceCaptain: pick.is_vice_captain,
                    } as PlayerData)
                })
            
            return combinedPlayerData;
        } 
        else {
            let combinedPlayerData =  picks.picks.map(
                (pick) => {
                    let code = draftOverview?.elements.find(player => player.id === pick.element)?.code;
                    let pickOverviewData = overviewData.elements.find(player => player.code === code);

                    return (
                    {
                        gameweekData: gameweekData.elements.find(player => player.id === pickOverviewData?.id),
                        overviewData: pickOverviewData,
                    } as PlayerData)
                })
            
            return combinedPlayerData;
        }
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
                               .map((stat) => gameweek.elements.find(element => element.id === stat.element)?.explain
                                                               .find(game => game.fixture === fixture.id)?.stats
                                                               .find(stat => stat.identifier === 'minutes')?.value as number);

    return Math.max(...minutes)               
}

export function GetPointTotal(player: PlayerData, teamInfo: TeamInfo): number {
    
    if (teamInfo.teamType === TeamTypes.Fixture) {
        return GetPlayerPointsForAFixture(player, teamInfo);
    } else {
        return player.gameweekData.stats.total_points;
    }
}

export function GetPlayerPointsForAFixture(playerData: PlayerData, fixtureInfo: FixtureInfo) : number {
    let playerStats = playerData.gameweekData.explain.find(explain => explain.fixture === fixtureInfo.fixture?.id)?.stats;

    if (playerStats !== undefined) {
        let playerPoints = playerStats.reduce((points, stat) => {return points + stat.points}, 0);
        return playerPoints;
    }

    return 0;
}

export function GetFixtureStats(player: PlayerData, fixtureInfo: FixtureInfo, identifier: string) {
    return player.gameweekData.explain.find(details => details.fixture === fixtureInfo.fixture?.id)?.stats.find(stat => stat.identifier === identifier)?.value;
}

export function GetTeamTotalPoints(teamInfo: TeamInfo, players: PlayerData[], budgetPicks?: FplManagerGameweekPicks) {

    if (teamInfo.teamType === TeamTypes.Budget && budgetPicks) {
        return players.reduce((prev, player, index) => (player.gameweekData.stats.total_points * budgetPicks.picks[index].multiplier) + prev, 0);
    }
    else if (teamInfo.teamType === TeamTypes.Draft) {
        return players.slice(0, 11).reduce((prev, player) => player.gameweekData.stats.total_points + prev, 0);
    }   

    return 0;
}

export function GetTeamTotalExpectedPoints(teamInfo: TeamInfo, players: PlayerData[], budgetPicks?: FplManagerGameweekPicks) {

    if (teamInfo.teamType === TeamTypes.Budget && budgetPicks) {
        return (players.reduce((prev, player, index) => (Number(player.overviewData.ep_this) * budgetPicks.picks[index].multiplier) + prev, 0)).toFixed(1);
    }
    else if (teamInfo.teamType === TeamTypes.Draft) {
        return (players.slice(0, 11).reduce((prev, player) => Number(player.overviewData.ep_this) + prev, 0)).toFixed(1);
    }   

    return 0;
}