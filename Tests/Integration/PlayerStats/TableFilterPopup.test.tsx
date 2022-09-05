import React from "react";
import { PlayerTableFilterState } from "../../../App/Features/PlayerStats/PlayerTable/PlayerTableFilterReducer";
import TableFilterPopup from "../../../App/Features/PlayerStats/PlayerTable/TableFilterPopup";
import { mockedNavigation, mockedNavigationGoBack } from "../../jestSetupFile";
import { fireEvent, reduxRender } from "../reduxRender";
import { act, waitFor } from "@testing-library/react-native";

beforeEach(() => {
    mockedNavigationGoBack.mockClear();
    mockedNavigation.mockClear();
});

let initialPriceRange = [10 , 1000];
let filterState: PlayerTableFilterState = {
    isPer90: false,
    isInWatchlist: false,
    priceRange: initialPriceRange,
    teamFilter: 'All Teams',
    positionFilter: 'All Positions',
    statFilter: 'Total Points',
    playerSearchText: '',
    minutesRange: [0, 180],
}

test('all controls are present and buttons and checkboxes perform correct actions', async () => {

    let state = filterState;
    let filterDispatchMock = jest.fn();
    const { getByText, getAllByTestId } = reduxRender(<TableFilterPopup filterDispatch={filterDispatchMock} filterState={state} initialPriceRange={initialPriceRange}/>);

    expect(getByText('Per 90 (if applicable):')).toBeTruthy();
    expect(getByText('On Watchlist:')).toBeTruthy();
    expect(getAllByTestId('checkbox')).toHaveLength(2);
    
    expect(getByText('Price Range:')).toBeTruthy();
    expect(getByText('Minutes Range:')).toBeTruthy();
    
    expect(getAllByTestId('animatedButton')).toHaveLength(2);
    expect(getByText('Apply')).toBeTruthy();
    expect(getByText('Clear')).toBeTruthy();

    fireEvent.press(getAllByTestId('checkbox')[0]);
    fireEvent.press(getAllByTestId('checkbox')[1]);

    await act(async() => {
        fireEvent.press(getByText('Apply'));
        await waitFor(() => expect(filterDispatchMock).toBeCalledTimes(1));
    })

    expect(filterDispatchMock).toBeCalledWith({type: 'FilterPopupChange', minuteRange: [0, 180], priceRange: [10 , 1000], isInWatchlistValue: true, per90Value: true})

    await act(async() => {
        fireEvent.press(getByText('Clear'));
        await waitFor(() => expect(filterDispatchMock).toBeCalledTimes(2));
    })
    
    expect(filterDispatchMock).toBeCalledWith({type: 'Reset', priceRange: initialPriceRange, minutesRange: [0, 90*1]});
    await waitFor(() => expect(mockedNavigationGoBack).toBeCalledTimes(1));
    
});