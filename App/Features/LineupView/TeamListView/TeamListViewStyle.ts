import { StyleSheet } from "react-native";
import { cornerRadius, height, mediumFont, primaryColor, secondaryColor, textPrimaryColor, textSecondaryColor, width } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    container: {
        width: width * 0.45,
        maxHeight: height * 0.4,
        backgroundColor: primaryColor,
        minHeight: height * 0.2,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: cornerRadius
    },

    titleText: {
        fontSize: mediumFont*1.1,
        color: textPrimaryColor,
        alignSelf: 'center',
        padding: 5,
        paddingTop: 10,
        fontWeight: '600',
    },

    scollView: {
        minHeight: height * 0.2,
    },

    button: {
        paddingTop: 10,
        paddingBottom: 10,
    },

    buttonText: {
        paddingLeft: 10,
        color: textSecondaryColor,
        fontSize: mediumFont * 0.95,
    },

    addTeamButton: {
        backgroundColor: secondaryColor,
        borderRadius: cornerRadius,
    },

    addTeamButtonText: {
        color: textSecondaryColor,
        fontSize: mediumFont * 0.95,
        padding: 10,
    }

});