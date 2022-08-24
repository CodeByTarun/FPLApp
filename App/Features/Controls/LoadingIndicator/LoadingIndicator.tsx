import { useTheme } from "@react-navigation/native";
import { animated, useSpring } from "@react-spring/native";
import React, { useCallback, useRef, useState } from "react";
import { Animated, Easing, LayoutChangeEvent, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Path, Stop } from "react-native-svg";
import { transform } from "typescript";
import { lightColor, primaryColor } from "../../../Global/GlobalConstants";

const AnimatedView = animated(View);

const LoadingIndicator = () => {

    const theme = useTheme();

    const rotationSpring = useSpring({
        to: {rotate: '360deg'},
        from: {rotate: '0deg'},
        loop: true,
        config: { duration: 1250 }
    })

    return(
        <AnimatedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', transform:[{rotateZ: rotationSpring.rotate}]}}>
            <Svg width={'90%'} height={'90%'} viewBox="0 0 100 100" style={{alignSelf: 'center'}}>
                <Defs>
                    <LinearGradient id="opacity">
                        <Stop offset={'0%'} stopOpacity={1.0} stopColor={theme.colors.border}/>
                        <Stop offset={'60%'} stopOpacity={0.04} stopColor={theme.colors.border}/>
                        <Stop offset={'100%'} stopOpacity={0} stopColor={theme.colors.primary}/>
                    </LinearGradient>
                </Defs>
                <Path d="M10 50 A 40 40 0 0 0 90 50" stroke={'url(#opacity)'} strokeWidth={15} strokeLinecap={"round"}/>
            </Svg>
        </AnimatedView>
    )
}

export default LoadingIndicator;