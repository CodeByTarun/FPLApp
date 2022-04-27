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
        flex: 5,
        backgroundColor: secondaryColor,
        marginBottom: 0,
        width: '90%'
    },
    
    gameweekAndScoreContainer: {
        flexDirection: 'row', 
        backgroundColor: aLittleDarkerColor,
        flex: 1,
        alignItems: 'center', 
        justifyContent: 'center'
    },

    kingsText: {
        color: 'white',
        fontSize: smallFont,
        fontWeight: '500',
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
        paddingTop: 2
    },

    gameweekText: {
        color: 'white',
        fontSize: smallFont,
        fontWeight: '500',
        flex: 2,
        alignSelf: 'center',
        textAlign: 'center',
        paddingTop: 2
    },

    scoreText: {
        fontSize: smallFont,
        fontWeight: '500',
        color: textPrimaryColor,
        flex: 1,
        alignSelf:'center',
        textAlign: 'center',
        paddingTop: 2,
        backgroundColor: aLittleLighterColor
    },
});
