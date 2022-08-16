import { StyleSheet } from "react-native";
import { moderateVerticalScale, moderateScale, verticalScale } from "react-native-size-matters";
import { mediumFont, primaryColor, secondaryColor, textPrimaryColor } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    watchListButtonContainer: {
        height: '100%',
        aspectRatio: 1,
        justifyContent: 'center',
        paddingTop: moderateVerticalScale(2),
        paddingBottom: moderateVerticalScale(2),
    },

    playerListInfoContainer: {
        width: moderateScale(120),
    },

    tableNumberView: {
        width: moderateScale(50, 0.8),
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    tableText: {
        color: textPrimaryColor,
        fontSize: mediumFont,
    },

    tableView: {
        backgroundColor: primaryColor,
        borderBottomWidth: 1,
        borderBottomColor: secondaryColor,
        flexDirection: 'row',
        paddingTop: verticalScale(7),
        paddingBottom: verticalScale(7),
        paddingLeft: moderateScale(5),
        width: '100%',
        height: moderateVerticalScale(50, 0.3)
    },
});