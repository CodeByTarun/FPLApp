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
        height: moderateScale(25, 0.4),
        width: moderateScale(25, 0.4),
    },

    text: {
        fontSize: smallFont, 
        alignSelf: 'center', 
        color: textPrimaryColor, 
        paddingTop: moderateScale(3), 
        fontFamily: defaultFont,
    }
});