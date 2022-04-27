import { StyleSheet } from "react-native";
import { cornerRadius, height, mediumFont, primaryColor, textPrimaryColor, width } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    container: {
        width: width * 0.4,
        maxHeight: height * 0.4,
        backgroundColor: primaryColor,
        minHeight: height * 0.2,
        padding: 5,
        borderRadius: cornerRadius
    },

    titleText: {
        fontSize: mediumFont*1.1,
        color: textPrimaryColor,
        alignSelf: 'center',
        padding: 5,
    },

});