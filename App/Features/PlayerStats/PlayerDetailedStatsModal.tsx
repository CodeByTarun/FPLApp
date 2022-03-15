import React, { useEffect, useReducer, useState } from "react";
import { Modal, Pressable, View, StyleSheet, Image, Text, Switch, FlatList, ScrollView } from "react-native";
import globalStyles from "../../Global/GlobalStyles";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview, PlayerOverview } from "../../Models/FplOverview";
import { useAppDispatch, useAppSelector } from "../../Store/hooks";
import { closePlayerDetailedStatsModal } from "../../Store/modalSlice";
import * as GlobalConstants from "../../Global/GlobalConstants";
import { Icons } from "../../Global/Images";
import FixtureDifficultyList from "./FixtureDifficultyList";
import PieChart from "../Controls/PieChart";
import ToolTip from "../Controls/ToolTip";
import { Slider } from "@miblanchard/react-native-slider";
import Checkbox from "expo-checkbox";
import { useGetPlayerSummaryQuery } from "../../Store/fplSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { History } from "../../Models/FplPlayerSummary";

// If gamespan is null it will do overall stats for all games played
interface StatsFilterState {
    gameSpan: number | null;
    isPer90: boolean;
}

enum StatsFilterActionKind {
    ChangeGameSpan,
    ChangeIsPer90,
    Reset,
}

type StatsFilterAction = {
    type: StatsFilterActionKind.ChangeGameSpan;
    value: number;
} | {
    type: StatsFilterActionKind.ChangeIsPer90;
} | {
    type: StatsFilterActionKind.Reset;
    value: number;
}

function statsFilterReducer(state: StatsFilterState, action: StatsFilterAction): StatsFilterState {
    switch (action.type) {
        case StatsFilterActionKind.ChangeGameSpan: {
            return {
                gameSpan: action.value,
                isPer90: state.isPer90,
            }
        }
        case StatsFilterActionKind.ChangeIsPer90: {
            return {
                gameSpan: state.gameSpan, 
                isPer90: !state.isPer90,
            }
        }
        case StatsFilterActionKind.Reset: {
            return { gameSpan: action.value, isPer90: false };
        }
    }
}

interface PlayerDetailedStatsModalProps {
    overview: FplOverview;
    fixtures: FplFixture[];
}

const PlayerDetailedStatsModal = (props: PlayerDetailedStatsModalProps) => {

    const dispatch = useAppDispatch();
    const player = useAppSelector(state => state.modal);
    const playerData = useGetPlayerSummaryQuery(player ? player.id : skipToken);
    const currentGameweek = props.overview.events.filter((event) => { return event.is_current === true; })[0].id;

    const [isStatsViewShowing, setIsStatViewShowing] = useState(true);
    const [statsFilterState, statsFilterDispatch] = useReducer(statsFilterReducer, { gameSpan: currentGameweek, isPer90: false });

    useEffect( function ModalClosed() {
        statsFilterDispatch({type: StatsFilterActionKind.Reset, value: currentGameweek });
        setIsStatViewShowing(true);
    }, [player]);

    return (
        <>
        { (player) && 
            <Modal animationType="fade" transparent={true} visible={player ? true : false} style={{position: 'absolute'}}>
                <Pressable style={globalStyles.modalBackground} onPressIn={() => dispatch(closePlayerDetailedStatsModal())}/>       
                <View style={[globalStyles.modalView, globalStyles.modalShadow, { height: GlobalConstants.height * 0.6, width: GlobalConstants.width* 0.8, padding: 15 }]}>
                    <Pressable style={styles.closeButton} onPressIn={() => dispatch(closePlayerDetailedStatsModal())}>
                        <View style={styles.closeButtonBackground}>
                            <Image style={{height: '50%', width: '50%'}} source={Icons["close"]} resizeMode="contain"/>
                        </View>
                    </Pressable>    
                    { playerData.isSuccess && 
                        <View style={{flex: 1}}>
                            <View style={{flex: 10}}>

                                <View style={styles.header}>
                                    <Text style={styles.titleText}>{player.web_name}</Text>
                                    <View style={{flexDirection: 'row', paddingTop: 3}}>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={styles.text}>£{(player.now_cost / 10).toFixed(1)}  </Text>
                                            <Text style={[styles.text, {fontWeight: 'bold'}]}>{props.overview.teams.find(team => team.code === player.team_code)?.short_name}  </Text>
                                            <Text style={styles.text}>{props.overview.element_types.find(element => element.id === player.element_type)?.singular_name_short}  </Text>
                                        </View>

                                        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                                            <Text style={styles.text}>Sel. {player.selected_by_percent}%</Text>
                                        </View>                                    
                                    </View>
                                </View>

                                <View style={styles.controlsContainer}>
                                    <View style={{flex: 1}}/>
                                    <Pressable style={{flex: 2, alignItems:'center', justifyContent: 'center', flexDirection: 'row'}} onPress={() => setIsStatViewShowing(!isStatsViewShowing)}>
                                        <View style={[styles.viewToggleStyle, {backgroundColor: isStatsViewShowing ? 'white' : GlobalConstants.secondaryColor,
                                                    borderTopLeftRadius: 5, borderBottomLeftRadius: 5}]}>
                                            <Text style={{alignSelf: 'center', color: isStatsViewShowing ? GlobalConstants.textSecondaryColor : GlobalConstants.textPrimaryColor, fontSize: GlobalConstants.mediumFont * 0.9}}>Stats</Text>
                                        </View>
                                        <View style={[styles.viewToggleStyle, {backgroundColor: isStatsViewShowing ? GlobalConstants.secondaryColor : 'white', 
                                                    borderTopRightRadius: 5, borderBottomRightRadius: 5}]}>
                                            <Text style={{alignSelf: 'center', color: isStatsViewShowing ? GlobalConstants.textPrimaryColor : GlobalConstants.textSecondaryColor, fontSize: GlobalConstants.mediumFont * 0.9}}>History</Text>
                                        </View>
                                    </Pressable>
                                    
                                    
                                    <View style={{flex: 1}}>
                                        <ToolTip view={
                                            <View style={{width: GlobalConstants.width* 0.45, marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 10}}>
                                                <View style={{flexDirection: 'row', marginTop: 10}}>                                            
                                                    <Text style={[styles.text, {flex: 1}]}>Per 90 Stats?   </Text> 
                                                    <Checkbox value={ statsFilterState.isPer90 } 
                                                            color={statsFilterState.isPer90 ? GlobalConstants.fieldColor : GlobalConstants.primaryColor}
                                                            onValueChange={ () => statsFilterDispatch({ type: StatsFilterActionKind.ChangeIsPer90 })}/>
                                                </View>
                                                <View style={{marginTop: 20}}>
                                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                        <Text style={[styles.text, {flex: 1}]}>Game span</Text>
                                                        <Text style={styles.text}>{ statsFilterState.gameSpan }</Text>
                                                    </View>
                                                    
                                                    <Slider value={ statsFilterState.gameSpan ? statsFilterState.gameSpan : 0 } 
                                                            onValueChange={value => statsFilterDispatch({ type: StatsFilterActionKind.ChangeGameSpan, value: value as number })}
                                                            minimumValue={1}
                                                            maximumValue={currentGameweek}
                                                            step={1}
                                                            thumbTintColor={GlobalConstants.primaryColor}
                                                            maximumTrackTintColor={'white'}
                                                            minimumTrackTintColor={GlobalConstants.primaryColor}/>
                                                </View>
                                            </View>                                        
                                        }>
                                            {isStatsViewShowing && 
                                                <Image style={{height: '70%', width: '40%', alignSelf:'flex-end'}} source={require('../../../assets/filter.png')} resizeMode='contain'/>
                                            }
                                        </ToolTip>
                                    </View>
                                    
                                </View>


                                { isStatsViewShowing ?
                                <View style={{flex: 1, padding: 10, flexDirection:'row'}}>
                                    <PieChart firstStatName="G" secondStatName="A" 
                                            firstStatColor="red" secondStatColor="green" 
                                            firstStatValue={parseFloat(statsFilterState.isPer90 ? (player.goals_scored / player.minutes * 90).toFixed(2) : player.goals_scored.toString())} 
                                            secondStatValue={parseFloat(statsFilterState.isPer90 ? (player.assists / player.minutes * 90).toFixed(2) : player.assists.toString())}/>
                                </View> :
                                <View style={{flex: 1, paddingBottom: 5, backgroundColor: GlobalConstants.secondaryColor, paddingLeft: 5, paddingRight: 5}}>
                                    <ScrollView horizontal={true}>
                                        <FlatList style={{flex: 1}} contentContainerStyle={{justifyContent: 'center'}} data={playerData.data.history}
                                                ListHeaderComponent={() => {
                                                    return (
                                                    <View style={{flexDirection: 'row', 
                                                                  alignItems: 'center',  
                                                                  flex: 1, 
                                                                  borderBottomColor: GlobalConstants.lightColor, borderBottomWidth: 1,
                                                                  paddingBottom: 5, paddingTop: 10,
                                                                  backgroundColor: GlobalConstants.secondaryColor}}>
                                                        { shortFormStatNames.map((stat) => {
                                                            return (
                                                                <View key={stat} style={styles.tableTextContainer}>
                                                                    <Text key={stat} style={[styles.headerText]}>{ stat }</Text>
                                                                </View>
                                                            )})}
                                                    </View>
                                                    )}}
                                                keyExtractor={item => item.fixture.toString()}
                                                renderItem={(item) => {
                                                   return (<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', 
                                                                         justifyContent: 'center', paddingBottom: 5, paddingTop: 5,
                                                                         borderBottomColor: GlobalConstants.aLittleLighterColor, borderBottomWidth: 1,}}>
                                                        { statNames.map((stat) => {
                                                           return (
                                                            <View key={stat} style={styles.tableTextContainer}>
                                                                <Text  style={[styles.headerText]}>{ item.item[stat as keyof History] }</Text>
                                                            </View>
                                                           )
                                                        })}
                                                    </View>)}}
                                                    stickyHeaderIndices={[0]}
                                                ListFooterComponent={ () =>
                                                    <View style={{flexDirection: 'row', borderTopColor: GlobalConstants.lightColor, borderTopWidth: 1, paddingTop: 5,}}>
                                                        { statNames.map((stat) => {
                                                            return (
                                                            <View key={stat} style={styles.tableTextContainer}>
                                                                <Text  style={[styles.headerText]}>{ player[stat as keyof PlayerOverview] }</Text>
                                                            </View>
                                                            )
                                                        })}
                                                    </View>
                                                }/>
                                        
                                        
                                    </ScrollView>
                                </View>
                                }

                            </View>

                            <View style={{flex: 1, paddingTop: 10}}>
                                <FixtureDifficultyList isFullList={true} overview={props.overview} fixtures={props.fixtures} currentGameweek={currentGameweek} team={player.team}/>
                            </View>
                        </View>
                    }
                </View>
            </Modal>
        }
        </>
    )
}

const shortFormStatNames = ['GW', 'OPP', 'PTS', 'MP', 'GS', 'A', 'CS', 'OG',  'PS', 'PM', 'YC', 'RC', 'S', 'B', 'BPS'];
const statNames = ['round', 'opponent_team', 'total_points', 'minutes', 'goals_scored', 'assists', 'clean_sheets', 'own_goals', 'penalties_saved', 'penalties_missed', 'yellow_cards', 'red_cards', 'saves', 'bonus', 'bps'];

const styles = StyleSheet.create({

    header: {
    },

    controlsContainer: {
        height: GlobalConstants.height*0.05,
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 5,
    },

    titleText: {
        fontSize: GlobalConstants.largeFont * 1.3,
        color: GlobalConstants.textPrimaryColor,
        fontWeight: 'bold',
    }, 

    viewToggleStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'red',
        padding: 5,
    },

    text: {
        color: GlobalConstants.textPrimaryColor,
        fontSize: GlobalConstants.mediumFont,
        fontWeight: '500'
    },

    tableTextContainer: {
        width: GlobalConstants.width*0.1,
        flex: 1,
    },

    headerText: {
        color: GlobalConstants.textPrimaryColor,
        fontSize: GlobalConstants.mediumFont,
        fontWeight: '500',
        alignSelf: 'center',
    },

    //#region  close button
    closeButton: {
        position: 'absolute',
        zIndex: 1,
        right: -7,
        top: -7,
        height: 25,
        width: 25,
        margin: 0,
        borderRadius: 20,
    },

    closeButtonBackground: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: GlobalConstants.secondaryColor,
        borderRadius: 20,
    },

    //#endregion
})

export default PlayerDetailedStatsModal;