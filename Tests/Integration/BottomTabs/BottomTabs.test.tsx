import React from "react";
import BottomTabs from "../../../App/Features/BottomTabs";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { mockedNavigation } from "../../jestSetupFile";
import { store } from "../../../App/Store/store";
import { changeToDraftTeam, changeGameweek, TeamTypes } from "../../../App/Store/teamSlice";
import { reduxRender } from "../reduxRender";
import { ScreenTypes } from "../../../App/Store/navigationSlice";

// test to see if all five buttons are shown
// there are four vertical separators?
// check if functions work????????? idk about this one

beforeAll(() =>{
    mockedNavigation.mockClear();
})

test('bottom tabs have the correct number of buttons and call the right functions', async () => {

    const customStore = store;
    customStore.dispatch(changeToDraftTeam({ id: 61187, isDraftTeam: true, isFavourite: true, name: 'Tarun' }));
    customStore.dispatch(changeGameweek(32));

    const { getAllByTestId, getByText } = reduxRender(<BottomTabs/>, customStore);

    expect(getAllByTestId('tabButton')).toHaveLength(5);
    expect(getAllByTestId('verticalSeparator')).toHaveLength(4);

    fireEvent.press(getByText('Dream Team'));
    await waitFor(() => expect(customStore.getState().team.teamType).toEqual(TeamTypes.Dream));
    
    fireEvent.press(getByText('Overview'));
    await waitFor(() => expect(mockedNavigation).toHaveBeenCalledTimes(1));
    expect(mockedNavigation).toHaveBeenCalledWith('GameweekOverview');

    expect(customStore.getState().navigation.screenType).toEqual(ScreenTypes.Main);
    fireEvent.press(getByText('Fixtures'));
    await waitFor(() => expect(customStore.getState().navigation.screenType).toEqual(ScreenTypes.Fixtures));

    fireEvent.press(getByText('Players'));
    await waitFor(() => expect(customStore.getState().navigation.screenType).toEqual(ScreenTypes.PlayerStats));

    fireEvent.press(getByText('My Teams'));
    await waitFor(() => expect(mockedNavigation).toHaveBeenCalledTimes(2));
    expect(mockedNavigation).toHaveBeenLastCalledWith('TeamModal');

});