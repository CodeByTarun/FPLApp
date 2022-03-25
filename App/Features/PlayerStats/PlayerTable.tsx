// Basic table that will show pts, goals, assists, playernames and positions
// will also have a search function to find players faster

import React, { useCallback, useReducer } from "react";
import { View, Text, StyleSheet, Image, StatusBar, Platform, TextInput, TouchableOpacity } from "react-native";
import { FplOverview } from "../../Models/FplOverview";
import * as GlobalConstants from "../../Global/GlobalConstants";
import Dropdown from "../Controls/Dropdown";
import { OverviewStats } from "../../Global/EnumsAndDicts"
import { Icons } from "../../Global/Images";
import { FplFixture } from "../../Models/FplFixtures";
import globalStyles from "../../Global/GlobalStyles";
import ToolTip from "../Controls/ToolTip";
import Checkbox from "expo-checkbox";
import { Slider } from "@miblanchard/react-native-slider";
import PlayerList from "./PlayerList";
import CustomButton from "../Controls/CustomButton";
import { useAppDispatch } from "../../Store/hooks";
import { goToMainScreen } from "../../Store/navigationSlice";
import { StatusBarHeight } from "../../Global/StatusBarHeight";

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

    const dispatch = useAppDispatch();

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
        playerTableFilterDispatch({type: 'Reset', range: initialPriceRange})
    }, [])

    return (
        <View style={{flex: 1}}>
            <View style={[{ flex: 2, backgroundColor: GlobalConstants.primaryColor }]}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 9}}>
                        <View style={styles.searchBoxContainer}>
                            <TextInput style={styles.searchbox} 
                                    value={playerTableFilterState.playerSearchText}
                                    onChangeText={text => playerTableFilterDispatch({type: 'PlayerSearchTextChange', filterValue: text})}
                                    placeholder="Search player..." 
                                    placeholderTextColor={'white'}/>
                        </View>
                    </View>
                    
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', flex: 1.5, marginRight: 2.5}} onPress={closePlayerSearch}>
                        <Text style={{ alignSelf: 'center', color: GlobalConstants.textPrimaryColor }}>Cancel</Text>
                    </TouchableOpacity>
                    
                </View>
                
                <View style={{ flex: 1 , flexDirection: 'row' }}>
                    <View style={{ flex: 10, paddingBottom: 10, paddingTop: 5, flexDirection:'row' }}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <Dropdown defaultValue="All Teams" 
                                    options={Array.from(overview.teams.map(team => team.name))} 
                                    value={playerTableFilterState.teamFilter} 
                                    setValue={teamFilterDispatch}/>
                            <Dropdown defaultValue="All Positions" 
                                    options={Array.from(overview.element_types.map(type => type.plural_name))} 
                                    value={playerTableFilterState.positionFilter} 
                                    setValue={positionFilterDispatch}/>
                            <Dropdown defaultValue="Total Points" 
                                    options={Object.values(OverviewStats).sort()} 
                                    value={playerTableFilterState.statFilter} 
                                    setValue={statFilterDispatch}/>
                        </View>
                        
                    </View>
                    <View style={{flex: 1.2, height: '55%', alignSelf: 'center', marginBottom: 2}}>
                            <ToolTip distanceFromRight={20} distanceForArrowFromRight={GlobalConstants.width * 0.75/12.4} distanceFromTop={StatusBarHeight - 10}
                                    view={
                                        <View style={{width: GlobalConstants.width* 0.60, marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 10}}>
                                            <View style={{flex: 1, flexDirection: 'row', padding: 5}}>
                                                <Text style={styles.filterText}>Per 90 (if applicable):</Text>
                                                <Checkbox value={ playerTableFilterState.isPer90 } 
                                                        color={true ? GlobalConstants.fieldColor : GlobalConstants.primaryColor}
                                                        onValueChange={ () => playerTableFilterDispatch({type: 'ChangeIsPer90'})}/>
                                            </View>
                                            <View style={{flex: 1, flexDirection: 'row', padding: 5}}>
                                                <Text style={styles.filterText}>On Watchlist:</Text>
                                                <Checkbox value={ playerTableFilterState.isInWatchlist } 
                                                        color={true ? GlobalConstants.fieldColor : GlobalConstants.primaryColor}
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
                                        </View>
                                    }>
                                <View style={{flex: 1}}>
                                    <Image style={{height: '100%', aspectRatio: 1, alignSelf:'center'}} source={Icons['filter']} resizeMode='contain'/>
                                </View>
                            </ToolTip>
                    </View>
                    <View style={{flex: 1.2, height: '55%', alignSelf: 'center', marginBottom: 2}}>
                        <CustomButton image={"close"} buttonFunction={() => playerTableFilterDispatch({type: 'Reset', range: initialPriceRange})}/>
                    </View>
                </View>
            </View>

            <View style={{ flex: 11 }}>
                <PlayerList overview={overview} fixtures={fixtures} filters={playerTableFilterState}/>
            </View>
            
        </View>

    )
});

const styles = StyleSheet.create({ 
    //#region player table
    filterText: {
        color: GlobalConstants.textPrimaryColor,
        fontSize: GlobalConstants.mediumFont,
        flex: 1,
        fontWeight: '500'
    },

    searchBoxContainer: {
        backgroundColor: GlobalConstants.secondaryColor,
        flexDirection: 'row',
        borderRadius: GlobalConstants.cornerRadius,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginLeft: 5,
        marginRight: 2.5,
        
    },

    searchbox: {
        flex: 1,
        alignSelf: 'center',
        color: 'white'
    },
    //#endregion
});

export default PlayerTable;
