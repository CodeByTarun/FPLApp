import { StyleSheet } from "react-native";
import { aLittleLighterColor, cornerRadius, height, largeFont, mediumFont, primaryColor, secondaryColor, textPrimaryColor, textSecondaryColor } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    
    modalContainer: {
        maxHeight: height * 0.75,
        width: '85%',
        padding: 10,
    },
    
    titleText: {
        fontSize: largeFont * 1.2,
        color: textPrimaryColor, 
        fontWeight: '600',
        textAlign: 'center',
        padding: 20,
        paddingBottom: 20
    },

    controlContainer: {
        width: '85%',
        flexDirection: 'row',
        marginBottom: 30,
        alignSelf: 'center',
        backgroundColor: secondaryColor,
        borderRadius: cornerRadius,
    },

    switch: {
        width: '25%',
        height: '100%',
        backgroundColor: primaryColor,
        position: 'absolute',
        zIndex: 1,
        borderRadius: cornerRadius,
    },

    controlButtons: {
        flex: 1,
        zIndex: 1,
    },

    controlText: {
        flex: 1,
        textAlign: 'center',
        padding: 5,
        paddingTop: 8,
        paddingBottom: 8,
        color: textSecondaryColor,
        fontWeight: '500',
        fontSize: mediumFont * 0.9,
    },

    sectionBorder: {
        borderWidth: 2,
        borderColor: aLittleLighterColor,
        borderRadius: cornerRadius,
        padding: 10,
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

    button: {
        height: 40,
        width: '50%',
        backgroundColor: secondaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: cornerRadius,
        marginBottom: 5,
        alignSelf: 'center'
    },

    buttonText: {
        color: textPrimaryColor,
        fontWeight: '500',
    }

});