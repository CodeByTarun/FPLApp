import React from "react";
import { render, fireEvent, cleanup } from "../reduxRender";
import Fixtures from "../../../App/Features/Fixtures";
import { overview } from "../../SampleData/Overviews";
import { liveGameweek } from "../../SampleData/LiveScoreData";
import { allFixtures } from "../../SampleData/Fixtures";
import store from "../../../App/Store/store";
import { useAppDispatch } from "../../../App/Store/hooks";
import { changeGameweek } from "../../../App/Store/teamSlice";

afterEach(() => {
    cleanup();
});

jest.mock('expo-localization', () => {
    return {
        timezone: 'US/Pacific'
    }
});

test('test if all controls are present', () => {

    const { getByTestId, getAllByTestId, getByText } = render(<Fixtures overview={overview} fixtures={allFixtures} gameweek={liveGameweek}/>);

    expect(getAllByTestId('imageButton')[0]).toBeTruthy();
    expect(getByText('Gameweek')).toBeTruthy();
    expect(getByTestId('fixturesScrollView')).toBeTruthy();
});
