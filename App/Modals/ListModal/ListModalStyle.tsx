import { StyleSheet } from "react-native";
import { textPrimaryColor, largeFont, secondaryColor, textSecondaryColor, mediumFont } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    container: {
        flex: 1, 
        flexDirection: 'column', 
        alignItems:'center', 
        justifyContent:'center'
    },

    title: {
        color: textPrimaryColor,
        alignSelf: 'center',
        fontSize: largeFont * 1,
        fontWeight: 'bold',
    },

    flatList: {
        
    },

    flatListHeader: {
        elevation: 0.1,
        zIndex: 1,
    },

    itemView: {
        borderBottomColor: secondaryColor,
        borderBottomWidth: 1,
    },

    itemText: {
        color: textSecondaryColor,
        paddingBottom: 15,
        paddingTop: 15,
        paddingLeft: 10,
    },

    buttonContainer: {
        padding: 15,
        borderTopColor: secondaryColor,
        borderTopWidth: 2,
    },

    buttonText: {
        fontSize: mediumFont, 
        color: textPrimaryColor,
    },

});