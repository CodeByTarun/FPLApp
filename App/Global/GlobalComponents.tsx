import React from "react"
import { View } from "react-native"
import { moderateVerticalScale } from "react-native-size-matters"
import { aLittleLighterColor, secondaryColor } from "./GlobalConstants"

export const Seperator = () => {
    return (
        <View style={{borderBottomWidth: 1, borderBottomColor: secondaryColor }}/>
    )
}

export const VerticalSeparator = () => {
    return(
        <View style={{borderLeftColor: aLittleLighterColor, borderLeftWidth: 1, marginBottom: moderateVerticalScale(7),  marginTop: moderateVerticalScale(7)}}/>
    )
}

export const CustomVerticalSeparator = (bottom: number, top: number) => {
    return (
        <View style={{borderLeftColor: aLittleLighterColor, borderLeftWidth: 0.5, marginBottom: moderateVerticalScale(bottom),  marginTop: moderateVerticalScale(top)}}/>
    )
}