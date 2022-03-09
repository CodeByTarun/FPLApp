import React, { useCallback, useState } from "react";
import { View, StyleSheet, LayoutChangeEvent, Text } from "react-native";
import Svg, { Path } from "react-native-svg";
import * as GlobalConstants from "../../Global/GlobalConstants";

const PieChart = () => {

    const [dimensions, setDimensions] = useState([0,0]);

    const startingX = dimensions[0] / 2;
    const startingY = dimensions[1] > dimensions[0] ? (dimensions[1] / 2) - (dimensions[0] / 2) : 10;
    const radius = dimensions[0] > dimensions[1] ? dimensions[1] / 2 : dimensions[0] / 2;


    const getDimensions = useCallback((event: LayoutChangeEvent) => {
        setDimensions([event.nativeEvent.layout.width, event.nativeEvent.layout.height]);
    }, [])

    return (
        <View style={{flex: 1, justifyContent: 'center'}} onLayout={getDimensions}>
            {(dimensions != [0,0]) && 
                <Svg width={dimensions[0]} height={dimensions[1]} style={{alignSelf: 'center', position: 'absolute'}}>
                    <Path d={`M${startingX} ${startingY} A1 1 0 0 1 ${startingX} ${dimensions[1] - 10}`} 
                          fill="none" 
                          stroke="white"
                          strokeWidth={7}/>
                    <Path d={`M${startingX} ${startingY} A1 1 0 0 0 ${startingX} ${dimensions[1] - 10}`} 
                          fill="none" 
                          stroke="green"
                          strokeWidth={7}/>
                </Svg>
            }
            
            <View style={styles.textContainer}>
                <Text style={[styles.text, {fontSize: radius * 0.3}]}>G: 1</Text>
                <Text style={[styles.text, {fontSize: radius * 0.3}]}>A: 4</Text>
            </View>            
            
        </View>
    )
}

export default PieChart;

const styles = StyleSheet.create({
    backgroundCircle: {
        borderRadius: 100,
        borderColor: 'black',
        borderWidth: 10,
        justifyContent: 'center',
        alignItems: 'center',  
    },
    
    textContainer: {
        alignSelf: 'center'
    },

    text: {
        color: GlobalConstants.textPrimaryColor,
        fontWeight: '500'
    },
});