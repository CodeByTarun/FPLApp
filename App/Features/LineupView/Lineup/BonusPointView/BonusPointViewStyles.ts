import { StyleSheet } from "react-native";
import { primaryColor, aLittleLighterColor, textPrimaryColor, width } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    
    bonusPointsView: {
        width: '30%',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: primaryColor, 
        borderColor: aLittleLighterColor,
        paddingBottom: 3,
    },

    bonusPointsText: {
        color: textPrimaryColor,
        alignSelf: 'center',
        fontSize: width*0.025,
    },

    titleContainer: {
        width: '60%', 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: primaryColor, 
        marginTop: 5,
    },

    titleText: {
        color: textPrimaryColor,
        alignSelf: 'center',
        fontSize: width*0.035,
        fontWeight: 'bold',
        padding: 5,
        marginTop: 2,
        backgroundColor: primaryColor
    },
});