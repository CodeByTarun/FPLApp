import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateVerticalScale } from "react-native-size-matters";
import { primaryColor, cornerRadius, smallFont, textSecondaryColor, lightColor, textPrimaryColor, semiBoldFont } from "../../../../Global/GlobalConstants";

export const AdditionalInfoCardStyles = (theme: Theme) => StyleSheet.create({
    cardContainer: {
        flex: 1,
        alignContent:'center', 
        justifyContent: 'center',
        backgroundColor: theme.colors.primary, 
        borderBottomLeftRadius: cornerRadius, 
        zIndex: 1,
        borderBottomRightRadius: cornerRadius
    },

    textContainer: {
        flex: 1,
        paddingTop: moderateVerticalScale(8),
        alignItems: 'center',
    },

    text: {
        fontSize: smallFont, 
        color: theme.colors.notification,
        alignSelf: 'center', 
        textAlign: 'center', 
        fontFamily: semiBoldFont,
    },

    dotsContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'center', 
        paddingBottom: moderateVerticalScale(7),
    },

    activeIndex: {
        backgroundColor: theme.colors.text,
    },

    inactiveIndex: {
        backgroundColor: theme.colors.border,
    },    
});