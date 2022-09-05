import React from "react";
import { render, fireEvent, reduxRender, waitFor } from "../reduxRender";
import PlayerList from "../../../App/Features/PlayerStats/PlayerListContainer/PlayerList";
import { draftOverview, overview } from "../../SampleData/Overviews";
import { allFixtures } from "../../SampleData/Fixtures";
import { PlayerTableFilterState } from "../../../App/Features/PlayerStats/PlayerTable/PlayerTableFilterReducer";
import PlayerListContainer, { DraftData, PlayerListData } from "../../../App/Features/PlayerStats/PlayerListContainer/PlayerListContainer";
import { draftLeagueInfo } from "../../SampleData/Gameweek32Data";
import { FplDraftLeaguePlayerStatuses } from "../../../App/Models/FplDraftLeaguePlayerStatuses";
import { PlayerOverview } from "../../../App/Models/FplOverview";
import { PlayersWatchlist } from "../../../App/Helpers/FplDataStorageService";
import store from "../../../App/Store/store";
import { mockedNavigation } from "../../jestSetupFile";

beforeEach(() => {
    mockedNavigation.mockClear();
})

test('testing the watchlist button', async () => {

    let filters: PlayerTableFilterState = {isPer90: false,
                                           isInWatchlist: false,
                                           priceRange: [0, 100],
                                           teamFilter: 'All Teams',
                                           positionFilter: 'All Positions',
                                           statFilter: 'Total Points',
                                           playerSearchText: '',
                                           minutesRange: [0, (90 * 38)], };

    let customStore = store;

    const { queryAllByTestId } = reduxRender(<PlayerListContainer overview={overview} filters={filters}/>, customStore);

    expect(queryAllByTestId('watchlistButtonContainer')[0]).toHaveStyle({'opacity': 0.5});    
    fireEvent.press(queryAllByTestId('imageButton')[0]);
    await waitFor(() => expect(queryAllByTestId('watchlistButtonContainer')[0]).toHaveStyle({'opacity': 1}));    

    expect(queryAllByTestId('playerListInfo')[0]).toBeTruthy();
    expect(queryAllByTestId('fixtureDifficultyList')[0]).toBeTruthy();

    fireEvent.press(queryAllByTestId('playerItem')[0]);
    await waitFor(() => expect(mockedNavigation).toBeCalledTimes(1));
    expect(mockedNavigation).toBeCalledWith('PlayerDetailedStatsModal');
    expect(customStore.getState().modal.playerOverview).toBeTruthy();
    
});