import { animated, useSpring } from "@react-spring/native";
import React from "react";
import { TouchableOpacity, View, Image, Text, Pressable } from "react-native";
import { Icons } from "../../../Global/Images";
import { styles } from "./TabButtonStyles";

const AnimatedPressable = animated(Pressable);

interface TabButtonProps {
    fn: () => void;
    imageName: string;
    header: string;
}

const TabButton = ({fn, imageName, header} : TabButtonProps) => {

    const [animatedStyle, api] = useSpring(() => ({ scale: 1 }))

    const onPressFn = () => {
        api.start({
            to: [
                { scale: 0.95 },
                { scale: 1}
            ],
            config: { duration: 100 },
            onRest: fn
        })
    }

    return(
        <AnimatedPressable style={[styles.tabContainer, { transform: [{scale: animatedStyle.scale}] }]} onPress={onPressFn}> 

            <View style={styles.imageContainer}>
                <Image style={styles.image} source={Icons[imageName]} resizeMode='contain'/>
            </View>
            <Text style={styles.headerText}>{header}</Text>

        </AnimatedPressable>
    )
}

export default TabButton;