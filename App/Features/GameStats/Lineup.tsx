// Shows the lineup for the team chosen at that moment
// this could either be a draft league team, normal fpl team, or teams that are playing that gameweek,
// or in previous gameweeks
// The input for this component is a list of player IDs

import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useGetGameekDataQuery, useGetOverviewQuery } from "../../Store/fplSlice";
import { useAppSelector } from "../../Store/hooks";
import PlayerStatsDisplay from "./PlayerStatsDisplay";
import { GetPlayerGameweekDataSortedByPosition } from "../../Helpers/FplAPIHelpers";

const Lineup = () => {

    const fixtureInfo = useAppSelector((state) => state.fixture);
    const overviewData = useGetOverviewQuery();
    var gameweekData;
    var players;

    if (fixtureInfo.fixture !== null && fixtureInfo.fixture.event !== null) {
        gameweekData = useGetGameekDataQuery(fixtureInfo.fixture.event);

        // TODO: This if statement should probably be inside the component function and only run when that gameweek data is loaded.
        if (gameweekData.data !== undefined && overviewData.data!= undefined) {
            players = GetPlayerGameweekDataSortedByPosition(gameweekData.data, overviewData.data, fixtureInfo);
        }
    }

    // TODO: Then create a for loop to run through the players capping the limit at 6 players per row, 19 total is more than the number of players that can play in a game for one team anyways
    
    return (
        <View style={styles.container}>
            <Image style={styles.field} source={require('../../assets/threequartersfield.jpg')}/>

            {(fixtureInfo.fixture !== null) && 
            <View style={styles.playerContainer}>
                <View style={styles.playerRowContainer}>
                    <PlayerStatsDisplay/>
                </View>
                <View style={styles.playerRowContainer}>
                    <PlayerStatsDisplay/>
                    <PlayerStatsDisplay/>
                    <PlayerStatsDisplay/>
                    <PlayerStatsDisplay/>
                    <PlayerStatsDisplay/>
                </View>
                <View style={styles.playerRowContainer}>
                    <PlayerStatsDisplay/>
                    <PlayerStatsDisplay/>
                    <PlayerStatsDisplay/>
                </View>
                <View style={styles.playerRowContainer}>
                    <PlayerStatsDisplay/>
                    <PlayerStatsDisplay/>
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