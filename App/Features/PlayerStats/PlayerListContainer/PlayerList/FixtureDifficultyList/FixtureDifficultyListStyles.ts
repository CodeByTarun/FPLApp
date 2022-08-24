import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { textPrimaryColor, mediumFont } from "../../../../../Global/GlobalConstants";

export const FixtureDifficultyListStyles = (theme: Theme) => StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: moderateScale(5),
        paddingRight: moderateScale(5),
        width: moderateScale(50, 0.8),
    },

    text: {
        fontSize: mediumFont * 0.75,
        color: theme.colors.text,
        textAlign: 'center', 
    },

    fixtureDifficultyIndicator: {
        marginTop: moderateVerticalScale(5),
        width: '110%', 
        borderBottomWidth: moderateVerticalScale(2), 
        bottom: 0
    }

})
