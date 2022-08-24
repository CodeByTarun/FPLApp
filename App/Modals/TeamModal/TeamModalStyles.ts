import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native"
import { moderateScale, moderateVerticalScale } from "react-native-size-matters"
import { largeFont, mediumFont, cornerRadius, fieldColor } from "../../Global/GlobalConstants"

export const TemaModalStyles = (theme: Theme) => StyleSheet.create(
    {

        titleText: {
            alignSelf: 'center', 
            color: theme.colors.text,
            fontSize: largeFont,
            fontWeight: 'bold',
            marginTop: moderateVerticalScale(10), 
            marginBottom: moderateVerticalScale(5),
        },

        text: {
            color: theme.colors.text,
            fontSize: mediumFont,
        },

        modalAddTeamView: {
            borderRadius: cornerRadius,
            padding: moderateScale(5),
            flex: 1,
            width: '100%'
        },

        textInputContainer: {
            justifyContent: 'center',
            paddingTop: moderateVerticalScale(10),
            paddingBottom: moderateVerticalScale(10),
        },

        textInput: {
            backgroundColor: theme.colors.background,
            height: moderateVerticalScale(45, 0.2),
            paddingLeft: moderateScale(10),
            borderRadius: cornerRadius,
            fontSize: mediumFont,
        },

        checkBoxContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingRight: moderateScale(5),
            paddingTop: moderateVerticalScale(10),
        },

        buttonsContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
            width: '100%',
            alignSelf: 'center'
        },

        formButton: {
            justifyContent: 'center',
            backgroundColor: fieldColor,
            padding: moderateScale(10, 0.2),
            width: moderateScale(100, 0.4),
            borderRadius: cornerRadius,
        },

        modalListRow: {
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            height: moderateVerticalScale(45, 0.4)
        },
        
        button: {
            justifyContent: 'center',
        },

        icon: {
            width: '80%',
            height: '80%',
            aspectRatio: 1,
            alignSelf: 'center'
        },

        modalTeamList: {
            flex: 1,
            width: '100%',
            margin: moderateScale(5),
            paddingTop: moderateVerticalScale(10),
        },        

        addButton: {
            width: moderateScale(100, 0.4),
            backgroundColor: theme.colors.background,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: cornerRadius,
            alignSelf: 'center',
            marginTop: moderateVerticalScale(5),
            marginBottom: moderateVerticalScale(5),
            padding: moderateScale(10, 0.2)
        },

        buttonText: {
            fontSize: mediumFont,
        },

        favouriteButtonContainer: {
            paddingLeft: moderateScale(4), 
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: moderateScale(6),
            paddingBottom: moderateScale(6),
        },

        favouriteButton: {
            height: '75%',
            width: '75%',
            alignSelf: 'center',
            justifyContent: 'center',
        },

        teamButton: {
            flex: 7,
            marginLeft: moderateScale(5),
        },

        editButtonContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            paddingTop: moderateScale(8),
            paddingBottom: moderateScale(8),
            paddingRight: moderateScale(6),
        },

        editButton: {
            height: '75%',
            width: '75%',
            justifyContent: 'center',
            alignSelf: 'center',
        },
    }
);