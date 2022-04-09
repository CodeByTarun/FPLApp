import { coreModule } from "@reduxjs/toolkit/dist/query";
import { StyleSheet } from "react-native";
import { textPrimaryColor, mediumFont, secondaryColor, cornerRadius, lightColor, aLittleLighterColor, fieldColor } from "../../../../Global/GlobalConstants";

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

    ownerText: {
        color: textPrimaryColor,
        fontSize: mediumFont * 0.8,
        height: '100%',
        backgroundColor: fieldColor,
        padding: 2,
        borderRadius: cornerRadius,
        marginRight: 4,
        fontWeight: '600'
    },
});