// This will be where the fixture data will be used to create a detailed card 
// add a dropdown to show the bps for that match, this will happen when clicked on??? idk how 
// to incorporate this yet

import React, {  } from 'react'
import { View, Text } from 'react-native'
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
import { FixtureCardStyles } from './FixtureCardStyles'
import { AnimatedButton } from '../../Controls';
import { useTheme } from '@react-navigation/native';

interface FixtureCardProp {
    overview: FplOverview;
    fixture: FplFixture;
    gameweekData: FplGameweek;
}

const SetScoreAndTime = (fixture: FplFixture, gameweek: FplGameweek, styles) => {

    if (fixture !== undefined) {
        if (fixture.finished_provisional == true) {
           return <><Text style={styles.scoreText}>{fixture.team_h_score} - {fixture.team_a_score}</Text>
                    <Text testID='finishedFixtureText' style={styles.fullTimeText}>FT</Text></>
        } else if (fixture.started == true) {
            let score = GetScoreForLiveFixture(fixture, gameweek);
           return <><Text style={styles.scoreText}>{score[0]} - {score[1]}</Text>
                    <Text testID='liveFixtureText' style={styles.timeText}>{GetHighestMinForAPlayer(fixture, gameweek) + "'"}</Text></>
        } else {
            return <Text testID='notStarted' style={[styles.scoreText, {marginBottom: 15}]}>vs</Text>
        }
    }
}

const FixtureCard = ({overview, fixture, gameweekData} : FixtureCardProp) => {

    const theme = useTheme();
    const styles = FixtureCardStyles(theme);

    const dispatch = useAppDispatch();
    const navigation = useAppSelector(state => state.navigation);
    const liveGameweek = useAppSelector(state => state.team.liveGameweek);
    
    const showFixture = () => {
        if (navigation.screenType === ScreenTypes.Fixtures) {
            dispatch(goToMainScreen());   
        }
        dispatch(changeToFixture(fixture));
    }

    return (
        
        <View style={[styles.fixtureViewContainer, { marginBottom: (navigation.screenType === ScreenTypes.Fixtures) ? -5 : 0 }]}>
            <AnimatedButton buttonFn={showFixture} disabled={((fixture.event !== null) && (fixture.event > liveGameweek))}>   
                <View style={[styles.card, globalStyles.shadow]}>
                    <View style={styles.topbar}>
                        <Text style={styles.datetext}>
                            { moment(fixture.kickoff_time).tz(timezone).format('MMM D, h:mm A') }
                        </Text>
                    </View>
                    <View style={styles.scoreView}>
                        <TeamEmblem team={GetTeamDataFromOverviewWithFixtureTeamID(fixture.team_h, overview)}/>
                        <View style={styles.scoreAndTimeView}>
                            { SetScoreAndTime(fixture, gameweekData, styles) }
                        </View>
                        <TeamEmblem team={GetTeamDataFromOverviewWithFixtureTeamID(fixture.team_a, overview)}/>
                    </View>
                </View>
            </AnimatedButton>
        </View>
    )
}

export default FixtureCard;