import React, { useCallback, useMemo } from "react";
import { View, ScrollView, Text } from "react-native";
import { CustomButton } from "../../../Features/Controls";
import FixtureDifficultyList from "../../../Features/PlayerStats/PlayerList/FixtureDifficultyList";
import { primaryColor } from "../../../Global/GlobalConstants";
import { FplFixture } from "../../../Models/FplFixtures";
import { FplOverview, PlayerOverview } from "../../../Models/FplOverview";
import { FplPlayerSummary, History } from "../../../Models/FplPlayerSummary";
import { useAppSelector } from "../../../Store/hooks";
import { StatsFilterState } from "../../PlayerDetailedStatsModal/StatsFilterReducer";
import { CombinedPlayerData } from "../PlayerComparisonModal";
import { styles } from "./PlayerComparisonViewStyles";

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
    'influence' : 'I',
    'creativity' : 'C',
    'threat' : 'T',
    'ict_index' : 'ICT',
}

interface PlayerComparisonViewProps {
    overview: FplOverview;
    fixtures: FplFixture[];
    playerOverview: PlayerOverview;
    playerSummary: FplPlayerSummary;
    viewIndex: number;
    statsFilterState: StatsFilterState;
    removePlayerFunction: (playerToRemove: PlayerOverview) => void;
    playerList: CombinedPlayerData[];
}

const PlayerComparisonView = ({overview, fixtures, playerOverview, playerSummary, viewIndex, statsFilterState, removePlayerFunction, playerList} : PlayerComparisonViewProps) => {

    const liveGameweek = useAppSelector(state => state.team.liveGameweek);

    const getMinutes = useCallback(() => {
        if (playerSummary && statsFilterState.gameSpan) {
            return playerSummary.history.filter(history => (history.round >= statsFilterState.gameSpan[0]) && (history.round <= statsFilterState.gameSpan[1]))
                                        .reduce((prev, curr) => prev + curr.minutes, 0); 
        } else {
            return playerOverview.minutes;
        }
    }, [statsFilterState.isPer90, statsFilterState.gameSpan, playerOverview, playerSummary])

    const minutesValue = useMemo(() => getMinutes(), [playerOverview, playerSummary, statsFilterState.gameSpan, statsFilterState.isPer90])

    const getStatValue = useCallback((stat: string): string => {

        let statValue: number;

        if (playerSummary && statsFilterState.gameSpan) {
            statValue = playerSummary.history.filter(history => (history.round >= statsFilterState.gameSpan[0]) && (history.round <= statsFilterState.gameSpan[1]))
                                          .reduce((prev, curr) => prev + (Number(curr[stat as keyof History])), 0) 
        } else {
            statValue = Number(playerOverview[stat as keyof PlayerOverview]);
        }

        if (minutesValue === 0) return '0';

        return ((Math.round((statsFilterState.isPer90 ? (statValue / minutesValue * 90) : statValue) * 100)) / 100).toString();

    }, [statsFilterState.isPer90, statsFilterState.gameSpan, playerOverview, playerSummary]);

    const StatView = (statName: string, statValue: number | string | boolean | null) => {

        let statValueToShow = statValue;

        if (viewIndex === 1) {
            statValueToShow = getStatValue(statValue as string);
        }

        return (
            <View key={statName} style={styles.statViewContainer}>
                <Text style={styles.statNameText}>{statName}</Text>
                <Text style={styles.statValueText}>{statValueToShow}</Text>
            </View>
        )
    }

    return (
        <View style={styles.sectionBorder}>
            { playerList.length > 1 &&
                <View style={styles.closeButtonContainer}>
                    <CustomButton image={"close"} buttonFunction={() => removePlayerFunction(playerOverview)}/>
                </View>
            }
            <Text numberOfLines={1} style={styles.sectionNameText}>{playerOverview.web_name}</Text>
            <Text style={styles.sectionCostText}>£{(playerOverview.now_cost / 10).toFixed(1)}</Text>
            <View onStartShouldSetResponder={() => true}>
            {(viewIndex === 0 ?
                <ScrollView horizontal>
                    <View style={{flexDirection: 'row'}} onStartShouldSetResponder={() => true}>
                        {StatView('Form', playerOverview.form)}
                        {StatView('Sel.', playerOverview.selected_by_percent + '%')}
                        {StatView('Points', playerOverview.event_points)}
                        {StatView('xPoints', playerOverview.ep_this)}
                        {StatView('Transfers In', playerOverview.transfers_in_event)}
                        {StatView('Transfers Out', playerOverview.transfers_out_event)}
                    </View>
                </ScrollView> 
                :

                (viewIndex === 1) ?
                    <ScrollView horizontal>
                        <View style={{flexDirection: 'row'}} onStartShouldSetResponder={() => true}>
                            {Object.keys(stats).map(key => { return (
                                StatView(stats[key], key)
                            )})}
                        </View>
                    </ScrollView> 
                :
                <View style={{margin: 5, height: 40}} onStartShouldSetResponder={() => true}>
                    <FixtureDifficultyList team={playerOverview.team} fixtures={fixtures} overview={overview} isFullList={true} liveGameweek={liveGameweek}/>
                </View>
            )}
            </View>
        </View>
    )
}

export default PlayerComparisonView;