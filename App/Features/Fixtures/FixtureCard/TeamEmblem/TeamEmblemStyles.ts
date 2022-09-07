import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { textPrimaryColor, smallFont, defaultFont } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    teamInfoView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },

    emblems: {
        alignSelf: 'center',
        height: moderateVerticalScale(25, 0.8),
        width: moderateVerticalScale(25, 0.75),
    },

    text: {
        fontSize: smallFont, 
        alignSelf: 'center', 
        color: textPrimaryColor, 
        paddingTop: moderateVerticalScale(3), 
        fontFamily: defaultFont,
    }
});