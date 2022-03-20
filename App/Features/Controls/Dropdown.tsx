
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Image, Keyboard, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as GlobalConstants from "../../Global/GlobalConstants";
import globalStyles from "../../Global/GlobalStyles";
import { Icons } from "../../Global/Images";
import CloseButton from "./CloseButton";

interface DropdownProps {
    defaultValue: string;
    options: string[];
    value: string | null;
    setValue: (value: React.SetStateAction<string>) => void;
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
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Pressable style={styles.container} 
                       onPress={() => setShowDropdown(!showDropdown)}
                       hitSlop={5}>
                <Text style={styles.selectedValueText}>{props.value}</Text>
            </Pressable>
            <Modal style={{justifyContent: 'center', alignItems: 'center', alignSelf: 'center', flex: 1, zIndex: 1, position: 'absolute'}} transparent={true} visible={showDropdown}>
                <Pressable style={globalStyles.modalBackground} onPressIn={() => setShowDropdown(false)}/>
                <View style={[globalStyles.modalView, globalStyles.modalShadow, { maxHeight: GlobalConstants.height * 0.6, minHeight: GlobalConstants.height * 0.5 }]}>
                    <CloseButton closeFunction={() => setShowDropdown(!showDropdown)}/> 
                    <Text style={styles.titleText}>Options</Text>
                    <FlatList
                        style={styles.flatList}
                        ListHeaderComponentStyle = {{elevation: 0.1, zIndex: 1}}
                        data={props.options}
                        keyExtractor={item => item}
                        renderItem={({item}) => 
                            <Pressable style={styles.itemView} onPress={() => props.setValue(item)}>
                                <Text style={styles.itemText}>{item}</Text>
                            </Pressable>
                        }/>
                    <Pressable style={styles.clearButton} onPress={clearValue}>
                        <Text style={{fontSize: GlobalConstants.mediumFont, color: GlobalConstants.textPrimaryColor}}>Reset</Text>
                    </Pressable>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
         flex: 1, 
         margin: 5,
         height: '100%',
         alignSelf: 'center',
         paddingLeft: 7,
         justifyContent: 'center',
         backgroundColor: GlobalConstants.secondaryColor,
         borderRadius: GlobalConstants.cornerRadius,
         zIndex: 0.5
    },

    selectedValueText: {
        color: GlobalConstants.textPrimaryColor,
        fontSize: GlobalConstants.mediumFont,
        zIndex: 0.5,
    },

    titleText: {
        color: GlobalConstants.modalTextColor,
        alignSelf: 'center',
        marginTop: 15,
        fontSize: GlobalConstants.largeFont,
        fontWeight: 'bold'
    },

    flatList: {
        margin: 10
    },

    itemView: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
    },

    itemText: {
        color: GlobalConstants.modalTextColor,
        paddingBottom: 15,
        paddingTop: 15,
    },

    clearButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: GlobalConstants.redColor,
        borderRadius: GlobalConstants.cornerRadius,
        width: '40%',
        alignSelf: 'center',
        padding: 10,
        margin: 10,
    },
})

export default Dropdown;