import React from "react";
import { Pressable, View, Image, StyleSheet } from "react-native";
import { Icons } from "../../../Global/Images";
import * as GlobalConstants from "../../../Global/GlobalConstants"
import { Theme, useTheme } from "@react-navigation/native";

interface CloseButtonProps {
    closeFunction: () => void;
}

const CloseButton = ({closeFunction}: CloseButtonProps) => {

    const theme = useTheme();
    const styles = CloseButtonStyles(theme);

    return(
        <Pressable testID="closeButton" style={styles.closeButton} onPress={closeFunction}>
            <View style={styles.closeButtonBackground}>
                <Image style={{height: '50%', width: '50%'}} source={Icons["close"]} resizeMode="contain"/>
            </View>
        </Pressable> 
    )
}

const CloseButtonStyles = (theme: Theme) => StyleSheet.create({
    closeButton: {
        position: 'absolute',
        zIndex: 10,
        elevation: 1,
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
        backgroundColor: theme.colors.background,
        borderRadius: 20,
    },
})

export default CloseButton;