import { animated, easings, useSpring, useTransition } from "@react-spring/native";
import React, { useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Modal, Pressable } from "react-native";
import { cornerRadius, height, primaryColor, secondaryColor, width } from "../../../Global/GlobalConstants";
import globalStyles from "../../../Global/GlobalStyles";

const AnimatedView = animated(View);
const AnimatedPressable = animated(Pressable);

interface dimensions {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface ToolTipProps {
    distanceFromRight: number,
    distanceFromTop: number,
    distanceForArrowFromRight: number,
    isVisible: boolean,
    setIsVisible: (value: React.SetStateAction<boolean>) => void,
    view: JSX.Element;
    isArrowAbove?: boolean;
}

const ToolTip = ({ distanceForArrowFromRight, distanceFromRight, distanceFromTop, view, isVisible, setIsVisible, isArrowAbove = true }: ToolTipProps) => {
    
    const transitions = useTransition(isVisible, {
        from: { backgroundColor: 'rgba(0, 0, 0, 0)', opacity: 0 },
        enter: { backgroundColor: 'rgba(0, 0, 0, 0.5)', opacity: 1 },
        leave: { backgroundColor: 'rgba(0, 0, 0, 0)', opacity: 0 },
        config: {
            duration: 100,
            easing: easings.easeInQuart,
        },
    })

    return (
        <Modal style={{margin: 0}} visible={isVisible} statusBarTranslucent transparent={true}>
            { transitions((animatedStyle, show) => show &&
            <>
                <AnimatedPressable testID="background" style={[styles.modalBackground, {backgroundColor: animatedStyle.backgroundColor}]} onPress={() => { setIsVisible(false); } } hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }} children={undefined}/>
                <AnimatedView testID="tooltip" style={[styles.modalView, globalStyles.modalShadow, {opacity: animatedStyle.opacity}, isArrowAbove ? {right: distanceFromRight, top: distanceFromTop } : {right: distanceFromRight, bottom: distanceFromTop}]}>
                    <View testID="arrow" style={[styles.arrow, isArrowAbove ? styles.above : styles.below, {right: distanceForArrowFromRight}]}/>
                    { view }
                </AnimatedView> 
            </>
            )}
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
        top: -13,
    },

    below: {
        bottom: -13,
        transform: [{rotate: "180deg"}]
    },

});