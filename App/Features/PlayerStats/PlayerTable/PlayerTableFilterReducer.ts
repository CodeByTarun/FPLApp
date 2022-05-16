
export interface PlayerTableFilterState {
    isPer90: boolean,
    isInWatchlist: boolean,
    priceRange: number[],
    teamFilter: string,
    positionFilter: string,
    statFilter: string,
    playerSearchText: string,
    minutesRange: number[],
}


export type PlayerTableFilterAction = {
    type: "ChangeIsPer90" | "ChangeIsInWatchlist";
} | {
    type: "ChangePriceRange" | "ChangeMinutesRange";
    range: number[];
} | {
    type: 'TeamFilterChange' | 'PositionFilterChange' | 'StatFilterChange' | 'PlayerSearchTextChange';
    filterValue: string;
} | {
    type: 'FilterPopupChange';
    priceRange: number[];
    minuteRange: number[];
    per90Value: boolean;
    isInWatchlistValue: boolean;
} | {
    type: "Reset";
    range: number[];
}

export function playerTableFilterReducer(state: PlayerTableFilterState, action: PlayerTableFilterAction): PlayerTableFilterState {
    switch(action.type) {
        case 'ChangeIsInWatchlist': {
            return {
                ...state,
                isInWatchlist: !state.isInWatchlist,
            }
        } 
        case 'ChangeIsPer90': {
            return {
                ...state,
                isPer90: !state.isPer90,
            }
        }
        case 'ChangePriceRange': {
            return {
                ...state,
                priceRange: action.range,
            }
        }
        case 'TeamFilterChange': {
            return {
                ...state,
                teamFilter: action.filterValue,
            }
        }
        case 'PositionFilterChange': {
            return {
                ...state,
                positionFilter: action.filterValue,
            }
        }
        case 'StatFilterChange': {
            return {
                ...state,
                statFilter: action.filterValue,
            }
        }
        case 'PlayerSearchTextChange': {
            return {
                ...state,
                playerSearchText: action.filterValue,
            }
        }
        case 'ChangeMinutesRange': {
            return {
                ...state,
                minutesRange: action.range,
            }
        }
       case 'FilterPopupChange': {
           return{
               ...state,
               minutesRange: action.minuteRange,
               priceRange: action.priceRange,
               isPer90: action.per90Value,
               isInWatchlist: action.isInWatchlistValue,
           }
       }
       case 'Reset': {
            return {
                isPer90: false,
                isInWatchlist: false,
                priceRange: action.range,
                teamFilter: 'All Teams',
                positionFilter: 'All Positions',
                statFilter: 'Total Points',
                playerSearchText: '',
                minutesRange: [0, (90 * 38)],
            }
       }
    }
}