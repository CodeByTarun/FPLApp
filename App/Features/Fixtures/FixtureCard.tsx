// This will be where the fixture data will be used to create a detailed card 
// add a dropdown to show the bps for that match, this will happen when clicked on??? idk how 
// to incorporate this yet

import React, { useEffect } from 'react'
import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity } from 'react-native'
import * as GlobalConstants from "../../Global/GlobalConstants"
import { FplFixture } from '../../Models/FplFixtures'
import TeamEmblem from "./TeamEmblem"
import moment from 'moment-timezone';
import * as Localization from 'expo-localization'
import { useGetGameweekDataQuery, useGetOverviewQuery } from '../../Store/fplSlice'
import { useAppDispatch } from '../../Store/hooks'
import { changeToFixture } from '../../Store/teamSlice'
import { GetHighestMinForAPlayer, GetTeamDataFromOverviewWithFixtureTeamID } from '../../Helpers/FplAPIHelpers'
import { FplGameweek } from '../../Models/FplGameweek'
import { FplOverview } from '../../Models/FplOverview'
import globalStyles from '../../Global/GlobalStyles'

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

    const onPress = () => {

        if (prop.fixture) {
            dispatch(changeToFixture(prop.fixture))
        }
    };

    return (
        
        <View style={[styles.container]}>
            <TouchableOpacity style={[styles.button]} onPress={onPress} disabled={!prop.fixture?.started}>            
            { (prop.fixture && prop.overviewData && prop.gameweekData) &&
                <View style={[styles.card]}>
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

const styles = StyleSheet.create({

    //#region main layout
    container: {
        height: '100%',
        width: GlobalConstants.width * 0.334,
    },

    button: {
        flex: 1,
    },

    card: {
        backgroundColor: GlobalConstants.primaryColor,
        height: '100%',
        flexDirection: 'column',
        padding: 5,
        borderLeftColor: GlobalConstants.secondaryColor,
        borderRightColor: GlobalConstants.secondaryColor,
        borderLeftWidth: 0,
        borderRightWidth: 1,
    },
    //#endregion

    //#region  top bar
    topbar: {
        alignSelf: 'center',
        height: '25%',
        width: '100%',
    },

    datetext: {
        fontSize: 0.03 * GlobalConstants.width,
        alignSelf: 'center',
        paddingLeft: 5,
        color: GlobalConstants.textPrimaryColor
    },

    //#endregion
    
    //#region score
    scoreView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        padding: 3,
    },

    scoreAndTimeView: {
        paddingBottom: 5
    },

    scoreText: {
        fontSize: 0.04 * GlobalConstants.width,
        alignSelf: 'center',
        margin: 2,
        color: GlobalConstants.textPrimaryColor,
    },

    timeText: {
        fontSize: 0.025 * GlobalConstants.width,
        alignSelf: 'center',
        color: 'red',
        fontWeight: "bold",
        marginLeft: 3
    },

    fullTimeText: {
        fontSize: 0.025 * GlobalConstants.width,
        alignSelf: 'center',
        color: 'gray'
    }
    //#endregion
});

export default FixtureCard;