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
        <TouchableOpacity style={[styles.touchable]} onPress={buttonFunction}>
            <Image style={[styles.icon]} source={Icons[image]} resizeMode='contain'/>
        </TouchableOpacity>
    )
}

export default CustomButton;

const styles = StyleSheet.create({
    
    touchable: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 3,
    }, 

    icon: {
        width: '90%',
        height: '90%',
        alignSelf: 'center'
    },
});

