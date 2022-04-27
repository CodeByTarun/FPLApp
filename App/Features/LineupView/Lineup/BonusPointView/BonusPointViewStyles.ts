import { StyleSheet } from "react-native";
import { primaryColor, aLittleLighterColor, textPrimaryColor, width } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    
    container:{ 
        width: '60%', 
        height: '95%', 
        backgroundColor: primaryColor, 
        alignSelf: 'flex-end', 
        paddingBottom: 10
    },

    bonusPointsView: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: primaryColor, 
        borderColor: aLittleLighterColor,
    },

    bonusPointsText: {
        color: textPrimaryColor,
        alignSelf: 'center',
        fontSize: width*0.025,
    },

    titleContainer: {
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center',  
        paddingBottom: 5,
        backgroundColor: primaryColor
    },

    titleText: {
        color: textPrimaryColor,
        alignSelf: 'center',
        fontSize: width*0.035,
        fontWeight: 'bold',
        padding: 5,
        backgroundColor: primaryColor
    },
});