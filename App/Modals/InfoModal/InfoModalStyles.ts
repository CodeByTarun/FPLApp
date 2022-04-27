import { StyleSheet } from "react-native";
import { height, largeFont, mediumFont, textPrimaryColor } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    titleText: {
        color: textPrimaryColor,
        fontSize: largeFont,
        alignSelf: 'center',
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 20,
    },

    text: {
        color: textPrimaryColor,
        fontSize: mediumFont,
        marginBottom: 10,
    },
});
