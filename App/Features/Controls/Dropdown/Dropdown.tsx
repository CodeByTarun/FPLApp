
import { animated, useSpring } from "@react-spring/native";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Keyboard, Modal, Pressable, Text, View } from "react-native";
import globalStyles from "../../../Global/GlobalStyles";
import AnimatedButton from "../AnimatedButton/AnimatedButton";
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
        });

        setTimeout(() => setShowDropdown(false), 100);
    }

    const openDropdown = () => {
        api.start({
            to: [
                { scale: 0.95 },
                { scale: 1 },
            ],
            config: { duration: 100 },
        });

       setTimeout(() => setShowDropdown(true), 100);
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
                                    <AnimatedButton buttonFn={() => props.setValue(item)}>
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
                        </AnimatedView>
                    </AnimatedPressable>
                </Modal>
        </AnimatedView>
    )
}

export default Dropdown;