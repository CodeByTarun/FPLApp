import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";
import { cornerRadius, mediumFont, semiBoldFont } from "../../../Global/GlobalConstants";

export const TeamSwitchStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        borderRadius: cornerRadius,
    },

    highlight: {
        height: "100%",
        width: "50%",
        position: 'absolute',
        backgroundColor: theme.colors.card,
        borderRadius: cornerRadius,
        transform: [
            {scale: 1.03}
        ]
    },

    switchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: moderateVerticalScale(6, 0.3),
        paddingBottom: moderateVerticalScale(6, 0.3),
        paddingLeft: moderateScale(5, 0.3),
        paddingRight: moderateScale(5, 0.3),
        elevation: 10,
    },

    emblemContainer: {
        flex: 3,
        alignSelf: 'center',
    },

    emblems: {
        resizeMode: 'contain',
        alignSelf: 'center',
        height: '90%',
        width: '90%',
     },

    scoreText: {
        paddingLeft: moderateScale(5, 0.3),
        paddingRight: moderateScale(5, 0.3),
        flex: 1,
        textAlign: 'center',
        color: theme.colors.text,
        fontSize: mediumFont * 1.1,
        alignSelf: 'center',
        fontFamily: semiBoldFont,
    },
});