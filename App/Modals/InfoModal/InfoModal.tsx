import React from "react";
import { Text } from "react-native";
import { ModalWrapper } from "../../Features/Controls";
import { ModalInfo } from "../../Store/modalSlice";
import { styles } from "./InfoModalStyles";

interface InfoModalProps {
    modalInfo: ModalInfo;
}

const InfoModal = ({modalInfo} : InfoModalProps) => {

    return (
        <ModalWrapper modalWidth={'65%'}>
            <Text style={styles.titleText}>Credits</Text>
            <Text style={styles.text}>All data taken from the Fantasy Premier League API</Text>
            <Text style={styles.text}>Icons from https://www.flaticon.com/free-icons/soccer</Text>
        </ModalWrapper>
    )
}

export default InfoModal;