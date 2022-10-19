import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { height, width, largeFont, textPrimaryColor, secondaryColor, mediumFont, cornerRadius, semiBoldFont, defaultFont } from "../../../Global/GlobalConstants";

export const GameweekViewStyles = (theme: Theme) => StyleSheet.create({
    
    container: {
        height: '100%',
         width: '100%',
    },

    titleText: {
        fontSize: largeFont, 
        color: theme.colors.text, 
        alignSelf: 'center', 
        marginTop: moderateVerticalScale(10),
        marginBottom: moderateVerticalScale(10), 
        textAlign: 'center',
        fontFamily: semiBoldFont,
    },

    listContainer: {
        marginTop: moderateVerticalScale(10), 
        borderTopWidth: 1, 
        borderBottomWidth: 1, 
        borderColor: theme.colors.background,
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
        borderTopColor: theme.colors.background,
        borderTopWidth: 1,
    },

    text: {
        color: theme.colors.text,
        fontSize: mediumFont,
        fontFamily: defaultFont
    },

    currentGameweekButton: {
        alignSelf: 'center',
        backgroundColor: theme.colors.background,
        borderRadius: cornerRadius,
        padding: moderateScale(10, 0.2),
        width: moderateScale(145, 0.25),
    },
    
});