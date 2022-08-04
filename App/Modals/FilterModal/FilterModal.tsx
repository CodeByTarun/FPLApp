import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp, useCardAnimation } from "@react-navigation/stack";
import React, { useCallback } from "react";
import { Animated, Pressable, View, StyleSheet } from "react-native";
import { RootStackParams } from "../../../App";
import { height } from "../../Global/GlobalConstants";
import globalStyles from "../../Global/GlobalStyles";
import { useAppSelector } from "../../Store/hooks";
import { styles } from "./FilterModalStyles";

const FilterModal = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const filterView = useAppSelector(state => state.modal.filterView);
    const { current } = useCardAnimation();


    const modalSlideInFromBottom = current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [height, 0],
    });


    return (
        <View testID="background" style={styles.modalBackground}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)' }]} onPress={navigation.goBack}/>
            { filterView &&
                <Animated.View style={[styles.modal, globalStyles.modalShadow, {transform: [{translateY: modalSlideInFromBottom}]}]}>
                    { filterView }
                </Animated.View>
            }
        </View>
    )

}

export default FilterModal;