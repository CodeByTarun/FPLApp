import { Theme } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";

export const FilterModalStyles = (theme: Theme) => StyleSheet.create({

    modal: {
        justifyContent: 'center', 
        alignItems: 'center', 
        zIndex: 1,
        position: 'absolute',
        bottom: 0,
        padding: moderateScale(10),
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: theme.colors.primary,
        width: '85%',
       },

    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});