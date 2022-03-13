import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import globalStyles from "../../Global/GlobalStyles";
import CloseButton from "./CloseButton";

interface toolTipProps {
    view: JSX.Element;
}

const ToolTip = () => {

    const [isVisible, setIsVisible] = useState(false)

    return (
        <Modal animationType="fade" transparent={true} visible={isVisible} style={{position: 'absolute'}}>
            <Pressable style={globalStyles.modalBackground} onPressIn={() => {setIsVisible(false)}}/>
            <CloseButton boolFunction={setIsVisible}/>
            <View style={[globalStyles.modalView, globalStyles.modalShadow]}>
            
            </View>

        </Modal>
    )

}

export default ToolTip;

const styles = StyleSheet.create({

    modalView: {
        backgroundColor: 'grey',

    }

});