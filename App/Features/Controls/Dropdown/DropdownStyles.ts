import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";
import { textSecondaryColor, mediumFont, textPrimaryColor, largeFont, redColor, cornerRadius, height, lightColor, aLittleLighterColor, secondaryColor, primaryColor, width } from "../../../Global/GlobalConstants";

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
    },

    selectedValueText: {
        color: theme.colors.text,
        fontSize: mediumFont,
        marginRight: moderateScale(5),
        alignSelf: 'center',
        flex: 1,
    },

    modal: {
        justifyContent: 'center', 
        alignItems: 'center', 
        alignSelf: 'center', 
        flex: 1, 
        zIndex: 1,
        position: 'absolute'
       },

    titleContainer: {
        padding: moderateScale(15),
        borderBottomColor: theme.colors.background,
        borderBottomWidth: 2,
    },

    titleText: {
        color: theme.colors.text,
        alignSelf: 'center',
        fontSize: largeFont,
        fontWeight: 'bold',
    },

    flatList: {
    },

    flatListHeader: {
        elevation: 0.1,
        zIndex: 1,
    },

    itemView: {
        borderBottomColor: theme.colors.background,
        borderBottomWidth: 1,
    },

    itemText: {
        color: theme.colors.notification,
        fontSize: mediumFont,
        paddingBottom: moderateVerticalScale(15),
        paddingTop: moderateVerticalScale(15),
        paddingLeft: moderateScale(5),
    },

    clearButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: redColor,
        borderRadius: 100,
        width: moderateScale(80),
        alignSelf: 'center',
        padding: moderateScale(10),
    },

    resetText: {
        fontSize: mediumFont, 
        color: theme.colors.text,
    },

    resetContainer: {
        paddingTop: moderateVerticalScale(15),
        paddingBottom: moderateVerticalScale(5),
        borderTopColor: theme.colors.background,
        borderTopWidth: 2,
    },
})