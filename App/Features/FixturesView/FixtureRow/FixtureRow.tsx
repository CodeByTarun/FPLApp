import { useTheme } from "@react-navigation/native";
import { timezone } from "expo-localization";
import moment from "moment";
import React from "react";
import { View, Text, Image } from "react-native";
import { Separator } from "../../../Global/GlobalComponents";
import { Emblems } from "../../../Global/Images";
import { GetHighestMinForAPlayer, GetScoreForLiveFixture } from "../../../Helpers/FplAPIHelpers";
import { FplFixture } from "../../../Models/FplFixtures";
import { FplGameweek } from "../../../Models/FplGameweek";
import { FplOverview } from "../../../Models/FplOverview";
import { useAppDispatch, useAppSelector } from "../../../Store/hooks";
import { goToMainScreen, ScreenTypes } from "../../../Store/navigationSlice";
import { changeToFixture } from "../../../Store/teamSlice";
import { AnimatedButton } from "../../Controls";
import { FixtureRowStyle } from "./FixtureRowStyle";

interface FixtureRowProps {
    fixture: FplFixture;
    overview: FplOverview;
    gameweekData: FplGameweek;    
}

const FixtureRow = ({fixture, overview, gameweekData} : FixtureRowProps) => {

    const theme = useTheme();
    const styles = FixtureRowStyle(theme);
    const liveGameweek = useAppSelector(state => state.team.liveGameweek);
    const navigation = useAppSelector(state => state.navigation);
    const dispatch = useAppDispatch();

    let homeTeamCode = overview.teams.find(team => team.id === fixture.team_h )?.code;
    let awayTeamCode = overview.teams.find(team => team.id === fixture.team_a )?.code;

    const showFixture = () => {
        if (navigation.screenType === ScreenTypes.Fixtures) {
            dispatch(goToMainScreen());   
        }
        dispatch(changeToFixture(fixture));
    }

    return (
        <View style={styles.container}>
            
            <AnimatedButton buttonFn={showFixture} disabled={((fixture.event !== null) && (fixture.event > liveGameweek))}>
                <View style={styles.rowContainer}>
                    <View style={styles.teamInfoContainer}>
                        <View style={styles.teamNameContainer}>
                            <Text style={[styles.text, styles.homeTeam]}>{overview.teams.find(team => team.id === fixture.team_h )?.name}</Text>
                        </View>
                        <View style={styles.teamEmblemContainer}>
                            { homeTeamCode && 
                                <Image testID="teamImage" style={styles.emblem} source={Emblems[homeTeamCode]} resizeMode='contain' />
                            }
                        </View>
                    </View>
                    <View style={styles.scoreContainer}>
                        <View style={styles.aboveAndBelowScore}>
                            {getTimeText(fixture, gameweekData, styles)}
                        </View>
                        { getScoreText(fixture, gameweekData, styles) }
                        <View style={styles.aboveAndBelowScore}>

                        </View>
                    </View>
                    <View style={styles.teamInfoContainer}>
                        <View style={styles.teamEmblemContainer}> 
                            { awayTeamCode && 
                                <Image testID="teamImage" style={styles.emblem} source={Emblems[awayTeamCode]} resizeMode='contain' />
                            }
                        </View>
                        <View style={styles.teamNameContainer}>
                            <Text style={[styles.text, styles.awayTeam]}>{overview.teams.find(team => team.id === fixture.team_a )?.name}</Text>
                        </View>
                    </View>
                </View>
            </AnimatedButton>
        </View>
    )

}

export default FixtureRow;

function getScoreText(fixture: FplFixture, gameweek: FplGameweek, styles) {
    if (fixture !== undefined) {
        if (fixture.finished_provisional) {
            return  <Text style={styles.text}>{fixture.team_h_score} - {fixture.team_a_score}</Text>;
        }
        else if (fixture.started) {
            let score = GetScoreForLiveFixture(fixture, gameweek);
            return <Text style={styles.text}>{score[0]} - {score[1]}</Text>;
        }
        else {
            return (
                <>
                    <Text style={styles.text}>{moment(fixture.kickoff_time).tz(timezone).format('h:mm')}</Text>
                    <Text style={styles.text}>{moment(fixture.kickoff_time).tz(timezone).format('A')}</Text>
                </>
            )
        }
    }
    else {
        return '';
    }
}

function getTimeText(fixture: FplFixture, gameweek: FplGameweek, styles) {

    if (fixture !== undefined) {
        if (fixture.finished_provisional) {
            return <Text style={[styles.fullTimeText]}>FT</Text>;
        }
        else if (fixture.started) {
            return <Text style={[styles.timeText]}>{GetHighestMinForAPlayer(fixture, gameweek)}'</Text>;
        }
    }
    else {
        return null;
    }

}

// moment(fixture.kickoff_time).tz(timezone).format('h:mm a')