import { animated, easings, useSpring } from "@react-spring/native";
import React, { PropsWithChildren, useEffect } from "react";
import { Pressable } from "react-native";

const AnimatedPressable = animated(Pressable);

interface FixturesViewButtonProps {
    isVisible: boolean;
    buttonFn: () => void;
}

const FixturesViewButton = ({isVisible, buttonFn, children} : PropsWithChildren<FixturesViewButtonProps>) => {

    const [animatedStyle, api] = useSpring(() => ({ scale: 0 }));

    useEffect(function isVisibleChange() {
        api.start({
            to: { scale: isVisible ? 1 : 0 },
            delay: isVisible ? 300 : 0,
            config: {
                easing: easings.easeInQuart,
            }
        })
    }, [isVisible])

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
        <AnimatedPressable style={{transform: [{scale: animatedStyle.scale}]}} hitSlop={5} onPress={onButtonPress}>
            { children }
        </AnimatedPressable>
    )
}

export default FixturesViewButton;