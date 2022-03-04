import React, { useCallback, useState } from "react";
import { View, StyleSheet, LayoutChangeEvent, Text } from "react-native";
import * as GlobalConstants from "../../Global/GlobalConstants";



const PieChart = () => {

    const [diameter, setDiameter] = useState(0)

    const getDimensions = useCallback((event: LayoutChangeEvent) => {
        setDiameter((event.nativeEvent.layout.width <= event.nativeEvent.layout.height) ? event.nativeEvent.layout.width : event.nativeEvent.layout.height);
        console.log(diameter)
    }, [])

    return (
        <View style={{flex: 1}} onLayout={getDimensions}>
            <View style={[styles.backgroundCircle, { height: diameter, width: diameter }]}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>G: 1</Text>
                <Text style={styles.text}>A: 4</Text>
            </View>
            </View>
            <View style ={{ borderWidth: 10, borderRadius: 100, height: diameter, width: diameter, position: 'absolute', borderColor: 'red' }}>

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
        alignItems: 'center'
    },
    
    textContainer: {
        alignSelf: 'center'
    },

    text: {
        color: GlobalConstants.textPrimaryColor,
        fontWeight: '500'
    },

})