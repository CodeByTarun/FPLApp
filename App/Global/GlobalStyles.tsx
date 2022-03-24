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
        position: 'absolute',
        height: '100%',
         width: '100%',
         top: 0,
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

        // Make the parent elements overflow: hidden to make this work for only the bottom!
        bottomShadow: {
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 3,
            shadowOpacity: 0.2,
            elevation: 3,
        },
        
        shadow: {
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 1.5,
            shadowOpacity: 0.4,
            elevation: 2,
        },
    }
)

export default globalStyles;