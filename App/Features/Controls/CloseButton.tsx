import React from "react";
import { Pressable, View, Image, StyleSheet } from "react-native";
import globalStyles from "../../Global/GlobalStyles";
import { Icons } from "../../Global/Images";
import * as GlobalConstants from "../../Global/GlobalConstants"

interface CloseButtonProps {
    closeFunction: () => void;
}

const CloseButton = ({closeFunction}: CloseButtonProps) => {

    return(
        <Pressable style={styles.closeButton} onPressIn={closeFunction}>
            <View style={styles.closeButtonBackground}>
                <Image style={{height: '50%', width: '50%'}} source={Icons["close"]} resizeMode="contain"/>
            </View>
        </Pressable> 
    )
}

const styles = StyleSheet.create({
    closeButton: {
        position: 'absolute',
        zIndex: -1,
        right: -7,
        top: -7,
        height: 25,
        width: 25,
        margin: 0,
        borderRadius: 20,
    },

    closeButtonBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: GlobalConstants.secondaryColor,
        borderRadius: 20,
    },
})

export default CloseButton;