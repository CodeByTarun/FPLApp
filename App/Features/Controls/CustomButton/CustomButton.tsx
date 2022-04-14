import React from "react";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import { cornerRadius, primaryColor, secondaryColor } from "../../../Global/GlobalConstants";
import globalStyles from "../../../Global/GlobalStyles";
import { Icons } from "../../../Global/Images";

interface ButtonProps {
    image: string,
    buttonFunction: () => void,
    isDisabled?: boolean,
}

const CustomButton = ({image, buttonFunction, isDisabled = false} : ButtonProps) => {


    return (
        <TouchableOpacity testID="imageButton" style={[styles.touchable]} onPress={buttonFunction} disabled={isDisabled} hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
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

