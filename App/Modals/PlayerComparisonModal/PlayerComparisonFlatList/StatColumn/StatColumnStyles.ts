import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { mediumFont, fieldColor, redColor } from "../../../../Global/GlobalConstants";

export const StatColumnStyles = (theme: Theme) => StyleSheet.create({

    container: {
        alignItems: 'center'
    },

    headerText: {
        color: theme.colors.text,
        padding: scale(5),
        marginRight: scale(5),
        fontSize: mediumFont,
        textAlign: 'center',
        fontWeight: '500'
    },

    valueText: {
        color: theme.colors.notification,
        fontSize: mediumFont * 1.05,
        flex: 1,
        padding: scale(3),
        marginRight: scale(5),
        textAlign: 'center'
    },

    greenText: {
        color: fieldColor,
        fontWeight: 'bold'
    },

    redText: {
        color: redColor,
        fontWeight: 'bold'
    }

});