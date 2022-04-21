import React from "react";
import { View } from "react-native";
import globalStyles from "../../Global/GlobalStyles";
import { styles } from "./BottomTabsStyle";

const Separator = () => {

    return (
        <View style={styles.separator}/>
    )

}

const BottomTabButton = (fn: () => void, imageName: string) => {

}

const BottomTabs = () => {

    return (
        <View style={[styles.container]}>

            <View>

            </View>

            <Separator/>

            <View>

            </View>

        </View>
    )

}

export default BottomTabs;