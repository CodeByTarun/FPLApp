import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { mediumFont, height, largeFont, cornerRadius, defaultFont } from "../../Global/GlobalConstants";

export const PlayerModalStyles = (theme: Theme) => StyleSheet.create({

    container: {
        width: '100%', 
        height: '100%'
    },

    titleText: {
        fontSize: largeFont, 
        color: theme.colors.text, 
        alignSelf: 'center', 
        paddingTop: moderateVerticalScale(10), 
        fontFamily: defaultFont,
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
        color: theme.colors.text,
        fontSize: largeFont,
        marginLeft: moderateScale(10, 0.3),
        marginRight: moderateScale(10, 0.3),
        fontFamily: defaultFont,
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
        color: theme.colors.text,
        fontSize: mediumFont,
        fontFamily: defaultFont,
    },

    statContainer: {
        flexDirection: 'row', 
        padding: moderateScale(5, 0.2)
    },

    button: {
        height: moderateVerticalScale(40, 0.2),
        width: moderateScale(100, 0.3),
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: cornerRadius,
        marginTop: moderateVerticalScale(5),
        alignSelf: 'center'
    },

    buttonText: {
        color: theme.colors.text,
        fontSize: mediumFont,
        fontFamily: defaultFont,
    }

}); 