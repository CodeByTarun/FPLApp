import { GetPlayerGameweekDataSortedByPosition } from "../../../App/Helpers/FplAPIHelpers";
import overview from "../../SampleData/fploverview.json";
import gameweek from "../../SampleData/gameweekdata.json";
import fixture from "../../SampleData/provisionalfinishedfixture.json";
import { PlayerData } from "../../../App/Models/CombinedData";
import { FixtureInfo } from "../../../App/Store/fixtureSlice";
import { FplOverview } from "../../../App/Models/FplOverview";
import { FplFixture } from "../../../App/Models/FplFixtures";
import { FplGameweek } from "../../../App/Models/FplGameweek";

const fixtureInfo: FixtureInfo =  {
    fixture: fixture as FplFixture,
    isHome: true,
}


test('give a fixture and get the correct sorted list out (check if first one is a goalie)', () => {
     expect((GetPlayerGameweekDataSortedByPosition(gameweek as FplGameweek, overview as FplOverview, fixtureInfo) as PlayerData[])[0].overviewData.element_type).toBe(1)
    })

test('give a fixture and get the correct sorted list out (check if first one is a goalie)', () => {
    expect(((GetPlayerGameweekDataSortedByPosition(gameweek as FplGameweek, overview as FplOverview, fixtureInfo) as PlayerData[]).at(-1) as PlayerData).overviewData.element_type).toBe(4)
    })

    