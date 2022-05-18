import { StyleSheet } from "react-native";
import { height, width, primaryColor, cornerRadius, textPrimaryColor, lightColor, secondaryColor, aLittleDarkerColor, aLittleLighterColor, textSecondaryColor, testColor, smallFont, mediumFont } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    //#region main layout
    fixtureViewContainer: {
        height: height - (width / height * 33 * 100) - 40,
        width: width* 0.3288,
        paddingTop: 5, paddingBottom: 5,
    },

    button: {
        flex: 1,
    },

    card: {
        backgroundColor: primaryColor,
        flex: 1,
        flexDirection: 'column',
        marginLeft: 2.5,
        marginRight: 2.5,
        padding: 5,
        borderRadius: cornerRadius,
    },
    //#endregion

    //#region top bar
    topbar: {
        alignSelf: 'center',
        flex: 1, 
        justifyContent: 'center',
    },

    datetext: {
        fontSize: smallFont * 1.2,
        alignSelf: 'center',
        color: textPrimaryColor,
        flex: 1,
    },

    //#endregion
    
    //#region score
    scoreView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 4,
        paddingTop: 3,
    },

    scoreAndTimeView: {
        paddingBottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    scoreText: {
        fontSize: mediumFont,
        alignSelf: 'center',
        margin: 1,
        color: textPrimaryColor,
    },

    timeText: {
        fontSize: smallFont,
        alignSelf: 'center',
        textAlign: 'center',
        color: 'red',
        fontWeight: "bold",
        marginLeft: 1
    },

    fullTimeText: {
        fontSize: mediumFont * 0.8,
        alignSelf: 'center',
        color: lightColor
    }
    //#endregion
});