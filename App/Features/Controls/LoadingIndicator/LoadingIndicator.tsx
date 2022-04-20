import React, { useCallback, useRef, useState } from "react";
import { Animated, LayoutChangeEvent, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { aLittleLighterColor, lightColor, secondaryColor } from "../../../Global/GlobalConstants";

const LoadingIndicator = () => {

    const [dimensions, setDimensions] = useState([0,0]);
    const radius = dimensions[0] > dimensions[1] ? dimensions[1] / 2 - 10 : dimensions[0] / 2 - 10;  
    const circumference = 2 * Math.PI * radius;

    const rotateAnim = useRef(new Animated.Value(0)).current;

    const getDimensions = useCallback((event: LayoutChangeEvent) => {
        setDimensions([event.nativeEvent.layout.width, event.nativeEvent.layout.height]);
    }, [])

    return(
        <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'red'}} onLayout={getDimensions}>
            {(dimensions != [0,0]) && 
            <Svg style={{flex: 1}}>
                <Circle cx={dimensions[0] / 2} cy={dimensions[1] / 2} r={radius}
                        stroke={lightColor} strokeWidth={10}/>
            </Svg>
            }
        </View>
    )
}

export default LoadingIndicator;