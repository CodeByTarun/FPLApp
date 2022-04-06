import { StyleSheet } from "react-native";
import { width, smallFont, textPrimaryColor } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        width: width* 0.132
    },

    text: {
        fontSize: smallFont,
        color: textPrimaryColor,
        textAlign: 'center', 
    },

    fixtureDifficultyIndicator: {
        position: 'absolute', 
        height: '100%', 
        width: '115%', 
        borderBottomWidth: 2, 
        bottom: 0
    }

})
