
import { useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { animated, useSpring } from "@react-spring/native";
import React, { useCallback, useEffect } from "react";
import { FlatList, Keyboard, Pressable, Text, View } from "react-native";
import { RootStackParams } from "../../../../App";
import globalStyles from "../../../Global/GlobalStyles";
import { useAppDispatch } from "../../../Store/hooks";
import { changeMutableView } from "../../../Store/modalSlice";
import AnimatedButton from "../AnimatedButton/AnimatedButton";
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

    const selectedOption = useCallback((item: string) => {
        props.setValue(item);

        setTimeout(() => {
            Keyboard.dismiss();
            navigator.goBack();
        }, 100);
    }, [props.setValue])

    const clearValue = useCallback(() => {
        props.setValue(props.defaultValue);

        setTimeout(() => {
            Keyboard.dismiss();
            navigator.goBack();
        }, 100);
    }, [])

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
        dispatch(changeMutableView({view: dropDownModalView(), width: '65%'}));
        navigator.navigate('MutableModal');
       }, 100);
    }

    const dropDownModalView = useCallback(() => {
        return (
            <View style={{height: '100%', width: '100%'}}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{props.headerText}</Text>
                </View>

                <FlatList
                    style={styles.flatList}
                    ListHeaderComponentStyle = {styles.flatListHeader}
                    data={props.options}
                    keyExtractor={item => item}
                    renderItem={({item}) => 
                        <AnimatedButton buttonFn={() => selectedOption(item)}>
                            <View style={styles.itemView}>
                                <Text style={styles.itemText}>{item}</Text>
                            </View>
                        </AnimatedButton>
                    }/>
                <View style={styles.resetContainer}>
                    <AnimatedButton buttonFn={clearValue}>
                        <View style={styles.clearButton}>
                            <Text style={styles.resetText}>Reset</Text>
                        </View>
                    </AnimatedButton>
                </View>
            </View>
        )
    }, [props.headerText, props.options, props.setValue]);

    return (
        <AnimatedView style={[styles.container,{ transform: [{scale: animatedStyle.scale}] }]}>
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