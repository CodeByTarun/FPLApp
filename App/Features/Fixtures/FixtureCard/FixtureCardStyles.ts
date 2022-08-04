import { StyleSheet } from "react-native";
import { height, width, primaryColor, cornerRadius, textPrimaryColor, lightColor, smallFont, mediumFont, FIXTURE_CARD_HEIGHT } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    //#region main layout
    fixtureViewContainer: {
        height: FIXTURE_CARD_HEIGHT,
        width: width* 0.3288,
        paddingTop: 5, paddingBottom: 5,
    },

    card: {
        backgroundColor: primaryColor,
        flex: 1,
        flexDirection: 'column',
        marginLeft: 2.5,
        marginRight: 2.5,
        padding: 5,
        borderRadius: cornerRadius,
        marginBottom: 2.5
    },

    button: {
        height: '100%',
        width: '100%',
        backgroundColor: primaryColor,
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