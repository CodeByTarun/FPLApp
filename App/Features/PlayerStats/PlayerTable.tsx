// Basic table that will show pts, goals, assists, playernames and positions
// will also have a search function to find players faster

import React, { useEffect, useState } from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { FplOverview, PlayerOverview } from "../../Models/FplOverview";
import * as GlobalConstants from "../../Global/GlobalConstants";
import Dropdown from "../Controls/Dropdown";

const renderPlayerItem = ({item} : {item: PlayerOverview}) => {
    return (
        <View key={item.id} style={styles.tableView}>
            <View style={{flex: 2}}>
                <Text style={styles.tableText}>{item.web_name}</Text>
            </View>
            <View style={styles.tableNumberView}>
                <Text style={styles.tableText}>{item.team}</Text>
            </View >
                
            <View style={styles.tableNumberView}>
                <Text style={styles.tableText}>{item.element_type}</Text>
            </View>
                
            <View style={styles.tableNumberView}>
                <Text style={styles.tableText}>{item.total_points}</Text>
            </View>
        </View> )
}

interface PlayerTableProps {
    overview: FplOverview;
    playerSearchText: string;
}

const PlayerTable = (props: PlayerTableProps) => {

    const [playerList, setPlayerList] = useState([] as PlayerOverview[]);

    useEffect(function FilterPlayerList() {
        setPlayerList(
            props.overview.elements.slice().filter(player => player.web_name.includes(props.playerSearchText)).sort((playerA, playerB) => playerB.total_points - playerA.total_points)
        );
    }, [props.playerSearchText])

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 , flexDirection: 'row', zIndex: 1 }}>
                <View style={{ flex: 1, paddingBottom: 10, paddingTop: 5, flexDirection:'row' }}>
                    <Dropdown placeholderText="Team"/>
                    <Dropdown placeholderText="Position"/>
                    <Dropdown placeholderText="Stat"/>
                </View>
            </View>
            <View style={{ flex: 11 }}>
                <FlatList
                    data={playerList}
                    renderItem={renderPlayerItem}
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
        flexDirection: 'row',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
        paddingBottom: 5,
    },

    tableNumberView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    tableText: {
        color: GlobalConstants.textPrimaryColor,
    },

    //#endregion
})

export default PlayerTable;

//let players = playerList.filter(player => player.web_name.includes(playerSearchText)).sort((playerA, playerB) => playerB.total_points - playerA.total_points);