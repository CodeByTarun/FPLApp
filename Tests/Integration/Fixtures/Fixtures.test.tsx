import React from "react";
import { render, fireEvent } from "../reduxRender";
import Fixtures from "../../../App/Features/Fixtures";
import { overview } from "../../SampleData/Overviews";
import { liveGameweek } from "../../SampleData/LiveScoreData";
import { allFixtures } from "../../SampleData/Fixtures";

jest.mock('expo-localization', () => {
    return {
        timezone: 'US/Pacific'
    }
});

test('opening full fixture view and clicking a fixture', () => {

    const { getByTestId, getAllByTestId } = render(<Fixtures overview={overview} fixtures={allFixtures} gameweek={liveGameweek}/>);

    expect(getByTestId('fixturesScrollView')).toHaveProp('horizontal', true);
    fireEvent.press(getAllByTestId('imageButton')[0]);
    expect(getByTestId('fixturesScrollView')).toHaveProp('horizontal', false);
    fireEvent.press(getAllByTestId('imageButton')[0]);
    expect(getByTestId('fixturesScrollView')).toHaveProp('horizontal', true);
});

test('test if all controls are present', () => {

    const { getByTestId, getAllByTestId, getByText } = render(<Fixtures overview={overview} fixtures={allFixtures} gameweek={liveGameweek}/>);

    expect(getAllByTestId('imageButton')[0]).toBeTruthy();
    expect(getAllByTestId('imageButton')[1]).toBeTruthy();
    expect(getByText('Gameweek')).toBeTruthy();
    expect(getByTestId('fixturesScrollView')).toBeTruthy();
});

//TODO: test clicking on a fixture card closes the full fixture view when opened,
//TODO: To do this i need to set the store state for teaminfo to a real gameweek instead of null (need to change render function i think)