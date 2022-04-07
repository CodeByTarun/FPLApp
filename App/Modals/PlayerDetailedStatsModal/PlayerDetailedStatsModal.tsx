import React, { useCallback, useEffect, useReducer, useState } from "react";
import { Modal, Pressable, View, StyleSheet, Image, Text, FlatList, ScrollView } from "react-native";
import globalStyles from "../../Global/GlobalStyles";
import { FplFixture } from "../../Models/FplFixtures";
import { FplOverview, PlayerOverview } from "../../Models/FplOverview";
import { useAppDispatch } from "../../Store/hooks";
import { closeModal } from "../../Store/modalSlice";
import * as GlobalConstants from "../../Global/GlobalConstants";
import { Slider } from "@miblanchard/react-native-slider";
import Checkbox from "expo-checkbox";
import { useGetPlayerSummaryQuery } from "../../Store/fplSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { History } from "../../Models/FplPlayerSummary";
import { Icons } from "../../Global/Images";
import FixtureDifficultyList from "../../Features/PlayerStats/PlayerList/FixtureDifficultyList";
import { CloseButton, CustomButton, PieChart, ToolTip } from "../../Features/Controls";
import { styles } from "./PlayerDetailedStatsModalStyles";

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
    player: PlayerOverview;
}

const PlayerDetailedStatsModal = (props: PlayerDetailedStatsModalProps) => {

    const dispatch = useAppDispatch();
    const playerData = useGetPlayerSummaryQuery(props.player ? props.player.id : skipToken);
    const currentGameweek = props.overview.events.filter((event) => { return event.is_current === true; })[0].id;

    const [isStatsViewShowing, setIsStatViewShowing] = useState(true);
    const [statsFilterState, statsFilterDispatch] = useReducer(statsFilterReducer, { gameSpan: currentGameweek, isPer90: false });
    const [playerFilteredStats, setPlayerFilteredStats] = useState(initialFilteredStats);
    const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

    useEffect( function ModalClosed() {
        statsFilterDispatch({type: StatsFilterActionKind.Reset, value: currentGameweek });
        setIsStatViewShowing(true);
    }, [props.player]);

    useEffect( function getInitialPlayerFilteredStats() {
        if (props.player) {
            setPlayerFilteredStats({
                total_points: props.player.total_points,
                goals_scored: props.player.goals_scored,
                assists: props.player.assists,
                bonus: props.player.bonus,
                bps: props.player.bps,
                clean_sheets: props.player.clean_sheets,
                saves: props.player.saves,
                influence: Number(props.player.influence),
                creativity: Number(props.player.creativity),
                threat: Number(props.player.threat),
                minutes: props.player.minutes,
            })
        }
    }, [props.player])

    useEffect( function updatePlayerFilteredStats() {

        if (playerData.data && statsFilterState.gameSpan) {
            var filteredPlayerStats: FilteredStats = initialFilteredStats;
            filteredStats.map((stat) => filteredPlayerStats[stat as keyof FilteredStats] = playerData.data!.history.slice(statsFilterState.gameSpan! * -1)
                                                                                                                   .reduce((prev, curr) => prev + (Number(curr[stat as keyof History])), 0))
            setPlayerFilteredStats(filteredPlayerStats);
        }     

    }, [statsFilterState.gameSpan])

    const renderHistoryItem = useCallback(({item}: {item: History}) => {
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
                            <Text key={stat} style={[[styles.headerText, {fontWeight: '700'}]]}>{ stat }</Text>
                        </View>
                    )})}
            </View>
        )
    }, [])

    const historyItemKeyExtractor = useCallback((history: History) => history.fixture.toString(), []);

    return (
        <>
        { (props.player) && 
            <Modal animationType="fade" transparent={true} visible={props.player ? true : false} style={{position: 'absolute'}}>
                <Pressable style={globalStyles.modalBackground} onPressIn={() => dispatch(closeModal())}/>       
                <View style={[globalStyles.modalView, globalStyles.modalShadow, { height: GlobalConstants.height * 0.6 + ((props.player.status !== 'a') ? 40 : 0), 
                                                                                  width: GlobalConstants.width* 0.8, padding: 15 }]}>
                    <CloseButton closeFunction={() => dispatch(closeModal())}/> 
                    { playerData.isSuccess && 
                        <View style={{flex: 1}}>
                            <View style={{flex: 10}}>

                                <View style={styles.header}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={styles.titleText}>{props.player.web_name}</Text>
                                        <View style={{flex: 1, alignContent: 'flex-end', justifyContent: 'flex-end'}}>
                                            <Text style={[styles.text, {alignSelf: 'flex-end', marginBottom: 1}]}>Form: {props.player.form}</Text>
                                        </View>
                                        
                                    </View>
                                    <View style={{flexDirection: 'row', paddingTop: 3}}>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={[styles.text, {fontWeight: 'bold'}]}>{props.overview.teams.find(team => team.code === props.player.team_code)?.short_name}  </Text>
                                            <Text style={styles.text}>{props.overview.element_types.find(element => element.id === props.player.element_type)?.singular_name_short}  </Text>
                                            <Text style={styles.text}>£{(props.player.now_cost / 10).toFixed(1)}  </Text>
                                        </View>

                                        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                                            <Text style={styles.text}>Sel. {props.player.selected_by_percent}%</Text>
                                        </View>                                    
                                    </View>
                                    { (props.player.status !== 'a') && 
                                        <View style={{ flexDirection: 'row', height: 30, marginTop: 10, backgroundColor: GlobalConstants.secondaryColor}}>
                                            <View style={{height: '90%', aspectRatio: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 3, marginRight: 3}}>
                                                <Image style={{height: '100%', width: '100%', alignSelf: 'center', marginBottom: -2}} source={(props.player.status === 'd') ? Icons['doubtful'] : Icons['out']} resizeMode="contain"/>
                                            </View>
                                            <View style={{flex: 1, justifyContent: 'center'}}> 
                                                <Text style={[styles.text, { flexWrap: 'wrap'}]}>{props.player.news}</Text>
                                            </View>
                                        </View>
                                    }
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
                                        
                                            {isStatsViewShowing && 
                                                <CustomButton image={'filter'} buttonFunction={() => setIsFilterModalVisible(true)}/>                            
                                            }
                                    </View>
                                    
                                </View>


                                { isStatsViewShowing ?
                                <View style={{flex: 1, paddingTop: 10, paddingLeft: 5, paddingRight: 5, paddingBottom: 5, zIndex: -1}}>
                                    <View style={[styles.sectionBorder, {flex: 3, flexDirection: 'row'}]}>
                                        <Text style={styles.sectionHeaderText}>
                                            {statsFilterState.isPer90 ? " Per 90 " : " Totals "}
                                        </Text>

                                        <Text style={{
                                              backgroundColor: GlobalConstants.primaryColor,
                                              fontSize: GlobalConstants.largeFont,
                                              fontWeight: 'bold',
                                              color: GlobalConstants.textPrimaryColor,
                                              position: 'absolute',
                                              top: -20, right: 15,
                                              padding: 5}}>
                                            {statsFilterState.isPer90 ? " " + (playerFilteredStats.total_points * 90 / playerFilteredStats.minutes).toFixed(2) + "pts " : " " + playerFilteredStats.total_points + "pts "}
                                        </Text>

                                        <View style={{flex: 3, margin: 5}}>
                                            <View style={{flex: 2, margin: 5}}>
                                                <PieChart firstStatName="G" secondStatName="A" 
                                                    firstStatColor={'white'} secondStatColor={GlobalConstants.lightColor} 
                                                    firstStatValue={parseFloat(statsFilterState.isPer90 ? (playerFilteredStats.goals_scored / playerFilteredStats.minutes * 90).toFixed(2) : playerFilteredStats.goals_scored.toString())} 
                                                    secondStatValue={parseFloat(statsFilterState.isPer90 ? (playerFilteredStats.assists / playerFilteredStats.minutes * 90).toFixed(2) : playerFilteredStats.assists.toString())}/>
                                            </View>
                                            
                                        </View>
                                        <View style={{flex: 3, marginTop: 15, marginRight: 15, marginBottom: 15}}>
                                            {rightStatText("Bonus", parseFloat(statsFilterState.isPer90 ? (playerFilteredStats.bonus / playerFilteredStats.minutes * 90).toFixed(2) : playerFilteredStats.bonus.toString()))}
                                            {rightStatText("BPS", parseFloat(statsFilterState.isPer90 ? (playerFilteredStats.bps / playerFilteredStats.minutes * 90).toFixed(2) : playerFilteredStats.bps.toString()))}
                                            {rightStatText("Clean Sheets", parseFloat(statsFilterState.isPer90 ? (playerFilteredStats.clean_sheets / playerFilteredStats.minutes * 90).toFixed(2) : playerFilteredStats.clean_sheets.toString()))}
                                            {rightStatText("Saves", parseFloat(statsFilterState.isPer90 ? (playerFilteredStats.saves / playerFilteredStats.minutes * 90).toFixed(2) : playerFilteredStats.saves.toString()))}
                                            {rightStatText("Influence", parseFloat(statsFilterState.isPer90 ? (playerFilteredStats.influence / playerFilteredStats.minutes * 90).toFixed(2) : playerFilteredStats.influence.toFixed(2)))}
                                            {rightStatText("Creativity", parseFloat(statsFilterState.isPer90 ? (playerFilteredStats.creativity / playerFilteredStats.minutes * 90).toFixed(2) : playerFilteredStats.creativity.toFixed(2)))}
                                            {rightStatText("Threat", parseFloat(statsFilterState.isPer90 ? (playerFilteredStats.threat / playerFilteredStats.minutes * 90).toFixed(2) : playerFilteredStats.threat.toFixed(2)))}
                                        </View>
                                        
                                    </View>

                                    <View style={[styles.sectionBorder, {flex: 1, marginTop: 20, padding: 5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}]}>
                                        <Text style={styles.sectionHeaderText}>
                                            GW {currentGameweek} 
                                        </Text>
                                        
                                        {statText("Points", props.player.event_points, 2)}
                                        {statText("xPoints", props.player.ep_this, 2)}
                                        {statText("Transfers In", props.player.transfers_in_event, 3)}
                                        {statText("Transfers Out", props.player.transfers_out_event, 3)}
                                        
                                    </View>
                                </View> :
                                <View style={{flex: 1, paddingBottom: 5, marginBottom: 5, backgroundColor: GlobalConstants.secondaryColor, paddingLeft: 5, paddingRight: 5}}>
                                    <ScrollView horizontal={true}>
                                        <FlatList style={{flex: 1}} contentContainerStyle={{justifyContent: 'center'}} data={playerData.data.history}
                                                ListHeaderComponent={renderHistoryItem}
                                                keyExtractor={historyItemKeyExtractor}
                                                renderItem={(item) => {
                                                   return (<View style={{flex: 1, flexDirection: 'row', alignItems: 'center', 
                                                                         justifyContent: 'center', paddingBottom: 5, paddingTop: 5,
                                                                         borderBottomColor: GlobalConstants.aLittleLighterColor, borderBottomWidth: 1,}}>
                                                        { statNames.map((stat) => {
                                                           return (
                                                            <View key={stat} style={styles.tableTextContainer}>
                                                                {(stat !== 'opponent_team') ? 
                                                                    <Text style={[styles.headerText]}>{ item.item[stat as keyof History] }</Text>
                                                                    :
                                                                    <Text style={[styles.headerText]}>{ props.overview.teams.find(team => team.id === item.item[stat as keyof History])?.short_name }</Text>
                                                                }
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
                                                                <Text  style={[styles.headerText]}>{ props.player[stat as keyof PlayerOverview] }</Text>
                                                            </View>
                                                            )
                                                        })}
                                                    </View>
                                                }/>
                                    </ScrollView>
                                </View>
                                }

                            </View>

                            <View style={{flex: 1, paddingTop: 10, zIndex: -1}}>
                                <FixtureDifficultyList isFullList={true} overview={props.overview} fixtures={props.fixtures} currentGameweek={currentGameweek} team={props.player.team}/>
                            </View>
                        </View>
                    }
                    <ToolTip distanceFromRight={GlobalConstants.width* 0.8 * 0.055} distanceForArrowFromRight={18}
                             distanceFromTop={GlobalConstants.height * 0.6 * 0.30}
                             isVisible={isFilterModalVisible} 
                             setIsVisible={setIsFilterModalVisible}
                        view={<View style={{ width: GlobalConstants.width * 0.45, marginLeft: 10, marginRight: 10, marginBottom: 5, marginTop: 10 }}>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                <Text style={[styles.text, { flex: 1 }]}>Per 90 Stats?</Text>
                                <Checkbox value={statsFilterState.isPer90}
                                    color={statsFilterState.isPer90 ? GlobalConstants.fieldColor : GlobalConstants.primaryColor}
                                    onValueChange={() => statsFilterDispatch({ type: StatsFilterActionKind.ChangeIsPer90 })} />
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[styles.text, { flex: 1 }]}>Game span</Text>
                                    <Text style={styles.text}>{statsFilterState.gameSpan}</Text>
                                </View>

                                <Slider value={statsFilterState.gameSpan ? statsFilterState.gameSpan : 0}
                                    onValueChange={value => statsFilterDispatch({ type: StatsFilterActionKind.ChangeGameSpan, value: value as number })}
                                    minimumValue={1}
                                    maximumValue={currentGameweek}
                                    step={1}
                                    thumbTintColor={GlobalConstants.primaryColor}
                                    maximumTrackTintColor={'white'}
                                    minimumTrackTintColor={GlobalConstants.primaryColor} />
                            </View>
                        </View>}/>
                </View>
            </Modal>
        }
        </>
    )
}

const shortFormStatNames = ['GW', 'OPP', 'PTS', 'MP', 'GS', 'A', 'CS', 'OG',  'PS', 'PM', 'YC', 'RC', 'S', 'B', 'BPS'];
const statNames = ['round', 'opponent_team', 'total_points', 'minutes', 'goals_scored', 'assists', 'clean_sheets', 'own_goals', 'penalties_saved', 'penalties_missed', 'yellow_cards', 'red_cards', 'saves', 'bonus', 'bps'];
const filteredStats = ['total_points', 'goals_scored', 'assists', 'bonus', 'bps', 'clean_sheets', 'saves', 'influence', 'creativity', 'threat', 'minutes'];

type FilteredStats = {
   total_points: number; 
   goals_scored: number;
   assists: number;
   bonus: number;
   bps: number;
   clean_sheets: number;
   saves: number;
   influence: number;
   creativity: number;
   threat: number;
   minutes: number;
}

const initialFilteredStats : FilteredStats = {
    total_points: 0,
    goals_scored: 0,
    assists: 0,
    bonus: 0,
    bps: 0,
    clean_sheets: 0,
    saves: 0,
    influence: 0,
    creativity: 0,
    threat: 0,
    minutes: 0,
}

const statText = (stat: string, value: number | string, flexValue: number) => {
    return (
    <View style={{flex: flexValue}}>
        <Text style={styles.gameweekSectionText}>{stat}</Text>
        <Text style={styles.gameweekSectionText}>{value}</Text>
    </View>)
}

const rightStatText = (stat: string, value: number | string) => {
    return (
        <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={styles.gameweekSectionText}>{stat}</Text>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={[styles.gameweekSectionText, {alignSelf: 'flex-end'}]}>{value}</Text>
            </View>
        </View>
    )
}

export default PlayerDetailedStatsModal;