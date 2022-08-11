import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { height, width, primaryColor, cornerRadius, textPrimaryColor, lightColor, smallFont, mediumFont, FIXTURE_CARD_HEIGHT } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    //#region main layout
    fixtureViewContainer: {
        height: FIXTURE_CARD_HEIGHT,
        aspectRatio: 1.541,
        paddingTop: heightPercentageToDP('0.5%'), 
    },

    card: {
        backgroundColor: primaryColor,
        flex: 1,
        flexDirection: 'column',
        marginBottom: heightPercentageToDP('1%'),
        marginLeft: widthPercentageToDP('1%'),
        marginRight: widthPercentageToDP('1%'),
        paddingLeft: widthPercentageToDP('1%'),
        paddingRight: widthPercentageToDP('1%'),
        paddingBottom: heightPercentageToDP('1%'),
        paddingTop: heightPercentageToDP('1%'),
        borderRadius: cornerRadius,
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
        width: '100%',
        height: heightPercentageToDP('2%'),
        flexDirection: 'row'
    },

    datetext: {
        fontSize: smallFont * 1.1,
        alignSelf: 'center',
        color: textPrimaryColor,
        fontWeight: '500',
        flex: 1,
        textAlign: 'center'
    },

    //#endregion
    
    //#region score
    scoreView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        paddingTop: heightPercentageToDP('0.25%'),
        paddingBottom: heightPercentageToDP('0.25%'),
    },

    scoreAndTimeView: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    scoreText: {
        fontSize: mediumFont,
        alignSelf: 'center',
        margin: heightPercentageToDP('0.5%'),
        color: textPrimaryColor,
    },

    timeText: {
        fontSize: smallFont,
        alignSelf: 'center',
        textAlign: 'center',
        color: 'red',
        fontWeight: "bold",
        marginLeft: widthPercentageToDP('0.5%'),
    },

    fullTimeText: {
        fontSize: mediumFont * 0.8,
        alignSelf: 'center',
        color: lightColor
    }
    //#endregion
});