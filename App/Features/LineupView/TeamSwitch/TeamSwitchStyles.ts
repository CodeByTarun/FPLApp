import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
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
        paddingLeft: widthPercentageToDP('0%'),
        paddingRight: widthPercentageToDP('0%'),
    },

    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: heightPercentageToDP('0.75%'),
        paddingBottom: heightPercentageToDP('0.75%'),
        paddingLeft: widthPercentageToDP('2%'),
        paddingRight: widthPercentageToDP('2%'),
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
        paddingLeft: widthPercentageToDP('0.75%'),
        paddingRight: widthPercentageToDP('0.75%'),
        flex: 1,
        textAlign: 'center',
        fontWeight: '700',
        color: textPrimaryColor,
        fontSize: mediumFont * 1.1,
        alignSelf: 'center',
    },
});