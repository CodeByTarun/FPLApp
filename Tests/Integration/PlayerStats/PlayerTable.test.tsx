import React from "react";
import PlayerTable from "../../../App/Features/PlayerStats/PlayerTable";
import { ScreenTypes } from "../../../App/Store/navigationSlice";
import store from "../../../App/Store/store";
import { mockedNavigation, mockedNavigationGoBack } from "../../jestSetupFile";
import { allFixtures } from "../../SampleData/Fixtures";
import { overview } from "../../SampleData/Overviews";
import { fireEvent, reduxRender } from "../reduxRender";
import { act, waitFor } from "@testing-library/react-native";

beforeEach(() => {
    mockedNavigation.mockClear();
    mockedNavigationGoBack.mockClear();
});

test('check if all controls are present and buttons perform the correct actions', async () => {

    const customStore = store;
    const {getByText, getByTestId, getAllByTestId} = reduxRender(<PlayerTable overview={overview} fixtures={allFixtures}/>, customStore);

    expect(getByTestId('searchControl')).toBeTruthy();
    expect(getByText('Close')).toBeTruthy();

    expect(getAllByTestId('dropDown')).toHaveLength(3);
    expect(getByText('Team')).toBeTruthy();
    expect(getByText('Position')).toBeTruthy();
    expect(getByText('Stat')).toBeTruthy();

    expect(getByTestId('animatedButton')).toBeTruthy();
    expect(getByTestId('playerList')).toBeTruthy();

    expect(customStore.getState().modal.filterView).toBeFalsy();
    await act(async() => {
        fireEvent.press(getByTestId('animatedButton'));
        await waitFor(() => expect(mockedNavigation).toBeCalledTimes(1));

    })
    expect(customStore.getState().modal.filterView).toBeTruthy();

    await act(async() => {
        fireEvent.press(getByText('Close'));
        await waitFor(() => expect(customStore.getState().navigation.screenType).toBe(ScreenTypes.Main));
    })

});