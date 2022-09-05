import { Theme } from "@react-navigation/native"
import React from "react"
import { View } from "react-native"
import { moderateScale, moderateVerticalScale } from "react-native-size-matters"

export const Separator = (theme: Theme) => {
    return (
        <View testID="separator" style={{borderBottomWidth: moderateVerticalScale(1), borderBottomColor: theme.colors.background }}/>
    )
}

export const VerticalSeparator = (theme: Theme) => {
    return(
        <View testID="verticalSeparator" style={{borderLeftColor: theme.colors.background, borderLeftWidth: 1, marginBottom: moderateVerticalScale(7),  marginTop: moderateVerticalScale(7)}}/>
    )
}

export const CustomVerticalSeparator = (bottom: number, top: number, theme: Theme) => {
    return (
        <View style={{borderLeftColor: theme.colors.background, borderLeftWidth: moderateScale(0.5, 0.8), marginBottom: moderateVerticalScale(bottom),  marginTop: moderateVerticalScale(top)}}/>
    )
}