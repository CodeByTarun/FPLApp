import React from "react";
import { render, fireEvent } from "../reduxRender";
import DraftLeague from "../../../App/Features/Standings/DraftLeague";
import { draftLeagueInfo } from "../LineupView/Gameweek32Data";

test('draft league list renders and can click on a team', () => {

    const mockFn = jest.fn();

    const { queryByTestId, queryByText, queryAllByTestId } = render(<DraftLeague draftLeagueInfo={draftLeagueInfo} setModalVisibility={mockFn}/>); 

    expect(queryByTestId('draftLeagueStandingsList')).toBeTruthy();

    // each item should have rank, team name, players first and last name, gw total, overall total
    expect(queryByText('1')).toBeTruthy();
    expect(queryByText("It’s Coming Home")).toBeTruthy();
    expect(queryByText('Jason Parmar')).toBeTruthy();
    expect(queryByText('30')).toBeTruthy();
    expect(queryByText('1568')).toBeTruthy();

    fireEvent.press(queryAllByTestId('draftLeagueEntryItemButton')[0]);

    expect(mockFn).toBeCalledTimes(1);
    expect(mockFn).toBeCalledWith(false);

})