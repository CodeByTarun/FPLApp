import { useTheme } from "@react-navigation/native";
import { animated, useSpring } from "@react-spring/native";
import React from "react";
import { View, Image, Text, Pressable } from "react-native";
import { Icons } from "../../../Global/Images";
import { TabButtonStyles } from "./TabButtonStyles";

const AnimatedPressable = animated(Pressable);

interface TabButtonProps {
    fn: () => void;
    imageName: string;
    header: string;
    isDisabled? : boolean;
}

const TabButton = ({fn, imageName, header, isDisabled = false} : TabButtonProps) => {

    const theme = useTheme();
    const styles = TabButtonStyles(theme);
    const [animatedStyle, api] = useSpring(() => ({ scale: 1 }))

    const onPressFn = () => {
        api.start({
            to: [
                { scale: 0.95 },
                { scale: 1}
            ],
            config: { duration: 100 },
        });

        setTimeout(fn, 100);
    }

    return(
        <AnimatedPressable testID={'tabButton'} disabled={isDisabled} style={[styles.tabContainer, { transform: [{scale: animatedStyle.scale}], opacity: isDisabled ? 0.5 : 1 }]} onPress={onPressFn}> 

            <View style={styles.imageContainer}>
                <Image testID={'tabIcon'} style={styles.image} source={Icons[imageName]} resizeMode='contain'/>
            </View>
            <Text style={styles.headerText}>{header}</Text>

        </AnimatedPressable>
    )
}

export default TabButton;