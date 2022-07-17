import React, { useContext, useEffect, useReducer, useState } from "react";
import { Pressable, View, Image, Text } from "react-native";
import globalStyles from "../../Global/GlobalStyles";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview } from "../../Models/FplOverview";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { changePlayerSummaryInfo, ModalInfo } from "../../Store/modalSlice";
import * as GlobalConstants from "../../Global/GlobalConstants";
import Checkbox from "expo-checkbox";
import { useGetPlayerSummaryQuery } from "../../Store/fplSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Icons } from "../../Global/Images";
import FixtureDifficultyList from "../../Features/PlayerStats/PlayerList/FixtureDifficultyList";
import { CustomButton, FilterButton, LoadingIndicator, ModalWrapper } from "../../Features/Controls";
import { styles } from "./PlayerDetailedStatsModalStyles";
import { statsFilterReducer, StatsFilterActionKind } from "./StatsFilterReducer";
import { HistoryList, Stats } from "./PlayerDetailedStatsViews";
import { animated, useSpring } from "@react-spring/native";
import CustomSlider from "../../Features/Controls/Slider";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../../App";
import { FplBaseDataContext } from "../../AppContext";

const AnimatedView = animated(View);

const PlayerDetailedStatsModal = () => {

    const dispatch = useAppDispatch();
    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
    const { overview, fixtures } = useContext(FplBaseDataContext);
    const modalInfo = useAppSelector(state => state.modal);
    const liveGameweek = useAppSelector(state => state.team.liveGameweek);

    const playerDataQuery = useGetPlayerSummaryQuery(modalInfo.playerOverview ? modalInfo.playerOverview.id : skipToken);

    const playerOverview = modalInfo.playerOverview;
    const playerSummary = modalInfo.playerSummary;

    const [isStatsViewShowing, setIsStatViewShowing] = useState(true);
    const [statsFilterState, statsFilterDispatch] = useReducer(statsFilterReducer, { gameSpan: [1, liveGameweek ?? 38], isPer90: false });

    const toggleSpring = useSpring({ left: isStatsViewShowing ? '0%' : '50%' });
    const viewSwitchSpring = useSpring({ statsLeft: isStatsViewShowing ? '0%' : '-120%', historyLeft: isStatsViewShowing ? '120%' : '0%' });

    // useEffect( function ModalClosed() {
    //     statsFilterDispatch({ type: StatsFilterActionKind.Reset, value: [1, currentGameweek] });
    //     setIsStatViewShowing(true);
    // }, [modalInfo.modalType]);

    useEffect( function SetPlayerSummaryToModalStore() {
        if (playerDataQuery.isSuccess) {
            dispatch(changePlayerSummaryInfo(playerDataQuery.data));
        } 
    }, [playerDataQuery.isSuccess])

    return (
        <ModalWrapper modalHeight={'65%'} modalWidth={'80%'}>    
            <View style={{ padding: 5, height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: GlobalConstants.primaryColor }}>
                { overview && fixtures && liveGameweek && playerSummary && playerOverview && playerDataQuery.isSuccess ? 
                    <View style={{flex: 1, width: '100%'}}>
                        <View style={{flex: 10}}>
                            <View style={styles.header}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.titleText}>{playerOverview.web_name}</Text>
                                    <View style={{flex: 1, alignContent: 'flex-end', justifyContent: 'flex-end'}}>
                                        <Text style={[styles.text, {alignSelf: 'flex-end', marginBottom: 1}]}>Form: {playerOverview.form}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', paddingTop: 3}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={[styles.text, {fontWeight: 'bold'}]}>{overview.teams.find(team => team.code === playerOverview.team_code)?.short_name}  </Text>
                                        <Text style={styles.text}>{overview.element_types.find(element => element.id === playerOverview.element_type)?.singular_name_short}  </Text>
                                        <Text style={styles.text}>£{(playerOverview.now_cost / 10).toFixed(1)}  </Text>
                                    </View>

                                    <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                                        <Text style={styles.text}>Sel. {playerOverview.selected_by_percent}%</Text>
                                    </View>                                    
                                </View>
                                { (playerOverview.status !== 'a') && 
                                    <View style={{ flexDirection: 'row', height: 30, marginTop: 10, backgroundColor: GlobalConstants.secondaryColor}}>
                                        <View style={{height: '90%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 3, marginRight: 3}}>
                                            <Image style={{height: '100%', width: '100%', alignSelf: 'center', marginBottom: -2}} source={(playerOverview.status === 'd') ? Icons['doubtful'] : Icons['out']} resizeMode="contain"/>
                                        </View>
                                        <View style={{flex: 1, justifyContent: 'center'}}> 
                                            <Text style={[styles.text, { flexWrap: 'wrap'}]}>{playerOverview.news}</Text>
                                        </View>
                                    </View>
                                }
                            </View>

                            <View style={styles.controlsContainer}>
                                <View style={{flex: 1, height: '85%', alignSelf: 'center'}}>
                                    <CustomButton image="playercomparison" buttonFunction={() => navigation.navigate("PlayerComparisonModal")}/>
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
                                                                    <CustomSlider header="Gameweeks:" minValue={1} maxValue={liveGameweek} step={1}
                                                                                  initialRange={statsFilterState.gameSpan}
                                                                                  onValueChange={value => statsFilterDispatch({ type: StatsFilterActionKind.ChangeGameSpan, value: value })}/>
                                                                </View>
                                                            </View>
                                                            } />                           
                                        }
                                </View>
                                
                            </View>

                            <View style={{flex: 1, overflow: 'hidden'}}>
                                <AnimatedView style={{position: 'absolute', width: '100%', height: '100%', left: viewSwitchSpring.statsLeft}}>
                                    <Stats statsFilterState={statsFilterState} player={playerOverview} playerData={playerSummary}/> 
                                </AnimatedView>
                                <AnimatedView style={{position: 'absolute', width: '100%', height: '100%', left: viewSwitchSpring.historyLeft}}>
                                    <HistoryList overview={overview} player={playerOverview} playerData={playerSummary}/>
                                </AnimatedView>
                            </View>
                        </View>

                        <View style={{flex: 1, paddingTop: 10, zIndex: -1}}>
                            <FixtureDifficultyList isFullList={true} overview={overview} fixtures={fixtures} team={playerOverview.team} liveGameweek={liveGameweek}/>
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