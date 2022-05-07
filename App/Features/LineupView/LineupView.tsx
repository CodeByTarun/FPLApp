// This container is necassary to switch between the two teams playing against each other and
// for switching to your own team and maybe even other teams in your league
import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Lineup from "./Lineup";
import * as GlobalConstants from "../../Global/GlobalConstants";
import TeamSwitch from "./TeamSwitch/TeamSwitch";
import { useAppDispatch } from "../../Store/hooks";
import { TeamInfo, TeamTypes } from "../../Store/teamSlice";
import { FplOverview } from "../../Models/FplOverview";
import { FplFixture } from "../../Models/FplFixtures";
import { openTeamModal } from "../../Store/modalSlice";
import globalStyles from "../../Global/GlobalStyles";
import Standings from "../Standings";
import { styles } from "./LineupViewStyles";
import {AnimatedButton, CustomButton, LoadingIndicator, ToolTip} from "../Controls";
import { FplDraftGameweekPicks } from "../../Models/FplDraftGameekPicks";
import { FplDraftOverview } from "../../Models/FplDraftOverview";
import { FplDraftUserInfo } from "../../Models/FplDraftUserInfo";
import { FplGameweek } from "../../Models/FplGameweek";
import { FplManagerGameweekPicks } from "../../Models/FplManagerGameweekPicks";
import { FplManagerInfo } from "../../Models/FplManagerInfo";
import { FplDraftLeagueInfo } from "../../Models/FplDraftLeagueInfo";
import TeamListView from "./TeamListView";

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

    const dispatch = useAppDispatch();

    const [isStandingsModalVisible, setIsStandingsModalVisible] = useState(false); 
    const [isTeamsListVisible, setIsTeamsListVisible] = useState(false);

    const onMyTeamButtonPress = useCallback(() => {
        setIsTeamsListVisible(true);
    }, []);

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
                                <AnimatedButton buttonFn={() => setIsStandingsModalVisible(!isStandingsModalVisible)}>
                                    <View testID="managerTeamDropDownButton" style={{flexDirection: 'row'}}>
                                        <Text style={styles.text}>{teamInfo.info.name}  </Text> 
                                        <Text style={globalStyles.dropDownSymbol}>◣</Text>
                                    </View>
                                </AnimatedButton> :
                                <></>
                        }
                    </View>

                    <View style={styles.rightButtonsContainers}>
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

                 (teamInfo.teamType === TeamTypes.Draft && draftGameweekPicks && draftUserInfo && gameweek) ?
                    <Lineup overview={overview} fixtures={fixtures} teamInfo={teamInfo} gameweek={gameweek} 
                            draftGameweekPicks={draftGameweekPicks} draftUserInfo={draftUserInfo} draftOverview={draftOverview}/> : 

                 (teamInfo.teamType !== TeamTypes.Draft && teamInfo.teamType !== TeamTypes.Budget && teamInfo.teamType !== TeamTypes.Empty && gameweek) ?
                    <Lineup overview={overview} fixtures={fixtures} teamInfo={teamInfo} gameweek={gameweek} /> : 
                
                 (teamInfo.teamType === TeamTypes.Empty) ?
                    <View style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
                        <TouchableOpacity testID="noTeamsFoundButton" style={styles.button} onPress={() => dispatch(openTeamModal())}>
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
                <ToolTip distanceFromRight={GlobalConstants.width * 0.1} 
                        distanceFromTop={70 + (GlobalConstants.height * 0.175)} 
                        distanceForArrowFromRight={GlobalConstants.width*0.36} 
                        isVisible={isStandingsModalVisible} 
                        setIsVisible={setIsStandingsModalVisible} 
                        view={
                            <View style={[styles.leagueContainer, globalStyles.shadow]}>
                                <Standings teamInfo={teamInfo} setModalVisibility={setIsStandingsModalVisible} budgetUserInfo={budgetUserInfo} draftLeagueInfo={draftLeagueInfo}/>
                            </View>
                        }/>

                <ToolTip distanceFromRight={4} distanceFromTop={GlobalConstants.height * 0.175 + 70} distanceForArrowFromRight={7} 
                         isVisible={isTeamsListVisible} setIsVisible={setIsTeamsListVisible} 
                         view={<TeamListView setIsVisible={setIsTeamsListVisible}/>}/>
        </View>
    )
}

export default LineupView;
