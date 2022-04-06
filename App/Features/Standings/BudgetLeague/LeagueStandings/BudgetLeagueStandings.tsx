import React, { useCallback } from "react";
import { FlatList, TouchableOpacity, View, Text } from "react-native";
import { seperator } from "../../../../Global/GlobalComponents";
import { textPrimaryColor, smallFont } from "../../../../Global/GlobalConstants";
import { FplBudgetLeagueInfo, Result } from "../../../../Models/FplBudgetLeagueInfo";
import { useAppDispatch } from "../../../../Store/hooks";
import { changeToBudgetTeam } from "../../../../Store/teamSlice";
import StandingsHeader from "../../StandingsHeader";
import { styles } from "../../StandingsStyles";

interface BudgetLeagueStandingsProps {
    budgetLeagueInfo: FplBudgetLeagueInfo;
    setModalVisibility: (value: React.SetStateAction<boolean>) => void;
}

const BudgetLeagueStandings = ({budgetLeagueInfo, setModalVisibility} : BudgetLeagueStandingsProps) => {
    
    const dispatch = useAppDispatch();

    const onLeagueEntryItemPress = useCallback((id: number, name: string) => {
        dispatch(changeToBudgetTeam({id: id, name: name, isDraftTeam: false, isFavourite: false}));
        setModalVisibility(false);
    }, [setModalVisibility])

    const renderLeagueEntryItem = useCallback(({item}: {item: Result}) => {
        return (
            <TouchableOpacity style={styles.standingsButtonContainer} onPress={() => onLeagueEntryItemPress(item.entry, item.entry_name)}>
                <Text style={[styles.leagueText, {flex: 1}]}>{item.rank}</Text>
                <View style={{flex: 3, paddingLeft: 5}}>
                    <Text numberOfLines={1} style={styles.teamNameText}>{item.entry_name}</Text>
                    <Text numberOfLines={1} style={styles.managerNameText}>{item.player_name}</Text>
                </View>
                <Text style={[styles.leagueText, {flex: 1}]}>{item.event_total}</Text>
                <Text style={[styles.leagueText, {flex: 1}]}>{item.total}</Text> 
            </TouchableOpacity>
        )
    }, [])

    return(
        <FlatList data={budgetLeagueInfo.standings.results}
                              stickyHeaderIndices={[0]}
                              ItemSeparatorComponent={ seperator }
                              keyExtractor={item => item.id.toString()}
                              ListHeaderComponent={ StandingsHeader }
                              renderItem={renderLeagueEntryItem}/>
    )

}

export default BudgetLeagueStandings;