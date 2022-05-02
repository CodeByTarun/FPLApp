import { animated, config, useSpring } from "@react-spring/native";
import React from "react";
import { Modal, Pressable, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import globalStyles from "../../../Global/GlobalStyles";

interface ModalWrapperProps {
    isVisible: boolean,
    closeFn: () => void,
    children: React.ReactNode,
}

const AnimatedPressable = animated(Pressable);
const AnimatedView = animated(View);

const ModalWrapper = ({ isVisible, closeFn, children } : ModalWrapperProps) => {

    const backgroundSpring = useSpring({backgroundColor: isVisible ? 'rgba(0,0,0, 0.5)' : 'rgba(52, 52, 52, 0)', config: config.molasses});
    const viewSpring = useSpring({scale: isVisible ? 2 : 0, delay: 2000});

    return(
        <>
        { isVisible &&
            <Modal style={styles.modal} transparent={true} visible={true} testID='modalWrapper'>
                <AnimatedPressable testID="background" style={[styles.modalBackground, globalStyles.modalShadow, backgroundSpring]} onPress={() => closeFn()}>
                    <TouchableWithoutFeedback style={{}}>
                        { children }
                    </TouchableWithoutFeedback>
                </AnimatedPressable>
            </Modal> 
        }
        </>
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