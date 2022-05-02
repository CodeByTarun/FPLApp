import Checkbox from "expo-checkbox";
import React, { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { Modal, Pressable, View, Text, TouchableOpacity, Animated, ScrollView } from "react-native";
import { Slider } from "@miblanchard/react-native-slider";
import { CloseButton, CustomButton, FilterButton, ModalWrapper, ToolTip } from "../../Features/Controls";
import { fieldColor, height, lightColor, primaryColor, secondaryColor, textPrimaryColor, textSecondaryColor, width } from "../../Global/GlobalConstants";
import globalStyles from "../../Global/GlobalStyles";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview, PlayerOverview } from "../../Models/FplOverview";
import { FplPlayerSummary } from "../../Models/FplPlayerSummary";
import { useAppDispatch } from "../../Store/hooks";
import { closeModal } from "../../Store/modalSlice";
import { StatsFilterActionKind, statsFilterReducer } from "../PlayerDetailedStatsModal/StatsFilterReducer";
import { styles } from "./PlayerComparisonModalStyles";
import AddPlayerModal from "./AddPlayerModal";
import PlayerComparisonView from "./PlayerComparisonView";
import { animated } from "@react-spring/native";


export interface CombinedPlayerData {
    playerOverview: PlayerOverview;
    playerSummary: FplPlayerSummary;
}
interface PlayerComparisonModalProps {
    overview: FplOverview,
    fixtures: FplFixture[],
    playerOverview: PlayerOverview,
    playerSummary: FplPlayerSummary,
}

const views = ['GW', 'Stats', 'FDR'];

const PlayerComparisonModal = ({overview, fixtures, playerOverview, playerSummary} : PlayerComparisonModalProps) => {


    const dispatch = useAppDispatch();
    const currentGameweek = overview.events.filter((event) => { return event.is_current === true; })[0].id;

    const [viewIndex, setViewIndex] = useState(0);
    const [statsFilterState, statsFilterDispatch] = useReducer(statsFilterReducer, { gameSpan: [1, currentGameweek], isPer90: false });
    const [isAddPlayerModalVisible, setIsAddPlayerModalVisible] = useState(false);
    const [playersToCompare, setPlayersToCompare] = useState([{playerOverview: playerOverview, playerSummary: playerSummary}] as CombinedPlayerData[]);

    //#region  Control Animation
    const translateAnim = useRef(new Animated.Value(0)).current;

    const translateInterpolate = translateAnim.interpolate({
        inputRange: [0, 100],
        outputRange: [0, ((width * 0.85) - 20) * 0.60],
    });

    const translateAnimation = useCallback(() => {
        Animated.spring(translateAnim, {
            toValue: (viewIndex * 33.3333),
            friction: 10,
            useNativeDriver: true,
        }).start();
    }, [viewIndex, translateAnim])
    
    useEffect( function changeView() {
        translateAnimation();
    }, [viewIndex]);
    //#endregion

    //#region Players to compare functions
    const addPlayer = (playerToAdd: PlayerOverview) => {

        if (playersToCompare.find(player => player.playerOverview.id === playerToAdd.id) !== undefined) return

        fetch(`https://fantasy.premierleague.com/api/element-summary/${playerToAdd.id}/`)
        .then(response => response.json())
        .then(data => {
            setPlayersToCompare([...playersToCompare, {playerOverview: playerToAdd, playerSummary: data as FplPlayerSummary}])
        },
        error => {
            return
        })
    }

    const removePlayer = (playerToRemove: PlayerOverview) => {
        setPlayersToCompare(playersToCompare.filter(player => player.playerOverview.id !== playerToRemove.id));
    }
    //#endregion

    return (
        <ModalWrapper isVisible={true} closeFn={() => dispatch(closeModal())}>
            <View style={[globalStyles.modalView, globalStyles.shadow, styles.modalContainer]}>
                <CloseButton closeFunction={() => dispatch(closeModal())}/>
                <View style={{flex: 1}}>
                    <Text style={styles.titleText}>Player Comparison</Text>
                    <View style={[styles.controlsOuterContainers]}>
                        <View style={styles.controlContainer}>
                            <Animated.View style={[styles.switch, globalStyles.shadow, {transform: [{translateX: translateInterpolate}]}]}/>

                            { views.map( (name, index) =>
                                <TouchableOpacity key={index} style={styles.controlButtons} onPress={() => setViewIndex(index)}>
                                    <Text style={[styles.controlText, {color: viewIndex === index ? textPrimaryColor : textSecondaryColor}]}>{name}</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        {viewIndex === 1 &&
                            <View style={{position: 'absolute', right: 0, height: '100%', width: '15%'}}>
                                <FilterButton isArrowAbove={true}
                                              view={
                                                <View style={{ width: width * 0.65, marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 10 }}>
                                                    <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                        <Text style={[styles.text, { flex: 1 }]}>Per 90 Stats?</Text>
                                                        <Checkbox value={statsFilterState.isPer90}
                                                            color={statsFilterState.isPer90 ? fieldColor : lightColor}
                                                            onValueChange={() => statsFilterDispatch({ type: StatsFilterActionKind.ChangeIsPer90 })} />
                                                    </View>
                                                    <View style={{ marginTop: 10 }}>
                                                        <View style={{ alignItems: 'center' }}>
                                                            <Text style={[styles.text, { flex: 1, alignSelf: 'flex-start', paddingBottom: 5 }]}>Gameweeks:</Text>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <Text style={[styles.text, {flex: 1}]}>{statsFilterState.gameSpan[0]}</Text>
                                                            <Text style={[styles.text]}>{statsFilterState.gameSpan[1]}</Text>
                                                            </View>
                                                        </View>
                    
                                                        <Slider value={statsFilterState.gameSpan}
                                                                onValueChange={value => statsFilterDispatch({ type: StatsFilterActionKind.ChangeGameSpan, value: value as number[] })}
                                                                minimumValue={1}
                                                                maximumValue={currentGameweek}
                                                                step={1}
                                                                thumbTintColor={lightColor}
                                                                maximumTrackTintColor={secondaryColor}
                                                                minimumTrackTintColor={lightColor}/>
                                                    </View>
                                                </View>
                                              }/>
                            </View>
                        }
                    </View>
                    <View style={{flex: 1}} onStartShouldSetResponder={() => true}>
                        
                    <ScrollView style={{paddingBottom: 15, flex: 1, paddingTop: 15}}>
                        { playersToCompare.map(player => { return(
                            <PlayerComparisonView key={player.playerOverview.id} overview={overview} fixtures={fixtures} 
                                                playerOverview={player.playerOverview} playerSummary={player.playerSummary} 
                                                playerList={playersToCompare}
                                                viewIndex={viewIndex} statsFilterState={statsFilterState} 
                                                currentGameweek={currentGameweek} removePlayerFunction={removePlayer}/>
                        )})}

                    </ScrollView>
                    </View>

                    <TouchableOpacity style={[styles.button, {backgroundColor: (playersToCompare.length >= 5) ? lightColor : secondaryColor}]} onPress={() => setIsAddPlayerModalVisible(true)} disabled={playersToCompare.length >= 5}>
                        <Text style={styles.buttonText}>Add Player</Text>
                    </TouchableOpacity>
                </View>
                <ToolTip distanceFromRight={width * 0.15} distanceForArrowFromRight={-width}
                        distanceFromTop={height * 0.15}
                        isVisible={isAddPlayerModalVisible} 
                        setIsVisible={setIsAddPlayerModalVisible}
                        isArrowAbove={true}
                        view={<AddPlayerModal overview={overview} 
                                            closeFunction={() => setIsAddPlayerModalVisible(false)}
                                            addPlayerFunction={addPlayer}/>}/>
            </View>
        </ModalWrapper>
    )
}

export default PlayerComparisonModal;