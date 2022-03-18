import React, { useRef } from "react";
import { View, StyleSheet, Image, Text, Animated, LayoutChangeEvent, TouchableWithoutFeedback } from "react-native";
import { TeamInfo, TeamTypes, toggleTeamShown } from "../../Store/teamSlice";
import { useGetOverviewQuery } from "../../Store/fplSlice";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import * as GlobalConstants from '../../Global/GlobalConstants'
import { GetTeamDataFromOverviewWithFixtureTeamID } from "../../Helpers/FplAPIHelpers";
import { Emblems } from "../../Global/Images";
import globalStyles from "../../Global/GlobalStyles";

// This is going to be a switch selector control
// First i need a background,
// Place the colored blurb over the left team
// Put the text for the team names and the touchable opacity at the top level

var viewWidth: number;

const getViewWidth= (event: LayoutChangeEvent) => {
    viewWidth = event.nativeEvent.layout.width;
}

const TeamSwitch = () => {

    const teamInfo: TeamInfo = useAppSelector((state) => state.team);
    const overview = useGetOverviewQuery();
    const dispatch = useAppDispatch();

    const translateAnim = useRef(new Animated.Value(0)).current; 
    

    const switchTeam = () => {

        if (teamInfo.teamType === TeamTypes.Fixture) {

            Animated.spring(translateAnim, {
                toValue: teamInfo.isHome ? viewWidth / 2 + 2 : 0,
                friction: 10,
                useNativeDriver: true
            }).start()

            dispatch(toggleTeamShown());

        }
    }

    return (
        <View style={styles.container} onLayout={(event) => getViewWidth(event)}>
            { (teamInfo.teamType === TeamTypes.Fixture && teamInfo.fixture !== null && overview.data !== undefined) &&
            
            <TouchableWithoutFeedback style={{flex: 1, flexDirection: 'row'}} onPress={switchTeam}>
            
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <Animated.View style={[styles.highlight, {transform: [{translateX: translateAnim}] }, globalStyles.shadow, {shadowOpacity: 0.2, shadowRadius: 5 }]}/>
                    <View style={[styles.buttonContainer]}>
                        <View style={{ flex: 1 }}>
                            <Image style={styles.emblems} source={Emblems[GetTeamDataFromOverviewWithFixtureTeamID(teamInfo.fixture.team_h, overview.data).code]} resizeMode='contain' />
                        </View>
                        <Text style={[styles.scoreText]}>{teamInfo.fixture.team_h_score}</Text>
                    </View>
                    <Text> </Text>
                    <View style={styles.buttonContainer}>
                        <Text style={[styles.scoreText]}>{teamInfo.fixture.team_a_score}</Text>
                        <View style={{ flex: 1 }}>
                            <Image style={styles.emblems} source={Emblems[GetTeamDataFromOverviewWithFixtureTeamID(teamInfo.fixture.team_a, overview.data).code]} resizeMode='contain' />
                        </View>
                    </View>
                    
                </View>
            </TouchableWithoutFeedback>
            }
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            margin: 6,
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: GlobalConstants.secondaryColor,
            borderRadius: GlobalConstants.cornerRadius,
        },

        highlight: {
            height: "100%",
            width: "50%",
            position: 'absolute',
            left: -1,
            backgroundColor: GlobalConstants.primaryColor,
            borderRadius: GlobalConstants.cornerRadius,
        },

        buttonContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 7,
            elevation: 10,
        },

        emblems: {
            flex:1,
            resizeMode: 'contain',
            alignSelf: 'flex-start',
            height: '100%',
            width: '100%',
         },

        scoreText: {
            marginLeft: 3,
            marginRight: 3,
            fontWeight: '700',
            color: GlobalConstants.textPrimaryColor
        },
    }
);

export default TeamSwitch;