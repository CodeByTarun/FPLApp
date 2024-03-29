import React, {  } from "react";
import { View, Image, Text, TouchableWithoutFeedback } from "react-native";
import { FixtureInfo, TeamInfo, TeamTypes, toggleTeamShown } from "../../../Store/teamSlice";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { GetScoreForLiveFixture, GetTeamDataFromOverviewWithFixtureTeamID } from "../../../Helpers/FplAPIHelpers";
import { Emblems } from "../../../Global/Images";
import globalStyles from "../../../Global/GlobalStyles";
import { FplOverview } from "../../../Models/FplOverview";
import { FplFixture } from "../../../Models/FplFixtures";
import { TeamSwitchStyles } from "./TeamSwitchStyles";
import { FplGameweek } from "../../../Models/FplGameweek";
import { animated, useSpring } from "@react-spring/native";
import { useTheme } from "@react-navigation/native";

const AnimatedView = animated(View);

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

    const theme = useTheme();
    const styles = TeamSwitchStyles(theme);

    const teamInfo: TeamInfo = useAppSelector((state) => state.team);
    const dispatch = useAppDispatch();

    const slideSpring = useSpring({ left: ((teamInfo.teamType === TeamTypes.Fixture) && teamInfo.isHome) ? '0%' : '50%', config: { clamp: true, mass: 3, tension: 250 } })
    
    const switchTeam = () => {
        dispatch(toggleTeamShown());
    }


    return (
        <View style={[styles.container]}>
            { (teamInfo.teamType === TeamTypes.Fixture && teamInfo.fixture !== null && overview !== undefined) &&
                <TouchableWithoutFeedback testID="teamSwitchButton" style={{flex: 1, flexDirection: 'row'}} onPress={switchTeam}>
                    <View style={{flex: 1}}>
                        <AnimatedView testID='animatedViewTeamSwitch' style={[styles.highlight, { left: slideSpring.left }, globalStyles.shadow]} children={undefined}/>
                    <View style={styles.switchContainer}>
                        
                        <View style={styles.buttonContainer}>
                            <View style={styles.emblemContainer}>
                                <Image style={styles.emblems} source={Emblems[GetTeamDataFromOverviewWithFixtureTeamID(teamInfo.fixture.team_h, overview).code]} resizeMode='contain'/>
                            </View>
                            { teamInfo.fixture.started &&
                                <Text style={[styles.scoreText]}>{getTeamScore(fixtures, gameweek, teamInfo, true)}</Text>
                            }
                        </View>
                        <Text> </Text>
                        <View style={styles.buttonContainer}>
                            { teamInfo.fixture.started &&
                                <Text style={[styles.scoreText]}>{getTeamScore(fixtures, gameweek, teamInfo, false)}</Text>
                            }
                            <View style={styles.emblemContainer}>
                                <Image style={styles.emblems} source={Emblems[GetTeamDataFromOverviewWithFixtureTeamID(teamInfo.fixture.team_a, overview).code]} resizeMode='contain'/>
                            </View>
                        </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            }
        </View>
    )
}

export default TeamSwitch;