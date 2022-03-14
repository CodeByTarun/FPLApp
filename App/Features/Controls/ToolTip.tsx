import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import globalStyles from "../../Global/GlobalStyles";
import CloseButton from "./CloseButton";

interface toolTipProps {
    view: JSX.Element;
    children: React.ReactNode;
}

const ToolTip = (props: toolTipProps) => {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            <Modal animationType="fade" transparent={true} visible={isVisible} style={{position: 'absolute'}}>
                <Pressable style={globalStyles.modalBackground} onPressIn={() => {setIsVisible(false)}}/>
                <CloseButton boolFunction={setIsVisible}/>
                <View style={[globalStyles.modalView, globalStyles.modalShadow]}>
                    { props.view }
                </View>

            </Modal>

            { props.children }

        </View>
    )

}

export default ToolTip;

const styles = StyleSheet.create({

    modalView: {
        backgroundColor: 'grey',
    }

});