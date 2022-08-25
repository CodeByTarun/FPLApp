import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { cornerRadius, height, largeFont, lightColor, mediumFont, primaryColor, smallFont, textPrimaryColor, textSecondaryColor, width } from "../../../../Global/GlobalConstants";

export const ManagerInfoCardStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        marginRight: 15,
        borderBottomLeftRadius: cornerRadius,
        borderBottomRightRadius: cornerRadius,
        backgroundColor: theme.colors.primary,
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
        color: theme.colors.text, 
        alignSelf: 'center', 
        fontWeight: '600',
        fontSize: largeFont * 0.95,

    },

    rankText: {
        color: theme.colors.text, 
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
        color: theme.colors.notification,
        fontWeight: '500',
        alignSelf: 'center'
    },

    activeIndex: {
        backgroundColor: theme.colors.text,
    },

    inactiveIndex: {
        backgroundColor: theme.colors.border,
    },
});