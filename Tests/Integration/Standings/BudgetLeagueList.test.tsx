import React from "react";
import { render, fireEvent } from "../reduxRender";
import BudgetLeagueList from "../../../App/Features/Standings/BudgetLeague/LeagueList/BudgetLeagueList";
import { budgetManagerInfo } from '../../SampleData/Gameweek32Data';

test('shows leagues info and can press on leagues', () => {

    const mockFn = jest.fn();

    const { queryByTestId, queryByText, queryAllByTestId } = render(<BudgetLeagueList budgetUserInfo={budgetManagerInfo} setLeagueToShow={mockFn}/>);

    expect(queryByTestId('budgetLeagueList')).toBeTruthy();
    expect(queryByText('Canada')).toBeTruthy();
    expect(queryByText('64550')).toBeTruthy();

    fireEvent.press(queryAllByTestId('leagueItemButton')[1]);

    expect(mockFn).toBeCalledTimes(1);
    expect(mockFn).toBeCalledWith(59)

});