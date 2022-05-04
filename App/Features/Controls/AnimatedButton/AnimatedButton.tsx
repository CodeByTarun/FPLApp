import { animated, easings, useSpring } from "@react-spring/native";
import React, { PropsWithChildren } from "react";
import { Pressable } from "react-native";
import { transform } from "typescript";

const AnimatedPressable = animated(Pressable);

interface AnimatedButtonProps {
    buttonFn: () => void;
}

const AnimatedButton = ({ buttonFn, children } : PropsWithChildren<AnimatedButtonProps>) => {

    const [animatedStyle, api] = useSpring(() => ({ scale: 1 }));

    const onButtonPress = () => {

        api.start({
            to: [
                {scale: 0.95},
                {scale: 1}
            ],
            onRest: buttonFn,
            config: {easing: easings.easeInQuint, duration: 10}
        })

    }

    return (
        <AnimatedPressable style={{transform: [{scale: animatedStyle.scale}]}} onPress={onButtonPress}>
            { children }
        </AnimatedPressable>
    )
}

export default AnimatedButton;