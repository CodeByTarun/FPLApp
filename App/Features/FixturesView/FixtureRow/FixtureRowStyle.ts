import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { defaultFont, mediumFont, semiBoldFont, width } from "../../../Global/GlobalConstants";

export const FixtureRowStyle = (theme: Theme) => StyleSheet.create({

    container: {
        width: '100%',
        height: moderateScale(60, 0.15),
        paddingTop: moderateScale(10, 0.15),
    },

    rowContainer: {
        flexDirection: 'row',
        height: '100%',
        width: '100%',
    },

    teamInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    scoreContainer: {
        height: '100%',
        width: moderateScale(60, 0.3),
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        textAlign: 'center',
        color: theme.colors.text,
        fontFamily: defaultFont,
        fontSize: mediumFont * 1.1
    },

    teamNameContainer: {
        flex: 1,
    },

    homeTeam: {
        alignSelf: 'flex-end',
        paddingRight: moderateScale(15, 0.3)
    },

    awayTeam: {
        alignSelf: 'flex-start',
        paddingLeft: moderateScale(15, 0.3)
    },

    teamEmblemContainer: {
        height: '100%',
        width: moderateScale(25)
    },

    emblem: {
        height: '100%',
        width: '100%'
    },

    aboveAndBelowScore: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    fullTimeText: {
        textAlign: 'center',
        color: theme.colors.border,
        fontFamily: defaultFont,
        fontSize: mediumFont * 0.9,
    },

    timeText: {
        fontSize: mediumFont * 0.9,
        alignSelf: 'center',
        textAlign: 'center',
        color: 'red',
        fontFamily: semiBoldFont,
    },

});