// Shows the lineup for the team chosen at that moment
// this could either be a draft league team, normal fpl team, or teams that are playing that gameweek,
// or in previous gameweeks
// The input for this component is a list of player IDs

import React, { useEffect } from "react";
import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useGetGameweekDataQuery, useGetOverviewQuery } from "../../Store/fplSlice";
import { useAppSelector } from "../../Store/hooks";
import PlayerStatsDisplay from "./PlayerStatsDisplay";
import { GetPlayerGameweekDataSortedByPosition } from "../../Helpers/FplAPIHelpers";
import { PlayerData } from "../../Models/CombinedData";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { FplGameweek } from "../../Models/FplGameweek";
import { FplOverview } from "../../Models/FplOverview";
import { TeamInfo, TeamTypes } from "../../Store/teamSlice";
import { width } from "../../Global/GlobalConstants";
import * as GlobalConstants from "../../Global/GlobalConstants";


const CreatePlayerStatsView = (gameweek: FplGameweek, overview: FplOverview, teamInfo: TeamInfo) => {

    const players = GetPlayerGameweekDataSortedByPosition(gameweek, overview, teamInfo);
    const playerStatsView = [];

    if (players !== null) {
        let i = 0;
        let elementType = 1;
        let remainder = 0;
        const numberOfPlayersAllowedInARow = 6;

        while (i < players.length) {

            let positionCount = players.filter(player => player.overviewData.element_type == elementType).length;
            
            if (positionCount + remainder > numberOfPlayersAllowedInARow) {
                remainder = remainder + positionCount - numberOfPlayersAllowedInARow;
                positionCount = numberOfPlayersAllowedInARow;
            } else {
                positionCount = positionCount + remainder;
                remainder = 0;
            }

            playerStatsView.push(
                <View style={styles.playerRowContainer} key={elementType}>
                    { players.slice(i, i + positionCount).map(player => { return <PlayerStatsDisplay key={player.overviewData.id} player={player} overview={overview}/> })}
                </View>
            )

            i += positionCount;
            elementType += 1;
        }
    }

    return playerStatsView;
}

const Lineup = () => {

    const teamInfo = useAppSelector((state) => state.team);
    const overview = useGetOverviewQuery();
    const gameweek = useGetGameweekDataQuery((teamInfo.teamType !== TeamTypes.Empty) ? teamInfo.gameweek : skipToken);
    
    return (
        <View style={styles.container}>
            <Image style={styles.field} source={require('../../../assets/threequartersfield.jpg')}/>
            {(teamInfo.teamType !== TeamTypes.Empty && gameweek.data && overview.data) && 

            <View style={styles.playerContainer}>
                {CreatePlayerStatsView(gameweek.data, overview.data, teamInfo)}
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
            padding: 5,
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