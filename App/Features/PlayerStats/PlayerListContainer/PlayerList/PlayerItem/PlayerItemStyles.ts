import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateVerticalScale, moderateScale, verticalScale } from "react-native-size-matters";
import { defaultFont, mediumFont } from "../../../../../Global/GlobalConstants";

export const PlayerItemStyles = (theme: Theme) => StyleSheet.create({

    tableView: {
        backgroundColor: theme.colors.primary,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.background,
        flexDirection: 'row',
        paddingTop: verticalScale(7),
        paddingBottom: verticalScale(7),
        paddingLeft: moderateScale(5),
        width: '100%',
        height: moderateVerticalScale(50, 0.3)
    },

    watchListButtonContainer: {
        height: '100%',
        aspectRatio: 1,
        justifyContent: 'center',
        paddingTop: moderateVerticalScale(2),
        paddingBottom: moderateVerticalScale(2),
    },

    playerListInfoContainer: {
        width: moderateScale(120),
        height: '100%',
    },

    tableNumberView: {
        width: moderateScale(50, 0.8),
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    tableText: {
        color: theme.colors.text,
        fontSize: mediumFont * 0.95,
        fontFamily: defaultFont,
    },

});