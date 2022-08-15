import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { aLittleLighterColor, cornerRadius, primaryColor, largeFont, textPrimaryColor, mediumFont } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    container: {
        flex: 1, 
        paddingTop: moderateVerticalScale(10), 
        paddingBottom: moderateVerticalScale(5), 
        zIndex: -1
    },

    sectionBorder: {
        borderWidth: 2, 
        borderColor: aLittleLighterColor, 
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
        backgroundColor: primaryColor,
        fontSize: largeFont,
        fontWeight: 'bold',
        color: textPrimaryColor,
        position: 'absolute',
        top: -moderateVerticalScale(20), 
        left: moderateScale(15),
        padding: moderateScale(5)
    },

    pointsHeaderText: {
        backgroundColor: primaryColor,
        fontSize: largeFont,
        fontWeight: 'bold',
        color: textPrimaryColor,
        position: 'absolute',
        top: -moderateVerticalScale(20), 
        right: moderateScale(15),
        padding: moderateScale(5)
    },

    gameweekSectionText: {
        color: textPrimaryColor,
        fontSize: mediumFont * 0.9,
        fontWeight: '500',
        alignSelf: 'center'
    },
})