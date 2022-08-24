import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { width, cornerRadius, smallFont, mediumFont, FIXTURE_CARD_HEIGHT } from "../../../Global/GlobalConstants";

export const FixtureCardStyles = (theme: Theme) => StyleSheet.create({
    //#region main layout
    fixtureViewContainer: {
        height: FIXTURE_CARD_HEIGHT,
        width: moderateScale(width / 3, -0.217),
        padding: moderateScale(5, 0.25),
    },

    card: {
        height: '100%',
        flexDirection: 'column',
        borderRadius: cornerRadius,
        paddingTop: moderateVerticalScale(5),
        paddingBottom: moderateVerticalScale(3),
        backgroundColor: theme.colors.card
    },
    //#endregion

    //#region top bar
    topbar: {
        alignSelf: 'center',
        width: '100%',
        height: moderateVerticalScale(11),
        flexDirection: 'row',
    },

    datetext: {
        fontSize: smallFont * 1.1,
        alignSelf: 'center',
        color: theme.colors.notification,
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
        paddingTop: moderateVerticalScale(2),
        paddingBottom: moderateVerticalScale(2),
    },

    scoreAndTimeView: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    scoreText: {
        fontSize: mediumFont,
        alignSelf: 'center',
        margin: moderateVerticalScale(2),
        color: theme.colors.text,
    },

    timeText: {
        fontSize: smallFont,
        alignSelf: 'center',
        textAlign: 'center',
        color: 'red',
        fontWeight: "bold",
        marginLeft: moderateScale(2),
    },

    fullTimeText: {
        fontSize: mediumFont * 0.8,
        alignSelf: 'center',
        color: theme.colors.border,
    }
    //#endregion
});