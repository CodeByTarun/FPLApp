import React from "react";
import { Pressable, View, Text } from "react-native";
import { textPrimaryColor, lightColor } from "../../../../Global/GlobalConstants";
import globalStyles from "../../../../Global/GlobalStyles";
import { styles } from "./AdditionalInfoCardStyles";

interface AdditionalInfoCardProps {
    viewIndex: number;
    setViewIndex: (value: React.SetStateAction<number>) => void;
    viewIndexScenes: string[];
}

const AdditionalInfoCard = ({viewIndex, setViewIndex, viewIndexScenes} : AdditionalInfoCardProps) => {

    return (
        <Pressable testID="additionalInfoCardButton" style={[styles.cardContainer, globalStyles.tabShadow]}
                    onPress={() => setViewIndex((viewIndex + 1 < viewIndexScenes.length) ? viewIndex + 1 : 0)}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{viewIndexScenes[viewIndex]}</Text>
            </View>
                
            <View style={styles.dotsContainer}>
                <View testID="additionalInfoCardDots" style={[globalStyles.dots, {backgroundColor: viewIndex === 0 ? textPrimaryColor : lightColor}]}/>
                <View testID="additionalInfoCardDots" style={[globalStyles.dots, {backgroundColor: viewIndex === 1 ? textPrimaryColor : lightColor}]}/>          
                <View testID="additionalInfoCardDots" style={[globalStyles.dots, {backgroundColor: viewIndex === 2 ? textPrimaryColor : lightColor}]}/>
                <View testID="additionalInfoCardDots" style={[globalStyles.dots, {backgroundColor: viewIndex === 3 ? textPrimaryColor : lightColor}]}/>                            
            </View>
        </Pressable>
    )

}

export default AdditionalInfoCard;