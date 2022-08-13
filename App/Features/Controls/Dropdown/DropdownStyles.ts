import { StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale, scale } from "react-native-size-matters";
import { textSecondaryColor, mediumFont, textPrimaryColor, largeFont, redColor, cornerRadius, height, lightColor, aLittleLighterColor, secondaryColor, primaryColor, width } from "../../../Global/GlobalConstants";

export const styles = StyleSheet.create({
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
        color: textSecondaryColor, 
        fontSize: mediumFont * 0.75,
        paddingLeft: scale(1),
    },

    selectedValueText: {
        color: textPrimaryColor,
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
        borderBottomColor: secondaryColor,
        borderBottomWidth: 2,
    },

    titleText: {
        color: textPrimaryColor,
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
        borderBottomColor: secondaryColor,
        borderBottomWidth: 1,
    },

    itemText: {
        color: textSecondaryColor,
        fontSize: mediumFont,
        paddingBottom: moderateVerticalScale(15),
        paddingTop: moderateVerticalScale(15),
        paddingLeft: moderateScale(5),
    },

    clearButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: redColor,
        borderRadius: cornerRadius,
        width: moderateScale(80),
        alignSelf: 'center',
        padding: moderateScale(10),
    },

    resetText: {
        fontSize: mediumFont, 
        color: textPrimaryColor,
    },

    resetContainer: {
        paddingTop: moderateVerticalScale(15),
        paddingBottom: moderateVerticalScale(5),
        borderTopColor: secondaryColor,
        borderTopWidth: 2,
    },
})