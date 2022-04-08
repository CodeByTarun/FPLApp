import { StyleSheet } from "react-native";
import { width, textPrimaryColor, mediumFont, lightColor, secondaryColor, aLittleLighterColor } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    container: {
        flex: 1, 
        paddingBottom: 5,
        marginBottom: 5, 
        backgroundColor: secondaryColor, 
        paddingLeft: 5, 
        paddingRight: 5
    },

    tableTextContainer: {
        width: width*0.1,
        flex: 1,
    },

    headerText: {
        color: textPrimaryColor,
        fontSize: mediumFont * 0.9,
        fontWeight: '500',
        alignSelf: 'center',
    },

    headerContainer: {
        flexDirection: 'row', 
        alignItems: 'center',  
        flex: 1, 
        borderBottomColor: lightColor, 
        borderBottomWidth: 1,
        paddingBottom: 5, paddingTop: 10,
        backgroundColor: secondaryColor
    },

    historyItemContainer: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingBottom: 5, 
        paddingTop: 5,
        borderBottomColor: aLittleLighterColor, 
        borderBottomWidth: 1,
    },

    footerContainer: {
        flexDirection: 'row', 
        borderTopColor: lightColor, 
        borderTopWidth: 1, 
        paddingTop: 5,
    }

});