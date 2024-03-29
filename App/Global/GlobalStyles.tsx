import React from "react";
import * as GlobalConstants from '../Global/GlobalConstants';
import { Platform, StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create(
    {
       flip: {
           transform: [
               { scaleX: -1 }
           ]
       },

       dropDownSymbol: {
            color: GlobalConstants.textPrimaryColor, 
            fontSize: GlobalConstants.mediumFont * 0.6, 
            fontWeight: '700', 
            marginTop: 0, 
            transform: [{rotate: '-45deg'}], 
            alignSelf: 'center',
            marginBottom: 5,
       },

       modalView: {
            width: '75%',
            backgroundColor: GlobalConstants.modalBackgroundColor,
            alignSelf: 'center',
            borderRadius: GlobalConstants.cornerRadius,
            padding: 10,
       },

       modalShadow: 
        (Platform.OS === "ios") ? 
            {
                shadowColor: 'black',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            } :
            {
                elevation: 10,
                borderWidth: 1.5,
                borderColor: 'rgba(10, 10, 10, 0.1)',
            }
       ,

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

        baseButton: {
            borderRadius: 100,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10
        },

        // Make the parent elements overflow: hidden to make this work for only the bottom!
        bottomShadow: (Platform.OS === 'ios') ? {
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 1,
            shadowOpacity: 0.15,
        } : {
            elevation: 5,
            borderBottomWidth: 1,
            borderColor: 'rgba(10, 10, 10, 0.2)',
        },

        topShadow: (Platform.OS === "ios") ? {
                shadowColor: 'black',
                shadowOffset: {width: 0, height: 0},
                shadowRadius: 2,
                shadowOpacity: 0.45,
            } : 
            {
                elevation: 5,
                borderWidth: 1,
                borderColor: 'rgba(10, 10, 10, 0.2)',
            },
        
        shadow:
            (Platform.OS === "ios") ? 
            {
                shadowColor: 'black',
                shadowOffset: {width: 0, height: 0},
                shadowRadius: 1.5,
                shadowOpacity: 0.6,
            } : 
            {
                elevation: 5,
                borderWidth: 1,
                borderColor: 'rgba(10,10, 10, 0.2)',
            }
        ,

        dots: {
            height: GlobalConstants.height*0.005,
            aspectRatio: 1,
            borderRadius: 100,
            marginRight: 1.5,
            marginLeft: 1.5,
        },
        
        tabShadow: {
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 0},
            shadowRadius: 5,
            shadowOpacity: 0.35,
            elevation: 2,
        },
    }
)

export default globalStyles;