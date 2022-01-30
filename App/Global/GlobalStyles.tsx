import React from "react";
import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create(
    {
       flip: {
           transform: [
               { scaleX: -1 }
           ]
       },

       modalShadow: {
            shadowColor: 'black',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
       },
    }
)

export default globalStyles;