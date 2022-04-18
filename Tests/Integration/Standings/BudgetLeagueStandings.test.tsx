import React from "react";
import BudgetLeagueStandings from "../../../App/Features/Standings/BudgetLeague/LeagueStandings/BudgetLeagueStandings";
import { budgetLeague } from "../../SampleData/BudgetManager";
import { render, fireEvent } from "../reduxRender";


test('league standings renders and can press on entries', () => {

    const mockFn = jest.fn();

    const { queryByTestId, queryByText, queryAllByTestId, queryAllByText } = render(<BudgetLeagueStandings budgetLeagueInfo={budgetLeague} setModalVisibility={mockFn}/>)

    expect(queryByTestId('budgetLeagueStandingsList')).toBeTruthy();
    // Rank, team name, player name, gw total, overall total should all show up for each entry
    expect(queryAllByText('1')[0]).toBeTruthy();
    expect(queryByText('Gheri')).toBeTruthy();
    expect(queryByText('Abang Ayoma')).toBeTruthy();
    expect(queryByText('20')).toBeTruthy();
    expect(queryByText('100')).toBeTruthy();

    fireEvent.press(queryAllByTestId('leagueEntryItemButton')[0]);

    expect(mockFn).toBeCalledTimes(1);
    expect(mockFn).toBeCalledWith(false);
});