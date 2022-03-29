// Shows the lineup for the team chosen at that moment
// this could either be a draft league team, normal fpl team, or teams that are playing that gameweek,
// or in previous gameweeks
// The input for this component is a list of player IDs

import React from "react";
import { Image, StyleSheet, View, Text, ScrollView } from "react-native";
import { useGetBudgetGameweekPicksQuery, useGetDraftGameweekPicksQuery, useGetDraftOverviewQuery, useGetFixturesQuery, useGetGameweekDataQuery, useGetOverviewQuery } from "../../Store/fplSlice";
import { useAppSelector } from "../../Store/hooks";
import PlayerStatsDisplay from "./PlayerStatsDisplay";
import { GetPlayerGameweekDataSortedByPosition } from "../../Helpers/FplAPIHelpers";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { FplGameweek } from "../../Models/FplGameweek";
import { FplOverview } from "../../Models/FplOverview";
import { BudgetInfo, DraftInfo, FixtureInfo, TeamInfo, TeamTypes } from "../../Store/teamSlice";
import { FplDraftGameweekPicks } from "../../Models/FplDraftGameekPicks";
import { FplManagerGameweekPicks } from "../../Models/FplManagerGameweekPicks";
import { FplDraftOverview } from "../../Models/FplDraftOverview";
import * as GlobalConstants from "../../Global/GlobalConstants";
import { Jerseys } from "../../Global/Images";
import { FplFixture } from "../../Models/FplFixtures";
import ManagerInfoCard from "./ManagerInfoCard";


function CreatePlayerStatsView(gameweek: FplGameweek, overview: FplOverview, fixtures: FplFixture[], teamInfo: TeamInfo, draftOverview?: FplDraftOverview, 
                               draftPicks?: FplDraftGameweekPicks, budgetPicks?: FplManagerGameweekPicks) {

    const players = GetPlayerGameweekDataSortedByPosition(gameweek, overview, teamInfo, draftOverview, draftPicks, budgetPicks);
    const playerStatsView = [];

    if (players !== null) {
        let i = 0;
        let elementType = 1;
        let remainder = 0;
        const numberOfPlayersAllowedInARow = 6;
        let lineupPlayers = players;

        if (teamInfo.teamType === TeamTypes.Budget || teamInfo.teamType === TeamTypes.Draft) {
            lineupPlayers = players.slice(0, 11);
        }

        while (i < lineupPlayers.length) {

            let positionCount = lineupPlayers.filter(player => player.overviewData.element_type == elementType).length;
            
            if (positionCount + remainder > numberOfPlayersAllowedInARow) {
                remainder = remainder + positionCount - numberOfPlayersAllowedInARow;
                positionCount = numberOfPlayersAllowedInARow;
            } else {
                positionCount = positionCount + remainder;
                remainder = 0;
            }

            playerStatsView.push(
                <View style={styles.playerRowContainer} key={elementType}>
                    { lineupPlayers.slice(i, i + positionCount).map(player => { return <PlayerStatsDisplay key={player.overviewData.id} player={player} overview={overview} fixtures={fixtures} teamInfo={teamInfo}/> })}
                </View>
            )

            i += positionCount;
            elementType += 1;
        }
    }

    return playerStatsView;
}

function CreateBenchView(gameweek: FplGameweek, overview: FplOverview, fixtures: FplFixture[], teamInfo: DraftInfo | BudgetInfo, draftOverview?: FplDraftOverview, 
                         draftPicks?: FplDraftGameweekPicks, budgetPicks?: FplManagerGameweekPicks) {
    
    const players = GetPlayerGameweekDataSortedByPosition(gameweek, overview, teamInfo, draftOverview, draftPicks, budgetPicks);
    const playerStatsView = [];
    
    if (players) {
        playerStatsView.push(
            <View style={styles.playerRowContainer} key={5}>
                { players.slice(11, 15).map(player => { return <PlayerStatsDisplay key={player.overviewData.id} player={player} overview={overview} fixtures={fixtures} teamInfo={teamInfo}/> })}
            </View>
        )
    }

    return playerStatsView;
}

function CreateBonusPointView(teamInfo: FixtureInfo, overviewData: FplOverview, fixturesData: FplFixture[]) {
    
    let bonusPoints = fixturesData.find(fixture => fixture.id === teamInfo.fixture?.id)?.stats.find(stat => stat.identifier === 'bps');

    if (bonusPoints) {

        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>

            <View style={{width: '60%', justifyContent: 'center', alignItems: 'center', backgroundColor: GlobalConstants.primaryColor, marginTop: 5}}>
                <Text style={styles.bottomViewTitle}>Bonus Point Leaders</Text>
            </View>
            
            
            <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={[styles.bonusPointsView, {borderRightWidth: 0.5,}]}>
                {
                    bonusPoints.h.slice().sort((a, b) => b.value - a.value).slice(0,5).map( player => 
                        <Text key={player.element} style={styles.bonusPointsText}>{overviewData.elements.find(element => element.id === player.element)?.web_name} ({player.value})</Text>
                        )
                }
                </View>

                <View style={[styles.bonusPointsView, {borderLeftWidth: 0.5,}]}>
                {
                    bonusPoints.a.slice().sort((a, b) => b.value - a.value).slice(0,5).map( player => 
                        <Text key={player.element} style={styles.bonusPointsText}>{overviewData.elements.find(element => element.id === player.element)?.web_name} ({player.value})</Text>
                        )
                }
                </View>
            </View>
            </View>
        )
    }

    return null
}

function CreateKingsOfTheGameweekView(overviewData: FplOverview) {
    
    let kings = overviewData.events.filter(event => event.top_element_info !== null).reverse();

    return (
        
        <View style={styles.kingsView}>
            <ScrollView horizontal style={styles.kingsScrollView}>
                {
                    kings.map(king => 
                        
                        <View key={king.id} style={styles.kingsCardView}>
                            <Text style={styles.kingsText}>Gameweek {king.id}</Text>
                            <View style={{flex: 8}}>
                                <Image style={styles.jersey} source={Jerseys[overviewData.elements.find(element => element.id === king.top_element_info!.id)!.team_code]} resizeMode="contain"/>
                                <View style={styles.scoreContainer}>
                                    <Text style={styles.scoreText}>{king.top_element_info!.points}</Text>
                                </View> 
                            </View>
                            <Text style={styles.kingsText}>{overviewData.elements.find(element => element.id === king.top_element_info!.id)?.web_name}</Text>                    
                        </View>

                        )
                }
            </ScrollView>
        </View>
        
    )

}


const Lineup = () => {

    const teamInfo = useAppSelector((state) => state.team);
    const overview = useGetOverviewQuery();
    const fixtures = useGetFixturesQuery();
    const gameweek = useGetGameweekDataQuery((teamInfo.teamType !== TeamTypes.Empty) ? teamInfo.gameweek : skipToken);
    const draftGameweek = useGetDraftGameweekPicksQuery((teamInfo.teamType === TeamTypes.Draft) ? { entryId: teamInfo.info.id, gameweek: teamInfo.gameweek } : skipToken);
    const draftOverview = useGetDraftOverviewQuery((teamInfo.teamType === TeamTypes.Draft) ? undefined : skipToken );
    const budgetGameweek = useGetBudgetGameweekPicksQuery((teamInfo.teamType === TeamTypes.Budget) ? { entryId: teamInfo.info.id, gameweek: teamInfo.gameweek } : skipToken);

    return (
        <>
        {(teamInfo.teamType !== TeamTypes.Empty && gameweek.data && overview.data && fixtures.data) &&
        <View style={{flexDirection: 'column', flex: 1}}>
            <View style={styles.lineupContainer}>
                <Image style={styles.field} source={require('../../../assets/threequartersfield.jpg')}/>
                
                    <>
                    {(teamInfo.teamType === TeamTypes.Fixture || teamInfo.teamType === TeamTypes.Dream) ? 
                        <View style={styles.playerContainer}>
                            {CreatePlayerStatsView(gameweek.data, overview.data, fixtures.data, teamInfo)}
                        </View>
                    :
                    ((teamInfo.teamType === TeamTypes.Budget && budgetGameweek.data) || (teamInfo.teamType === TeamTypes.Draft && draftGameweek.data && draftOverview.data)) &&
                        <>
                            <View style={{position: 'absolute', height: '25%', aspectRatio: 1, right: 0}}>
                                {(teamInfo.teamType === TeamTypes.Budget) ? 
                                    <ManagerInfoCard teamInfo={teamInfo} budgetGameweek={budgetGameweek.data}/> :
                                    <ManagerInfoCard teamInfo={teamInfo}/> 
                                }
                            </View>
                            <View style={styles.playerContainer}>
                                {CreatePlayerStatsView(gameweek.data, overview.data, fixtures.data, teamInfo, draftOverview.data, draftGameweek.data, budgetGameweek.data)}
                            </View>
                        </>
                    }
                    </>
            </View>
            <View style={styles.bottomContainer}> 
    
                { (teamInfo.teamType === TeamTypes.Fixture) ? 
                    <>
                    { CreateBonusPointView(teamInfo, overview.data, fixtures.data)}
                    </>     
                : (teamInfo.teamType === TeamTypes.Dream) ? 
                    <>
                    { CreateKingsOfTheGameweekView(overview.data) }
                    </>
                :
                ((teamInfo.teamType === TeamTypes.Budget && budgetGameweek.data) || (teamInfo.teamType === TeamTypes.Draft && draftGameweek.data && draftOverview.data)) &&
                    <>
                    { CreateBenchView(gameweek.data, overview.data, fixtures.data, teamInfo, draftOverview.data, draftGameweek.data, budgetGameweek.data) }
                    </>
                }

            </View>
        </View>
        }
        </>
    )
}

const styles = StyleSheet.create(
    {   
        lineupContainer: {
            flex: 4,
        },

        bottomContainer: {
            flex: 1,
            backgroundColor: '#629512',
            borderTopWidth: 1.5,
            borderTopColor: 'white'
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
        },

        bonusPointsView: {
            width: '30%',
            justifyContent: 'center',
            alignContent: 'center',
            backgroundColor: GlobalConstants.primaryColor, 
            borderColor: GlobalConstants.aLittleLighterColor,
            paddingBottom: 3,
        },

        bottomViewTitle: {
            color: GlobalConstants.textPrimaryColor,
            alignSelf: 'center',
            fontSize: GlobalConstants.width*0.035,
            fontWeight: 'bold',
            padding: 5,
            marginTop: 2,
            backgroundColor: GlobalConstants.primaryColor
        },

        bonusPointsText: {
            color: GlobalConstants.textPrimaryColor,
            alignSelf: 'center',
            fontSize: GlobalConstants.width*0.025,
        },

        kingsView: {
            flex: 1,
            alignSelf: 'center',
            marginTop: 3,
            width: GlobalConstants.width*0.867,
            backgroundColor: GlobalConstants.primaryColor,           
        },

        kingsScrollView: {
            flex: 1,
        },

        kingsCardView: {
            width: GlobalConstants.width*0.8*0.27,
            padding: 5,
            borderColor: 'white',
            justifyContent: 'center',
            alignItems: 'center'
        },

        jersey: {
            position: 'absolute',
            alignSelf: 'center',
            height: '90%',
            width: '70%',
            marginTop: 3,
            flex: 9,
        },

        kingsText: {
            flex: 1,
            color: 'white',
            fontSize: GlobalConstants.smallFont,
            padding: 5,
        },
        
        scoreText: {
            fontSize: GlobalConstants.width*0.03,
            position: "absolute",
            overflow: 'hidden',
        },

        scoreContainer: {
            height: GlobalConstants.width/24,
            width: GlobalConstants.width/24,
            borderRadius: GlobalConstants.width/24/2,
            backgroundColor: GlobalConstants.tertiaryColor,
            color: GlobalConstants.textSecondaryColor,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 0,
            left: GlobalConstants.width*0.19*0.15,
        },

        gameweekText: {
            position: 'absolute',
            top: 0,
        }
    }
);

export default Lineup;






