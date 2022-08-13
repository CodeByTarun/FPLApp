import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, useCardAnimation } from "@react-navigation/stack";
import React, { PropsWithChildren, useCallback } from "react";
import { Animated, Keyboard, Pressable, StyleSheet, View } from "react-native";
import { moderateVerticalScale } from "react-native-size-matters";
import { RootStackParams } from "../../../../App";
import { primaryColor } from "../../../Global/GlobalConstants";
import globalStyles from "../../../Global/GlobalStyles";
import CloseButton from "../CloseButton/CloseButton";

interface ModalWrapperProps {
    modalHeight?: string | number;
    modalWidth?: string | number;
    maxHeight?: number;
}

const ModalWrapper = ({ children, modalHeight, modalWidth, maxHeight } : PropsWithChildren<ModalWrapperProps>) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const { current } = useCardAnimation();

    const modalScale = current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const closeFuntion = useCallback(() => {
        Keyboard.dismiss();
        navigation.goBack();
    }, [])

    return(
        <View testID="background" style={styles.modalBackground}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)' }]} onPress={closeFuntion}/>
            <Animated.View style={[styles.modal, globalStyles.modalShadow, 
                                    modalHeight ? {height: modalHeight} : {}, 
                                    modalWidth ? {width: modalWidth} : {}, 
                                    maxHeight ? {maxHeight: maxHeight} : {},
                                    {transform: [{ scale: modalScale }]}]}>
                <CloseButton closeFunction={closeFuntion}/> 
                { children }
            </Animated.View>
        </View>
)}

export default ModalWrapper;

export const styles = StyleSheet.create({

    modal: {
        justifyContent: 'center', 
        alignItems: 'center', 
        alignSelf: 'center', 
        zIndex: 1,
        position: 'absolute',
        padding: moderateVerticalScale(10),
        borderRadius: 10,
        backgroundColor: primaryColor,
       },

    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});