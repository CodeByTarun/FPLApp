import { StyleSheet } from "react-native";
import { primaryColor, secondaryColor, cornerRadius, textPrimaryColor, mediumFont } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({ 
    //#region player table
    topBarContainer: {
        width: '100%', 
        height: 110, 
        backgroundColor: primaryColor,
        paddingLeft: 5,
        paddingRight: 5,
    },

    firstRowTopBarContainer: {
        flex: 1, 
        paddingTop: 10,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
    },

    secondRowTopbarContainer: {
        flex: 1 , 
        flexDirection: 'row', 
        justifyContent: 'center', 
    },

    searchBoxContainer: {
        flex: 9,
        backgroundColor: secondaryColor,
        flexDirection: 'row',
        borderRadius: cornerRadius,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 11,
        marginLeft: 5,        
    },

    searchbox: {
        flex: 1,
        alignSelf: 'center',
        color: textPrimaryColor,
    },

    dropDownContainer: {
        flex: 1,
        marginRight: 0,
        marginLeft: 0,

    },

    filterText: {
        color: textPrimaryColor,
        fontSize: mediumFont,
        flex: 1,
        fontWeight: '500'
    },
    //#endregion
});