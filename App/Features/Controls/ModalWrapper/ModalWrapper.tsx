import { animated, config, easings, useSpring, useTransition } from "@react-spring/native";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import globalStyles from "../../../Global/GlobalStyles";
import { useAppDispatch } from "../../../Store/hooks";
import { closeModal } from "../../../Store/modalSlice";
import CloseButton from "../CloseButton/CloseButton";

interface ModalWrapperProps {
    isVisible: boolean,
    closeFn: () => void,
    children: React.ReactNode,
    modalHeight?: string;
    modalWidth?: string;
}

const AnimatedPressable = animated(Pressable);
const AnimatedView = animated(View);

const ModalWrapper = ({ isVisible, closeFn, children, modalHeight, modalWidth } : ModalWrapperProps) => {


    const dispatch = useAppDispatch();

    const transitions = useTransition(isVisible, {
        from: { backgroundColor: 'rgba(0, 0, 0, 0.1)', top: '100%' },
        enter: { backgroundColor: 'rgba(0, 0, 0, 0.5)', top: '0%' },
        leave: { backgroundColor: 'rgba(0, 0, 0, 0.1)', top: '100%' },
        config: {
            duration: 250,
            easing: easings.easeInQuart,
        },
    })

    return(
        transitions((styling, show) => show && 
                <AnimatedPressable testID="background" style={[styles.modalBackground, globalStyles.modalShadow, {backgroundColor: styling.backgroundColor}]} onPress={closeFn}>
                    <TouchableWithoutFeedback style={{}}>
                        <AnimatedView style={[globalStyles.modalView, globalStyles.modalShadow, 
                                              modalHeight ? {height: modalHeight} : {}, 
                                              modalWidth ? {width: modalWidth} : {}, 
                                              {top: styling.top}]}>
                            <CloseButton closeFunction={() => dispatch(closeModal())}/>
                            { children }
                        </AnimatedView>
                    </TouchableWithoutFeedback>
                </AnimatedPressable>)
    )
}

export default ModalWrapper;

export const styles = StyleSheet.create({

    modal: {
        justifyContent: 'center', 
        alignItems: 'center', 
        alignSelf: 'center', 
        flex: 1, 
        zIndex: 1,
        position: 'absolute'
       },

    modalBackground: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },

});