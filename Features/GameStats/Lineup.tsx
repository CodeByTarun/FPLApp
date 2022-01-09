// Shows the lineup for the team chosen at that moment
// this could either be a draft league team, normal fpl team, or teams that are playing that gameweek,
// or in previous gameweeks
// The input for this component is a list of player IDs

import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useGetGameekDataQuery } from "../../App/fplSlice";
import { useAppSelector } from "../../App/hooks";
import { FplGameweek, Player } from "../../Models/FplGameweek";
import PlayerGamePointsImage from "./PlayerGamePointsImage";

const Lineup = () => {

    const fixtureInfo = useAppSelector((state) => state.fixture);
    var gameweekData;

    if (fixtureInfo.fixture !== null && fixtureInfo.fixture.event !== null) {
        gameweekData = useGetGameekDataQuery(fixtureInfo.fixture.event);
    }

    // Need to create a function that takes the list of players and based on position and number of players puts them in the right rows

    return (
        <View style={styles.container}>
            <Image style={styles.field} source={require('../../assets/threequartersfield.jpg')}/>

            {(fixtureInfo.fixture !== null) && 
            <View style={styles.playerContainer}>
                <View style={styles.playerRowContainer}>
                    <PlayerGamePointsImage/>
                </View>
                <View style={styles.playerRowContainer}>
                    <PlayerGamePointsImage/>
                    <PlayerGamePointsImage/>
                    <PlayerGamePointsImage/>
                    <PlayerGamePointsImage/>
                    <PlayerGamePointsImage/>
                </View>
                <View style={styles.playerRowContainer}>
                    <PlayerGamePointsImage/>
                    <PlayerGamePointsImage/>
                    <PlayerGamePointsImage/>
                </View>
                <View style={styles.playerRowContainer}>
                    <PlayerGamePointsImage/>
                    <PlayerGamePointsImage/>
                </View>
            </View>
            }

        </View>
    )
}

const styles = StyleSheet.create(
    {   
        container: {
            flex: 1,
        },

        field: {
            width: '100%',
            height: '107.5%',
            alignSelf: 'center',
            position: "absolute"
        },

        playerContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-evenly',
        },

        playerRowContainer: {
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-evenly'
        }
    }
);

export default Lineup;