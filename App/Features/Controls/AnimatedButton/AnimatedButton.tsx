import { animated, easings, useSpring } from "@react-spring/native";
import React, { PropsWithChildren } from "react";
import { Pressable } from "react-native";
import { transform } from "typescript";

const AnimatedPressable = animated(Pressable);

interface AnimatedButtonProps {
    buttonFn: () => void;
    disabled?: boolean;
}

const AnimatedButton = ({ buttonFn, disabled = false, children } : PropsWithChildren<AnimatedButtonProps>) => {

    const [animatedStyle, api] = useSpring(() => ({ scale: 1 }));

    const onButtonPress = () => {

        api.start({
            to: [
                {scale: 0.95},
                {scale: 1}
            ],
            config: {easing: easings.easeInQuint, duration: 100}
        });

        setTimeout(() => buttonFn(), 100);

    }

    return (
        <AnimatedPressable testID={'animatedButton'} style={{transform: [{scale: animatedStyle.scale}]}} onPress={onButtonPress} disabled={disabled}>
            { children }
        </AnimatedPressable>
    )
}

export default AnimatedButton;