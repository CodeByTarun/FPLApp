// This container is necassary to switch between the two teams playing against each other and
// for switching to your own team and maybe even other teams in your league
import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from "react-native";
import Lineup from "./Lineup";
import * as GlobalConstants from "../../Global/GlobalConstants";
import TeamSwitch from "./TeamSwitch";
import { useAppSelector, useAppDispatch } from "../../Store/hooks";
import { changeToDraftTeam, changeToDreamTeam, TeamInfo, TeamTypes } from "../../Store/teamSlice";
import CustomButton from "../Controls/CustomButton";
import { FplOverview } from "../../Models/FplOverview";
import { FplFixture } from "../../Models/FplFixtures";
import { openTeamModal } from "../../Store/modalSlice";
import { goToPlayerStatsScreen } from "../../Store/navigationSlice";
import globalStyles from "../../Global/GlobalStyles";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useGetDraftGameweekPicksQuery, useGetDraftOverviewQuery, useGetBudgetGameweekPicksQuery, useGetDraftUserInfoQuery, useGetBudgetUserInfoQuery, useGetGameweekDataQuery, useGetDraftLeagueInfoQuery } from "../../Store/fplSlice";
import ToolTip from "../Controls/ToolTip";
import { LeagueEntry } from "../../Models/FplDraftLeagueInfo";

interface LineupContainerProps {
    overview: FplOverview,
    fixtures: FplFixture[],
}

const LineupContainer = ({overview, fixtures}: LineupContainerProps) => {

    const teamInfo = useAppSelector((state) => state.team);
    const dispatch = useAppDispatch();
    const gameweek = useGetGameweekDataQuery((teamInfo.teamType !== TeamTypes.Empty) ? teamInfo.gameweek : skipToken);
    
    const draftGameweek = useGetDraftGameweekPicksQuery((teamInfo.teamType === TeamTypes.Draft) ? { entryId: teamInfo.info.id, gameweek: teamInfo.gameweek } : skipToken);
    const draftOverview = useGetDraftOverviewQuery((teamInfo.teamType === TeamTypes.Draft) ? undefined : skipToken );
    const draftUserInfo = useGetDraftUserInfoQuery((teamInfo.teamType === TeamTypes.Draft) ? teamInfo.info.id : skipToken );
    const draftLeagueInfo = useGetDraftLeagueInfoQuery(((teamInfo.teamType === TeamTypes.Draft) && draftUserInfo.data) ? draftUserInfo.data.entry.league_set[0] : skipToken)

    const budgetGameweek = useGetBudgetGameweekPicksQuery((teamInfo.teamType === TeamTypes.Budget) ? { entryId: teamInfo.info.id, gameweek: teamInfo.gameweek } : skipToken);
    const budgetUserInfo = useGetBudgetUserInfoQuery((teamInfo.teamType === TeamTypes.Budget) ? teamInfo.info.id : skipToken);

    const [isDraftStandingsModalVisible, setIsDraftStandingsModalVisible] = useState(false); 

    const onMyTeamButtonPress = useCallback(() => {
        dispatch(openTeamModal());
    }, []);
    
    const onDreamTeamPress = useCallback(() => {
        dispatch(changeToDreamTeam());
    }, []);

    const onPlayerSearchPress = useCallback(() => {
        dispatch(goToPlayerStatsScreen());
    }, [])

    const openDraftTeamFromStandings = useCallback((leagueEntry: LeagueEntry | undefined) => {
        if (leagueEntry) {
            dispatch(changeToDraftTeam({id: leagueEntry.entry_id, name: leagueEntry.entry_name, isDraftTeam: true, isFavourite: false}));
            setIsDraftStandingsModalVisible(false);
        }
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={[styles.controlsContainer, globalStyles.bottomShadow]}>

                    <View style={{flex: 1, justifyContent: 'center', paddingLeft: 5 }}>
                        <View style={styles.buttonContainer}>
                            <CustomButton image={'dreamteam'} buttonFunction={onDreamTeamPress}/>
                        </View>
                    </View>

                    <View style={{flex: 3, justifyContent: 'center', alignItems: 'center', padding: 6}}>
                        {
                            (teamInfo.teamType === TeamTypes.Fixture) ?
                                <View style={{alignSelf: 'center', height: '90%', width: '65%'}}>
                                    <TeamSwitch overview={overview} fixtures={fixtures}/>
                                </View> :
                            (teamInfo.teamType === TeamTypes.Dream) ?
                                <Text style={styles.text}>Dream Team</Text> :
                            (teamInfo.teamType === TeamTypes.Draft) ?
                                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => setIsDraftStandingsModalVisible(!isDraftStandingsModalVisible)}>
                                    <Text style={styles.text}>{teamInfo.info.name}  </Text> 
                                    <Text style={{color: GlobalConstants.textPrimaryColor, 
                                                  fontSize: GlobalConstants.mediumFont * 0.6, fontWeight: '700', 
                                                  marginTop: 0, transform: [{rotate: '-45deg'}], alignSelf: 'center', 
                                                  marginBottom: 5}}>◣</Text>
                                </TouchableOpacity> :
                            (teamInfo.teamType === TeamTypes.Budget) ? 
                                <Text style={styles.text}>{teamInfo.info.name}</Text> :
                                <></>
                        }
                    </View>

                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: 5 }}>
                        <View style={[styles.buttonContainer, {height: '60%', marginTop: 4}]}>
                            <CustomButton image={'playersearch'} buttonFunction={onPlayerSearchPress}/>
                        </View>
                        <View style={styles.buttonContainer}>
                            <CustomButton image={'team'} buttonFunction={onMyTeamButtonPress}/>
                        </View>
                    </View>

                </View>
            </View>
            <View style={styles.middle}>
                {(teamInfo.teamType === TeamTypes.Budget && budgetGameweek.data && budgetUserInfo.data && gameweek.data) ?
                    <Lineup overview={overview} fixtures={fixtures} teamInfo={teamInfo} gameweek={gameweek.data} 
                            budgetGameweekPicks={budgetGameweek.data} budgetUserInfo={budgetUserInfo.data}/> : 

                 (teamInfo.teamType === TeamTypes.Draft && draftGameweek.data && draftUserInfo.data && gameweek.data) ?
                    <Lineup overview={overview} fixtures={fixtures} teamInfo={teamInfo} gameweek={gameweek.data} 
                            draftGameweekPicks={draftGameweek.data} draftUserInfo={draftUserInfo.data} draftOverview={draftOverview.data}/> : 

                 (teamInfo.teamType !== TeamTypes.Draft && teamInfo.teamType !== TeamTypes.Budget && gameweek.data) ?
                    <Lineup overview={overview} fixtures={fixtures} teamInfo={teamInfo} gameweek={gameweek.data} /> : 
                    <></>
                }
            </View>
            { draftLeagueInfo.isSuccess &&
                <ToolTip distanceFromRight={GlobalConstants.width * 0.1} 
                        distanceFromTop={55} 
                        distanceForArrowFromRight={GlobalConstants.width*0.36} 
                        isVisible={isDraftStandingsModalVisible} 
                        setIsVisible={setIsDraftStandingsModalVisible} 
                        view={
                            <View style={[{height: GlobalConstants.height * 0.55, 
                                        width: GlobalConstants.width * 0.8,
                                        borderRadius: GlobalConstants.cornerRadius,
                                        padding: 5,
                                        backgroundColor: GlobalConstants.secondaryColor}, globalStyles.shadow]}>
                                <Text style={{textAlign: 'center', color: GlobalConstants.textPrimaryColor, 
                                              fontWeight: '700', marginBottom: 10, marginTop: 10, fontSize: GlobalConstants.largeFont}}>Standings</Text>
                                <View style={{flex: 1, marginBottom: 5, marginLeft: 5, marginRight: 5}}>
                                    <View style={{flexDirection: 'row', marginBottom: 5}}>
                                        <Text style={[styles.leagueHeaderText, {flex: 1}]}>Rank</Text>
                                        <Text style={[styles.leagueHeaderTextLeft, {flex: 3, paddingLeft: 5}]}>Team & Manager</Text>
                                        <Text style={[styles.leagueHeaderText, {flex: 1}]}>GW</Text>
                                        <Text style={[styles.leagueHeaderText, {flex: 1}]}>Total</Text>                                
                                    </View>
                                    <ScrollView style={{flex: 1, borderTopColor: GlobalConstants.textSecondaryColor, borderTopWidth: 1}}>
                                        {draftLeagueInfo.data.standings.map(standing => {

                                            let leagueEntry = draftLeagueInfo.data.league_entries.find(entry => entry.id === standing.league_entry);

                                            return (
                                                <TouchableOpacity key={standing.league_entry} 
                                                                  onPress={() => openDraftTeamFromStandings(leagueEntry)}
                                                                  style={{flexDirection: 'row', alignContent: 'center', 
                                                                          alignItems: 'center', paddingBottom: 10, 
                                                                          paddingTop: 10, borderBottomColor: GlobalConstants.aLittleLighterColor,
                                                                          borderBottomWidth: 1,}}>
                                                    <Text style={[styles.leagueText, {flex: 1}]}>{standing.rank}</Text>
                                                    <View style={{flex: 3, paddingLeft: 5}}>
                                                        <Text numberOfLines={1} style={{textAlign: 'left', flex: 1, color: GlobalConstants.textPrimaryColor, 
                                                                                        fontSize: GlobalConstants.smallFont * 1.4, fontWeight: '600'}}>
                                                            {leagueEntry?.entry_name}</Text>
                                                        <Text numberOfLines={1} style={{textAlign: 'left', flex: 1, color: GlobalConstants.textPrimaryColor, fontSize: GlobalConstants.smallFont * 1.1,}}>
                                                            {leagueEntry?.player_first_name + " " + leagueEntry?.player_last_name}</Text>
                                                    </View>
                                                    <Text style={[styles.leagueText, {flex: 1}]}>{standing.event_total}</Text>
                                                    <Text style={[styles.leagueText, {flex: 1}]}>{standing.total}</Text> 
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </ScrollView>
                                </View>

                            </View>
                        }>

                </ToolTip>
            }
        </View>
    )
}

const styles = StyleSheet.create(
    {
        //#region Container styling
        container: {
            flex: 1,
            margin: 0,
        },

        top: {
            height: 50,
            backgroundColor: GlobalConstants.primaryColor,
            zIndex: 1,
        },

        middle: {
            flex: 9,
            width : '100%',
        },

        controlsContainer: {
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
            zIndex: 1,
            backgroundColor: GlobalConstants.primaryColor,
        },

        buttonContainer: {
            height: '70%',
            aspectRatio: 1,
            margin: 3
        },

        switchContainer: {
            alignSelf: 'center',
            height: '100%',
            width: '100%',
        },

        icon: {
            width: '80%',
            height: '80%',
            alignSelf: 'center'
        },

        text: {
            alignSelf: 'center',
            color: GlobalConstants.textPrimaryColor,
            fontSize: GlobalConstants.width*0.045,
            fontWeight: 'bold'
        },

        leagueHeaderText: {
            color: GlobalConstants.textPrimaryColor,
            fontSize: GlobalConstants.smallFont * 1.3,
            alignSelf: 'center',
            textAlign: 'center',
            fontWeight: '600'
        },

        leagueHeaderTextLeft: {
            color: GlobalConstants.textPrimaryColor,
            fontSize: GlobalConstants.smallFont * 1.3,
            alignSelf: 'center',
            textAlign: 'left',
            fontWeight: '600'
        },

        leagueText: {
            color: GlobalConstants.textPrimaryColor,
            fontSize: GlobalConstants.smallFont * 1.3,
            alignSelf: 'center',
            textAlign: 'center'
        },
        //#endregion
    }
);

export default LineupContainer;
