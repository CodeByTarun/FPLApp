
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Keyboard, Modal, Pressable, Text, View } from "react-native";
import globalStyles from "../../../Global/GlobalStyles";
import CloseButton from "../CloseButton/CloseButton";
import { styles } from "./DropdownStyles";

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



    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{props.headerText}</Text>
            <Pressable style={[styles.buttonContainer]} 
                       onPress={() => setShowDropdown(!showDropdown)}
                       hitSlop={5}>
                <Text numberOfLines={1} style={styles.selectedValueText}>{props.value}  </Text>
                <Text style={globalStyles.dropDownSymbol}>◣</Text>
            </Pressable>

            <Modal style={styles.modal} transparent={true} visible={showDropdown} testID={'dropdownModal'}>
                <Pressable testID="background" style={[styles.modalBackground]} onPress={() => setShowDropdown(false)}>
                    <View style={[globalStyles.modalShadow, styles.modalView]}>
                        <CloseButton closeFunction={() => setShowDropdown(false)}/> 
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
                    </View>
                </Pressable>
            </Modal>
        </View>
    )
}

export default Dropdown;