import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { height, width, largeFont, textPrimaryColor, secondaryColor, mediumFont, cornerRadius } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
    
    container: {
        height: '100%',
         width: '100%',
    },

    titleText: {
        fontSize: largeFont, 
        color: textPrimaryColor, 
        alignSelf: 'center', 
        marginTop: moderateVerticalScale(10),
        marginBottom: moderateVerticalScale(10), 
        fontWeight: '700', 
        textAlign: 'center',
    },

    listContainer: {
        marginTop: moderateVerticalScale(10), 
        borderTopWidth: 1, 
        borderBottomWidth: 1, 
        borderColor: secondaryColor,
    },

    gameweekItem: {
        height: moderateVerticalScale(height * 0.06, -0.3),
        justifyContent: 'center',
        paddingLeft: moderateScale(7),
    },

    bottomView: {
        paddingBottom: moderateVerticalScale(10),
        paddingTop: moderateVerticalScale(20),
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderTopColor: secondaryColor,
        borderTopWidth: 1,
    },

    text: {
        color: textPrimaryColor,
        fontSize: mediumFont,
    },

    currentGameweekButton: {
        alignSelf: 'center',
        backgroundColor: secondaryColor,
        borderRadius: cornerRadius,
        padding: moderateScale(10, 0.2),
        width: moderateScale(145, 0.25),
    },
    
});