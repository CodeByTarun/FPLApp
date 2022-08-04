import { StyleSheet } from "react-native";
import { height, width, largeFont, textPrimaryColor, secondaryColor, mediumFont, cornerRadius } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    
    container: {
        height: '100%',
         width: '100%',
    },

    titleText: {
        fontSize: largeFont, 
        color: textPrimaryColor, 
        alignSelf: 'center', 
        marginTop: 10, 
        fontWeight: '700', 
        textAlign: 'center',
    },

    listContainer: {
        marginTop: 10, 
        borderTopWidth: 1, 
        borderBottomWidth: 1, 
        borderColor: secondaryColor,
    },

    gameweekItem: {
        borderBottomColor: secondaryColor,
        borderBottomWidth: 1,
        height: height * 0.06,
        justifyContent: 'center',
        paddingLeft: 10,
    },

    bottomView: {
        padding: 10,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderTopColor: secondaryColor,
        borderTopWidth: 1,
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