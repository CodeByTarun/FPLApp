// This will be where the fixture data will be used to create a detailed card 
// add a dropdown to show the bps for that match, this will happen when clicked on??? idk how 
// to incorporate this yet

import React from 'react'
import { View, StyleSheet, Text, Dimensions, Image } from 'react-native'
import * as GlobalConstants from "../../Global/GlobalConstants"
import { FplFixtures } from '../../Models/FplFixtures'
import { FplOverview } from '../../Models/FplOverview'
import TeamEmblem from "./TeamEmblem"
import moment from 'moment-timezone';
import * as RNLocalize from 'react-native-localize'

interface FixtureCardProp {
    fixture: FplFixtures | undefined;
    overview: FplOverview | undefined;
}

const FixtureCard = (prop : FixtureCardProp) => {

    return (
        
            <View style={styles.container}>
                { (prop.fixture !== undefined && prop.overview !== undefined) &&
                    <View style={styles.card}>
                        <View style={styles.topbar}>
                            <Text style={styles.datetext}>
                                { RNLocalize.getTimeZone() }
                            </Text>
                        </View>
                        <View style={styles.scoreview}>
                            <TeamEmblem/>
                            <Text style={styles.scoretext}>vs</Text>
                            <TeamEmblem/>
                        </View>
                    </View>
                }
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
    scoreview: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexGrow: 1,
        padding: 3,
    },

    scoretext: {
        fontSize: 0.03 * GlobalConstants.width,
        alignSelf: 'center',
        margin: 5,
    },
    //#endregion
});

export default FixtureCard;