import React, { useCallback, useEffect, useRef, useState } from "react";
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

const HistoryList = ({overview, player, playerData} : HistoryProps) => {

    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsHidden(true), 500);
    });

    const historyItemRender = useCallback((history: History) => {
        return (
            <View key={history.fixture.toString()} testID="historyListItem" style={styles.historyItemContainer} onStartShouldSetResponder={() => true}>
                { Object.keys(stats).map((stat) => {
                    return (
                    <View key={stat} style={styles.tableTextContainer}>
                        {(stat !== 'opponent_team') ? 
                            <Text style={[styles.headerText]}>{ history[stat as keyof History] }</Text>
                            :
                            <Text style={[styles.headerText]}>{ overview.teams.find(team => team.id === history[stat as keyof History])?.short_name }</Text>
                        }
                    </View>
                    )
                })}
            </View>
        )}, [overview, player]);

    const HistoryHeader = useCallback(() => {
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
    }, []);

    const HistoryFooter = useCallback((player: PlayerOverview) => {
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
    }, []);

    return (
        <View testID="playerDetailedStatsHistoryListView" style={[styles.container]}>
            { isHidden &&
                <ScrollView style={{flex: 1}} testID="historyListScrollView" horizontal={true}>
                    <View style={{flex: 1}} onStartShouldSetResponder={() => true}>
                        { HistoryHeader() }
                        <ScrollView style={{flex: 1}}>
                        { playerData.history.map(history => {
                            return ( historyItemRender(history) )
                        })}
                        </ScrollView>
                        { HistoryFooter( player )}
                    </View>
                </ScrollView>}
        </View>
    )
}

export default React.memo(HistoryList);