import { StyleSheet } from "react-native";
import { largeFont, textPrimaryColor } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    titleText: {
        fontSize: largeFont,
        color: textPrimaryColor, 
        fontWeight: '600',
        textAlign: 'center',
        padding: 15,
    },
});