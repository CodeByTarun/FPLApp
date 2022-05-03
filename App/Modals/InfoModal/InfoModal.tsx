import React from "react";
import { View, Text } from "react-native";
import { ModalWrapper } from "../../Features/Controls";
import { useAppDispatch } from "../../Store/hooks";
import { closeModal, ModalInfo, ModalTypes } from "../../Store/modalSlice";
import { styles } from "./InfoModalStyles";

interface InfoModalProps {
    modalInfo: ModalInfo;
}

const InfoModal = ({modalInfo} : InfoModalProps) => {

    const dispatch = useAppDispatch();

    return (
        <ModalWrapper isVisible={modalInfo.modalType === ModalTypes.InfoModal} closeFn={() => dispatch(closeModal())} modalWidth={'65%'}>
            <View style={{padding: 10}}>
                <Text style={styles.titleText}>Credits</Text>
                <Text style={styles.text}>All data taken from the Fantasy Premier League API</Text>
                <Text style={styles.text}>Icons from https://www.flaticon.com/free-icons/soccer</Text>
            </View>
        </ModalWrapper>
    )
}

export default InfoModal;