import { StyleSheet } from "react-native";
import { secondaryColor, height, textPrimaryColor, mediumFont, cornerRadius, largeFont } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    modalViewLayout: {
        height: height * 0.6,
        top: height * 0.4 / 3
    },

    titleText: {
        fontSize: largeFont, 
        color: textPrimaryColor, 
        alignSelf: 'center', 
        padding: 10, 
        fontWeight: '700', 
        textAlign: 'center'
    },

    listContainer: {
        flex: 4, 
        marginTop: 10, 
        marginLeft: -10, 
        marginRight: -10, 
        borderTopWidth: 1, 
        borderBottomWidth: 1, 
        borderColor: secondaryColor
    },

    gameweekItem: {
        borderBottomColor: secondaryColor,
        borderBottomWidth: 1,
        height: height * 0.06,
        justifyContent: 'center',
        paddingLeft: 10,
    },

    text: {
        color: textPrimaryColor,
        fontSize: mediumFont,
    },

    currentGameweekButton: {
        alignSelf: 'center',
        backgroundColor: secondaryColor,
        borderRadius: cornerRadius,
        padding: 10
    }

});