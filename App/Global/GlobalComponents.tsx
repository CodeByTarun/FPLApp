import React from "react"
import { View } from "react-native"
import { aLittleLighterColor } from "./GlobalConstants"

export const Seperator = () => {
    return (
        <View style={{borderBottomWidth: 1, borderBottomColor: aLittleLighterColor}}/>
    )
}

export const VerticalSeparator = () => {
    return(
        <View style={{borderLeftColor: aLittleLighterColor, borderLeftWidth: 1, marginBottom: 7,  marginTop: 7}}/>
    )
}