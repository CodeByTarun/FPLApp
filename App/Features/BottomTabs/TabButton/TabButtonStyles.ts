import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { defaultFont, semiBoldFont } from "../../../Global/GlobalConstants";

export const TabButtonStyles = (theme: Theme) => StyleSheet.create({

    tabContainer: {
        flex: 1,
        marginBottom: moderateVerticalScale(5),
        marginTop: moderateVerticalScale(5),
    },

    imageContainer: {
        flex: 1,
        paddingTop: moderateVerticalScale(3, 0),
        paddingBottom: moderateVerticalScale(3, 0),
        paddingLeft: moderateScale(5, 0.4),
        paddingRight: moderateScale(5, 0.4),
    },

    image: {
        height: '95%',
        width: '100%',
    },

    headerText: {
        fontSize: moderateScale(9, 0.2),
        alignSelf: 'center',
        color: theme.colors.notification,
        fontFamily: semiBoldFont,
    },
});