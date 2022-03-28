import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { cornerRadius, height, secondaryColor, width } from "../../Global/GlobalConstants";
import globalStyles from "../../Global/GlobalStyles";

interface dimensions {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface toolTipProps {
    distanceFromRight: number,
    distanceFromTop: number,
    distanceForArrowFromRight: number,
    isVisible: boolean,
    setIsVisible: (value: React.SetStateAction<boolean>) => void,
    view: JSX.Element;
}

const ToolTip = ({ distanceForArrowFromRight, distanceFromRight, distanceFromTop, view, isVisible, setIsVisible }: React.PropsWithChildren<toolTipProps>) => {

    return (
        <>
            { isVisible && 
            <>
                <TouchableOpacity style={styles.modalBackground} onPressIn={() => {setIsVisible(false)}} hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}/>
                <View style={[styles.modalView, {right: distanceFromRight, top: distanceFromTop}]}>
                    <View style={[styles.arrow, {right: distanceForArrowFromRight}]}/>
                    { view }
                </View>
            </>
            }
        </>
        
    )

}

export default ToolTip;

const styles = StyleSheet.create({

    modalView: {
        zIndex: 1000000,
        elevation: 100000,
        position: 'absolute',
        backgroundColor: secondaryColor,
        borderRadius: cornerRadius,
        
    },

    modalBackground: {
        position: 'absolute',
        height: height * 2,
        width: width * 2,
        top: -height,
        left: -width,
        opacity: 0.5,
        zIndex: 10000, 
        elevation: 10000, 
    },

    arrow: {
        position: 'absolute',
        top: -14,
        right: 0,
        height: 1,
        width: 5,
        zIndex: 100,
        borderLeftWidth:15,
        borderLeftColor:"transparent",
        borderRightWidth:15,
        borderRightColor:"transparent",
        borderBottomWidth:15,
        borderBottomColor: secondaryColor,
    }

});