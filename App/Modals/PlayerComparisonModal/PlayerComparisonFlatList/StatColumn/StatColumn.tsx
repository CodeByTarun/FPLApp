import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { PlayerOverview } from "../../../../Models/FplOverview";
import { useAppSelector } from "../../../../Store/hooks";
import { StatsFilterState } from "../../../PlayerDetailedStatsModal/StatsFilterReducer";
import { CombinedPlayerData } from "../../PlayerComparisonModal";
import {  History } from "../../../../Models/FplPlayerSummary";
import { StatColumnStyles } from "./StatColumnStyles";
import { moderateVerticalScale } from "react-native-size-matters";
import { useTheme } from "@react-navigation/native";

interface StatColumnProps {
    header: string;
    statName: string;
    playerList: CombinedPlayerData[];
    playerDataHeight: number;
    statsFilterState: StatsFilterState;
    playerMinutesArray: number[];
    viewIndex: number;
} 

const StatColumn = ({header, statName, playerList, playerDataHeight, statsFilterState, playerMinutesArray, viewIndex} : StatColumnProps) => {
    
    const theme = useTheme();
    const styles = StatColumnStyles(theme);

    const liveGameweek = useAppSelector(state => state.team.liveGameweek);

    const playersStatArray = useMemo(() => {

        let statArray: number[] = [];

        if (viewIndex === 1) {
            if (statsFilterState.gameSpan[0] !== 1 || statsFilterState.gameSpan[1] !== liveGameweek) {
                statArray = playerList.map(player => player.playerSummary.history
                                        .filter(history => (history.round >= statsFilterState.gameSpan[0]) && (history.round <= statsFilterState.gameSpan[1]))
                                        .reduce((prev, curr) => prev + (Number(curr[statName as keyof History])), 0)); 
            } else {
                statArray = playerList.map(player => Number(player.playerOverview[statName as keyof PlayerOverview]));
            }

            if (statsFilterState.isPer90) {
                statArray = statArray.map((statValue, index) => Math.round(statValue / playerMinutesArray[index] * 90 * 100) / 100);
            }
        }

        else {
            statArray = playerList.map(player => Number(player.playerOverview[statName as keyof PlayerOverview]));    
        }

        return statArray;

    }, [playerList, statsFilterState.gameSpan, statsFilterState.isPer90]);

    const maxValue = Math.max(...playersStatArray);
    const minValue = Math.min(...playersStatArray);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{ header }</Text>
            <View style={{flex: 1}}>
                { playerList.map( (player, index) => {

                    return (
                        <View key={player.playerOverview.id.toString()} style={{height: playerDataHeight, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}>
                            <Text style={[styles.headerText, {opacity: 0, marginTop: moderateVerticalScale(3)}]}/>
                            <Text style={[styles.valueText, playersStatArray[index] === minValue && styles.redText, playersStatArray[index] === maxValue && styles.greenText]}>
                                { playersStatArray[index] ? playersStatArray[index] : 0 }
                            </Text>
                        </View> 
                    ) 
            })}
            </View>
        </View>
    )

}

export default StatColumn;
