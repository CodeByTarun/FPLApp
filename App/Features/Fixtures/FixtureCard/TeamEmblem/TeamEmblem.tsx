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
            <><Image testID="teamImage" style={styles.emblems} source={Emblems[team.code]} resizeMode='contain' />
              <Text testID="teamText" style={{ fontSize: 0.025 * GlobalConstants.width, alignSelf: 'center', color: GlobalConstants.textPrimaryColor, paddingTop: 2 }}>{ team.short_name }</Text></>
            }
        </View>
    )
}

export default TeamEmblem;