// This will be where the fixture data will be used to create a detailed card 
// add a dropdown to show the bps for that match, this will happen when clicked on??? idk how 
// to incorporate this yet

import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Pressable } from 'react-native'
import { FplFixture } from '../../../Models/FplFixtures'
import TeamEmblem from "./TeamEmblem"
import moment from 'moment-timezone';
import { timezone } from 'expo-localization'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import { changeToFixture } from '../../../Store/teamSlice'
import { GetHighestMinForAPlayer, GetScoreForLiveFixture, GetTeamDataFromOverviewWithFixtureTeamID } from '../../../Helpers/FplAPIHelpers'
import { FplGameweek } from '../../../Models/FplGameweek'
import { FplOverview } from '../../../Models/FplOverview'
import globalStyles from '../../../Global/GlobalStyles'
import { goToMainScreen, ScreenTypes } from '../../../Store/navigationSlice'
import { styles } from './FixtureCardStyles'
import { animated, useSpring } from '@react-spring/native';

const AnimatedPressable = animated(Pressable);

interface FixtureCardProp {
    overview: FplOverview;
    fixture: FplFixture;
    gameweekData: FplGameweek;
}

const SetScoreAndTime = (fixture: FplFixture, gameweek: FplGameweek) => {

    if (fixture !== undefined) {
        if (fixture.finished_provisional == true) {
           return <><Text style={styles.scoreText}>{fixture.team_h_score} - {fixture.team_a_score}</Text>
                    <Text testID='finishedFixtureText' style={styles.fullTimeText}>FT</Text></>
        } else if (fixture.started == true) {
            let score = GetScoreForLiveFixture(fixture, gameweek);
           return <><Text style={styles.scoreText}>{score[0]} - {score[1]}</Text>
                    <Text testID='liveFixtureText' style={styles.timeText}>{GetHighestMinForAPlayer(fixture, gameweek) + "'"}</Text></>
        } else {
            return <Text testID='notStarted' style={[styles.scoreText, {paddingBottom: 10}]}>vs</Text>
        }
    }
}

const FixtureCard = ({overview, fixture, gameweekData} : FixtureCardProp) => {

    const dispatch = useAppDispatch();
    const navigation = useAppSelector(state => state.navigation);
    
    const [animatedStyle, api] = useSpring(() => ({ scale: 1 }));

    const onPress = () => {

        api.start({
            to: [
                { scale: 0.99 },
                { scale: 1 }
              ],
              config: {duration: 10},
              onRest: showFixture,
        });
    };

    const showFixture = () => {
        if (navigation.screenType === ScreenTypes.Fixtures) {
            dispatch(goToMainScreen());   
        }
        dispatch(changeToFixture(fixture));
    }

    return (
        
        <View style={[styles.fixtureViewContainer, { marginBottom: (navigation.screenType === ScreenTypes.Fixtures) ? -2.5 : 0 }]}>
            <AnimatedPressable testID='fixtureCardButton' style={[styles.button, { transform: [{scale: animatedStyle.scale}] }]} onPress={onPress} disabled={!fixture?.started}>            
                <View style={[styles.card, globalStyles.shadow]}>
                    <View style={styles.topbar}>
                        <Text style={styles.datetext}>
                            { moment(fixture.kickoff_time).tz(timezone).format('MMM D, H:mm z') }
                        </Text>
                    </View>
                    <View style={styles.scoreView}>
                        <TeamEmblem team={GetTeamDataFromOverviewWithFixtureTeamID(fixture.team_h, overview)}/>
                        <View style={styles.scoreAndTimeView}>
                            { SetScoreAndTime(fixture, gameweekData) }
                        </View>
                        <TeamEmblem team={GetTeamDataFromOverviewWithFixtureTeamID(fixture.team_a, overview)}/>
                    </View>
                </View>
            </AnimatedPressable>
        </View>
    )
}

export default FixtureCard;