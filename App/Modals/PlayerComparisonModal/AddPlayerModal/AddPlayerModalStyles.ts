import { StyleSheet } from "react-native";
import { width, height, largeFont, textPrimaryColor, aLittleLighterColor, textSecondaryColor, mediumFont } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    modalContainer: {
        width: width * 0.7, 
        height: height * 0.7, 
        padding: 15
    },

    searchControlContainer: {
        height: 40, 
        width: '100%'
    },

    titleText: {
        fontSize: largeFont * 1.2,
        color: textPrimaryColor, 
        fontWeight: '600',
        textAlign: 'center',
        paddingBottom: 20,
        paddingTop: 10
    },

    listContainer: {
        paddingTop: 10,
        flex: 1,
        borderTopColor: aLittleLighterColor,
    },

    playerItemContainer: {
        padding: 15,
    },

    playerText: {
        color: textSecondaryColor,
        fontSize: mediumFont
    }

});