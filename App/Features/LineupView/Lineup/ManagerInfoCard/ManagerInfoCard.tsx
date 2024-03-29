import { useTheme } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { lightColor, textPrimaryColor } from "../../../../Global/GlobalConstants";
import globalStyles from "../../../../Global/GlobalStyles";
import { GetTeamTotalExpectedPoints, GetTeamTotalPoints } from "../../../../Helpers/FplAPIHelpers";
import { PlayerData } from "../../../../Models/CombinedData";
import { FplDraftUserInfo } from "../../../../Models/FplDraftUserInfo";
import { FplManagerGameweekPicks } from "../../../../Models/FplManagerGameweekPicks";
import { FplManagerInfo } from "../../../../Models/FplManagerInfo";
import { BudgetInfo, DraftInfo, TeamTypes } from "../../../../Store/teamSlice";
import { ManagerInfoCardStyles } from "./ManagerInfoCardStyles";

interface statInfo {
    title: string,
    value: string | number | undefined,
    stat: string,
    index: number,
}

interface ManagerInfoCardProps {
    teamInfo: DraftInfo | BudgetInfo,
    players : PlayerData[],
    budgetManagerInfo? : FplManagerInfo,
    budgetGameweekPicks? : FplManagerGameweekPicks,
    draftManagerInfo? : FplDraftUserInfo,
}

const ManagerInfoCard = ({teamInfo, players, budgetManagerInfo, budgetGameweekPicks, draftManagerInfo}: ManagerInfoCardProps) => {

    const theme = useTheme();
    const styles = ManagerInfoCardStyles(theme);

    const [stat, setStat] = useState({title: "Gameweek", 
                                      value: (teamInfo.teamType === TeamTypes.Budget) ? GetTeamTotalPoints(teamInfo, players, budgetGameweekPicks) : GetTeamTotalPoints(teamInfo, players) , 
                                      stat: 'Points',
                                      index: 1 } as statInfo);

    useEffect(function setGameweekPointsWhenGameweekChanged() {
            setStat({title: "Gameweek", 
                    value: (teamInfo.teamType === TeamTypes.Budget) ? GetTeamTotalPoints(teamInfo, players, budgetGameweekPicks) : GetTeamTotalPoints(teamInfo, players) , 
                    stat: 'Points',
                    index: 1});
    }, [players]);

    const changingBudgetStat = useCallback(() => {

        if (stat.index === 1) {
            setStat({
                title: "Gameweek",
                value: GetTeamTotalExpectedPoints(teamInfo, players, budgetGameweekPicks),
                stat: 'xPoints',
                index: 2,
            })
        }
        else if (stat.index === 2) {
            setStat({
                title: "Gameweek",
                value: budgetManagerInfo?.summary_event_rank,
                stat: 'Rank',
                index: 3,
            })
        }
        else if (stat.index === 3) {
            setStat({
                title: "Gameweek",
                value: budgetGameweekPicks?.entry_history["event_transfers"],
                stat: 'Transactions',
                index: 4,
            })
        }
        else if (stat.index === 4) {
            setStat({
                title: "Overall",
                value: budgetManagerInfo?.summary_overall_points,
                stat: 'Points',
                index: 5,
            })
        }
        else if (stat.index === 5) {
            setStat({
                title: "Overall",
                value: budgetManagerInfo?.summary_overall_rank,
                stat: 'Rank',
                index: 6,
            })
        }
        else if (stat.index === 6) {
            setStat({
                title: "Overall",
                value: budgetManagerInfo?.last_deadline_total_transfers,
                stat: 'Transactions',
                index: 7,
            })
        } 
        else if (stat.index === 7) {

            let value = budgetManagerInfo?.last_deadline_value;
            let bank = budgetManagerInfo?.last_deadline_bank;

            setStat({
                title: "Squad Value",
                value: `£${value ? (value / 10).toFixed(1) : 0.0}` ,
                stat: `Bank: £${bank ? (bank / 10).toFixed(1) : 0.0}`,
                index: 8, 
            })
        }
        else {
            setStat({
                title: "Gameweek",
                value: GetTeamTotalPoints(teamInfo, players, budgetGameweekPicks),
                stat: 'Points',
                index: 1,
            })
        }
    }, [stat, teamInfo.gameweek, teamInfo.info.id])

    const changingDraftStat = useCallback(() => {
        if (stat.stat === 'Points') {
            setStat({title: stat.title, 
                     value: (stat.title === "Overall") ? draftManagerInfo?.entry.transactions_total : GetTeamTotalExpectedPoints(teamInfo, players), 
                     stat: (stat.title === "Overall") ? 'Transactions' : 'xPoints',
                     index: (stat.title === "Overall") ? 5 : 2})
        }
        else if(stat.stat === 'xPoints') {
            setStat({
                title: stat.title,
                value: draftManagerInfo?.entry.transactions_event,
                stat: 'Transactions',
                index: 3,
            })
        }
        else {
            setStat({title: (stat.title === "Overall") ? "Gameweek" : "Overall", 
                     value: (stat.title === "Overall") ? GetTeamTotalPoints(teamInfo, players) : draftManagerInfo?.entry.overall_points, 
                     stat: 'Points',
                     index: (stat.title === "Overall") ? 1 : 4})
        }
    }, [stat, teamInfo.gameweek, teamInfo.info.id])

    return (
        <Pressable testID="managerCardButton" style={[styles.container, globalStyles.tabShadow]} disabled={(teamInfo.gameweek !== teamInfo.liveGameweek)} onPress={(teamInfo.teamType === TeamTypes.Budget) ? changingBudgetStat : changingDraftStat}>
            {((((teamInfo.teamType === TeamTypes.Budget) && budgetManagerInfo) || ((teamInfo.teamType === TeamTypes.Draft) && draftManagerInfo)) && players) &&
            <>
                <View style={styles.titleContainter}>
                    <Text style={styles.text}>{stat.title}</Text>
                </View>
                <View style={styles.middleTextContainter}>
                    <Text numberOfLines={1} adjustsFontSizeToFit style={stat.stat === 'Rank' ? styles.rankText : styles.statText}>{stat.value}</Text>
                </View>
                <View style={styles.categoryContainer}>
                    <Text numberOfLines={1} style={styles.text}>{stat.stat}</Text>
                </View>
                {(teamInfo.gameweek === teamInfo.liveGameweek) &&
                    <View style={styles.dotsContainer}>  
                        { [1,2,3,4,5].map(index => {
                            return (
                                <View testID="managerCardDots" key={index} style={[globalStyles.dots, {backgroundColor: stat.index === index ? textPrimaryColor : theme.colors.border}]}/>
                            )
                        }) }
                        {(teamInfo.teamType === TeamTypes.Budget) &&
                            <>  
                                { [6,7,8].map(index => {
                                    return (
                                        <View testID="managerCardDots" key={index} style={[globalStyles.dots, {backgroundColor: stat.index === index ? textPrimaryColor : theme.colors.border}]}/>
                                    )
                                }) }
                            </>
                        }                        
                    </View>
                }
            </>
            }
        </Pressable>
    )
}

export default ManagerInfoCard;

