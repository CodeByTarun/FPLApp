import React from "react";
import * as GlobalConstants from '../Global/GlobalConstants';
import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create(
    {
       flip: {
           transform: [
               { scaleX: -1 }
           ]
       },

       modalView: {
            position: 'absolute',
            top: GlobalConstants.height * 0.23,
            width: '75%',
            backgroundColor: GlobalConstants.modalBackgroundColor,
            alignSelf: 'center',
            borderRadius: GlobalConstants.cornerRadius,
            padding: 10,
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

       modalBackground: {
        backgroundColor: 'black',
        height: "100%",
        width: "100%",
        opacity: 0.50,
       },

       closeButton: {
            position: 'absolute',
            zIndex: 1,
            right: -5,
            top: -5,
            height: 15,
            width: 15,
            margin: 0,
            backgroundColor: GlobalConstants.primaryColor,
        },

        closeButtonBackground: {
            
        },
    }
)

export default globalStyles;