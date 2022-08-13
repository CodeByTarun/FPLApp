import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { width, textPrimaryColor, mediumFont, lightColor, secondaryColor, aLittleLighterColor, primaryColor, textSecondaryColor, cornerRadius } from "../../../../Global/GlobalConstants";

export const styles = StyleSheet.create({

    container: {
        flex: 1, 
        paddingBottom: moderateVerticalScale(5),
        marginBottom: moderateVerticalScale(5), 
        backgroundColor: primaryColor, 
        paddingLeft: moderateScale(5), 
        paddingRight: moderateScale(5),
        borderWidth: 2,
        borderColor: aLittleLighterColor,
        borderRadius: cornerRadius,
    },

    tableTextContainer: {
        width: moderateScale(38, 0.4),
        flex: 1,
    },

    headerText: {
        color: textPrimaryColor,
        fontSize: mediumFont * 0.9,
        fontWeight: '500',
        alignSelf: 'center',
    },

    headerContainer: {
        flexDirection: 'row', 
        alignItems: 'center',  
        width: '100%',
        borderBottomColor: lightColor, 
        borderBottomWidth: 1,
        paddingBottom: moderateVerticalScale(8), 
        paddingTop: moderateVerticalScale(8),
        backgroundColor: primaryColor
    },

    historyItemContainer: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingBottom: moderateVerticalScale(5), 
        paddingTop: moderateVerticalScale(5),
        borderBottomColor: aLittleLighterColor, 
        borderBottomWidth: 1,
    },

    footerContainer: {
        backgroundColor: primaryColor,
        flexDirection: 'row', 
        borderTopColor: lightColor, 
        borderTopWidth: 1, 
        paddingTop: moderateVerticalScale(5),
    }

});