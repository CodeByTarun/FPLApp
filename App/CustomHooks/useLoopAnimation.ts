import { useEffect } from "react";
import { Animated } from "react-native";

export const useLoopAnimation = (animationFn: Animated.CompositeAnimation) => {
    let stopped = false;

    const loopAnimation = () => {
        if (stopped) return false;
        animationFn.start(() => loopAnimation())
    };

    useEffect(() => {
        stopped = true;
    });

    return loopAnimation;
}