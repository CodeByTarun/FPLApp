import React from "react";
import { StyleSheet, View, TouchableOpacity, Modal } from "react-native";
import { cornerRadius, height, primaryColor, secondaryColor, width } from "../../../Global/GlobalConstants";

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
    isArrowAbove?: boolean;
}

const ToolTip = ({ distanceForArrowFromRight, distanceFromRight, distanceFromTop, view, isVisible, setIsVisible, isArrowAbove = true }: React.PropsWithChildren<toolTipProps>) => {

    return (
        <Modal visible={isVisible} transparent={true}>
            <TouchableOpacity testID="background" style={styles.modalBackground} onPress={() => {setIsVisible(false)}} hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}/>
            <View testID="tooltip" style={[styles.modalView, {right: distanceFromRight, top: distanceFromTop}]}>
                <View testID="arrow" style={[styles.arrow, isArrowAbove ? styles.above : styles.below, {right: distanceForArrowFromRight}]}/>
                { view }
            </View>
        </Modal>
    )

}

export default ToolTip;

const styles = StyleSheet.create({

    modalView: {
        zIndex: 2,
        elevation: 2,
        position: 'absolute',
        backgroundColor: primaryColor,
        borderRadius: cornerRadius,
        
    },

    modalBackground: {
        position: 'absolute',
        height: height * 2,
        width: width * 2,
        top: -height,
        left: -width,
        opacity: 0.5,
        backgroundColor: 'black',
        zIndex: 1, 
        elevation: 1, 
    },

    arrow: {
        position: 'absolute',
        right: 0,
        height: 1,
        width: 5,
        zIndex: 100,
        borderLeftWidth:15,
        borderLeftColor:"transparent",
        borderRightWidth:15,
        borderRightColor:"transparent",
        borderBottomWidth:15,
        borderBottomColor: primaryColor,
    },

    above: {
        top: -14,
    },

    below: {
        bottom: -14,
        transform: [{rotate: "180deg"}]
    },

});