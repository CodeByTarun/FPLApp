import { Theme, useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp, useCardAnimation } from "@react-navigation/stack";
import React, { PropsWithChildren, useCallback } from "react";
import { Animated, Keyboard, Pressable, StyleSheet, View } from "react-native";
import { moderateVerticalScale } from "react-native-size-matters";
import { RootStackParams } from "../../../../App";
import { primaryColor } from "../../../Global/GlobalConstants";
import globalStyles from "../../../Global/GlobalStyles";
import CloseButton from "../CloseButton/CloseButton";
import { throttle } from "lodash";

interface ModalWrapperProps {
    modalHeight?: string | number;
    modalWidth?: string | number;
    maxHeight?: number;
}

const ModalWrapper = ({ children, modalHeight, modalWidth, maxHeight } : PropsWithChildren<ModalWrapperProps>) => {

    const theme = useTheme();
    const styles = ModalWrapperStyles(theme);
    

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const { current } = useCardAnimation();

    const modalScale = current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    const throttledCloseFunction = throttle(navigation.goBack, 200);

    const closeFuntion = useCallback(() => {
        Keyboard.dismiss();
        throttledCloseFunction();        
    }, [])

    return(
        <View testID="background" style={styles.modalBackground}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.6)' }]} onPress={closeFuntion}/>
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

export const ModalWrapperStyles = (theme: Theme) => StyleSheet.create({

    modal: {
        justifyContent: 'center', 
        alignItems: 'center', 
        alignSelf: 'center', 
        zIndex: 1,
        position: 'absolute',
        padding: moderateVerticalScale(10),
        borderRadius: 10,
        backgroundColor: theme.colors.primary,
       },

    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

});