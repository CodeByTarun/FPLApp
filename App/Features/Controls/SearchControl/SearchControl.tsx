import { Theme, useTheme } from "@react-navigation/native";
import React from "react";
import { View, TextInput, Image, StyleSheet } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { cornerRadius, textSecondaryColor, mediumFont, defaultFont, smallFont } from "../../../Global/GlobalConstants";
import { Icons } from "../../../Global/Images";

interface SearchControlProps {
    value: string;
    onChangeTextFunction: ((text: string) => void);
    placeHolderText: string;
}

const SearchControl = ({value, onChangeTextFunction, placeHolderText} : SearchControlProps) => {

    const theme = useTheme();
    const styles = SearchControlStyles(theme);

    return (
        <View testID="searchControl" style={[styles.searchBoxContainer, styles.shadow]}>
            <View style={{height: '100%', width: 20, marginRight: 10, marginLeft: 5, justifyContent: 'center', alignSelf: 'center', flexDirection:'row'}}>
                <Image style={{height: 18, width: '100%', alignSelf: 'center'}} resizeMode="contain" source={(theme.dark ? Icons['search'] : Icons['searchPurple'])}/>
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

const SearchControlStyles = (theme: Theme) => StyleSheet.create({
    searchBoxContainer: {
        flex: 9,
        backgroundColor: theme.colors.background,
        flexDirection: 'row',
        borderRadius: cornerRadius,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: moderateScale(11, 0.1),
        paddingRight: moderateScale(11, 0.1),
        paddingTop: moderateVerticalScale(6, 1.5),
        paddingBottom: moderateVerticalScale(6, 1.5),      
    },

    searchbox: {
        flex: 1,
        alignSelf: 'center',
        color: theme.colors.text,
        fontFamily: defaultFont,
        fontSize: mediumFont
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