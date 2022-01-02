import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import * as GlobalConstants from "../../Global/GlobalConstants"

const TeamEmblem = () => {
    return (
        <View style={styles.teamInfoView}>
            <Image style={styles.emblems} source={require('../../assets/emblems/t1.png')} resizeMode='contain'/>
            <Text style={{fontSize: 0.025 * GlobalConstants.width, alignSelf: 'center'}}>MUN</Text>
        </View>
    )
}

const styles = StyleSheet.create(
    {
        teamInfoView: {
            width: '40%',
            justifyContent: 'center'
        },

        emblems: {
            alignSelf: 'center',
            width: '100%',
            height: '65%',
        },
    }
)

export default TeamEmblem;