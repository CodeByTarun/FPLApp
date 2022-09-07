import { Theme, useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { RootStackParams } from "../../../../../App";
import { defaultFont, largeFont, mediumFont, redColor } from "../../../../Global/GlobalConstants";
import AnimatedButton from "../../AnimatedButton/AnimatedButton";

interface DropDownModalProps {
    headerText: string;
    defaultValue: string;
    options: string[];
    setValue: (item: string) => void;
}

const DropDownModal = ({headerText, defaultValue, options, setValue} : DropDownModalProps) => {

    const theme = useTheme();
    const styles = DropDownModalStyles(theme);

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const settingValue = useCallback((item: string) => {
        setValue(item);
        navigation.goBack();
    }, []);

    const clearValue = useCallback(() => {
        setValue(defaultValue);
        navigation.goBack();
    }, []);

    return (
        <View style={{height: '100%', width: '100%'}}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{headerText}</Text>
            </View>

            <FlatList
                style={styles.flatList}
                ListHeaderComponentStyle = {styles.flatListHeader}
                data={options}
                keyExtractor={item => item}
                renderItem={({item}) => 
                    <AnimatedButton buttonFn={() => settingValue(item)}>
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

}

export default DropDownModal;

const DropDownModalStyles = (theme: Theme) => StyleSheet.create({

    titleContainer: {
        padding: moderateScale(15),
        borderBottomColor: theme.colors.background,
        borderBottomWidth: 2,
    },

    titleText: {
        color: theme.colors.text,
        alignSelf: 'center',
        fontSize: largeFont,
        fontWeight: 'bold',
        fontFamily: defaultFont,
    },

    flatList: {
    },

    flatListHeader: {
        elevation: 0.1,
        zIndex: 1,
    },

    itemView: {
        borderBottomColor: theme.colors.background,
        borderBottomWidth: 1,
    },

    itemText: {
        color: theme.colors.text,
        fontSize: mediumFont,
        paddingBottom: moderateVerticalScale(15),
        paddingTop: moderateVerticalScale(15),
        paddingLeft: moderateScale(5),
        fontFamily: defaultFont,
    },

    clearButton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: redColor,
        borderRadius: 100,
        width: moderateScale(80),
        alignSelf: 'center',
        padding: moderateScale(10),
    },

    resetText: {
        fontSize: mediumFont, 
        color: theme.colors.text,
    },

    resetContainer: {
        paddingTop: moderateVerticalScale(15),
        paddingBottom: moderateVerticalScale(5),
        borderTopColor: theme.colors.background,
        borderTopWidth: 2,
    },
});