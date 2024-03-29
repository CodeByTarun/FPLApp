// This container is necassary to switch between the two teams playing against each other and
// for switching to your own team and maybe even other teams in your league
import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Lineup from "./Lineup";
import TeamSwitch from "./TeamSwitch/TeamSwitch";
import { changeToEmpty, TeamInfo, TeamTypes } from "../../Store/teamSlice";
import { FplOverview } from "../../Models/FplOverview";
import { FplFixture } from "../../Models/FplFixtures";
import globalStyles from "../../Global/GlobalStyles";
import Standings from "../Standings";
import { LineupViewStyles } from "./LineupViewStyles";
import {AnimatedButton, LoadingIndicator} from "../Controls";
import { FplDraftGameweekPicks } from "../../Models/FplDraftGameekPicks";
import { FplDraftOverview } from "../../Models/FplDraftOverview";
import { FplDraftUserInfo } from "../../Models/FplDraftUserInfo";
import { FplGameweek } from "../../Models/FplGameweek";
import { FplManagerGameweekPicks } from "../../Models/FplManagerGameweekPicks";
import { FplManagerInfo } from "../../Models/FplManagerInfo";
import { FplDraftLeagueInfo } from "../../Models/FplDraftLeagueInfo";
import { useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../../App";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
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

    const theme = useTheme();
    const styles = LineupViewStyles(theme);

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
                    <View style={styles.sideControlsContainer}/>
                    <View style={styles.lineupHeaderContainer}>
                        {
                            (teamInfo.teamType === TeamTypes.Fixture && gameweek) ?
                                <View testID="teamSwitchContainer" style={styles.teamSwitchContainer}>
                                    <TeamSwitch overview={overview} fixtures={fixtures} gameweek={gameweek}/>
                                </View> :
                            (teamInfo.teamType === TeamTypes.Dream) ?
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={styles.text}>Dream Team</Text>
                            </View> :
                            (teamInfo.teamType === TeamTypes.Draft || teamInfo.teamType === TeamTypes.Budget) ?
                                <AnimatedButton buttonFn={openStandingsModal}>
                                    <View testID="managerTeamDropDownButton" style={{flexDirection: 'row'}}>
                                        <Text style={styles.text}>{teamInfo.teamType === TeamTypes.Draft ? draftUserInfo?.entry.name : budgetUserInfo?.name}  </Text> 
                                        <Text style={globalStyles.dropDownSymbol}>◣</Text>
                                    </View>
                                </AnimatedButton> :
                                <></>
                        }
                    </View>
                    <View style={[styles.sideControlsContainer, {alignItems: 'flex-end'}]}>
                        {(teamInfo.teamType === TeamTypes.Draft || teamInfo.teamType === TeamTypes.Budget) &&
                            <Text style={styles.idText}>ID# {teamInfo.info.id}</Text>
                        }
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
        </View>
    )
}

export default LineupView;
