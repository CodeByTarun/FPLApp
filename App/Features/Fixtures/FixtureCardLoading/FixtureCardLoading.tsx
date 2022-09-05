import { useTheme } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { FixtureCardStyles } from "../FixtureCard/FixtureCardStyles";

const FixtureCardLoading = () => {

    const theme = useTheme();
    const styles = FixtureCardStyles(theme);

    return (
        <View testID="fixtureCardLoading" style={styles.fixtureViewContainer}>
            <View style={[styles.card, {backgroundColor: theme.colors.background}]}/>
        </View>
    )

}

export default FixtureCardLoading;