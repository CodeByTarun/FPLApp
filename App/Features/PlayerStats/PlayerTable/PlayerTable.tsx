// Basic table that will show pts, goals, assists, playernames and positions
// will also have a search function to find players faster

import React, { useCallback, useReducer, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Pressable } from "react-native";
import { FplOverview } from "../../../Models/FplOverview";
import * as GlobalConstants from "../../../Global/GlobalConstants";
import { OverviewStats } from "../../../Global/EnumsAndDicts"
import { FplFixture } from "../../../Models/FplFixtures";
import Checkbox from "expo-checkbox";
import { Slider } from "@miblanchard/react-native-slider";
import PlayerList from "../PlayerList/PlayerList";
import { useAppDispatch } from "../../../Store/hooks";
import { goToMainScreen } from "../../../Store/navigationSlice";
import { Icons } from "../../../Global/Images";
import globalStyles from "../../../Global/GlobalStyles";
import { PlayerTableFilterState, playerTableFilterReducer } from "./PlayerTableFilterReducer";
import { styles } from "./PlayerTableStyles";
import { Dropdown, ToolTip, CustomButton, SearchControl, FilterButton } from "../../Controls";

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

    return (
        <View style={{flex: 1}}>
            <View style={[styles.topBarContainer, globalStyles.bottomShadow]}>
                <View style={styles.firstRowTopBarContainer}>
                    <SearchControl placeHolderText="Search" value={playerTableFilterState.playerSearchText} onChangeTextFunction={text => playerTableFilterDispatch({type: 'PlayerSearchTextChange', filterValue: text})}/>
                    
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
                        <FilterButton isArrowAbove={true}
                                      view={
                                      <View style={{width: GlobalConstants.width* 0.60, marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 10 }}>
                                        <View style={{flex: 1, flexDirection: 'row', padding: 5}}>
                                            <Text style={styles.filterText}>Per 90 (if applicable):</Text>
                                            <Checkbox value={ playerTableFilterState.isPer90 } 
                                                    color={playerTableFilterState.isPer90 ? GlobalConstants.fieldColor : GlobalConstants.lightColor}
                                                    onValueChange={ () => playerTableFilterDispatch({type: 'ChangeIsPer90'})}/>
                                        </View>
                                        <View style={{flex: 1, flexDirection: 'row', padding: 5}}>
                                            <Text style={styles.filterText}>On Watchlist:</Text>
                                            <Checkbox value={ playerTableFilterState.isInWatchlist } 
                                                    color={playerTableFilterState.isInWatchlist ? GlobalConstants.fieldColor : GlobalConstants.lightColor}
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
                                                    thumbTintColor={GlobalConstants.lightColor}
                                                    maximumTrackTintColor={GlobalConstants.secondaryColor}
                                                    minimumTrackTintColor={GlobalConstants.lightColor}/>
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
                                                    thumbTintColor={GlobalConstants.lightColor}
                                                    maximumTrackTintColor={GlobalConstants.secondaryColor}
                                                    minimumTrackTintColor={GlobalConstants.lightColor}/>
                                        </View>
                                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 10}}>
                                            <Pressable style={[globalStyles.baseButton]}
                                                        onPress={() => playerTableFilterDispatch({type: 'Reset', range: initialPriceRange})}>
                                                <Text style={{color: GlobalConstants.textPrimaryColor, fontWeight: '500'}}>Clear Filters</Text>
                                            </Pressable>
                                        </View>
                                      </View>
                                      }/>                            
                    </View>
                </View>
            </View>

            <View style={{ flex: 11, zIndex: 0}}>
                <PlayerList overview={overview} fixtures={fixtures} filters={playerTableFilterState}/>
            </View>
        </View>

    )
});

export default PlayerTable;
