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
import { fixtureChanged } from '../../Store/fixtureSlice'
import { GetTeamDataFromOverviewWithFixtureTeamID } from '../../Helpers/FplAPIHelpers'
import { FplGameweek } from '../../Models/FplGameweek'

interface FixtureCardProp {
    fixture: FplFixture | undefined;
    gameweekNumber: number;
}

const SetScoreAndTime = (fixture: FplFixture, gameweek: FplGameweek | undefined) => {

    if (fixture !== undefined) {
        if (fixture.finished_provisional == true) {
           return <><Text style={styles.scoreText}>{fixture.team_h_score} - {fixture.team_a_score}</Text>
                    <Text style={styles.timeText}>FT</Text></>
        } else if (fixture.started == true && gameweek !== undefined) {
           return <><Text style={styles.scoreText}>{fixture.team_h_score} - {fixture.team_a_score}</Text>
                    <Text style={styles.timeText}>{getHighestMinForAPlayer(fixture, gameweek) + "'"}</Text></>
        } else {
            return <Text style={styles.scoreText}>vs</Text>
        }
    }
}

function getHighestMinForAPlayer(fixture: FplFixture, gameweek: FplGameweek): number {
    var minutes = fixture.stats.filter(stat => stat.identifier === 'bps')[0].h
                               .map((stat) => gameweek.elements.find(element => element.id === stat.element)?.stats.minutes as number);

    return Math.max(...minutes)               
}

const FixtureCard = (prop : FixtureCardProp) => {

    const dispatch = useAppDispatch();
    const gameweekData = useGetGameweekDataQuery(prop.gameweekNumber)
    const overview = useGetOverviewQuery();

    const onPress = () => {

        if (prop.fixture !== undefined) {
            dispatch(fixtureChanged(prop.fixture))
        }
    };

    return (
        
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPress} disabled={!prop.fixture?.started}>            
            { (prop.fixture !== undefined && overview.data !== undefined && gameweekData.data !== undefined) &&
                <View style={styles.card}>
                    <View style={styles.topbar}>
                        <Text style={styles.datetext}>
                            { moment(prop.fixture.kickoff_time).tz(Localization.timezone).format('MMM D, H:mm z') }
                        </Text>
                    </View>
                    <View style={styles.scoreView}>
                        <TeamEmblem team={GetTeamDataFromOverviewWithFixtureTeamID(prop.fixture.team_h, overview.data)}/>
                        <View style={styles.scoreAndTimeView}>
                            { SetScoreAndTime(prop.fixture, gameweekData.data) }
                        </View>
                        <TeamEmblem team={GetTeamDataFromOverviewWithFixtureTeamID(prop.fixture.team_a, overview.data)}/>
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
        width: GlobalConstants.width * 0.33,
        paddingLeft: 5,
    },

    button: {
        flex: 1,
    },

    card: {
        backgroundColor: GlobalConstants.tertiaryColor,
        height: '100%',
        borderRadius: GlobalConstants.cornerRadius,
        flexDirection: 'column',
        padding: 4,
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
        color: 'gray'
    },

    //#endregion
    
    //#region score
    scoreView: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexGrow: 1,
        padding: 3,
    },

    scoreAndTimeView: {
    },

    scoreText: {
        fontSize: 0.04 * GlobalConstants.width,
        alignSelf: 'center',
        margin: 2,
    },

    timeText: {
        fontSize: 0.025 * GlobalConstants.width,
        alignSelf: 'center',
        color: 'gray'
    },
    //#endregion
});

export default FixtureCard;