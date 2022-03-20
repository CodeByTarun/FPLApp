import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { cornerRadius, primaryColor, secondaryColor } from "../../Global/GlobalConstants";
import globalStyles from "../../Global/GlobalStyles";
import { Icons } from "../../Global/Images";

interface ButtonProps {
    image: string,
    buttonFunction: () => void,
}

const CustomButton = ({image, buttonFunction} : ButtonProps) => {


    return (
        <TouchableOpacity style={[styles.touchable, globalStyles.shadow]} onPress={buttonFunction}>
            <Image style={[styles.icon]} source={Icons[image]} resizeMode='contain'/>
        </TouchableOpacity>
    )
}

export default CustomButton;

const styles = StyleSheet.create({
    
    touchable: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primaryColor,
        borderRadius: 1000,
        flex: 1,
        padding: 3,
    }, 

    icon: {
        width: '75%',
        height: '75%',
        alignSelf: 'center'
    },
});

