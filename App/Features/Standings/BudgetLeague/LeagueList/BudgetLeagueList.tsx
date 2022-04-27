import { skipToken } from "@reduxjs/toolkit/dist/query";
import React, { useCallback, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Seperator } from "../../../../Global/GlobalComponents";
import { aLittleLighterColor, largeFont, smallFont, textPrimaryColor } from "../../../../Global/GlobalConstants";
import { Result } from "../../../../Models/FplBudgetLeagueInfo";
import { Classic, FplManagerInfo } from "../../../../Models/FplManagerInfo";
import { useGetBudgetLeagueInfoQuery } from "../../../../Store/fplSlice";
import { useAppDispatch } from "../../../../Store/hooks";
import { changeToBudgetTeam } from "../../../../Store/teamSlice";
import { styles } from "../../StandingsStyles";

interface BudgetLeagueListProps {
    budgetUserInfo: FplManagerInfo;
    setLeagueToShow: (value: React.SetStateAction<number | null>) => void;
}


const BudgetLeagueList = ({budgetUserInfo, setLeagueToShow} : BudgetLeagueListProps) => {

    const onLeagueItemPress = useCallback((id: number) => {
        setLeagueToShow(id);
    }, [])

    const renderLeagueItem = useCallback(({item}: {item: Classic}) => {
        return (
            <TouchableOpacity testID="leagueItemButton" style={{flex: 1, flexDirection: 'row', paddingTop: 15, paddingBottom: 15}} onPress={() => onLeagueItemPress(item.id)}>
                <Text style={[styles.teamNameText, {paddingLeft: 5}]}>{item.name}</Text>
                <Text style={[styles.leagueText, {width: '30%'}]}>{item.entry_rank}</Text>
            </TouchableOpacity>
        )}, []);

    return (
        <FlatList data={budgetUserInfo.leagues.classic.concat(budgetUserInfo.leagues.h2h)}
                    stickyHeaderIndices={[0]}
                    ItemSeparatorComponent={ Seperator }
                    keyExtractor={item => item.id.toString()}
                    testID='budgetLeagueList'
                    ListHeaderComponent={
                    <View style={styles.headerContainer}>
                        <Text style={[styles.leagueHeaderText, {flex: 1, textAlign: 'left', paddingLeft: 5}]}>League Name</Text>
                        <Text style={[styles.leagueHeaderText, {width: '30%'}]}>Rank</Text>
                    </View>
                    }
                    renderItem={renderLeagueItem}/>
    )
}

export default BudgetLeagueList;