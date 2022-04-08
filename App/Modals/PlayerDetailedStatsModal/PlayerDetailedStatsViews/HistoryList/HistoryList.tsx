import React, { useCallback } from "react";
import { View, ScrollView, FlatList, Text } from "react-native";
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

    const historyHeader = useCallback(({item}: {item: History}) => {
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

    const historyItemKeyExtractor = useCallback((history: History) => history.fixture.toString(), []);
    
    const historyItemRender = useCallback(({item} : {item: History}) => {
        return (
            <View style={styles.historyItemContainer}>
                { Object.keys(stats).map((stat) => {
                    return (
                    <View key={stat} style={styles.tableTextContainer}>
                        {(stat !== 'opponent_team') ? 
                            <Text style={[styles.headerText]}>{ item[stat as keyof History] }</Text>
                            :
                            <Text style={[styles.headerText]}>{ overview.teams.find(team => team.id === item[stat as keyof History])?.short_name }</Text>
                        }
                    </View>
                    )
                })}
            </View>
        )}, [overview])

    const historyFooter = useCallback(() => {
        return (
            <View style={styles.footerContainer}>
                { Object.keys(stats).map((stat) => {
                    return (
                    <View key={stat} style={styles.tableTextContainer}>
                        <Text  style={[styles.headerText]}>{ player[stat as keyof PlayerOverview] }</Text>
                    </View>
                    )
                })}
            </View>
        )
    }, [player])

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true}>
                <FlatList style={{flex: 1}} contentContainerStyle={{justifyContent: 'center'}} data={playerData.history}
                        ListHeaderComponent={historyHeader}
                        keyExtractor={historyItemKeyExtractor}
                        renderItem={historyItemRender}
                        stickyHeaderIndices={[0]}
                        ListFooterComponent={historyFooter}/>
            </ScrollView>
        </View>
    )
}

export default HistoryList;