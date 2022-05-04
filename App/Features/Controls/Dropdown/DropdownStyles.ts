import { StyleSheet } from "react-native";
import { textSecondaryColor, mediumFont, textPrimaryColor, modalTextColor, largeFont, redColor, cornerRadius, height, lightColor, aLittleLighterColor, secondaryColor, primaryColor, width } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column', 
        alignItems:'center', 
        justifyContent:'center'
    },

    buttonContainer: {
         flex: 1, 
         flexDirection: 'row',
         width: '100%',
         alignSelf: 'center',
         zIndex: 0.5,
    },

    headerText: {
        alignSelf: 'flex-start', 
        color: textSecondaryColor, 
        fontSize: mediumFont * 0.8,
        paddingLeft: 2,
    },

    selectedValueText: {
        color: textPrimaryColor,
        zIndex: 0.5,
        marginRight: 5,
        alignSelf: 'center',
        maxWidth: '80%'
    },

    modal: {
        justifyContent: 'center', 
        alignItems: 'center', 
        alignSelf: 'center', 
        flex: 1, 
        zIndex: 1,
        position: 'absolute'
       },

    modalView: {
        maxHeight: height * 0.6, 
        minHeight: height * 0.5,
        backgroundColor: primaryColor,
        width: width * 0.7,
        borderRadius: cornerRadius,
    },

    modalBackground: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        zIndex: 10000000,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    titleContainer: {
        padding: 15,
        borderBottomColor: secondaryColor,
        borderBottomWidth: 2,
    },

    titleText: {
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

    clearButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: redColor,
        borderRadius: cornerRadius,
        width: '40%',
        alignSelf: 'center',
        padding: 10,
    },

    resetText: {
        fontSize: mediumFont, 
        color: textPrimaryColor,
    },

    resetContainer: {
        padding: 15,
        borderTopColor: secondaryColor,
        borderTopWidth: 2,
    },
})