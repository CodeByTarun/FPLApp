import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { cornerRadius, height, largeFont, lightColor, mediumFont, primaryColor, smallFont, textPrimaryColor, textSecondaryColor, width } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginRight: 15,
        borderBottomLeftRadius: cornerRadius,
        borderBottomRightRadius: cornerRadius,
        backgroundColor: primaryColor,
        alignSelf: 'center',
        zIndex: 1,
    },

    titleContainter: {
        alignSelf: 'center',
        justifyContent: 'center',
        paddingTop: moderateVerticalScale(8),
    },

    middleTextContainter: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '100%'
    },

    categoryContainer: {
        alignSelf: 'center',
        paddingBottom: moderateVerticalScale(5),
        justifyContent: 'center',
    },

    statText: {
        color: textPrimaryColor, 
        alignSelf: 'center', 
        fontWeight: '600',
        fontSize: largeFont,
    },

    rankText: {
        color: textPrimaryColor, 
        alignSelf: 'center', 
        fontWeight: '600',
        fontSize: mediumFont
    },
    
    dotsContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'center', 
        paddingBottom: moderateVerticalScale(8),
    },

    text: {
        fontSize: smallFont,
        color: textSecondaryColor,
        fontWeight: '500',
        alignSelf: 'center'
    },

    activeIndex: {
        backgroundColor: textPrimaryColor,
    },

    inactiveIndex: {
        backgroundColor: lightColor,
    },
});