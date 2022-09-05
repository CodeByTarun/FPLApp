import React from "react";
import BudgetLeagueStandings from "../../../App/Features/Standings/BudgetLeague/LeagueStandings/BudgetLeagueStandings";
import { store } from "../../../App/Store/store";
import { BudgetInfo, TeamTypes } from "../../../App/Store/teamSlice";
import { mockedNavigation, mockedNavigationGoBack } from "../../jestSetupFile";
import { budgetLeague } from "../../SampleData/BudgetManager";
import { fireEvent, waitFor, reduxRender } from "../reduxRender";

beforeAll(() => {
    mockedNavigation.mockClear();
    mockedNavigationGoBack.mockClear();
});

test('league standings renders and can press on entries', async() => {

    const customStore = store;

    const { queryByTestId, queryByText, queryAllByTestId, queryAllByText } = reduxRender(<BudgetLeagueStandings budgetLeagueInfo={budgetLeague}/>, customStore)

    expect(queryByTestId('budgetLeagueStandingsList')).toBeTruthy();
    // Rank, team name, player name, gw total, overall total should all show up for each entry
    expect(queryAllByText('1')[0]).toBeTruthy();
    expect(queryByText('Gheri')).toBeTruthy();
    expect(queryByText('Abang Ayoma')).toBeTruthy();
    expect(queryByText('20')).toBeTruthy();
    expect(queryByText('100')).toBeTruthy();

    fireEvent.press(queryAllByTestId('leagueEntryItemButton')[0]);

    await waitFor(() => expect(mockedNavigationGoBack).toBeCalledTimes(1));

    expect(customStore.getState().team).toStrictEqual({gameweek: 1, liveGameweek: 1, teamType: TeamTypes.Budget, info: {id: 9086695, name: 'Gheri', isDraftTeam: false, isFavourite: false}} as BudgetInfo);

});