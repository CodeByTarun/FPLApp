import React from "react";
import { fireEvent, reduxRender, render, waitFor } from "../reduxRender";
import { overview } from "../../SampleData/Overviews";
import GameweekView from "../../../App/Features/Fixtures/GameweekView";
import store from "../../../App/Store/store";
import { changeToDraftTeam, DraftInfo, setLiveGameweek, TeamTypes } from "../../../App/Store/teamSlice";
import { mockedNavigationGoBack } from "../../jestSetupFile";

beforeAll(() => {
    mockedNavigationGoBack.mockClear();
})

test('test if all gameweeks are in modal and other elements are rendered', async () => {

    const customStore = store;
    customStore.dispatch(setLiveGameweek(5));

    const { queryByText, queryAllByTestId } = reduxRender(<GameweekView overview={overview}/>, customStore);

    expect(queryByText('Gameweeks')).toBeTruthy();
    expect(queryByText('Current Gameweek')).toBeTruthy();
    expect(queryAllByTestId('gameweeksItem')).toHaveLength(38);

    fireEvent.press((queryByText('Gameweek 27')));
    await waitFor(() => expect(customStore.getState().team.gameweek).toBe(27));
    expect(mockedNavigationGoBack).toBeCalledTimes(1);

    expect(queryByText('Current Gameweek')).toBeTruthy();
    
    fireEvent.press((queryByText('Current Gameweek')));
    await waitFor(() => expect(customStore.getState().team.gameweek).toBe(5));
    expect(mockedNavigationGoBack).toBeCalledTimes(2);
});