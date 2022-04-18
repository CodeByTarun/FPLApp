import React, { useCallback } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import globalStyles from "../../../Global/GlobalStyles";
import { Jerseys } from "../../../Global/Images";
import { FplOverview } from "../../../Models/FplOverview";
import { useAppDispatch } from "../../../Store/hooks";
import { openPlayerDetailedStatsModal } from "../../../Store/modalSlice";
import { styles } from "./PlayerViewStyles";

interface PlayerViewProps {
    overview: FplOverview;
    header: string;
    id: number | null | undefined;
}

const PlayerView = ({overview, header, id} : PlayerViewProps) => {

    const dispatch = useAppDispatch();

    const openPlayerStatsModal = useCallback((id: number) => {

        let player = overview.elements.find(element => element.id === id);
        if (player) {
            dispatch(openPlayerDetailedStatsModal(player))
        }
    }, [overview])

    return (
        <View style={styles.playerContainer}>
            { id &&
                <TouchableOpacity testID="playerViewButton" style={[styles.playerButton, globalStyles.shadow]} onPress={() => openPlayerStatsModal(id)}>
                    <View style={styles.headerView}>
                        <Text style={styles.playerHeaderText}>{header}</Text>
                    </View>
                    <View style={styles.jerseyContainer}>
                        <Image testID="playerViewJersey" style={styles.jerseyImage} source={Jerseys[overview.elements.find(player => player.id === id)!.team_code]} resizeMode="contain"/>
                    </View>
                    <Text numberOfLines={1} style={styles.playerHeaderText}>{overview.elements.find(player => player.id === id)?.web_name}</Text> 
                    <Text style={styles.playerHeaderText}>{overview.elements.find(player => player.id === id)?.event_points} Points</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default PlayerView;