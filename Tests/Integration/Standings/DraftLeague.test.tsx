import React from "react";
import { render, fireEvent, waitFor } from "../reduxRender";
import DraftLeague from "../../../App/Features/Standings/DraftLeague";
import { draftLeagueInfo } from "../../SampleData/Gameweek32Data";

test('draft league list renders and can click on a team', async() => {

    const mockFn = jest.fn();

    const { queryByTestId, queryByText, queryAllByTestId } = render(<DraftLeague draftLeagueInfo={draftLeagueInfo} setModalVisibility={mockFn}/>); 

    expect(queryByTestId('draftLeagueStandingsList')).toBeTruthy();

    // each item should have rank, team name, players first and last name, gw total, overall total
    expect(queryByText('1')).toBeTruthy();
    expect(queryByText("It’s Coming Home")).toBeTruthy();
    expect(queryByText('Jason Parmar')).toBeTruthy();
    expect(queryByText('30')).toBeTruthy();
    expect(queryByText('1568')).toBeTruthy();

    fireEvent.press(queryAllByTestId('animatedButton')[0]);

    await waitFor(() => expect(mockFn).toBeCalledTimes(1));
    expect(mockFn).toBeCalledWith(false);

})