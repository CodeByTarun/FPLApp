import React from "react";
import { StyleSheet, View } from "react-native";
import { cornerRadius, primaryColor, secondaryColor, width } from "../../../Global/GlobalConstants";
import { styles } from "../FixtureCard/FixtureCardStyles";

const FixtureCardLoading = () => {

    return (
        <View style={styles.fixtureViewContainer}>
            <View style={[styles.card, {backgroundColor: secondaryColor}]}/>
        </View>
    )

}

export default FixtureCardLoading;