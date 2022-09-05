import React from "react";
import { render, fireEvent, waitFor } from "../reduxRender";
import BudgetLeagueList from "../../../App/Features/Standings/BudgetLeague/LeagueList/BudgetLeagueList";
import { budgetManagerInfo } from '../../SampleData/Gameweek32Data';
import { hasUncaughtExceptionCaptureCallback } from "process";
import { mockedNavigationGoBack } from "../../jestSetupFile";
import { getByText } from "@testing-library/react-native/build/helpers/byText";

beforeAll(() => {

    mockedNavigationGoBack.mockClear();

});

test('shows leagues info and can press on leagues', async() => {

    const mockFn = jest.fn();

    const { queryByTestId, queryByText, queryAllByTestId } = render(<BudgetLeagueList budgetUserInfo={budgetManagerInfo} setLeagueToShow={mockFn}/>);

    expect(queryByTestId('budgetLeagueList')).toBeTruthy();
    expect(queryByText('Indonesia')).toBeTruthy();
    expect(queryByText('66862')).toBeTruthy();

    fireEvent.press(queryAllByTestId('leagueItemButton')[1]);

    await waitFor(() => expect(mockFn).toBeCalledTimes(1));
    expect(mockFn).toBeCalledWith(121);



});