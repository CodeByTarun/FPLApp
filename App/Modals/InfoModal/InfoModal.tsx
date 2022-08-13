import React from "react";
import { Text } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { ModalWrapper } from "../../Features/Controls";
import { width } from "../../Global/GlobalConstants";
import { styles } from "./InfoModalStyles";

const InfoModal = () => {

    return (
        <ModalWrapper modalWidth={moderateScale(width * 0.65, -0.1)}>
            <Text style={styles.titleText}>Credits</Text>
            <Text style={styles.text}>All data taken from the Fantasy Premier League API</Text>
            <Text style={styles.text}>Icons from https://www.flaticon.com/free-icons/soccer</Text>
        </ModalWrapper>
    )
}

export default InfoModal;