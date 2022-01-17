import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import * as GlobalConstants from "../../Global/GlobalConstants";
import { useAppSelector } from "../../Store/hooks";
import { TeamInfo, TeamTypes } from "../../Store/teamSlice";
import TeamSwitch from "./TeamSwitch";

const onMyTeamButtonPress = () => {

}

const onDreamTeamPress = () => {

}

const TeamSelector = () => {

    const teamInfo: TeamInfo = useAppSelector((state) => state.team);

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.dreamTeamButton} onPress={onDreamTeamPress}>
                <Image style={styles.Icon} source={require('../../../assets/dreamteam.png')} resizeMode="contain"/>
            </TouchableOpacity>
            {(teamInfo.teamType === TeamTypes.Fixture) && 
            <View style={styles.switchContainer}>
                <TeamSwitch/>
            </View>
            }
            
            <TouchableOpacity style={styles.myTeamButton} onPress={onMyTeamButtonPress}>
            <Image style={styles.Icon} source={require('../../../assets/team.png')} resizeMode="contain"/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
        },

        switchContainer: {
            alignSelf: 'center',
            width: '40%'
        },

        dreamTeamButton: {
            justifyContent: 'center',
            alignSelf: 'center',
            position: 'absolute',
            left: 5,
            backgroundColor: GlobalConstants.buttonColor,
            borderRadius: GlobalConstants.cornerRadius,
            width: GlobalConstants.width*0.1,
            height: '70%',
        },

        Icon: {
            width: '80%',
            height: '80%',
            alignSelf: 'center'
        },

        myTeamButton: {
            justifyContent: 'center',
            alignSelf: 'center',
            position: 'absolute',
            right: 5,
            backgroundColor: GlobalConstants.buttonColor,
            borderRadius: GlobalConstants.cornerRadius,
            width: GlobalConstants.width*0.1,
            height: '70%'   
        },

        text: {
            alignSelf: 'center'
        }
    }
);

export default TeamSelector; 