import { skipToken } from "@reduxjs/toolkit/dist/query";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { cornerRadius, mediumFont, primaryColor, smallFont, textPrimaryColor } from "../../Global/GlobalConstants";
import globalStyles from "../../Global/GlobalStyles";
import { FplManagerGameweekPicks } from "../../Models/FplManagerGameweekPicks";
import { useGetBudgetUserInfoQuery, useGetDraftUserInfoQuery } from "../../Store/fplSlice";
import { TeamInfo, TeamTypes } from "../../Store/teamSlice";

interface ManagerInfoCardProps {
    teamInfo: TeamInfo,
    budgetGameweek? : FplManagerGameweekPicks,
}

const statSection = (title: string, value: string | number) => {
    return (
        <View style={styles.column}>
            <Text style={styles.text}>{title}</Text>
            <View style={{flex: 1}}>
                <Text style={styles.text}>{value}</Text>
            </View>
        </View>
    )
}

const ManagerInfoCard = (props: ManagerInfoCardProps) => {

    const draftUserInfo = useGetDraftUserInfoQuery((props.teamInfo.teamType === TeamTypes.Draft) ? props.teamInfo.info.id : skipToken );
    const budgetUserInfo = useGetBudgetUserInfoQuery((props.teamInfo.teamType === TeamTypes.Budget) ? props.teamInfo.info.id : skipToken);

    return (
        <View style={[styles.container, globalStyles.shadow]}>
            <View style={styles.row}>
                <Text style={styles.titleText}>Gameweek</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {statSection("PTS", 24)}
                    {statSection("Rank", 283746354)}
                    {statSection("TXN", 24)}
                </View>
            </View>
            <View style={styles.row}>
                <Text style={styles.titleText}>Overall</Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {statSection("PTS", 24)}
                    {statSection("Rank", 283746354)}
                    {statSection("TXN", 24)}
                </View>
            </View>
        </View>
    )
}

export default ManagerInfoCard;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        margin: 5,
        borderRadius: cornerRadius,
        backgroundColor: primaryColor,
    },

    titleText: {
        fontSize: mediumFont * 0.9,
        color: textPrimaryColor,
        fontWeight: '600'
    },
    
    text: {
        fontSize: mediumFont * 0.6,
        color: textPrimaryColor
    },

    row: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    column: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 3,
        paddingBottom: 3,
    },


});

