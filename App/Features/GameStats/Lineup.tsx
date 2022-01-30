// Shows the lineup for the team chosen at that moment
// this could either be a draft league team, normal fpl team, or teams that are playing that gameweek,
// or in previous gameweeks
// The input for this component is a list of player IDs

import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { useGetBudgetGameweekPicksQuery, useGetDraftGameweekPicksQuery, useGetGameweekDataQuery, useGetOverviewQuery } from "../../Store/fplSlice";
import { useAppSelector } from "../../Store/hooks";
import PlayerStatsDisplay from "./PlayerStatsDisplay";
import { GetPlayerGameweekDataSortedByPosition } from "../../Helpers/FplAPIHelpers";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { FplGameweek } from "../../Models/FplGameweek";
import { FplOverview } from "../../Models/FplOverview";
import { TeamInfo, TeamTypes } from "../../Store/teamSlice";
import { FplDraftGameweekPicks } from "../../Models/FplDraftGameekPicks";
import { FplManagerGameweekPicks } from "../../Models/FplManagerGameweekPicks";


const CreatePlayerStatsView = (gameweek: FplGameweek, overview: FplOverview, teamInfo: TeamInfo, 
                               draftPicks?: FplDraftGameweekPicks, budgetPicks?: FplManagerGameweekPicks) => {

    const players = GetPlayerGameweekDataSortedByPosition(gameweek, overview, teamInfo, draftPicks, budgetPicks);
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
    const draftGameweek = useGetDraftGameweekPicksQuery((teamInfo.teamType === TeamTypes.Draft) ? { entryId: teamInfo.info.id, gameweek: teamInfo.gameweek } : skipToken);
    const budgetGameweek = useGetBudgetGameweekPicksQuery((teamInfo.teamType === TeamTypes.Budget) ? { entryId: teamInfo.info.id, gameweek: teamInfo.gameweek } : skipToken);
    
    return (
        <View style={styles.container}>
            <Image style={styles.field} source={require('../../../assets/threequartersfield.jpg')}/>
            {(teamInfo.teamType !== TeamTypes.Empty && gameweek.data && overview.data) &&
                <>
                {(teamInfo.teamType === TeamTypes.Fixture || teamInfo.teamType === TeamTypes.Dream) ? 
                    <View style={styles.playerContainer}>
                        {CreatePlayerStatsView(gameweek.data, overview.data, teamInfo)}
                    </View>
                :
                ((teamInfo.teamType === TeamTypes.Budget && budgetGameweek.data) || (teamInfo.teamType === TeamTypes.Draft && draftGameweek.data)) ?
                    <View style={styles.playerContainer}>
                        {CreatePlayerStatsView(gameweek.data, overview.data, teamInfo, draftGameweek.data, budgetGameweek.data)}
                    </View>
                    :
                    null
                }
                </>
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