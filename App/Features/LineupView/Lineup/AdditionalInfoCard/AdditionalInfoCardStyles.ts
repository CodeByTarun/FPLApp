import { StyleSheet } from "react-native";
import { moderateVerticalScale } from "react-native-size-matters";
import { primaryColor, cornerRadius, smallFont, textSecondaryColor, lightColor, textPrimaryColor } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        alignContent:'center', 
        justifyContent: 'center',
        backgroundColor: primaryColor, 
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
        color: textSecondaryColor,
        alignSelf: 'center', 
        textAlign: 'center', 
        fontWeight: '600'
    },

    dotsContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'center', 
        paddingBottom: moderateVerticalScale(7),
    },

    activeIndex: {
        backgroundColor: textPrimaryColor,
    },

    inactiveIndex: {
        backgroundColor: lightColor,
    },    
});