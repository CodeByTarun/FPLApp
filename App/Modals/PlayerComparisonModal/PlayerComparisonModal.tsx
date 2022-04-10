import React from "react";
import { Modal, Pressable, View, Text } from "react-native";
import { CloseButton } from "../../Features/Controls";
import { height } from "../../Global/GlobalConstants";
import globalStyles from "../../Global/GlobalStyles";
import { FplFixture } from "../../Models/FplFixtures";
import { PlayerOverview } from "../../Models/FplOverview";
import { FplPlayerSummary } from "../../Models/FplPlayerSummary";
import { useAppDispatch } from "../../Store/hooks";
import { closeModal } from "../../Store/modalSlice";
import { styles } from "./PlayerComparisonModalStyles";

interface PlayerComparisonModalProps {
    fixtures: FplFixture[],
    playerOverview: PlayerOverview,
    playerSummary: FplPlayerSummary,
}

const PlayerComparisonModal = ({fixtures, playerOverview, playerSummary} : PlayerComparisonModalProps) => {

    const dispatch = useAppDispatch();

    return (
        <Modal animationType="fade" transparent={true} visible={true}>
            <Pressable style={globalStyles.modalBackground} onPress={() => dispatch(closeModal())}/>
            <View style={[globalStyles.modalView, globalStyles.shadow, { maxHeight: height * 0.75 }]}>
                <CloseButton closeFunction={() => dispatch(closeModal())}/>
                <Text style={styles.titleText}>Player Comparison</Text>

                <View>
                    <View>
                        <View>
                            <Text>{playerOverview.web_name}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text>{playerOverview.now_cost} </Text>
                                <Text>Form: {playerOverview.form} </Text>
                                <Text>Sel. {playerOverview.selected_by_percent}% </Text>
                            </View>
                        </View>
                    </View>
                    
                </View>
            </View>

        </Modal>
    )
}

export default PlayerComparisonModal;