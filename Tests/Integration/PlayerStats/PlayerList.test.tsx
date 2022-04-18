import React from "react";
import { render, fireEvent } from "../reduxRender";
import PlayerList from "../../../App/Features/PlayerStats/PlayerList";
import { overview } from "../../SampleData/Overviews";
import { allFixtures } from "../../SampleData/Fixtures";
import { PlayerTableFilterState } from "../../../App/Features/PlayerStats/PlayerTable/PlayerTableFilterReducer";

test('testing the watchlist button', () => {

    let filters: PlayerTableFilterState = {isPer90: false,
                                           isInWatchlist: false,
                                           priceRange: [0, 100],
                                           teamFilter: 'All Teams',
                                           positionFilter: 'All Positions',
                                           statFilter: 'Total Points',
                                           playerSearchText: '',
                                           minutesRange: [0, (90 * 38)], };

    const { queryAllByTestId } = render(<PlayerList overview={overview} fixtures={allFixtures} filters={filters}/>)

    expect(queryAllByTestId('watchlistButtonContainer')[0]).toHaveStyle({'opacity': 0.5});    
});