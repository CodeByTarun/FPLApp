import { StyleSheet } from "react-native";
import { moderateScale, scale } from "react-native-size-matters";
import { textPrimaryColor, mediumFont, textSecondaryColor, fieldColor, redColor } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    container: {
        alignItems: 'center'
    },

    headerText: {
        color: textPrimaryColor,
        padding: scale(5),
        marginRight: scale(5),
        fontSize: mediumFont,
        textAlign: 'center',
        fontWeight: '500'
    },

    valueText: {
        color: textSecondaryColor,
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