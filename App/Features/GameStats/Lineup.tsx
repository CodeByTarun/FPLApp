// Shows the lineup for the team chosen at that moment
// this could either be a draft league team, normal fpl team, or teams that are playing that gameweek,
// or in previous gameweeks
// The input for this component is a list of player IDs

import React, { useEffect } from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { useGetGameweekDataQuery, useGetOverviewQuery } from "../../Store/fplSlice";
import { useAppSelector } from "../../Store/hooks";
import PlayerStatsDisplay from "./PlayerStatsDisplay";
import { GetPlayerGameweekDataSortedByPosition } from "../../Helpers/FplAPIHelpers";
import { PlayerData } from "../../Models/CombinedData";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { FplGameweek } from "../../Models/FplGameweek";
import { FplOverview } from "../../Models/FplOverview";
import { FixtureInfo } from "../../Store/fixtureSlice";


const CreatePlayerStatsView = (gameweek: FplGameweek, overview: FplOverview, fixtureInfo: FixtureInfo) => {

    const players = GetPlayerGameweekDataSortedByPosition(gameweek, overview, fixtureInfo);
    const playerStatsView = [];

    if (players !== null) {
        let i = 0;
        let elementtype = 1;
        let remainder = 0;
        const numberOfPlayersAllowedInARow = 6;

        while (i < players.length) {

            let positionCount = players.filter(player => player.overviewData.element_type == elementtype).length;
            
            if (positionCount + remainder > numberOfPlayersAllowedInARow) {
                remainder = remainder + positionCount - numberOfPlayersAllowedInARow;
                positionCount = numberOfPlayersAllowedInARow;
            } else {
                positionCount = positionCount + remainder;
                remainder = 0;
            }

            playerStatsView.push(
                <View style={styles.playerRowContainer}>
                    { players.slice(i, i + positionCount).map(player => { return <PlayerStatsDisplay key={player.overviewData.id} player={player}/> })}
                </View>
            )

            i += positionCount;
            elementtype += 1;
        }
    }

    return playerStatsView;
}

const Lineup = () => {

    const fixtureInfo = useAppSelector((state) => state.fixture);
    const overview = useGetOverviewQuery();
    const gameweek = useGetGameweekDataQuery((fixtureInfo.fixture !== null && fixtureInfo.fixture.event !== null) ? fixtureInfo.fixture.event : skipToken);
    
    return (
        <View style={styles.container}>
            <Image style={styles.field} source={require('../../../assets/threequartersfield.jpg')}/>
            {(fixtureInfo.fixture !== null && gameweek.data !== undefined && overview.data !== undefined) && 

            <View style={styles.playerContainer}>
                {CreatePlayerStatsView(gameweek.data, overview.data, fixtureInfo)}
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