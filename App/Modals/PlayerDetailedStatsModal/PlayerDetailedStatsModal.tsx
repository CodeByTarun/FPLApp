import React, { useEffect, useReducer, useRef, useState } from "react";
import { Pressable, View, Image, Text } from "react-native";
import globalStyles from "../../Global/GlobalStyles";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview, PlayerOverview } from "../../Models/FplOverview";
import { useAppDispatch } from "../../Store/hooks";
import { closeModal, ModalInfo, ModalTypes, openPlayerComparisonModal } from "../../Store/modalSlice";
import * as GlobalConstants from "../../Global/GlobalConstants";
import { Slider } from "@miblanchard/react-native-slider";
import Checkbox from "expo-checkbox";
import { useGetPlayerSummaryQuery } from "../../Store/fplSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Icons } from "../../Global/Images";
import FixtureDifficultyList from "../../Features/PlayerStats/PlayerList/FixtureDifficultyList";
import { CustomButton, FilterButton, LoadingIndicator, ModalWrapper } from "../../Features/Controls";
import { styles } from "./PlayerDetailedStatsModalStyles";
import { statsFilterReducer, StatsFilterActionKind } from "./StatsFilterReducer";
import { HistoryList, Stats } from "./PlayerDetailedStatsViews";
import { FplPlayerSummary } from "../../Models/FplPlayerSummary";
import { animated, useSpring } from "@react-spring/native";

const AnimatedView = animated(View);

interface PlayerDetailedStatsModalProps {
    overview: FplOverview;
    fixtures: FplFixture[];
    modalInfo: ModalInfo;
}

const PlayerDetailedStatsModal = ({overview, fixtures, modalInfo}: PlayerDetailedStatsModalProps) => {

    const dispatch = useAppDispatch();
    const playerDataQuery = useGetPlayerSummaryQuery((modalInfo.modalType === ModalTypes.DetailedPlayerModal) ? modalInfo.player.id : skipToken);
    const currentGameweek = overview.events.filter((event) => { return event.is_current === true; })[0].id;

    const playerRef = useRef(false as PlayerOverview | false);
    playerRef.current = (modalInfo.modalType === ModalTypes.DetailedPlayerModal) ? modalInfo.player : playerRef.current;
    const player = playerRef.current as PlayerOverview | false;

    const playerDataRef = useRef(false as FplPlayerSummary | false);
    playerDataRef.current = (playerDataQuery.isSuccess) ? playerDataQuery.data : playerDataRef.current;
    const playerData = playerDataRef.current as FplPlayerSummary | false;

    const [isStatsViewShowing, setIsStatViewShowing] = useState(true);
    const [statsFilterState, statsFilterDispatch] = useReducer(statsFilterReducer, { gameSpan: [1, currentGameweek], isPer90: false });

    const toggleSpring = useSpring({ left: isStatsViewShowing ? '0%' : '50%' });
    const viewSwitchSpring = useSpring({ statsLeft: isStatsViewShowing ? '0%' : '-120%', historyLeft: isStatsViewShowing ? '120%' : '0%' });

    useEffect( function ModalClosed() {
        statsFilterDispatch({ type: StatsFilterActionKind.Reset, value: [1, currentGameweek] });
        setIsStatViewShowing(true);
    }, [modalInfo.modalType]);

    return (
        <ModalWrapper isVisible={modalInfo.modalType === ModalTypes.DetailedPlayerModal} closeFn={() => dispatch(closeModal())} modalHeight={'65%'} modalWidth={'80%'}>    
            <View style={{ padding: 5, height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: GlobalConstants.primaryColor }}>
                { playerData && player ? 
                    <View style={{flex: 1, width: '100%'}}>
                        <View style={{flex: 10}}>
                            <View style={styles.header}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.titleText}>{player.web_name}</Text>
                                    <View style={{flex: 1, alignContent: 'flex-end', justifyContent: 'flex-end'}}>
                                        <Text style={[styles.text, {alignSelf: 'flex-end', marginBottom: 1}]}>Form: {player.form}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', paddingTop: 3}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={[styles.text, {fontWeight: 'bold'}]}>{overview.teams.find(team => team.code === player.team_code)?.short_name}  </Text>
                                        <Text style={styles.text}>{overview.element_types.find(element => element.id === player.element_type)?.singular_name_short}  </Text>
                                        <Text style={styles.text}>£{(player.now_cost / 10).toFixed(1)}  </Text>
                                    </View>

                                    <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                                        <Text style={styles.text}>Sel. {player.selected_by_percent}%</Text>
                                    </View>                                    
                                </View>
                                { (player.status !== 'a') && 
                                    <View style={{ flexDirection: 'row', height: 30, marginTop: 10, backgroundColor: GlobalConstants.secondaryColor}}>
                                        <View style={{height: '90%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 3, marginRight: 3}}>
                                            <Image style={{height: '100%', width: '100%', alignSelf: 'center', marginBottom: -2}} source={(player.status === 'd') ? Icons['doubtful'] : Icons['out']} resizeMode="contain"/>
                                        </View>
                                        <View style={{flex: 1, justifyContent: 'center'}}> 
                                            <Text style={[styles.text, { flexWrap: 'wrap'}]}>{player.news}</Text>
                                        </View>
                                    </View>
                                }
                            </View>

                            <View style={styles.controlsContainer}>
                                <View style={{flex: 1, height: '85%', alignSelf: 'center'}}>
                                    <CustomButton image="playercomparison" buttonFunction={() => dispatch(openPlayerComparisonModal({playerOverview: player, playerSummary: playerData}))}/>
                                </View>
                                <Pressable style={styles.statHistoryToggle} onPress={() => setIsStatViewShowing(!isStatsViewShowing)} hitSlop={5}>
                                    <AnimatedView style={[styles.viewToggleIndiciator, globalStyles.shadow, { left: toggleSpring.left }]} children={undefined}/>
                                    <View style={[styles.viewToggleStyle]}>
                                        <Text style={{alignSelf: 'center', color: GlobalConstants.textPrimaryColor, fontSize: GlobalConstants.mediumFont * 0.9}}>Stats</Text>
                                    </View>
                                    <View style={[styles.viewToggleStyle]}>
                                        <Text style={{alignSelf: 'center', color: GlobalConstants.textPrimaryColor, fontSize: GlobalConstants.mediumFont * 0.9}}>History</Text>
                                    </View>
                                </Pressable>
                                
                                
                                <View style={{flex: 1, height: '85%', alignSelf: 'center'}}>
                                    
                                        {isStatsViewShowing && 
                                            <FilterButton isArrowAbove={false} 
                                                            view={
                                                            <View style={{ width: GlobalConstants.width * 0.45, marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 10 }}>
                                                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                                                    <Text style={[styles.text, { flex: 1 }]}>Per 90 Stats?</Text>
                                                                    <Checkbox value={statsFilterState.isPer90}
                                                                        color={statsFilterState.isPer90 ? GlobalConstants.fieldColor : GlobalConstants.lightColor}
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
                                                                        thumbTintColor={GlobalConstants.lightColor}
                                                                        maximumTrackTintColor={GlobalConstants.secondaryColor}
                                                                        minimumTrackTintColor={GlobalConstants.lightColor}/>
                                                                </View>
                                                            </View>
                                                            } />                           
                                        }
                                </View>
                                
                            </View>

                            <View style={{flex: 1, overflow: 'hidden'}}>
                                <AnimatedView style={{position: 'absolute', width: '100%', height: '100%', left: viewSwitchSpring.statsLeft}}>
                                    <Stats statsFilterState={statsFilterState} player={player} playerData={playerData} currentGameweek={currentGameweek}/> 
                                </AnimatedView>
                                <AnimatedView style={{position: 'absolute', width: '100%', height: '100%', left: viewSwitchSpring.historyLeft}}>
                                    <HistoryList overview={overview} player={player} playerData={playerData}/>
                                </AnimatedView>
                            </View>
                        </View>

                        <View style={{flex: 1, paddingTop: 10, zIndex: -1}}>
                            <FixtureDifficultyList isFullList={true} overview={overview} fixtures={fixtures} currentGameweek={currentGameweek} team={player.team}/>
                        </View>
                    </View> : 
                    <View style={{height: '20%', width: '20%', alignSelf: 'center'}}>
                        <LoadingIndicator/>
                    </View>
                }
            </View>
        </ModalWrapper>
    )
}


export default PlayerDetailedStatsModal;