import React from "react";
import { reduxRender } from "../../reduxRender";
import GameweekOverviewModal from "../../../../App/Modals/GameweekOverviewModal";
import store from "../../../../App/Store/store";
import { changeGameweek } from "../../../../App/Store/teamSlice";

test('gameweek overview modal renders correctly', () => {

    const customStore = store;
    store.dispatch(changeGameweek(32));

    const { queryAllByTestId, queryByText } = reduxRender(<GameweekOverviewModal/>, customStore)
    
    expect(queryByText('Overview')).toBeTruthy();
    expect(queryByText('Gameweek 32')).toBeTruthy();
    expect(queryByText('Team FDRs')).toBeTruthy();

    expect(queryAllByTestId('playerItemButton')).toHaveLength(5);
    expect(queryByText('Most Selected')).toBeTruthy();
    expect(queryByText('Most Transferred')).toBeTruthy();
    expect(queryByText('Top Player')).toBeTruthy();
    expect(queryByText('Most Captained')).toBeTruthy();
    expect(queryByText('Most Vice Captained')).toBeTruthy();
});