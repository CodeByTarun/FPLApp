import { StyleSheet } from "react-native";
import { aLittleDarkerColor, aLittleLighterColor, lightColor, smallFont, textSecondaryColor } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    tabContainer: {
        flex: 1,
        marginBottom: 3,
        marginTop: 5,
    },

    imageContainer: {
        flex: 1,
        padding: 2,
    },

    image: {
        height: '95%',
        width: '100%',
    },

    headerText: {
        fontSize: smallFont* 1.1,
        alignSelf: 'center',
        color: lightColor,
    },
});