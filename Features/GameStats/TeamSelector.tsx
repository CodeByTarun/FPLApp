import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as GlobalConstants from "../../Global/GlobalConstants";
import TeamSwitch from "./TeamSwitch";

const onMyTeamButtonPress = () => {

}

const TeamSelector = () => {
    return (
        <View style={styles.container}>
            <View style={styles.switchContainer}>
                <TeamSwitch/>
            </View>
            <TouchableOpacity style={styles.myTeamButton} onPress={onMyTeamButtonPress}>
                <Text style={styles.text}>My Team</Text>
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
        },

        myTeamButton: {
            justifyContent: 'center',
            alignSelf: 'center',
            position: 'absolute',
            right: 0,
            backgroundColor: GlobalConstants.buttonColor,
            borderRadius: GlobalConstants.cornerRadius,
            width: 70,
            height: '70%'   
        },

        text: {
            alignSelf: 'center'
        }
    }
)

export default TeamSelector; 