// Basic table that will show pts, goals, assists, playernames and positions
// will also have a search function to find players faster

import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet, Image } from "react-native";
import { FplOverview, PlayerOverview } from "../../Models/FplOverview";
import * as GlobalConstants from "../../Global/GlobalConstants";
import Dropdown from "../Controls/Dropdown";
import { OverviewStats } from "../../Global/EnumsAndDicts"
import { Jerseys } from "../../Global/Images";

interface PlayerTableProps {
    overview: FplOverview;
    playerSearchText: string;
}

const PlayerTable = (props: PlayerTableProps) => {

    const [playerList, setPlayerList] = useState([] as PlayerOverview[]);
    const [teamFilter, setTeamFilter] = useState('Team');
    const [positionFilter, setPositionFilter] = useState('Position');
    const [statFilter, setStatFilter] = useState('Total Points');

    useEffect(function FilterPlayerList() {

        let stat = Object.keys(OverviewStats).find(key => OverviewStats[key] === statFilter) as keyof PlayerOverview;
        
        setPlayerList(
            props.overview.elements.slice().filter(player => player.web_name.includes(props.playerSearchText) && 
                                                             (teamFilter === 'Team' || player.team_code === props.overview.teams.find(team => team.name === teamFilter)?.code) &&
                                                             (positionFilter === 'Position' || player.element_type === props.overview.element_types.find(element => element.plural_name === positionFilter)?.id))
                                           .sort((playerA, playerB) => (playerB[stat] as number) - (playerA[stat] as number))
        );
    }, [props.playerSearchText, teamFilter, positionFilter, statFilter])

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 , flexDirection: 'row', zIndex: 1 }}>
                <View style={{ flex: 1, paddingBottom: 10, paddingTop: 5, flexDirection:'row' }}>
                    <Dropdown defaultValue="Team" 
                              options={Array.from(props.overview.teams.map(team => team.name))} 
                              value={teamFilter} 
                              setValue={setTeamFilter}/>
                    <Dropdown defaultValue="Position" 
                              options={Array.from(props.overview.element_types.map(type => type.plural_name))} 
                              value={positionFilter} 
                              setValue={setPositionFilter}/>
                    <Dropdown defaultValue="Total Points" 
                              options={Object.values(OverviewStats).sort()} 
                              value={statFilter} 
                              setValue={setStatFilter}/>
                </View>
            </View>
            <View style={{ flex: 11 }}>
                <FlatList
                    data={playerList}
                    renderItem={ ({item}) =>
                        <View key={item.id} style={styles.tableView}>
                            <View style={{flex: 2, flexDirection: 'row', height: GlobalConstants.height* 0.05}}>
                                <View style={{ flex: 1 }}>
                                    <Image style={styles.jersey} source={Jerseys[item.team_code]} resizeMode="contain"/>
                                </View>
                                
                                <View style={{flex: 3}}> 
                                    <Text style={styles.tableText}>{item.web_name}</Text>
                                    <View style={{flexDirection: 'row', marginTop: 2}}>
                                        <Text style={[styles.tableText, {fontWeight: 'bold'}]}>{props.overview.teams.find(team => team.code === item.team_code)?.short_name}  </Text>
                                        <Text style={styles.tableText}>{props.overview.element_types.find(element => element.id === item.element_type)?.singular_name_short}</Text>
                                    </View>
                                </View>
                            </View>
                                
                            <View style={styles.tableNumberView}>
                                <Text style={styles.tableText}>
                                    {  (statFilter !== 'Cost') ? 
                                        
                                        item[Object.keys(OverviewStats).find(key => OverviewStats[key] === statFilter) as keyof PlayerOverview] :

                                        (item[Object.keys(OverviewStats).find(key => OverviewStats[key] === statFilter) as keyof PlayerOverview] as number / 10).toFixed(1)
                                    }
                                </Text>
                            </View>
                        </View>
                    }
                    keyExtractor={item => item.id.toString()}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={50}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({ 
    //#region player table

    tableView: {
        flex: 1,
        backgroundColor: GlobalConstants.secondaryColor,
        margin: 5,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
    },

    tableNumberView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    tableText: {
        color: GlobalConstants.textPrimaryColor,
    },

    jersey: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
    },

    //#endregion
})

export default PlayerTable;

//let players = playerList.filter(player => player.web_name.includes(playerSearchText)).sort((playerA, playerB) => playerB.total_points - playerA.total_points);