import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { secondaryColor, cornerRadius, primaryColor, textPrimaryColor, mediumFont, largeFont } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: secondaryColor,
        borderRadius: cornerRadius,
    },

    highlight: {
        height: "100%",
        width: "50%",
        position: 'absolute',
        backgroundColor: primaryColor,
        borderRadius: cornerRadius,
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
        fontWeight: '700',
        color: textPrimaryColor,
        fontSize: mediumFont * 1.1,
        alignSelf: 'center',
    },
});