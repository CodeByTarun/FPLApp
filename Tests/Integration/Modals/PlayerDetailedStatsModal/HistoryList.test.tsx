import React from "react";
import { render, waitFor } from "../../reduxRender";
import { HistoryList } from "../../../../App/Modals/PlayerDetailedStatsModal/PlayerDetailedStatsViews";
import { overview } from "../../../SampleData/Overviews";
import { playerOverview, playerSummary } from "./PlayerData";

test('everything renders', async () => {

    const { queryByTestId, queryByText, queryAllByTestId } = render(<HistoryList overview={overview} player={playerOverview} playerData={playerSummary}/>)

    expect(queryByTestId('playerDetailedStatsHistoryListView')).toBeTruthy();
    await waitFor(() => expect(queryByTestId('historyListScrollView')).toHaveProp('horizontal', true));
    expect(queryAllByTestId('historyListItem')).toBeTruthy();
    expect(queryAllByTestId('historyFooterItem')).toHaveLength(15);

    expect(queryByText('GW')).toBeTruthy();
    expect(queryByText('OG')).toBeTruthy();
    expect(queryByText('S')).toBeTruthy();
    expect(queryByText('BPS')).toBeTruthy();
    expect(queryByText('41')).toBeTruthy();
});