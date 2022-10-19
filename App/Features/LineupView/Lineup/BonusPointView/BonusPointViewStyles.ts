import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, verticalScale } from "react-native-size-matters";
import { primaryColor, aLittleLighterColor, textPrimaryColor, width, smallFont, mediumFont, defaultFont, semiBoldFont } from "../../../../Global/GlobalConstants";

export const BonusPointViewStyles = (theme: Theme) => StyleSheet.create({
    
    container:{ 
        width: moderateScale(225, 0.3), 
        marginTop: moderateVerticalScale(7),
        backgroundColor: theme.colors.primary, 
        alignSelf: 'flex-end', 
        marginBottom: -1,
    },

    bonusPointsView: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: theme.colors.border,
        paddingBottom: moderateScale(5, 1.5),
        paddingTop: moderateScale(2, 4),
    },

    bonusPointsText: {
        color: theme.colors.text,
        alignSelf: 'center',
        fontSize: moderateScale(8, 0.6) - moderateVerticalScale(0.1, 15),
        flex: 1,
        fontFamily: defaultFont,
    },

    borderView: {
        width: moderateScale(0.5),
        height: '80%',
        alignSelf: 'center',
        paddingTop: moderateVerticalScale(5),
        marginBottom: moderateVerticalScale(5),
        backgroundColor: theme.colors.border,
    },

    titleContainer: {
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: theme.colors.primary
    },

    titleText: {
        color: theme.colors.text,
        alignSelf: 'center',
        fontSize: mediumFont * 1.1,
        paddingTop: moderateVerticalScale(2.5, 5),
        paddingBottom: moderateVerticalScale(2.5, 1),
        backgroundColor: theme.colors.primary,
        fontFamily: semiBoldFont,
    },
});