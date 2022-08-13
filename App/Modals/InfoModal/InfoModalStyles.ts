import { StyleSheet } from "react-native";
import { moderateVerticalScale } from "react-native-size-matters";
import { height, largeFont, mediumFont, textPrimaryColor } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    titleText: {
        color: textPrimaryColor,
        fontSize: largeFont,
        alignSelf: 'center',
        fontWeight: '600',
        marginTop: moderateVerticalScale(10),
        marginBottom: moderateVerticalScale(15),
    },

    text: {
        color: textPrimaryColor,
        fontSize: mediumFont,
        marginBottom: moderateVerticalScale(10, 0.2),
        textAlign: 'center'
    },
});
