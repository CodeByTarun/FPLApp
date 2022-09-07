import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateVerticalScale, verticalScale } from "react-native-size-matters";
import { defaultFont, largeFont, mediumFont, semiBoldFont } from "../../../Global/GlobalConstants";

export const AddPlayerModalStyles = (theme: Theme) => StyleSheet.create({

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
        color: theme.colors.text, 
        fontFamily: semiBoldFont,
        textAlign: 'center',
        paddingBottom: moderateVerticalScale(20),
        paddingTop: moderateVerticalScale(10),
    },

    listContainer: {
        paddingTop: moderateVerticalScale(10),
        borderTopColor: theme.colors.border,
        height: verticalScale(325)
    },

    playerItemContainer: {
        padding: moderateVerticalScale(10),
    },

    playerText: {
        color: theme.colors.notification,
        fontSize: mediumFont,
        fontFamily: defaultFont,
    }

});