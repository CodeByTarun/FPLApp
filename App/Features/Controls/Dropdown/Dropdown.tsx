
import { useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { animated, useSpring } from "@react-spring/native";
import React, { useCallback } from "react";
import { Keyboard, Pressable, Text, View } from "react-native";
import { RootStackParams } from "../../../../App";
import globalStyles from "../../../Global/GlobalStyles";
import { useAppDispatch } from "../../../Store/hooks";
import { changeMutableView } from "../../../Store/modalSlice";
import DropDownModal from "./DropDownModal";
import { DropDownStyles } from "./DropdownStyles";

const AnimatedView = animated(View);

interface DropdownProps {
    defaultValue: string;
    headerText: string;
    options: string[];
    value: string | null;
    setValue: (value: string) => void;
}

const Dropdown = (props: DropdownProps) => {

    const theme = useTheme();
    const styles = DropDownStyles(theme);
    
    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();
    const dispatch = useAppDispatch();

    const [animatedStyle, api] = useSpring(() => ({ scale: 1 }));

    const openDropdown = () => {
        api.start({
            to: [
                { scale: 0.95 },
                { scale: 1 },
            ],
            config: { duration: 100 },
        });

       setTimeout(() => {
        dispatch(changeMutableView({view: <DropDownModal headerText={props.headerText} defaultValue={props.defaultValue} options={props.options} setValue={props.setValue}/>, width: '65%'}));
        navigator.navigate('MutableModal');
       }, 100);
    }

    return (
        <AnimatedView testID={'dropDown'} style={[styles.container,{ transform: [{scale: animatedStyle.scale}] }]}>
            <Text style={styles.headerText}>{props.headerText}</Text>
            <Pressable style={[styles.buttonContainer]} 
                       onPress={openDropdown}
                       hitSlop={5}>
                <Text numberOfLines={1} style={styles.selectedValueText}>{props.value}  </Text>
                <Text style={globalStyles.dropDownSymbol}>◣</Text>
            </Pressable>
        </AnimatedView>
    )
}

export default Dropdown;