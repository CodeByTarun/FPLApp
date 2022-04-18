import { GetPlayerGameweekDataSortedByPosition, IsThereAMatchInProgress, GetPlayerPointsForAFixture, GetTeamDataFromOverviewWithFixtureTeamID, GetHighestMinForAPlayer, GetScoreForLiveFixture, GetPointTotal, GetTeamTotalPoints, GetOwnedPlayersManagerShortInitials } from "../../../../App/Helpers/FplAPIHelpers";
import gameweek from "../../../SampleData/gameweekdata.json";
import fixture from "../../../SampleData/provisionalfinishedfixture.json";
import { PlayerData } from "../../../../App/Models/CombinedData";
import { BudgetInfo, DraftInfo, FixtureInfo, TeamInfo, TeamTypes } from "../../../../App/Store/teamSlice";
import { FplOverview } from "../../../../App/Models/FplOverview";
import { FplFixture } from "../../../../App/Models/FplFixtures";
import { FplGameweek, Player } from "../../../../App/Models/FplGameweek";
import { draftOverview, overview } from "../../../SampleData/Overviews";
import { liveFixtures } from "../../../SampleData/Fixtures";
import { budgetLeaguePicks, draftLeaguePicks, gameweek32, gameweek32Fixture } from "../../../SampleData/Gameweek32Data";
import { liveFixture, liveGameweek } from "../../../SampleData/LiveScoreData";
import { draftLeagueInfo, draftPlayerStatuses } from "../../../SampleData/DraftManager";

const fixtureInfo: TeamInfo =  { teamType: TeamTypes.Fixture, fixture: fixture as FplFixture, isHome: true, gameweek: 21 }

let draftInfo: DraftInfo = { gameweek: 32, info: { id: 61187, isDraftTeam: true, isFavourite: true, name: 'Tarun' }, teamType: TeamTypes.Draft }

let budgetInfo: BudgetInfo = { gameweek: 32, info: { id: 89544331, isDraftTeam: false, isFavourite: true, name: 'Tarun' }, teamType: TeamTypes.Budget }

const dreamInfo: TeamInfo = {teamType: TeamTypes.Dream, gameweek: 32}


describe('GetTeamDataFromOverviewWithFixtureTeamID', () => {
    test('get arsenal team', () => {
        expect(GetTeamDataFromOverviewWithFixtureTeamID(1, overview)).toBe(overview.teams.find(team => team.id === 1));
    })
});

describe('GetPlayerGameweekDataSortedByPosition', () => {

    test('give a fixture and get the correct sorted list out (check if first one is a goalie)', () => {
        expect((GetPlayerGameweekDataSortedByPosition(gameweek as FplGameweek, overview as FplOverview, fixtureInfo) as PlayerData[])[0].overviewData.element_type).toBe(1)
    });
   
    test('give a fixture and get the correct sorted list out (check if the last one is a forward)', () => {

        let players = GetPlayerGameweekDataSortedByPosition(gameweek as FplGameweek, overview as FplOverview, fixtureInfo) as PlayerData[];

       expect((players.at(-1) as PlayerData).overviewData.element_type).toBe(4)
       expect((players.find(player => player.overviewData.id === 650))).toBeUndefined();
    });

    test('dream team given, length is 11', () => {
        expect((GetPlayerGameweekDataSortedByPosition(gameweek as FplGameweek, overview as FplOverview, dreamInfo) as PlayerData[])).toHaveLength(11);
    });

    test('draft team gives 15 players, and they have gameweek data and overview data', () => {

        let players = GetPlayerGameweekDataSortedByPosition(gameweek as FplGameweek, overview as FplOverview, draftInfo, draftOverview, draftLeaguePicks) as PlayerData[];
        expect(players).toHaveLength(15);
        expect(players[0].gameweekData).toBeDefined();
        expect(players[0].overviewData).toBeDefined();
        expect(players[0].isCaptain).toBeUndefined();
        expect(players[0].isViceCaptain).toBeUndefined();
    });

    test('budget team gives 15 players, and they have gameweek data, overview data, and captain/vice captain boolean values', () => {

        let players = GetPlayerGameweekDataSortedByPosition(gameweek as FplGameweek, overview as FplOverview, budgetInfo, draftOverview, undefined, budgetLeaguePicks) as PlayerData[];

        expect(players).toHaveLength(15);
        expect(players[0].gameweekData).toBeDefined();
        expect(players[0].overviewData).toBeDefined();
        expect(players[0].isCaptain).toBeDefined();
        expect(players[0].isViceCaptain).toBeDefined();
    });
});

describe('IsThereAMatchInProgress', () => {

    test('MatchInProgress_False', () => {
        expect(IsThereAMatchInProgress(20, liveFixtures as FplFixture[])).toBe(false);
    });
    
    test('MatchInProgress_True', () => {
        expect(IsThereAMatchInProgress(21, liveFixtures as FplFixture[])).toBe(true)
    });

});

describe('GetHighestMinForAPlayer', () => {
    test('live fixture highest minutes', () => {
        expect(GetHighestMinForAPlayer(liveFixture, liveGameweek)).toBe(52);
    });
});
    
describe('GetScoreForALiveFixture', () => {
    test('live fixture', () => {

        expect(GetScoreForLiveFixture(liveFixture, liveGameweek)).toStrictEqual([1,0]);

    });
});

describe('GetPointTotal', () => {

    test('if not a fixture', () => {
        let players = GetPlayerGameweekDataSortedByPosition(gameweek as FplGameweek, overview, dreamInfo, draftOverview);

        expect(GetPointTotal(players![0], dreamInfo)).toBe(9);
    });

    test('live fixture', () => {
        let fixtureInfo: FixtureInfo = { fixture: liveFixture, gameweek: 32, isHome: true, teamType: TeamTypes.Fixture }
        let players = GetPlayerGameweekDataSortedByPosition(liveGameweek, overview, fixtureInfo, draftOverview);

        expect(GetPointTotal(players![0], fixtureInfo)).toBe(1);
    });
});

describe('GetTeamTotalPoints', () => {

    test('budget team', () => {

        let players = GetPlayerGameweekDataSortedByPosition(gameweek as FplGameweek, overview as FplOverview, budgetInfo, draftOverview, undefined, budgetLeaguePicks) as PlayerData[];

        expect(GetTeamTotalPoints(budgetInfo, players, budgetLeaguePicks)).toBe(21);
    });

    test('draft team', () => {

        let players = GetPlayerGameweekDataSortedByPosition(gameweek32, overview as FplOverview, draftInfo, draftOverview, draftLeaguePicks) as PlayerData[];

        expect(GetTeamTotalPoints(draftInfo, players)).toBe(32);
    });

});

describe('GetOwnedPlayersManagerShortInitials', () => {

    test('is ronaldo owned', () => {

        let owner = GetOwnedPlayersManagerShortInitials(579, overview, draftOverview, draftPlayerStatuses, draftLeagueInfo);

        expect(owner).toBe('JP');
    });
});