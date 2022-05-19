import { StyleSheet } from "react-native";
import { width, primaryColor, smallFont, textSecondaryColor, secondaryColor, textPrimaryColor, mediumFont, largeFont, aLittleDarkerColor, aLittleLighterColor, lightColor } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    kingsView: {
        flex: 1,
        alignSelf: 'center',
        marginTop: 3,
        width: width*0.867,
        backgroundColor: primaryColor,           
    },

    kingsScrollView: {
        flex: 1,
    },

    kingsCardView: {
        width: width*0.8*0.27,
        padding: 5,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },

    jersey: {
        position: 'absolute',
        alignSelf: 'center',
        height: '90%',
        width: '70%',
    },

    textContainer: {
        backgroundColor: secondaryColor,
        width: '90%'
    },
    
    gameweekAndScoreContainer: {
        flexDirection: 'row', 
        backgroundColor: aLittleDarkerColor,
        width: '100%',
        alignItems: 'center', 
        justifyContent: 'center',
        padding: 1,
    },

    kingsText: {
        color: textPrimaryColor,
        fontSize: smallFont,
        fontWeight: '500',
        alignSelf: 'center',
        textAlign: 'center',
        paddingBottom: 2,
    },

    gameweekAndScoreText: {
        color: textPrimaryColor,
        fontSize: smallFont,
        fontWeight: '500',
        flex: 2,
        alignSelf: 'center',
        textAlign: 'center',
    },

});
