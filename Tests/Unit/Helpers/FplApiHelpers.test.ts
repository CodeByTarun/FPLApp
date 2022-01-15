import { GetPlayerGameweekDataSortedByPosition, IsThereAMatchInProgress, GetPlayerPointsForAFixture } from "../../../App/Helpers/FplAPIHelpers";
import overview from "../../SampleData/fploverview.json";
import gameweek from "../../SampleData/gameweekdata.json";
import fixture from "../../SampleData/provisionalfinishedfixture.json";
import liveFixtures from "../../SampleData/livefixtures.json";
import liveDoubleGameweek from "../../SampleData/livegameweekdata_doublegameweek.json";
import { PlayerData } from "../../../App/Models/CombinedData";
import { TeamInfo, FixtureInfo, TeamTypes } from "../../../App/Store/teamSlice";
import { FplOverview } from "../../../App/Models/FplOverview";
import { FplFixture } from "../../../App/Models/FplFixtures";
import { FplGameweek } from "../../../App/Models/FplGameweek";

const teamInfo: TeamInfo =  {
    teamType: TeamTypes.Fixture,
    fixture: fixture as FplFixture,
    isHome: true,

}


test('give a fixture and get the correct sorted list out (check if first one is a goalie)', () => {
     expect((GetPlayerGameweekDataSortedByPosition(gameweek as FplGameweek, overview as FplOverview, teamInfo) as PlayerData[])[0].overviewData.element_type).toBe(1)
    })

test('give a fixture and get the correct sorted list out (check if first one is a goalie)', () => {
    expect(((GetPlayerGameweekDataSortedByPosition(gameweek as FplGameweek, overview as FplOverview, teamInfo) as PlayerData[]).at(-1) as PlayerData).overviewData.element_type).toBe(4)
    })

test('MatchInProgress_True', () => {
    expect(IsThereAMatchInProgress(21, liveFixtures as FplFixture[])).toBe(true)
})
    
test('PointsForAntonioDuringDoubleGameweekAreCorrect', () => {
    expect(GetPlayerPointsForAFixture((GetPlayerGameweekDataSortedByPosition(gameweek as FplGameweek, overview as FplOverview, teamInfo) as PlayerData[])[0] as PlayerData, teamInfo)).toBe(0);
})