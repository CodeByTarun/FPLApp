import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";
import { textSecondaryColor, mediumFont, textPrimaryColor, largeFont, redColor, cornerRadius, height, lightColor, aLittleLighterColor, secondaryColor, primaryColor, width, defaultFont } from "../../../Global/GlobalConstants";

export const DropDownStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column', 
        alignItems:'center', 
        justifyContent:'center',
        marginLeft: moderateScale(7),
        marginRight: moderateScale(3),
    },

    buttonContainer: {
         flexDirection: 'row',
         width: '100%',
         alignSelf: 'center',
         zIndex: 0.5,
         paddingRight: moderateScale(5)
    },

    headerText: {
        alignSelf: 'flex-start',
        marginBottom: moderateVerticalScale(2), 
        color: theme.colors.border, 
        fontSize: mediumFont * 0.75,
        paddingLeft: scale(1),
        fontFamily: defaultFont,
    },

    selectedValueText: {
        color: theme.colors.text,
        fontSize: mediumFont,
        marginRight: moderateScale(5),
        alignSelf: 'center',
        flex: 1,
        fontFamily: defaultFont,
    },

    modal: {
        justifyContent: 'center', 
        alignItems: 'center', 
        alignSelf: 'center', 
        flex: 1, 
        zIndex: 1,
        position: 'absolute'
       },
})