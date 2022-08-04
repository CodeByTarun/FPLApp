import { StyleSheet } from "react-native";
import { textPrimaryColor, mediumFont, textSecondaryColor, fieldColor, redColor } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    container: {
        alignItems: 'center'
    },

    headerText: {
        color: textPrimaryColor,
        padding: 5,
        marginRight: 5,
        fontSize: mediumFont,
        textAlign: 'center',
        fontWeight: '500'
    },

    valueText: {
        color: textSecondaryColor,
        fontSize: mediumFont,
        flex: 1,
        padding: 5,
        marginRight: 5,
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