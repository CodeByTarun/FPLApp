// This container is necassary to switch between the two teams playing against each other and
// for switching to your own team and maybe even other teams in your league
import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Lineup from "./Lineup";
import * as GlobalConstants from "../../Global/GlobalConstants";
import TeamSwitch from "./TeamSwitch/TeamSwitch";
import { useAppSelector, useAppDispatch } from "../../Store/hooks";
import { changeToDreamTeam, TeamInfo, TeamTypes } from "../../Store/teamSlice";
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
import { FplDraftGameweekPicks } from "../../Models/FplDraftGameekPicks";
import { FplDraftOverview } from "../../Models/FplDraftOverview";
import { FplDraftUserInfo } from "../../Models/FplDraftUserInfo";
import { FplGameweek } from "../../Models/FplGameweek";
import { FplManagerGameweekPicks } from "../../Models/FplManagerGameweekPicks";
import { FplManagerInfo } from "../../Models/FplManagerInfo";
import { FplDraftLeagueInfo } from "../../Models/FplDraftLeagueInfo";

interface LineupViewProps {
    overview: FplOverview,
    fixtures: FplFixture[],
    gameweek: FplGameweek;
    teamInfo: TeamInfo;
    draftGameweekPicks? : FplDraftGameweekPicks;
    draftOverview? : FplDraftOverview;
    draftLeagueInfo? : FplDraftLeagueInfo;
    budgetGameweekPicks? : FplManagerGameweekPicks;
    draftUserInfo? : FplDraftUserInfo;
    budgetUserInfo? : FplManagerInfo;
}

const LineupView = ({overview, fixtures, gameweek, teamInfo, draftGameweekPicks, draftOverview, draftUserInfo, draftLeagueInfo, budgetUserInfo, budgetGameweekPicks}: LineupViewProps) => {

    const dispatch = useAppDispatch();

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
                            (teamInfo.teamType === TeamTypes.Fixture && gameweek) ?
                                <View testID="teamSwitchContainer" style={styles.teamSwitchContainer}>
                                    <TeamSwitch overview={overview} fixtures={fixtures} gameweek={gameweek}/>
                                </View> :
                            (teamInfo.teamType === TeamTypes.Dream) ?
                                <Text style={styles.text}>Dream Team</Text> :
                            (teamInfo.teamType === TeamTypes.Draft || teamInfo.teamType === TeamTypes.Budget) ?
                                <TouchableOpacity testID="managerTeamDropDownButton" style={{flexDirection: 'row'}} onPress={() => setIsStandingsModalVisible(!isStandingsModalVisible)}>
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
                {(teamInfo.teamType === TeamTypes.Budget && budgetGameweekPicks && budgetUserInfo && gameweek) ?
                    <Lineup overview={overview} fixtures={fixtures} teamInfo={teamInfo} gameweek={gameweek} 
                            budgetGameweekPicks={budgetGameweekPicks} budgetUserInfo={budgetUserInfo}/> : 

                 ((teamInfo.teamType === TeamTypes.Draft && draftGameweekPicks && draftUserInfo && gameweek) ?
                    <Lineup overview={overview} fixtures={fixtures} teamInfo={teamInfo} gameweek={gameweek} 
                            draftGameweekPicks={draftGameweekPicks} draftUserInfo={draftUserInfo} draftOverview={draftOverview}/> : 

                 ((teamInfo.teamType !== TeamTypes.Draft && teamInfo.teamType !== TeamTypes.Budget && teamInfo.teamType !== TeamTypes.Empty && gameweek) ?
                    <Lineup overview={overview} fixtures={fixtures} teamInfo={teamInfo} gameweek={gameweek} /> : 
                
                    <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity testID="noTeamsFoundButton" style={styles.button} onPress={() => dispatch(openTeamModal())}>
                            <Text style={styles.buttonText}>Add your fantasy team</Text>
                        </TouchableOpacity>
                    </View>))
            
                }
                
            </View>
                <ToolTip distanceFromRight={GlobalConstants.width * 0.1} 
                        distanceFromTop={55} 
                        distanceForArrowFromRight={GlobalConstants.width*0.36} 
                        isVisible={isStandingsModalVisible} 
                        setIsVisible={setIsStandingsModalVisible} 
                        view={
                            <View style={[styles.leagueContainer, globalStyles.shadow]}>
                                <Standings teamInfo={teamInfo} setModalVisibility={setIsStandingsModalVisible} budgetUserInfo={budgetUserInfo} draftLeagueInfo={draftLeagueInfo}/>
                            </View>
                        }>

                </ToolTip>
        </View>
    )
}

export default LineupView;
