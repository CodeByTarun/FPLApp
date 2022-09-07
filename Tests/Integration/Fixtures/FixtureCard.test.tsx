import React from "react";
import { reduxRender, render } from "../reduxRender";
import FixtureCard from "../../../App/Features/Fixtures/FixtureCard";
import { overview } from "../../SampleData/Overviews";
import { liveFixture, liveGameweek } from "../../SampleData/LiveScoreData";
import { finishedFixture, upcomingFixture } from "../../SampleData/Fixtures";
import store from "../../../App/Store/store";
import { setLiveGameweek } from "../../../App/Store/teamSlice";

jest.mock('expo-localization', () => {
    return {
        timezone: 'US/Pacific'
    }
});

test('when its a upcoming fixture does the correct UI show up', () => {

    const { queryByTestId } = reduxRender(<FixtureCard overview={overview} fixture={upcomingFixture} gameweekData={liveGameweek}/>);

    expect(queryByTestId('notStarted')).toBeTruthy();
    expect(queryByTestId('animatedButton')).toBeDisabled();    
});

test('when its a live fixture does the correct UI show up', () => {

    const customStore = store;
    store.dispatch(setLiveGameweek(32));

    const { queryByTestId } = reduxRender(<FixtureCard overview={overview} fixture={liveFixture} gameweekData={liveGameweek}/>, customStore);

    expect(queryByTestId('liveFixtureText')).toBeTruthy();
    expect(queryByTestId('animatedButton')).toBeEnabled();
});

test('when its a completed fixture does the correct UI show up', () => {

    const { queryByTestId } = reduxRender(<FixtureCard overview={overview} fixture={finishedFixture} gameweekData={liveGameweek}/>);

    expect(queryByTestId('finishedFixtureText')).toBeTruthy();
    expect(queryByTestId('animatedButton')).toBeEnabled();
});