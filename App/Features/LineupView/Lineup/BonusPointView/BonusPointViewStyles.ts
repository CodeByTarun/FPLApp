import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, verticalScale } from "react-native-size-matters";
import { primaryColor, aLittleLighterColor, textPrimaryColor, width, smallFont, mediumFont } from "../../../../Global/GlobalConstants";

export const BonusPointViewStyles = (theme: Theme) => StyleSheet.create({
    
    container:{ 
        width: moderateScale(225, 0.3), 
        height: moderateVerticalScale(80, 0.8), 
        backgroundColor: theme.colors.primary, 
        alignSelf: 'flex-end', 
        marginBottom: -1,
    },

    bonusPointsView: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: theme.colors.border,
        paddingBottom: moderateVerticalScale(5),
        paddingTop: moderateVerticalScale(2),
    },

    bonusPointsText: {
        color: theme.colors.text,
        alignSelf: 'center',
        fontSize: moderateScale(8, 0.4),
        flex: 1,
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
        fontWeight: 'bold',
        paddingTop: verticalScale(5),
        paddingBottom: verticalScale(4),
        backgroundColor: theme.colors.primary
    },
});