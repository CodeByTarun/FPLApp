import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";
import React from "react";
import { Modal, Pressable, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import globalStyles from "../../../Global/GlobalStyles";

interface ModalWrapperProps {
    isVisible: boolean,
    closeFn: () => void,
    children: React.ReactNode,
}

const ModalWrapper = ({ isVisible, closeFn, children } : ModalWrapperProps) => {

    return(
        <Modal style={styles.modal} transparent={true} visible={isVisible} testID='modalWrapper'>
            <Pressable testID="background" style={[styles.modalBackground, globalStyles.modalShadow]} onPress={() => closeFn()}>
                <TouchableWithoutFeedback>
                    { children }
                </TouchableWithoutFeedback>
            </Pressable>
        </Modal> 
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