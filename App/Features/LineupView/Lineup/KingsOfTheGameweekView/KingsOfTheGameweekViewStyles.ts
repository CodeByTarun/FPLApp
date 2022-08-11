import { StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { width, primaryColor, smallFont, textSecondaryColor, secondaryColor, textPrimaryColor, mediumFont, largeFont, aLittleDarkerColor, aLittleLighterColor, lightColor, tertiaryColor } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    kingsView: {
        flex: 1,
        alignSelf: 'center',
        marginTop: heightPercentageToDP('0.5%'),
        width: widthPercentageToDP('86.7%'),
        backgroundColor: primaryColor,           
    },

    kingsScrollView: {
        flex: 1,
    },

    kingsCardView: {
        width: widthPercentageToDP('16.5%'),
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
        width: '90%',
        height: heightPercentageToDP('3.5%'), 
    },
    
    gameweekAndScoreContainer: {
        flexDirection: 'row', 
        backgroundColor: aLittleDarkerColor,
        width: '100%',
        alignItems: 'center', 
        justifyContent: 'center',
        paddingLeft: widthPercentageToDP('1%'),
        paddingRight: widthPercentageToDP('1%'),
        flex: 1,
    },

    kingsTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    kingsText: {
        color: textPrimaryColor,
        fontSize: smallFont,
        fontWeight: '500',
        alignSelf: 'center',
        textAlign: 'center',
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
