import { StyleSheet } from "react-native";
import { aLittleLighterColor, cornerRadius, height, largeFont, mediumFont, primaryColor, secondaryColor, smallFont, textPrimaryColor, textSecondaryColor } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    
    modalContainer: {
        height: height * 0.80,
        width: '85%',
        padding: 10,
        paddingTop: 20,
    },
    
    titleText: {
        fontSize: largeFont * 1.2,
        color: textPrimaryColor, 
        fontWeight: '600',
        textAlign: 'center',
        paddingBottom: 20,
        paddingTop: 10
    },

    text: {
        color: textPrimaryColor,
        fontSize: mediumFont * 0.9,
        fontWeight: '500',
    },

    controlsOuterContainers: {
        marginBottom: 20,
    },

    controlContainer: {
        width: '60%',
        height: height * 0.05,
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: secondaryColor,
        borderRadius: cornerRadius,
    },

    switch: {
        width: '33.3333%',
        height: '100%',
        backgroundColor: primaryColor,
        position: 'absolute',
        zIndex: 1,
        borderRadius: cornerRadius,
    },

    controlButtons: {
        flex: 1,
        zIndex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    controlText: {
        textAlign: 'center',
        color: textSecondaryColor,
        fontWeight: '600',
        fontSize: mediumFont * 0.9,
    },

    button: {
        height: 40,
        width: '50%',
        backgroundColor: secondaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: cornerRadius,
        marginBottom: 5,
        marginTop: 15,
        padding: 10,
        alignSelf: 'center'
    },

    buttonText: {
        color: textPrimaryColor,
        fontWeight: '500',
    },

    searchBox: {
        flex: 1,
        alignSelf: 'center',
        color: textPrimaryColor,
    },
});