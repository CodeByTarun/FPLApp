import React from "react";
import { View, TextInput, Image, StyleSheet } from "react-native";
import { textPrimaryColor, secondaryColor, cornerRadius, textSecondaryColor } from "../../../Global/GlobalConstants";
import globalStyles from "../../../Global/GlobalStyles";
import { Icons } from "../../../Global/Images";

interface SearchControlProps {
    value: string;
    onChangeTextFunction: ((text: string) => void);
    placeHolderText: string;
}

const SearchControl = ({value, onChangeTextFunction, placeHolderText} : SearchControlProps) => {
    return (
        <View style={[styles.searchBoxContainer, styles.shadow]}>
            <View style={{height: '100%', width: 20, marginRight: 10, marginLeft: 5, justifyContent: 'center', alignSelf: 'center', flexDirection:'row'}}>
                <Image style={{height: 18, width: '100%', alignSelf: 'center'}} resizeMode="contain" source={Icons['search']}/>
            </View>
            <TextInput style={styles.searchbox} 
                        value={value}
                        onChangeText={onChangeTextFunction}
                        placeholder={placeHolderText} 
                        placeholderTextColor={textSecondaryColor}
                        testID='search'/>
        </View>
    )
}

export default SearchControl;

const styles = StyleSheet.create({
    searchBoxContainer: {
        flex: 9,
        backgroundColor: secondaryColor,
        flexDirection: 'row',
        borderRadius: cornerRadius,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 11,      
    },

    searchbox: {
        flex: 1,
        alignSelf: 'center',
        color: textPrimaryColor,
    },

    shadow: {
        shadowOffset: {
            height: 0,
            width: 0,
        },
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
});