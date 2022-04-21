import React, { useCallback, useRef, useState } from "react";
import { Animated, Easing, LayoutChangeEvent } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { lightColor, primaryColor } from "../../../Global/GlobalConstants";

const LoadingIndicator = () => {

    const [dimensions, setDimensions] = useState([0,0]);
    const radius = dimensions[0] > dimensions[1] ? dimensions[1] / 2 - 10 : dimensions[0] / 2 - 10;  
    const circumference = 2 * Math.PI * radius;

    const getDimensions = useCallback((event: LayoutChangeEvent) => {
        setDimensions([event.nativeEvent.layout.width, event.nativeEvent.layout.height]);
    }, [])

    const rotateAnimValue = useRef(new Animated.Value(0)).current;
    const spin = rotateAnimValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    });

    Animated.loop(
        Animated.timing(rotateAnimValue, {
            toValue: 1, 
            duration: 1500,
            easing: Easing.linear,
            useNativeDriver: false,
        })
    ).start()

    return(
        <Animated.View style={{flex: 1, justifyContent: 'center', transform: [{ rotate: spin }]}} onLayout={getDimensions}>
            {(dimensions != [0,0]) && 
            <Svg style={{flex: 1}}>
                <Defs>
                    <LinearGradient id="opacity">
                        <Stop offset={'0%'} stopOpacity={1.0} stopColor={lightColor}/>
                        <Stop offset={'60%'} stopOpacity={0.2} stopColor={lightColor}/>
                        <Stop offset={'100%'} stopOpacity={0} stopColor={primaryColor}/>
                    </LinearGradient>
                </Defs>
                <Circle cx={dimensions[0] / 2} cy={dimensions[1] / 2} r={radius}
                        stroke={"url(#opacity)"} strokeWidth={10} strokeDasharray={circumference * 0.5}
                        strokeLinecap={"round"}/>
            </Svg>
            }
        </Animated.View>
    )
}

export default LoadingIndicator;