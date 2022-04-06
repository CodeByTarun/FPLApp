import { StyleSheet } from "react-native";
import { mediumFont, primaryColor, secondaryColor, textPrimaryColor } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    tableView: {
        backgroundColor: primaryColor,
        borderBottomWidth: 1,
        borderBottomColor: secondaryColor,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
    },

    tableNumberView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    tableText: {
        color: textPrimaryColor,
        fontSize: mediumFont * 0.95,
    },

    jersey: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
    },
});

