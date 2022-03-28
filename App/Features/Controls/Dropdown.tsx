
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, Image, Keyboard, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as GlobalConstants from "../../Global/GlobalConstants";
import globalStyles from "../../Global/GlobalStyles";
import { Icons } from "../../Global/Images";
import CloseButton from "./CloseButton";

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
        <View style={{flex: 1, flexDirection: 'column', alignItems:'center', justifyContent:'center'}}>
            
            <Text style={styles.headerText}>{props.headerText}</Text>
            <Pressable style={[styles.container]} 
                       onPress={() => setShowDropdown(!showDropdown)}
                       hitSlop={5}>
                <Text numberOfLines={1} style={styles.selectedValueText}>{props.value}  </Text>
                <Text style={{color: GlobalConstants.textPrimaryColor, fontSize: GlobalConstants.mediumFont * 0.6,
                              fontWeight: '700', marginTop: 0, transform: [{rotate: '-45deg'}], 
                              alignSelf: 'center', marginBottom: 6}}>◣</Text>
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
         flexDirection: 'row',
         width: '100%',
         alignSelf: 'center',
         zIndex: 0.5,
    },

    headerText: {
        alignSelf: 'flex-start', 
        color: GlobalConstants.textSecondaryColor, 
        fontSize: GlobalConstants.mediumFont * 0.8,
        paddingLeft: 2,
    },

    selectedValueText: {
        color: GlobalConstants.textPrimaryColor,
        zIndex: 0.5,
        marginRight: 5,
        alignSelf: 'center',
        maxWidth: '80%'
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