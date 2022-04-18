import React from "react";
import { render, fireEvent } from "../reduxRender";
import BudgetLeague from "../../../App/Features/Standings/BudgetLeague";
import { budgetManagerInfo } from "../../SampleData/Gameweek32Data";

test('budget league default display renders correctly and can go to standings of a team and back to leagues', async () => {

    const mockFn = jest.fn();

    const { queryByTestId, queryAllByTestId, queryByText } = render(<BudgetLeague budgetUserInfo={budgetManagerInfo} setModalVisibility={mockFn}/>);

    expect(queryByText('Leagues')).toBeTruthy();
    expect(queryByText('Go Back')).toBeFalsy();
    expect(queryByTestId('backButtonStandings')).toBeFalsy();
    expect(queryByTestId('budgetLeagueList')).toBeTruthy();

    fireEvent.press(queryAllByTestId('leagueItemButton')[0]);

    await new Promise((r) => setTimeout(r, 2000));

    expect(queryByText('Man City')).toBeTruthy();
    expect(queryByTestId('budgetLeagueStandingsList')).toBeTruthy();
    expect(queryByText('Go Back')).toBeTruthy();
    expect(queryByTestId('backButtonStandings')).toBeTruthy();

    fireEvent.press(queryByText('Go Back'));

    expect(queryByText('Leagues')).toBeTruthy();
    expect(queryByText('Go Back')).toBeFalsy();
    expect(queryByTestId('backButtonStandings')).toBeFalsy();
    expect(queryByTestId('budgetLeagueList')).toBeTruthy();
});