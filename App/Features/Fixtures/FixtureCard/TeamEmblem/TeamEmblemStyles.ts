import { StyleSheet } from "react-native";
import { moderateVerticalScale } from "react-native-size-matters";
import { textPrimaryColor, smallFont } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    teamInfoView: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: moderateVerticalScale(5),
    },

    emblems: {
        alignSelf: 'center',
        height: '60%',
        width: '100%',
    },

    text: {
        fontSize: smallFont, 
        alignSelf: 'center', 
        fontWeight: '400',
        color: textPrimaryColor, 
        paddingTop: moderateVerticalScale(5), 
    }
});