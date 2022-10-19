import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { defaultFont, mediumFont, semiBoldFont } from "../../../Global/GlobalConstants";

export const FixtureGroupStyle = (theme: Theme) => StyleSheet.create({

    container: {
        alignSelf: 'center',
        width: '90%',
        borderRadius: 10,
        backgroundColor: theme.colors.primary,
        zIndex: 1,
        marginTop: 10,
        marginBottom: 10,
    },

    dateContainer: {
        backgroundColor: theme.colors.background,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    text: {
        textAlign: 'center',
        color: theme.colors.text,
        fontFamily: semiBoldFont,
        fontSize: mediumFont * 1.1,
        marginTop: moderateScale(10),
        marginBottom: moderateScale(10),
    },

});