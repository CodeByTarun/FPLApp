import { useNavigation, useTheme } from "@react-navigation/native";
import { StackNavigationProp, useCardAnimation } from "@react-navigation/stack";
import React from "react";
import { Animated, Pressable, View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParams } from "../../../App";
import { height } from "../../Global/GlobalConstants";
import globalStyles from "../../Global/GlobalStyles";
import { useAppSelector } from "../../Store/hooks";
import { FilterModalStyles } from "./FilterModalStyles";

const FilterModal = () => {

    const theme = useTheme();
    const styles = FilterModalStyles(theme);

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const filterView = useAppSelector(state => state.modal.filterView);
    const { current } = useCardAnimation();
    const insets = useSafeAreaInsets();


    const modalSlideInFromBottom = current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [height, 2],
    });


    return (
        <View testID="background" style={styles.modalBackground}>
            <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.5)' }]} onPress={navigation.goBack}/>
            { filterView &&
                <Animated.View style={[styles.modal, globalStyles.modalShadow, {paddingBottom: insets.bottom, transform: [{translateY: modalSlideInFromBottom}]}]}>
                    { filterView }
                </Animated.View>
            }
        </View>
    )

}

export default FilterModal;