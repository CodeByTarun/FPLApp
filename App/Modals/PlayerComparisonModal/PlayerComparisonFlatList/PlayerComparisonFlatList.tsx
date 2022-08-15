import { animated, config, useSpring } from "@react-spring/native";
import React, { useCallback, useMemo, useState } from "react";
import { LayoutChangeEvent, ScrollView, Text, View, Image } from "react-native";
import { moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { AnimatedButton } from "../../../Features/Controls";
import FixtureDifficultyList from "../../../Features/PlayerStats/PlayerList/FixtureDifficultyList";
import { Seperator } from "../../../Global/GlobalComponents";
import { height, PlayerComparisonLimit, textSecondaryColor } from "../../../Global/GlobalConstants";
import { Icons } from "../../../Global/Images";
import { FplFixture } from "../../../Models/FplFixtures";
import { FplOverview, PlayerOverview } from "../../../Models/FplOverview";
import { useAppSelector } from "../../../Store/hooks";
import { StatsFilterState } from "../../PlayerDetailedStatsModal/StatsFilterReducer";
import { CombinedPlayerData } from "../PlayerComparisonModal";
import { styles } from "./PlayerComparistonFlatListStyle";
import StatColumn from "./StatColumn";

const AnimatedView = animated(View);

const stats: {[key: string] : string } = {
    'total_points' : 'PTS',
    'minutes' : 'MP',
    'goals_scored' : 'GS',
    'assists' : 'A',
    'clean_sheets' : 'CS',
    'own_goals' : 'OG',
    'penalties_saved' : 'PS',
    'penalties_missed' : 'PM',
    'yellow_cards' : 'YC',
    'red_cards' : 'RC',
    'saves' : 'S',
    'bonus' : 'B',
    'bps' : 'BPS',
    'influence' : 'I', //these four are strings
    'creativity' : 'C',
    'threat' : 'T',
    'ict_index' : 'ICT',
}

const gameweekStats: {[key: string] : string } = {
    'selected_by_percent' : 'Sel. %', //string
    'form' : 'Form', //string
    'event_points' : 'Points', //number 
    'ep_this' : 'xPoints', //number
    'transfers_in_event' : 'Transfers In', //number
    'transfers_out_event' : 'Transfers Out', //number
}

interface PlayerComparisonViewProps {
    overview: FplOverview;
    fixtures: FplFixture[];
    viewIndex: number;
    statsFilterState: StatsFilterState;
    removePlayerFunction: (playerToRemove: PlayerOverview) => void;
    playerList: CombinedPlayerData[];
    isEditActive: boolean;
}

const PlayerComparisonFlatList = ({overview, fixtures, viewIndex, statsFilterState, removePlayerFunction, playerList, isEditActive} : PlayerComparisonViewProps) => {

    const liveGameweek = useAppSelector(state => state.team.liveGameweek);

    const [playerDataHeight, setPlayerDataHeight] = useState(0);

    const getPlayerDataHeight = useCallback((event: LayoutChangeEvent) => {
        var {height} = event.nativeEvent.layout;
        setPlayerDataHeight(height / PlayerComparisonLimit);
    }, []);

    const editViewSpring = useSpring({ opacity: isEditActive ? 1 : 0, buttonLeft: isEditActive ? 0 : -moderateVerticalScale(20) });

    const viewSpring = useSpring({ gameweekLeft: viewIndex === 0 ? '0%' : (viewIndex === 1 ? '-120%' : '-240%'),
                                   statView: viewIndex === 1 ? '0%' : (viewIndex === 0 ? '120%' : '-120%'),
                                   fixtureDifficultyView: viewIndex === 2 ? '0%' : (viewIndex === 0 ? '240%' : '120%'),
                                   });

    const playerMinutesArray = useMemo(() => {

        let minutesArray: number[] = [];

        if (statsFilterState.gameSpan[0] !== 1 || statsFilterState.gameSpan[1] !== liveGameweek) {
            minutesArray = playerList.map(player => player.playerSummary.history
                                     .filter(history => (history.round >= statsFilterState.gameSpan[0]) && (history.round <= statsFilterState.gameSpan[1]))
                                     .reduce((prev, curr) => prev + curr.minutes, 0)); 
        } else {
            minutesArray = playerList.map(player => player.playerOverview.minutes);
        }

        return minutesArray;

    }, [playerList, statsFilterState.gameSpan, statsFilterState.isPer90]);

    const PlayerInfoAndHeaders = useCallback((viewIndex: number) => {
        return (
            <View pointerEvents="box-none" style={{position: 'absolute', height: '100%', width: '100%'}}>
                <View pointerEvents="none" style={{opacity: 0}}>
                    { viewIndex !== 2 && 
                        <Text style={styles.headerText}/>
                    }
                </View>
                <View pointerEvents="box-none" onLayout={getPlayerDataHeight} style={[{flex: 1}, viewIndex !== 2 && {borderTopColor: textSecondaryColor, borderTopWidth: 1}]}>
                    { playerList.map( player => 
                    <View pointerEvents="box-none" style={{height: '20%', width: '100%'}} key={player.playerOverview.id}>
                        <View pointerEvents="box-none" style={{flexDirection: 'row',width: '100%', marginTop: moderateVerticalScale(3)}}>
                            <AnimatedView style={{flexDirection: 'row', left: editViewSpring.buttonLeft }}>
                                <AnimatedButton key={player.playerOverview.id.toString()} buttonFn={() => removePlayerFunction(player.playerOverview)}>
                                    <AnimatedView style={{height: moderateVerticalScale(20) , width: moderateVerticalScale(20), opacity: editViewSpring.opacity, justifyContent: 'center', alignItems: 'center'}}>
                                        <Image source={Icons['close']} style={{height: '60%', width: '60%'}} resizeMode='contain'/>
                                    </AnimatedView>
                                </AnimatedButton>
                                <Text style={[styles.playerHeaderText, {fontWeight: 'bold'}]}>{player.playerOverview.web_name}  </Text>
                            </AnimatedView>
                            <View pointerEvents="none" style={{flexDirection: 'row', flex: 1, justifyContent: 'flex-end'}}>
                                <Text style={styles.playerHeaderText}>{overview.element_types.find(element => element.id === player.playerOverview.element_type)?.singular_name_short}</Text>
                                <Text style={[styles.playerHeaderText, {fontWeight: 'bold'}]}>{overview.teams.find(team => team.code === player.playerOverview.team_code)?.short_name}</Text>
                                <Text style={styles.playerHeaderText}>£{(player.playerOverview.now_cost / 10).toFixed(1)}</Text>
                            </View>
    
                        </View>
                        <View pointerEvents="none" style={{flex: 1}}/>
                        <Seperator/>
    
                    </View>    
                    ) }
                </View>
            </View>
        )
    }, [playerList])

    return (

        <View style={styles.container}>

            <View style={styles.dataContainer}>
                <AnimatedView style={{height: '100%', position: 'absolute', left: viewSpring.gameweekLeft, width: '100%'}}>
                    <ScrollView horizontal>

                            { 
                                Object.keys(gameweekStats).map(key => <StatColumn key={key} header={gameweekStats[key]} statName={key} statsFilterState={statsFilterState} viewIndex={viewIndex}
                                                                                playerList={playerList} playerDataHeight={playerDataHeight} playerMinutesArray={playerMinutesArray}/>)
                            }

                    </ScrollView>
                    { PlayerInfoAndHeaders(0) }       
                </AnimatedView>                 

                <AnimatedView style={{height: '100%', position: 'absolute', left: viewSpring.statView, width: '100%'}}>
                    <ScrollView horizontal>
                            {  
                                Object.keys(stats).map(key => <StatColumn key={key} header={stats[key]} statName={key} statsFilterState={statsFilterState} viewIndex={viewIndex}
                                                                        playerList={playerList} playerDataHeight={playerDataHeight} playerMinutesArray={playerMinutesArray}/>)
                            }
                    </ScrollView>
                    { PlayerInfoAndHeaders(1) }                        
                </AnimatedView>

                <AnimatedView style={{height: '100%', position: 'absolute', left: viewSpring.fixtureDifficultyView, width: '100%'}}>
                    <ScrollView horizontal style={{flexDirection: 'row'}}>
                        <View>
                            { playerList.map(player => {

                                return (
                                    <View key={player.playerOverview.id.toString()} style={{height: playerDataHeight}}>
                                        <Text style={[styles.headerText, {}]}/>
                                        <View style={{flex:1, marginBottom: 7}}>
                                            <FixtureDifficultyList team={player.playerOverview.team} fixtures={fixtures} overview={overview} isFullList={true} liveGameweek={liveGameweek}/>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>
                    { PlayerInfoAndHeaders(2) }                        
                </AnimatedView>

            </View>
        </View>
    )
}

export default PlayerComparisonFlatList;

