import React from "react";
import { render, fireEvent, cleanup, reduxRender, waitFor } from "../reduxRender";
import Fixtures from "../../../App/Features/Fixtures";
import { overview } from "../../SampleData/Overviews";
import { liveGameweek } from "../../SampleData/LiveScoreData";
import { allFixtures } from "../../SampleData/Fixtures";
import store from "../../../App/Store/store";
import { useAppDispatch } from "../../../App/Store/hooks";
import { changeGameweek, changeToDraftTeam, changeToFixture, DraftInfo, TeamTypes } from "../../../App/Store/teamSlice";
import { mockedNavigation, mockedNavigationGoBack } from "../../jestSetupFile";
import { goToFixturesScreen, ScreenTypes } from "../../../App/Store/navigationSlice";

beforeEach(() => {
    mockedNavigation.mockClear();
    mockedNavigationGoBack.mockClear();
})

afterEach(() => {
    cleanup();
});

jest.mock('expo-localization', () => {
    return {
        timezone: 'US/Pacific'
    }
});

test('test if all controls are present and perform the correct actions', async () => {

    const customStore = store;

    const { getByTestId, getAllByTestId, getByText } = reduxRender(<Fixtures overview={overview} fixtures={allFixtures} gameweek={liveGameweek}/>, customStore);

    expect(getByText('◣')).toBeTruthy();
    expect(getByTestId('gameweekButton')).toBeTruthy();
    fireEvent.press(getByTestId('gameweekButton'));
    await waitFor(() => expect(mockedNavigation).toBeCalledWith('MutableModal'));
    expect(customStore.getState().modal.mutableView).toBeTruthy();

    expect(getByTestId('imageButton')).toBeTruthy();
    fireEvent.press(getByTestId('imageButton'));
    await waitFor(() => expect(mockedNavigation).toBeCalledWith('SettingsModal'));

    expect(getByTestId('fixturesScrollView')).toBeTruthy();
});

test('if screentype is fixtures, test all controls', async () => {

    const customStore = store;
    customStore.dispatch(goToFixturesScreen());

    const { getByTestId, getByText } = reduxRender(<Fixtures overview={overview} fixtures={allFixtures} gameweek={liveGameweek}/>, customStore);

    expect(getByText('Prev')).toBeTruthy();
    expect(getByTestId('calendarButton')).toBeTruthy();
    expect(getByText('Next')).toBeTruthy();

    expect(customStore.getState().team.gameweek).toBe(1);
    fireEvent.press(getByText('Prev'));
    await waitFor(() => expect(customStore.getState().team.gameweek).toBe(1));
    fireEvent.press(getByText('Next'));
    await waitFor(() => expect(customStore.getState().team.gameweek).toBe(2));

    customStore.dispatch(changeGameweek(38));
    fireEvent.press(getByText('Next'));
    await waitFor(() => expect(customStore.getState().team.gameweek).toBe(38));
    fireEvent.press(getByText('Prev'));
    await waitFor(() => expect(customStore.getState().team.gameweek).toBe(37));

    fireEvent.press(getByTestId('calendarButton'));
    await waitFor(() => expect(customStore.getState().navigation.screenType).toBe(ScreenTypes.Main));
    expect(customStore.getState().team.gameweek).toBe(1);

});

test('if either overview, gameweek, fixtures is null then three FixtureCardLoading components should be present rather then the scrollview', () => {

    const customStore = store;
    customStore.dispatch(changeToDraftTeam({ id: 61187, isDraftTeam: true, isFavourite: true, name: 'Tarun' }));

    const { getByTestId, getAllByTestId, queryByTestId, rerender } = reduxRender(<Fixtures overview={undefined} fixtures={allFixtures} gameweek={liveGameweek}/>, customStore);

    expect(queryByTestId('fixturesScrollView')).toBeFalsy();
    expect(getAllByTestId('fixtureCardLoading')).toHaveLength(3);
    
    rerender(<Fixtures overview={overview} fixtures={undefined} gameweek={liveGameweek}/>);

    expect(queryByTestId('fixturesScrollView')).toBeFalsy();
    expect(getAllByTestId('fixtureCardLoading')).toHaveLength(3);

    rerender(<Fixtures overview={overview} fixtures={allFixtures} gameweek={undefined}/>);

    expect(queryByTestId('fixturesScrollView')).toBeFalsy();
    expect(getAllByTestId('fixtureCardLoading')).toHaveLength(3);

});

