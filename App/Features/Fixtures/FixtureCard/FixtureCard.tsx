// This will be where the fixture data will be used to create a detailed card 
// add a dropdown to show the bps for that match, this will happen when clicked on??? idk how 
// to incorporate this yet

import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { FplFixture } from '../../../Models/FplFixtures'
import TeamEmblem from "./TeamEmblem"
import moment from 'moment-timezone';
import * as Localization from 'expo-localization'
import { useAppDispatch, useAppSelector } from '../../../Store/hooks'
import { changeToFixture } from '../../../Store/teamSlice'
import { GetHighestMinForAPlayer, GetScoreForLiveFixture, GetTeamDataFromOverviewWithFixtureTeamID } from '../../../Helpers/FplAPIHelpers'
import { FplGameweek } from '../../../Models/FplGameweek'
import { FplOverview } from '../../../Models/FplOverview'
import globalStyles from '../../../Global/GlobalStyles'
import { goToMainScreen, ScreenTypes } from '../../../Store/navigationSlice'
import { styles } from './FixtureCardStyles'

interface FixtureCardProp {
    overview: FplOverview;
    fixture: FplFixture;
    gameweekData: FplGameweek;
}

const SetScoreAndTime = (fixture: FplFixture, gameweek: FplGameweek) => {

    if (fixture !== undefined) {
        if (fixture.finished_provisional == true) {
           return <><Text style={styles.scoreText}>{fixture.team_h_score} - {fixture.team_a_score}</Text>
                    <Text style={styles.fullTimeText}>FT</Text></>
        } else if (fixture.started == true) {
            let score = GetScoreForLiveFixture(fixture, gameweek);
           return <><Text style={styles.scoreText}>{score[0]} - {score[1]}</Text>
                    <Text style={styles.timeText}>{GetHighestMinForAPlayer(fixture, gameweek) + "'"}</Text></>
        } else {
            return <Text style={[styles.scoreText, {paddingBottom: 10}]}>vs</Text>
        }
    }
}

const FixtureCard = ({overview, fixture, gameweekData} : FixtureCardProp) => {

    const dispatch = useAppDispatch();
    const navigation = useAppSelector(state => state.navigation);

    const onPress = () => {

        if (navigation.screenType === ScreenTypes.Fixtures) {
            dispatch(goToMainScreen());
        }

        if (fixture) {
            dispatch(changeToFixture(fixture))
        }
    };

    return (
        
        <View style={[styles.container]}>
            <TouchableOpacity style={[styles.button]} onPress={onPress} disabled={!fixture?.started}>            
            { (fixture && overview && gameweekData) &&
                <View style={[styles.card, globalStyles.shadow]}>
                    <View style={styles.topbar}>
                        <Text style={styles.datetext}>
                            { moment(fixture.kickoff_time).tz(Localization.timezone).format('MMM D, H:mm z') }
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
            }
            </TouchableOpacity>
        </View>
    )
}

export default FixtureCard;