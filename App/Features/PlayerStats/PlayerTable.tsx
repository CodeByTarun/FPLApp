// Basic table that will show pts, goals, assists, playernames and positions
// will also have a search function to find players faster

import React, { useCallback, useReducer, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, LayoutChangeEvent, Image, Pressable } from "react-native";
import { FplOverview } from "../../Models/FplOverview";
import * as GlobalConstants from "../../Global/GlobalConstants";
import Dropdown from "../Controls/Dropdown";
import { OverviewStats } from "../../Global/EnumsAndDicts"
import { FplFixture } from "../../Models/FplFixtures";
import ToolTip from "../Controls/ToolTip";
import Checkbox from "expo-checkbox";
import { Slider } from "@miblanchard/react-native-slider";
import PlayerList from "./PlayerList";
import CustomButton from "../Controls/CustomButton";
import { useAppDispatch } from "../../Store/hooks";
import { goToMainScreen } from "../../Store/navigationSlice";
import { Icons } from "../../Global/Images";
import globalStyles from "../../Global/GlobalStyles";

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

type PlayerTableFilterAction = {
    type: "ChangeIsPer90" | "ChangeIsInWatchlist";
} | {
    type: "ChangePriceRange" | "ChangeMinutesRange";
    range: number[];
} | {
    type: 'TeamFilterChange' | 'PositionFilterChange' | 'StatFilterChange' | 'PlayerSearchTextChange';
    filterValue: string;
} | {
    type: "Reset";
    range: number[];
}

function playerTableFilterReducer(state: PlayerTableFilterState, action: PlayerTableFilterAction): PlayerTableFilterState {
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

interface PlayerTableProps {
    overview: FplOverview;
    fixtures: FplFixture[];
}

const PlayerTable = React.memo(({overview, fixtures}: PlayerTableProps) => {

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
        minutesRange: [0, (90 * 38)],
    }

    const [playerTableFilterState, playerTableFilterDispatch] = useReducer(playerTableFilterReducer, initialPlayerTableFilterState);   
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

    //#region Store Dispatch calls

    const dispatch = useAppDispatch();

    const teamFilterDispatch = useCallback((value: string) => {
        playerTableFilterDispatch({type: 'TeamFilterChange', filterValue: value})
    }, [])

    const positionFilterDispatch = useCallback((value: string) => {
        playerTableFilterDispatch({type: 'PositionFilterChange', filterValue: value})
    }, [])

    const statFilterDispatch = useCallback((value: string) => {
        playerTableFilterDispatch({type: 'StatFilterChange', filterValue: value})
    }, [])

    const closePlayerSearch = useCallback(() => {
        dispatch(goToMainScreen());
    }, [])

    //#endregion

    return (
        <View style={{flex: 1, zIndex: -1}}>
            <View style={[styles.topBarContainer, globalStyles.bottomShadow]}>
                <View style={styles.firstRowTopBarContainer}>
                    <View style={[styles.searchBoxContainer, globalStyles.shadow]}>
                        <View style={{height: '100%', width: 20, marginRight: 10, marginLeft: 5, justifyContent: 'center', alignSelf: 'center', flexDirection:'row'}}>
                            <Image style={{height: 18, width: '100%', alignSelf: 'center'}} resizeMode="contain" source={Icons['search']}/>
                        </View>
                        <TextInput style={styles.searchbox} 
                                    value={playerTableFilterState.playerSearchText}
                                    onChangeText={text => playerTableFilterDispatch({type: 'PlayerSearchTextChange', filterValue: text})}
                                    placeholder="Search" 
                                    placeholderTextColor={GlobalConstants.textPrimaryColor}/>
                    </View>
                    
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1.5, marginRight: 2.5}} onPress={closePlayerSearch}>
                        <Text style={{ alignSelf: 'center', color: GlobalConstants.textPrimaryColor }}>  Close</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.secondRowTopbarContainer}>
                    <View style={{ flex: 10, flexDirection:'row' }}>
                        <View style={{flex: 1, flexDirection: 'row', paddingBottom: 10, paddingTop: 10, paddingLeft: 5, paddingRight: 5}}>
                            <View style={{flex: 1, marginRight: 5}}>
                                <Dropdown defaultValue="All Teams" 
                                        headerText="Team"
                                        options={Array.from(overview.teams.map(team => team.name))} 
                                        value={playerTableFilterState.teamFilter} 
                                        setValue={teamFilterDispatch}/>
                            </View>
                            <View style={{flex: 1, marginLeft: 10, marginRight: 5}}>
                                <Dropdown defaultValue="All Positions" 
                                        headerText="Position"
                                        options={Array.from(overview.element_types.map(type => type.plural_name))} 
                                        value={playerTableFilterState.positionFilter} 
                                        setValue={positionFilterDispatch}/>
                            </View>
                            <View style={{flex: 1.5, marginLeft: 10, marginRight: 0 }}>
                                <Dropdown defaultValue="Total Points" 
                                        headerText={"Stat" + ((playerTableFilterState.isPer90 && GlobalConstants.Per90Stats.includes(playerTableFilterState.statFilter)) ? " (per 90)" : "")}
                                        options={Object.values(OverviewStats).sort()} 
                                        value={playerTableFilterState.statFilter} 
                                        setValue={statFilterDispatch}/>
                            </View>
                        </View>
                    </View>
                    <View style={{flex: 1.3, height: '65%', paddingRight: 2, alignSelf: 'center', marginBottom: 2.5}}>
                        <CustomButton image={'filter'} buttonFunction={() => setIsFilterModalVisible(true)}/>                            
                    </View>
                </View>
            </View>

            <View style={{ flex: 11, zIndex: -1 }}>
                <PlayerList overview={overview} fixtures={fixtures} filters={playerTableFilterState}/>
            </View>
            <ToolTip distanceFromRight={5} 
                     distanceForArrowFromRight={9}
                     distanceFromTop={109}
                     isVisible={isFilterModalVisible}
                     setIsVisible={setIsFilterModalVisible}
                     view={
                        <View style={{width: GlobalConstants.width* 0.60, marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 10 }}>
                            <View style={{flex: 1, flexDirection: 'row', padding: 5}}>
                                <Text style={styles.filterText}>Per 90 (if applicable):</Text>
                                <Checkbox value={ playerTableFilterState.isPer90 } 
                                        color={playerTableFilterState.isPer90 ? GlobalConstants.fieldColor : GlobalConstants.primaryColor}
                                        onValueChange={ () => playerTableFilterDispatch({type: 'ChangeIsPer90'})}/>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row', padding: 5}}>
                                <Text style={styles.filterText}>On Watchlist:</Text>
                                <Checkbox value={ playerTableFilterState.isInWatchlist } 
                                        color={playerTableFilterState.isInWatchlist ? GlobalConstants.fieldColor : GlobalConstants.primaryColor}
                                        onValueChange={ () => playerTableFilterDispatch({type: 'ChangeIsInWatchlist'})}/>
                            </View>
                            <View style={{flex: 2, padding: 5}}>
                                <Text style={styles.filterText}>Price Range:</Text>
                                <View style={{ flexDirection: 'row', paddingTop: 10}}>
                                    <Text style={[styles.filterText, {fontSize: GlobalConstants.mediumFont*0.9}]}>{playerTableFilterState.priceRange[0] / 10}</Text>
                                    <Text style={[styles.filterText, {textAlign: 'right', fontSize: GlobalConstants.mediumFont*0.9}]}>{playerTableFilterState.priceRange[1] / 10}</Text>
                                </View>
                                <Slider value={ playerTableFilterState.priceRange } 
                                        onValueChange={value => playerTableFilterDispatch({type: 'ChangePriceRange', range: value as number[]})}
                                        minimumValue={initialPriceRange[0]}
                                        maximumValue={initialPriceRange[1]}
                                        step={1}
                                        thumbTintColor={GlobalConstants.primaryColor}
                                        maximumTrackTintColor={'white'}
                                        minimumTrackTintColor={GlobalConstants.primaryColor}/>
                            </View>
                            <View style={{flex: 2, padding: 5}}>
                                <Text style={styles.filterText}>Minutes Per Game Range:</Text>
                                <View style={{ flexDirection: 'row', paddingTop: 10}}>
                                    <Text style={[styles.filterText, {fontSize: GlobalConstants.mediumFont*0.9}]}>{playerTableFilterState.minutesRange[0]}</Text>
                                    <Text style={[styles.filterText, {textAlign: 'right', fontSize: GlobalConstants.mediumFont*0.9}]}>{playerTableFilterState.minutesRange[1]}</Text>
                                </View>
                                <Slider value={ playerTableFilterState.minutesRange } 
                                        onValueChange={value => playerTableFilterDispatch({type: 'ChangeMinutesRange', range: value as number[]})}
                                        minimumValue={0}
                                        maximumValue={(90 * 38)}
                                        step={1}
                                        thumbTintColor={GlobalConstants.primaryColor}
                                        maximumTrackTintColor={'white'}
                                        minimumTrackTintColor={GlobalConstants.primaryColor}/>
                            </View>
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 10}}>
                                <Pressable style={[globalStyles.baseButton, globalStyles.shadow, {backgroundColor: GlobalConstants.primaryColor}]}
                                           onPress={() => playerTableFilterDispatch({type: 'Reset', range: initialPriceRange})}>
                                    <Text style={{color: GlobalConstants.textPrimaryColor, fontWeight: '500'}}>Clear Filters</Text>
                                </Pressable>
                            </View>
                            
                        </View>
                     }/>
        </View>

    )
});

const styles = StyleSheet.create({ 
    //#region player table
    topBarContainer: {
        width: '100%', 
        height: 110, 
        backgroundColor: GlobalConstants.primaryColor,
        paddingLeft: 5,
        paddingRight: 5,
    },

    firstRowTopBarContainer: {
        flex: 1, 
        paddingTop: 10,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
    },

    secondRowTopbarContainer: {
        flex: 1 , 
        flexDirection: 'row', 
        justifyContent: 'center', 
    },

    searchBoxContainer: {
        flex: 9,
        backgroundColor: GlobalConstants.secondaryColor,
        flexDirection: 'row',
        borderRadius: GlobalConstants.cornerRadius,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 11,
        marginLeft: 5,        
    },

    searchbox: {
        flex: 1,
        alignSelf: 'center',
        color: GlobalConstants.textPrimaryColor,
    },

    dropDownContainer: {
        flex: 1,
        marginRight: 0,
        marginLeft: 0,

    },

    filterText: {
        color: GlobalConstants.textPrimaryColor,
        fontSize: GlobalConstants.mediumFont,
        flex: 1,
        fontWeight: '500'
    },
    //#endregion
});

export default PlayerTable;
