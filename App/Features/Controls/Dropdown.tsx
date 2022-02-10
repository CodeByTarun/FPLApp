
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FlatList, Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import * as GlobalConstants from "../../Global/GlobalConstants";
import globalStyles from "../../Global/GlobalStyles";
import { Icons } from "../../Global/Images";
import CloseButton from "./CloseButton";

interface DropdownProps {
    placeholderText: string;
}

const Dropdown = (props: DropdownProps) => {
    
    const [selectedOption, setSelectedOption] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    const optionsDummy = ['hi', 'hello', 'hey', 'bye', 'salut'] as string[];

    return (
        <View style={{flex: 1, flexDirection: 'row', position: 'relative'}}>
            <Pressable style={styles.container} 
                       onPress={() => setShowDropdown(!showDropdown)}>
                <TextInput style={styles.selectedValueText} 
                        editable={false} 
                        placeholder={props.placeholderText} 
                        placeholderTextColor={'white'} 
                        value={selectedOption}/>
            </Pressable>
            <Modal style={{justifyContent: 'center', alignItems: 'center', flex: 1, zIndex: 2, position: 'absolute'}} transparent={true} visible={showDropdown}>
                <Pressable style={globalStyles.modalBackground} onPressIn={() => {}}/>
                <View style={[globalStyles.modalView, globalStyles.modalShadow, { maxHeight: GlobalConstants.height * 0.5, minHeight: GlobalConstants.height * 0.4 }]}>
                    <CloseButton boolFunction={setShowDropdown}/> 
                    <FlatList
                        style={styles.flatList}
                        ListHeaderComponentStyle = {{elevation: 0.1, zIndex: 1}}
                        data={optionsDummy}
                        renderItem={({item}) => <Text>{item}</Text>}/>
                </View>
                
            </Modal>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
         flex: 1, 
         margin: 5,
         height: '70%',
         backgroundColor: GlobalConstants.secondayColor,
         alignSelf: 'center',
         padding: 5,
         justifyContent: 'center',
         borderWidth: 1,
         borderColor: 'white',
    },

    selectedValueText: {
        color: GlobalConstants.textPrimaryColor,
    },

    flatList: {

    },

})

export default Dropdown;