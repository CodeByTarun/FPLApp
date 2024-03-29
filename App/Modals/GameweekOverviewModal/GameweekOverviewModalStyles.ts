import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateVerticalScale, moderateScale } from "react-native-size-matters";
import { largeFont, textPrimaryColor, mediumFont, textSecondaryColor, width, secondaryColor, cornerRadius, height, primaryColor, semiBoldFont, defaultFont } from "../../Global/GlobalConstants";

export const GameweekOverviewModalStyles = (theme: Theme) => StyleSheet.create({

    modalView: {
        height: '100%',
        width: '100%',
        backgroundColor: theme.colors.primary, 
        alignSelf: 'center',
        borderRadius: cornerRadius
    },

    titleText: {
        fontSize: largeFont * 1.1,
        color: theme.colors.text,
        fontFamily: semiBoldFont,
        alignSelf: 'center',
        padding: 15,
        paddingTop: 20,
        textAlign: 'center'
    },

    viewContainer: {
        flex: 1,
        marginTop: moderateVerticalScale(15),
        overflow: 'hidden'
    },

    sliderContainer: {
        height: moderateVerticalScale(35, 0.2),
        width: moderateScale(200, 0.2),
        alignSelf: 'center',
        backgroundColor: theme.colors.background,
        borderRadius: cornerRadius,
        flexDirection: 'row',
    },

    sliderPartContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
    },

    sliderText: {
        fontSize: mediumFont,
        textAlign: 'center',
        color: theme.colors.text,
        zIndex: 1,
        elevation: 10,
        fontFamily: defaultFont,
    },

    slider: {
        width: '50%',
        position: 'absolute',
        backgroundColor: theme.colors.card,
        height: '100%',
        borderRadius: cornerRadius,
        transform: [
            { scale: 1.05 }
        ]
    },
});