import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { textPrimaryColor, mediumFont } from "../../../Global/GlobalConstants";
import * as GlobalConstants from "../../../Global/GlobalConstants";
import { Slider } from "@miblanchard/react-native-slider";

interface SliderProps {
    header: string;
    minValue: number;
    maxValue: number;
    step: number;
    onValueChange: (value: number[]) => void;
    isPrice?: boolean;
    initialRange: number[];
    debounceValue?: number;
}

const CustomSlider = ({ header, minValue, maxValue, step, onValueChange, isPrice = false, initialRange, debounceValue = 0 } : SliderProps) => {

    const [sliderRange, setSliderRange] = useState(initialRange);

    useEffect( function rangeChange() {
        const timer = setTimeout(() => {
            onValueChange(sliderRange);
        }, debounceValue)

        return () => clearTimeout(timer);
    }, sliderRange);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{ header }</Text>
            <View style={{ flexDirection: 'row', paddingTop: 10}}>
                <Text style={[styles.text, {fontSize: GlobalConstants.mediumFont*0.9}]}>{ isPrice ? sliderRange[0] / 10 : sliderRange[0] }</Text>
                <Text style={[styles.text, {textAlign: 'right', fontSize: GlobalConstants.mediumFont*0.9}]}>{ isPrice ? sliderRange[1] / 10 : sliderRange[1] }</Text>
            </View>
            <Slider value={ sliderRange } 
                    onValueChange={value => setSliderRange(value as number[])}
                    minimumValue={minValue}
                    maximumValue={maxValue}
                    step={step}
                    thumbTintColor={GlobalConstants.lightColor}
                    maximumTrackTintColor={GlobalConstants.secondaryColor}
                    minimumTrackTintColor={GlobalConstants.lightColor}/>
        </View>
    )

}

export default CustomSlider;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    text: {
        color: textPrimaryColor,
        fontSize: mediumFont,
        flex: 1,
        fontWeight: '500'
    }
});