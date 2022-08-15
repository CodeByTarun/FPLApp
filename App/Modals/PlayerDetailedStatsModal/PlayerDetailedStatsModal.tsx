import React, { useContext, useEffect, useReducer, useState } from "react";
import { Pressable, View, Image, Text } from "react-native";
import globalStyles from "../../Global/GlobalStyles";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { changeFilterView, changePlayerSummaryInfo } from "../../Store/modalSlice";
import * as GlobalConstants from "../../Global/GlobalConstants";
import { useGetPlayerSummaryQuery } from "../../Store/fplSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Icons } from "../../Global/Images";
import FixtureDifficultyList from "../../Features/PlayerStats/PlayerList/FixtureDifficultyList";
import { AnimatedButton, CustomButton, LoadingIndicator, ModalWrapper } from "../../Features/Controls";
import { styles } from "./PlayerDetailedStatsModalStyles";
import { statsFilterReducer } from "./StatsFilterReducer";
import { HistoryList, Stats } from "./PlayerDetailedStatsViews";
import { animated, useSpring } from "@react-spring/native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParams } from "../../../App";
import { FplBaseDataContext } from "../../AppContext";
import { ScrollView } from "react-native-gesture-handler";
import FilterView from "./FilterView";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";

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

    useEffect( function SetPlayerSummaryToModalStore() {
        if (playerDataQuery.isSuccess) {
            dispatch(changePlayerSummaryInfo(playerDataQuery.data));
        } 
    }, [playerDataQuery.isSuccess])

    const openFilter = () => {
        dispatch(changeFilterView(<FilterView statsFilterState={statsFilterState} statsFilterDispatch={statsFilterDispatch} liveGameweek={liveGameweek}/>));
        navigation.navigate('FilterModal');
    }

    return (
        <ModalWrapper modalHeight={moderateVerticalScale(GlobalConstants.height * 0.63, -0.3)} modalWidth={moderateScale(GlobalConstants.width * 0.8, -0.15)}>    
            <View style={styles.container}>
                { overview && fixtures && liveGameweek && playerSummary && playerOverview && playerDataQuery.isSuccess ? 
                    <View style={{flex: 1, width: '100%'}}>
                        <View style={{flex: 10}}>
                            <View style={styles.header}>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={styles.titleText}>{playerOverview.web_name}</Text>
                                    <View style={{flex: 1, alignContent: 'flex-end', justifyContent: 'flex-end'}}>
                                        <Text style={[styles.text, {alignSelf: 'flex-end', marginBottom: moderateVerticalScale(1)}]}>Form: {playerOverview.form}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', paddingTop: moderateVerticalScale(3)}}>
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
                                    <View style={{ flexDirection: 'row', height: moderateVerticalScale(30), marginTop: moderateVerticalScale(10), backgroundColor: GlobalConstants.secondaryColor}}>
                                        <View style={{height: '90%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center', marginLeft: moderateScale(3), marginRight: moderateScale(3)}}>
                                            <Image style={{height: '100%', width: '100%', alignSelf: 'center', marginBottom: moderateVerticalScale(-2)}} source={(playerOverview.status === 'd') ? Icons['doubtful'] : Icons['out']} resizeMode="contain"/>
                                        </View>
                                        <View style={{flex: 1, justifyContent: 'center'}}> 
                                            <Text style={[styles.text, { flexWrap: 'wrap'}]}>{playerOverview.news}</Text>
                                        </View>
                                    </View>
                                }
                            </View>

                            <View style={styles.controlsContainer}>
                                <View style={styles.playerComparisonButtonContainer}>
                                    <CustomButton image="playercomparison" buttonFunction={() => navigation.navigate("PlayerComparisonModal")}/>
                                </View>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <Pressable style={styles.statHistoryToggle} onPress={() => setIsStatViewShowing(!isStatsViewShowing)} hitSlop={5}>
                                    <AnimatedView style={[styles.viewToggleIndiciator, globalStyles.shadow, { left: toggleSpring.left }]} children={undefined}/>
                                    <View style={[styles.viewToggleStyle]}>
                                        <Text style={{alignSelf: 'center', color: GlobalConstants.textPrimaryColor, fontSize: GlobalConstants.mediumFont * 0.9}}>Stats</Text>
                                    </View>
                                    <View style={[styles.viewToggleStyle]}>
                                        <Text style={{alignSelf: 'center', color: GlobalConstants.textPrimaryColor, fontSize: GlobalConstants.mediumFont * 0.9}}>History</Text>
                                    </View>
                                </Pressable>
                                </View>
                                
                                
                                <View style={styles.filterButtonContainer}>
                                    {isStatsViewShowing && 
                                        <AnimatedButton buttonFn={openFilter}>
                                            <Image source={Icons['filter']} resizeMode='contain' style={{height: '85%', width: '85%', alignSelf: 'center'}}/>
                                        </AnimatedButton>                      
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

                        <ScrollView horizontal style={{flex: 1, paddingTop: 10, zIndex: -1}}>
                            <FixtureDifficultyList isFullList={true} overview={overview} fixtures={fixtures} team={playerOverview.team} liveGameweek={liveGameweek}/>
                        </ScrollView>
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