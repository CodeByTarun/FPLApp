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
import { GetHighestMinForAPlayer, GetTeamDataFromOverviewWithFixtureTeamID } from '../../../Helpers/FplAPIHelpers'
import { FplGameweek } from '../../../Models/FplGameweek'
import { FplOverview } from '../../../Models/FplOverview'
import globalStyles from '../../../Global/GlobalStyles'
import { goToMainScreen, ScreenTypes } from '../../../Store/navigationSlice'
import { styles } from './FixtureCardStyles'

interface FixtureCardProp {
    fixture: FplFixture | undefined;
    gameweekData: FplGameweek | undefined;
    overviewData: FplOverview | undefined;
}

const SetScoreAndTime = (fixture: FplFixture, gameweek: FplGameweek | undefined) => {

    if (fixture !== undefined) {
        if (fixture.finished_provisional == true) {
           return <><Text style={styles.scoreText}>{fixture.team_h_score} - {fixture.team_a_score}</Text>
                    <Text style={styles.fullTimeText}>FT</Text></>
        } else if (fixture.started == true && gameweek !== undefined) {
           return <><Text style={styles.scoreText}>{fixture.team_h_score} - {fixture.team_a_score}</Text>
                    <Text style={styles.timeText}>{GetHighestMinForAPlayer(fixture, gameweek) + "'"}</Text></>
        } else {
            return <Text style={[styles.scoreText, {paddingBottom: 10}]}>vs</Text>
        }
    }
}

const FixtureCard = (prop : FixtureCardProp) => {

    const dispatch = useAppDispatch();
    const navigation = useAppSelector(state => state.navigation);

    const onPress = () => {

        if (navigation.screenType === ScreenTypes.Fixtures) {
            dispatch(goToMainScreen());
        }

        if (prop.fixture) {
            dispatch(changeToFixture(prop.fixture))
        }
    };

    return (
        
        <View style={[styles.container]}>
            <TouchableOpacity style={[styles.button]} onPress={onPress} disabled={!prop.fixture?.started}>            
            { (prop.fixture && prop.overviewData && prop.gameweekData) &&
                <View style={[styles.card, globalStyles.shadow]}>
                    <View style={styles.topbar}>
                        <Text style={styles.datetext}>
                            { moment(prop.fixture.kickoff_time).tz(Localization.timezone).format('MMM D, H:mm z') }
                        </Text>
                    </View>
                    <View style={styles.scoreView}>
                        <TeamEmblem team={GetTeamDataFromOverviewWithFixtureTeamID(prop.fixture.team_h, prop.overviewData)}/>
                        <View style={styles.scoreAndTimeView}>
                            { SetScoreAndTime(prop.fixture, prop.gameweekData) }
                        </View>
                        <TeamEmblem team={GetTeamDataFromOverviewWithFixtureTeamID(prop.fixture.team_a, prop.overviewData)}/>
                    </View>
                </View>
            }
            </TouchableOpacity>
        </View>
    )
}

export default FixtureCard;