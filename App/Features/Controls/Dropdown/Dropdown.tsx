
import { animated, easings, useSpring, useTransition } from "@react-spring/native";
import React, { useCallback, useEffect, useState } from "react";
import { Animated, FlatList, Keyboard, Modal, Pressable, Text, View } from "react-native";
import globalStyles from "../../../Global/GlobalStyles";
import CloseButton from "../CloseButton/CloseButton";
import { styles } from "./DropdownStyles";

const AnimatedPressable = animated(Pressable);
const AnimatedView = animated(View);

interface DropdownProps {
    defaultValue: string;
    headerText: string;
    options: string[];
    value: string | null;
    setValue: (value: string) => void;
}

const Dropdown = (props: DropdownProps) => {
    
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        Keyboard.dismiss();
    }, [showDropdown])

    useEffect(function optionSelected() {
        setShowDropdown(false);
    }, [props.value])

    const clearValue = useCallback(() => {
        props.setValue(props.defaultValue);
        setShowDropdown(false);
    }, [])

    const [animatedStyle, api] = useSpring(() => ({ backgroundColor: 'rgba(0, 0, 0, 0)', top: '100%', scale: 1 }));

    useEffect( function openDropdownAnimation() {
        if (showDropdown) {
            api.start({
                to: { backgroundColor: 'rgba(0, 0, 0, 0.5)', top: '0%' },
                config: {duration: 200}
            });
        }
    }, [showDropdown])

    const closeDropdown = () => {
        api.start({
            to: { backgroundColor: 'rgba(0, 0, 0, 0)', top: '100%' },
            config: { duration: 100 },
            onRest: () => setShowDropdown(false),
        });
    }

    const openDropdown = () => {
        api.start({
            to: [
                { scale: 0.95 },
                { scale: 1 },
            ],
            config: { duration: 10 },
            onRest: () => setShowDropdown(true),
        });
    }

    return (
        <AnimatedView style={[styles.container,{ transform: [{scale: animatedStyle.scale}] }]}>
            <Text style={styles.headerText}>{props.headerText}</Text>
            <Pressable style={[styles.buttonContainer]} 
                       onPress={openDropdown}
                       hitSlop={5}>
                <Text numberOfLines={1} style={styles.selectedValueText}>{props.value}  </Text>
                <Text style={globalStyles.dropDownSymbol}>◣</Text>
            </Pressable>
                <Modal style={styles.modal} transparent={true} visible={showDropdown} testID={'dropdownModal'}>
                    <AnimatedPressable testID="background" style={[styles.modalBackground, { backgroundColor: animatedStyle.backgroundColor}]} onPress={closeDropdown}>
                        <AnimatedView style={[globalStyles.modalShadow, styles.modalView, { top: animatedStyle.top }]}>
                            <CloseButton closeFunction={closeDropdown}/> 
                            <View style={styles.titleContainer}>
                                <Text style={styles.titleText}>{props.headerText}</Text>
                            </View>

                            <FlatList
                                style={styles.flatList}
                                ListHeaderComponentStyle = {styles.flatListHeader}
                                data={props.options}
                                keyExtractor={item => item}
                                renderItem={({item}) => 
                                    <Pressable style={styles.itemView} onPress={() => props.setValue(item)}>
                                        <Text style={styles.itemText}>{item}</Text>
                                    </Pressable>
                                }/>
                            <View style={styles.resetContainer}>
                                <Pressable style={styles.clearButton} onPress={clearValue}>
                                    <Text style={styles.resetText}>Reset</Text>
                                </Pressable>
                            </View>
                        </AnimatedView>
                    </AnimatedPressable>
                </Modal>
        </AnimatedView>
    )
}

export default Dropdown;