import React, { useCallback, useMemo } from "react";
import { View, Text } from "react-native";
import { PieChart } from "../../../../Features/Controls";
import { lightColor } from "../../../../Global/GlobalConstants";
import { PlayerOverview } from "../../../../Models/FplOverview";
import { FplPlayerSummary, History } from "../../../../Models/FplPlayerSummary";
import { StatsFilterState } from "../../StatsFilterReducer";
import { styles } from "./StatsStyles";

const PlayerDetailedStatsRightSide: {[key: string]: string } = {
    "bonus": "Bonus",
    "bps": "BPS",
    "clean_sheets": "Clean Sheets",
    "saves": "Saves",
    "influence": "Influence",
    "creativity": "Creativity",
    "threat": "Threat",
}

const PlayerDetailedStatsBottom: {[key: string]: [string, number]} = {
    "event_points": ["Points", 2],
    "ep_this": ["xPoints", 2],
    "transfers_in_event": ["Transfers In", 3],
    "transfers_out_event": ["Transfers Out", 3],
}

interface StatsProps {
    statsFilterState: StatsFilterState;
    player: PlayerOverview;
    playerData: FplPlayerSummary;
    currentGameweek: number;
}

const Stats = ({statsFilterState, player, playerData, currentGameweek} : StatsProps) => {

    const getMinutes = useCallback(() => {
        if (playerData && statsFilterState.gameSpan) {
            return playerData.history.filter(history => (history.round >= statsFilterState.gameSpan[0]) && (history.round <= statsFilterState.gameSpan[1]))
                                     .reduce((prev, curr) => prev + curr.minutes, 0); 
        } else {
            return player.minutes;
        }
    }, [statsFilterState.isPer90, statsFilterState.gameSpan, player, playerData])

    const minutesValue = useMemo(() => getMinutes(), [player, playerData, statsFilterState.gameSpan, statsFilterState.isPer90])

    const getStatValue = useCallback((stat: string): string => {

        let statValue: number;

        if (playerData && statsFilterState.gameSpan) {
            statValue = playerData.history.filter(history => (history.round >= statsFilterState.gameSpan[0]) && (history.round <= statsFilterState.gameSpan[1]))
                                          .reduce((prev, curr) => prev + (Number(curr[stat as keyof History])), 0) 
        } else {
            statValue = Number(player[stat as keyof PlayerOverview]);
        }

        return ((Math.round((statsFilterState.isPer90 ? (statValue / minutesValue * 90) : statValue) * 100)) / 100).toString();

    }, [statsFilterState.isPer90, statsFilterState.gameSpan, player, playerData]);

    return (
        <View style={styles.container}>
            <View style={[styles.sectionBorder, styles.topSection]}>
                <Text style={styles.sectionHeaderText}>
                    {statsFilterState.isPer90 ? " Per 90 " : " Totals "}
                </Text>

                <Text style={styles.pointsHeaderText}>
                    {getStatValue('total_points') + "pts "}
                </Text>

                <View style={styles.pieChartContainer}>
                        <PieChart firstStatName="G" secondStatName="A" 
                            firstStatColor={'white'} secondStatColor={lightColor} 
                            firstStatValue={Number(getStatValue('goals_scored'))} 
                            secondStatValue={Number(getStatValue('assists'))}/>                    
                </View>
                <View style={styles.rightSideStatsContainer}>
                    {Object.keys(PlayerDetailedStatsRightSide).map((key) => {
                        return (
                            <View key={key} style={{flex: 1, flexDirection: 'row'}}>
                                <Text style={styles.gameweekSectionText}>{PlayerDetailedStatsRightSide[key]}</Text>
                                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                    <Text style={[styles.gameweekSectionText, {alignSelf: 'flex-end'}]}>{getStatValue(key)}</Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
                
            </View>

            <View style={[styles.sectionBorder, styles.bottomSection]}>
                <Text style={styles.sectionHeaderText}>
                    GW {currentGameweek} 
                </Text>

                {Object.keys(PlayerDetailedStatsBottom).map((key) => {
                    return (
                        <View key={key} style={{flex: PlayerDetailedStatsBottom[key][1]}}>
                            <Text style={styles.gameweekSectionText}>{PlayerDetailedStatsBottom[key][0]}</Text>
                            <Text style={styles.gameweekSectionText}>{player[key as keyof PlayerOverview]}</Text>
                        </View>
                    )
                })}

            </View>
        </View>
    )
}

export default Stats;