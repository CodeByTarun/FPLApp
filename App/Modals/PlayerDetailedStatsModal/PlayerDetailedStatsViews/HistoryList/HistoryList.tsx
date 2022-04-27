import React, { useCallback, useEffect, useRef } from "react";
import { View, ScrollView, FlatList, Text, TouchableWithoutFeedback } from "react-native";
import globalStyles from "../../../../Global/GlobalStyles";
import { FplOverview, PlayerOverview } from "../../../../Models/FplOverview";
import { FplPlayerSummary, History } from "../../../../Models/FplPlayerSummary";
import { styles } from "./HistoryListStyles";

const stats: {[key: string] : string } = {
    'round' : 'GW',
    'opponent_team' : 'OPP',
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
}

interface HistoryProps {
    overview: FplOverview;
    player: PlayerOverview;
    playerData: FplPlayerSummary;
}

const HistoryHeader = (playerHistory : History[]) => {
    return (
        <View style={styles.headerContainer}>
            { Object.values(stats).map((stat) => {
                return (
                    <View key={stat} style={styles.tableTextContainer}>
                        <Text key={stat} style={[[styles.headerText, {fontWeight: '700'}]]}>{ stat }</Text>
                    </View>
                )})}
        </View>
    )
}

const HistoryFooter = (player: PlayerOverview) => {
    return (
        <View style={styles.footerContainer}>
            { Object.keys(stats).map((stat) => {
                return (
                <View testID="historyFooterItem" key={stat} style={styles.tableTextContainer}>
                    <Text  style={[styles.headerText]}>{ player[stat as keyof PlayerOverview] }</Text>
                </View>
                )
            })}
        </View>
    )
}

const HistoryList = ({overview, player, playerData} : HistoryProps) => {

    const scrollViewRef = useRef<ScrollView>(null);
    
    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({animated: false});
    }, [])

    const historyItemRender = useCallback((game: History) => {
        return (
            <View key={game.fixture.toString()} testID="historyListItem" style={styles.historyItemContainer}>
                { Object.keys(stats).map((stat) => {
                    return (
                    <View key={stat} style={styles.tableTextContainer}>
                        {(stat !== 'opponent_team') ? 
                            <Text style={[styles.headerText]}>{ game[stat as keyof History] }</Text>
                            :
                            <Text style={[styles.headerText]}>{ overview.teams.find(team => team.id === game[stat as keyof History])?.short_name }</Text>
                        }
                    </View>
                    )
                })}
            </View>
        )}, [overview])

    return (
        <View testID="playerDetailedStatsHistoryListView" style={[styles.container]}>
            <ScrollView style={{flex: 1}} testID="historyListScrollView" horizontal={true}>
                <View style={{flex: 1}} onStartShouldSetResponder={() => true}>
                    { HistoryHeader(playerData.history) }
                    <ScrollView ref={scrollViewRef} style={{flex: 1}}>
                        <View style={{flex: 1}} onStartShouldSetResponder={() => true}>
                            { playerData.history.map(game => 
                                historyItemRender(game)    
                            )}
                        </View>
                    </ScrollView>
                    { HistoryFooter(player) }
                </View>
            </ScrollView>
        </View>
    )
}

export default HistoryList;