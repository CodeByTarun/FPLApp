import { animated, useSpring } from "@react-spring/native";
import React from "react";
import { TouchableOpacity, StyleSheet, Image, Pressable } from "react-native";
import { cornerRadius, primaryColor, secondaryColor } from "../../../Global/GlobalConstants";
import globalStyles from "../../../Global/GlobalStyles";
import { Icons } from "../../../Global/Images";

const AnimatedPressable = animated(Pressable);

interface ButtonProps {
    image: string,
    buttonFunction: () => void,
    isDisabled?: boolean,
}

const CustomButton = ({image, buttonFunction, isDisabled = false} : ButtonProps) => {

    const [animatedStyles, api] = useSpring(() => ({scale: 1}))

    const onPressFn = () => {
        api.start({
            to: [
                {scale: 0.95},
                {scale: 1}
            ],
            config: {duration: 10},
            onRest: buttonFunction
        });
    }

    return (
        <AnimatedPressable testID="imageButton" style={[styles.touchable, { transform: [{ scale: animatedStyles.scale }] }]} onPress={onPressFn} disabled={isDisabled} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
            <Image style={[styles.icon]} source={Icons[image]} resizeMode='contain'/>
        </AnimatedPressable>
    )
}

export default CustomButton;

const styles = StyleSheet.create({
    
    touchable: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 3,
    }, 

    icon: {
        width: '90%',
        height: '90%',
        alignSelf: 'center'
    },
});

