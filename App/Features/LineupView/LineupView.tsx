// This container is necassary to switch between the two teams playing against each other and
// for switching to your own team and maybe even other teams in your league
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Lineup from "./Lineup";
import * as GlobalConstants from "../../Global/GlobalConstants";
import TeamSwitch from "./TeamSwitch/TeamSwitch";
import { TeamInfo, TeamTypes } from "../../Store/teamSlice";
import { FplOverview } from "../../Models/FplOverview";
import { FplFixture } from "../../Models/FplFixtures";
import globalStyles from "../../Global/GlobalStyles";
import Standings from "../Standings";
import { styles } from "./LineupViewStyles";
import {AnimatedButton, LoadingIndicator, ToolTip} from "../Controls";
import { FplDraftGameweekPicks } from "../../Models/FplDraftGameekPicks";
import { FplDraftOverview } from "../../Models/FplDraftOverview";
import { FplDraftUserInfo } from "../../Models/FplDraftUserInfo";
import { FplGameweek } from "../../Models/FplGameweek";
import { FplManagerGameweekPicks } from "../../Models/FplManagerGameweekPicks";
import { FplManagerInfo } from "../../Models/FplManagerInfo";
import { FplDraftLeagueInfo } from "../../Models/FplDraftLeagueInfo";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../../App";
import { useAppDispatch } from "../../Store/hooks";
import { changeMutableView } from "../../Store/modalSlice";

interface LineupViewProps {
    overview: FplOverview,
    fixtures: FplFixture[],
    gameweek: FplGameweek | undefined;
    teamInfo: TeamInfo;
    draftGameweekPicks? : FplDraftGameweekPicks;
    draftOverview? : FplDraftOverview;
    draftLeagueInfo? : FplDraftLeagueInfo;
    budgetGameweekPicks? : FplManagerGameweekPicks;
    draftUserInfo? : FplDraftUserInfo;
    budgetUserInfo? : FplManagerInfo;
}

const LineupView = ({overview, fixtures, gameweek, teamInfo, draftGameweekPicks, draftOverview, draftUserInfo, draftLeagueInfo, budgetUserInfo, budgetGameweekPicks}: LineupViewProps) => {

    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();
    const dispatch = useAppDispatch();

    const openStandingsModal = () => {
        dispatch(changeMutableView({view: <Standings teamInfo={teamInfo} budgetUserInfo={budgetUserInfo} draftLeagueInfo={draftLeagueInfo}/>, width: '85%'}));
        navigator.navigate('MutableModal');
    }

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={[styles.controlsContainer, globalStyles.bottomShadow]}>

                    <View style={styles.leftButtonsContainer}>

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
                                <AnimatedButton buttonFn={openStandingsModal}>
                                    <View testID="managerTeamDropDownButton" style={{flexDirection: 'row'}}>
                                        <Text style={styles.text}>{teamInfo.info.name}  </Text> 
                                        <Text style={globalStyles.dropDownSymbol}>◣</Text>
                                    </View>
                                </AnimatedButton> :
                                <></>
                        }
                    </View>

                    <View style={styles.rightButtonsContainers}>

                    </View>

                </View>
            </View>
            <View style={styles.middle}>
                { (teamInfo.teamType !== TeamTypes.Empty) && gameweek ?
                    <Lineup overview={overview} fixtures={fixtures} teamInfo={teamInfo} gameweek={gameweek} 
                            draftGameweekPicks={draftGameweekPicks} draftUserInfo={draftUserInfo} draftOverview={draftOverview}
                            budgetGameweekPicks={budgetGameweekPicks} budgetUserInfo={budgetUserInfo}/> : 
                
                 (teamInfo.teamType === TeamTypes.Empty) ?
                    <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity testID="noTeamsFoundButton" style={styles.button} onPress={() => navigator.navigate('TeamModal')}>
                            <Text style={styles.buttonText}>Add your fantasy team</Text>
                        </TouchableOpacity>
                    </View> : 
                    
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{height: '20%', width: '20%', alignSelf: 'center'}}>
                            <LoadingIndicator/>
                        </View>
                    </View>
                }                
            </View>
                {/* <ToolTip distanceFromRight={GlobalConstants.width * 0.1} 
                        distanceFromTop={((GlobalConstants.height) * 0.17 + 70)} 
                        distanceForArrowFromRight={GlobalConstants.width*0.36} 
                        isVisible={isStandingsModalVisible} 
                        setIsVisible={setIsStandingsModalVisible} 
                        view={
                            <View style={[styles.leagueContainer, globalStyles.shadow]}>
                                <Standings teamInfo={teamInfo} setModalVisibility={setIsStandingsModalVisible} budgetUserInfo={budgetUserInfo} draftLeagueInfo={draftLeagueInfo}/>
                            </View>
                        }/> */}
        </View>
    )
}

export default LineupView;
