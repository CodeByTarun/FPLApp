// Basic table that will show pts, goals, assists, playernames and positions
// will also have a search function to find players faster

import React, { useCallback, useEffect, useReducer, useState } from "react";
import { FlatList, View, Text, StyleSheet, Image, StatusBar, Platform } from "react-native";
import { FplOverview, PlayerOverview } from "../../Models/FplOverview";
import * as GlobalConstants from "../../Global/GlobalConstants";
import Dropdown from "../Controls/Dropdown";
import { OverviewStats } from "../../Global/EnumsAndDicts"
import { Icons } from "../../Global/Images";
import PlayerListItem from "./PlayerListItem";
import { FplFixture } from "../../Models/FplFixtures";
import globalStyles from "../../Global/GlobalStyles";
import ToolTip from "../Controls/ToolTip";
import Checkbox from "expo-checkbox";
import { Slider } from "@miblanchard/react-native-slider";
import { arrayExpression } from "@babel/traverse/node_modules/@babel/types";
import { PlayerData } from "../../Models/CombinedData";

interface PlayerTableFilterState {
    isPer90: boolean,
    isInWatchlist: boolean,
    priceRange: number[],
}

type PlayerTableFilterAction = {
    type: "ChangeIsPer90" | "ChangeIsInWatchlist";
} | {
    type: "ChangePriceRange",
    priceRange: number[],
} | {
    type: "Reset"
    priceRange: number[],
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
                priceRange: action.priceRange,
            }
        }
       case 'Reset': {
            return {
                isPer90: false,
                isInWatchlist: false,
                priceRange: action.priceRange,
            }
       }
    }
}

interface PlayerTableProps {
    overview: FplOverview;
    fixtures: FplFixture[];
    playerSearchText: string;
}

const PlayerTable = React.memo(({overview, fixtures, playerSearchText}: PlayerTableProps) => {

    const [playerList, setPlayerList] = useState([] as PlayerOverview[]);
    const [teamFilter, setTeamFilter] = useState('All Teams');
    const [positionFilter, setPositionFilter] = useState('All Positions');
    const [statFilter, setStatFilter] = useState('Total Points');
    
    const initialPriceRange = [
        Math.min(...(overview.elements.map(element => element.now_cost))),
        Math.max(...(overview.elements.map(element => element.now_cost))),
    ];

    console.log('hi')

    const [playerTableFilterState, playerTableFilterDispatch] = useReducer(playerTableFilterReducer, { isPer90: false, isInWatchlist: false, priceRange: initialPriceRange });

    useEffect(function FilterPlayerList() {        
        setPlayerList(
            overview.elements.filter(filterPlayers)
                             .sort(sortPlayers)
        );
    }, [playerSearchText, teamFilter, positionFilter, statFilter, playerTableFilterState])

    const filterPlayers = useCallback((player: PlayerOverview) => {
            return (
                player.web_name.startsWith(playerSearchText) && 
                (teamFilter === 'All Teams' || player.team_code === overview.teams.find(team => team.name === teamFilter)?.code) &&
                (positionFilter === 'All Positions' || player.element_type === overview.element_types.find(element => element.plural_name === positionFilter)?.id) &&
                (player.now_cost >= playerTableFilterState.priceRange[0] && player.now_cost <= playerTableFilterState.priceRange[1])
            );
    }, [teamFilter, positionFilter, statFilter, playerTableFilterState, playerSearchText])

    const sortPlayers = useCallback((playerA: PlayerOverview, playerB: PlayerOverview) => {

        let stat = Object.keys(OverviewStats).find(key => OverviewStats[key] === statFilter) as keyof PlayerOverview;

        return (playerB[stat] as number) - (playerA[stat] as number);

    }, [statFilter]);

    const renderPlayerItem = useCallback((({item}: {item: PlayerOverview}) => {
        return(
            <PlayerListItem overview={overview} fixtures={fixtures} player={item} statFilter={statFilter}/>
        )}), [statFilter]);

    const keyExtractor = useCallback((item: PlayerOverview) => item.id.toString(), []);

    return (
        <View style={{ flex: 1, overflow: "hidden" }}>
            <View style={[globalStyles.bottomShadow, { flex: 1 , flexDirection: 'row', zIndex: 1, backgroundColor: GlobalConstants.primaryColor }]}>
                <View style={{ flex: 9, paddingBottom: 10, paddingTop: 5, flexDirection:'row' }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Dropdown defaultValue="All Teams" 
                                options={Array.from(overview.teams.map(team => team.name))} 
                                value={teamFilter} 
                                setValue={setTeamFilter}/>
                        <Dropdown defaultValue="All Positions" 
                                options={Array.from(overview.element_types.map(type => type.plural_name))} 
                                value={positionFilter} 
                                setValue={setPositionFilter}/>
                        <Dropdown defaultValue="Total Points" 
                                options={Object.values(OverviewStats).sort()} 
                                value={statFilter} 
                                setValue={setStatFilter}/>
                    </View>
                    
                </View>
                <View style={{flex: 1.5, height: '55%', alignSelf: 'center', marginBottom: 2}}>
                        <ToolTip distanceFromRight={-5} distanceForArrowFromRight={8} distanceFromTop={(GlobalConstants.height + 95 + (Platform.OS === 'android' ? StatusBar.currentHeight! + 10 : 0)) * -1}
                                 view={
                                    <View style={{width: GlobalConstants.width* 0.55, marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 10}}>
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
                                                    onValueChange={value => playerTableFilterDispatch({type: 'ChangePriceRange', priceRange: value as number[]})}
                                                    minimumValue={initialPriceRange[0]}
                                                    maximumValue={initialPriceRange[1]}
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
            </View>
            <View style={{ flex: 11 }}>
                <FlatList
                    data={playerList}
                    renderItem={renderPlayerItem}
                    keyExtractor={keyExtractor}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={10}/>
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
    }

    //#endregion
});

export default PlayerTable;
