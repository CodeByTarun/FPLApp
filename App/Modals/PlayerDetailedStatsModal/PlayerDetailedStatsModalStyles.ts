import { StyleSheet } from "react-native";
import { height, largeFont, textPrimaryColor, mediumFont, width, aLittleLighterColor, cornerRadius, primaryColor, secondaryColor } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    header: {
    },

    controlsContainer: {
        height: height*0.05,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 5,
    },

    titleText: {
        fontSize: largeFont * 1.3,
        color: textPrimaryColor,
        fontWeight: 'bold',
    }, 

    viewToggleStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'red',
        padding: 5,
    },

    text: {
        color: textPrimaryColor,
        fontSize: mediumFont * 0.9,
        fontWeight: '500',
    },

    tableTextContainer: {
        width: width*0.1,
        flex: 1,
    },

    headerText: {
        color: textPrimaryColor,
        fontSize: mediumFont * 0.9,
        fontWeight: '500',
        alignSelf: 'center',
    },

    sectionBorder: {
        borderWidth: 2, 
        borderColor: aLittleLighterColor, 
        borderRadius: cornerRadius,
    },

    sectionHeaderText: {
        backgroundColor: primaryColor,
        fontSize: largeFont,
        fontWeight: 'bold',
        color: textPrimaryColor,
        position: 'absolute',
        top: -20, 
        left: 15,
        padding: 5
    },

    gameweekSectionText: {
        color: textPrimaryColor,
        fontSize: mediumFont * 0.8,
        fontWeight: '500',
        alignSelf: 'center'
    },

    //#region  close button
    closeButton: {
        position: 'absolute',
        zIndex: 1,
        right: -7,
        top: -7,
        height: 25,
        width: 25,
        margin: 0,
        borderRadius: 20,
    },

    closeButtonBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: secondaryColor,
        borderRadius: 20,
    },

    //#endregion
})