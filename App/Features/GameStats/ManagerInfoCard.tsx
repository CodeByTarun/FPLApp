import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { cornerRadius, height, lightColor, primaryColor, smallFont, textPrimaryColor, textSecondaryColor } from "../../Global/GlobalConstants";
import { GetTeamTotalPoints } from "../../Helpers/FplAPIHelpers";
import { PlayerData } from "../../Models/CombinedData";
import { FplDraftUserInfo } from "../../Models/FplDraftUserInfo";
import { FplManagerGameweekPicks } from "../../Models/FplManagerGameweekPicks";
import { FplManagerInfo } from "../../Models/FplManagerInfo";
import { TeamInfo, TeamTypes } from "../../Store/teamSlice";

interface statInfo {
    title: string,
    value: string | number | undefined,
    stat: string,
    index: number,
}

interface ManagerInfoCardProps {
    teamInfo: TeamInfo,
    players : PlayerData[],
    budgetManagerInfo? : FplManagerInfo,
    budgetGameweekPicks? : FplManagerGameweekPicks,
    draftManagerInfo? : FplDraftUserInfo,
}

const ManagerInfoCard = ({teamInfo, players, budgetManagerInfo, budgetGameweekPicks, draftManagerInfo}: ManagerInfoCardProps) => {

    const [stat, setStat] = useState({title: "Gameweek", 
                           value: (teamInfo.teamType === TeamTypes.Budget) ? GetTeamTotalPoints(teamInfo, players, budgetGameweekPicks) : GetTeamTotalPoints(teamInfo, players) , 
                           stat: 'Points',
                           index: 1 } as statInfo);

    useEffect(() => {

        setStat({title: "Gameweek", 
                value: (teamInfo.teamType === TeamTypes.Budget) ? GetTeamTotalPoints(teamInfo, players, budgetGameweekPicks) : GetTeamTotalPoints(teamInfo, players) , 
                stat: 'Points',
                index: 1});
 
    }, [players])

    const changingBudgetStat = useCallback(() => {
        if (stat.stat === 'Points') {
            setStat({title: stat.title, 
                     value: (stat.title === "Overall") ? budgetManagerInfo?.summary_overall_rank : budgetManagerInfo?.summary_event_rank, 
                     stat: 'Rank',
                     index: (stat.title === "Overall") ? 5 : 2})
        }
        else if(stat.stat === 'Rank') {
            setStat({title: stat.title, 
                     value: (stat.title === "Overall") ? budgetManagerInfo?.last_deadline_total_transfers : budgetGameweekPicks?.entry_history["event_transfers"], 
                     stat: 'Transactions',
                     index: (stat.title === "Overall") ? 6 : 3})
        } 
        else {
            setStat({title: (stat.title === "Overall") ? "Gameweek" : "Overall", 
                     value: (stat.title === "Overall") ? GetTeamTotalPoints(teamInfo, players, budgetGameweekPicks) : budgetManagerInfo?.summary_overall_points, 
                     stat: 'Points',
                     index: (stat.title === "Overall") ? 1 : 4})
        }
    }, [stat, teamInfo.gameweek])

    const changingDraftStat = useCallback(() => {
        if (stat.stat === 'Points') {
            setStat({title: stat.title, 
                     value: (stat.title === "Overall") ? draftManagerInfo?.entry.transactions_total : draftManagerInfo?.entry.transactions_event, 
                     stat: 'Transactions',
                     index: (stat.title === "Overall") ? 4 : 2})
        }
        else {
            setStat({title: (stat.title === "Overall") ? "Gameweek" : "Overall", 
                     value: (stat.title === "Overall") ? GetTeamTotalPoints(teamInfo, players) : draftManagerInfo?.entry.overall_points, 
                     stat: 'Points',
                     index: (stat.title === "Overall") ? 1 : 3})
        }
    }, [stat, teamInfo.gameweek])

    return (
        <Pressable style={[styles.container, styles.shadow]} onPress={(teamInfo.teamType === TeamTypes.Budget) ? changingBudgetStat : changingDraftStat}>
            {((((teamInfo.teamType === TeamTypes.Budget) && budgetManagerInfo) || ((teamInfo.teamType === TeamTypes.Draft) && draftManagerInfo)) && players) &&
            <>
                <View style={{alignSelf: 'center', justifyContent: 'center'}}>
                    <Text style={styles.text}>{stat.title}</Text>
                </View>
                <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
                    <Text numberOfLines={1} adjustsFontSizeToFit={true} style={stat.stat === 'rank' ? styles.rankText : styles.statText}>{stat.value}</Text>
                </View>
                <View style={{alignSelf: 'center', justifyContent: 'center'}}>
                    <Text style={styles.text}>{stat.stat}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingTop: 7}}>
                    <View style={[styles.dots, {backgroundColor: stat.index === 1 ? textPrimaryColor : lightColor}]}/>
                    <View style={[styles.dots, {backgroundColor: stat.index === 2 ? textPrimaryColor : lightColor}]}/>
                    <View style={[styles.dots, {backgroundColor: stat.index === 3 ? textPrimaryColor : lightColor}]}/>
                    <View style={[styles.dots, {backgroundColor: stat.index === 4 ? textPrimaryColor : lightColor}]}/>
                    {(teamInfo.teamType === TeamTypes.Budget) &&
                        <>  
                            <View style={[styles.dots, {backgroundColor: stat.index === 5 ? textPrimaryColor : lightColor}]}/>
                            <View style={[styles.dots, {backgroundColor: stat.index === 6 ? textPrimaryColor : lightColor}]}/>
                        </>
                    }
                </View>
            </>
            }
        </Pressable>
    )
}

export default ManagerInfoCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        padding: 7,
        marginRight: 15,
        borderBottomLeftRadius: cornerRadius,
        borderBottomRightRadius: cornerRadius,
        backgroundColor: primaryColor,
        alignSelf: 'center',
        zIndex: 1,
    },

    statText: {
        color: textPrimaryColor, 
        alignSelf: 'center', 
        fontWeight: '600',
        fontSize: smallFont * 2.4,
    },

    rankText: {
        color: textPrimaryColor, 
        alignSelf: 'center', 
        fontWeight: '600'
    },
    
    text: {
        fontSize: smallFont,
        color: textSecondaryColor,
        fontWeight: '500',
        alignSelf: 'center'
    },

    shadow: {
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 0},
        shadowRadius: 5,
        shadowOpacity: 0.35,
        elevation: 2,
    },

    dots: {
        height: height*0.005,
        aspectRatio: 1,
        backgroundColor: textSecondaryColor,
        borderRadius: 100,
        marginRight: 1.5,
        marginLeft: 1.5,
    },
});

