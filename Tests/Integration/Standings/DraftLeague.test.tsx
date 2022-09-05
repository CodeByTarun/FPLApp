import React from "react";
import { fireEvent, waitFor, reduxRender } from "../reduxRender";
import DraftLeague from "../../../App/Features/Standings/DraftLeague";
import { draftLeagueInfo } from "../../SampleData/Gameweek32Data";
import store from "../../../App/Store/store";
import { mockedNavigation, mockedNavigationGoBack } from "../../jestSetupFile";
import { DraftInfo, TeamTypes } from "../../../App/Store/teamSlice";

beforeAll(() => {
    mockedNavigation.mockClear();
    mockedNavigationGoBack.mockClear();
});

test('draft league list renders and can click on a team', async() => {

    const customStore = store;

    const { queryByTestId, queryByText, queryAllByTestId } = reduxRender(<DraftLeague draftLeagueInfo={draftLeagueInfo}/>, customStore); 

    expect(queryByTestId('draftLeagueStandingsList')).toBeTruthy();

    // each item should have rank, team name, players first and last name, gw total, overall total
    expect(queryByText('1')).toBeTruthy();
    expect(queryByText("It’s Coming Home")).toBeTruthy();
    expect(queryByText('Jason Parmar')).toBeTruthy();
    expect(queryByText('30')).toBeTruthy();
    expect(queryByText('1568')).toBeTruthy();

    fireEvent.press(queryAllByTestId('animatedButton')[0]);

    await waitFor(() => expect(mockedNavigationGoBack).toBeCalledTimes(1));

    expect((customStore.getState().team)).toStrictEqual({gameweek: 1, liveGameweek: 1, teamType: TeamTypes.Draft, info: {id: 1899, name: 'It’s Coming Home', isDraftTeam: true, isFavourite: false}} as DraftInfo);

})