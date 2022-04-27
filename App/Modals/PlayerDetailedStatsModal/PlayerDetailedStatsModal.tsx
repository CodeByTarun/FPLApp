import React, { useEffect, useReducer, useState } from "react";
import { Modal, Pressable, View, Image, Text } from "react-native";
import globalStyles from "../../Global/GlobalStyles";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview, PlayerOverview } from "../../Models/FplOverview";
import { useAppDispatch } from "../../Store/hooks";
import { closeModal, openPlayerComparisonModal } from "../../Store/modalSlice";
import * as GlobalConstants from "../../Global/GlobalConstants";
import { Slider } from "@miblanchard/react-native-slider";
import Checkbox from "expo-checkbox";
import { useGetPlayerSummaryQuery } from "../../Store/fplSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { Icons } from "../../Global/Images";
import FixtureDifficultyList from "../../Features/PlayerStats/PlayerList/FixtureDifficultyList";
import { CloseButton, CustomButton, ModalWrapper, ToolTip } from "../../Features/Controls";
import { styles } from "./PlayerDetailedStatsModalStyles";
import { statsFilterReducer, StatsFilterActionKind } from "./StatsFilterReducer";
import { HistoryList, Stats } from "./PlayerDetailedStatsViews";

interface PlayerDetailedStatsModalProps {
    overview: FplOverview;
    fixtures: FplFixture[];
    player: PlayerOverview;
}

const PlayerDetailedStatsModal = ({overview, fixtures, player}: PlayerDetailedStatsModalProps) => {

    const dispatch = useAppDispatch();
    const playerData = useGetPlayerSummaryQuery(player ? player.id : skipToken);
    const currentGameweek = overview.events.filter((event) => { return event.is_current === true; })[0].id;

    const [isStatsViewShowing, setIsStatViewShowing] = useState(true);
    const [statsFilterState, statsFilterDispatch] = useReducer(statsFilterReducer, { gameSpan: [1, currentGameweek], isPer90: false });
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

    useEffect( function ModalClosed() {
        statsFilterDispatch({ type: StatsFilterActionKind.Reset, value: [1, currentGameweek] });
        setIsStatViewShowing(true);
    }, [player]);

    return (
        <>
        { (player) && 
            <ModalWrapper isVisible={player ? true : false} closeFn={() => dispatch(closeModal())}>    
                <View style={[globalStyles.modalView, globalStyles.modalShadow, { height: GlobalConstants.height * 0.65, 
                                                                                  width: GlobalConstants.width* 0.8, padding: 15 }]}>
                    <CloseButton closeFunction={() => dispatch(closeModal())}/> 
                    { playerData.isSuccess && 
                        <View style={{flex: 1}}>
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
                                        <CustomButton image="playercomparison" buttonFunction={() => dispatch(openPlayerComparisonModal({playerOverview: player, playerSummary: playerData.data}))}/>
                                    </View>
                                    <Pressable style={styles.statHistoryToggle} onPress={() => setIsStatViewShowing(!isStatsViewShowing)}>
                                        <View style={[styles.viewToggleStyle, {backgroundColor: isStatsViewShowing ? GlobalConstants.primaryColor : GlobalConstants.secondaryColor,
                                                    borderTopLeftRadius: 5, borderBottomLeftRadius: 5}]}>
                                            <Text style={{alignSelf: 'center', color: GlobalConstants.textPrimaryColor, fontSize: GlobalConstants.mediumFont * 0.9}}>Stats</Text>
                                        </View>
                                        <View style={[styles.viewToggleStyle, {backgroundColor: isStatsViewShowing ? GlobalConstants.secondaryColor : GlobalConstants.primaryColor, 
                                                    borderTopRightRadius: 5, borderBottomRightRadius: 5}]}>
                                            <Text style={{alignSelf: 'center', color: GlobalConstants.textPrimaryColor, fontSize: GlobalConstants.mediumFont * 0.9}}>History</Text>
                                        </View>
                                    </Pressable>
                                    
                                    
                                    <View style={{flex: 1, height: '85%', alignSelf: 'center'}}>
                                        
                                            {isStatsViewShowing && 
                                                <CustomButton image={'filter'} buttonFunction={() => setIsFilterModalVisible(true)}/>                            
                                            }
                                    </View>
                                    
                                </View>

                                { isStatsViewShowing ?
                                    <Stats statsFilterState={statsFilterState} player={player} playerData={playerData.data} currentGameweek={currentGameweek}/> :  
                                    <HistoryList overview={overview} player={player} playerData={playerData.data}/>
                                }

                            </View>

                            <View style={{flex: 1, paddingTop: 10, zIndex: -1}}>
                                <FixtureDifficultyList isFullList={true} overview={overview} fixtures={fixtures} currentGameweek={currentGameweek} team={player.team}/>
                            </View>
                        </View>
                    }
                    <ToolTip distanceFromRight={GlobalConstants.width * 0.12} distanceForArrowFromRight={(GlobalConstants.width * 0.08 - 2.5)}
                             distanceFromTop={GlobalConstants.height * 0.07}
                             isVisible={isFilterModalVisible} 
                             setIsVisible={setIsFilterModalVisible}
                             isArrowAbove={false}
                             view={<View style={{ width: GlobalConstants.width * 0.45, marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 10 }}>
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
                                    </View>}/>
                </View>
            </ModalWrapper>
        }
        </>
    )
}


export default PlayerDetailedStatsModal;