import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, useCardAnimation } from "@react-navigation/stack";
import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { RootStackParams } from "../../../App";
import { CloseButton } from "../../Features/Controls";
import { textPrimaryColor, largeFont, mediumFont, primaryColor } from "../../Global/GlobalConstants";

const InfoModal = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const { current } = useCardAnimation();

    return (
        <View style={styles.modalBackground}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)' }]} onPress={navigation.goBack}/>
            <View style={[{padding: 10, width: '75%'}, styles.modal]}>
                <CloseButton closeFunction={() => navigation.goBack()}/> 
                <Text style={styles.titleText}>Credits</Text>
                <Text style={styles.text}>All data taken from the Fantasy Premier League API</Text>
                <Text style={styles.text}>Icons from https://www.flaticon.com/free-icons/soccer</Text>
            </View>
        </View>
    )
}

export default InfoModal;

const styles = StyleSheet.create({

    titleText: {
        color: textPrimaryColor,
        fontSize: largeFont,
        alignSelf: 'center',
        fontWeight: '600',
        marginTop: 15,
        marginBottom: 20,
    },

    text: {
        color: textPrimaryColor,
        fontSize: mediumFont,
        marginBottom: 10,
    },

    modal: {
        justifyContent: 'center', 
        alignItems: 'center', 
        alignSelf: 'center', 
        zIndex: 1,
        position: 'absolute',
        backgroundColor: primaryColor,
        borderRadius: 10
       },

    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
