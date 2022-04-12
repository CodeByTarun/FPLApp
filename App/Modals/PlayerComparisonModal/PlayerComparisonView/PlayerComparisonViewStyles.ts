import { StyleSheet } from "react-native";
import { aLittleLighterColor, cornerRadius, primaryColor, largeFont, textPrimaryColor, textSecondaryColor, mediumFont, height } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    sectionBorder: {
        borderWidth: 2,
        borderColor: aLittleLighterColor,
        borderRadius: cornerRadius,
        padding: 10,
        marginBottom: 20
    },

    closeButtonContainer: {
        position: 'absolute', 
        height: height* 0.03, 
        width: height* 0.03, 
        top: -14, 
        left: -5, 
        backgroundColor: primaryColor
    },

    sectionNameText: {
        backgroundColor: primaryColor,
        fontSize: largeFont,
        fontWeight: 'bold',
        color: textPrimaryColor,
        position: 'absolute',
        top: -20, 
        left: 15,
        padding: 5,
        maxWidth: '75%'
    },

    sectionCostText: {
        backgroundColor: primaryColor,
        fontSize: largeFont,
        fontWeight: 'bold',
        color: textPrimaryColor,
        position: 'absolute',
        top: -20, 
        right: 15,
        padding: 5
    },

    statViewContainer: {
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingTop: 10, 
        paddingBottom: 10
    },

    statNameText: {
        color: textSecondaryColor,
        fontSize: mediumFont,
        fontWeight: '600',
        paddingBottom: 3
    },

    statValueText: {
        color: textPrimaryColor,
        fontSize: mediumFont,
    },
});