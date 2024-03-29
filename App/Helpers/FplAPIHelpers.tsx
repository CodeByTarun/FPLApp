import moment from "moment";
import { PlayerTableFilterState } from "../Features/PlayerStats/PlayerTable/PlayerTableFilterReducer";
import { OverviewStats } from "../Global/EnumsAndDicts";
import { Per90Stats } from "../Global/GlobalConstants";
import { StatsFilterState } from "../Modals/PlayerDetailedStatsModal/StatsFilterReducer";
import { PlayerData } from "../Models/CombinedData";
import { FplDraftGameweekPicks } from "../Models/FplDraftGameekPicks";
import { FplDraftLeagueInfo } from "../Models/FplDraftLeagueInfo";
import { FplDraftLeaguePlayerStatuses } from "../Models/FplDraftLeaguePlayerStatuses";
import { FplDraftOverview } from "../Models/FplDraftOverview";
import { A, FplFixture } from "../Models/FplFixtures";
import { FplGameweek } from "../Models/FplGameweek";
import { FplManagerGameweekPicks } from "../Models/FplManagerGameweekPicks";
import { FplOverview, PlayerOverview, Team } from "../Models/FplOverview";
import { FplPlayerSummary, History } from "../Models/FplPlayerSummary";
import { FixtureInfo, TeamInfo, TeamTypes } from "../Store/teamSlice";
import { PlayersWatchlist } from "./FplDataStorageService";

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

        if (fixtureInfo.fixture?.started === false) {
            return FilterForTopPlayersOnTeamForFixturesThatHaveNotStarted(combinedPlayerData, fixtureInfo);
        }

        return combinedPlayerData.filter(player => FilterForPlayerThatHavePlayedInTheFixture(player, fixtureInfo))
                                 .sort((playerA, playerB) => (playerA.overviewData.element_type - playerB.overviewData.element_type));
    }
    
    return null;
}

function FilterForTopPlayersOnTeamForFixturesThatHaveNotStarted(combinedPlayerData: PlayerData[], fixtureInfo: FixtureInfo): PlayerData[] | null {
    
    let sortedPlayers = combinedPlayerData.sort((playerA, playerB) => (playerB.overviewData.minutes - playerA.overviewData.minutes));

    let players: PlayerData[] = [];

    for (let i = 1; i <= 4; i++) {
        players.concat(sortedPlayers.filter(player => player.overviewData.element_type === i).slice(0, elementMinAndMax[i].min + 1))
    }

    let filteredPlayers = sortedPlayers.filter(player => !players.includes(player));
    let index = 0;

    while (players.length <= 11) {

        let player = filteredPlayers[index];
        
        if (players.filter(playerInList => playerInList.overviewData.element_type === player.overviewData.element_type).length < elementMinAndMax[player.overviewData.element_type].max) {
            players.push(player);
        }

        index++;
    }

    return players.sort((playerA, playerB) => (playerA.overviewData.element_type - playerB.overviewData.element_type));
}

// 1: Goalkeeper, 2: Defender, 3: Midfielder, 4: Forward
const elementMinAndMax: {[key: number] : {min: number, max: number}} = {
    1 : {min: 1, max: 1 },
    2: {min: 3, max: 5},
    3: {min: 3, max: 5},
    4: {min: 1, max: 3},
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
                        multiplier: pick.multiplier,
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

    let minute = Math.max(...minutes);
    
    if (minute === -Infinity) {
        return 0;
    }
    else {
        return minute;
    }
}

export function GetScoreForLiveFixture(fixture: FplFixture, gameweek:FplGameweek) : number[] {
    let score = [0,0];

    let homePlayers = fixture.stats.find(stat => stat.identifier === 'bps')?.h;
    let awayPlayers = fixture.stats.find(stat => stat.identifier === 'bps')?.a;

    let homeGoals = getStatTotal(fixture, gameweek, 'goals_scored', homePlayers);
    let awayGoals = getStatTotal(fixture, gameweek, 'goals_scored', awayPlayers);
    let homeOwnGoals = getStatTotal(fixture, gameweek, 'own_goals', homePlayers);
    let awayOwnGoals = getStatTotal(fixture, gameweek, 'own_goals', awayPlayers);

    score[0] += (homeGoals ? homeGoals : 0) + (awayOwnGoals ? awayOwnGoals : 0);
    score[1] += (awayGoals ? awayGoals : 0) + (homeOwnGoals ? homeOwnGoals : 0);

    return score;
}

function getStatTotal(fixture: FplFixture, gameweek:FplGameweek, statIdentifier: string, players: A[] | undefined) {

    if (players) {
        return players.map((stat) => gameweek.elements.find(element => element.id === stat.element)?.explain
                                                    .find(game => game.fixture === fixture.id)?.stats
                                                    .find(stat => stat.identifier === statIdentifier)?.value as number)
                                                    .filter(num => num !== undefined)
                                                    .reduce((prev, curr) => prev + curr, 0);
    }

    return 0;
}

export function GetPointTotal(player: PlayerData, teamInfo: TeamInfo) {
    if (teamInfo.teamType === TeamTypes.Fixture) {
        return GetPlayerPointsForAFixture(player, teamInfo);
    } 
    else if (teamInfo.teamType === TeamTypes.Budget) {
        return (player.multiplier === 0) ? player.gameweekData.stats.total_points : player.gameweekData.stats.total_points * player.multiplier;
    }
    else {
        return player.gameweekData.stats.total_points;
    }
}

export function GetPlayerPointsForAFixture(playerData: PlayerData, fixtureInfo: FixtureInfo) {

    if (!fixtureInfo.fixture?.started) return playerData.overviewData.total_points;

    let playerStats = playerData.gameweekData.explain.find(explain => explain.fixture === fixtureInfo.fixture?.id)?.stats;

    if (playerStats !== undefined) {
        let playerPoints = playerStats.reduce((points, stat) => {return points + stat.points}, 0);
        return playerPoints;
    }

    return 0;
}

export function GetPlayerScoreAndFixtureText(player: PlayerData, teamInfo: TeamInfo, fixtures: FplFixture[], overview: FplOverview) {

    if ((teamInfo.teamType !== TeamTypes.Budget && teamInfo.teamType !== TeamTypes.Draft)) {
        return GetPointTotal(player, teamInfo);
    }

    let playerFixtures = fixtures.filter(fixture => (fixture.event === teamInfo.gameweek) && ((fixture.team_a === player.overviewData.team) || (fixture.team_h === player.overviewData.team)));

    if (playerFixtures.length === 0) {
        return '-';
    }

    else if (!playerFixtures.some(fixture => (fixture.started === false))) {
        return GetPointTotal(player, teamInfo);
    }

    else if (playerFixtures.some(fixture => (fixture.started === true))) {
        if (playerFixtures.length === 1) {
            return GetPointTotal(player, teamInfo);
        }
        else {
            let scoreText = GetPointTotal(player, teamInfo).toString();
            let fixtureText = playerFixtures.map(fixture => (fixture.started === false) ?  
                                                                ((fixture.team_a === player.overviewData.team) ? 
                                                                    " " + (overview.teams.find(team => team.id === fixture.team_h)?.short_name) + '(A)' :
                                                                    " " + (overview.teams.find(team => team.id === fixture.team_a)?.short_name) + '(H)') : '')

            return (scoreText + fixtureText);
        }
    } 
    else {
        return playerFixtures.map(fixture => ((fixture.team_a === player.overviewData.team) ? (overview.teams.find(team => team.id === fixture.team_h)?.short_name) + '(A)'
                                                                                            : (overview.teams.find(team => team.id === fixture.team_a)?.short_name) + '(H)'))
                             .join(', ');
    }

}

export function GetFixtureStats(player: PlayerData, fixtureInfo: FixtureInfo, identifier: string) {
    return player.gameweekData.explain.find(details => details.fixture === fixtureInfo.fixture?.id)?.stats.find(stat => stat.identifier === identifier)?.value;
}

export function GetTeamTotalPoints(teamInfo: TeamInfo, players: PlayerData[], budgetPicks?: FplManagerGameweekPicks) {

    try {
        if (teamInfo.teamType === TeamTypes.Budget && budgetPicks) {
            return players.reduce((prev, player, index) => (player.gameweekData.stats.total_points * budgetPicks.picks[index].multiplier) + prev, 0);
        }
        else if (teamInfo.teamType === TeamTypes.Draft) {
            return players.slice(0, 11).reduce((prev, player) => player.gameweekData.stats.total_points + prev, 0);
        }
    } catch (error) {
        return 0;
    }

    return 0;
}

export function GetTeamTotalExpectedPoints(teamInfo: TeamInfo, players: PlayerData[], budgetPicks?: FplManagerGameweekPicks) {

    try {
        if (teamInfo.teamType === TeamTypes.Budget && budgetPicks) {
            return (players.reduce((prev, player, index) => (Number(player.overviewData.ep_this) * budgetPicks.picks[index].multiplier) + prev, 0)).toFixed(1);
        }
        else if (teamInfo.teamType === TeamTypes.Draft) {
            return (players.slice(0, 11).reduce((prev, player) => Number(player.overviewData.ep_this) + prev, 0)).toFixed(1);
        }   
    }
     catch (error) {
         return 0;
     }
    
    return 0;
}

export function FilterPlayerListPlayers(filters: PlayerTableFilterState, player: PlayerOverview, 
                                        overview: FplOverview, watchlist: PlayersWatchlist | undefined) {
    return (
        (filters.playerSearchText === '' || player.web_name.startsWith(filters.playerSearchText)) && 
        (!filters.isInWatchlist || watchlist?.playerIds.includes(player.id)) &&
        (filters.teamFilter === 'All Teams' || player.team_code === overview.teams.find(team => team.name === filters.teamFilter)?.code) &&
        (filters.positionFilter === 'All Positions' || player.element_type === overview.element_types.find(element => element.plural_name === filters.positionFilter)?.id) &&
        (player.now_cost >= filters.priceRange[0] && player.now_cost <= filters.priceRange[1]) &&
        (getNum(player.minutes) >= filters.minutesRange[0] && getNum(player.minutes) <= filters.minutesRange[1])
    );
}

function getNum(val: number) {
    if (isNaN(val)) {
        return 0;
    }
    return val;
}

export function SortPlayerListPlayers(filters: PlayerTableFilterState, playerA: PlayerOverview, playerB: PlayerOverview) {

    let stat = Object.keys(OverviewStats).find(key => OverviewStats[key] === filters.statFilter) as keyof PlayerOverview;
        
        if (filters.isPer90 && Per90Stats.includes(filters.statFilter)) {
            return (getNum(playerB[stat] as number / playerB.minutes * 90)) - getNum((playerA[stat] as number / playerA.minutes * 90));
        } else {
            return (playerB[stat] as number) - (playerA[stat] as number);
        }
}

export function GetStatValue(isPer90: boolean, statFilter: string, player: PlayerOverview) {
    if (statFilter !== 'Cost') {
            
        if (isPer90 && Per90Stats.includes(statFilter)) {
    
            return (getNum(player[Object.keys(OverviewStats).find(key => OverviewStats[key] === statFilter) as keyof PlayerOverview] as number / player.minutes * 90)).toFixed(2)
        } else {
            return (player[Object.keys(OverviewStats).find(key => OverviewStats[key] === statFilter) as keyof PlayerOverview])
        }
    }
    else {
        return (player[Object.keys(OverviewStats).find(key => OverviewStats[key] === statFilter) as keyof PlayerOverview] as number / 10).toFixed(1)
    }
}

export function GetOwnedPlayersManagerShortInitials(budgetId: number, overview: FplOverview, draftOverview: FplDraftOverview | undefined, 
                                                    draftLeagueRosters: FplDraftLeaguePlayerStatuses | undefined, draftLeagueInfo: FplDraftLeagueInfo | undefined) {

    if (draftOverview && draftLeagueInfo && draftLeagueRosters) {
        let code = overview.elements.find(player => player.id === budgetId)?.code;
        let draftPlayerId = draftOverview.elements.find(player => player.code === code)?.id;
    
        let player = draftLeagueRosters.element_status.find(player => player.element === draftPlayerId);
    
        if (player && player.status === 'o') {
            
            return draftLeagueInfo.league_entries.find(entry => entry.entry_id === player?.owner)?.short_name;
        } 
    }    
    else {
        return null
    }

}

export function GetStatValueForDetailedStatsView(stat: string, playerData: FplPlayerSummary, player: PlayerOverview, statsFilterState: StatsFilterState, minutesValue: number, liveGameweek: number) {

    let statValue: number;

        if (playerData && (statsFilterState.gameSpan[0] !== 1 || statsFilterState.gameSpan[1] !== liveGameweek)) {
            statValue = playerData.history.filter(history => (history.round >= statsFilterState.gameSpan[0]) && (history.round <= statsFilterState.gameSpan[1]))
                                          .reduce((prev, curr) => prev + (Number(curr[stat as keyof History])), 0) 
        } else {
            statValue = Number(player[stat as keyof PlayerOverview]);
        }

        return ((Math.round((statsFilterState.isPer90 ? (statValue / minutesValue * 90) : statValue) * 100)) / 100).toString();

}

export function GetMinutesValueForDetailedStatsView(playerData: FplPlayerSummary, player: PlayerOverview, statsFilterState: StatsFilterState, liveGameweek: number) {
    
    if (playerData && (statsFilterState.gameSpan[0] !== 1 || statsFilterState.gameSpan[1] !== liveGameweek)) {
        return playerData.history.filter(history => (history.round >= statsFilterState.gameSpan[0]) && (history.round <= statsFilterState.gameSpan[1]))
                                 .reduce((prev, curr) => prev + curr.minutes, 0); 
    } else {
        return player.minutes;
    }
}

export function SortFixtures(fixture1: FplFixture, fixture2: FplFixture, dateNow: string) : number {
  
    if (fixture1.kickoff_time && fixture2.kickoff_time) {
      
      if (moment(fixture1.kickoff_time).isSame(dateNow, 'day') && !moment(fixture2.kickoff_time).isSame(dateNow, 'day')) {
        return -1;
      }
      else if (moment(fixture1.kickoff_time).isAfter(dateNow, 'day') && (!moment(fixture2.kickoff_time).isAfter(dateNow, 'day') && !moment(fixture2.kickoff_time).isSame(dateNow, 'day'))) {
          return -1;
      }
      else if (moment(fixture1.kickoff_time).isBefore(dateNow, 'day') && moment(fixture2.kickoff_time).isBefore(dateNow, 'day')) {
        if (moment(fixture1.kickoff_time).isAfter(fixture2.kickoff_time, 'hour')) {
          return -1;
        }
        else if (moment(fixture2.kickoff_time).isAfter(fixture1.kickoff_time, 'hour')) {
          return 1;
        } 
        else {
          return 0;
        }
      }
      
      else if (moment(fixture1.kickoff_time).isSame(dateNow, 'day') && moment(fixture2.kickoff_time).isSame(dateNow, 'day')) {
        if (!fixture1.finished_provisional && fixture2.finished_provisional) {
          return -1;
        }
        if (fixture1.finished_provisional && !fixture2.finished_provisional) {
          return 1;
        }
        else if (fixture1.started && !fixture2.started) {
          return -1;
        }
      }
    }
  
      return 0;
}