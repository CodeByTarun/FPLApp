// This container is necassary to switch between the two teams playing against each other and
// for switching to your own team and maybe even other teams in your league
import React, { useCallback, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Lineup from "./Lineup";
import * as GlobalConstants from "../../Global/GlobalConstants";
import TeamSwitch from "./TeamSwitch/TeamSwitch";
import { useAppSelector, useAppDispatch } from "../../Store/hooks";
import { changeToDreamTeam, TeamTypes } from "../../Store/teamSlice";
import { FplOverview } from "../../Models/FplOverview";
import { FplFixture } from "../../Models/FplFixtures";
import { openGameweekOverviewModal, openTeamModal } from "../../Store/modalSlice";
import { goToPlayerStatsScreen } from "../../Store/navigationSlice";
import globalStyles from "../../Global/GlobalStyles";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useGetDraftGameweekPicksQuery, useGetDraftOverviewQuery, useGetBudgetGameweekPicksQuery, useGetDraftUserInfoQuery, 
         useGetBudgetUserInfoQuery, useGetGameweekDataQuery, useGetDraftLeagueInfoQuery } from "../../Store/fplSlice";
import Standings from "../Standings";
import { styles } from "./LineupViewStyles";
import {CustomButton, ToolTip} from "../Controls";

interface LineupViewProps {
    overview: FplOverview,
    fixtures: FplFixture[],
}

const LineupView = ({overview, fixtures}: LineupViewProps) => {

    const teamInfo = useAppSelector((state) => state.team);
    const dispatch = useAppDispatch();
    const gameweek = useGetGameweekDataQuery((teamInfo.teamType !== TeamTypes.Empty) ? teamInfo.gameweek : skipToken);
    
    const draftGameweek = useGetDraftGameweekPicksQuery((teamInfo.teamType === TeamTypes.Draft) ? { entryId: teamInfo.info.id, gameweek: teamInfo.gameweek } : skipToken);
    const draftOverview = useGetDraftOverviewQuery((teamInfo.teamType === TeamTypes.Draft) ? undefined : skipToken );
    const draftUserInfo = useGetDraftUserInfoQuery((teamInfo.teamType === TeamTypes.Draft) ? teamInfo.info.id : skipToken );
    const draftLeagueInfo = useGetDraftLeagueInfoQuery(((teamInfo.teamType === TeamTypes.Draft) && draftUserInfo.data) ? draftUserInfo.data.entry.league_set[0] : skipToken)

    const budgetGameweek = useGetBudgetGameweekPicksQuery((teamInfo.teamType === TeamTypes.Budget) ? { entryId: teamInfo.info.id, gameweek: teamInfo.gameweek } : skipToken);
    const budgetUserInfo = useGetBudgetUserInfoQuery((teamInfo.teamType === TeamTypes.Budget) ? teamInfo.info.id : skipToken);

    const [isStandingsModalVisible, setIsStandingsModalVisible] = useState(false); 

    const onMyTeamButtonPress = useCallback(() => {
        dispatch(openTeamModal());
    }, []);
    
    const onDreamTeamPress = useCallback(() => {
        dispatch(changeToDreamTeam());
    }, []);

    const onPlayerSearchPress = useCallback(() => {
        dispatch(goToPlayerStatsScreen());
    }, [])

    const onStrategyButtonPress = useCallback(() => {
        dispatch(openGameweekOverviewModal());
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={[styles.controlsContainer, globalStyles.bottomShadow]}>

                    <View style={styles.leftButtonsContainer}>
                        <View style={styles.buttonContainer}>
                            <CustomButton image={'dreamteam'} buttonFunction={onDreamTeamPress}/>
                        </View>
                        <View style={styles.buttonContainer}>
                            <CustomButton image={'strategy'} buttonFunction={onStrategyButtonPress}/>
                        </View>
                    </View>

                    <View style={styles.lineupHeaderContainer}>
                        {
                            (teamInfo.teamType === TeamTypes.Fixture) ?
                                <View style={styles.teamSwitchContainer}>
                                    <TeamSwitch overview={overview} fixtures={fixtures}/>
                                </View> :
                            (teamInfo.teamType === TeamTypes.Dream) ?
                                <Text style={styles.text}>Dream Team</Text> :
                            (teamInfo.teamType === TeamTypes.Draft || teamInfo.teamType === TeamTypes.Budget) ?
                                <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => setIsStandingsModalVisible(!isStandingsModalVisible)}>
                                    <Text style={styles.text}>{teamInfo.info.name}  </Text> 
                                    <Text style={globalStyles.dropDownSymbol}>◣</Text>
                                </TouchableOpacity> :
                                <></>
                        }
                    </View>

                    <View style={styles.rightButtonsContainers}>
                        <View style={styles.playerSearchButtonContainer}>
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
                <ToolTip distanceFromRight={GlobalConstants.width * 0.1} 
                        distanceFromTop={55} 
                        distanceForArrowFromRight={GlobalConstants.width*0.36} 
                        isVisible={isStandingsModalVisible} 
                        setIsVisible={setIsStandingsModalVisible} 
                        view={
                            <View style={[styles.leagueContainer, globalStyles.shadow]}>
                                <Standings teamInfo={teamInfo} setModalVisibility={setIsStandingsModalVisible} budgetUserInfo={budgetUserInfo.data} draftLeagueInfo={draftLeagueInfo.data}/>
                            </View>
                        }>

                </ToolTip>
        </View>
    )
}

export default LineupView;
