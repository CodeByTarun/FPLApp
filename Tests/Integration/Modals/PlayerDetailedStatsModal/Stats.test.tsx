import React from "react";
import { reduxRender, render } from "../../reduxRender";
import { Stats } from "../../../../App/Modals/PlayerDetailedStatsModal/PlayerDetailedStatsViews";
import { StatsFilterState } from "../../../../App/Modals/PlayerDetailedStatsModal/StatsFilterReducer";
import { playerOverview, playerSummary } from "./PlayerData";
import store from "../../../../App/Store/store";
import { setLiveGameweek } from "../../../../App/Store/teamSlice";

test('everything renders', () => {

    let statsFilterState: StatsFilterState = {gameSpan: [1, 33], isPer90: false};

    const customStore = store;
    customStore.dispatch(setLiveGameweek(33));

    const { queryByTestId, queryByText, queryAllByTestId } = reduxRender(<Stats statsFilterState={statsFilterState} player={playerOverview} playerData={playerSummary}/>);

    expect(queryByTestId('playerDetailedStatsStatsView')).toBeTruthy();
    expect(queryByText('Totals')).toBeTruthy();
    expect(queryByText('41pts')).toBeTruthy();

    expect(queryByText('G: 3')).toBeTruthy();
    expect(queryByText('A: 1')).toBeTruthy();

    expect(queryAllByTestId('playerDetailedStatsRightSideItems')).toHaveLength(7);
    expect(queryByText('Bonus')).toBeTruthy();
    expect(queryByText('5')).toBeTruthy();

    expect(queryByText('GW 33')).toBeTruthy();
    expect(queryAllByTestId('bottommStatsItem')).toHaveLength(4);
    expect(queryByText('Transfers In')).toBeTruthy();
    expect(queryByText('385')).toBeTruthy();
});

test('isPer90', () => {

    let statsFilterState: StatsFilterState = {gameSpan: [1, 33], isPer90: true};

    const { queryByTestId, queryByText, queryAllByTestId } = reduxRender(<Stats statsFilterState={statsFilterState} player={playerOverview} playerData={playerSummary}/>);

    expect(queryByText('Per 90')).toBeTruthy();
});
``