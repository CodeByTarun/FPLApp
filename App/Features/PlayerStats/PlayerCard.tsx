// This will contain understat and fpl data combined in a nice playercard that will help
// ppl see how a player is performing recently as well as on the overall season

import React from "react";
import { Modal, Pressable, View, Image, StyleSheet } from "react-native";
import globalStyles from "../../Global/GlobalStyles";
import { Icons } from "../../Global/Images";
import { PlayerData } from "../../Models/CombinedData";
import { TeamInfo, TeamTypes } from "../../Store/teamSlice";

interface PlayerCardProps {
    player: PlayerData;
    teamInfo: TeamInfo;
    isVisible: boolean;
    isVisibleFunction : (value: React.SetStateAction<boolean>) => void;
}

const PlayerCard = (props: PlayerCardProps) => {

    return (
        <Modal animationType="fade" transparent={true} visible={props.isVisible}>
            <Pressable style={globalStyles.modalBackground} onPressIn={() => props.isVisibleFunction(false)}/>

            <View style={[globalStyles.modalView, globalStyles.modalShadow, {height: '33%'}]}>
                <Pressable style={globalStyles.closeButton} onPressIn={() => props.isVisibleFunction(false)}>
                    <Image style={{height: '100%', width: '100%'}} source={Icons["close"]} resizeMode="contain"/>
                </Pressable>

                {(props.teamInfo.teamType === TeamTypes.Fixture) ? null : null}
                

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create(
    {

    }
)

export default PlayerCard;