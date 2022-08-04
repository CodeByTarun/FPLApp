import { animated, easings, useSpring } from "@react-spring/native";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { Pressable } from "react-native";
import { transform } from "typescript";

const AnimatedPressable = animated(Pressable);

interface AnimatedButtonProps {
    buttonFn: () => void;
    disabled?: boolean;
}

const AnimatedButton = ({ buttonFn, disabled = false, children } : PropsWithChildren<AnimatedButtonProps>) => {

    const [animatedStyle, api] = useSpring(() => ({ scale: 1 }));
    const [isDisabled, setIsDisabled] = useState(disabled);

    useEffect(() => {
        if (disabled) {
            setIsDisabled(true);
        }
        else {
            setIsDisabled(false);
        }
    }, [disabled])

    const onButtonPress = () => {

        setIsDisabled(true);

        api.start({
            to: [
                {scale: 0.95},
                {scale: 1}
            ],
            config: {easing: easings.easeInQuint, duration: 100}
        });

        setTimeout(() => {
            buttonFn();
            setIsDisabled(disabled);
        }, 100);

    }

    return (
        <AnimatedPressable testID={'animatedButton'} hitSlop={5} style={{transform: [{scale: animatedStyle.scale}], opacity: isDisabled ? 0.5 : 1}} onPress={onButtonPress} disabled={isDisabled}>
            { children }
        </AnimatedPressable>
    )
}

export default AnimatedButton;