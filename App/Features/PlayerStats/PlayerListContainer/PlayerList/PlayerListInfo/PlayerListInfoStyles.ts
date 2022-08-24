import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { textPrimaryColor, mediumFont, fieldColor } from "../../../../../Global/GlobalConstants";

export const PlayerListInfoStyles = (theme: Theme) => StyleSheet.create({
    tableText: {
        color: theme.colors.text,
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

    playerInfoContainer: {
        flex: 3,
        justifyContent: 'center',
        paddingLeft: moderateScale(4, 0.2),
    },

    ownerText: {
        color: theme.colors.text,
        fontSize: mediumFont * 0.8,
        height: '100%',
        backgroundColor: fieldColor,
        padding: 2,
        marginRight: moderateScale(4),
        fontWeight: '600'
    },
});