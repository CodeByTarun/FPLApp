import React from "react";
import { View } from "react-native";
import { secondaryColor } from "../../../Global/GlobalConstants";
import { styles } from "../FixtureCard/FixtureCardStyles";

const FixtureCardLoading = () => {

    return (
        <View style={styles.fixtureViewContainer}>
            <View style={[styles.card, {backgroundColor: secondaryColor}]}/>
        </View>
    )

}

export default FixtureCardLoading;