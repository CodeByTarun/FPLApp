import React from "react";
import { render, fireEvent } from "../reduxRender";
import PlayerTable from "../../../App/Features/PlayerStats/PlayerTable";
import { overview } from "../../SampleData/Overviews";
import { allFixtures } from "../../SampleData/Fixtures";
import { Text } from "react-native";
import Checkbox from "expo-checkbox";
import { Slider } from "@miblanchard/react-native-slider";

jest.mock('expo-checkbox', () => jest.fn(() => null));

jest.mock('@miblanchard/react-native-slider', () => jest.fn(() => null));

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
