import { StyleSheet } from "react-native";
import { secondaryColor, cornerRadius, primaryColor, textPrimaryColor, mediumFont } from "../../../Global/GlobalConstants";

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
        left: -1,
        backgroundColor: primaryColor,
        borderRadius: cornerRadius,
    },

    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 7,
        elevation: 10,
    },

    emblems: {
        flex:1,
        resizeMode: 'contain',
        alignSelf: 'center',
        height: '100%',
        width: '90%',
     },

    scoreText: {
        marginLeft: 3,
        marginRight: 3,
        fontWeight: '700',
        color: textPrimaryColor,
        fontSize: mediumFont,
    },
});