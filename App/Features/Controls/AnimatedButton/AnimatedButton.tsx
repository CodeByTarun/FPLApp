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

    const [isDisabled, setIsDisabled] = useState(disabled);
    const buttonSpring = useSpring({opacity: isDisabled ? 0.7 : 1});
    const [scaleSpring, api] = useSpring(() => ({ scale: 1 }))

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
                {scale: 0.97},
                {scale: 1},
            ],
            config: {duration: 50}, 
            onRest: () => buttonFn()
        })


        setTimeout(() => {
            setIsDisabled(disabled);
        }, 100);
    }

    return (
        <AnimatedPressable testID={'animatedButton'} hitSlop={0} style={{ opacity: buttonSpring.opacity, transform: [{scale: scaleSpring.scale}] }} onPress={onButtonPress} disabled={isDisabled}>
            { children }
        </AnimatedPressable>
    )
}

export default AnimatedButton;