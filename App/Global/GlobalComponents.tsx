import React from "react"
import { View } from "react-native"
import { aLittleLighterColor } from "./GlobalConstants"

export const seperator = () => {
    return (
        <View style={{borderBottomWidth: 1, borderBottomColor: aLittleLighterColor}}/>
    )
}