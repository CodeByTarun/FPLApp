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

const ManagerInfoCard = (props: ManagerInfoCardProps) => {

    const draftUserInfo = useGetDraftUserInfoQuery((props.teamInfo.teamType === TeamTypes.Draft) ? props.teamInfo.info.id : skipToken );
    const budgetUserInfo = useGetBudgetUserInfoQuery((props.teamInfo.teamType === TeamTypes.Budget) ? props.teamInfo.info.id : skipToken);

    return (
        <View style={[styles.container, globalStyles.shadow]}>

            <Text style={styles.text}>Gameweek Points:</Text>
            <Text style={styles.text}>Overall Points:</Text>
            <Text style={styles.text}>Transaction Total:</Text>

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
    
    text: {
        fontSize: mediumFont * 0.8,
        color: textPrimaryColor
    },
});

