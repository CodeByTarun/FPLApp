import React from "react";
import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create(
    {
       flip: {
           transform: [
               { scaleX: -1 }
           ]
       },
    }
)

export default globalStyles;