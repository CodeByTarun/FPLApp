import { StyleSheet } from "react-native";
import { textSecondaryColor, mediumFont, textPrimaryColor, modalTextColor, largeFont, redColor, cornerRadius, height } from "../../../Global/GlobalConstants";

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
        minHeight: height * 0.5 
    },

    titleText: {
        color: modalTextColor,
        alignSelf: 'center',
        marginTop: 15,
        fontSize: largeFont,
        fontWeight: 'bold'
    },

    flatList: {
        margin: 10
    },

    flatListHeader: {
        elevation: 0.1,
        zIndex: 1,
    },

    itemView: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
    },

    itemText: {
        color: modalTextColor,
        paddingBottom: 15,
        paddingTop: 15,
    },

    clearButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: redColor,
        borderRadius: cornerRadius,
        width: '40%',
        alignSelf: 'center',
        padding: 10,
        margin: 10,
    },

    resetText: {
        fontSize: mediumFont, 
        color: textPrimaryColor,
    },
})