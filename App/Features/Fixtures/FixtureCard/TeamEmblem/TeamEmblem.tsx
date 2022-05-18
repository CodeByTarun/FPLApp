import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import * as GlobalConstants from "../../../../Global/GlobalConstants"
import { Emblems } from "../../../../Global/Images";
import {  Team } from "../../../../Models/FplOverview";
import { styles } from "./TeamEmblemStyles";

interface TeamEmblemProp {
    team: Team | undefined;
}

const TeamEmblem = ({team}: TeamEmblemProp) => {

    return (
        <View style={styles.teamInfoView}>
            {(team) &&
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image testID="teamImage" style={styles.emblems} source={Emblems[team.code]} resizeMode='contain' />
                <Text testID="teamText" style={styles.text}>{ team.short_name }</Text>
            </View>
            }
        </View>
    )
}

export default TeamEmblem;