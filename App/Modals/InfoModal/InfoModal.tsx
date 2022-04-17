import React from "react";
import { Modal, Pressable, View, Text } from "react-native";
import { CloseButton } from "../../Features/Controls";
import globalStyles from "../../Global/GlobalStyles";
import { useAppDispatch } from "../../Store/hooks";
import { closeModal } from "../../Store/modalSlice";
import { styles } from "./InfoModalStyles";

const InfoModal = () => {

    const dispatch = useAppDispatch();

    return (
        <Modal animationType="fade" transparent={true} visible={true}>
            <Pressable style={globalStyles.modalBackground} onPress={() => dispatch(closeModal())}/>
            <View style={[globalStyles.modalView, globalStyles.modalShadow, styles.container]}>
                <CloseButton closeFunction={() => dispatch(closeModal())}/>
                <Text style={styles.titleText}>Credits</Text>
                <Text style={styles.text}>All data taken from the Fantasy Premier League API</Text>
                <Text style={styles.text}>Icons from https://www.flaticon.com/free-icons/soccer</Text>
            </View>        
        </Modal>
    )
}

export default InfoModal;