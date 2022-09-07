// Basic table that will show pts, goals, assists, playernames and positions
// will also have a search function to find players faster

import React, { useCallback, useReducer } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FplOverview } from "../../../Models/FplOverview";
import * as GlobalConstants from "../../../Global/GlobalConstants";
import { OverviewStats } from "../../../Global/EnumsAndDicts"
import { FplFixture } from "../../../Models/FplFixtures";
import { useAppDispatch } from "../../../Store/hooks";
import { goToMainScreen } from "../../../Store/navigationSlice";
import globalStyles from "../../../Global/GlobalStyles";
import { PlayerTableFilterState, playerTableFilterReducer } from "./PlayerTableFilterReducer";
import { PLayerTableStyles } from "./PlayerTableStyles";
import { Dropdown, SearchControl, AnimatedButton } from "../../Controls";
import TableFilterPopup from "./TableFilterPopup";
import { CustomVerticalSeparator } from "../../../Global/GlobalComponents";
import { useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../../../App";
import { changeFilterView } from "../../../Store/modalSlice";
import { Icons } from "../../../Global/Images";
import PlayerListContainer from "../PlayerListContainer";

interface PlayerTableProps {
    overview: FplOverview;
    fixtures: FplFixture[];
}

const PlayerTable = React.memo(({overview, fixtures}: PlayerTableProps) => {

    const theme = useTheme();
    const styles = PLayerTableStyles(theme);

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const initialPriceRange = [
        Math.min(...(overview.elements.map(element => element.now_cost))),
        Math.max(...(overview.elements.map(element => element.now_cost))),
    ];

    const initialPlayerTableFilterState: PlayerTableFilterState = { 
        isPer90: false, 
        isInWatchlist: false, 
        priceRange: initialPriceRange,
        teamFilter: 'All Teams',
        positionFilter: 'All Positions', 
        statFilter: 'Total Points',
        playerSearchText: '',
        minutesRange: [0, (90 * overview?.events.filter((event) => { return event.is_current === true; })[0]?.id)],
    }

    const [playerTableFilterState, playerTableFilterDispatch] = useReducer(playerTableFilterReducer, initialPlayerTableFilterState);   

    //#region Dispatch calls

    const dispatch = useAppDispatch();

    const closePlayerSearch = useCallback(() => {
        dispatch(goToMainScreen());
    }, []);

    const teamFilterDispatch = useCallback((value: string) => {
        playerTableFilterDispatch({type: 'TeamFilterChange', filterValue: value})
    }, []);

    const positionFilterDispatch = useCallback((value: string) => {
        playerTableFilterDispatch({type: 'PositionFilterChange', filterValue: value})
    }, []);

    const statFilterDispatch = useCallback((value: string) => {
        playerTableFilterDispatch({type: 'StatFilterChange', filterValue: value})
    }, []);
    //#endregion

    const openFilter = () => {
        dispatch(changeFilterView(<TableFilterPopup filterDispatch={playerTableFilterDispatch} 
                                                    filterState={playerTableFilterState} 
                                                    initialPriceRange={initialPriceRange}/>));
        navigation.navigate('FilterModal');
    }

    return (
        <View style={{flex: 1}}>
            <View style={[styles.topBarContainer, globalStyles.bottomShadow]}>
                <View style={styles.firstRowTopBarContainer}>
                    <SearchControl placeHolderText="Search" value={playerTableFilterState.playerSearchText} onChangeTextFunction={text => playerTableFilterDispatch({type: 'PlayerSearchTextChange', filterValue: text})}/>
                    
                    <TouchableOpacity style={styles.closeButtonContainer} onPress={closePlayerSearch}>
                        <Text style={{ alignSelf: 'center', color: GlobalConstants.textPrimaryColor, fontFamily: GlobalConstants.defaultFont, fontSize: GlobalConstants.mediumFont }}>  Close</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.secondRowTopbarContainer}>
                    <View style={styles.dropDownsContainer}>
                        <View style={styles.dropDownContainer}>
                            <Dropdown defaultValue="All Teams" 
                                    headerText="Team"
                                    options={Array.from(overview.teams.map(team => team.name))} 
                                    value={playerTableFilterState.teamFilter} 
                                    setValue={teamFilterDispatch}/>
                        </View>
                        {CustomVerticalSeparator(4, 4, theme)}
                        <View style={[styles.dropDownContainer]}>
                            <Dropdown defaultValue="All Positions" 
                                    headerText="Position"
                                    options={Array.from(overview.element_types.map(type => type.plural_name))} 
                                    value={playerTableFilterState.positionFilter} 
                                    setValue={positionFilterDispatch}/>
                        </View>
                            {CustomVerticalSeparator(4, 4, theme)}
                        <View style={[styles.dropDownContainer]}>
                            <Dropdown defaultValue="Total Points" 
                                    headerText={"Stat" + ((playerTableFilterState.isPer90 && GlobalConstants.Per90Stats.includes(playerTableFilterState.statFilter)) ? " (per 90)" : "")}
                                    options={Object.values(OverviewStats).sort()} 
                                    value={playerTableFilterState.statFilter} 
                                    setValue={statFilterDispatch}/>
                        </View>
                            {CustomVerticalSeparator(4, 4, theme)}
                    </View>
                    <View style={styles.filterButtonContainer}>
                        <AnimatedButton buttonFn={openFilter}>
                            <Image source={Icons['filter']} resizeMode='contain' style={styles.filter}/>
                        </AnimatedButton>
                    </View>
                </View>
            </View>

            <View style={{ flex: 1}}>
                <PlayerListContainer overview={overview} filters={playerTableFilterState}/>
            </View>
        </View>

    )
});

export default PlayerTable;
