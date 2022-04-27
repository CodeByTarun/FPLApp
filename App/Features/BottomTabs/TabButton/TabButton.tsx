import React from "react";
import { TouchableOpacity, View, Image, Text } from "react-native";
import { Icons } from "../../../Global/Images";
import { styles } from "./TabButtonStyles";

interface TabButtonProps {
    fn: () => void;
    imageName: string;
    header: string;
}

const TabButton = ({fn, imageName, header} : TabButtonProps) => {


    return(
        <TouchableOpacity style={styles.tabContainer} onPress={fn}> 

            <View style={styles.imageContainer}>
                <Image style={styles.image} source={Icons[imageName]} resizeMode='contain'/>
            </View>
            <Text style={styles.headerText}>{header}</Text>

        </TouchableOpacity>
    )
}

export default TabButton;