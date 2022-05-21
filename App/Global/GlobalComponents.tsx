import React from "react"
import { View } from "react-native"
import { aLittleLighterColor, secondaryColor } from "./GlobalConstants"

export const Seperator = () => {
    return (
        <View style={{borderBottomWidth: 1, borderBottomColor: secondaryColor }}/>
    )
}

export const VerticalSeparator = () => {
    return(
        <View style={{borderLeftColor: aLittleLighterColor, borderLeftWidth: 0.5, marginBottom: 7,  marginTop: 7}}/>
    )
}

export const CustomVerticalSeparator = (bottom: number, top: number) => {
    return (
        <View style={{borderLeftColor: aLittleLighterColor, borderLeftWidth: 0.5, marginBottom: bottom,  marginTop: top}}/>
    )
}