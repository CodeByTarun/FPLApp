import { StyleSheet } from "react-native";
import { primaryColor, textPrimaryColor, width, smallFont, cornerRadius, height, secondaryColor, largeFont, mediumFont } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    container: {
        flex: 1,
        margin: 0,
        overflow: 'hidden'
    },

    top: {
        width: '100%',
        aspectRatio: 8,
        backgroundColor: primaryColor,
        zIndex: 1,
    },  

    middle: {
        flex: 9,
        width : '100%',
    },

    controlsContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        zIndex: 1,
        backgroundColor: primaryColor,
    },

    leftButtonsContainer: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingLeft: 5, 
        flexDirection: 'row' 
    },

    rightButtonsContainers: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'flex-end', 
        alignItems: 'center', 
        paddingRight: 5
    },

    lineupHeaderContainer: {
        flex: 3, 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 6
    },

    teamSwitchContainer: {
        alignSelf: 'center', 
        height: '90%', 
        width: '65%'
    },

    buttonContainer: {
        height: '70%',
        aspectRatio: 1,
        margin: 3
    },

    playerSearchButtonContainer: {
        height: '60%',
        aspectRatio: 1,
        margin: 3,
        marginTop: 4,
    },

    switchContainer: {
        alignSelf: 'center',
        height: '100%',
        width: '100%',
    },

    icon: {
        width: '80%',
        height: '80%',
        alignSelf: 'center'
    },

    text: {
        alignSelf: 'center',
        color: textPrimaryColor,
        fontSize: mediumFont*1.3,
        fontWeight: 'bold'
    },

    leagueContainer: {
        height: height * 0.55, 
        width: width * 0.8,
        borderRadius: cornerRadius,
        padding: 5,
        backgroundColor: primaryColor
    },

    button: {
        position: 'absolute',
        top: '33%',
        padding: 20, 
        backgroundColor: secondaryColor, 
        borderRadius: cornerRadius, 
        width: '60%', alignSelf: 'center'
    },

    buttonText: {
        color: textPrimaryColor,
        fontWeight: '500',
        fontSize: mediumFont * 1.1,
        alignSelf: 'center'
    },
});