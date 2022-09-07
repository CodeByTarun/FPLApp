import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { cornerRadius, defaultFont, largeFont, mediumFont, semiBoldFont } from "../../../../Global/GlobalConstants";

export const StatStyles = (theme: Theme) => StyleSheet.create({

    container: {
        flex: 1, 
        paddingTop: moderateVerticalScale(10), 
        paddingBottom: moderateVerticalScale(5), 
        zIndex: -1
    },

    sectionBorder: {
        borderWidth: 2, 
        borderColor: theme.colors.border, 
        borderRadius: cornerRadius,
    },

    topSection: {
        flex: 3, 
        flexDirection: 'row'
    },

    bottomSection: {
        flex: 1, 
        marginTop: moderateVerticalScale(20), 
        padding: moderateScale(5), 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'row',
    },

    pieChartContainer: {
        flex: 3,
        margin: moderateScale(5),
        padding: moderateScale(5),
    },

    rightSideStatsContainer: {
        flex: 3, 
        marginTop: moderateVerticalScale(15), 
        marginRight: moderateScale(15), 
        marginBottom: moderateVerticalScale(15)
    },

    sectionHeaderText: {
        backgroundColor: theme.colors.primary,
        fontSize: largeFont,
        fontFamily: semiBoldFont,
        color: theme.colors.text,
        position: 'absolute',
        top: -moderateVerticalScale(20), 
        left: moderateScale(15),
        padding: moderateScale(5)
    },

    pointsHeaderText: {
        backgroundColor: theme.colors.primary,
        fontSize: largeFont,
        fontFamily: semiBoldFont,
        color: theme.colors.text,
        position: 'absolute',
        top: -moderateVerticalScale(20), 
        right: moderateScale(15),
        padding: moderateScale(5)
    },

    gameweekSectionText: {
        color: theme.colors.text,
        fontSize: mediumFont * 0.9,
        fontFamily: defaultFont,
        alignSelf: 'center'
    },
})