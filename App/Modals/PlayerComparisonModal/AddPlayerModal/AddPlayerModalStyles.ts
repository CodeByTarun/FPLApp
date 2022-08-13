import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, verticalScale } from "react-native-size-matters";
import { width, height, largeFont, textPrimaryColor, aLittleLighterColor, textSecondaryColor, mediumFont } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    modalContainer: {
        width: '100%', 
        height: '100%', 
        padding: 10,
    },

    searchControlContainer: {
        height: moderateVerticalScale(40, 0.2), 
        width: '100%',
    },

    titleText: {
        fontSize: largeFont * 1.2,
        color: textPrimaryColor, 
        fontWeight: '600',
        textAlign: 'center',
        paddingBottom: moderateVerticalScale(20),
        paddingTop: moderateVerticalScale(10),
    },

    listContainer: {
        paddingTop: moderateVerticalScale(10),
        borderTopColor: aLittleLighterColor,
        height: verticalScale(325)
    },

    playerItemContainer: {
        padding: moderateVerticalScale(10),
    },

    playerText: {
        color: textSecondaryColor,
        fontSize: mediumFont,
    }

});