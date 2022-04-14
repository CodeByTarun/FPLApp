import React, { useRef } from "react";
import { View, StyleSheet, Image, Text, Animated, LayoutChangeEvent, TouchableWithoutFeedback } from "react-native";
import { FixtureInfo, TeamInfo, TeamTypes, toggleTeamShown } from "../../../Store/teamSlice";
import { useGetOverviewQuery } from "../../../Store/fplSlice";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import * as GlobalConstants from '../../../Global/GlobalConstants'
import { GetScoreForLiveFixture, GetTeamDataFromOverviewWithFixtureTeamID } from "../../../Helpers/FplAPIHelpers";
import { Emblems } from "../../../Global/Images";
import globalStyles from "../../../Global/GlobalStyles";
import { FplOverview } from "../../../Models/FplOverview";
import { FplFixture } from "../../../Models/FplFixtures";
import { styles } from "./TeamSwitchStyles";
import { FplGameweek } from "../../../Models/FplGameweek";

// This is going to be a switch selector control
// First i need a background,
// Place the colored blurb over the left team
// Put the text for the team names and the touchable opacity at the top level

var viewWidth: number;

const getViewWidth= (event: LayoutChangeEvent) => {
    viewWidth = event.nativeEvent.layout.width;
}

interface TeamSwitchProps {
    overview: FplOverview,
    fixtures: FplFixture[],
    gameweek: FplGameweek,
}

const getTeamScore = (fixtures: FplFixture[], gameweek: FplGameweek, teamInfo: FixtureInfo, isHome: boolean) => {

    let fixture = fixtures.find(fixture => fixture.id === teamInfo.fixture!.id);

    if (fixture) {
        if (fixture.started && !fixture.finished_provisional) {
            let score = GetScoreForLiveFixture(fixture, gameweek);
            return isHome ? score[0] : score[1];
        } else {
            return isHome ? fixture.team_h_score : fixture.team_a_score;
        }
    }

    else return 0;

}

const TeamSwitch = ({overview, fixtures, gameweek}: TeamSwitchProps) => {

    const teamInfo: TeamInfo = useAppSelector((state) => state.team);
    const dispatch = useAppDispatch();

    const translateAnim = useRef(new Animated.Value(0)).current; 
    
    const switchTeam = () => {
        if (teamInfo.teamType === TeamTypes.Fixture) {

            Animated.spring(translateAnim, {
                toValue: teamInfo.isHome ? viewWidth / 2 + 2 : 0,
                friction: 10,
                useNativeDriver: true
            }).start();

            dispatch(toggleTeamShown());
        }
    }

    return (
        <View style={styles.container} onLayout={(event) => getViewWidth(event)}>
            { (teamInfo.teamType === TeamTypes.Fixture && teamInfo.fixture !== null && overview !== undefined) &&
            
            <TouchableWithoutFeedback style={{flex: 1, flexDirection: 'row'}} onPress={switchTeam}>
            
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Animated.View style={[styles.highlight, { transform: [{translateX: translateAnim}] }, globalStyles.shadow, {shadowOpacity: 0.2, shadowRadius: 5 }]}/>
                    <View style={[styles.buttonContainer]}>
                        <View style={{ flex: 1 }}>
                            <Image style={styles.emblems} source={Emblems[GetTeamDataFromOverviewWithFixtureTeamID(teamInfo.fixture.team_h, overview).code]} resizeMode='contain'/>
                        </View>
                        <Text style={[styles.scoreText]}>{getTeamScore(fixtures, gameweek, teamInfo, true)}</Text>
                    </View>
                    <Text> </Text>
                    <View style={styles.buttonContainer}>
                        <Text style={[styles.scoreText]}>{getTeamScore(fixtures, gameweek, teamInfo, false)}</Text>
                        <View style={{ flex: 1 }}>
                            <Image style={styles.emblems} source={Emblems[GetTeamDataFromOverviewWithFixtureTeamID(teamInfo.fixture.team_a, overview).code]} resizeMode='contain'/>
                        </View>
                    </View>
                    
                </View>
            </TouchableWithoutFeedback>
            }
        </View>
    )
}

export default TeamSwitch;