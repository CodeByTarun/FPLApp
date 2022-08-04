import React, { useCallback, useContext, useEffect, useReducer, useState } from "react";
import { View, Text, Image } from "react-native";
import { AnimatedButton, ModalWrapper } from "../../Features/Controls";
import { lightColor, secondaryColor, textPrimaryColor, textSecondaryColor } from "../../Global/GlobalConstants";
import globalStyles from "../../Global/GlobalStyles";
import { PlayerOverview } from "../../Models/FplOverview";
import { FplPlayerSummary } from "../../Models/FplPlayerSummary";
import { changeFilterView, changeMutableView } from "../../Store/modalSlice";
import { statsFilterReducer } from "../PlayerDetailedStatsModal/StatsFilterReducer";
import { styles } from "./PlayerComparisonModalStyles";
import AddPlayerModal from "./AddPlayerModal";
import { animated, useSpring } from "@react-spring/native";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { FplBaseDataContext } from "../../AppContext";
import PlayerComparisonFlatList from "./PlayerComparisonFlatList";
import { Icons } from "../../Global/Images";
import FilterView from "../PlayerDetailedStatsModal/FilterView";

export interface CombinedPlayerData {
    playerOverview: PlayerOverview;
    playerSummary: FplPlayerSummary;
}

const AnimatedView = animated(View);

const views = ['GW', 'Stats', 'FDR'];

const PlayerComparisonModal = () => {

    const liveGameweek = useAppSelector(state => state.team.liveGameweek);
    const navigator = useNavigation<StackNavigationProp<RootStackParams>>();
    const dispatch = useAppDispatch();
    const modalInfo = useAppSelector(state => state.modal);
    const { overview, fixtures } = useContext(FplBaseDataContext);

    const [viewIndex, setViewIndex] = useState(0);
    const [isEditActive, setIsEditActive] = useState(false);
    const [statsFilterState, statsFilterDispatch] = useReducer(statsFilterReducer, { gameSpan: [1, liveGameweek], isPer90: false });
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

    const openAddPlayerModal = useCallback(() => {
        dispatch(changeMutableView({view: <AddPlayerModal overview={overview} 
                                                          closeFunction={navigator.goBack}
                                                          addPlayerFunction={addPlayer}/>,
                                    width: '65%'}));
        navigator.navigate('MutableModal');
    }, [playersToCompare ]);

    const openFilter = () => {
        dispatch(changeFilterView(<FilterView statsFilterState={statsFilterState} statsFilterDispatch={statsFilterDispatch} liveGameweek={liveGameweek}/>));
        navigator.navigate('FilterModal');
    }

    return (
        <ModalWrapper modalHeight={'80%'} modalWidth={'85%'}>
            <View style={styles.container}>
                <Text style={styles.titleText}>Player Comparison</Text>
                <View style={[styles.controlsOuterContainers]}>
                    <View style={[styles.editButtonContainer, isEditActive && {opacity: 0.5}]}>
                        <AnimatedButton buttonFn={() => setIsEditActive(!isEditActive)}>
                            <Image source={Icons['edit']} resizeMode='contain' style={{height: '80%', width: '80%', alignSelf: 'center'}}/>
                        </AnimatedButton>
                    </View>
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
                            <AnimatedButton buttonFn={openFilter}>
                                <Image source={Icons['filter']} resizeMode='contain' style={{height: '85%', width: '85%', alignSelf: 'center'}}/>
                            </AnimatedButton> 
                        </View>
                    }
                </View>
                <View style={{flex: 1}}>
                    { overview && fixtures &&
                        <PlayerComparisonFlatList overview={overview} fixtures={fixtures} isEditActive={isEditActive}
                                                    viewIndex={viewIndex} statsFilterState={statsFilterState} 
                                                    removePlayerFunction={ removePlayer } playerList={playersToCompare}/>
                    }
                </View>
                <AnimatedButton buttonFn={() => openAddPlayerModal()} disabled={playersToCompare.length >= 5}>                
                    <View style={[styles.button, {backgroundColor: (playersToCompare.length >= 5) ? lightColor : secondaryColor}]}>
                        <Text style={styles.buttonText}>Add Player</Text>
                    </View>
                </AnimatedButton>
            </View>
        </ModalWrapper>
    )
}

export default PlayerComparisonModal; 

const playersToCompareHeader = () => {

}