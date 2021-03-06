import React from "react";
import { render } from "../reduxRender";
import FixtureCard from "../../../App/Features/Fixtures/FixtureCard";
import { overview } from "../../SampleData/Overviews";
import { liveFixture, liveGameweek } from "../../SampleData/LiveScoreData";
import { finishedFixture, upcomingFixture } from "../../SampleData/Fixtures";

jest.mock('expo-localization', () => {
    return {
        timezone: 'US/Pacific'
    }
});

test('when its a upcoming fixture does the correct UI show up', () => {

    const { queryByTestId } = render(<FixtureCard overview={overview} fixture={upcomingFixture} gameweekData={liveGameweek}/>);

    expect(queryByTestId('notStarted')).toBeTruthy();
    expect(queryByTestId('fixtureCardButton')).toBeDisabled();    
});

test('when its a live fixture does the correct UI show up', () => {

    const { queryByTestId } = render(<FixtureCard overview={overview} fixture={liveFixture} gameweekData={liveGameweek}/>);

    expect(queryByTestId('liveFixtureText')).toBeTruthy();
    expect(queryByTestId('fixtureCardButton')).toBeEnabled();
});

test('when its a completed fixture does the correct UI show up', () => {

    const { queryByTestId } = render(<FixtureCard overview={overview} fixture={finishedFixture} gameweekData={liveGameweek}/>);

    expect(queryByTestId('finishedFixtureText')).toBeTruthy();
    expect(queryByTestId('fixtureCardButton')).toBeEnabled();
});