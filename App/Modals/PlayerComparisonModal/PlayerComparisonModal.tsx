import Checkbox from "expo-checkbox";
import React, { useEffect, useReducer, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { AnimatedButton, FilterButton, ModalWrapper, ToolTip } from "../../Features/Controls";
import { fieldColor, height, lightColor, secondaryColor, textPrimaryColor, textSecondaryColor, width } from "../../Global/GlobalConstants";
import globalStyles from "../../Global/GlobalStyles";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview, PlayerOverview } from "../../Models/FplOverview";
import { FplPlayerSummary } from "../../Models/FplPlayerSummary";
import { ModalInfo } from "../../Store/modalSlice";
import { StatsFilterActionKind, statsFilterReducer } from "../PlayerDetailedStatsModal/StatsFilterReducer";
import { styles } from "./PlayerComparisonModalStyles";
import AddPlayerModal from "./AddPlayerModal";
import PlayerComparisonView from "./PlayerComparisonView";
import { animated, useSpring } from "@react-spring/native";
import CustomSlider from "../../Features/Controls/Slider";
import { useAppSelector } from "../../Store/hooks";

export interface CombinedPlayerData {
    playerOverview: PlayerOverview;
    playerSummary: FplPlayerSummary;
}
interface PlayerComparisonModalProps {
    overview: FplOverview,
    fixtures: FplFixture[],
    modalInfo: ModalInfo,
}

const AnimatedView = animated(View);

const views = ['GW', 'Stats', 'FDR'];

const PlayerComparisonModal = ({overview, fixtures, modalInfo} : PlayerComparisonModalProps) => {

    const liveGameweek = useAppSelector(state => state.team.liveGameweek);

    const [viewIndex, setViewIndex] = useState(0);
    const [statsFilterState, statsFilterDispatch] = useReducer(statsFilterReducer, { gameSpan: [1, liveGameweek], isPer90: false });
    const [isAddPlayerModalVisible, setIsAddPlayerModalVisible] = useState(false);
    const [playersToCompare, setPlayersToCompare] = useState([] as CombinedPlayerData[]);

    //#region  Control Animation
    const slideSpring = useSpring({left: `${viewIndex * (100 / 3)}%`});

    //#endregion
    useEffect(() => {
        if (modalInfo.playerOverview && modalInfo.playerSummary) {
            setPlayersToCompare([{playerOverview: modalInfo.playerOverview, playerSummary: modalInfo.playerSummary}]);
        }

    }, [modalInfo.playerOverview])

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
        <ModalWrapper modalHeight={'80%'} modalWidth={'85%'}>
            <View style={styles.modalContainer}>
                <View style={{flex: 1}}>
                    <Text style={styles.titleText}>Player Comparison</Text>
                    <View style={[styles.controlsOuterContainers]}>
                        <View style={styles.controlContainer}>
                            <AnimatedView style={[styles.switch, globalStyles.shadow, { left: slideSpring.left }]} children={undefined}/>

                            { views.map( (name, index) =>
                                <View key={index} style={styles.controlButtons}>
                                    <AnimatedButton buttonFn={() => setViewIndex(index)}>
                                        <Text style={[styles.controlText, {color: viewIndex === index ? textPrimaryColor : textSecondaryColor}]}>{name}</Text>
                                    </AnimatedButton>
                                </View> 
                            )}
                        </View>
                        {viewIndex === 1 &&
                            <View style={styles.filterButtonContainer}>
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
                                                        <CustomSlider header={"Gameweeks:"} minValue={1} maxValue={liveGameweek} 
                                                                      step={1} initialRange={statsFilterState.gameSpan}
                                                                      onValueChange={value => statsFilterDispatch({ type: StatsFilterActionKind.ChangeGameSpan, value: value })}/>
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
                                                    playerList={playersToCompare} viewIndex={viewIndex} 
                                                    statsFilterState={statsFilterState} removePlayerFunction={removePlayer}/>
                            )})}

                    </ScrollView>
                    </View>
                    <AnimatedButton buttonFn={() => setIsAddPlayerModalVisible(true)} disabled={playersToCompare.length >= 5}>                
                        <View style={[styles.button, {backgroundColor: (playersToCompare.length >= 5) ? lightColor : secondaryColor}]}>
                            <Text style={styles.buttonText}>Add Player</Text>
                        </View>
                    </AnimatedButton>
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