import { StyleSheet } from "react-native";
import { primaryColor, aLittleLighterColor, textPrimaryColor, width, smallFont } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    
    container:{ 
        width: '60%', 
        height: '95%', 
        backgroundColor: primaryColor, 
        alignSelf: 'flex-end', 
    },

    bonusPointsView: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        borderColor: aLittleLighterColor,
        paddingBottom: 5
    },

    bonusPointsText: {
        color: textPrimaryColor,
        alignSelf: 'center',
        fontSize: smallFont * 0.95
    },

    titleContainer: {
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center',  

        backgroundColor: primaryColor
    },

    titleText: {
        color: textPrimaryColor,
        alignSelf: 'center',
        fontSize: smallFont * 1.4,
        fontWeight: 'bold',
        padding: 3,
        backgroundColor: primaryColor
    },
});