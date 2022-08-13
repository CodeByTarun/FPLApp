import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, scale, verticalScale } from "react-native-size-matters";
import { width, primaryColor, smallFont, textSecondaryColor, secondaryColor, textPrimaryColor, mediumFont, largeFont, aLittleDarkerColor, aLittleLighterColor, lightColor, tertiaryColor } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    kingsView: {
        flex: 1,
        alignSelf: 'center',
        marginTop: moderateVerticalScale(7),
        width: moderateScale(280, 0.9),
        paddingLeft: moderateScale(2),
        backgroundColor: primaryColor,           
    },

    kingsScrollView: {
        flex: 1,
    },

    kingsCardView: {
        width: scale(65),
        paddingRight: moderateScale(5),
        paddingTop: moderateVerticalScale(5),
        paddingBottom: moderateVerticalScale(5),
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
        height: verticalScale(25), 
    },
    
    gameweekAndScoreContainer: {
        flexDirection: 'row', 
        backgroundColor: aLittleDarkerColor,
        width: '100%',
        alignItems: 'center', 
        justifyContent: 'center',
        paddingLeft: moderateScale(2),
        paddingRight: moderateScale(2),
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
