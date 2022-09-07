import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { textPrimaryColor, mediumFont } from "../../../Global/GlobalConstants";
import * as GlobalConstants from "../../../Global/GlobalConstants";
import { Slider } from "@miblanchard/react-native-slider";
import { moderateVerticalScale } from "react-native-size-matters";
import { Theme, useTheme } from "@react-navigation/native";

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

    const theme = useTheme();
    const styles = CustomSliderStyles(theme);

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
            <View style={styles.headerContainer}>
                <Text style={[styles.text, {fontSize: GlobalConstants.mediumFont*0.9}]}>{ isPrice ? sliderRange[0] / 10 : sliderRange[0] }</Text>
                <Text style={[styles.text, {textAlign: 'right', fontSize: GlobalConstants.mediumFont*0.9}]}>{ isPrice ? sliderRange[1] / 10 : sliderRange[1] }</Text>
            </View>
            <Slider value={ sliderRange } 
                    onValueChange={value => setSliderRange(value as number[])}
                    minimumValue={minValue}
                    maximumValue={maxValue}
                    step={step}
                    thumbTintColor={theme.colors.border}
                    maximumTrackTintColor={theme.colors.background}
                    minimumTrackTintColor={theme.colors.border}/>
        </View>
    )

}

export default CustomSlider;

const CustomSliderStyles = (theme: Theme) => StyleSheet.create({
    container: {
        flex: 1,
    },

    headerContainer: {
        flexDirection: 'row',
        paddingTop: moderateVerticalScale(10),
    },

    text: {
        color: theme.colors.text,
        fontSize: mediumFont,
        flex: 1,
        fontFamily: GlobalConstants.defaultFont
    }
});