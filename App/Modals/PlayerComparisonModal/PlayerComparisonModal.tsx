import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modal, Pressable, View, Text, TouchableOpacity, Animated } from "react-native";
import { CloseButton } from "../../Features/Controls";
import FixtureDifficultyList from "../../Features/PlayerStats/PlayerList/FixtureDifficultyList";
import { height, textPrimaryColor, textSecondaryColor, width } from "../../Global/GlobalConstants";
import globalStyles from "../../Global/GlobalStyles";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview, PlayerOverview } from "../../Models/FplOverview";
import { FplPlayerSummary } from "../../Models/FplPlayerSummary";
import { useAppDispatch } from "../../Store/hooks";
import { closeModal } from "../../Store/modalSlice";
import { styles } from "./PlayerComparisonModalStyles";

interface PlayerComparisonModalProps {
    overview: FplOverview,
    fixtures: FplFixture[],
    playerOverview: PlayerOverview,
    playerSummary: FplPlayerSummary,
}

const views = ['GW', 'Stats 1', 'Stats 2', 'FDR'];

const gameweekView = (playerOverview: PlayerOverview) => {
    return (
        <View style={{flexDirection: 'row'}}>
            <Text>Form: {playerOverview.form} </Text>
            <Text>Sel. {playerOverview.selected_by_percent}% </Text>
        </View>
)}

const stats1View = () => {
    return (<></>)
}

const stats2View = () => {
    return (<></>)
}

const showView = (index: number, overview: FplOverview, fixtures: FplFixture[], playerOverview: PlayerOverview, playerSummary: FplPlayerSummary, currentGameweek: number) => {
    if (index === 0) return gameweekView(playerOverview);
    if (index === 1) return stats1View();
    if (index === 2) return stats2View();
    else return (
        <View style={{padding: 5}}>
            <FixtureDifficultyList team={playerOverview.team} fixtures={fixtures} overview={overview} isFullList={true} currentGameweek={currentGameweek}/>
        </View>
    )
}

const PlayerComparisonModal = ({overview, fixtures, playerOverview, playerSummary} : PlayerComparisonModalProps) => {


    const dispatch = useAppDispatch();
    const currentGameweek = overview.events.filter((event) => { return event.is_current === true; })[0].id;

    const [view, setView] = useState(0);

    //#region  Control Animation
    const translateAnim = useRef(new Animated.Value(0)).current;

    const translateInterpolate = translateAnim.interpolate({
        inputRange: [0, 100],
        outputRange: [0, ((width * 0.85) - 20) * 0.85],
    });

    const translateAnimation = useCallback(() => {
        Animated.spring(translateAnim, {
            toValue: (view * 25),
            friction: 10,
            useNativeDriver: true,
        }).start();
    }, [view, translateAnim])
    //#endregion

    useEffect( function changeView() {
        translateAnimation();
    }, [view]);

    return (
        <Modal animationType="fade" transparent={true} visible={true}>
            <Pressable style={globalStyles.modalBackground} onPress={() => dispatch(closeModal())}/>
            <View style={[globalStyles.modalView, globalStyles.shadow, styles.modalContainer]}>
                <CloseButton closeFunction={() => dispatch(closeModal())}/>
                <Text style={styles.titleText}>Player Comparison</Text>
                <View style={styles.controlContainer}>
                    <Animated.View style={[styles.switch, globalStyles.shadow, {transform: [{translateX: translateInterpolate}]}]}/>

                    { views.map( (name, index) =>
                        <TouchableOpacity key={index} style={styles.controlButtons} onPress={() => setView(index)}>
                            <Text style={[styles.controlText, {color: view === index ? textPrimaryColor : textSecondaryColor}]}>{name}</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={{paddingBottom: 15}}>
                    <View style={styles.sectionBorder}>
                        <Text numberOfLines={1} style={styles.sectionNameText}>{playerOverview.web_name}</Text>
                        <Text style={styles.sectionCostText}>£{(playerOverview.now_cost / 10).toFixed(1)}</Text>
                        {showView(view, overview, fixtures, playerOverview, playerSummary, currentGameweek)}
                    </View>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Add Player</Text>
                </TouchableOpacity>
            </View>

        </Modal>
    )
}

export default PlayerComparisonModal;