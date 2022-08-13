import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { modalTextColor, mediumFont, height, largeFont, textPrimaryColor, secondaryColor, cornerRadius, textSecondaryColor } from "../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    container: {
        width: '100%', 
        height: '100%'
    },

    titleText: {
        fontSize: largeFont, 
        color: textPrimaryColor, 
        alignSelf: 'center', 
        paddingTop: moderateVerticalScale(10), 
        fontWeight: '500', 
        textAlign: 'center', 
        paddingBottom: moderateVerticalScale(5)
    },

    fixtureContainer: {
        alignItems: 'center',
        width: '100%',
        marginTop: moderateVerticalScale(10),
        marginBottom: moderateVerticalScale(5),
    },

    fixtureScoreView: {
        flexDirection: 'row', 
        width: '100%', 
        alignSelf: 'center', 
        height: height*0.05, 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: moderateVerticalScale(10),
    },

    scoreText: {
        color: modalTextColor,
        fontSize: largeFont,
        marginLeft: moderateScale(10, 0.3),
        marginRight: moderateScale(10, 0.3),
    },

    emblemView: {
        width:'25%',
    },

    emblems: {
        resizeMode: 'contain',
        alignSelf:'center',
        height: '100%',
        width: '100%',
     },

    statHeaderContainer: {
        flexDirection: 'row', 
        borderColor: 'lightgray', 
        borderBottomWidth: 1, 
        padding: moderateScale(5, 0.2)
    },

    statText: {
        color: modalTextColor,
        fontSize: mediumFont,
    },

    statContainer: {
        flexDirection: 'row', 
        padding: moderateScale(5, 0.2)
    },

    button: {
        height: moderateVerticalScale(40, 0.2),
        width: moderateScale(100, 0.3),
        backgroundColor: secondaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: cornerRadius,
        marginTop: moderateVerticalScale(5),
        alignSelf: 'center'
    },

    buttonText: {
        color: textPrimaryColor,
        fontSize: mediumFont,
        fontWeight: '500',
    }

}); 