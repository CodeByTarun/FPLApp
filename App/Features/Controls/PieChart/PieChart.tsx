import { Theme, useTheme } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View, StyleSheet, LayoutChangeEvent, Text } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import Svg, { Circle, Path } from "react-native-svg";
import * as GlobalConstants from "../../../Global/GlobalConstants";

interface PieChartProps {
    firstStatName: string;
    secondStatName: string;
    firstStatValue: number;
    secondStatValue: number;
    firstStatColor: string;
    secondStatColor: string;
}

const PieChart = (props: PieChartProps) => {

    const theme = useTheme();
    const styles = PieChartStyles(theme);

    const [dimensions, setDimensions] = useState([0,0]);

    const radius = dimensions[0] > dimensions[1] ? dimensions[1] / 2 - 10 : dimensions[0] / 2 - 10;  
    const circumference = 2 * Math.PI * radius;

    const isFirstValueEqualOrBigger = props.firstStatValue >= props.secondStatValue;

    const getDimensions = useCallback((event: LayoutChangeEvent) => {
        setDimensions([event.nativeEvent.layout.width, event.nativeEvent.layout.height]);
    }, [])

    return (
        <View style={{flex: 1, justifyContent: 'center'}} onLayout={getDimensions}>
            {(dimensions != [0,0]) && 
                <Svg width={dimensions[0]} height={dimensions[1]} style={{alignSelf: 'center', position: 'absolute', transform: [{scaleX: isFirstValueEqualOrBigger ? 1 : -1}]}}>
                    <Circle cx={dimensions[0] / 2} cy={dimensions[1] / 2} r={radius}
                            stroke={(props.firstStatValue === 0 && props.secondStatValue === 0) ? 'gray' : (isFirstValueEqualOrBigger ? props.secondStatColor : props.firstStatColor)} strokeWidth={moderateScale(7)}/>
                    <Circle cx={dimensions[0] / 2} cy={dimensions[1] / 2} r={radius} 
                            stroke={(props.firstStatValue === 0 && props.secondStatValue === 0) ? 'gray' : isFirstValueEqualOrBigger ? props.firstStatColor : props.secondStatColor} strokeWidth={moderateScale(7)} 
                            strokeDasharray={circumference * ( (isFirstValueEqualOrBigger ? props.firstStatValue : props.secondStatValue)/(props.firstStatValue + props.secondStatValue))}
                            transform={`rotate(-90, ${dimensions[0]/2}, ${dimensions[1]/2})`}/>
                </Svg>
            }
            
            <View style={styles.textContainer}>
                <Text style={[styles.text, {fontSize: radius * moderateVerticalScale(0.31), color:props.firstStatColor}]}>{props.firstStatName}: {props.firstStatValue}</Text>
                <Text style={[styles.text, {fontSize: radius * moderateVerticalScale(0.31), color:props.secondStatColor}]}>{props.secondStatName}: {props.secondStatValue}</Text>
            </View>            
        </View>
    )
}

export default PieChart;

const PieChartStyles = (theme: Theme) => StyleSheet.create({
    backgroundCircle: {
        borderRadius: 100,
        borderColor: 'black',
        borderWidth: moderateVerticalScale(10),
        justifyContent: 'center',
        alignItems: 'center',  
    },
    
    textContainer: {
        alignSelf: 'center'
    },

    text: {
        color: theme.colors.text,
        fontFamily: GlobalConstants.semiBoldFont,
        textAlign: 'center'
    },
});