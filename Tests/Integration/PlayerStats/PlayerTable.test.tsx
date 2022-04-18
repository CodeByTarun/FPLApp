import React from "react";
import { render, fireEvent } from "../reduxRender";
import PlayerTable from "../../../App/Features/PlayerStats/PlayerTable";
import { overview } from "../../SampleData/Overviews";
import { allFixtures } from "../../SampleData/Fixtures";
import { View } from "react-native";

jest.mock('expo-checkbox', () => <View></View>);

test('filter button opens tooltip and the tooltip works properly', () => {

    const {queryByTestId} = render(<PlayerTable overview={overview} fixtures={allFixtures}/>);

    expect(queryByTestId('background')).toBeFalsy();
    fireEvent.press(queryByTestId('imageButton'));
    expect(queryByTestId('background')).toBeTruthy();

});

test('is close button present', () => {

    const {queryByText} = render(<PlayerTable overview={overview} fixtures={allFixtures}/>);

    expect(queryByText('  Close')).toBeTruthy();

});
