
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FlatList, Image, Keyboard, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as GlobalConstants from "../../Global/GlobalConstants";
import globalStyles from "../../Global/GlobalStyles";
import { Icons } from "../../Global/Images";
import CloseButton from "./CloseButton";

interface DropdownProps {
    placeholderText: string;
    options: string[];
}

const Dropdown = (props: DropdownProps) => {
    
    const [selectedOption, setSelectedOption] = useState(props.placeholderText);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        Keyboard.dismiss();
    }, [showDropdown])

    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Pressable style={styles.container} 
                       onPress={() => setShowDropdown(!showDropdown)}
                       hitSlop={5}>
                <Text style={styles.selectedValueText}>{selectedOption}</Text>
            </Pressable>
            <Modal style={{justifyContent: 'center', alignItems: 'center', flex: 1, zIndex: 2, position: 'absolute'}} transparent={true} visible={showDropdown}>
                <Pressable style={globalStyles.modalBackground} onPressIn={() => setShowDropdown(false)}/>
                <View style={[globalStyles.modalView, globalStyles.modalShadow, { maxHeight: GlobalConstants.height * 0.5, minHeight: GlobalConstants.height * 0.4 }]}>
                    <CloseButton boolFunction={setShowDropdown}/> 
                    <Text style={styles.titleText}>Options</Text>
                    <FlatList
                        style={styles.flatList}
                        ListHeaderComponentStyle = {{elevation: 0.1, zIndex: 1}}
                        data={props.options}
                        keyExtractor={item => item}
                        renderItem={({item}) => 
                            <View style={styles.itemView}>
                                <Text style={styles.itemText}>{item}</Text>
                            </View>
                        }/>
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
         backgroundColor: GlobalConstants.secondayColor,
         borderRadius: GlobalConstants.cornerRadius,
         zIndex: 0.5
    },

    selectedValueText: {
        color: GlobalConstants.textPrimaryColor,
        zIndex: 0.5,
    },

    titleText: {
        color: GlobalConstants.textPrimaryColor,
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
        color: GlobalConstants.textPrimaryColor,
        paddingBottom: 15,
        paddingTop: 15,
    },

})

export default Dropdown;