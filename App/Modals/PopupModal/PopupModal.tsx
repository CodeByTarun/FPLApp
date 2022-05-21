import { animated, easings, useTransition } from "@react-spring/native";
import React from "react";
import { View, Pressable, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { cornerRadius, primaryColor } from "../../Global/GlobalConstants";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { closePopup } from "../../Store/popupSlice";

const AnimatedView = animated(View);
const AnimatedPressable = animated(Pressable);

const PopupModal = () => {

    const dispatch = useAppDispatch();
    const popupView = useAppSelector(state => state.popup);

    const transitions = useTransition(popupView !== null, {
        from: { backgroundColor: 'rgba(0, 0, 0, 0)', opacity: 0 },
        enter: { backgroundColor: 'rgba(0, 0, 0, 0.5)', opacity: 1 },
        leave: { backgroundColor: 'rgba(0, 0, 0, 0)', opacity: 0 },
        config: {
            duration: 100,
            easing: easings.easeInQuart,
        },
    });

    return (
            transitions((animatedStyle, show) => show && 
                <AnimatedPressable testID="background" style={[styles.modalBackground, {backgroundColor: animatedStyle.backgroundColor}]} onPress={() => dispatch(closePopup())}>
                    <TouchableWithoutFeedback>
                        <View testID="popup" style={[styles.modalView]}>
                            { popupView }
                        </View>
                    </TouchableWithoutFeedback>
                </AnimatedPressable>
            )
    )
}

export default PopupModal;

const styles = StyleSheet.create({
    modalView: {
        zIndex: 2,
        elevation: 2,
        backgroundColor: primaryColor,
        borderRadius: cornerRadius,        
    },
    
    modalBackground: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});