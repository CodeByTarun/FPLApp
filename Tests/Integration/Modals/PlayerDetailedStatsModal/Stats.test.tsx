import React from "react";
import { render } from "../../reduxRender";
import { Stats } from "../../../../App/Modals/PlayerDetailedStatsModal/PlayerDetailedStatsViews";
import { StatsFilterState } from "../../../../App/Modals/PlayerDetailedStatsModal/StatsFilterReducer";
import { playerOverview, playerSummary } from "./PlayerData";

test('everything renders', () => {

    let statsFilterState: StatsFilterState = {gameSpan: [1, 33], isPer90: false};


    const { queryByTestId, queryByText, queryAllByTestId } = render(<Stats statsFilterState={statsFilterState} player={playerOverview} playerData={playerSummary} currentGameweek={33}/>);

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

    const { queryByTestId, queryByText, queryAllByTestId } = render(<Stats statsFilterState={statsFilterState} player={playerOverview} playerData={playerSummary} currentGameweek={33}/>);

    expect(queryByText('Per 90')).toBeTruthy();
});
