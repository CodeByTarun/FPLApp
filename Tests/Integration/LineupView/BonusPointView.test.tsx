import React from "react";
import { render } from "../reduxRender";
import BonusPointView from "../../../App/Features/LineupView/Lineup/BonusPointView";
import { overview } from "../../SampleData/Overviews";
import { allFixtures, finishedFixture } from "../../SampleData/Fixtures";
import { FixtureInfo, TeamTypes } from "../../../App/Store/teamSlice";

let fixtureInfo: FixtureInfo = { gameweek: 10, teamType: TeamTypes.Fixture, fixture: finishedFixture, isHome: true, liveGameweek: 3 }

test('test if bonus point view shows up', () => {

    const { getByTestId, getByText } = render(<BonusPointView overviewData={overview} fixturesData={allFixtures} teamInfo={fixtureInfo}/>)

    expect(getByTestId('bonusPointsViewContainer')).toBeTruthy();
    expect(getByText('Bonus Point Leaders')).toBeTruthy();
    expect(getByTestId('bonusPointsView')).toBeTruthy();
});