import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { cornerRadius, secondaryColor } from "../../Global/GlobalConstants";

interface ButtonProps {
    imageSource: string,
    buttonFunction: () => void,
}

const CustomButton = ({imageSource, buttonFunction} : ButtonProps) => {


    return (
        <TouchableOpacity style={styles.touchable} onPress={buttonFunction}>
            <Image style={styles.icon} source={require(`${imageSource}`)} resizeMode='contain'/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    
    touchable: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: secondaryColor,
        borderRadius: cornerRadius,
        flex: 1,
    }, 

    icon: {
        width: '80%',
        height: '80%',
        alignSelf: 'center'
    },

});

export default CustomButton;