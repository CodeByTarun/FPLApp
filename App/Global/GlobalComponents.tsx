import React from "react"
import { View } from "react-native"
import { aLittleLighterColor, lightColor, secondaryColor } from "./GlobalConstants"

export const Seperator = () => {
    return (
        <View style={{borderBottomWidth: 1, borderBottomColor: secondaryColor }}/>
    )
}

export const VerticalSeparator = () => {
    return(
        <View style={{borderLeftColor: aLittleLighterColor, borderLeftWidth: 1, marginBottom: 7,  marginTop: 7}}/>
    )
}