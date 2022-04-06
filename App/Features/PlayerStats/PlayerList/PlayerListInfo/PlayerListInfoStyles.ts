import { StyleSheet } from "react-native";
import { textPrimaryColor, mediumFont } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    tableText: {
        color: textPrimaryColor,
        fontSize: mediumFont * 0.95,
    },

    imageContainer: {
        position: 'absolute', 
        bottom: -6, 
        right: -2, 
        height: '60%', 
        width: '60%'
    },

    image: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
    },
});